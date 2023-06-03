const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;

dbConnect();
app.use('/', (req, res) => {
  res.send('Hello from server side');
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
