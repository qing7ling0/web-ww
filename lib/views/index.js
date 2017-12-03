'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _App = require('./containers/App');

var _App2 = _interopRequireDefault(_App);

var _reactRedux = require('react-redux');

var _ConfigureStore = require('./ConfigureStore');

var _ConfigureStore2 = _interopRequireDefault(_ConfigureStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-register');
require('babel-polyfill');

var store = (0, _ConfigureStore2.default)(); //获取store
(0, _reactTapEventPlugin2.default)();

_reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_App2.default, null)
), document.getElementById('root'));