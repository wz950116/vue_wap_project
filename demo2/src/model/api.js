import request from '@/model/request'

export default {
    // 从cookie获取用户id
    getUserInfoFromCookie() {
        return request.jsonp(`//login.focus${window.env}.cn/passport/getUserInfo`, {})
    },
    // 获取activity列表
    getActivityList(params) {
        return request.get('/wap/getTaskList', params)
    }
}
