'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseMenuSubTitle = exports.BaseMenuTitle = exports.BaseLoading = exports.ErrorTitle = exports.BaseH2 = exports.BaseH1 = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  font-size: 0.15em;\n  text-align: center;\n  color: #fff;\n'], ['\n  font-size: 0.15em;\n  text-align: center;\n  color: #fff;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  font-size: 0.12em;\n  text-align: center;\n  color: #fff;\n'], ['\n  font-size: 0.12em;\n  text-align: center;\n  color: #fff;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  font-size: 0.12em;\n  text-align: center;\n  color: #f00;\n'], ['\n  font-size: 0.12em;\n  text-align: center;\n  color: #f00;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 0.2em;\n'], ['\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 0.2em;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  font-size: 0.1rem;\n  color: #333;\n  font-weight: 500;\n'], ['\n  font-size: 0.1rem;\n  color: #333;\n  font-weight: 500;\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  font-size: 0.09rem;\n  color: #333;\n'], ['\n  font-size: 0.09rem;\n  color: #333;\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var BaseH1 = exports.BaseH1 = _styledComponents2.default.h1(_templateObject);

var BaseH2 = exports.BaseH2 = _styledComponents2.default.h2(_templateObject2);

var ErrorTitle = exports.ErrorTitle = _styledComponents2.default.h2(_templateObject3);

var BaseLoading = exports.BaseLoading = _styledComponents2.default.div(_templateObject4);

var BaseMenuTitle = exports.BaseMenuTitle = _styledComponents2.default.span(_templateObject5);

var BaseMenuSubTitle = exports.BaseMenuSubTitle = _styledComponents2.default.span(_templateObject6);