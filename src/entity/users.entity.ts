import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { Messages, Dialogs } from "./index";

@Entity()
export default class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: "", name: "avatar_path" })
  avatarPath: string;

  @Column()
  fullname: string;

  @Column({ default: false, name: "is_verified" })
  isVerified: boolean;

  @Column({ default: false, name: "is_verified_hash" })
  isVerifiedHash: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Messages, (msg) => msg.user)
  messages: Messages[];

  @OneToMany(() => Dialogs, (dialog) => dialog.author)
  dialogs: Dialogs[];
}
