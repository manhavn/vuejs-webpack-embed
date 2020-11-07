const services = require("../const");

const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')

process.env.NODE_ENV = 'production'
let publicPath = '/dist/'

module.exports = {
  entry: './src/main-embed.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath,
    filename: 'app.[name].[hash].js',
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
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
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
          name: '[name].[ext]?[hash]'
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
  performance: {
    hints: false
  },
}

module.exports.devtool = '#source-map'
// http://vue-loader.vuejs.org/en/workflow/production.html
module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
      VUE_APP_SDK_SERVICE: process.env.SERVE === "LOCAL" ? services.LOCAL_VUE_APP_SDK_SERVICE : services.VUE_APP_SDK_SERVICE,
      VUE_APP_WSS_SERVICE: process.env.SERVE === "LOCAL" ? services.LOCAL_VUE_APP_WSS_SERVICE : services.VUE_APP_WSS_SERVICE,
      VUE_APP_API_SERVICE: process.env.SERVE === "LOCAL" ? services.LOCAL_VUE_APP_API_SERVICE : services.VUE_APP_API_SERVICE,
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      warnings: false
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true
  })
])
