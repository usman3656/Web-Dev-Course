const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./user/routes/routes')
const cookieParser = require('cookie-parser');
require('dotenv').config()
// console.log(process.env)

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));

app.use("/user", userRouter);
//first change test
// second test


app.listen(process.env.PORT, ()=> {
    console.log("app is working")
})
