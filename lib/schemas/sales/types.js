'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderInputType = exports.orderType = exports.urgentInputType = exports.urgentType = exports.urgentFields = exports.customInputType = exports.customType = exports.customFields = exports.orderShoesInputType = exports.orderShoesType = exports.orderShoesInputFields = exports.maintainPriceInputType = exports.maintainPriceType = exports.maintainPriceInputFields = exports.goodsShoesInputType = exports.goodsShoesType = exports.goodsShoesInputFields = exports.goodsShoesFields = exports.goodsBaseFields = exports.baseInputType = exports.baseType = exports.baseInputFields = exports.materialInputType = exports.materialType = exports.materialInputFields = exports.colorInputType = exports.colorType = exports.colorInputFields = undefined;

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

var goodsBaseFields = exports.goodsBaseFields = {
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

var customFields = exports.customFields = {
  NID: { type: _graphql.GraphQLString, description: '内容' },
  name: { type: _graphql.GraphQLString, description: '内容' },
  price: { type: _graphql.GraphQLFloat, decription: '价格' }
};
var customType = exports.customType = new _graphql.GraphQLObjectType({
  name: 'customType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, customFields, _commonFields2.default.defaultCreateFields)
});
var customInputType = exports.customInputType = new _graphql.GraphQLInputObjectType({
  name: 'customInputType',
  fields: _extends({}, customFields)
});

var urgentFields = exports.urgentFields = {
  day: { type: _graphql.GraphQLFloat, description: '天数' },
  price: { type: _graphql.GraphQLFloat, decription: '价格' }
};
var urgentType = exports.urgentType = new _graphql.GraphQLObjectType({
  name: 'urgentType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, urgentFields, _commonFields2.default.defaultCreateFields)
});
var urgentInputType = exports.urgentInputType = new _graphql.GraphQLInputObjectType({
  name: 'urgentInputType',
  fields: _extends({}, urgentFields)
});

// 鞋
var shoesBaseFields = {
  s_count: { type: _graphql.GraphQLInt, decription: '数量' },
  s_kuanhao: { type: _graphql.GraphQLString, decription: '款号' },
  s_xieXuan: { type: _graphql.GraphQLString, decription: '鞋楦型' },
  s_xieGen: { type: _graphql.GraphQLString, decription: '鞋跟型' },
  s_guiGe: { type: _graphql.GraphQLString, decription: '规格' },
  s_material: { type: _graphql.GraphQLString, decription: '材料' },
  s_xiemian_color: { type: _graphql.GraphQLString, decription: '鞋面颜色' },
  s_neili_color: { type: _graphql.GraphQLString, decription: '内里颜色' },
  s_foot_size: { type: _graphql.GraphQLFloat, description: '尺码' },
  s_left_length: { type: _graphql.GraphQLFloat, description: '左脚长度' },
  s_left_zhiWei: { type: _graphql.GraphQLFloat, decription: '左脚趾围' },
  s_left_fuWei: { type: _graphql.GraphQLFloat, decription: '左脚附维' },
  s_right_length: { type: _graphql.GraphQLFloat, description: '右脚长度' },
  s_right_zhiWei: { type: _graphql.GraphQLFloat, decription: '右脚趾围' },
  s_right_fuWei: { type: _graphql.GraphQLFloat, decription: '右脚附维' },
  s_urgent_day: { type: _graphql.GraphQLInt, decription: '加急天数' },
  s_urgent_price: { type: _graphql.GraphQLFloat, decription: '加急价格' }
};

var shoesFields = _extends({}, shoesBaseFields, {
  s_customs: { type: new _graphql.GraphQLList(customType) }, // 特殊定制
  s_shoes: { type: goodsShoesType, decription: '商品' }
});

var shoesInputFields = _extends({}, shoesBaseFields, {
  s_customs: { type: new _graphql.GraphQLList(customInputType) }, // 特殊定制
  s_shoes: { type: _graphql.GraphQLString, decription: '商品' }

  // 皮带
});var beltBaseFields = {
  // b_belt: {type:Schema.Types.ObjectId, ref:'goods_shoes', decription:'商品'},
  b_NID: { type: _graphql.GraphQLString, decription: '编号' },
  b_kuanhao: { type: _graphql.GraphQLString, decription: '款号' },
  b_material: { type: _graphql.GraphQLString, decription: '材质' },
  b_color: { type: _graphql.GraphQLString, decription: '颜色' },
  b_A: { type: _graphql.GraphQLFloat, decription: '皮带测量数据A' },
  b_B: { type: _graphql.GraphQLFloat, decription: '皮带测量数据B' },
  b_C: { type: _graphql.GraphQLFloat, decription: '皮带测量数据C' },
  b_D: { type: _graphql.GraphQLFloat, decription: '皮带测量数据D' },
  b_size_remark: { type: _graphql.GraphQLString, decription: '皮带测量备注' }
};
var beltFields = _extends({}, beltBaseFields);
var beltInputFields = _extends({}, beltBaseFields);

// 表带
var watchStrapBaseFields = {
  bs_NID: { type: _graphql.GraphQLString, decription: '编号' },
  bs_kuanhao: { type: _graphql.GraphQLString, decription: '款号' },
  bs_material: { type: _graphql.GraphQLString, decription: '材质' },
  bs_color: { type: _graphql.GraphQLString, decription: '颜色' },
  bs_type: { type: _graphql.GraphQLString, decription: '类别，男女' },
  bs_A: { type: _graphql.GraphQLFloat, decription: '表带测量数据A' },
  bs_B: { type: _graphql.GraphQLFloat, decription: '表带测量数据B' },
  bs_C: { type: _graphql.GraphQLFloat, decription: '表带测量数据C' },
  bs_D: { type: _graphql.GraphQLFloat, decription: '表带测量数据D' },
  bs_E: { type: _graphql.GraphQLFloat, decription: '表带测量数据E' },
  bs_F: { type: _graphql.GraphQLFloat, decription: '表带测量数据F' },
  bs_G: { type: _graphql.GraphQLFloat, decription: '表带测量数据G' },
  bs_watch_brand: { type: _graphql.GraphQLString, decription: '手表品牌' },
  bs_size_remark: { type: _graphql.GraphQLString, decription: '表带测量备注' }
};
var watchStrapFields = _extends({}, watchStrapBaseFields);
var watchStrapInputFields = _extends({}, watchStrapBaseFields);

// 护理
var maintainBaseFields = {
  m_NID: { type: _graphql.GraphQLString, decription: '编号' },
  m_name: { type: _graphql.GraphQLString, decription: '护理内容' },
  m_price: { type: _graphql.GraphQLString, decription: '护理价格' },
  m_time: { type: _graphql.GraphQLFloat, decription: '护理时间' },
  m_color: { type: _graphql.GraphQLString, decription: '颜色' },
  m_demo: { type: _graphql.GraphQLString, decription: '样品' },
  m_wash: { type: _graphql.GraphQLBoolean, decription: '是否水洗' }
};
var maintainFields = _extends({}, maintainBaseFields);
var maintainInputFields = _extends({}, maintainBaseFields);

// 辅料
var fuliaoBaseFields = {
  f_NID: { type: _graphql.GraphQLString, decription: '编号' },
  f_name: { type: _graphql.GraphQLString, decription: '名称' },
  f_kuanhao: { type: _graphql.GraphQLString, decription: '款号' }
};
var fuliaoFields = _extends({}, fuliaoBaseFields);
var fuliaoInputFields = _extends({}, fuliaoBaseFields);

// 配饰
var ornamentBaseFields = {
  o_NID: { type: _graphql.GraphQLString, decription: '编号' },
  o_name: { type: _graphql.GraphQLString, decription: '名称' },
  o_kuanhao: { type: _graphql.GraphQLString, decription: '款号' }
};
var ornamentFields = _extends({}, ornamentBaseFields);
var ornamentInputFields = _extends({}, ornamentBaseFields);

var orderBaseFields = {
  type: { type: _graphql.GraphQLString, description: '类型' },
  source: { type: _graphql.GraphQLString, description: '来源' },
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

var orderType = exports.orderType = new _graphql.GraphQLObjectType({
  name: 'orderType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, orderBaseFields, {
    shop: { type: shopTypes.shopType, ref: 'shop', decription: '店铺' },
    guide: { type: userTypes.userShopGuideType, ref: 'user_shop_guide', decription: '导购' },
    customer: { type: customerTypes.customerType, ref: 'customer', decription: '客户' }
  }, shoesFields, beltFields, watchStrapFields, maintainFields, fuliaoFields, ornamentFields, _commonFields2.default.defaultCreateFields)
});

var orderInputType = exports.orderInputType = new _graphql.GraphQLInputObjectType({
  name: 'orderInputType',
  fields: _extends({}, orderBaseFields, {
    shop: { type: _graphql.GraphQLString, decription: '店铺' },
    guide: { type: _graphql.GraphQLString, decription: '导购' },
    customer: { type: customerTypes.customerInputType, decription: '客户id' }
  }, shoesInputFields, beltInputFields, watchStrapInputFields, maintainInputFields, fuliaoInputFields, ornamentInputFields, _commonFields2.default.defaultCreateFields)
});
//# sourceMappingURL=types.js.map