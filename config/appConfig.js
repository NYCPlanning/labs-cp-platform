module.exports= function() {
  if (process.env.NODE_ENV == 'development'){
    return 'http://localhost:3000';
  } else {
    return 'http://cpdb.reallysimpleopendata.com';
  }
}