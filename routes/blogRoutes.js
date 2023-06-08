const express = require('express');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
} = require('../controller/blogCtrl');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);
router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.get('/:id', getBlog);
router.get('/', getAllBlogs);
router.delete('/:id', authMiddleware, isAdmin, deleteBlog);

module.exports = router;
