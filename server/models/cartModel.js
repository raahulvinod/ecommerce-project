import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: Schema.Types.ObjectId,
      ref: 'Color',
    },
  },
  {
    timestamps: true,
    ref: 'Color',
  }
);

export default model('Cart', cartSchema);
