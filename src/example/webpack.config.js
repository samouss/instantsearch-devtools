const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const EXTENSION_ENV = process.env.EXTENSION_ENV || 'development';
const NODE_ENV = process.env.NODE_ENV || 'development';

const isProduction = NODE_ENV === 'production';

const clean = plugins => plugins.filter(x => !!x);

module.exports = () => ({
  devtool: 'cheap-module-source-map',
  entry: './src/example/index.tsx',
  output: {
    publicPath: '/',
    filename: '[name].[chunkhash:8].js',
  },
  performance: false,
  module: {
    loaders: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  'react-css-modules',
                  {
                    generateScopedName: '[local]--[hash:base64:5]',
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'eslint-loader',
            options: {
              configFile: '.eslintrc.js',
              failOnError: false,
              failOnWarning: false,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]--[hash:base64:5]',
              sourceMap: false,
              minimize: false,
            },
          },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: clean([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash:8].js',
      minChunks: module =>
        module.context &&
        module.context.indexOf('node_modules') !== -1 &&
        module.resource &&
        module.resource.match(/\.js$/),
    }),

    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: '[name].[chunkhash:8].js',
      minChunks: Infinity,
    }),

    new HtmlPlugin({
      inject: true,
      template: './src/example/index.html',
    }),

    new webpack.DefinePlugin({
      'process.env.EXTENSION_ENV': JSON.stringify(EXTENSION_ENV),
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),

    isProduction &&
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
  ]),
});
