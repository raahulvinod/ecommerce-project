const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWt_SECRET, { expiresIn: '1d' });
};

module.exports = { generateToken };
