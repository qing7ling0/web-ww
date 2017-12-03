'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shopInputType = exports.shopType = exports.shopFields = exports.shopInputFields = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _commonFields = require('../common/common-fields');

var _commonFields2 = _interopRequireDefault(_commonFields);

var _constants = require('../../constants/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shopInputFields = exports.shopInputFields = {
  name: { type: _graphql.GraphQLString, description: '门店名称' },
  open_date: { type: _graphql.GraphQLString, description: '开业时间' },
  rents_expire_date: { type: _graphql.GraphQLString, description: '房租到期时间' },
  rent: { type: _graphql.GraphQLString, description: '租金' },
  area: { type: _graphql.GraphQLFloat, description: '面积' },
  country: { type: _graphql.GraphQLString, description: '国家' },
  region: { type: _graphql.GraphQLString, description: '大区ID' },
  province: { type: _graphql.GraphQLString, description: '省' },
  marketLevel: { type: _graphql.GraphQLString, description: '市场级别' },
  property: { type: _graphql.GraphQLString, description: '店铺性质，是否特卖等' },
  phone: { type: _graphql.GraphQLString, description: '电话' },
  address: { type: _graphql.GraphQLString, description: '地址' },
  zipcode: { type: _graphql.GraphQLString, description: '邮编' },
  close_date: { type: _graphql.GraphQLString, description: '关店时间' },
  close_reason: { type: _graphql.GraphQLString, description: '关店原因' }
};
var shopFields = exports.shopFields = _extends({
  _id: { type: _graphql.GraphQLString }
}, shopInputFields, _commonFields2.default.defaultCreateFields);

var shopType = exports.shopType = new _graphql.GraphQLObjectType({
  name: 'shop',
  fields: _extends({}, shopFields, {
    isNew: { type: _graphql.GraphQLBoolean }
  })
});

var shopInputType = exports.shopInputType = new _graphql.GraphQLInputObjectType({
  name: 'shopInput',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, shopInputFields)
});
//# sourceMappingURL=types.js.map