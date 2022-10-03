import express, { NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../entity";
import { UserService, ErrorService } from "../service";
import { validationResult } from "express-validator";

class UserController {
  async registration(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ErrorService.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      console.log(req.body);

      const { email, password, fullname } = req.body;
      const userService = new UserService();
      const userData = await userService.registration(
        email,
        password,
        fullname
      );
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async login(req: express.Request, res: express.Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userService = new UserService();
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const { refreshToken } = req.cookies;
      const userService = new UserService();
      const token = userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async activate(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const activationLink = req.params.link;
      const userService = new UserService();
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async refresh(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    console.log("ok");

    try {
      const { refreshToken } = req.cookies;

      console.log(refreshToken);

      const userService = new UserService();
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async get(req: express.Request, res: express.Response) {
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

  async create(req: express.Request, res: express.Response) {
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

  async delete(req: express.Request, res: express.Response) {
    const id = req.params.id;
    const usersRepository = AppDataSource.getRepository(Users);
    const userToRemove = await usersRepository.findOneBy({
      id: id,
    });
    await usersRepository
      .remove(userToRemove)
      .then((user) => {
        res.json({
          message: `User ${user.fullname} deleted`,
        });
      })
      .catch((e) => {
        return res.status(404).json({
          message: "User not found",
          e,
        });
      });
  }
}

export default UserController;
