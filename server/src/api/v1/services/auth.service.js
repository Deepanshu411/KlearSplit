import bcrypt from "bcryptjs";

import { findUserByEmailDb, findUserByIdDb } from "../db/user.db.js";
import TokenService from "./token.service.js";
import { generateAccessToken } from "../utils/jwt.util.js";

class AuthService {
  static login = async (email, password, res) => {
    const user = await findUserByEmailDb(email, "withPassword");
    if (!user) return res.status(404).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ error: "Invalid password" });

    const { accessToken, refreshToken } =
      await TokenService.generateTokens(user);

    TokenService.setAccessTokenInLocalStorage(res, accessToken);
    TokenService.setTokensInCookies(res, refreshToken);
    console.log("Access Token: ", accessToken);
    console.log("Refresh Token: ", refreshToken);
    return { userId: user.user_id };
  };

  static refreshAccessToken = async (refreshToken, res) => {
    const userId = await TokenService.verifyRefreshToken(refreshToken);
    const user = await findUserByIdDb(userId);

    const accessToken = generateAccessToken(user);

    TokenService.setTokensInCookies(res, accessToken, refreshToken);
  };

  static logout = async (refreshToken, res) => {
    await TokenService.removeRefreshToken(refreshToken);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
  };
}

export default AuthService;
