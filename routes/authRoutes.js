const express = require('express');
const {
  createUser,
  loginUserCtrl,
  getAllUser,
  getaUser,
  deleteaUser,
  updatedUser,
} = require('../controller/userCtr');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users', getAllUser);
router.get('/:id', authMiddleware, getaUser);
router.delete('/:id', deleteaUser);
router.put('/:id', updatedUser);

module.exports = router;
