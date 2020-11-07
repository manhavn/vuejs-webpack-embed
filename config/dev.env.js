'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const services = require("../const")

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_WSS_SERVICE: services.STAGING_VUE_APP_WSS_SERVICE,
  VUE_APP_API_SERVICE: services.STAGING_VUE_APP_API_SERVICE,
})
