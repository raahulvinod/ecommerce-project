const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWt_SECRET, { expiresIn: '3d' });
};

module.exports = { generateToken };
