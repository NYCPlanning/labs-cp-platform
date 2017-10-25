const webpack = require('webpack');
const path = require('path');

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
    extensions: ['.js', '.jsx'],
    alias: {
      'mapbox-gl': path.resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js'),
    },
  },

  output: {
    path: distPath,
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },

  module: {
    noParse: /(mapbox-gl)\.js$/,
    loaders: [
      {
        test: /\.jsx?$/,
        exclude,
        use: [
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
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        loader: extractSass.extract({
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
        loader: extractSass.extract({
          use: [{ loader: 'css-loader' }],
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
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        DEV_TABLES: JSON.stringify(process.env.DEV_TABLES),
      },
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'index.html',
    }),
  ],
};
