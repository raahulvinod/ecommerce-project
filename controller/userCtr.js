const User = require('../models/userModel');

const createUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });

  if (!findUser) {
    // Create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // User already exists
    res.json({
      message: 'User Already Exists',
      success: false,
    });
  }
};

module.exports = { createUser };
