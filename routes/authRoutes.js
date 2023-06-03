const express = require('express');
const {
  createUser,
  loginUserCtrl,
  getAllUser,
} = require('../controller/userCtr');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users', getAllUser);

module.exports = router;
