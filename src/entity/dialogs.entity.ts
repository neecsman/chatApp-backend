import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "./index";

@Entity()
export default class Dialogs {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  partner: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.dialogs)
  @JoinColumn({ name: "author_id" })
  author: Users;
}
