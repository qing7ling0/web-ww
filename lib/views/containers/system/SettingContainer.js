'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _table = require('antd/lib/table');

var _table2 = _interopRequireDefault(_table);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd/lib/table/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _SettingContainer = require('./SettingContainer.styled');

var _actions = require('../../actions');

var _actions2 = _interopRequireDefault(_actions);

var _ContentComponent = require('../common/ContentComponent');

var _ContentComponent2 = _interopRequireDefault(_ContentComponent);

var _ContentHeaderComponent = require('../common/ContentHeaderComponent');

var _ContentHeaderComponent2 = _interopRequireDefault(_ContentHeaderComponent);

var _DataContentComponent = require('../common/DataContentComponent');

var _DataContentComponent2 = _interopRequireDefault(_DataContentComponent);

var _Constants = require('../../constants/Constants');

var constants = _interopRequireWildcard(_Constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var columns = [{ title: '账号', dataIndex: 'account', key: 'account' }, { title: '姓名', dataIndex: 'name', key: 'name' }, { title: '编辑时间', dataIndex: 'editor_time', key: 'editor_time' }, { title: '操作', dataIndex: 'id', key: 'id', render: function render(text, record, index) {
    return _react2.default.createElement(
      'a',
      { href: 'javascript:void(0);' },
      '\u5220\u9664'
    );
  } }];
var data = [{
  key: '1',
  account: '32',
  name: 'John Brown',
  editor_time: 'New York No. 1 Lake Park'
}, {
  key: '2',
  name: 'Jim Green',
  account: '42',
  editor_time: 'London No. 1 Lake Park'
}, {
  key: '3',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park'
}, {
  key: '4',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park'
}, {
  key: '5',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park'
}, {
  key: '6',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park'
}, {
  key: '7',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park'
}, {
  key: '8',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park'
}, {
  key: '9',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park'
}, {
  key: '10',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park'
}, {
  key: '11',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park'
}, {
  key: '12',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park'
}, {
  key: '13',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park'
}, {
  key: '14',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park'
}, {
  key: '15',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park'
}, {
  key: '16',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park'
}, {
  key: '17',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park'
}];

var SettingContainer = function (_Component) {
  _inherits(SettingContainer, _Component);

  // 构造函数，在创建组件的时候调用一次
  function SettingContainer(props) {
    _classCallCheck(this, SettingContainer);

    var _this = _possibleConstructorReturn(this, (SettingContainer.__proto__ || Object.getPrototypeOf(SettingContainer)).call(this, props));

    _this.state = {};
    return _this;
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次


  _createClass(SettingContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _SettingContainer.Root,
        null,
        _react2.default.createElement(_ContentHeaderComponent2.default, { willSelectNavKey: constants.MENU_IDS.systemSetting, history: this.props.history }),
        _react2.default.createElement(
          _ContentComponent2.default,
          null,
          _react2.default.createElement(
            _DataContentComponent2.default,
            null,
            _react2.default.createElement(_table2.default, { columns: columns, dataSource: data })
          )
        )
      );
    }
  }]);

  return SettingContainer;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    loginInfo: state.app.loginInfo,
    results: state.app.results,
    currentNavKey: state.app.currentNavKey
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)({
    reqSelectNav: _actions2.default.selectNav
  }, dispatch);
})(SettingContainer);