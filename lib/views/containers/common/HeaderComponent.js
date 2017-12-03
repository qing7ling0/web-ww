'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _dropdown = require('antd/lib/dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _menu = require('antd/lib/menu');

var _menu2 = _interopRequireDefault(_menu);

var _avatar = require('antd/lib/avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _layout = require('antd/lib/layout');

var _layout2 = _interopRequireDefault(_layout);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  background: #fff;\n  padding: 0 0.32rem;\n  box-shadow:0 1px 4px rgba(0, 21, 41, 0.08);\n  line-height: 0;\n'], ['\n  background: #fff;\n  padding: 0 0.32rem;\n  box-shadow:0 1px 4px rgba(0, 21, 41, 0.08);\n  line-height: 0;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  height: ', ';\n  line-height: 0;\n'], ['\n  height: ', ';\n  line-height: 0;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  float: right;\n  position: relative;\n  padding-left: 28px;\n  background: transparent;\n  border:none;\n  border-radius: 0;\n  &:hover {\n    color: #fff;\n    border:none;\n    background: rgba(16,142,233,0.3);\n    outline: none;\n    cursor:pointer\n  }\n  &:active  {\n    color: #fff;\n    border:none;\n    background: rgba(16,142,233,0.43);\n    outline: none;\n  }\n  &:focus  {\n    color: #fff;\n    border:none;\n    outline: none;\n  }\n  &:after {\n    color: #fff;\n    border:none;\n    background: transparent;\n    outline: none;\n  }\n  @media \0screen,screen9 {/* \u53EA\u652F\u6301IE6\u30017\u30018 */\n    &:hover{\n      background-color:#108ee9;\n      filter:Alpha(opacity=50);\n      position:static; /* IE6\u30017\u30018\u53EA\u80FD\u8BBE\u7F6Eposition:static(\u9ED8\u8BA4\u5C5E\u6027) \uFF0C\u5426\u5219\u4F1A\u5BFC\u81F4\u5B50\u5143\u7D20\u7EE7\u627FAlpha\u503C */\n      *zoom:1; /* \u6FC0\u6D3BIE6\u30017\u7684haslayout\u5C5E\u6027\uFF0C\u8BA9\u5B83\u8BFB\u61C2Alpha */\n    }\n  }\n  line-height: ', ';\n  height: ', ';\n'], ['\n  float: right;\n  position: relative;\n  padding-left: 28px;\n  background: transparent;\n  border:none;\n  border-radius: 0;\n  &:hover {\n    color: #fff;\n    border:none;\n    background: rgba(16,142,233,0.3);\n    outline: none;\n    cursor:pointer\n  }\n  &:active  {\n    color: #fff;\n    border:none;\n    background: rgba(16,142,233,0.43);\n    outline: none;\n  }\n  &:focus  {\n    color: #fff;\n    border:none;\n    outline: none;\n  }\n  &:after {\n    color: #fff;\n    border:none;\n    background: transparent;\n    outline: none;\n  }\n  @media \\0screen\\,screen\\9 {/* \u53EA\u652F\u6301IE6\u30017\u30018 */\n    &:hover{\n      background-color:#108ee9;\n      filter:Alpha(opacity=50);\n      position:static; /* IE6\u30017\u30018\u53EA\u80FD\u8BBE\u7F6Eposition:static(\u9ED8\u8BA4\u5C5E\u6027) \uFF0C\u5426\u5219\u4F1A\u5BFC\u81F4\u5B50\u5143\u7D20\u7EE7\u627FAlpha\u503C */\n      *zoom:1; /* \u6FC0\u6D3BIE6\u30017\u7684haslayout\u5C5E\u6027\uFF0C\u8BA9\u5B83\u8BFB\u61C2Alpha */\n    }\n  }\n  line-height: ', ';\n  height: ', ';\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  float:right;\n  border:none;\n  height: ', ';\n  font-size: 0.1rem;\n  color: #4c4f53;\n  padding: 0 15px;\n  &:hover, &:active, &:after, &:focus {\n    color: #4c4f53;\n    border:none;\n    background: transparent;\n  }\n  @media \0screen,screen9 {/* \u53EA\u652F\u6301IE6\u30017\u30018 */\n    position: relative;/* \u8BBE\u7F6E\u5B50\u5143\u7D20\u4E3A\u76F8\u5BF9\u5B9A\u4F4D\uFF0C\u53EF\u8BA9\u5B50\u5143\u7D20\u4E0D\u7EE7\u627FAlpha\u503C */\n  }\n'], ['\n  float:right;\n  border:none;\n  height: ', ';\n  font-size: 0.1rem;\n  color: #4c4f53;\n  padding: 0 15px;\n  &:hover, &:active, &:after, &:focus {\n    color: #4c4f53;\n    border:none;\n    background: transparent;\n  }\n  @media \\0screen\\,screen\\9 {/* \u53EA\u652F\u6301IE6\u30017\u30018 */\n    position: relative;/* \u8BBE\u7F6E\u5B50\u5143\u7D20\u4E3A\u76F8\u5BF9\u5B9A\u4F4D\uFF0C\u53EF\u8BA9\u5B50\u5143\u7D20\u4E0D\u7EE7\u627FAlpha\u503C */\n  }\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  background: #f56a00;\n  position: absolute;\n  top:50%;\n  left: 4px;\n  margin-top:-12px;\n  @media \0screen,screen9 {/* \u53EA\u652F\u6301IE6\u30017\u30018 */\n    position: relative;/* \u8BBE\u7F6E\u5B50\u5143\u7D20\u4E3A\u76F8\u5BF9\u5B9A\u4F4D\uFF0C\u53EF\u8BA9\u5B50\u5143\u7D20\u4E0D\u7EE7\u627FAlpha\u503C */\n  }\n'], ['\n  background: #f56a00;\n  position: absolute;\n  top:50%;\n  left: 4px;\n  margin-top:-12px;\n  @media \\0screen\\,screen\\9 {/* \u53EA\u652F\u6301IE6\u30017\u30018 */\n    position: relative;/* \u8BBE\u7F6E\u5B50\u5143\u7D20\u4E3A\u76F8\u5BF9\u5B9A\u4F4D\uFF0C\u53EF\u8BA9\u5B50\u5143\u7D20\u4E0D\u7EE7\u627FAlpha\u503C */\n  }\n']);

require('antd/lib/row/style/css');

require('antd/lib/dropdown/style/css');

require('antd/lib/button/style/css');

require('antd/lib/icon/style/css');

require('antd/lib/menu/style/css');

require('antd/lib/avatar/style/css');

require('antd/lib/col/style/css');

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

var _BaseComponent4 = require('../../components/BaseComponent.styled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Header = _layout2.default.Header,
    Content = _layout2.default.Content,
    Footer = _layout2.default.Footer;


var HEAD_HEIGHT = '0.64rem';

var Root = (0, _styledComponents2.default)(Header)(_templateObject);
var HeadCol = (0, _styledComponents2.default)(_col2.default)(_templateObject2, HEAD_HEIGHT);
var UserContainer = _styledComponents2.default.button(_templateObject3, HEAD_HEIGHT, HEAD_HEIGHT);

var UserName = _styledComponents2.default.div(_templateObject4, HEAD_HEIGHT);
var UserAvatar = (0, _styledComponents2.default)(_avatar2.default)(_templateObject5);
var USER_MENUS = [{ key: 'profile', title: '个人信息' }, { key: 'logout', title: '退出' }];

var HeaderContainer = function (_BaseComponent) {
  _inherits(HeaderContainer, _BaseComponent);

  // 构造函数，在创建组件的时候调用一次
  function HeaderContainer(props) {
    _classCallCheck(this, HeaderContainer);

    var _this = _possibleConstructorReturn(this, (HeaderContainer.__proto__ || Object.getPrototypeOf(HeaderContainer)).call(this, props));

    _this.toggleCollapsed = function () {
      _this.setState({
        collapsed: !_this.state.collapsed
      });
    };

    _this.state = {
      loading: false,
      success: true
    };

    _this.userMenus = _react2.default.createElement(
      _menu2.default,
      { onClick: function onClick(item) {
          switch (item.key) {
            case 'profile':
              break;
            case 'logout':
              _this.props.reqLogout();
              break;
          }
        } },
      USER_MENUS.map(function (item) {
        return _react2.default.createElement(
          _menu2.default.Item,
          { key: item.key },
          item.title
        );
      })
    );
    return _this;
  }

  _createClass(HeaderContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'onRender',
    value: function onRender() {
      return _react2.default.createElement(
        Root,
        null,
        _react2.default.createElement(
          _row2.default,
          null,
          _react2.default.createElement(
            HeadCol,
            { span: 6, style: { height: 64 } },
            _react2.default.createElement(
              _button2.default,
              { type: 'primary', onClick: this.toggleCollapsed },
              _react2.default.createElement(_icon2.default, { type: this.state.collapsed ? 'menu-unfold' : 'menu-fold' })
            )
          ),
          _react2.default.createElement(HeadCol, { span: 12 }),
          _react2.default.createElement(
            HeadCol,
            { span: 6, style: { height: 64 } },
            this.props.loginInfo && this.props.loginInfo.user ? _react2.default.createElement(
              _dropdown2.default,
              { overlay: this.userMenus },
              _react2.default.createElement(
                UserContainer,
                null,
                _react2.default.createElement(UserAvatar, { size: 'default', icon: 'user' }),
                _react2.default.createElement(
                  UserName,
                  { ghost: true },
                  this.props.loginInfo.user.name,
                  ' ',
                  _react2.default.createElement(_icon2.default, { type: 'down' })
                )
              )
            ) : null
          )
        )
      );
    }
  }]);

  return HeaderContainer;
}(_BaseComponent3.default);

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    loginInfo: state.app.loginInfo
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)({
    reqLoad: _actions2.default.Load,
    reqUserListGet: _actions2.default.getUserList,
    reqUserAdd: _actions2.default.addUser,
    reqLogout: _actions2.default.logout
  }, dispatch);
})(HeaderContainer);