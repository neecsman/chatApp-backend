import { Router } from "express";
import {
  UserController,
  DialogsController,
  MessagesController,
} from "../controllers";
import { authMiddleware } from "../middlewares";
import { body } from "express-validator";

const router = Router();

const User = new UserController();
const Dialogs = new DialogsController();
const Messages = new MessagesController();

// router.get("/user/:id", User.get);
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
router.get("/user/all", User.getAll);

router.get("/dialogs", Dialogs.get);
router.post("/dialogs", Dialogs.create);
router.delete("/dialogs/:id", Dialogs.delete);

router.get("/messages", Messages.get);
router.post("/messages", Messages.create);
router.delete("/messages/:id", Messages.delete);
// router.get("/messages", authMiddleware, Messages.get);
// router.post("/messages", authMiddleware, Messages.create);
// router.delete("/messages/:id", authMiddleware, Messages.delete);

export default router;
