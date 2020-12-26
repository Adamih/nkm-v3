import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  PrimaryColumn,
} from "typeorm";
import { User } from "./User";
import { Event } from "./Event";

@ObjectType()
@Entity()
export class Shift extends BaseEntity {
  @Field()
  @PrimaryColumn()
  workerId: number;

  @Field(() => User)
  @ManyToOne(() => User, (worker) => worker.shifts, {
    onDelete: "CASCADE",
    lazy: true,
  })
  worker: User;

  @Field()
  @PrimaryColumn()
  eventId: number;

  @ManyToOne(() => Event, (event) => event.shifts, {
    onDelete: "CASCADE",
    lazy: true,
  })
  event: Event;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
