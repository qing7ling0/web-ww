'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderInputType = exports.orderType = exports.goodsInputType = exports.goodsType = exports.materialInputType = exports.materialType = exports.materialInputFields = undefined;

var _extends2;

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

var _types4 = require('../common/types');

var commonTypes = _interopRequireWildcard(_types4);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var materialInputFields = exports.materialInputFields = {
  _id: { type: _graphql.GraphQLString },
  name: { type: _graphql.GraphQLString, description: '名称' },
  count: { type: _graphql.GraphQLInt, description: '数量' }
};
var materialType = exports.materialType = new _graphql.GraphQLObjectType({
  name: 'materialType',
  fields: _extends({}, materialInputFields, {
    color: { type: commonTypes.commonType, description: '颜色' }
  }, _commonFields2.default.defaultCreateFields)
});
var materialInputType = exports.materialInputType = new _graphql.GraphQLInputObjectType({
  name: 'materialInputType',
  fields: _extends({}, materialInputFields, {
    color: { type: _graphql.GraphQLString, description: '颜色' }
  })
});

var goodsBaseFields = {
  _id: { type: _graphql.GraphQLString },
  NID: { type: _graphql.GraphQLString, description: '编号' },
  name: { type: _graphql.GraphQLString, description: '名称' },
  goods: { type: _graphql.GraphQLString, description: '商品（鞋皮带表带）' },
  put_date: { type: _graphql.GraphQLString, decription: '上架时间' },
  sex: { type: _graphql.GraphQLString, decription: '男女' },
  price: { type: _graphql.GraphQLInt, decription: '价格' },
  maintain_cycle: { type: _graphql.GraphQLInt, decription: '保养周期' }
};
var goodsFields = _extends({}, goodsBaseFields, {
  type: { type: commonTypes.commonType, description: '大分类' },
  style: { type: commonTypes.commonType, decription: '系列' },
  season: { type: commonTypes.commonType, decription: '季节' },
  pics: { type: new _graphql.GraphQLList(_graphql.GraphQLString) }
});
var goodsInputFields = _extends({}, goodsBaseFields, {
  type: { type: _graphql.GraphQLString, description: '大分类' },
  style: { type: _graphql.GraphQLString, decription: '系列' },
  season: { type: _graphql.GraphQLString, decription: '季节' },
  pics: { type: new _graphql.GraphQLList(_graphql.GraphQLString) }
});

var goodsShoesBaseFields = {};
var goodsShoesFields = _extends({}, goodsShoesBaseFields, {
  s_material: { type: materialType, decription: '材质' },
  s_xuan_hao: { type: commonTypes.commonType, decription: '楦号' },
  s_gui_ge: { type: commonTypes.commonType, decription: '规格' },
  s_out_color: { type: commonTypes.commonType, decription: '鞋面颜色' },
  s_in_color: { type: commonTypes.commonType, decription: '里皮颜色' },
  s_bottom_color: { type: commonTypes.commonType, decription: '鞋底颜色' },
  s_bottom_side_color: { type: commonTypes.commonType, decription: '底边颜色' },
  s_gen_gao: { type: commonTypes.commonType, decription: '跟高' }
});
var goodsShoesInputFields = _extends({}, goodsShoesBaseFields, {
  s_material: { type: _graphql.GraphQLString, decription: '材质' },
  s_xuan_hao: { type: _graphql.GraphQLString, decription: '楦号' },
  s_gui_ge: { type: _graphql.GraphQLString, decription: '规格' },
  s_out_color: { type: _graphql.GraphQLString, decription: '鞋面颜色' },
  s_in_color: { type: _graphql.GraphQLString, decription: '里皮颜色' },
  s_bottom_color: { type: _graphql.GraphQLString, decription: '鞋底颜色' },
  s_bottom_side_color: { type: _graphql.GraphQLString, decription: '底边颜色' },
  s_gen_gao: { type: _graphql.GraphQLString, decription: '跟高' }
});

var goodsBeltBaseFields = {};
var goodsBeltFields = _extends({}, goodsBeltBaseFields, {
  b_material: { type: materialType, decription: '材质' },
  b_color: { type: commonTypes.commonType, decription: '颜色' }
});
var goodsBeltInputFields = _extends({}, goodsBeltBaseFields, {
  b_material: { type: _graphql.GraphQLString, decription: '材质' },
  b_color: { type: _graphql.GraphQLString, decription: '颜色' }
});

var goodsWatchStrapBaseFields = {};
var goodsWatchStrapFields = _extends({}, goodsWatchStrapBaseFields, {
  ws_material: { type: materialType, decription: '材质' },
  ws_style: { type: commonTypes.commonType, decription: '类型' }
});
var goodsWatchStrapInputFields = _extends({}, goodsWatchStrapBaseFields, {
  ws_material: { type: _graphql.GraphQLString, decription: '材质' },
  ws_style: { type: _graphql.GraphQLString, decription: '类型' }
});

