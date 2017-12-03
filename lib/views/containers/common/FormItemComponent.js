'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _upload = require('antd/lib/upload');

var _upload2 = _interopRequireDefault(_upload);

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _checkbox = require('antd/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _inputNumber = require('antd/lib/input-number');

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _autoComplete = require('antd/lib/auto-complete');

var _autoComplete2 = _interopRequireDefault(_autoComplete);

var _radio = require('antd/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd/lib/upload/style/css');

require('antd/lib/button/style/css');

require('antd/lib/icon/style/css');

require('antd/lib/checkbox/style/css');

require('antd/lib/input-number/style/css');

require('antd/lib/input/style/css');

require('antd/lib/auto-complete/style/css');

require('antd/lib/radio/style/css');

require('antd/lib/select/style/css');

require('antd/lib/form/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Constants = require('../../constants/Constants');

var constants = _interopRequireWildcard(_Constants);

var _common = require('./common.styled');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _form2.default.Item;
var Option = _select2.default.Option;
var RadioButton = _radio2.default.Button;
var RadioGroup = _radio2.default.Group;
var AutoCompleteOption = _autoComplete2.default.Option;

var defaultFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

var defaultInputMaxLength = 50;

var FormItemComponent = function (_Component) {
  _inherits(FormItemComponent, _Component);

  function FormItemComponent(props) {
    _classCallCheck(this, FormItemComponent);

    var _this = _possibleConstructorReturn(this, (FormItemComponent.__proto__ || Object.getPrototypeOf(FormItemComponent)).call(this, props));

    _this.createFormItem = _this.createFormItem.bind(_this);
    return _this;
  }

  _createClass(FormItemComponent, [{
    key: 'render',
    value: function render() {
      return this.createFormItem(this.props.options);
    }
  }, {
    key: 'createFormItem',
    value: function createFormItem(options) {
      var getFieldDecorator = this.props.form.getFieldDecorator;


      var itemOptions = _extends({}, defaultFormItemLayout, { label: options.label });
      itemOptions = Object.assign({}, itemOptions, options.itemOptions);
      var child = null;
      switch (options.type) {
        case 'input':
          options.inputType = options.inputType || 'text';
          child = _react2.default.createElement(_input2.default, {
            placeholder: options.placeholder || '\u8F93\u5165' + options.label,
            disabled: options.disabled,
            type: options.inputType
          });
          break;
        case 'number':
          child = _react2.default.createElement(_inputNumber2.default, {
            min: options.min || 0,
            max: options.max === 0 ? 0 : options.max || Number.MAX_VALUE,
            disabled: options.disabled,
            precision: options.precision,
            parser: options.parser
          });
          break;
        case 'select':
          child = _react2.default.createElement(
            _select2.default,
            { placeholder: options.placeholder, mode: options.mode || '' },
            options.selectItems.map(function (item, index) {
              if (item.render) {
                return _react2.default.createElement(
                  Option,
                  { value: item.value },
                  item.render(item, index)
                );
              } else {
                return _react2.default.createElement(
                  Option,
                  { value: item.value },
                  item.label
                );
              }
            })
          );
          break;
        case 'checkbox':
          if (options.checkboxItems.length === 1) {
            child = _react2.default.createElement(
              _checkbox2.default,
              { disabled: options.disabled },
              options.checkboxItems[0].label
            );
          } else {
            var items = null;
            if (options.render) {
              child = _react2.default.createElement(
                _checkbox2.default.Group,
                { disabled: options.disabled },
                options.render(options.checkboxItems)
              );
            } else {
              child = _react2.default.createElement(_checkbox2.default.Group, { options: options.checkboxItems, disabled: options.disabled });
            }
          }
          break;
        case 'radioGroup':
          child = _react2.default.createElement(RadioGroup, { options: options.radioItems, disabled: options.disabled });
          break;
        case 'radioButton':
          child = _react2.default.createElement(
            RadioGroup,
            { disabled: options.disabled },
            options.radioItems.map(function (item, index) {
              return _react2.default.createElement(
                RadioButton,
                { key: item.value, value: item.value },
                item.label
              );
            })
          );
          break;
        case 'switch':
          child = _react2.default.createElement(Switch, { disabled: options.disabled });
          break;
        case 'upload':
          child = _react2.default.createElement(
            _upload2.default,
            { name: options.name, action: options.action, listType: options.listType },
            _react2.default.createElement(
              _button2.default,
              null,
              _react2.default.createElement(_icon2.default, { type: 'upload' }),
              '\u70B9\u51FB\u4E0A\u4F20'
            )
          );
          break;
      }
      var rules = [];
      if (options.rules) {
        rules = rules.concat(options.rules);
      } else {
        if (options.rule.type) {
          rules.push({ type: options.rule.type, message: '\u8F93\u5165\u7684' + options.label + '\u4E0D\u5408\u6CD5' });
        }
        if (options.rule.required) {
          rules.push({ required: true, message: '\u8BF7\u8F93\u5165' + options.label });
        }
        if (options.rule.pattern) {
          rules.push({ pattern: options.rule.pattern, message: '\u8F93\u5165\u7684' + options.label + '\u4E0D\u5408\u6CD5' });
        }
        if (options.rule.whitespace) {
          // 必选不能是空格
          rules.push({ whitespace: options.rule.whitespace, message: '\u8BF7\u8F93\u5165' + options.label });
        }
        if (options.rule.validator) {
          rules.push({ validator: options.rule.validator });
        }
        if (options.rule.len) {
          rules.push({ len: options.rule.len, message: '\u5B57\u7B26\u4E0D\u80FD\u8D85\u8FC7' + options.rule.len + '\u4E2A' });
        }
        if (options.rule.max || options.rule.min) {
          var msg = '';
          if (options.rule.hasOwnProperty('max') && options.rule.hasOwnProperty('min')) {
            msg = '\u5B57\u7B26\u4E2A\u6570\u5728' + options.rule.min + '-' + options.rule.max + '\u4E4B\u95F4';
          } else if (options.rule.hasOwnProperty('max')) {
            msg = '\u5B57\u7B26\u4E2A\u6570\u4E0D\u80FD\u8D85\u8FC7' + options.rule.max + '\u4E2A';
          } else {
            msg = '\u5B57\u7B26\u4E2A\u6570\u4E0D\u80FD\u5C11\u4E8E' + options.rule.max + '\u4E2A';
          }
          rules.push({ max: options.rule.max, min: options.rule.min, message: msg });
        }
      }

      var fieldOp = {};
      if (options.hasOwnProperty("valuePropName")) {
        fieldOp.valuePropName = options.valuePropName;
      }
      if (options.hasOwnProperty("getValueFromEvent")) {
        fieldOp.getValueFromEvent = options.getValueFromEvent;
      }
      if (options.hasOwnProperty("value")) {
        fieldOp.initialValue = options.value;
      }
      if (rules) {
        fieldOp.rules = rules;
      }
      return _react2.default.createElement(
        _common.FormItemNormal,
        _extends({
          key: options.name
        }, itemOptions),
        getFieldDecorator(options.name, fieldOp)(child)
      );
    }
  }]);

  return FormItemComponent;
}(_react.Component);

exports.default = FormItemComponent;