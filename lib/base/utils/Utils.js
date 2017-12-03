'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "IsObject",

    /**
     * 是否是对象
     * 
     * @static
     * @param {any} obj 
     * @returns 
     * @memberof Utils
     */
    value: function IsObject(obj) {
      return Object.prototype.toString.call(obj) === "[object Object]";
    }

    /**
     * 是否是数组
     * 
     * @static
     * @param {any} obj 
     * @returns 
     * @memberof Utils
     */

  }, {
    key: "IsArray",
    value: function IsArray(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    }

    /**
     * 是否是 null 对象
     * 
     * @static
     * @param {any} obj 
     * @returns 
     * @memberof Utils
     */

  }, {
    key: "IsNULL",
    value: function IsNULL(obj) {
      return Object.prototype.toString.call(obj) === "[object Null]";
    }

    /**
     * 是否是函数
     * 
     * @static
     * @param {any} obj 
     * @returns 
     * @memberof Utils
     */

  }, {
    key: "IsFunction",
    value: function IsFunction(obj) {
      return Object.prototype.toString.call(obj) === "[object Function]";
    }

    /**
     * 是否是布尔变量
     * 
     * @static
     * @param {any} obj 
     * @returns 
     * @memberof Utils
     */

  }, {
    key: "IsBoolean",
    value: function IsBoolean(obj) {
      return Object.prototype.toString.call(obj) === "[object Boolean]";
    }

    /**
     * 是否是数字
     * 
     * @static
     * @param {any} obj 
     * @returns 
     * @memberof Utils
     */

  }, {
    key: "IsNumber",
    value: function IsNumber(obj) {
      return Object.prototype.toString.call(obj) === "[object Number]";
    }

    /**
     * 是否是字符串对象
     * 
     * @static
     * @param {any} obj 
     * @returns 
     * @memberof Utils
     */

  }, {
    key: "IsString",
    value: function IsString(obj) {
      return Object.prototype.toString.call(obj) === "[object String]";
    }

    /**
     * 判断对象是否是undefined 
     * 
     * @static
     * @param {any} obj 
     * @returns 
     * @memberof Utils
     */

  }, {
    key: "IsUndefined",
    value: function IsUndefined(obj) {
      return Object.prototype.toString.call(obj) === "[object Undefined]";
    }
  }, {
    key: "ObjectIsEmpty",
    value: function ObjectIsEmpty(obj) {
      if (!obj) return true;
      for (var key in obj) {
        return false;
      }

      return true;
    }

    /**
     * 删除数组元素
     * 
     * @static
     * @param {any} arr 原数组
     * @param {any} element 要删除的元素 
     * @returns 返回要删除元素的索引，删除失败返回-1
     * @memberof Utils
     */

  }, {
    key: "ArrayDeleteElement",
    value: function ArrayDeleteElement(arr, element) {
      var isFuc = this.IsFunction(element);
      for (var i = 0; i < arr.length; i++) {
        if (isFuc) {
          if (element(arr[i])) {
            arr.splice(i, 1);
            return i;
          }
        } else {
          if (arr[i] === element) {
            arr.splice(i, 1);
            return i;
          }
        }
      }

      return -1;
    }

    /**
     * 删除一个数组元素
     * 
     * @static
     * @param {any} arr 原数组
     * @param {any} elements 要删除的数组 
     * @returns 返回删除元素的索引数组
     * @memberof Utils
     */

  }, {
    key: "ArrayDeleteElements",
    value: function ArrayDeleteElements(arr, elements) {
      var indArr = arr.map(function (item, ind) {
        for (var i = 0; i < elements.length; i++) {
          if (elements[i] === item) {
            return ind;
          }
        }
        return -1;
      }).filter(function (i) {
        return i > -1;
      }).reverse();
      indArr.array.forEach(function (ind) {
        arr.splice(ind, 1);
      }, this);

      return indArr;
    }

    /**
     * 字符串转换成数字
     * 转换失败如果有默认值则返回默认值，没有返回0
     * 
     * @static
     * @param {any} str 
     * @param {any} defaultValue 
     * @returns 
     * @memberof Utils
     */

  }, {
    key: "StringToInt",
    value: function StringToInt(str, defaultValue) {
      var v = parseInt(str);
      if (v) return v;else {
        if (defaultValue) return defaultValue;
        return 0;
      }
    }
  }]);

  return Utils;
}();

exports.default = Utils;
//# sourceMappingURL=Utils.js.map