'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubMenuContainer = exports.MenuSubTitle = exports.MenuTitle = exports.MenuContainer = exports.HeaderTitle = exports.HeaderContainer = exports.Root = undefined;

var _menu = require('antd/lib/menu');

var _menu2 = _interopRequireDefault(_menu);

var _layout = require('antd/lib/layout');

var _layout2 = _interopRequireDefault(_layout);

var _templateObject = _taggedTemplateLiteral(['\n  background-color: #181d20;\n'], ['\n  background-color: #181d20;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  text-align: center;\n  font-size: 0.2rem;\n  font-weight: 600;\n  color: #ccc;\n  padding: 0;\n  background-color: #181d20;\n'], ['\n  text-align: center;\n  font-size: 0.2rem;\n  font-weight: 600;\n  color: #ccc;\n  padding: 0;\n  background-color: #181d20;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n\n'], ['\n\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  font-size: 0.15rem;\n  font-weight: 700;\n'], ['\n  font-size: 0.15rem;\n  font-weight: 700;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  font-size: 0.13rem;\n'], ['\n  font-size: 0.13rem;\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  border: 0 solid #aaa;\n  border-bottom: 2px;\n'], ['\n  border: 0 solid #aaa;\n  border-bottom: 2px;\n']);

require('antd/lib/menu/style/css');

require('antd/lib/layout/style/css');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Sider = _layout2.default.Sider,
    Header = _layout2.default.Header;
var SubMenu = _menu2.default.SubMenu;
var Root = exports.Root = _styledComponents2.default.div(_templateObject);
var HeaderContainer = exports.HeaderContainer = (0, _styledComponents2.default)(Header)(_templateObject2);
var HeaderTitle = exports.HeaderTitle = _styledComponents2.default.h1(_templateObject3);

var MenuContainer = exports.MenuContainer = (0, _styledComponents2.default)(_menu2.default)(_templateObject);
var MenuTitle = exports.MenuTitle = _styledComponents2.default.span(_templateObject4);
var MenuSubTitle = exports.MenuSubTitle = _styledComponents2.default.span(_templateObject5);
var SubMenuContainer = exports.SubMenuContainer = (0, _styledComponents2.default)(SubMenu)(_templateObject6);