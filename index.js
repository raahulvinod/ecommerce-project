const express = require('express');
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const blogRoutes = require('./routes/blogRoutes');

dbConnect();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/blog', blogRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
