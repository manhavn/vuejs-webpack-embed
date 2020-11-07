// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto';
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import state from './state';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);
Vue.config.productionTip = false;

const service = process.env.VUE_APP_SDK_SERVICE;
const path = '/dist/';
// eslint-disable-next-line no-undef,camelcase
__webpack_public_path__ = service + path;

const appElement = document.createElement('div');
const appId = 'ostris_club';
appElement.setAttribute('id', appId);
document.body.appendChild(appElement);

const store = new Vuex.Store({ state, actions, mutations });

/* eslint-disable no-new */
new Vue({
  el: '#ostris_club',
  store,
  components: { App },
  template: '<App/>',
});
