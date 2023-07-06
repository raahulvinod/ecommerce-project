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
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,
  removeProductFromCart,
  updateProductQuantityFromCart,
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
router.post('/cart', authMiddleware, userCart);
// router.post('/cart/applycoupon', authMiddleware, applyCoupon);
router.post('/cart/create-order', authMiddleware, createOrder);
router.get('/all-users', getAllUser);
// router.get('/get-orders', authMiddleware, getOrders);
// router.get('/getallorders', authMiddleware, isAdmin, getAllOrders);
// router.get('/getorderbyuser/:id', authMiddleware, isAdmin, getOrderByUserId);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logout);
router.get('/wishlist', authMiddleware, getWishlist);
router.get('/cart', authMiddleware, getUserCart);

// router.delete('/empty-cart', authMiddleware, emptyCart);
router.delete(
  '/delete-product-cart/:cartItemId',
  authMiddleware,
  removeProductFromCart
);
router.delete(
  '/update-product-cart/:cartItemId/:newQuantity',
  authMiddleware,
  updateProductQuantityFromCart
);
router.delete('/:id', deleteaUser);

router.get('/:id', authMiddleware, isAdmin, getaUser);
router.put('/edit-user', authMiddleware, updatedUser);
router.put('/save-address', authMiddleware, saveAddress);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);
// router.put(
//   '/order/update-order/:id',
//   authMiddleware,
//   isAdmin,
//   updateOrderStatus
// );

module.exports = router;
