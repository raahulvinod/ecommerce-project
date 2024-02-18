import express from 'express';

import { isAdmin, authMiddleware } from '../middlewares/authMiddleware.js';
import {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  uploadImages,
} from '../controller/blogCtrl.js';
import { blogImgResize, uploadPhoto } from '../middlewares/uploadImages.js';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);
router.put(
  '/upload/:id',
  authMiddleware,
  isAdmin,
  uploadPhoto.array('images', 2),
  blogImgResize,
  uploadImages
);
router.put('/likes', authMiddleware, likeBlog);
router.put('/dislikes', authMiddleware, disLikeBlog);
router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.get('/:id', getBlog);
router.get('/', getAllBlogs);
router.delete('/:id', authMiddleware, isAdmin, deleteBlog);

export default router;
