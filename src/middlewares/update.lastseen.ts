import express from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../entity";

export default (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  AppDataSource.getRepository(Users)
    .createQueryBuilder()
    .update(Users)
    .set({ last_seen: new Date() })
    .where("users.id = :id", { id: "e0265792-3624-47bf-bdb2-d6278eb0d7b3" })
    .execute();

  next();
};
