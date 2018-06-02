import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        navbarActive: 0, // 导航栏active：0正在进行、1已完成、2已失效
        uid: ''
    },
    mutations: {
        switchNav(state, i) {
            state.navbarActive = i
        },
        setUserId(state, uid) {
            state.uid = uid
        }
    }
})
export default store
