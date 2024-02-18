import asyncHandler from 'express-async-handler';

import Enquiry from '../models/enqModel.js';
import { validateMongoDbId } from '../utils/validateMongodbid.js';

export const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json(newEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

export const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    res.json(deletedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

export const getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaEnquiry = await Enquiry.findById(id);
    res.json(getaEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

export const getAllEnquiry = asyncHandler(async (req, res) => {
  try {
    const getAllEnquiry = await Enquiry.find();
    res.json(getAllEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
