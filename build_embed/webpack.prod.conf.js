const services = require("../const");

const path = require('path');
const webpack = require('webpack');

process.env.NODE_ENV = 'production';

const embedFile = 'embed.js';
const publicPath = '/dist/';

module.exports = {
  entry: `./src/${embedFile}`,
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath,
    filename: 'embed.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports.devtool = '#source-map';
module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
      VUE_APP_SDK_SERVICE: process.env.SERVE === "LOCAL" ? services.LOCAL_VUE_APP_SDK_SERVICE : services.VUE_APP_SDK_SERVICE,
      VUE_APP_WSS_SERVICE: process.env.SERVE === "LOCAL" ? services.LOCAL_VUE_APP_WSS_SERVICE : services.VUE_APP_WSS_SERVICE,
      VUE_APP_API_SERVICE: process.env.SERVE === "LOCAL" ? services.LOCAL_VUE_APP_API_SERVICE : services.VUE_APP_API_SERVICE,
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      warnings: false,
    },
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
]);
