'use strict'
const services = require("../const")
module.exports = {
  NODE_ENV: '"production"',
  VUE_APP_WSS_SERVICE: process.env.SERVE === "LOCAL" ? services.LOCAL_VUE_APP_WSS_SERVICE : services.VUE_APP_WSS_SERVICE,
  VUE_APP_API_SERVICE: process.env.SERVE === "LOCAL" ? services.LOCAL_VUE_APP_API_SERVICE : services.VUE_APP_API_SERVICE,
}
