const { generateToken } = require('../config/jwtToken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const validateMongoDbId = require('../utils/validateMongodbid');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require('jsonwebtoken');
const sendEmail = require('./emailCtrl');
const crypto = require('crypto');

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

// Login a user

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists or not
  const findUser = await User.findOne({ email });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser._id,
      fistname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error('Invalid Credentials');
  }
});

// Admin login

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if admin exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== 'admin') throw new Error('Not Authorised');

  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateUser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin._id,
      fistname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error('Invalid Credentials');
  }
});

// Handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error('No Refresh Token in Cookies');
  const refreshToken = cookie.refreshToken;
  // console.log(refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error('No Refresh token present in db or not matched');
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error('There is something wrong with refresh token');
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// Logout functionality
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error('No Refresh Token in Cookies');
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: '',
    }
  );
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// Updata a user

const updatedUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body.firstname,
        lastname: req?.body.lastname,
        email: req?.body.email,
        mobile: req?.body.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all users

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaUser = await User.findById(id);
    res.json(getaUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete a user

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json(deleteaUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Block user

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );

    res.json({ message: 'User Blocked' });
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const Unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({ message: 'User Unblocked' });
  } catch (error) {
    throw new Error(error);
  }
});

// Update password

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found with this email');

  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>click here</a>`;
    const data = {
      to: email,
      text: 'Hey User',
      subject: 'Forgot Password Link',
      html: resetURL,
    };

    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error('Token Expired, Please Try again later');
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate('wishlist');
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getAllUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
};
