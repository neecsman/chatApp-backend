import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
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

  @Column({ name: "last_messages", default: "" })
  lastMessages: string;

  @ManyToOne(() => Users, (user) => user.dialogs)
  @JoinColumn({ name: "author_id" })
  author: Users;

  @ManyToOne(() => Users, (user) => user.partner)
  @JoinColumn({ name: "partner_id" })
  partner: Users;

  // @OneToMany(() => Messages, (message) => message.dialog)
  // @Column({ name: "last_message", default: "" })
  // lastMessage: string;

  @OneToMany(() => Messages, (message) => message.dialog)
  @JoinColumn({ name: "last_messag" })
  messages: Messages[];
}
