'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customerInputType = exports.customerType = exports.customerFields = exports.customerInputFields = undefined;

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
  weixin: { type: _graphql.GraphQLString },
  country: { type: _graphql.GraphQLString, description: '国家' },
  city: { type: _graphql.GraphQLString, description: '城市' },
  address: { type: _graphql.GraphQLString, description: '地址' },
  zipcode: { type: _graphql.GraphQLString, description: '邮编' },
  vip_card_date: { type: _graphql.GraphQLString, description: '开卡日期' },
  vip_card_shop: { type: _graphql.GraphQLString, description: '开卡门店' },
  vip_card_guide: { type: _graphql.GraphQLString, description: '开卡导购' },
  vip_level: { type: _graphql.GraphQLInt },
  join_type: { type: _graphql.GraphQLString, description: '加入方式' }
};
var customerFields = exports.customerFields = _extends({
  _id: { type: _graphql.GraphQLString }
}, customerInputFields, {
  weixin_code_pic: { type: _graphql.GraphQLString, description: '微信二维码图片' }
}, _commonFields2.default.defaultCreateFields);

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
//# sourceMappingURL=types.js.map