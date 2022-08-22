import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { Token } from "../entity";

class TokenService {
  generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await AppDataSource.getRepository(Token).findOneBy({
      user: userId,
    });

    if (tokenData) {
      return await AppDataSource.getRepository(Token)
        .createQueryBuilder()
        .update(Token)
        .set({ refreshToken: refreshToken })
        .execute();
    }
    //TODO сделать апдейт токена (вылетала ошибка дупликата значения) при логине
    return await AppDataSource.getRepository(Token).save({
      user: userId,
      refreshToken,
    });
  }
}

export default new TokenService();
