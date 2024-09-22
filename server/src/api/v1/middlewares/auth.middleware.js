/* eslint-disable no-undef */

import jwt from "jsonwebtoken";

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
    console.log(error);
    if (!refreshToken) {
      return res.status(401).send("Access Denied. No refresh token provided.");
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
      const accessToken = jwt.sign(
        { user: decoded.user },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" },
      );

      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .header("Authorization", accessToken)
        .send(decoded.user);
    } catch (error) {
      console.log(error);
      return res.status(400).send("Invalid Token.");
    }
  }
};

export default authenticate;
