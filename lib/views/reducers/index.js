'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _app = require('./app.js');

var _app2 = _interopRequireDefault(_app);

var _system = require('./system.js');

var _system2 = _interopRequireDefault(_system);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = (0, _redux.combineReducers)({
    app: _app2.default, system: _system2.default
});

exports.default = index;