import "reflect-metadata";
import { DataSource } from "typeorm";
import { Messages, Users, Dialogs } from "./entity";

//Database
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "chat",
  entities: [Messages, Users, Dialogs],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize();
