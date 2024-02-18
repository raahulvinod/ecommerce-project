import express from 'express';

import {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getAllColor,
} from '../controller/colorCtrl.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createColor);
router.put('/:id', authMiddleware, isAdmin, updateColor);
router.delete('/:id', authMiddleware, isAdmin, deleteColor);
router.get('/:id', getColor);
router.get('/', getAllColor);

export default router;
