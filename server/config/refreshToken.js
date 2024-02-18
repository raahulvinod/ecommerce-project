import jwt from 'jsonwebtoken';

export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWt_SECRET, { expiresIn: '3d' });
};
