import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const checkout = async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: 'INR',
  };
  const order = await instance.orders.create(options);
  res.json({ success: true, order });
};

export const paymentVerification = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  res.json({ razorpayOrderId, razorpayPaymentId });
};
