import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const brandSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default model('Brand', brandSchema);
