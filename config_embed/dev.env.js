const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_WSS_SERVICE: '"wss://server.moqiz.one/ws"',
  VUE_APP_API_SERVICE: '"https://server.moqiz.one"',
});