var goodsType = exports.goodsType = new _graphql.GraphQLObjectType({
  name: 'goodsType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, goodsFields, goodsShoesFields, goodsBeltFields, goodsWatchStrapFields)
});

var goodsInputType = exports.goodsInputType = new _graphql.GraphQLInputObjectType({
  name: 'goodsInputType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, goodsInputFields, goodsShoesInputFields, goodsBeltInputFields, goodsWatchStrapInputFields)
});

// 鞋
var orderShoesBaseFields = {
  s_count: { type: _graphql.GraphQLInt, decription: '数量' },

  s_NID: { type: _graphql.GraphQLString, decription: '编号' },

  s_foot_size: { type: _graphql.GraphQLFloat, description: '尺码' },
  s_left_length: { type: _graphql.GraphQLFloat, description: '左脚长度' },
  s_left_zhiWei: { type: _graphql.GraphQLFloat, decription: '左脚趾围' },
  s_left_fuWei: { type: _graphql.GraphQLFloat, decription: '左脚附维' },
  s_right_length: { type: _graphql.GraphQLFloat, description: '右脚长度' },
  s_right_zhiWei: { type: _graphql.GraphQLFloat, decription: '右脚趾围' },
  s_right_fuWei: { type: _graphql.GraphQLFloat, decription: '右脚附维' },
  s_design_self: { type: _graphql.GraphQLBoolean, decription: '是否来样设计' }
};

var orderShoesFields = _extends({}, orderShoesBaseFields, (_extends2 = {
  s_xuan_hao: { type: commonTypes.commonType, decription: '鞋楦型' },
  s_gui_ge: { type: commonTypes.commonType, decription: '规格' },
  s_material: { type: commonTypes.commonType, decription: '材料' },
  s_out_color: { type: commonTypes.commonType, decription: '鞋面颜色' },
  s_in_color: { type: commonTypes.commonType, decription: '内里颜色' },
  s_gen_gao: { type: commonTypes.commonType, decription: '跟高' },
  s_tie_di: { type: commonTypes.commonType, decription: '贴底' }
}, _defineProperty(_extends2, 's_tie_di', { type: commonTypes.commonType, decription: '贴底' }), _defineProperty(_extends2, 's_customs', { type: new _graphql.GraphQLList(commonTypes.commonType) }), _defineProperty(_extends2, 's_shoes', { type: goodsType, decription: '商品' }), _extends2));

