import RefreshToken from "../models/refreshToken.model.js";

export const createTokenDb = async (user, refreshTokenValue) => await RefreshToken.create({
    user_id: user.user_id,
    token: refreshTokenValue,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
});

export const findTokenDb = async (token) => await RefreshToken.findOne({ where: { token } });

export const deleteTokenDb = async (token) => {
    await RefreshToken.destroy({ where: { token } });
};