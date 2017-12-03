'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Routers = exports.Menus = exports.GetServerAddress = exports.DEV = undefined;

var _Constants = require('./Constants');

var constants = _interopRequireWildcard(_Constants);

var _config = require('../../constants/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var DEV = exports.DEV = true;

var GetServerAddress = exports.GetServerAddress = function GetServerAddress() {
  return DEV ? constants.DEV_SERVER : constants.PROD_SERVER;
};

var Menus = exports.Menus = _config2.default.Menus;

var Routers = exports.Routers = _config2.default.Routers;