var orderShoesInputFields = _extends({}, orderShoesBaseFields, {
  s_xuan_hao: { type: _graphql.GraphQLString, decription: '鞋楦型' },
  s_gui_ge: { type: _graphql.GraphQLString, decription: '规格' },
  s_material: { type: _graphql.GraphQLString, decription: '材料' },
  s_out_color: { type: _graphql.GraphQLString, decription: '鞋面颜色' },
  s_in_color: { type: _graphql.GraphQLString, decription: '内里颜色' },
  s_gen_gao: { type: _graphql.GraphQLString, decription: '跟高' },
  s_tie_di: { type: _graphql.GraphQLString, decription: '贴底' },
  s_customs: { type: new _graphql.GraphQLList(_graphql.GraphQLString) }, // 特殊定制
  s_shoes: { type: _graphql.GraphQLString, decription: '商品' }

  // 皮带
});var orderBeltBaseFields = {
  b_NID: { type: _graphql.GraphQLString, decription: '编号' },
  b_material: { type: _graphql.GraphQLString, decription: '材质' },
  b_color: { type: _graphql.GraphQLString, decription: '颜色' },
  b_A: { type: _graphql.GraphQLFloat, decription: '皮带测量数据A' },
  b_B: { type: _graphql.GraphQLFloat, decription: '皮带测量数据B' },
  b_C: { type: _graphql.GraphQLFloat, decription: '皮带测量数据C' },
  b_D: { type: _graphql.GraphQLFloat, decription: '皮带测量数据D' },
  b_size_remark: { type: _graphql.GraphQLString, decription: '皮带测量备注' }
};
var orderBeltFields = _extends({}, orderBeltBaseFields, {
  b_belt: { type: goodsType, decription: '皮带' }
});
var orderBeltInputFields = _extends({}, orderBeltBaseFields, {
  b_belt: { type: _graphql.GraphQLString, decription: '皮带' }

  // 表带
});var orderWatchStrapBaseFields = {
  ws_NID: { type: _graphql.GraphQLString, decription: '编号' },
  ws_A: { type: _graphql.GraphQLFloat, decription: '表带测量数据A' },
  ws_B: { type: _graphql.GraphQLFloat, decription: '表带测量数据B' },
  ws_C: { type: _graphql.GraphQLFloat, decription: '表带测量数据C' },
  ws_D: { type: _graphql.GraphQLFloat, decription: '表带测量数据D' },
  ws_E: { type: _graphql.GraphQLFloat, decription: '表带测量数据E' },
  ws_F: { type: _graphql.GraphQLFloat, decription: '表带测量数据F' },
  ws_G: { type: _graphql.GraphQLFloat, decription: '表带测量数据G' },
  ws_watch_brand: { type: _graphql.GraphQLString, decription: '手表品牌' },
  ws_size_remark: { type: _graphql.GraphQLString, decription: '表带测量备注' }
};
var orderWatchStrapFields = _extends({}, orderWatchStrapBaseFields, {
  ws_watchStrap: { type: goodsType, decription: '表带' },
  ws_material: { type: materialType, decription: '材质' },
  ws_style: { type: commonTypes.commonType, decription: '类别，男女' }
});
var orderWatchStrapInputFields = _extends({}, orderWatchStrapBaseFields, {
  ws_watchStrap: { type: _graphql.GraphQLString, decription: '表带' },
  ws_material: { type: _graphql.GraphQLString, decription: '材质' },
  ws_style: { type: _graphql.GraphQLString, decription: '类别，男女' }

  // 护理
});var orderMaintainBaseFields = {
  m_NID: { type: _graphql.GraphQLString, decription: '编号' },
  m_name: { type: _graphql.GraphQLString, decription: '护理内容' },
  m_price: { type: _graphql.GraphQLString, decription: '护理价格' },
  m_time: { type: _graphql.GraphQLFloat, decription: '护理时间' },
  m_color: { type: _graphql.GraphQLString, decription: '颜色' },
  m_demo: { type: _graphql.GraphQLString, decription: '样品' },
  m_wash: { type: _graphql.GraphQLBoolean, decription: '是否水洗' }
};
var orderMaintainFields = _extends({}, orderMaintainBaseFields, {
  m_maintain: { type: commonTypes.commonType, decription: '护理' }
});
var orderMaintainInputFields = _extends({}, orderMaintainBaseFields, {
  m_maintain: { type: _graphql.GraphQLString, decription: '护理' }

  // 充值
});var orderRechargeBaseFields = {
  r_kuanhao: { type: _graphql.GraphQLFloat, decription: '充值金额' }
};
var orderRechargeFields = _extends({}, orderRechargeBaseFields);
var orderRechargeInputFields = _extends({}, orderRechargeBaseFields);

// 配饰
var orderOrnamentBaseFields = {
  o_NID: { type: _graphql.GraphQLString, decription: '编号' },
  o_name: { type: _graphql.GraphQLString, decription: '配饰' }
};
var orderOrnamentFields = _extends({}, orderOrnamentBaseFields, {
  o_ornament: { type: goodsType, decription: '配饰' }
});
var orderOrnamentInputFields = _extends({}, orderOrnamentBaseFields, {
  o_ornament: { type: _graphql.GraphQLString, decription: '配饰' }
});

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
  remark: { type: _graphql.GraphQLString, ddecription: '备注' },
  urgent_day: { type: _graphql.GraphQLInt, decription: '加急天数' },
  urgent_price: { type: _graphql.GraphQLFloat, decription: '加急价格' }
};

var orderType = exports.orderType = new _graphql.GraphQLObjectType({
  name: 'orderType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, orderBaseFields, {
    shop: { type: shopTypes.shopType, ref: 'shop', decription: '店铺' },
    guide: { type: userTypes.userShopGuideType, ref: 'user_shop_guide', decription: '导购' },
    customer: { type: customerTypes.customerType, ref: 'customer', decription: '客户' },
    urgent: { type: commonTypes.commonType, decription: '加急' }
  }, orderShoesFields, orderBeltFields, orderWatchStrapFields, orderMaintainFields, orderRechargeFields, orderOrnamentFields, _commonFields2.default.defaultCreateFields)
});

var orderInputType = exports.orderInputType = new _graphql.GraphQLInputObjectType({
  name: 'orderInputType',
  fields: _extends({}, orderBaseFields, {
    shop: { type: _graphql.GraphQLString, decription: '店铺' },
    guide: { type: _graphql.GraphQLString, decription: '导购' },
    customer: { type: customerTypes.customerInputType, decription: '客户id' },
    urgent: { type: _graphql.GraphQLString, decription: '加急' }
  }, orderShoesInputFields, orderBeltInputFields, orderWatchStrapInputFields, orderMaintainInputFields, orderRechargeInputFields, orderOrnamentInputFields, _commonFields2.default.defaultCreateFields)
});
//# sourceMappingURL=types.js.map