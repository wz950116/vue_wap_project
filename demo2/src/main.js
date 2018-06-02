// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VueJsonp from 'vue-jsonp'
// Vuex
import store from './store'

Vue.use(VueJsonp)

Vue.config.productionTip = false

/* eslint-disable no-new */
require('lib/flexible.js')
require('es6-promise').polyfill()

new Vue({
    el: '#app',
    // router,
    store,
    components: { App },
    template: '<App/>'
})
