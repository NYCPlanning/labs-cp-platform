const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: [
    'babel-polyfill',
    './main.jsx',
  ],
  output: {
    path: 'public/js',
    filename: 'bundle.js',
    publicPath: '/js/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    noParse: /node_modules\/mapbox-gl\/dist\/mapbox-gl.js/,
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: [
          'babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-object-assign,plugins[]=es6-promise',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('../css/bundle.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ],
};
