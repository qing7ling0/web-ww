'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layout = require('antd/lib/layout');

var _layout2 = _interopRequireDefault(_layout);

var _breadcrumb = require('antd/lib/breadcrumb');

var _breadcrumb2 = _interopRequireDefault(_breadcrumb);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  margin-top: 2px;\n  background-color: #fff;\n  padding:0.16rem 0.32rem 0 0.32rem;\n  border-bottom: 1px solid #e8e8e8;\n'], ['\n  margin-top: 2px;\n  background-color: #fff;\n  padding:0.16rem 0.32rem 0 0.32rem;\n  border-bottom: 1px solid #e8e8e8;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  font-size: 0.20rem;\n  font-weight: 600;\n  padding: 0;\n  margin: 0 0 0.16rem 0;\n  color: #000;\n'], ['\n  font-size: 0.20rem;\n  font-weight: 600;\n  padding: 0;\n  margin: 0 0 0.16rem 0;\n  color: #000;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  font-size:0.14rem;\n  margin: 0 0 0.16rem 0;\n'], ['\n  font-size:0.14rem;\n  margin: 0 0 0.16rem 0;\n']);

require('antd/lib/layout/style/css');

require('antd/lib/breadcrumb/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reactRouterDom = require('react-router-dom');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _actions = require('../../actions');

var _actions2 = _interopRequireDefault(_actions);

var _BaseComponent2 = require('../../components/BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

var _BaseComponent4 = require('../../components/BaseComponent.styled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var BreadcrumbItem = _breadcrumb2.default.Item;
var Header = _layout2.default.Header,
    Content = _layout2.default.Content,
    Footer = _layout2.default.Footer;


var Root = _styledComponents2.default.div(_templateObject);
var TitleContainer = _styledComponents2.default.div(_templateObject2);
var BreadcrumbContainer = (0, _styledComponents2.default)(_breadcrumb2.default)(_templateObject3);

var ContentHeaderComponent = function (_BaseComponent) {
  _inherits(ContentHeaderComponent, _BaseComponent);

  // 构造函数，在创建组件的时候调用一次
  function ContentHeaderComponent(props) {
    _classCallCheck(this, ContentHeaderComponent);

    var _this = _possibleConstructorReturn(this, (ContentHeaderComponent.__proto__ || Object.getPrototypeOf(ContentHeaderComponent)).call(this, props));

    _this.state = {
      loading: false,
      success: true
    };
    return _this;
  }

  _createClass(ContentHeaderComponent, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.willSelectNavKey && this.props.willSelectNavKey !== this.props.currentNavKey && this.props.reqSelectNav) {
        this.props.reqSelectNav(this.props.willSelectNavKey);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'onRender',
    value: function onRender() {
      var _this2 = this;

      var title = '首页';
      var location = this.props.history.location;

      var pathSnippets = location.pathname.split('/').filter(function (i) {
        return i;
      });
      var breadcrumbItems = pathSnippets.map(function (_, index) {
        var url = '/' + pathSnippets.slice(0, index + 1).join('/');
        if (!_this2.props.routers || !_this2.props.routers[url]) {
          title = _this2.props.title || '';
        } else {
          title = _this2.props.routers[url].name;
        }
        if (index < pathSnippets.length - 1 && _this2.props.routers[url] && _this2.props.routers[url].url) {
          return _react2.default.createElement(
            BreadcrumbItem,
            { key: url },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: url, replace: true },
              title
            )
          );
        } else {
          if (_this2.props.routers[url]) {
            return _react2.default.createElement(
              BreadcrumbItem,
              { key: url },
              title
            );
          } else {
            return null;
          }
        }
      });
      return _react2.default.createElement(
        Root,
        null,
        _react2.default.createElement(
          BreadcrumbContainer,
          null,
          breadcrumbItems
        ),
        _react2.default.createElement(
          TitleContainer,
          null,
          title
        )
      );
    }
  }]);

  return ContentHeaderComponent;
}(_BaseComponent3.default);

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    routers: state.app.routers,
    currentNavKey: state.app.currentNavKey
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)({
    reqSelectNav: _actions2.default.selectNav
  }, dispatch);
})(ContentHeaderComponent);