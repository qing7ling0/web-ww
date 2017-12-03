'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MENU_IDS = exports.API_CODE_LOGIN_ERROR = exports.API_CODE_SUCCESS = exports.ACCCOUNT_NAME_MAX_LENGTH = exports.ACCOUNT_MIN_LENGTH = exports.ACCOUNT_MAX_LENGTH = exports.PROD_SERVER = exports.DEV_SERVER = undefined;

var _constants = require('../../constants/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEV_SERVER = exports.DEV_SERVER = 'http://127.0.0.1:3001';
var PROD_SERVER = exports.PROD_SERVER = 'http://127.0.0.1:3001';

var ACCOUNT_MAX_LENGTH = exports.ACCOUNT_MAX_LENGTH = 20; // 账号密码最大长度
var ACCOUNT_MIN_LENGTH = exports.ACCOUNT_MIN_LENGTH = 5; // 账号密码最小长度

var ACCCOUNT_NAME_MAX_LENGTH = exports.ACCCOUNT_NAME_MAX_LENGTH = 10; // 账号真实名称最大长度

var API_CODE_SUCCESS = exports.API_CODE_SUCCESS = 0;
var API_CODE_LOGIN_ERROR = exports.API_CODE_LOGIN_ERROR = 1; // 登录错误

var MENU_IDS = exports.MENU_IDS = _constants2.default.MENU_IDS;