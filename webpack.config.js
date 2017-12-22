const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const clean = plugins => plugins.filter(x => !!x);

const CSSLoaderLocalIdentifier = isProduction =>
  !isProduction ? '[local]--[hash:base64:5]' : '[hash:base64]';

const CSSLoaderConfiguration = isProduction => ({
  loader: 'css-loader',
  options: {
    modules: true,
    importLoaders: 1,
    localIdentName: CSSLoaderLocalIdentifier(isProduction),
    sourceMap: isProduction,
    minimize: isProduction,
  },
});

module.exports = () => {
  const hook = {
    hook: [`${__dirname}/src/polyfills.js`, `${__dirname}/src/hook/index.js`],
  };

  const extension = {
    background: [
      `${__dirname}/src/polyfills.js`,
      `${__dirname}/src/background/index.ts`,
    ],
    contentScript: [
      `${__dirname}/src/polyfills.js`,
      `${__dirname}/src/contentScript.js`,
    ],
    panel: [`${__dirname}/src/polyfills.js`, `${__dirname}/src/panel/index.js`],
    devtools: `${__dirname}/src/devtools/index.js`,
    loader: !isProduction
      ? `${__dirname}/src/loader/development.js`
      : `${__dirname}/src/loader/production.js`,
  };

  const babel = {
    loader: 'babel-loader',
    options: {
      plugins: [
        [
          'react-css-modules',
          {
            generateScopedName: CSSLoaderLocalIdentifier(isProduction),
          },
        ],
      ],
    },
  };

  const configuration = {
    devtool: !isProduction ? 'cheap-module-source-map' : 'source-map',
    output: {
      path: `${__dirname}/dist`,
      filename: '[name].js',
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
    },
    performance: false,
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
                failOnError: isProduction,
                failOnWarning: isProduction,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          loader: !isProduction
            ? [
                { loader: 'style-loader' },
                CSSLoaderConfiguration(isProduction),
                { loader: 'postcss-loader' },
              ]
            : ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                  CSSLoaderConfiguration(isProduction),
                  { loader: 'postcss-loader' },
                ],
              }),
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
      !isProduction && new WriteFilePlugin(),
      !isProduction &&
        new ChromeExtensionReloader({
          entries: {
            contentScript: 'contentScript',
            background: 'background',
          },
        }),

      new ForkTsCheckerWebpackPlugin({
        async: false,
      }),

      new HtmlPlugin({
        inject: true,
        template: 'src/panel/index.html',
        filename: `${__dirname}/dist/panel.html`,
        chunks: ['panel'],
      }),

      new HtmlPlugin({
        inject: true,
        template: 'src/devtools/index.html',
        filename: `${__dirname}/dist/devtools.html`,
        chunks: ['devtools'],
      }),

      isProduction &&
        new ExtractTextPlugin({
          filename: '[name].css',
          allChunks: true,
        }),

      isProduction &&
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production'),
          },
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
  };

  if (isProduction) {
    return [
      {
        ...configuration,
        name: 'hook',
        entry: hook,
      },
      {
        ...configuration,
        name: 'extension',
        entry: extension,
        dependencies: ['hook'],
      },
    ];
  }

  return {
    ...configuration,
    entry: {
      ...hook,
      ...extension,
    },
  };
};
