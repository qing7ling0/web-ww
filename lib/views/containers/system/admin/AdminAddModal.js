'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _radio = require('antd/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd/lib/modal/style/css');

require('antd/lib/radio/style/css');

require('antd/lib/select/style/css');

require('antd/lib/form/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _common = require('../../common/common.styled');

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

var _common2 = require('../../../modules/common');

var common = _interopRequireWildcard(_common2);

var _FormItemComponent = require('../../common/FormItemComponent');

var _FormItemComponent2 = _interopRequireDefault(_FormItemComponent);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _form2.default.Item;
var Option = _select2.default.Option;
var RadioButton = _radio2.default.Button;
var RadioGroup = _radio2.default.Group;

var AdminAddModal = function (_Component) {
  _inherits(AdminAddModal, _Component);

  // 构造函数，在创建组件的时候调用一次
  function AdminAddModal(props) {
    _classCallCheck(this, AdminAddModal);

    var _this = _possibleConstructorReturn(this, (AdminAddModal.__proto__ || Object.getPrototypeOf(AdminAddModal)).call(this, props));

    _this.onCancel = function (e) {
      _this.setState({ visible: false, confirmLoading: false });
    };

    _this.onSubmit = function (e) {
      e.preventDefault();
      _this.props.form.validateFields(function (err, values) {
        if (!err) {
          // console.log('Received values of form: ', values);
          // this.setState({confirmLoading:true});
          _this.props.reqAddAdmin({ name: values.name }, { account: values.account, password: values.password });
        }
      });
    };

    _this.state = {
      visible: false,
      confirmLoading: false
    };
    return _this;
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次


  _createClass(AdminAddModal, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.options = [{ type: 'input', name: 'account', label: '账号', itemOptions: { hasFeedback: true }, rule: { required: true, validator: this.checkAccount } }, { type: 'input', name: 'password', label: '密码', itemOptions: { hasFeedback: true }, rule: { required: true, validator: this.checkPassword } }, { type: 'input', name: 'name', label: '姓名', itemOptions: { hasFeedback: true }, rule: { required: true, max: 20 } }];
      this.setState({ visible: this.props.visible });
    }

    // shouldComponentUpdate返回true或者调用forceUpdate之后，
    // componentWillUpdate会被调用

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      this.state.visible = nextProps.visible;
      if (!nextProps.visible) {
        this.state.confirmLoading = false;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _modal2.default,
        {
          title: this.props.title,
          visible: this.state.visible,
          onOk: this.onSubmit,
          onCancel: this.onCancel,
          confirmLoading: this.state.confirmLoading,
          afterClose: this.props.afterClose || null
        },
        _react2.default.createElement(
          _common.NormalForm,
          { onSubmit: this.onSubmit },
          this.options.map(function (item, index) {
            return _react2.default.createElement(_FormItemComponent2.default, { key: item.name, options: item, form: _this2.props.form });
          })
        )
      );
    }
  }]);

  return AdminAddModal;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    loginInfo: state.app.loginInfo,
    results: state.app.results,
    currentNavKey: state.app.currentNavKey
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)({
    reqAddAdmin: _actions2.default.addAdmin
  }, dispatch);
})(_form2.default.create()(AdminAddModal));