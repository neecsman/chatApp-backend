import { Router, Response, Request, NextFunction } from "express";

import {
  UserController,
  DialogsController,
  MessagesController,
} from "../controllers";

import { authMiddleware } from "../middlewares";
import { IRequestWithUser } from "../interfaces";
import { ErrorService, TokenService } from "../service";

import { body } from "express-validator";

const router = Router();

const User = new UserController();
const Dialogs = new DialogsController();
const Messages = new MessagesController();

router.get("/user/:id", User.get);
router.delete("/user/:id", User.delete);
router.post(
  "/user/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  User.registration
);
router.post("/user/login", User.login);
router.post("/user/logout", User.logout);
router.get("/user/activate/:link", User.activate);
router.get("/user/refresh", User.refresh);

router.get(
  "/dialogs/:id",
  (req: Request, res: Response, next: NextFunction) => {
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
  },
  Dialogs.get
);
router.post("/dialogs", Dialogs.create);
router.delete("/dialogs/:id", Dialogs.delete);

router.get("/messages", Messages.get);
router.post("/messages", Messages.create);
router.delete("/messages/:id", Messages.delete);

export default router;
