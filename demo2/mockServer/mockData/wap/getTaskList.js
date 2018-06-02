let Mock = require('mockjs')
let data = function() {
    return Mock.mock({
        'code': 200,
        'message': 'success',
        'data|5-20': [{
            'activityId': 70,
            'type|0-1': 0,
            'title': '80元现金红包',
            'estateName': '北京泰和昌平十几年别墅',
            'endDate': function() {
                return Mock.Random.date('yyyy-MM-dd')
            },
            'withdrewAmount|80-200': 0, // 已经提现（对礼品则是领取）的人数
            'totalAmount|200-210': 0, // 可提现数量
            'nextStep|0-2': 0 // 0 拨打400电话 1 签到 2 提现
        }]
    })
}
module.exports = data
