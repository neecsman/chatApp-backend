import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Users } from "./index";

@Entity()
export default class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  refreshToken: string;

  @OneToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: string;
}
