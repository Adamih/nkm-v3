import "reflect-metadata";
import { __prod__, COOKIE_NAME } from "./constants";
import path from "path";
import argon2 from "argon2";
import express from "express";
import cors from "cors";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { MyExpressContext, MyApolloContext } from "./types";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { EventResolver } from "./resolvers/event";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import { Vote } from "./entities/Vote";
import { Event } from "./entities/Event";
import { Shift } from "./entities/Shift";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "postgres",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Post, Vote, Event, Shift],
  });

  if (!(await User.findOne({ id: 1 }))) {
    console.log("Creating admin user");
    User.create({
      id: 1,
      firstName: "adam",
      lastName: "henriksson",
      email: "adahen@nkm.se",
      password: await argon2.hash("admin"),
    }).save();
  }

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis }),
      secret: "snek",
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14, // 2 weeks
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // Break if production is not https
      },
      saveUninitialized: false,
    })
  );

  const apolloServerContext = ({
    req,
    res,
  }: MyExpressContext): MyApolloContext => {
    return { req, res, redis };
  };

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver, EventResolver],
      validate: false,
    }),
    context: apolloServerContext,
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("Server started on http://localhost:4000");
  });
};

main();
