'use strict'

class Utils {
  /**
   * 是否是对象
   * 
   * @static
   * @param {any} obj 
   * @returns 
   * @memberof Utils
   */
  static IsObject(obj) {
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
  static IsArray(obj) {
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
  static IsNULL(obj) {
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
  static IsFunction(obj) {
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
  static IsBoolean(obj) {
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
  static IsNumber(obj) {
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
  static IsString(obj) {
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
  static IsUndefined(obj) {
    return Object.prototype.toString.call(obj) === "[object Undefined]";
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
  static ArrayDeleteElement(arr, element) {
    let isFuc = this.IsFunction(element);
    for (let i = 0; i < arr.length; i++) {
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
  static ArrayDeleteElements(arr, elements) {
    let indArr = arr.map((item, ind) => {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i] === item) {
          return ind;
        }
      }
      return -1;
    }).filter(i => i > -1).reverse();
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
  static StringToInt(str, defaultValue) {
    let v = parseInt(str);
    if (v) return v;
    else {
      if (defaultValue) return defaultValue;
      return 0;
    }
  }
}

export default Utils