import AuthService from "../services/auth.service.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userId = await AuthService.login(email, password, res);

    res.status(200).json({ ...userId, message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const refreshAccessTokenController = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    return res.status(401).json({ error: "Access Denied. No token provided." });

  try {
    await AuthService.refreshAccessToken(refreshToken);

    res.status(200).json({ message: "Token refreshed" });
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: "Invalid refresh token" });
  }
};

export const logoutController = async (req, res) => {
  const { refreshToken } = req.cookies;

  try {
    await AuthService.logout(refreshToken);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Logout failed" });
  }
};
