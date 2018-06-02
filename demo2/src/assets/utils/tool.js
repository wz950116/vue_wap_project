module.exports = {
    formatDate: function(date, rule) {
        const Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        let h = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        h = h > 9 ? h : '0' + h
        m = m > 9 ? m : '0' + m
        s = s > 9 ? s : '0' + s
        switch (rule) {
        case 'YYYY-MM-DD':
            M = M > 9 ? M : '0' + M
            D = D > 9 ? D : '0' + D
            return Y + '-' + M + '-' + D
        case 'YYYYMMDD':
            M = M > 9 ? M : '0' + M
            D = D > 9 ? D : '0' + D
            return '' + Y + M + D
        case 'HH:MM':
            return h + ':' + m
        case 'HHMM':
            return '' + h + m
        case 'HH:MM:SS':
            return '' + h + ':' + m + ':' + s
        case '月日':
            return parseInt(M) + '月' + parseInt(D) + '日'
        default:
            M = M > 9 ? M : '0' + M
            D = D > 9 ? D : '0' + D
            return Y + '-' + M + '-' + D + ' ' + h + ':' + m
        }
    },
    // 后台传来的时间格式 183000   转为18：30
    str2Time: function(strT) {
        strT = strT.toString()
        strT = strT.substring(0, 2) + ':' + strT.substring(2, 4)
        return strT
    },
    // 后台传来的日期格式 20180126 转为2018-01-26
    str2Date: function(strD) {
        strD = strD.toString()
        strD = strD.substring(0, 4) + '-' + strD.substring(4, 6) + '-' + strD.substring(6, 8)
        return strD
    },
    // 后台传来的时:分:秒  转为 分:秒
    formatCountdown: function(s) {
        let arr = s.split(':')
        if (arr[0] == '00') {
            arr.reverse().pop()
            arr.reverse()
            return arr.join(':')
        }
        return s
    },
    // 数组冒泡排序
    bubbleSort(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = 0; j < arr.length - i - 1; j++) {
                if (arr[j].problemNo > arr[j + 1].problemNo) {
                    let swap = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = swap
                }
            }
        }
        return arr
    },
    // 格式化人数，数字，千位符，保留2位小数点
    formatNum(num, type) {
        switch (type) {
        case 0: // 千位符
            return num && num.toString().replace(/(?=(?!\b)(\d{3})+$)/g, ',')
        case 1: // 保留两位小数
            return num && parseFloat(num).toFixed(2)
        case 2: // 保留两位小数，并且千位符
            if (num != '') {
                num = parseFloat(num).toFixed(2).toString()
                let float = num.substring(num.lastIndexOf('.'), num.length)
                num = num.substring(0, num.lastIndexOf('.'))
                return num.replace(/(?=(?!\b)(\d{3})+$)/g, ',') + float
            } else {
                return '0.00'
            }
        }
    },
    // 判断UA
    getUA() {
        let userAgent = navigator.userAgent
        let userDevice = {}
        userDevice.info = userAgent
        if (userAgent.match(/(iphone|ipod|ipad);?/i)) {
            userDevice.ios = true
        } else {
            userDevice.ios = false
        }
        if (userAgent.match(/android/i)) {
            userDevice.android = true
        } else {
            userDevice.android = false
        }
        if (userAgent.match(/micromessenger/i)) {
            userDevice.wechat = true
        } else {
            userDevice.wechat = false
        }
        if (userAgent.match(/FocusLiveApp/i)) {
            // 判断是否在直播app内部
            userDevice.focusApp = true
        } else {
            userDevice.focusApp = false
        }
        if (userAgent.match(/MQQBrowser/i)) {
            // 判断是否在QQ浏览器内部
            userDevice.xFive = true
        } else {
            userDevice.xFive = false
        }
        if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE|Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) {
            userDevice.mobile = true
        } else {
            userDevice.mobile = false
        }
        if (userAgent.match(/vivo/i)) {
            userDevice.vivo = true
        } else {
            userDevice.vivo = false
        }
        if (userAgent.match(/HUAWEI/i)) {
            userDevice.huawei = true
        } else {
            userDevice.huawei = false
        }
        if (userAgent.match(/metasr/i)) {
            userDevice.sougou = true
        } else {
            userDevice.sougou = false
        }
        if (userAgent.match(/oppo/i)) {
            userDevice.oppo = true
        } else {
            userDevice.oppo = false
        }
        if (userAgent.match(/Z999/i)) {
            userDevice.zte = true
        } else {
            userDevice.zte = false
        }
        return userDevice
    },
    // cookie 管理
    getCookie(key) {
        let dCookie = document.cookie
        if (dCookie.length > 0) {
            let kStart = dCookie.indexOf(`${key}=`)
            if (kStart != -1) {
                kStart = kStart + key.length + 1
                let kEnd = dCookie.indexOf(';', kStart)
                if (kEnd == -1) {
                    kEnd = dCookie.length
                }
                return unescape(dCookie.substring(kStart, kEnd))
            } else {
                return ''
            }
        } else {
            return ''
        }
    }
}
