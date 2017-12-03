'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentContainer = undefined;

var _layout = require('antd/lib/layout');

var _layout2 = _interopRequireDefault(_layout);

var _templateObject = _taggedTemplateLiteral(['\n  padding: 0 0;\n'], ['\n  padding: 0 0;\n']);

require('antd/lib/layout/style/css');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Header = _layout2.default.Header,
    Content = _layout2.default.Content,
    Sider = _layout2.default.Sider,
    Footer = _layout2.default.Footer;
var ContentContainer = exports.ContentContainer = _styledComponents2.default.div(_templateObject);