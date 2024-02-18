import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWt_SECRET, { expiresIn: '1d' });
};
