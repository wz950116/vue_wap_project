var base = location.hostname;
var hashName = location.hash;
var cookies = document.cookie;
var type = '';
var utils = require('../utils/tools.js');

if (base.indexOf('focus-test') >= 0) {
    type = '-test';
} else if (base.indexOf('focus-dev') >= 0) {
    type = '-dev'
}

var loginUrl = 'http://common-ldap.focus' + type + '.cn/tologin?ru=http://' + base;

var userCookie = '';
cookies.split(';').forEach(function (item) {
    if (item.indexOf('FOCUS_A_UDIG') !== -1) {
        userCookie = item;
    }
});

var ua = utils.getUA();

// 非App访问且未登录
if (!ua.focusApp && !userCookie) {
	// location.href = loginUrl;
}
