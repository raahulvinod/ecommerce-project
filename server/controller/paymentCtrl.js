const Razorpay = require('razorpay');

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const checkout = async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: 'INR',
  };
  const order = await instance.orders.create(options);
  res.json({ success: true, order });
};

const paymentVerification = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  res.json({ razorpayOrderId, razorpayPaymentId });
};

module.exports = { checkout, paymentVerification };
