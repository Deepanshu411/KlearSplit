/* eslint-disable no-undef */

import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/jwt.util.js";

const authenticate = (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken && !refreshToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error, 'gyuj');
    if (!refreshToken) {
      return res.status(401).json({error: "Access Denied. No refresh token provided."});
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
      const accessToken = generateAccessToken(decoded.user);
      const refreshToken = generateAccessToken(decoded.user);

      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .header("Authorization", accessToken)

      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
    } catch (error) {
      console.log(error, 'hgffghfh');
      return res.status(400).send("Invalid Token.");
    }
  }
};

export default authenticate;
