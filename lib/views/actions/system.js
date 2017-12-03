'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAdmin = exports.updateAdmin = exports.addAdmin = exports.getAdminList = undefined;

var _reduxActions = require('redux-actions');

var _ActionTypes = require('../constants/ActionTypes');

var types = _interopRequireWildcard(_ActionTypes);

var _Config = require('../constants/Config.js');

var _Config2 = _interopRequireDefault(_Config);

var _NetHandler = require('../modules/NetHandler');

var _NetHandler2 = _interopRequireDefault(_NetHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var getAdminList = exports.getAdminList = (0, _reduxActions.createAction)(types.ADMIN_LIST_GET, _NetHandler2.default.getAdminList);
var addAdmin = exports.addAdmin = (0, _reduxActions.createAction)(types.ADMIN_ACCOUNT_ADD, _NetHandler2.default.addAdmin);
var updateAdmin = exports.updateAdmin = (0, _reduxActions.createAction)(types.ADMIN_ACCOUNT_UPDATE, _NetHandler2.default.updateAdmin);
var deleteAdmin = exports.deleteAdmin = (0, _reduxActions.createAction)(types.ADMIN_ACCOUNT_DELETE, _NetHandler2.default.deleteAdmin);