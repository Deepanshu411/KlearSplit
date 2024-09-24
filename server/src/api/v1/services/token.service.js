/* eslint-disable no-undef */

import jwt from "jsonwebtoken";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.util.js";
import {
  createTokenDb,
  deleteTokenDb,
  findTokenDb,
} from "../db/refreshToken.db.js";

class TokenService {
  static generateTokens = async (user) => {
    const accessToken = generateAccessToken(user);
    const refreshTokenValue = generateRefreshToken(user);

    await createTokenDb(user, refreshTokenValue);

    return { accessToken, refreshToken: refreshTokenValue };
  };

  static setAccessTokenInLocalStorage = (res, accessToken) => {
    res.set("authorization", accessToken)
  };

  static setTokensInCookies = (res, refreshToken) => {
    // res.cookie("accessToken", accessToken, {
    //   httpOnly: true,
    //   sameSite: "Strict",
    //   maxAge: 15 * 60 * 1000,
    // });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  };

  static verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  };

  static verifyRefreshToken = async (token) => {
    const storedToken = await findTokenDb(token);
    if (!storedToken) {
      throw new Error("Invalid refresh token");
    }

    const isValid = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    if (!isValid) {
      throw new Error("Refresh token expired");
    }

    return storedToken.user_id;
  };

  static removeRefreshToken = async (token) => await deleteTokenDb(token);
}

export default TokenService;
