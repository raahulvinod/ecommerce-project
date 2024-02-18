import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const enqSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Submitted',
    enum: ['Submitted', 'Contacted', 'In Progress', 'Resolved'],
  },
});

export default model('Enquiry', enqSchema);
