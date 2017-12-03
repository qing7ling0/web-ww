'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormItemNormal = exports.FormItemLabel = exports.NormalForm = undefined;

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _templateObject = _taggedTemplateLiteral(['\n  margin: 0 auto;\n'], ['\n  margin: 0 auto;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  font-size: 2rem;\n  font-weight: 500;\n  color: #000;\n  line-height: 1;\n  width: auto;\n  height: auto;\n'], ['\n  font-size: 2rem;\n  font-weight: 500;\n  color: #000;\n  line-height: 1;\n  width: auto;\n  height: auto;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  margin: 0.2rem;\n  font-size: 0.2rem;\n  font-weight: 500;\n  color: #000;\n'], ['\n  margin: 0.2rem;\n  font-size: 0.2rem;\n  font-weight: 500;\n  color: #000;\n']);

require('antd/lib/form/style/css');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var NormalForm = exports.NormalForm = (0, _styledComponents2.default)(_form2.default)(_templateObject);

var FormItemLabel = exports.FormItemLabel = _styledComponents2.default.span(_templateObject2);
var FormItemNormal = exports.FormItemNormal = (0, _styledComponents2.default)(_form2.default.Item)(_templateObject3);