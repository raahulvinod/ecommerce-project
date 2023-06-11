const express = require('express');
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');
const blogRouter = require('./routes/blogRoutes');
const categoryRouter = require('./routes/prodcategoryRoutes');
const blogCategoryRouter = require('./routes/blogCatRoutes');
const brandRouter = require('./routes/brandRoute');
const colorRouter = require('./routes/colorRoute');
const couponRouter = require('./routes/couponRoute');
const enquiryRouter = require('./routes/enqRoute');
dbConnect();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use('/api/blog', blogRouter);
app.use('/api/category', categoryRouter);
app.use('/api/blogcategory', blogCategoryRouter);
app.use('/api/brand', brandRouter);
app.use('/api/coupon', couponRouter);
app.use('/api/color', colorRouter);
app.use('/api/enquiry', enquiryRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
