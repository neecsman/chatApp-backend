import express from "express";
import { AppDataSource } from "../data-source";
import { Dialogs, Users } from "../entity";

class DialogsController {
  async createDialogs(req: express.Request, res: express.Response) {
    const postData = {
      author: req.body.author,
      partner: req.body.partner,
    };

    const dialog = new Dialogs();

    dialog.partner = postData.partner;
    dialog.author = postData.author;
    await AppDataSource.manager
      .save(dialog)
      .then((dialog) => {
        res.json(dialog);
      })
      .catch((err) => {
        res.json(err);
      });
  }

  // async getDialogs(req: express.Request, res: express.Response) {
  //   const user = req.params.id;
  //   await AppDataSource.getRepository(Dialogs)
  //     .createQueryBuilder("dialogs")
  //     .where("user_id = :id", { id: user })
  //     .getMany()
  //     .then((dialogs) => {
  //       res.json(dialogs);
  //     })
  //     .catch(() => {
  //       res.status(404).json({
  //         message: "Dialogs not found",
  //       });
  //     });
  // }

  async getDialogs(req: express.Request, res: express.Response) {
    const user = req.params.id;
    await AppDataSource.getRepository(Dialogs)
      .createQueryBuilder("dialogs")
      // .leftJoinAndSelect("dialogs.author", "users", "users.id = :userId", {
      //   userId: user,
      // })
      .leftJoinAndSelect(
        Dialogs,
        "partner",
        "users.id = d6f668e0-6426-4d97-a368-c6a57858b1a3"
      )
      // .where("dialogs.author.id = :id", { id: user })
      .getMany()
      .then((dialogs) => {
        res.json(dialogs);
      })
      .catch((err) => {
        res.status(404).json({
          message: "Dialogs not found",
          err,
        });
      });
  }

  async deleteDialog(req: express.Request, res: express.Response) {
    const id = req.params.id;
    const dialogsRepository = AppDataSource.getRepository(Dialogs);
    const dealogToRemove = await dialogsRepository.findOneBy({ id: id });
    await dialogsRepository
      .remove(dealogToRemove)
      .then((dialog) => {
        res.json({
          message: `Dialog with ${dialog.partner} deleted`,
        });
      })
      .catch(() => {
        return res.status(404).json({
          message: "Dialog not found",
        });
      });
  }
}

export default DialogsController;
