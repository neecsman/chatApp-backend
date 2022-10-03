import express, { NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Dialogs } from "../entity";
import DialogsService from "../service/dialolgs.service";
class DialogsController {
  async create(req: express.Request, res: express.Response) {
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

  async get(req: express.Request, res: express.Response, next: NextFunction) {
    // const user = req.params.id;
    console.log("dialogs");

    try {
      const { refreshToken } = req.cookies;
      const dialogService = new DialogsService();

      const dialogs = await dialogService.getDialogs(refreshToken);
      console.log(dialogs);
      res.json(dialogs);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: express.Request, res: express.Response) {
    const id = req.params.id;
    const dialogsRepository = AppDataSource.getRepository(Dialogs);
    const dealogToRemove = await dialogsRepository.findOneBy({ id: id });
    await dialogsRepository
      .remove(dealogToRemove)
      .then(() => {
        res.json({
          message: `Dialog deleted`,
        });
      })
      .catch((e) => {
        return res.status(404).json({
          message: "Dialog not found",
          e,
        });
      });
  }
}

export default DialogsController;
