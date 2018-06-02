// 判断是否在app内打开H5，开发时注释跳转，部署记得解除注释
import 'model/login';

import Vue from 'vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import App from './App.vue';
import 'lib/flexible.js';
import VueJsonp from 'vue-jsonp';

Vue.use(VueJsonp);

// vue-router
import router from './router';

Vue.config.productionTip = false;

// 兼容Promise
require('es6-promise').polyfill();

// 全局引入echarts
// import echarts from 'echarts';
// Vue.prototype.$echarts = echarts;

Vue.use(MintUI);

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
