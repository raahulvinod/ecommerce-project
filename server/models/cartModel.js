const mongoose = require('mongoose');

var cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Color',
    },
  },
  {
    timestamps: true,
    ref: 'Color',
  }
);

module.exports = mongoose.model('Cart', cartSchema);
