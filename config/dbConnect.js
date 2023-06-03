const mongoose = require('mongoose');

const dbConnect = () => {
  try {
    const conn = mongoose.connect('mongodb://127.0.0.1:27017/trendify');
    console.log('Database Connected Successfully');
  } catch (error) {
    // throw new Error(error);
    console.log('Database error');
  }
};

module.exports = dbConnect;
