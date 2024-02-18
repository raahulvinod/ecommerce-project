import express from 'express';

import {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
} from '../controller/productCtrl.js';
import { isAdmin, authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createProduct);

router.put('/wishlist', authMiddleware, addToWishList);
router.put('/rating', authMiddleware, rating);
router.get('/:id', getaProduct);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);
router.get('/', getAllProduct);

export default router;
