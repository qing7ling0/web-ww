'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _menu = require('antd/lib/menu');

var _menu2 = _interopRequireDefault(_menu);

var _layout = require('antd/lib/layout');

var _layout2 = _interopRequireDefault(_layout);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd/lib/icon/style/css');

require('antd/lib/menu/style/css');

require('antd/lib/layout/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reactRouterDom = require('react-router-dom');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _actions = require('../../../actions');

var _actions2 = _interopRequireDefault(_actions);

var _BaseComponent2 = require('../../../components/BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

var _NavComponent = require('./NavComponent.styled');

var _constants = require('../../../constants/constants');

var constants = _interopRequireWildcard(_constants);

var _Utils = require('../../../../base/utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sider = _layout2.default.Sider;
var SubMenu = _menu2.default.SubMenu;

var NavComponent = function (_BaseComponent) {
  _inherits(NavComponent, _BaseComponent);

  // 构造函数，在创建组件的时候调用一次
  function NavComponent(props) {
    _classCallCheck(this, NavComponent);

    var _this = _possibleConstructorReturn(this, (NavComponent.__proto__ || Object.getPrototypeOf(NavComponent)).call(this, props));

    _this.state = {
      loading: false,
      success: true,
      openKeys: [],
      selectedKeys: []
    };
    _this.renderSubMenus = _this._renderSubMenus.bind(_this);
    _this.navReset = _this._navReset.bind(_this);
    _this.onOpenChange = _this._onOpenChange.bind(_this);
    return _this;
  }

  _createClass(NavComponent, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.navReset(this.props.currentNavKey);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextProps.currentNavKey !== this.props.currentNavKey) {
        this.navReset(nextProps.currentNavKey);
      }
    }
  }, {
    key: 'onRender',
    value: function onRender() {
      var _this2 = this;

      var items = this.renderSubMenus(this.props.menus, true);
      return _react2.default.createElement(
        _NavComponent.Root,
        null,
        _react2.default.createElement(
          _NavComponent.HeaderContainer,
          null,
          'Bola Family'
        ),
        _react2.default.createElement(
          _NavComponent.MenuContainer,
          {
            mode: 'inline',
            theme: 'dark',
            inlineCollapsed: 'false',
            openKeys: this.state.openKeys,
            selectedKeys: this.state.selectedKeys,
            onOpenChange: this.onOpenChange,
            onClick: function onClick(item) {
              // this.props.reqSelectNav(item.key);
              _this2.props.history.replace(_this2.props.routersIDMap[item.key].url);
            }
          },
          items
        )
      );
    }
  }, {
    key: '_onOpenChange',
    value: function _onOpenChange(openKeys) {
      // const latestOpenKey = utils.StringToInt(openKeys.find(key => this.state.openKeys.indexOf(key) === -1), 0);

      // if (latestOpenKey > 0 && latestOpenKey < 100) {
      //   this.setState({openKeys:[latestOpenKey]})
      // } else if (latestOpenKey > 100) {
      //   this.setState({openKeys:openKeys});
      // } else {
      //   this.setState({openKeys:[]})
      // }
      this.setState({ openKeys: openKeys });
    }
  }, {
    key: '_navReset',
    value: function _navReset(key) {
      var numKey = _Utils2.default.StringToInt(key, 0);
      var arrNav = [];
      while (numKey > 0) {
        arrNav.push(numKey);
        numKey = Math.floor(numKey / 100);
      }
      var _selectedKeys = [];
      var _openKeys = this.state.openKeys;
      for (var i = 0; i < arrNav.length; i++) {
        if (i === 0) {
          _selectedKeys.push(arrNav[i] + '');
        } else {
          var _key = arrNav[i] + '';
          if (_openKeys.indexOf(_key) === -1) {
            _openKeys.push(arrNav[i] + '');
          }
        }
      }

      this.setState({ openKeys: _openKeys, selectedKeys: _selectedKeys });
    }
  }, {
    key: '_renderSubMenus',
    value: function _renderSubMenus(subMenus, sub) {
      var _this3 = this;

      if (!subMenus) return null;

      return subMenus.map(function (item, index) {
        var view = null;
        if (sub) {
          if (item.subMenus) {
            var subViews = _this3.renderSubMenus(item.subMenus, false);
            view = _react2.default.createElement(
              _NavComponent.SubMenuContainer,
              { key: item.id, title: _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(_icon2.default, { type: item.icon }),
                  _react2.default.createElement(
                    _NavComponent.MenuTitle,
                    null,
                    item.name
                  )
                ) },
              subViews
            );
          } else {
            view = _react2.default.createElement(
              _menu2.default.Item,
              { key: item.id },
              _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_icon2.default, { type: item.icon }),
                _react2.default.createElement(
                  _NavComponent.MenuTitle,
                  null,
                  item.name
                )
              )
            );
          }
        } else {
          if (item.subMenus) {
            var _subViews = _this3.renderSubMenus(item.subMenus, false);
            view = _react2.default.createElement(
              SubMenu,
              { key: item.id, title: _react2.default.createElement(
                  _NavComponent.MenuSubTitle,
                  null,
                  item.name
                ) },
              _subViews
            );
          } else {
            view = _react2.default.createElement(
              _menu2.default.Item,
              { key: item.id },
              _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_icon2.default, { type: 'right' }),
                _react2.default.createElement(
                  _NavComponent.MenuSubTitle,
                  null,
                  item.name
                )
              )
            );
          }
        }
        return view;
      });
    }
  }]);

  return NavComponent;
}(_BaseComponent3.default);

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    menus: state.app.menus,
    currentNavKey: state.app.currentNavKey,
    routersIDMap: state.app.routersIDMap
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)({
    reqLoad: _actions2.default.Load,
    reqUserListGet: _actions2.default.getUserList,
    reqUserAdd: _actions2.default.addUser,
    reqSelectNav: _actions2.default.selectNav
  }, dispatch);
})(NavComponent);