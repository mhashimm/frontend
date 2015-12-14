var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var baseConfig = require('./base');

// Add needed plugins here
var BowerWebpackPlugin = require('bower-webpack-plugin');

var config = _.merge({
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8000',
    'webpack/hot/only-dev-server',
    './src/components/run'
  ],
  cache: true,
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new ExtractTextPlugin("style.css", {
        allChunks: true
    })
  ]
}, baseConfig);

// Add needed loaders
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: path.join(__dirname, '/../src')
});

module.exports = config;
