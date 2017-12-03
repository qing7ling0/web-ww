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
  loading: false,
  result: 0
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

function createState(state, resState, values) {
  return Object.assign({}, state, resState, values);
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
  result = result || { code: 0, message: '' };
  var resState = { loading: false, result: result };
  if (action.state === _ReduxState.States.Fulfilled) {
    resState.loading = false;
  } else {
    resState.loading = true;
  }

  switch (action.type) {
    case ActionTypes.ADMIN_ACCOUNT_ADD:
      if (action.state === _ReduxState.States.Fulfilled) {
        if (result.code === 0) {
          return createState(state, resState);
        } else {
          return createState(state, resState);
        }
      } else {
        return createState(state, resState);
      }
      break;
      break;
    default:
      break;
  }
  return createState(state, resState);
}

var system = function system() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  return doActions(state, action);
};
exports.default = system;