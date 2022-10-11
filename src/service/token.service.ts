import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { Users } from "../entity";
import { IToken } from "../interfaces";

class TokenService {
  generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET
      ) as IToken;
      return userData;
    } catch (error) {
      return null;
    }
  }
  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET
      ) as IToken;
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const userData = await AppDataSource.getRepository(Users).findOneBy({
      id: userId,
    });

    if (userData) {
      return await AppDataSource.getRepository(Users)
        .createQueryBuilder()
        .update(Users)
        .set({ refreshToken: refreshToken })
        .where("id = :id", { id: userId })
        .execute();
    }
  }

  async removeToken(refreshToken: string) {
    return await AppDataSource.getRepository(Users)
      .createQueryBuilder()
      .update(Users)
      .set({ refreshToken: "" })
      .where("refreshToken = :token", { token: refreshToken })
      .execute();
  }

  async findToken(refreshToken: string) {
    const tokenData = await AppDataSource.getRepository(Users).findOne({
      where: {
        refreshToken,
      },
    });
    return tokenData;
  }
}

export default new TokenService();
