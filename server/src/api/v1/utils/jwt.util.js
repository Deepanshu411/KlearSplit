/* eslint-disable no-undef */

import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_SECRET_KEY;
const refreshTokenSecret = process.env.REFRESH_SECRET_KEY;

export const generateAccessToken = (user) => {
  const accessToken = jwt.sign({ userId: user.user_id }, accessTokenSecret, {
    expiresIn: "15m",
  });
  return accessToken;
};

export const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign({ userId: user.user_id }, refreshTokenSecret, {
    expiresIn: "7d",
  });
  return refreshToken;
};
