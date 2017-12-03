'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkPasswordInput = exports.checkAccountInput = exports.findRouterById = exports.findMenuItem = undefined;

var _Utils = require('../../base/utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _Constants = require('../constants/Constants');

var constants = _interopRequireWildcard(_Constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findMenuItem = exports.findMenuItem = function findMenuItem(menus, key) {
  var numKey = _Utils2.default.StringToInt(key, 0);
  var arrNav = [];
  while (numKey > 0) {
    arrNav.push(numKey);
    numKey = Math.floor(numKey / 100);
  }
  arrNav = arrNav.reverse();
  for (var i = 0; i < arrNav.length; i++) {
    for (var j = 0; j < menus.length; j++) {
      if (menus[j].id === arrNav[i]) {
        if (i === arrNav.length - 1) {
          return menus[j];
        } else {
          menus = menus[j].subMenus;
          if (!menus) return menus[j];
        }
      }
    }
  }

  return null;
};

var findRouterById = exports.findRouterById = function findRouterById(routers, id) {
  if (!routers || !id) return null;

  for (var j = 0; j < routers.length; j++) {
    if (routers[j].id === id) return routers[j];
  }

  return null;
};

var checkAccountInput = exports.checkAccountInput = function checkAccountInput(account) {
  if (!account) {
    return "账号不能为空!";
  } else if (account.length < constants.ACCOUNT_MIN_LENGTH || account.length > constants.ACCOUNT_MAX_LENGTH) {
    return '\u8D26\u53F7\u957F\u5EA6\u5728' + constants.ACCOUNT_MIN_LENGTH + '-' + constants.ACCOUNT_MAX_LENGTH + '!';
  } else if (!account) {
    // todo 验证字符串格式是否合法
    return "账号只能是数字、字母!";
  }
};

var checkPasswordInput = exports.checkPasswordInput = function checkPasswordInput(password) {
  if (!password) {
    return "密码不能为空!";
  } else if (password.length < constants.ACCOUNT_MIN_LENGTH || password.length > constants.ACCOUNT_MAX_LENGTH) {
    return '\u5BC6\u7801\u957F\u5EA6\u5728' + constants.ACCOUNT_MIN_LENGTH + '-' + constants.ACCOUNT_MAX_LENGTH + '!';
  } else if (!password) {
    // todo 验证字符串格式是否合法
    return "密码只能是数字、字母!";
  }
};