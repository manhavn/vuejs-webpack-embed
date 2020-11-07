const services = require("../const");

const path = require('path');
const webpack = require('webpack');

const embedFile = 'embed-dev.js';
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

module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"',
      VUE_APP_SDK_SERVICE: services.STAGING_VUE_APP_SDK_SERVICE,
      VUE_APP_WSS_SERVICE: services.STAGING_VUE_APP_WSS_SERVICE,
      VUE_APP_API_SERVICE: services.STAGING_VUE_APP_API_SERVICE,
    },
  }),
]);
