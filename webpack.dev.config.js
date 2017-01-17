const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './main.jsx',
  ],
  output: {
    path: './public',
    filename: 'js/bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    noParse: /node_modules\/mapbox-gl\/dist\/mapbox-gl.js/,
    preLoaders: [
      { test: /\.jsx?$/, loader: 'eslint', exclude: [/(node_modules|capitalprojectsold)/] },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: [
          'react-hot',
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
  eslint: {
    configFile: './.eslintrc',
  },
  plugins: [
    new ExtractTextPlugin('css/bundle.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
  ],
};
