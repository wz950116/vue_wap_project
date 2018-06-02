module.exports = {
    objToStr: function (obj) {
        var res = [];
        for (var o in obj) {
            if (obj.hasOwnProperty(o)) {
                res.push(o + '=' + obj[o]);
            }
        }
        return res.join('&');
    },

    setCookie: function (c_name, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = c_name + '=' + escape(value) +
            ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString()) + ';path=/'
    },

    getCookie: function (c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + '=')
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                var c_end = document.cookie.indexOf(';', c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ''
    },

    checkCookie: function (cookieKey) {
        if (this.getCookie(cookieKey) != null && this.getCookie(cookieKey) != '') {
            return true;
        } else {
            return false;
        }
    },

    getUA: function () {
        let userAgent = navigator.userAgent;
        let userDevice = {};
        userDevice.info = userAgent;
        if (userAgent.match(/(iphone|ipod|ipad);?/i)) {
            userDevice.ios = true;
        } else {
            userDevice.ios = false;
        }
        if (userAgent.match(/micromessenger/i)) {
            userDevice.wechat = true;
        } else {
            userDevice.wechat = false;
        }
        if (userAgent.match(/SalesMasterApp_Android | FocusApp_iOS_SalesMaster/i)) {
            // 判断是否在直播app内部
            userDevice.focusApp = true;
        } else {
            userDevice.focusApp = false;
        }
        if (userAgent.match(/MQQBrowser/i)) {
            // 判断是否在QQ浏览器内部
            userDevice.xFive = true;
        } else {
            userDevice.xFive = false;
        }
        if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE|Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) {
            userDevice.mobile = true;
        } else {
            userDevice.mobile = false;
        }
        if (userAgent.match(/vivo/i)) {
            userDevice.vivo = true;
        } else {
            userDevice.vivo = false;
        }
        if (userAgent.match(/HUAWEI/i)) {
            userDevice.huawei = true;
        } else {
            userDevice.huawei = false;
        }
        if (userAgent.match(/metasr/i)) {
            userDevice.sougou = true;
        } else {
            userDevice.sougou = false;
        }
        return userDevice;
    },

    getUrlParams: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); // 构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); // 匹配目标参数
        if (r != null) {
            return unescape(r[2])
        } else {
            return '';
        }
    },

    getIEVersion: function () {
        var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
        var isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
        if (isIE) {
            var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp['$1']);
            if (fIEVersion == 7) {
                return 7;
            } else if (fIEVersion == 8) {
                return 8;
            } else if (fIEVersion == 9) {
                return 9;
            } else if (fIEVersion == 10) {
                return 10;
            } else {
                return 6;// IE版本<=7
            }
        } else if (isEdge) {
            return 'edge';// edge
        } else if (isIE11) {
            return 11; // IE11
        } else {
            return -1;// 不是ie浏览器
        }
    },

    fetch(url, http, data) {
        var args;

        if (url.indexOf('house-sv-base') === -1) {
            http.credentials = 'include';
            http.Cookie = 'FOCUS_A_UDIG=U7D+yGN7tpDcbWwVILiAncoZpwdxwvngxmgjeouwc3wzte653YYLVugp6AxXQ9qIjGsapywp8uuri+0ko9G/+U5gKXk+baQbPVr/V7o+sF5DEJ7acrhxy6H2AjyAzoUbkYSRnaJ8nd97XepCFne/3UaK7T8Ba3NReyKMzrRp77Y=';
        }

        if (data instanceof Object) {
            args = JSON.stringify(data);
        } else {
            args = data;
        }

        if (http.method === 'POST') {
            http.body = args;
        } else {
            url = url + '?';
            args = JSON.parse(args);
            for (var i in args) {
                url += i + '=' + args[i] + '&';
            }
            url = url.substring(0, url.length - 1);
        }
        return fetch(url, http);
    },
}
