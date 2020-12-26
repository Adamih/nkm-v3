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
import { In, LessThan } from "typeorm";
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
  @Mutation(() => Shift)
  @UseMiddleware(isAuth)
  async createShift(
    @Arg("eventId", () => Int) eventId: number,
    @Ctx() { req }: MyApolloContext
  ): Promise<Shift | undefined> {
    const { userId: workerId } = req.session;
    if (await Shift.findOne({ workerId, eventId })) return;
    const shift = await Shift.create({ workerId, eventId }).save();
    return shift;
  }

  // TODO: Create set SA

  @Query(() => PaginatedEvents)
  async events(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyApolloContext
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

    if (events) {
      // Fetch all users shifts
      const shifts = await Shift.find({
        where: {
          workerId: req.session.userId,
          eventId: In(events.map((p) => p.id)),
        },
      });

      // Add all shifts into set
      var shiftsSet = shifts.reduce(
        (set, shift) => (set.add(shift.eventId), set),
        new Set() as Set<number>
      );

      // Set hasShift for all shifts in set
      events = events.map((s) => {
        s.hasShift = shiftsSet.has(s.id);
        return s;
      });
    }

    return { events, hasMore };
  }

  @Query(() => Event, { nullable: true })
  async event(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyApolloContext
  ): Promise<Event | undefined> {
    let event = await Event.findOne(id);
    if (event) {
      const hasShift = await Shift.findOne({
        where: { eventId: id, workerId: req.session.userId },
      });
      event.hasShift = hasShift ? true : false;
    }
    return event;
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

    await Event.update({ id }, options);
    return Object.assign(event, options);
  }

  @Mutation(() => Boolean)
  async deleteEvent(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Event.delete({ id });
    return true;
  }
}
