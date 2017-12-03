'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ConfigureStore;

var _BaseConfigureStore = require('../base/BaseConfigureStore');

var _BaseConfigureStore2 = _interopRequireDefault(_BaseConfigureStore);

var _index = require('./reducers/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConfigureStore(initialState, middlewares) {
    return (0, _BaseConfigureStore2.default)(initialState, _index2.default, middlewares);
}