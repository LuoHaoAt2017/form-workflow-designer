// import "@babel/polyfill";
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './route';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axios from './utils/axios.js';

Vue.prototype.$axios = axios;
Vue.prototype.$bus = new Vue();
Vue.use(Antd);

const app = new Vue({
  el: '#app',
  store: store,
  router: router,
  render(h) {
    return h(App);
  }
});

export default app;