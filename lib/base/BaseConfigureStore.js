'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BaseConfigureStore;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxPromise = require('redux-promise');

var _reduxPromise2 = _interopRequireDefault(_reduxPromise);

var _ReduxState = require('./modules/ReduxState.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //引入异步操作


var defaultMiddlewares = [_ReduxState.ReduxBegan, _reduxThunk2.default, _reduxPromise2.default, _ReduxState.ReduxEnd];

var createSoreWithMiddleware = _redux.applyMiddleware.apply(undefined, defaultMiddlewares)(_redux.createStore);

//配置store信息
function BaseConfigureStore(initialState, reducers, middlewares) {
  if (middlewares) {
    //创建store
    var store = _redux.applyMiddleware.apply(undefined, _toConsumableArray(middlewares))(_redux.createStore)(reducers, initialState);
    return store;
  } else {
    //创建store
    var _store = createSoreWithMiddleware(reducers, initialState);
    return _store;
  }
}
//# sourceMappingURL=BaseConfigureStore.js.map