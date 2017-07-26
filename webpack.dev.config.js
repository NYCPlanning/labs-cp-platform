const path = require('path');
const Dotenv = require('dotenv-webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appPath = path.join(__dirname, 'app');
const distPath = path.join(__dirname, 'public');
const exclude = /node_modules/;
const extractSass = new ExtractTextPlugin('css/bundle.css');

module.exports = {

  context: appPath,

  entry: {
    app: 'main.js',
  },

  resolve: {
    modules: [
      'node_modules',
      appPath,
    ],

    symlinks: false,
    extensions: ['.js', '.jsx'],
  },

  output: {
    path: distPath,
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },

  devtool: 'source-map',

  plugins: [
    extractSass,
    new Dotenv(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'index.html',
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude,
        use: [
          {
            loader: 'eslint-loader',
            options: { emitWarning: true },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude,
        use: [
          { loader: 'react-hot-loader' },
          {
            loader: 'babel-loader',
            query: {
              presets: ['babel-preset-react', 'babel-preset-es2015', 'babel-preset-stage-0'].map(require.resolve),
              plugins: ['babel-plugin-transform-object-assign', 'babel-plugin-es6-promise'].map(require.resolve),
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
          // use style-loader in development
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.css$/,
        use: extractSass.extract({
          use: [{ loader: 'css-loader' }],
          // use style-loader in development
          fallback: 'style-loader',
        }),
      },
    ],
  },
};
