'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelLarge = exports.LabelSmall = exports.Label = exports.TitleLarge = exports.TitleSmall = exports.Title = exports.H2 = exports.H1 = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  text-align: center;\n  color: #fff;\n'], ['\n  text-align: center;\n  color: #fff;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  font-size: 0.15em;\n'], ['\n  font-size: 0.15em;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  font-size: 0.12em;\n'], ['\n  font-size: 0.12em;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  font-size: 0.1rem;\n  color: #333;\n'], ['\n  font-size: 0.1rem;\n  color: #333;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  font-size: 0.08rem;\n  color: #333;\n'], ['\n  font-size: 0.08rem;\n  color: #333;\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  font-size: 0.12rem;\n'], ['\n  font-size: 0.12rem;\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n  font-size: 0.08rem;\n  color: #555;\n'], ['\n  font-size: 0.08rem;\n  color: #555;\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n  font-size: 0.06rem;\n'], ['\n  font-size: 0.06rem;\n']),
    _templateObject9 = _taggedTemplateLiteral(['\n  font-size: 0.1rem;\n'], ['\n  font-size: 0.1rem;\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Hx = _styledComponents2.default.h1(_templateObject);

var H1 = exports.H1 = Hx.extend(_templateObject2);
var H2 = exports.H2 = Hx.extend(_templateObject3);
var Title = exports.Title = _styledComponents2.default.span(_templateObject4);
var TitleSmall = exports.TitleSmall = Title.extend(_templateObject5);
var TitleLarge = exports.TitleLarge = Title.extend(_templateObject6);
var Label = exports.Label = _styledComponents2.default.span(_templateObject7);
var LabelSmall = exports.LabelSmall = Label.extend(_templateObject8);
var LabelLarge = exports.LabelLarge = Label.extend(_templateObject9);