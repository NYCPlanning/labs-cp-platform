var webpack = require('webpack')

module.exports = {
  entry: [
    './main.jsx'
  ],
  output: {
    path: 'public/js',
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel?presets[]=es2015&presets[]=react']
      }
    ]
  }
};
