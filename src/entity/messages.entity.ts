import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users, Dialogs } from "./index";

@Entity()
export default class Messages {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column({ default: false })
  read: boolean;

  // @Column({ name: "dialog_id", default: "" })
  // dialog: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.messages)
  @JoinColumn({ name: "user_id" })
  user: string;

  // @ManyToOne(() => Dialogs, (dialog) => dialog.lastMessage)

  @ManyToOne(() => Dialogs, (dialog) => dialog.messages)
  @JoinColumn({ name: "dialog_id" })
  dialog: Dialogs;
}
