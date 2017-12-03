'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchStrapInputType = exports.watchStrapType = exports.watchStrapInputFields = exports.beltInputType = exports.beltType = exports.beltInputFields = exports.footInputType = exports.footType = exports.footInputFields = exports.customerInputType = exports.customerType = exports.customerFields = exports.customerInputFields = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _commonFields = require('../common/common-fields');

var _commonFields2 = _interopRequireDefault(_commonFields);

var _constants = require('../../constants/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customerInputFields = exports.customerInputFields = {
  name: { type: _graphql.GraphQLString, description: '姓名' },
  phone: { type: _graphql.GraphQLString, description: '电话' },
  sex: { type: _graphql.GraphQLString },
  birthday: { type: _graphql.GraphQLString },
  vip_card: { type: _graphql.GraphQLString },
  vip_card_date: { type: _graphql.GraphQLString, description: '开卡日期' },
  vip_card_shop: { type: _graphql.GraphQLString, description: '开卡门店' },
  vip_card_guide: { type: _graphql.GraphQLString, description: '开卡导购' },
  vip_level: { type: _graphql.GraphQLInt },
  join_type: { type: _graphql.GraphQLString, description: '加入方式' }
};
var customerFields = exports.customerFields = _extends({
  _id: { type: _graphql.GraphQLString }
}, customerInputFields, _commonFields2.default.defaultCreateFields);

var customerType = exports.customerType = new _graphql.GraphQLObjectType({
  name: 'customer',
  fields: _extends({}, customerFields)
});

var customerInputType = exports.customerInputType = new _graphql.GraphQLInputObjectType({
  name: 'customerInput',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, customerInputFields)
});

var footInputFields = exports.footInputFields = {
  type: { type: _graphql.GraphQLString, description: '左右脚' },
  size: { type: _graphql.GraphQLFloat, description: '尺码' },
  length: { type: _graphql.GraphQLFloat, description: '长度' },
  zhiWei: { type: _graphql.GraphQLFloat, decription: '趾围' },
  fuWei: { type: _graphql.GraphQLFloat, decription: '附维' }
};
var footType = exports.footType = new _graphql.GraphQLObjectType({
  name: 'footType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, footInputFields, _commonFields2.default.defaultCreateFields)
});
var footInputType = exports.footInputType = new _graphql.GraphQLInputObjectType({
  name: 'footInputType',
  fields: _extends({}, footInputFields)
});

// 皮带尺寸
var beltInputFields = exports.beltInputFields = {
  A: { type: _graphql.GraphQLFloat, description: 'A' },
  B: { type: _graphql.GraphQLFloat, decription: 'B' },
  C: { type: _graphql.GraphQLFloat, decription: 'C' },
  D: { type: _graphql.GraphQLFloat, decription: 'D' }
};
var beltType = exports.beltType = new _graphql.GraphQLObjectType({
  name: 'beltType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, beltInputFields, _commonFields2.default.defaultCreateFields)
});
var beltInputType = exports.beltInputType = new _graphql.GraphQLInputObjectType({
  name: 'beltInputType',
  fields: _extends({}, beltInputFields)
});

// 表带尺寸
var watchStrapInputFields = exports.watchStrapInputFields = {
  A: { type: _graphql.GraphQLFloat, description: 'A' },
  B: { type: _graphql.GraphQLFloat, decription: 'B' },
  C: { type: _graphql.GraphQLFloat, decription: 'C' },
  D: { type: _graphql.GraphQLFloat, decription: 'D' },
  E: { type: _graphql.GraphQLFloat, decription: 'E' },
  F: { type: _graphql.GraphQLFloat, decription: 'F' },
  G: { type: _graphql.GraphQLFloat, decription: 'G' }
};
var watchStrapType = exports.watchStrapType = new _graphql.GraphQLObjectType({
  name: 'watchStrapType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, watchStrapInputFields, _commonFields2.default.defaultCreateFields)
});
var watchStrapInputType = exports.watchStrapInputType = new _graphql.GraphQLInputObjectType({
  name: 'watchStrapInputType',
  fields: _extends({}, watchStrapInputFields)
});
//# sourceMappingURL=types.js.map