import bcrypt from 'bcryptjs';

import TokenService from '../services/token.service.js';
import User from '../models/user.model.js';
import { generateAccessToken } from '../utils/jwt.util.js';

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.scope('withPassword').findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid password' });

    const { accessToken, refreshToken } = await TokenService.generateTokens(user);

    TokenService.setTokensInCookies(res, accessToken, refreshToken);

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const refreshTokenController = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const userId = await TokenService.verifyRefreshToken(refreshToken);
    const user = await User.findByPk(userId);

    const accessToken = generateAccessToken(user);

    TokenService.setTokensInCookies(res, accessToken, refreshToken);

    res.status(200).json({ message: 'Token refreshed' });
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: 'Invalid refresh token' });
  }
};

export const logoutController = async (req, res) => {
  const { refreshToken } = req.cookies;

  try {
    await TokenService.removeRefreshToken(refreshToken);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Logout failed' });
  }
};
