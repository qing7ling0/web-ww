'use strict';

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 是否是有效的帐号
 */
module.exports.isAccountValid = function (value) {
  var tel = /^[a-zA-Z0-9_-]*$/;
  return tel.test(value);
};

/**
 * 是否是有效的密码
 */
module.exports.isPasswordValid = function (value) {
  var tel = /^[0-9a-zA-Z~!@#$%\^&*\(\)_+-=\[\]\{\<\>\,\.\/?|\`\}]*$/;
  return tel.test(value);
};

module.exports.sha1 = function (value) {
  var sha1 = _crypto2.default.createHash('sha1');
  sha1.update(value, 'utf8');
  return sha1.digest('hex');
};

module.exports.diffent = function (newValue, oldValue) {
  if (Object.prototype.toString.call(newValue) !== "[object Object]" || Object.prototype.toString.call(oldValue) !== "[object Object]") {
    return {};
  }

  var ret = {};
  for (var key in newValue) {
    if (key in oldValue) {
      if (oldValue[key] !== newValue[key]) {
        ret[key] = newValue[key];
      }
    } else {
      ret[key] = newValue[key];
    }
  }

  return ret;
};
//# sourceMappingURL=utils.js.map