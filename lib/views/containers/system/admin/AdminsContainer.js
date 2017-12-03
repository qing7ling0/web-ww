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

var _styled = require('./styled');

var _actions = require('../../../actions');

var _actions2 = _interopRequireDefault(_actions);

var _ContentComponent = require('../../common/ContentComponent');

var _ContentComponent2 = _interopRequireDefault(_ContentComponent);

var _ContentHeaderComponent = require('../../common/ContentHeaderComponent');

var _ContentHeaderComponent2 = _interopRequireDefault(_ContentHeaderComponent);

var _DataContentComponent = require('../../common/DataContentComponent');

var _DataContentComponent2 = _interopRequireDefault(_DataContentComponent);

var _Constants = require('../../../constants/Constants');

var constants = _interopRequireWildcard(_Constants);

var _Navigation = require('../../../modules/Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

var _AdminAddModal = require('./AdminAddModal');

var _AdminAddModal2 = _interopRequireDefault(_AdminAddModal);

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

var AdminsContainer = function (_Component) {
  _inherits(AdminsContainer, _Component);

  // 构造函数，在创建组件的时候调用一次
  function AdminsContainer(props) {
    _classCallCheck(this, AdminsContainer);

    var _this = _possibleConstructorReturn(this, (AdminsContainer.__proto__ || Object.getPrototypeOf(AdminsContainer)).call(this, props));

    _this.onRowSelectionChange = function (selectedRowKeys, selectedRows) {
      // console.log('selectedRowKeys' + JSON.stringify(selectedRowKeys) + '; selectedRows=' + JSON.stringify(selectedRows ))
    };

    _this.onRowClick = function (record, index, event) {
      // console.log('record' + JSON.stringify(record) + '; index=' + index + '; EVENT=' + event)
    };

    _this.state = {
      addVisible: false
    };
    _this.navigation = new _Navigation2.default(_this.props.history);
    return _this;
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次


  _createClass(AdminsContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _styled.Root,
        null,
        _react2.default.createElement(_ContentHeaderComponent2.default, { willSelectNavKey: constants.MENU_IDS.systemAdmin, history: this.props.history }),
        _react2.default.createElement(
          _ContentComponent2.default,
          null,
          _react2.default.createElement(
            _DataContentComponent2.default,
            { listener: function listener(e) {
                if (e === 'add') {
                  // let path = `${this.props.history.location.pathname}/edit/0`;
                  // this.navigation.push(path)
                  _this2.setState({ addVisible: true });
                } else if (e === 'delArray') {}
              } },
            _react2.default.createElement(_table2.default, {
              columns: columns,
              dataSource: data,
              onRowClick: this.onRowClick,
              rowSelection: { onChange: this.onRowSelectionChange }
            })
          )
        ),
        this.state.addVisible ? _react2.default.createElement(_AdminAddModal2.default, { title: '账号添加', visible: this.state.addVisible, afterClose: function afterClose() {
            return _this2.setState({ addVisible: false });
          } }) : null
      );
    }
  }]);

  return AdminsContainer;
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
})(AdminsContainer);