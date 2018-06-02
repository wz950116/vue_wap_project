/**
 * @preserve Public Domain 2011 ne_Sachirou
 * author: ne_Sachirou http://c4se.tk/profile/ne.html
 * site: http://gist.github.com/1018954
 * date: 2011 - 2012
 * license: Public Domain
 */

//java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js_output_file es5.min.js --js es5.js --js json2.js

(function (GLOBAL) {

var Array_prototype = Array.prototype;


if (!Array.isArray) {
  /**
   * @param obj Object
   * @return Boolean obj is an Array or not
   */
  Array.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
}


if (!Array_prototype.every) {
  /**
   * @param obj Function
   * @param fun this in fun
   * @return Boolean
   */
  Array_prototype.every = function (fun, obj) {
    var i;

    for (i = this.length - 1; i >= 0; i -= 1) {
      if (this[i] !== void 0 &&
          !fun.call(obj, this[i], i, this)) {
        return false;
      }
    }
    return true;
  };
}


if (!Array_prototype.filter) {
  /**
   * @param fun Function
   * @param obj Object this in fun
   * @return Array
   */
  Array_prototype.filter = function (fun, obj) {
    var result = [],
        i,
        len = this.length;

    for (i = 0; i < len; i += 1) {
      if (this[i] !== void 0 &&
          fun.call(obj, this[i], i, this)) {
        result.push(this[i]);
      }
    }
    return result;
  };
}


if (!Array_prototype.forEach) {
  /**
   * @param fun Function
   * @param obj Object this in fun
   * @return Array this
   */
  Array_prototype.forEach = function (fun, obj) {
    var i;

    for (i = this.length - 1; i >= 0; i -= 1) {
      if (this[i] !== void 0) {
        fun.call(obj, this[i], i, this);
      }
    }
    return this;
  };
}


if (!Array_prototype.indexOf) {
  /**
   * @param val Object
   * @param num Number=0
   * @return Number when not found return -1
   */
  Array_prototype.indexOf = function (val, num) {
    var i,
        len = this.length;

    num = num || 0;
    while (num < 0) {
      num += len - 1;
    }
    for (i = num; i < len; i += 1) {
      if (this[i] === val) {
        return i;
      }
    }
    return -1;
  };
}


if (!Array_prototype.lastIndexOf) {
  /**
   * @param val Object
   * @param num Number(=this.length-1)
   * @return Number when not found return -1
   */
  Array_prototype.lastIndexOf = function (val, num) {
    var i,
        len = this.length;

    if (num === void 0) {
      num = len - 1;
    }
    while (num < 0) {
      num += len - 1;
    }
    for (i = num; i >= 0; i -= 1) {
      if (this[i] === val) {
        return i;
      }
    }
    return -1;
  };
}


if (!Array_prototype.map) {
  /**
   * @param fun Function
   * @param obj Object this in fun
   * @return Array
   */
  Array_prototype.map = function (fun, obj) {
    var i,
        result = new Array(i);

    for (i = this.length; i >= 0; i -= 1) {
      if (this[i] !== void 0) {
        result[i] = fun.call(obj, this[i], i, this);
      }
    }
    return result;
  };
}


if (!Array_prototype.reduce) {
  /**
   * @param fun Function
   * @param val Object
   * @return Object
   */
  Array_prototype.reduce = function (fun, val) {
    var i = 0,
        len = this.length;

    if (val === void 0) {
      val = this[0];
      i = 1;
    }
    for (; i < len; i += 1) {
      if (typeof this[i] !== 'undefined') {
        val = fun.call(null, val, this[i], i, this);
      }
    }
    return val;
  };
}


if (!Array_prototype.reduceRight) {
  /**
   * @param fun Function
   * @param val Object
   * @return Object
   */
  Array_prototype.reduceRight = function (fun, val) {
    var i = this.length - 1;

    if (val !== void 0) {
      val = this[i];
      i -= 1;
    }
    for (; i >= 0; i -= 1) {
      if (this[i] !== void 0) {
        val = fun.call(null, val, this[i], i, this);
      }
    }
    return val;
  };
}


if (!Array_prototype.some) {
  /**
   * @param fun Function
   * @param obj Object
   * @return Boolean
   */
  Array_prototype.some = function (fun, obj) {
    var i;

    for (i = this.length - 1; i >= 0; i -= 1) {
      if (this[i] !== void 0 &&
        fun.call(obj, this[i], i, this)) {
        return true;
      }
    }
    return false;
  };
}


// http://blog.stevenlevithan.com/archives/faster-trim-javascript
if (!String.prototype.trim) {
  /**
   * @return String
   */
  String.prototype.trim = function () {
    var str = this.replace(/^\s\s*/, ''),
        ws = /\s/,
        i = str.length;

    while (ws.test(str.charAt(i -= 1))) {
    }
    return str.slice(0, i + 1);
  };
}


if (!Object.keys) {
  /*
   * @param obj Object
   * @return Array of String of keys
   */
  Object.keys = function (obj) {
    var key,
        result = [];

    for (key in obj) if (obj.hasOwnProperty(key)) {
      result.push(key);
    }
    return result;
  };
}


if (!Date.now) {
  /**
   * @return Number of Date now UNIX second
   */
  Date.now = function () {
    return new Date().getTime();
  };
}


// http://webreflection.blogspot.com/2009/07/ecmascript-iso-date-for-every-browser.html
if (!Date.ISO) (function () {
'use strict';
/** ES5 ISO Date Parser Plus toISOString Method
 * @author          Andrea Giammarchi
 * @blog            WebReflection
 * @version         2009-07-04T11:36:25.123Z
 * @compatibility   Chrome, Firefox, IE 5+, Opera, Safari, WebKit, Others
 */

var round = Math.round,
    pow = Math.pow,
    toISOString = Date.prototype.toISOString ?
      function (d) {return d}:
      (function () {
        function t (i) {
          return i < 10 ? '0' + i : i
        }

        function h (i) {
          return i.length < 2 ? '00' + i :
                 i.length < 3 ? '0' + i :
                 3 < i.length ? round(i / pow(10, i.length - 3)) : i
        }

        /**
         * @return String of Date in ISO form
         */
        Date.prototype.toISOString = function toISOString () {
          return ''.concat(
            this.getUTCFullYear(), '-',
            t(this.getUTCMonth() + 1), '-',
            t(this.getUTCDate()), 'T',
            t(this.getUTCHours()), ':',
            t(this.getUTCMinutes()), ':',
            t(this.getUTCSeconds()), '.',
            h("" + this.getUTCMilliseconds()), 'Z'
          );
        };

        return function (d) {
          //d.toISOString = toISOString;
          return d;
        }
      }());


/**
 * @param String of Date in ISO form
 * @return Date
 */
Date.ISO = function ISO (str) {
  var match = /^(\d{4})([-\/](\d{2})([-\/](\d{2})(T(\d{2}):(\d{2})(:(\d{2})(\.(\d+))?)?(Z|((\+|-)(\d{2}):(\d{2}))))?)?)?$/.exec(str),
      date = new Date(),
      h, i, s;

  if (match === null) {
    throw new Error('Invalid ISO String');
  }
  date.setUTCFullYear(+match[1]);
  date.setUTCMonth(match[3] ? (match[3] >> 0) - 1 : 0);
  date.setUTCDate(match[5] >> 0);
  date.setUTCHours(match[7] >> 0);
  date.setUTCMinutes(match[8] >> 0);
  date.setUTCSeconds(match[10] >> 0);
  date.setUTCMilliseconds(match[12] >> 0);
  if (match[13] && match[13] !== 'Z') {
    h = match[16] >> 0;
    i = match[17] >> 0;
    s = match[15] === '+';

    date.setUTCHours((match[7] >> 0) + s ? -h : h);
    date.setUTCMinutes((match[8] >> 0) + s ? -i : i);
  }
  return toISOString(date);
};
}());


// http://blog.livedoor.jp/dankogai/archives/51758978.html
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
// if (!Function.prototype.bind) {
//   /**
//    * @param oThis Object
//    * @return Function
//    */
//   Function.prototype.bind = function (oThis) {
//     var aArgs = Array.prototype.slice.call(arguments, 1),
//         fToBind = this,
//         fNOP = function () {};
//
//     function fBound() {
//       return fToBind.apply(this instanceof fNOP ? this : oThis || GLOBAL,
//                            aArgs.concat(Array.prototype.slice.call(arguments)));
//     }
//
//     // closest thing possible to the ECMAScript 5 internal IsCallable function
//     if (typeof this !== "function") {
//       throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");
//     }
//
//     fNOP.prototype = this.prototype;
//     fBound.prototype = new fNOP();
//     return fBound;
//   };
// }

// Object.keys 兼容
if (!Object.keys) Object.keys = function(o) {
    if (o !== Object(o))
        throw new TypeError('Object.keys called on a non-object');
    var k = [],
        p;
    for (p in o)
        if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
    return k;
}

// 数组filter()
if (!Array.prototype.filter) {
    Array.prototype.filter = function(callback) {
        // 获取数组长度
        var len = this.length;
        if (typeof callback != "function") {
            throw new TypeError();
        }
        // 创建新数组，用于承载经回调函数修改后的数组元素
        var newArr = new Array();
        // thisArg为callback 函数的执行上下文环境
        var thisArg = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                if (callback.call(thisArg, this[i], i, this)) {
                    newArr.push(this[i]);
                }
            }
        }
        return newArr;
    }
}

// 兼容querySelectorAll
if (!document.querySelectorAll) {
    document.querySelectorAll = function(selectors) {
        var style = document.createElement('style'),
            elements = [],
            element;
        document.documentElement.firstChild.appendChild(style);
        document._qsa = [];

        style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
        window.scrollBy(0, 0);
        style.parentNode.removeChild(style);

        while (document._qsa.length) {
            element = document._qsa.shift();
            element.style.removeAttribute('x-qsa');
            elements.push(element);
        }
        document._qsa = null;
        return elements;
    };
}

// 兼容querySelector
if (!document.querySelector) {
    document.querySelector = function(selectors) {
        // var elements = document.querySelectorAll(selectors);
        var elements = document.getElementsByTagName(selectors);
        return (elements.length) ? elements[0] : null;
    };
}

//兼容addEventListener函数
function addEventListener(ele,event,fn){
    if(ele.addEventListener){
        ele.addEventListener(event,fn,false);
    }else{
        ele.attachEvent('on'+event,fn.bind(ele));
    }
}


}(this));
