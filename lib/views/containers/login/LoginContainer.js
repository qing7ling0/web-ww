'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _message2 = require('antd/lib/message');

var _message3 = _interopRequireDefault(_message2);

var _layout = require('antd/lib/layout');

var _layout2 = _interopRequireDefault(_layout);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

require('antd/lib/message/style/css');

require('antd/lib/layout/style/css');

require('antd/lib/icon/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _LoginContainer = require('./LoginContainer.styled');

var _actions = require('../../actions');

var _actions2 = _interopRequireDefault(_actions);

var _Navigation = require('../../modules/Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

var _BaseContainer2 = require('../../components/BaseContainer');

var _BaseContainer3 = _interopRequireDefault(_BaseContainer2);

var _FooterComponent = require('../common/FooterComponent');

var _FooterComponent2 = _interopRequireDefault(_FooterComponent);

var _Constants = require('../../constants/Constants');

var constants = _interopRequireWildcard(_Constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginContainer = function (_BaseContainer) {
  _inherits(LoginContainer, _BaseContainer);

  // 构造函数，在创建组件的时候调用一次
  function LoginContainer(props) {
    _classCallCheck(this, LoginContainer);

    var _this = _possibleConstructorReturn(this, (LoginContainer.__proto__ || Object.getPrototypeOf(LoginContainer)).call(this, props));

    _this.state = {
      loading: false,
      success: true,
      account: '',
      password: '',
      accountError: false,
      passwordError: false
    };

    _this.onAccountChange = _this._onAccountChange.bind(_this);
    _this.onPasswordChange = _this._onPasswordChange.bind(_this);
    _this.onEmitEmptyAccount = _this._onEmitEmptyAccount.bind(_this);
    _this.onEmitEmptyPassowrd = _this._onEmitEmptyPassowrd.bind(_this);
    _this.onLoginBtnClicked = _this._onLoginBtnClicked.bind(_this);
    _this.getInputSuffix = _this._getInputSuffix.bind(_this);
    return _this;
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次


  _createClass(LoginContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.navigation = new _Navigation2.default(this.props.history);
      // const {Load} = this.props;
      // Load();
    }

    // 在组件挂载之后调用一次。这个时候，子主键也都挂载好了，可以在这里使用refs

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}

    // props是父组件传递给子组件的。
    // 父组件发生render的时候子组件就会调用componentWillReceiveProps
    //（不管props有没有更新，也不管父子组件之间有没有数据交换）

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      _get(LoginContainer.prototype.__proto__ || Object.getPrototypeOf(LoginContainer.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
      if (nextProps.loginInfo.code === 0) {
        this.navigation.push("/home");
      }
    }

    // 组件挂载之后，每次调用setState后都会
    // 调用shouldComponentUpdate判断是否需要重新渲染组件。
    // 默认返回true，需要重新render。
    // 在比较复杂的应用里，有一些数据的改变并不影响界面展示，
    // 可以在这里做判断，优化渲染效率

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return true;
    }

    // shouldComponentUpdate返回true或者调用forceUpdate之后，
    // componentWillUpdate会被调用

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {}

    // 除了首次render之后调用componentDidMount，
    // 其它render结束之后都是调用componentDidUpdate。
    // componentWillMount、componentDidMount和componentWillUpdate、componentDidUpdate可以对应起来。
    // 区别在于，前者只有在挂载的时候会被调用；而后者在以后的每次更新渲染之后都会被调用。

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {}

    // 组件被卸载的时候调用。一般在componentDidMount里面注册的事件需要在这里删除。

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'onRender',
    value: function onRender() {
      var _this2 = this;

      var accountSuffix = this.getInputSuffix(this.state.account, this.state.accountError, this.onEmitEmptyAccount);
      var passwordSuffix = this.getInputSuffix(this.state.password, this.state.passwordError, this.onEmitEmptyPassowrd);
      return _react2.default.createElement(
        _layout2.default,
        null,
        _react2.default.createElement(
          _layout2.default.Content,
          { style: { position: 'relative' } },
          _react2.default.createElement(
            _LoginContainer.Root,
            null,
            _react2.default.createElement(
              _LoginContainer.Container,
              null,
              _react2.default.createElement(
                _LoginContainer.LoginCard,
                { title: 'Bola Family \u767B\u5F55\u7CFB\u7EDF' },
                _react2.default.createElement(_LoginContainer.LoginInput, {
                  innerRef: function innerRef(r) {
                    return _this2.refAccountInput = r;
                  },
                  placeholder: '\u8D26\u53F7',
                  suffix: accountSuffix,
                  prefix: _react2.default.createElement(_icon2.default, { type: 'user' }),
                  size: 'large',
                  value: this.state.account,
                  onChange: this.onAccountChange }),
                _react2.default.createElement(_LoginContainer.LoginInput, {
                  innerRef: function innerRef(r) {
                    return _this2.refPasswordInput = r;
                  },
                  placeholder: '\u5BC6\u7801',
                  suffix: passwordSuffix,
                  prefix: _react2.default.createElement(_icon2.default, { type: 'lock' }),
                  size: 'large',
                  value: this.state.password,
                  onChange: this.onPasswordChange }),
                _react2.default.createElement(
                  _LoginContainer.BtnLogin,
                  { type: 'primary', size: 'large', onClick: this.onLoginBtnClicked },
                  ' ',
                  _react2.default.createElement(_icon2.default, { type: 'lock' }),
                  '\u767B\u5F55 '
                )
              )
            )
          )
        ),
        _react2.default.createElement(_FooterComponent2.default, null)
      );
    }
  }, {
    key: '_getInputSuffix',
    value: function _getInputSuffix(close, tip, cb) {
      return _react2.default.createElement(
        'span',
        null,
        tip ? _react2.default.createElement(_icon2.default, { type: 'exclamation-circle-o', style: { color: 'red', marginRight: '5px' } }) : null,
        close ? _react2.default.createElement(_icon2.default, { type: 'close-circle', onClick: cb }) : null
      );
    }
  }, {
    key: '_onEmitEmptyAccount',
    value: function _onEmitEmptyAccount() {
      if (this.refAccountInput) {
        this.refAccountInput.focus();
      }
      this.setState({ account: '' });
    }
  }, {
    key: '_onEmitEmptyPassowrd',
    value: function _onEmitEmptyPassowrd() {
      if (this.refPasswordInput) {
        this.refPasswordInput.focus();
      }
      this.setState({ password: '' });
    }
  }, {
    key: '_onAccountChange',
    value: function _onAccountChange(e) {
      this.setState({ account: e.target.value });
    }
  }, {
    key: '_onPasswordChange',
    value: function _onPasswordChange(e) {
      this.setState({ password: e.target.value });
    }
  }, {
    key: '_onLoginBtnClicked',
    value: function _onLoginBtnClicked() {
      var account = this.state.account.trim();
      var password = this.state.password.trim();

      var focusAccount = false;
      var focusPassword = false;

      if (!account) {
        _message3.default.error("账号密码不能为空!");
        focusAccount = true;
      } else if (account.length < constants.ACCOUNT_MIN_LENGTH || account.length > constants.ACCOUNT_MAX_LENGTH) {
        _message3.default.error('\u8D26\u53F7\u5BC6\u7801\u957F\u5EA6\u5728' + constants.ACCOUNT_MIN_LENGTH + '-' + constants.ACCOUNT_MAX_LENGTH + '!');
        focusAccount = true;
      } else if (!account) {
        // todo 验证字符串格式是否合法
        _message3.default.error("账号密码只能是数字、字母");
        focusAccount = true;
      }

      if (!password) {
        if (!focusAccount) _message3.default.error("账号密码不能为空!");
        focusPassword = true;
      } else if (password.length < constants.ACCOUNT_MIN_LENGTH || password.length > constants.ACCOUNT_MAX_LENGTH) {
        if (!focusAccount) _message3.default.error('\u8D26\u53F7\u5BC6\u7801\u957F\u5EA6\u5728' + constants.ACCOUNT_MIN_LENGTH + '-' + constants.ACCOUNT_MAX_LENGTH + '!');
        focusPassword = true;
      } else if (!password) {
        // todo 验证字符串格式是否合法
        if (!focusAccount) _message3.default.error("账号密码只能是数字、字母");
        focusPassword = true;
      }

      if (focusAccount || focusPassword) {
        if (focusAccount) {
          if (this.refAccountInput) {
            this.refAccountInput.focus();
          }
        }

        if (focusPassword) {
          if (this.refPasswordInput) {
            this.refPasswordInput.focus();
          }
        }
        this.setState({ accountError: focusAccount, passwordError: focusPassword });
      } else {
        this.props.reqLogin(account, password);
        this.setState({ accountError: false, passwordError: false });
      }
    }
  }]);

  return LoginContainer;
}(_BaseContainer3.default);

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    loginInfo: state.app.loginInfo,
    results: state.app.results
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)({
    reqLoad: _actions2.default.Load,
    reqLogin: _actions2.default.login
  }, dispatch);
})(LoginContainer);