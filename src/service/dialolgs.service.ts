import tokenService from "./token.service";
import { AppDataSource } from "../data-source";
import { Dialogs } from "../entity";

class DialogsService {
  async getDialogs(refreshToken: string) {
    const userData = tokenService.validateRefreshToken(refreshToken);

    const dialogs = await AppDataSource.getRepository(Dialogs)
      .createQueryBuilder("dialogs")
      .leftJoinAndSelect("dialogs.author", "author")
      .leftJoinAndSelect("dialogs.partner", "partner")
      .where("dialogs.author.id = :id", { id: userData.id })
      .getMany();

    return dialogs;
  }
}

export default DialogsService;
