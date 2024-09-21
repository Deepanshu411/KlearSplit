import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: 'Access denied, token missing!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // eslint-disable-line no-undef
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: 'Invalid or expired token!' });
  }
};

export default authMiddleware;
