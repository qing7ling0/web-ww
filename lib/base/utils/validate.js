"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 是否是数字
 * @param value
 * @returns {boolean}
 * @constructor
 */
var IsNumber = exports.IsNumber = function IsNumber(value) {
  var numb = /d/;
  return numb.test(value);
};

/**
* 是否是日期
* yyyy-mm-dd
* @param value 时间字符串
* @constructor
*/
var IsDate = exports.IsDate = function IsDate(value) {
  var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
  if (value == "") {
    return true;
  }

  return reg.test(value) && RegExp.$2 <= 12 && RegExp.$3 <= 31;
};

/**
* 是否是电话号码
* @param value
* @returns {*|boolean}
*/
var isTel = exports.isTel = function isTel(value) {
  var tel = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
  return tel.test(value);
};

/**
* 是否是手机号码
* @param value
* @returns {*|boolean}
*/
var isMobile = exports.isMobile = function isMobile(value) {
  var mob = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
  return mob.test(value);
};

/**
* 是否是身份证号码
* @param value
* @returns {*|boolean}
*/
var isCardID = exports.isCardID = function isCardID(value) {
  var card = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
  return card.test(value);
};

/**
* 是否是邮箱
* @param value
* @returns {*|boolean}
*/
var isEmail = exports.isEmail = function isEmail(value) {
  var email = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
  return email.test(value);
};

/**
 * 是否有中文
 * @param  value 
* @returns {*|boolean}
 */
var isHasChinese = exports.isHasChinese = function isHasChinese(value) {
  var test = /[\u4E00-\u9FA5]/;
  return test.test(value);
};
//# sourceMappingURL=validate.js.map