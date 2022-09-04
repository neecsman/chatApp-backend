import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Messages, Dialogs } from "./index";

@Entity()
export default class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "", name: "avatar_path" })
  avatarPath: string;

  @Column()
  fullname: string;

  @Column({ default: "", name: "activation_link" })
  activationLink: string;

  @Column({ default: false, name: "is_activated" })
  isActivated: boolean;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: false, name: "confirm_hash" })
  confirmHash: boolean;

  @Column({ default: new Date() })
  last_seen: Date;

  @Column({ default: "", name: "refresh_token" })
  refreshToken: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Messages, (message) => message.user)
  @JoinColumn()
  messages: Messages[];

  @OneToMany(() => Dialogs, (dialog) => dialog.author)
  @JoinColumn()
  dialogs: Dialogs[];

  @OneToMany(() => Dialogs, (dialog) => dialog.partner)
  @JoinColumn()
  partner: Dialogs[];
}
