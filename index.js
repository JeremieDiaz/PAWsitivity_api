const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRouter = require('./user');
const adminRouter = require('./admin');


app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.listen(3000, () => console.log('Your server is running on port 3000'));