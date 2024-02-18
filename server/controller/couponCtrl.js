import asyncHandler from 'express-async-handler';

import Coupon from '../models/couponModel.js';
import { validateMongoDbId } from '../utils/validateMongodbid.js';

export const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const allCoupons = await Coupon.find();
    res.json(allCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

export const getCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaCoupon = await Coupon.findById(id);
    res.json(getaCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

export const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updatedCoupons = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    res.json(deletedCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
