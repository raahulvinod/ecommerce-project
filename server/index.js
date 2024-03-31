import express from 'express';
import dbConnect from './config/dbConnect.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

import authRouter from './routes/authRoute.js';
import productRouter from './routes/productRoute.js';
import blogRouter from './routes/blogRoute.js';
import categoryRouter from './routes/prodcategoryRoute.js';
import blogCategoryRouter from './routes/blogCatRoute.js';
import brandRouter from './routes/brandRoute.js';
import colorRouter from './routes/colorRoute.js';
import couponRouter from './routes/couponRoute.js';
import enquiryRouter from './routes/enqRoute.js';
import uploadRouter from './routes/uploadRoute.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

dbConnect();

app.use(morgan('dev'));
app.use(
  cors({
    orgin: [
      'https://trendfy.vercel.app/',
      'https://trendfy-admin.vercel.app/',
      'https://localhost:3000',
    ],
    credentials: true,
  })
);

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
app.use('/api/upload', uploadRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
