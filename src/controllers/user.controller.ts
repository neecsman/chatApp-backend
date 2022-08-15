import express from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../entity";

class UserController {
  async getUserById(req: express.Request, res: express.Response) {
    const id = req.params.id;
    await AppDataSource.getRepository(Users)
      .findOneBy({ id: id })
      .then((user) => {
        res.json(user);
      })
      .catch(() => {
        res.status(404).json({
          message: "User not found",
        });
      });
  }

  async createUser(req: express.Request, res: express.Response) {
    const postData = {
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password,
    };

    const user = new Users();

    user.email = postData.email;
    user.fullname = postData.fullname;
    user.password = postData.password;

    await AppDataSource.manager
      .save(user)
      .then((obj: any) => {
        res.json(obj);
      })
      .catch((err) => {
        res.json(err);
      });
  }

  async deleteUser(req: express.Request, res: express.Response) {
    const id = req.params.id;
    const usersRepository = AppDataSource.getRepository(Users);
    const userToRemove = await usersRepository.findOneBy({ id: id });
    await usersRepository
      .remove(userToRemove)
      .then((user) => {
        res.json({
          message: `User ${user.fullname} deleted`,
        });
      })
      .catch(() => {
        return res.status(404).json({
          message: "User not found",
        });
      });
  }
}

export default UserController;
