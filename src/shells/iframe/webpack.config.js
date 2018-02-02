const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = () => {
  const babel = {
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
  };

  return {
    devtool: 'cheap-module-source-map',
    entry: {
      main: ['./src/polyfills.ts', './src/shells/iframe/main.tsx'],
      iframe: ['./src/polyfills.ts', './src/shells/iframe/iframe.ts'],
    },
    output: {
      path: path.join(__dirname, '..', '..', '..', 'dist'),
      filename: '[name].js',
    },
    performance: false,
    devServer: {
      index: 'main.html',
    },
    module: {
      loaders: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          loaders: [babel],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: [
            babel,
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
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        async: false,
      }),

      new HtmlPlugin({
        inject: true,
        template: './src/shells/iframe/iframe.html',
        filename: 'iframe.html',
        chunks: ['iframe'],
      }),

      new HtmlPlugin({
        inject: true,
        template: './src/shells/iframe/main.html',
        filename: 'main.html',
        chunks: ['main'],
      }),
    ],
  };
};
