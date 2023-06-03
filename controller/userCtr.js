const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });

  if (!findUser) {
    // Create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // User already exists
    throw new Error('User Already Exists');
  }
});

module.exports = { createUser };
