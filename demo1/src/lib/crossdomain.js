(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);


var Messager = window.Messager;
var tmp = Messager.prototype.post;
Messager.prototype.post = function (msg, target) {
    if (typeof msg !== 'string') {
        throw 'not string.'
    }
    tmp.call(this, msg, target);
};


(function () {
    var storage = {};

    var fnsMap = {};

    var fnGetMessager = function (domain, fn) {
        var fnCreateIframe = function (domain) {
            var protocol = window.location.protocol;
            var iframe = window.document.createElement('iframe');
            iframe.src = protocol + '//' + domain + '/crossdomain.html';
            iframe.style.display = 'none';
            window.document.body.appendChild(iframe);

            return iframe;
        };

        var messager = storage[domain];
        var frame;
        if (!messager) {
            frame = fnCreateIframe(domain);
            messager = new Messager("changyan", frame.contentWindow, 'parent');
            messager.ready = false;
            messager.readyFns = [ fn ];
            messager.listen(function(msg){
                if (msg === '[[ready]]') {
                    messager.ready = true;
                    (function () {
                        var i, fn;
                        for (i = 0; i < messager.readyFns.length; i++) {
                            fn = messager.readyFns[i];
                            fn && fn(messager);
                        }
                    }());
                    return;
                }

                msg = msg.split(',');

                fnsMap[msg[0]] && fnsMap[msg[0]](decodeURIComponent(msg[1]));
            });
            storage[domain] = messager;
        } else {
            if (!messager.ready) {
                messager.readyFns.push(fn);
            } else {
                fn && fn(messager);
            }
        }
    };

    var fnEval = function (domain, code) {
        fnGetMessager(domain, function (messager) {
            var msg = [
                'EVAL',
                code,
            ].join(',');

            messager.post(msg, 'frame');
        });
    };

    var fnPost = function (url, data, fn) {
        var domain = url.match(/\/\/(.*?)\//)[1];
        fnGetMessager(domain, function (messager) {
            var msg = [
                'POST',
                url,
                data
            ].join(',');

            messager.post(msg, 'frame', function (msg) {
                fn && fn(msg);
            });
        });
    };

    var fnGet = function (url, data, fn) {
        var domain = url.match(/\/\/(.*?)\//)[1];
        fnGetMessager(domain, function (messager) {
            var msg = [
                'GET',
                url,
                data
            ].join(',');

            messager.post(msg, 'frame', function (msg) {
                fn && fn(msg);
            });
        });
    };

    var tmp = Messager.prototype.post;
    Messager.prototype.post = function (msg, target, fn) {
        var key = 'key-' + (+new Date()) + window.Math.random().toFixed(15);
        msg = key + ',' + msg;
        fnsMap[key] = fn;
        tmp.call(this, msg, target);
    };

    var fnAjax = function (url, method, headers, body, credentials, complete) {
        if (method.toUpperCase() === 'POST') {
            fnPost(url, body, function (xhr) {
                complete(JSON.parse(xhr).xhr);
            });
        } else {
            fnGet(url, {}, function (xhr) {
                complete(JSON.parse(xhr).xhr);
            });
        }
    };

    exports.ajax = fnAjax;
}());


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*jslint browser: true,
 vars: true, nomen: true,
 indent: 4, maxlen: 80,
 plusplus: true, sloppy: true,
 newcap: true, sub: true,
 regexp: true,
 continue: true*/
/*global console: true*/
/**
 * iframe跨域通信简易组件.
 * @author 郭豪
 * @version 2.0
 */
window.Messager = (function () {
    'use strict';
    var prefix = '[PROJECT_NAME]', // 消息前缀
        supportPostMessage = 'postMessage' in window,
        console = window.console || {
            log: function (err) {
                window.alert(err);
            }
        };
    if (!supportPostMessage && !window.navigator.listenFunc) {
        window.navigator.listenFunc = {};
        window.navigator.userListen = {};
    }
    /**
     * Messager类.
     * @param {string} projectName - 项目名称.
     * @param {HTMLObject} target - 目的窗口window对象
     * @param {string} name - 消息名称
     */
    function Messager(projectName, target, name) {
        if (!target) {
            throw 'target is null.';
        }

        this.listenFunc = []; // 消息监听函数
        this.target = target;
        this.name = name;
        prefix = projectName || prefix;
        if (typeof prefix !== 'string') {
            prefix = prefix.toString();
        }
        // 初始化监听函数
        this.init();
    }
    // 初始化消息监听回调函数
    Messager.prototype.init = function () {
        var self = this;
        /**
         * 接受到消息后的回调函数.
         * @param {string} msg - 传输的消息，长度限制为10000字节.
         */
        var callback = function (msg) {
            if (typeof msg === 'object') {
                msg = msg.data;
            }
            // 验证是否是匹配的信息
            if ((prefix + self.name) !== msg.substring(0, msg.indexOf('|cy|'))) {
                return;
            }
            // 剥离消息前缀
            msg = msg.slice((prefix + self.name).length + 4);
            // 执行用户自定义回调
            var i;
            if (supportPostMessage) {
                for (i = 0; i < self.listenFunc.length; i++) {
                    self.listenFunc[i](msg);
                }
            } else {
                window.navigator.userListen[prefix + self.name + '|cy|'](msg);
            }
        };
        if (supportPostMessage) {
            // 绑定事件监听
            if ('addEventListener' in document) {
                window.addEventListener('message', callback, false);
            } else if ('attachEvent' in document) {
                window.attachEvent('onmessage', callback);
            }
        } else {
            // 兼容IE 6/7
            window.navigator.listenFunc[prefix + this.name + '|cy|'] = callback;
        }
    };
    /**
     * 发送消息.
     * @param {string} msg - 传输的消息.
     * @param {string} name - 传输目的地名称
     */
    Messager.prototype.post = function (msg, name) {
        // 数据类型检测
        if (typeof msg !== 'string') {
            console.log('请输入字符串类型的数据;');
            return;
        }
        // 信息长度检测
        if (msg.length >= 10000) {
            console.log('数据长度超过限制');
            return;
        }
        if (supportPostMessage) {
            // IE8+ 以及现代浏览器支持
            this.target.postMessage(prefix + name + '|cy|' + msg, '*');
        } else {
            // 兼容IE6/7
            var targetFunc = window.navigator.listenFunc[prefix + name + '|cy|'];
            if (typeof targetFunc === 'function') {
                targetFunc(prefix + name + '|cy|' + msg);
            }
        }
    };
    Messager.prototype.listen = function (callback) {
        if (supportPostMessage) {
            // IE8+ 以及现代浏览器支持
            this.listenFunc.push(callback);
        } else {
            // 兼容IE6/7
            window.navigator.userListen[prefix + this.name + '|cy|'] = callback;
        }
    };
    return Messager;
})();

/***/ })
/******/ ]);
});
//# sourceMappingURL=request-iframe.js.map
