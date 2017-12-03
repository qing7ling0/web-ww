'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ActionTypes = require('../constants/ActionTypes');

var ActionTypes = _interopRequireWildcard(_ActionTypes);

var _ReduxState = require('../../base/modules/ReduxState');

var _results = require('./results');

var _results2 = _interopRequireDefault(_results);

var _Utils = require('../../base/utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    testString: '',
    loginInfo: { logined: false },
    menus: [],
    routers: {},
    routersIDMap: {},
    currentNavKey: '0',
    currentSelectMenu: {}
};

function doErrors(result) {
    if (_Utils2.default.IsNumber(result.code)) {
        if (result.code > 0) {
            _results2.default.push(result);
        } else if (result.code < 0) {
            result.message = '更新失败!';
            _results2.default.push(result);
        }
    }
}

function doActions(state, action) {
    var result = {};
    var data = {};
    if (action && action.payload) {
        result = action.payload;
        if (result && result.data) {
            data = result.data;
        }
    }
    if (result) {
        doErrors(result);
    }
    switch (action.type) {
        case ActionTypes.LOAD:
            if (action.state === _ReduxState.States.Fulfilled) {
                return Object.assign({}, state, { testString: 'ok' });
            } else {
                return Object.assign({}, state, { testString: 'loading' });
            }
            break;
        case ActionTypes.LOGIN:
            if (action.state === _ReduxState.States.Fulfilled) {
                if (result.code === 0) {
                    var info = { code: result.code, message: result.message, user: data.login };
                    var _routers = {};
                    var _routersIDMap = {};
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = data.routers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _r = _step.value;

                            _routers[_r.url] = _r;
                            _routersIDMap[_r.id] = _r;
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    return Object.assign({}, state, { loginInfo: info, menus: data.menus, routers: _routers, routersIDMap: _routersIDMap });
                } else {
                    var _info = { code: result.code, message: result.message, user: null };
                    return Object.assign({}, state, { loginInfo: _info });
                }
            } else {
                return Object.assign({}, state, { loginInfo: { loading: true } });
            }
            break;
            break;
        case ActionTypes.LOGOUT:
            if (action.state === _ReduxState.States.Fulfilled) {
                if (result.code === 0) {
                    var _info2 = { code: result.code, message: result.message, user: null };
                    return Object.assign({}, state, { loginInfo: _info2 });
                } else {
                    return Object.assign({}, state);
                }
            } else {
                return Object.assign({}, state);
            }
            break;
            break;
        case ActionTypes.SELECT_NAV:
            if (action.state === _ReduxState.States.Fulfilled) {
                if (result.code === 0) {
                    var key = data.key;

                    return Object.assign({}, state, { currentNavKey: data.key });
                } else {
                    return Object.assign({}, state);
                }
            } else {
                return Object.assign({}, state);
            }
            break;
            break;
        default:
            break;
    }
    return Object.assign({}, state, { results: _results2.default });
}

var app = function app() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    return doActions(state, action);
};
exports.default = app;