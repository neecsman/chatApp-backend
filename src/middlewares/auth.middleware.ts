import { NextFunction, Response, Request } from "express";
import { ErrorService, TokenService } from "../service";
import { IRequestWithUser } from "../interfaces";
export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ErrorService.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];

    if (!accessToken) {
      return next(ErrorService.UnauthorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ErrorService.UnauthorizedError());
    }
    next();
  } catch (error) {
    return next(ErrorService.UnauthorizedError());
  }
}
