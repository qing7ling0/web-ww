'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layout = require('antd/lib/layout');

var _layout2 = _interopRequireDefault(_layout);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd/lib/layout/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _actions = require('../../actions');

var _actions2 = _interopRequireDefault(_actions);

var _BaseComponent2 = require('../../components/BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = _layout2.default.Header,
    Content = _layout2.default.Content,
    Footer = _layout2.default.Footer;

var FooterContainer = function (_BaseComponent) {
  _inherits(FooterContainer, _BaseComponent);

  // 构造函数，在创建组件的时候调用一次
  function FooterContainer(props) {
    _classCallCheck(this, FooterContainer);

    var _this = _possibleConstructorReturn(this, (FooterContainer.__proto__ || Object.getPrototypeOf(FooterContainer)).call(this, props));

    _this.state = {
      loading: false,
      success: true
    };
    return _this;
  }

  _createClass(FooterContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'onRender',
    value: function onRender() {
      return _react2.default.createElement(
        Footer,
        { style: { textAlign: 'center', backgournd: '#e6e8ea' } },
        _react2.default.createElement(
          'span',
          null,
          '\xA9 2016-2017 Bola Family.cn. All rights reserved.'
        )
      );
    }
  }]);

  return FooterContainer;
}(_BaseComponent3.default);

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    app: state.app
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)({
    reqLoad: _actions2.default.Load,
    reqUserListGet: _actions2.default.getUserList,
    reqUserAdd: _actions2.default.addUser
  }, dispatch);
})(FooterContainer);