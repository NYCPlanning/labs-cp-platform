var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


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
        loaders: ['babel?presets[]=es2015&presets[]=react&presets[]=stage-0']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('../css/bundle.css')
  ]
};
