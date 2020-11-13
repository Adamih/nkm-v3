import {
  Resolver,
  Query,
  Int,
  Arg,
  Mutation,
  Field,
  ObjectType,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { CreateEventInput, MyApolloContext, UpdateEventInput } from "../types";
import { LessThan } from "typeorm";
import { Event } from "../entities/Event";
import { isAuth } from "../middleware/isAuth";
import { Shift } from "../entities/Shift";

@ObjectType()
class PaginatedEvents {
  @Field(() => [Event])
  events: Event[];
  @Field()
  hasMore: boolean;
}

@Resolver(Event)
export class EventResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createShift(
    @Arg("eventId", () => Int) eventId: number,
    @Ctx() { req }: MyApolloContext
  ) {
    const { userId: workerId } = req.session;
    if (await Shift.findOne({ workerId, eventId })) return false;
    await Shift.insert({ workerId, eventId });
    return true;
  }

  @Query(() => PaginatedEvents)
  async events(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedEvents> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;
    let events = await Event.find({
      ...(cursor && {
        where: { createdAt: LessThan(new Date(parseInt(cursor))) },
      }),
      order: { createdAt: "DESC" },
      take: realLimitPlusOne,
    });

    const hasMore = events.length === realLimitPlusOne;
    events = events.slice(0, realLimit);

    return { events, hasMore };
  }

  @Query(() => Event, { nullable: true })
  async event(@Arg("id", () => Int) id: number): Promise<Event | undefined> {
    return await Event.findOne(id);
  }

  @Mutation(() => Event)
  async createEvent(
    @Arg("options") options: CreateEventInput
  ): Promise<Event | undefined> {
    const event = await Event.create(options).save();
    return Object.assign(event, { shifts: [] });
  }

  @Mutation(() => Event, { nullable: true })
  async updateEvent(
    @Arg("id", () => Int) id: number,
    @Arg("options", { nullable: true }) options: UpdateEventInput
  ): Promise<Event | null> {
    const event = await Event.findOne(id);
    if (!event) {
      return null;
    }

    // TODO: SA can only be user who has shift.
    await Event.update({ id }, options);
    return Object.assign(event, options);
  }

  @Mutation(() => Boolean)
  async deleteEvent(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Event.delete({ id });
    return true;
  }
}
