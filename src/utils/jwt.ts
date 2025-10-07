import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refreshsupersecret';

export const generateToken = (payload: object, expiresIn = '1h') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// Nueva función para refresh token
export const generateRefreshToken = (payload: object, expiresIn = '7d') => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

// Nueva función para verificar refresh token
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};
