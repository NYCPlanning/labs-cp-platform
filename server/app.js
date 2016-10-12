//simple express app to serve up custom APIs

var express = require('express');
var spa = require('express-spa');
var app = express();



const PUBLIC_DIR_PATH = require('path').resolve('.');
app.use(express.static(PUBLIC_DIR_PATH));
app.use(spa(PUBLIC_DIR_PATH + "/index.html"));


//app.use(expressValidator());




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;