import Axios from 'axios'
import Vue from 'vue'
import Cookies from 'js-cookie'

let mock = false // true
let baseURL = '//productivity.focus' +  window.env + '.cn/api';

// request拦截器
// service.interceptors.request.use(config => {
//   if (store.getters.token || Cookies.get('TokenKey')) {
//     // 请求头携带含有token的cookie
//     config.headers.Authorization = 'bearer ' + (getToken() ? getToken() : store.getters.token)
//   }
//   config.headers['lang'] = Cookies.get('language') || 'zh'
//   return config
// }, error => {
//   // Do something with request error
//   console.log(error) // for debug
//   Promise.reject(error)
// })

// response拦截器
Axios.interceptors.response.use(response => {
    return response.data
}, error => {
    return Promise.reject(error)
})

let request = {
    post(url, params) {
        return Axios({
            url: url,
            method: 'post',
            baseURL: baseURL,
            data: params,
            withCredentials: true
        }).catch(err => {
            console.log(err)
        })
    },
    get(url, params) {
        return Axios({
            url: url,
            method: 'get',
            baseURL: baseURL,
            params: params,
            withCredentials: true
        }).catch(err => {
            console.log(err)
        })
    },
    jsonp(url, params) {
        return Vue.jsonp(url, params)
    }
}
export default request
