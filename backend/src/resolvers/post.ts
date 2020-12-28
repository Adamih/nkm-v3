import {
  Resolver,
  Query,
  Int,
  Arg,
  Mutation,
  Ctx,
  UseMiddleware,
  FieldResolver,
  Root,
  Field,
  ObjectType,
} from "type-graphql";
import { Post } from "../entities/Post";
import { MyApolloContext, PostInput } from "../types";
import { isAuth } from "../middleware/isAuth";
import { In, LessThan } from "typeorm";
import { Vote } from "../entities/Vote";

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    return root.text.slice(0, 150);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: MyApolloContext
  ) {
    if (!value) return false;
    value = value > 0 ? 1 : -1;
    const { userId } = req.session;

    const vote = await Vote.findOne({ where: { postId, userId } });

    if (!vote) {
      await Vote.insert({ userId, postId, value });
      await Post.getRepository().increment({ id: postId }, "points", value);
    } else if (vote.value !== value) {
      vote.value = value;
      await Vote.save(vote);
      await Post.getRepository().increment({ id: postId }, "points", value * 2);
    } else {
      await Vote.delete(vote);
      await Post.getRepository().decrement({ id: postId }, "points", value);
    }

    return true;
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyApolloContext
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;
    const cursorArgs = cursor
      ? { where: { createdAt: LessThan(new Date(parseInt(cursor))) } }
      : {};
    let posts = await Post.find({
      ...cursorArgs,
      order: { createdAt: "DESC" },
      take: realLimitPlusOne,
    });
    const hasMore = posts.length === realLimitPlusOne;
    posts = posts.slice(0, realLimit);

    if (posts) {
      // Fetch all users votes on page
      const votes = await Vote.find({
        where: {
          userId: req.session.userId,
          postId: In(posts.map((p) => p.id)),
        },
      });

      // Convert list of votes into dict
      var votesDict = votes.reduce(
        (dict, vote) => ((dict[vote.postId.toString()] = vote.value), dict),
        {} as { [postId: string]: number }
      );

      posts = posts.map((p) => {
        p.voteStatus = votesDict[p.id.toString()] || null;
        return p;
      });
    }

    return {
      posts,
      hasMore,
    };
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
    return await Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("options") options: PostInput,
    @Ctx() { req }: MyApolloContext
  ): Promise<Post | undefined> {
    return await Post.create({
      ...options,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("options", () => PostInput, { nullable: true }) options: PostInput,
    @Ctx() { req }: MyApolloContext
  ): Promise<Post | null> {
    const post = await Post.findOne({
      where: { id, creatorId: req.session.userId },
    });
    if (!post) {
      return null;
    }
    await Post.update({ id }, options);
    return Object.assign(post, options);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyApolloContext
  ): Promise<boolean> {
    await Post.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
