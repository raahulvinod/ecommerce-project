import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
      select: false,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    color: [{ type: Schema.Types.ObjectId, ref: 'Color' }],
    tags: String,
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model('Product', productSchema);
