'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = require('antd/lib/card');

var _card2 = _interopRequireDefault(_card);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  padding: 0.24rem 0.24rem 0 0.24rem;\n'], ['\n  padding: 0.24rem 0.24rem 0 0.24rem;\n']);

require('antd/lib/card/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _actions = require('../../actions');

var _actions2 = _interopRequireDefault(_actions);

var _BaseComponent = require('../../components/BaseComponent');

var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

var _Constants = require('../../constants/Constants');

var constants = _interopRequireWildcard(_Constants);

var _ContentHeaderComponent = require('./ContentHeaderComponent');

var _ContentHeaderComponent2 = _interopRequireDefault(_ContentHeaderComponent);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Root = _styledComponents2.default.div(_templateObject);

var ContentContainer = function (_Component) {
  _inherits(ContentContainer, _Component);

  // 构造函数，在创建组件的时候调用一次
  function ContentContainer(props) {
    _classCallCheck(this, ContentContainer);

    return _possibleConstructorReturn(this, (ContentContainer.__proto__ || Object.getPrototypeOf(ContentContainer)).call(this, props));
  }

  _createClass(ContentContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        Root,
        null,
        _react2.default.createElement(
          _card2.default,
          null,
          this.props.children
        )
      );
    }
  }]);

  return ContentContainer;
}(_react.Component);

exports.default = ContentContainer;