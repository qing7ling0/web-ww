'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderShoesInputType = exports.orderShoesType = exports.orderShoesInputFields = exports.maintainPriceInputType = exports.maintainPriceType = exports.maintainPriceInputFields = exports.goodsShoesInputType = exports.goodsShoesType = exports.goodsShoesInputFields = exports.goodsShoesFields = exports.goodsShoesBaseFields = exports.baseInputType = exports.baseType = exports.baseInputFields = exports.materialInputType = exports.materialType = exports.materialInputFields = exports.colorInputType = exports.colorType = exports.colorInputFields = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _commonFields = require('../common/common-fields');

var _commonFields2 = _interopRequireDefault(_commonFields);

var _constants = require('../../constants/constants');

var _constants2 = _interopRequireDefault(_constants);

var _types = require('../shop/types');

var shopTypes = _interopRequireWildcard(_types);

var _types2 = require('../customer/types');

var customerTypes = _interopRequireWildcard(_types2);

var _types3 = require('../user/types');

var userTypes = _interopRequireWildcard(_types3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorInputFields = exports.colorInputFields = {
  name: { type: _graphql.GraphQLString, description: '名称' },
  type: { type: _graphql.GraphQLString, description: '类型' }
};
var colorType = exports.colorType = new _graphql.GraphQLObjectType({
  name: 'colorType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, colorInputFields, _commonFields2.default.defaultCreateFields)
});
var colorInputType = exports.colorInputType = new _graphql.GraphQLInputObjectType({
  name: 'colorInputType',
  fields: _extends({}, colorInputFields)
});

var materialInputFields = exports.materialInputFields = {
  _id: { type: _graphql.GraphQLString },
  name: { type: _graphql.GraphQLString, description: '名称' },
  count: { type: _graphql.GraphQLInt, description: '数量' }
};
var materialType = exports.materialType = new _graphql.GraphQLObjectType({
  name: 'materialType',
  fields: _extends({}, materialInputFields, {
    color: { type: colorType, description: '颜色' }
  }, _commonFields2.default.defaultCreateFields)
});
var materialInputType = exports.materialInputType = new _graphql.GraphQLInputObjectType({
  name: 'materialInputType',
  fields: _extends({}, materialInputFields, {
    color: { type: _graphql.GraphQLString, description: '颜色' }
  })
});

var baseInputFields = exports.baseInputFields = {
  name: { type: _graphql.GraphQLString, description: '名称' }
};
var baseType = exports.baseType = new _graphql.GraphQLObjectType({
  name: 'baseType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, baseInputFields, _commonFields2.default.defaultCreateFields)
});
var baseInputType = exports.baseInputType = new _graphql.GraphQLInputObjectType({
  name: 'baseInputType',
  fields: _extends({}, baseInputFields)
});

var goodsShoesBaseFields = exports.goodsShoesBaseFields = {
  _id: { type: _graphql.GraphQLString },
  name: { type: _graphql.GraphQLString, description: '名称' },
  property: { type: _graphql.GraphQLString, description: '属性' },
  put_date: { type: _graphql.GraphQLString, decription: '上架时间' },
  sex: { type: _graphql.GraphQLString, decription: '男女' },
  height: { type: _graphql.GraphQLFloat, decription: '跟高' },
  price: { type: _graphql.GraphQLInt, decription: '价格' },
  xuan_hao: { type: _graphql.GraphQLString, decription: '楦号' },
  maintain_cycle: { type: _graphql.GraphQLInt, decription: '保养周期' }
};
var goodsShoesFields = exports.goodsShoesFields = _extends({}, goodsShoesBaseFields, {
  type: { type: baseType, description: '大分类' },
  style: { type: baseType, decription: '系列' },
  season: { type: baseType, decription: '季节' },
  out_color: { type: colorType, decription: '鞋面颜色' },
  in_color: { type: colorType, decription: '里皮颜色' },
  bottom_color: { type: colorType, decription: '鞋底颜色' },
  bottom_side_color: { type: colorType, decription: '底边颜色' }
});
var goodsShoesInputFields = exports.goodsShoesInputFields = _extends({}, goodsShoesBaseFields, {
  type: { type: _graphql.GraphQLString, description: '大分类' },
  style: { type: _graphql.GraphQLString, decription: '系列' },
  season: { type: _graphql.GraphQLString, decription: '季节' },
  out_color: { type: _graphql.GraphQLString, decription: '鞋面颜色' },
  in_color: { type: _graphql.GraphQLString, decription: '里皮颜色' },
  bottom_color: { type: _graphql.GraphQLString, decription: '鞋底颜色' },
  bottom_side_color: { type: _graphql.GraphQLString, decription: '底边颜色' }
});
var goodsShoesType = exports.goodsShoesType = new _graphql.GraphQLObjectType({
  name: 'goodsShoesType',
  fields: _extends({}, goodsShoesFields, _commonFields2.default.defaultCreateFields)
});
var goodsShoesInputType = exports.goodsShoesInputType = new _graphql.GraphQLInputObjectType({
  name: 'goodsShoesInputType',
  fields: _extends({}, goodsShoesInputFields)
});

var maintainPriceInputFields = exports.maintainPriceInputFields = {
  type: { type: _graphql.GraphQLString, description: '类型' },
  NID: { type: _graphql.GraphQLString, description: '编号' },
  name: { type: _graphql.GraphQLString, decription: '项目名称' },
  price: { type: _graphql.GraphQLInt, decription: '价格' },
  time: { type: _graphql.GraphQLInt, decription: '时间' }
};
var maintainPriceType = exports.maintainPriceType = new _graphql.GraphQLObjectType({
  name: 'maintainPriceType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, maintainPriceInputFields, _commonFields2.default.defaultCreateFields)
});
var maintainPriceInputType = exports.maintainPriceInputType = new _graphql.GraphQLInputObjectType({
  name: 'maintainPriceInputType',
  fields: _extends({}, maintainPriceInputFields)
});

var orderShoesInputFields = exports.orderShoesInputFields = {
  type: { type: _graphql.GraphQLString, description: '类型' },
  source: { type: _graphql.GraphQLString, description: '来源' },
  count: { type: _graphql.GraphQLInt, decription: '数量' },
  pay: { type: _graphql.GraphQLFloat, decription: '支付金额' },
  pay_type: { type: _graphql.GraphQLString, decription: '支付方式' },
  order_state: { type: _graphql.GraphQLString, decription: '订单状态' },
  transport_company: { type: _graphql.GraphQLString, decription: '快递公司' },
  transport_id: { type: _graphql.GraphQLString, decription: '快递单号' },
  transport_price: { type: _graphql.GraphQLFloat, decription: '快递费用' },
  transport_name: { type: _graphql.GraphQLString, decription: '收货人' },
  transport_phone: { type: _graphql.GraphQLString, decription: '电话' },
  transport_address: { type: _graphql.GraphQLString, decription: '收货地址' },
  transport_zipcode: { type: _graphql.GraphQLString, decription: '邮编' },
  remark: { type: _graphql.GraphQLString, ddecription: '备注' }
};

var orderShoesType = exports.orderShoesType = new _graphql.GraphQLObjectType({
  name: 'orderShoesType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString },
    shop: { type: shopTypes.shopType, decription: '店铺' },
    guide: { type: userTypes.userShopGuideType, decription: '导购' },
    customer: { type: customerTypes.customerType, decription: '客户' },
    goods: { type: goodsShoesType, decription: '商品' },
    xieXuan: { type: _graphql.GraphQLString, decription: '鞋楦型' },
    xieGen: { type: _graphql.GraphQLString, decription: '鞋跟型' },
    foot_size: { type: _graphql.GraphQLFloat, description: '尺码' },
    left_length: { type: _graphql.GraphQLFloat, description: '左脚长度' },
    left_zhiWei: { type: _graphql.GraphQLFloat, decription: '左脚趾围' },
    left_fuWei: { type: _graphql.GraphQLFloat, decription: '左脚附维' },
    right_length: { type: _graphql.GraphQLFloat, description: '右脚长度' },
    right_zhiWei: { type: _graphql.GraphQLFloat, decription: '右脚趾围' },
    right_fuWei: { type: _graphql.GraphQLFloat, decription: '右脚附维' }
  }, orderShoesInputFields, _commonFields2.default.defaultCreateFields)
});
var orderShoesInputType = exports.orderShoesInputType = new _graphql.GraphQLInputObjectType({
  name: 'orderShoesInputType',
  fields: _extends({
    shop: { type: _graphql.GraphQLString, decription: '店铺' },
    guide: { type: _graphql.GraphQLString, decription: '导购' },
    customer: { type: _graphql.GraphQLString, decription: '客户' },
    goods: { type: _graphql.GraphQLString, decription: '商品' },
    xieXuan: { type: _graphql.GraphQLString, decription: '鞋楦型' },
    xieGen: { type: _graphql.GraphQLString, decription: '鞋跟型' },
    foot_size: { type: _graphql.GraphQLFloat, description: '尺码' },
    left_length: { type: _graphql.GraphQLFloat, description: '左脚长度' },
    left_zhiWei: { type: _graphql.GraphQLFloat, decription: '左脚趾围' },
    left_fuWei: { type: _graphql.GraphQLFloat, decription: '左脚附维' },
    right_length: { type: _graphql.GraphQLFloat, description: '右脚长度' },
    right_zhiWei: { type: _graphql.GraphQLFloat, decription: '右脚趾围' },
    right_fuWei: { type: _graphql.GraphQLFloat, decription: '右脚附维' }
  }, orderShoesInputFields)
});
//# sourceMappingURL=types.js.map