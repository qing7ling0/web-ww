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

var _reactRouterDom = require('react-router-dom');

var _actions = require('../../actions');

var _actions2 = _interopRequireDefault(_actions);

var _Navigation = require('../../modules/Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

var _BaseContainer2 = require('../../components/BaseContainer');

var _BaseContainer3 = _interopRequireDefault(_BaseContainer2);

var _NavComponent = require('./components/NavComponent');

var _NavComponent2 = _interopRequireDefault(_NavComponent);

var _FooterComponent = require('../common/FooterComponent');

var _FooterComponent2 = _interopRequireDefault(_FooterComponent);

var _HeaderComponent = require('../common/HeaderComponent');

var _HeaderComponent2 = _interopRequireDefault(_HeaderComponent);

var _MainContainer = require('./MainContainer.styled');

var _MainRouters = require('./MainRouters');

var _MainRouters2 = _interopRequireDefault(_MainRouters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = _layout2.default.Header,
    Content = _layout2.default.Content,
    Sider = _layout2.default.Sider,
    Footer = _layout2.default.Footer;

var MainContainer = function (_BaseContainer) {
  _inherits(MainContainer, _BaseContainer);

  // 构造函数，在创建组件的时候调用一次
  function MainContainer(props) {
    _classCallCheck(this, MainContainer);

    var _this = _possibleConstructorReturn(this, (MainContainer.__proto__ || Object.getPrototypeOf(MainContainer)).call(this, props));

    _this.state = {
      loading: false,
      success: true
    };
    return _this;
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次


  _createClass(MainContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.navigation = new _Navigation2.default(this.props.history);
      var _props = this.props,
          reqLogin = _props.reqLogin,
          loginInfo = _props.loginInfo;

      if (!loginInfo.user) {
        reqLogin();
      }
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
      if (!nextProps.loginInfo.loading && !nextProps.loginInfo.user) {
        this.navigation.replace('/login');
      }

      if (!nextProps.navKey && nextProps.navKey !== this.props.navKey) {}
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

      return _react2.default.createElement(
        _layout2.default,
        null,
        _react2.default.createElement(
          Sider,
          { style: { overflowX: 'hidden', overflowY: 'auto', backgroundColor: '#181d20' } },
          _react2.default.createElement(_NavComponent2.default, { history: this.props.history })
        ),
        _react2.default.createElement(
          _layout2.default,
          null,
          _react2.default.createElement(_HeaderComponent2.default, null),
          _react2.default.createElement(
            Content,
            null,
            _react2.default.createElement(
              _MainContainer.ContentContainer,
              null,
              _react2.default.createElement(
                _reactRouterDom.Switch,
                null,
                _MainRouters2.default
              )
            )
          ),
          _react2.default.createElement(_FooterComponent2.default, null)
        )
      );
    }
  }]);

  return MainContainer;
}(_BaseContainer3.default);

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    app: state.app,
    loginInfo: state.app.loginInfo,
    navKey: state.app.navKey
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)({
    reqLogin: _actions2.default.login,
    reqUserListGet: _actions2.default.getUserList,
    reqUserAdd: _actions2.default.addUser
  }, dispatch);
})(MainContainer);