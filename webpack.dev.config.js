const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin('css/bundle.css');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './main.jsx',
  ],
  output: {
    path: path.join(__dirname, './public'),
    filename: 'js/bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    noParse: /node_modules\/mapbox-gl\/dist\/mapbox-gl.js/,

    loaders: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /(node_modules|capitalprojectsold|jane-maps)/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          'react-hot-loader',
          'babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-object-assign,plugins[]=es6-promise',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          loader: [{
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
          }],
          // use style-loader in development
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.css$/,
        use: extractSass.extract({
          loader: [{
            loader: 'css-loader',
          }],
          // use style-loader in development
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins: [
    extractSass,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
  ],
};
