const services = require("../const");

const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const config = require('../config')

let fileName = 'app.js'
let publicPath = '/dist/'

module.exports = {
  entry: './src/main-embed.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: publicPath,
    filename: fileName,
    jsonpFunction: 'ostris_club'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]__[hash:base64:5]__ostris_club',
              camelCase: true
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          },
          // other vue-loader options go here
          cssModules: {
            localIdentName: '[local]__[hash:base64:5]__ostris_club',
            camelCase: true
          }
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        }
      }
    ]
  },
  plugins: [
    new ManifestPlugin()
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    disableHostCheck: true,
    https: true,
    host: 'localhost'
  },
  performance: {
    hints: false
  },
  devtool: config.dev.devtool,
}

module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"',
      VUE_APP_SDK_SERVICE: services.STAGING_VUE_APP_SDK_SERVICE,
      VUE_APP_WSS_SERVICE: services.STAGING_VUE_APP_WSS_SERVICE,
      VUE_APP_API_SERVICE: services.STAGING_VUE_APP_API_SERVICE,
    }
  })
]);
