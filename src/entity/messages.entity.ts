import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "./index";

@Entity()
export default class Messages {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  partner: string;

  @Column()
  text: string;

  @Column()
  dialog: string;

  @Column()
  unread: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.messages)
  @JoinColumn({ name: "user_id" })
  user: Users;
}
