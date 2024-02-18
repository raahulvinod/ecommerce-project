import express from 'express';

import {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getCoupon,
} from '../controller/couponCtrl.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createCoupon);
router.get('/', authMiddleware, isAdmin, getAllCoupons);
router.get('/:id', authMiddleware, isAdmin, getCoupon);
router.put('/:id', authMiddleware, isAdmin, updateCoupon);
router.delete('/:id', authMiddleware, isAdmin, deleteCoupon);

export default router;
