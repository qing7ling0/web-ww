'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _SettingContainer = require('./SettingContainer');

var _SettingContainer2 = _interopRequireDefault(_SettingContainer);

var _AdminsContainer = require('./admin/AdminsContainer');

var _AdminsContainer2 = _interopRequireDefault(_AdminsContainer);

var _Config = require('../../constants/Config');

var config = _interopRequireWildcard(_Config);

var _Constants = require('../../constants/Constants');

var constants = _interopRequireWildcard(_Constants);

var _common = require('../../modules/common');

var common = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_react2.default.createElement(_reactRouterDom.Route, {
  key: constants.MENU_IDS.systemAdmin,
  path: common.findRouterById(config.Routers, constants.MENU_IDS.systemAdmin).url,
  exact: true, strict: true,
  component: _AdminsContainer2.default
}), _react2.default.createElement(_reactRouterDom.Route, {
  key: constants.MENU_IDS.systemSetting,
  path: common.findRouterById(config.Routers, constants.MENU_IDS.systemSetting).url,
  exact: true, strict: true,
  component: _SettingContainer2.default
}), _react2.default.createElement(_reactRouterDom.Redirect, {
  key: constants.MENU_IDS.system,
  from: common.findRouterById(config.Routers, constants.MENU_IDS.system).url,
  to: common.findRouterById(config.Routers, constants.MENU_IDS.systemAdmin).url
})];