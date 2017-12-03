'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layout = require('antd/lib/layout');

var _layout2 = _interopRequireDefault(_layout);

require('antd/lib/layout/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

var _HeaderComponent = require('./common/HeaderComponent');

var _HeaderComponent2 = _interopRequireDefault(_HeaderComponent);

var _LoginContainer = require('./login/LoginContainer');

var _LoginContainer2 = _interopRequireDefault(_LoginContainer);

var _MainContainer = require('./main/MainContainer');

var _MainContainer2 = _interopRequireDefault(_MainContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _layout2.default.Header,
    Content = _layout2.default.Content,
    Sider = _layout2.default.Sider,
    Footer = _layout2.default.Footer;


var App = function App() {
  return _react2.default.createElement(
    _reactRouterDom.HashRouter,
    null,
    _react2.default.createElement(
      _layout2.default,
      { style: { height: '100%', background: '#e6e8ea' } },
      _react2.default.createElement(
        _layout2.default,
        null,
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _LoginContainer2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/login', component: _LoginContainer2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/home', component: _MainContainer2.default })
      )
    )
  );
};

exports.default = (0, _reactRedux.connect)()(App);