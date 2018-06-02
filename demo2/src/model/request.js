import Axios from 'axios'
import Vue from 'vue'

let mock = false // true
let baseURL = mock ? '//10.0.118.50:9991' : `//activity.focus${window.env}.cn`

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
            data: params
        }).catch(err => {
            console.log(err)
        })
    },
    get(url, params) {
        return Axios({
            url: url,
            method: 'get',
            baseURL: baseURL,
            params: params
        }).catch(err => {
            console.log(err)
        })
    },
    jsonp(url, params) {
        return Vue.jsonp(url, params)
    }
}
export default request
