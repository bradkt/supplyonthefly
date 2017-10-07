// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import VueResource from 'vue-resource'
import Header from './components/FlyHeader.vue'
import Footer from './components/FlyFooter.vue'
import Icon from '../node_modules/vue-awesome/dist/vue-awesome'
require('../node_modules/bootstrap/dist/css/bootstrap.css');
import jQuery from 'jquery';
global.jQuery = jQuery;
let Bootstrap = require('../node_modules/bootstrap/dist/js/bootstrap.js');
import VeeValidate from 'vee-validate';


Vue.config.productionTip = false;
Vue.component('icon', Icon);
Vue.component('flyHeader', Header);
Vue.component('flyFooter', Footer);
Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(VeeValidate);

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: { App }
})
