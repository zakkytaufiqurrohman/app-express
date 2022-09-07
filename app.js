var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let permissionRouter = require('./routes/permission')
let roleRouter = require('./routes/role')
let autRouter = require('./routes/auth')


var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/master/role', roleRouter);
app.use('/api/v1/master/permission', permissionRouter)
app.use('/api/v1/auth',autRouter)
app.use('/api/v1/users', usersRouter);

module.exports = app;
