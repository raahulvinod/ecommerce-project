import mongoose from 'mongoose';

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log('Database Connected Successfully');
  } catch (error) {
    // throw new Error(error);
    console.log('Database error');
  }
};

export default dbConnect;
