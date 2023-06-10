const express = require('express');
const {
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
  resetPassword,
  loginAdmin,
} = require('../controller/userCtr');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { forgotPasswordToken } = require('../controller/userCtr');
const router = express.Router();

router.post('/register', createUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);
router.put('/password', authMiddleware, updatePassword);
router.post('/login', loginUserCtrl);
router.post('/admin-login', loginAdmin);
router.get('/all-users', getAllUser);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logout);
router.get('/:id', isAdmin, authMiddleware, getaUser);
router.delete('/:id', deleteaUser);
router.put('/edit-user', authMiddleware, updatedUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);

module.exports = router;
