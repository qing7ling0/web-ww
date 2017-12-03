'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserList = exports.addUser = exports.selectNav = exports.logout = exports.login = exports.Load = undefined;

var _reduxActions = require('redux-actions');

var _ActionTypes = require('../constants/ActionTypes');

var types = _interopRequireWildcard(_ActionTypes);

var _Config = require('../constants/Config.js');

var _Config2 = _interopRequireDefault(_Config);

var _NetHandler = require('../modules/NetHandler');

var _NetHandler2 = _interopRequireDefault(_NetHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var init = function init() {
    var myHeaders = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
    });
    return fetch('http://192.168.0.109:3001/json', {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    }).then(function (response) {
        return response.json();
    });
};

var Load = exports.Load = (0, _reduxActions.createAction)(types.LOAD, function () {
    return 'data';
});

var login = exports.login = (0, _reduxActions.createAction)(types.LOGIN, _NetHandler2.default.reqLogin);

var logout = exports.logout = (0, _reduxActions.createAction)(types.LOGOUT, _NetHandler2.default.reqLogout);

var selectNav = exports.selectNav = (0, _reduxActions.createAction)(types.SELECT_NAV, function (key) {
    return { code: 0, message: '', data: { key: key } };
});

var addUser = exports.addUser = (0, _reduxActions.createAction)(types.USER_ADD, function (params) {
    return _NetHandler2.default.mutation({ add: {
            info: { account: '111', password: '222', nickname: 'test' }
        } });
});
var list = 'list';
var getUserList = exports.getUserList = (0, _reduxActions.createAction)(types.USER_LIST_GET, function (params) {
    return _NetHandler2.default.query('{list}');
});