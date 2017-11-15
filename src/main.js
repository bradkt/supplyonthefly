// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
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
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);


//axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// Vue.http.headers.common['Access-Control-Request-Method'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
// Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';

// Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
// Vue.http.headers.common['Access-Control-Allow-Credentials'] = "true";
// Vue.http.headers.common['Accept'] = 'application/json, text/plain, */*, application/vnd.sun.wadl+xml';

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store: store,
  components: { App }
});
