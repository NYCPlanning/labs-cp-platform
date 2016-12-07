//simple express app to serve up custom APIs

var express = require('express');
var compression = require('compression');
var spa = require('express-spa');
var app = express();

app.use(compression());

const PUBLIC_DIR_PATH = require('path').resolve('./public');
app.use(express.static(PUBLIC_DIR_PATH));
app.use(spa(PUBLIC_DIR_PATH + "/index.html"));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;