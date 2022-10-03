import { Users } from "../entity";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { MailService, TokenService } from "./index";
import { UserDto } from "../dtos";
import { AppDataSource } from "../data-source";
import { ErrorService } from "./";
import tokenService from "./token.service";

class UserService {
  async registration(email: string, password: string, fullname: string) {
    const candidate = await AppDataSource.getRepository(Users).findOneBy({
      email,
    });

    if (candidate) {
      throw ErrorService.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = v4();

    const user = new Users();
    user.email = email;
    user.fullname = fullname;
    user.password = hashPassword;
    user.activationLink = activationLink;

    await AppDataSource.manager.save(user);
    await MailService.sendActivationMail(email, activationLink);

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink: string) {
    const user = await AppDataSource.getRepository(Users).findOneBy({
      activationLink,
    });

    if (!user) {
      throw ErrorService.BadRequest("Некорректная ссылка активации");
    }

    user.isActivated = true;
    await AppDataSource.manager.save(user);
  }

  async login(email: string, password: string) {
    const user = await AppDataSource.getRepository(Users).findOneBy({
      email,
    });

    if (!user) {
      throw ErrorService.BadRequest("Пользователь не был найден...");
    }

    const isPassVerify = await bcrypt.compare(password, user.password);

    if (!isPassVerify) {
      throw ErrorService.BadRequest("Неверный пароль");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ErrorService.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ErrorService.UnauthorizedError();
    }
    const user = await AppDataSource.getRepository(Users).findOneBy({
      id: userData.id,
    });

    const userDto = new UserDto(user);
    console.log(userDto);
    const tokens = tokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

export default UserService;
