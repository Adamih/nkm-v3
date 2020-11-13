import { Field, Int, ObjectType } from "type-graphql";
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Shift } from "./Shift";
import { User } from "./User";

@ObjectType()
@Entity()
export class Event extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  locale: string;

  @Field({ nullable: true })
  @Column({ type: "int", nullable: true })
  saId: number;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { eager: true })
  sa: User;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  workersNeeded: number | null;

  @Field(() => [Shift])
  @OneToMany(() => Shift, (shift) => shift.event, { eager: true })
  shifts: Shift[];

  // TODO: has user registered to shift implementation
  // @Field(() => Boolean)
  // shiftStatus: boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  notes: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
