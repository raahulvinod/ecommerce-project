import express from 'express';

import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
} from '../controller/blogCatCtrl.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createCategory);
router.put('/:id', authMiddleware, isAdmin, updateCategory);
router.delete('/:id', authMiddleware, isAdmin, deleteCategory);
router.get('/:id', getCategory);
router.get('/', getAllCategory);

export default router;
