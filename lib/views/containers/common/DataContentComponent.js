'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n'], ['\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  padding: 0.1rem 0;\n'], ['\n  padding: 0.1rem 0;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  margin-right: 0.08rem;\n'], ['\n  margin-right: 0.08rem;\n']);

require('antd/lib/button/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Constants = require('../../constants/Constants');

var constants = _interopRequireWildcard(_Constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Root = _styledComponents2.default.div(_templateObject);
var TableHeader = _styledComponents2.default.div(_templateObject2);
var ButtonOp = (0, _styledComponents2.default)(_button2.default)(_templateObject3);

var DataContentComponent = function (_Component) {
  _inherits(DataContentComponent, _Component);

  // 构造函数，在创建组件的时候调用一次
  function DataContentComponent(props) {
    _classCallCheck(this, DataContentComponent);

    var _this = _possibleConstructorReturn(this, (DataContentComponent.__proto__ || Object.getPrototypeOf(DataContentComponent)).call(this, props));

    _this.onClick = function (event, value) {
      if (_this.props.listener) {
        _this.props.listener(event, value);
      }
    };

    return _this;
  }

  _createClass(DataContentComponent, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var header = null;
      if (this.props.showHeader) {
        if (this.props.headerRender) {
          header = _react2.default.createElement(
            TableHeader,
            null,
            this.props.headerRender()
          );
        } else {
          header = _react2.default.createElement(
            TableHeader,
            null,
            _react2.default.createElement(
              ButtonOp,
              { type: 'primary', onClick: function onClick() {
                  return _this2.onClick('add');
                } },
              '\u6DFB\u52A0'
            ),
            _react2.default.createElement(
              ButtonOp,
              { type: 'primary', onClick: function onClick() {
                  return _this2.onClick('delArray');
                } },
              '\u6279\u91CF\u5220\u9664'
            )
          );
        }
      }

      return _react2.default.createElement(
        Root,
        null,
        header,
        this.props.children
      );
    }

    /**
     * event: add, delArray
     */

  }]);

  return DataContentComponent;
}(_react.Component);

DataContentComponent.defaultProps = {
  tableOptions: {},
  showHeader: true,
  headerRender: null,
  listener: null };
exports.default = DataContentComponent;