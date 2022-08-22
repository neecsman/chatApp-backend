import express from "express";
import { AppDataSource } from "../data-source";
import { Messages } from "../entity";

class MessagesController {
  async get(req: express.Request, res: express.Response) {
    const dialogId = req.query.dialog;

    await AppDataSource.getRepository(Messages)
      .createQueryBuilder("message")
      .leftJoinAndSelect("message.dialog", "dialog")
      .leftJoinAndSelect("message.user", "user.id")
      .leftJoinAndSelect("dialog.author", "author")
      .leftJoinAndSelect("dialog.partner", "partner")
      .where("message.dialog = :id", { id: dialogId })
      .getMany()
      .then((dialogs) => {
        res.json(dialogs);
      })
      .catch(() => {
        res.status(404).json({
          message: "Messages not found",
        });
      });
  }

  async create(req: express.Request, res: express.Response) {
    const userId = "e0265792-3624-47bf-bdb2-d6278eb0d7b3";
    const postData = {
      text: req.body.text,
      dialog: req.body.dialog_id,
      user: userId,
    };

    const message = new Messages();

    message.text = postData.text;
    message.dialog = postData.dialog;
    message.user = postData.user;

    await AppDataSource.manager
      .save(message)
      .then((message) => {
        res.json(message);
      })
      .catch((err) => {
        res.json(err);
      });
  }
  async delete(req: express.Request, res: express.Response) {
    const id = req.params.id;
    const messageRepository = AppDataSource.getRepository(Messages);
    const messageToRemove = await messageRepository.findOneBy({ id: id });
    await messageRepository
      .remove(messageToRemove)
      .then(() => {
        res.json({
          message: `Message deleted`,
        });
      })
      .catch(() => {
        return res.status(404).json({
          message: "Message not found",
        });
      });
  }
}

export default MessagesController;
