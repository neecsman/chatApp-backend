import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Users, Messages } from "./index";

@Entity()
export default class Dialogs {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.dialogs)
  @JoinColumn({ name: "author_id" })
  author: Users;

  @ManyToOne(() => Users, (user) => user.partner)
  @JoinColumn({ name: "partner_id" })
  partner: Users;

  @ManyToOne(() => Messages, (message) => message.dialog)
  @JoinColumn({ name: "last_message" })
  lastMessage: Messages;
}
