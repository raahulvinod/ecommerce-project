import express from 'express';

import { uploadImages, deleteImages } from '../controller/uploadCtrl.js';
import { isAdmin, authMiddleware } from '../middlewares/authMiddleware.js';
import { uploadPhoto, productImgResize } from '../middlewares/uploadImages.js';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  isAdmin,
  uploadPhoto.array('images', 10),
  productImgResize,
  uploadImages
);

router.delete('/delete-img/:id', authMiddleware, isAdmin, deleteImages);

export default router;
