const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      //   console.log(user);
      next();
    } catch (error) {
      throw new Error('Not Autharized token expired, Please Login again');
    }
  } else {
    throw new Error('There is no token attached to header');
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = new mongoose.Types.ObjectId(id);
  const adminUser = await User.findById(userId);

  if (adminUser.role !== 'admin') {
    throw new Error('You are not an admin');
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
