import { Request } from "express";
import { IUser } from "../interfaces";

interface IRequestWithUser extends Request {
  user: IUser;
}

export default IRequestWithUser;
