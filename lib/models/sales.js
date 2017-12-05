'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var mongoose = require('mongoose');
var moment = require('moment');
var DB = require('../db/DB');

var constants = require('../constants/constants');
var baseFields = require('./base-fields');

var Schema = mongoose.Schema;

/** 材料 */
var materialSchema = new Schema(_extends({
  name: { type: String, description: '名称' },
  color: { type: Schema.Types.ObjectId, ref: 'color', description: '颜色' },
  count: { type: Number, description: '数量' }
}, baseFields));
module.exports.materialModel = mongoose.model('material', materialSchema);

/** 颜色 */
var colorSchema = new Schema(_extends({
  name: { type: String, description: '名称' },
  type: { type: String, description: '颜色类型' }
}, baseFields));
module.exports.colorModel = mongoose.model('color', colorSchema);

/** 商品大类 */
var goodsTypeSchema = new Schema(_extends({
  name: { type: String, description: '名称' }
}, baseFields));
module.exports.goodsTypeModel = mongoose.model('goods_type', goodsTypeSchema);

/** 商品系列 */
var goodsStyleSchema = new Schema(_extends({
  name: { type: String, description: '名称' }
}, baseFields));
module.exports.goodsStyleModel = mongoose.model('goods_style', goodsStyleSchema);

/** 商品季节 */
var goodsSeasonSchema = new Schema(_extends({
  name: { type: String, description: '名称' }
}, baseFields));
module.exports.goodsSeasonModel = mongoose.model('goods_season', goodsSeasonSchema);

/** 楦号 */
var xuanHaoSchema = new Schema(_extends({
  name: { type: String, description: '名称' }
}, baseFields));
module.exports.xuanHaoModel = mongoose.model('xuan_hao', xuanHaoSchema);

var goodsShoesSchema = new Schema({
  name: { type: String, description: '名称' },
  property: { type: String, description: '属性' },
  type: { type: Schema.Types.ObjectId, ref: 'goods_type', description: '大分类' },
  style: { type: Schema.Types.ObjectId, ref: 'goods_style', decription: '系列' },
  season: { type: Schema.Types.ObjectId, ref: 'goods_season', decription: '季节' },
  put_date: { type: Date, decription: '上架时间' },
  sex: { type: String, decription: '男女' },
  xuan_hao: { type: String, decription: '楦号' },
  out_color: { type: Schema.Types.ObjectId, ref: 'color', decription: '鞋面颜色' },
  in_color: { type: Schema.Types.ObjectId, ref: 'color', decription: '里皮颜色' },
  bottom_color: { type: Schema.Types.ObjectId, ref: 'color', decription: '鞋底颜色' },
  bottom_side_color: { type: Schema.Types.ObjectId, ref: 'color', decription: '底边颜色' },
  height: { type: Number, decription: '跟高' },
  price: { type: Number, decription: '价格' },
  maintain_cycle: { type: Number, decription: '保养周期' }
});

module.exports.goodsShoesModel = mongoose.model('goods_shoes', goodsShoesSchema);

var goodsBeltSchema = new Schema({
  NID: { type: String, description: '编号' },
  type: { type: String, description: '款号' },
  material: { type: String, description: '材质' },
  color: { type: String, description: '颜色' }
});
module.exports.goodsBeltModel = mongoose.model('goods_belt', goodsBeltSchema);

var goodsWatchStrapSchema = new Schema({
  NID: { type: String, description: '编号' },
  type: { type: String, description: '款号' },
  material: { type: String, description: '材质' },
  color: { type: String, description: '颜色' }
});
module.exports.goodsWatchStrapModel = mongoose.model('goods_watch_strap', goodsWatchStrapSchema);

var maintainPriceSchema = new Schema(_extends({
  type: { type: String, description: '类型' },
  NID: { type: String, description: '编号' },
  name: { type: String, decription: '项目名称' },
  price: { type: Number, decription: '价格' },
  time: { type: Number, decription: '时间' }
}, baseFields));

module.exports.maintainPriceModel = mongoose.model('maintain_price', maintainPriceSchema);

var customSchema = new Schema({
  NID: { type: String, description: '内容' },
  name: { type: String, description: '内容' },
  price: { type: Number, decription: '价格' }
});

module.exports.customModel = mongoose.model('custom', customSchema);

// 鞋
var shoesFields = {
  s_count: { type: Number, decription: '数量' },
  s_kuanhao: { type: String, decription: '款号' },
  s_xieXuan: { type: String, decription: '鞋楦型' },
  s_xieGen: { type: String, decription: '鞋跟型' },
  s_guiGe: { type: String, decription: '规格' },
  s_material: { type: String, decription: '鞋面材料' },
  s_xiemian_color: { type: String, decription: '鞋面颜色' },
  s_neili_color: { type: String, decription: '内里颜色' },
  s_foot_size: { type: Number, description: '尺码' },
  s_left_length: { type: Number, description: '左脚长度' },
  s_left_zhiWei: { type: Number, decription: '左脚趾围' },
  s_left_fuWei: { type: Number, decription: '左脚附维' },
  s_right_length: { type: Number, description: '右脚长度' },
  s_right_zhiWei: { type: Number, decription: '右脚趾围' },
  s_right_fuWei: { type: Number, decription: '右脚附维' },
  s_customs: [customSchema], // 特殊定制
  s_urgent_day: { type: Number, decription: '加急天数' },
  s_urgent_price: { type: Number, decription: '加急价格' },
  s_shoes: { type: Schema.Types.ObjectId, ref: 'goods_shoes', decription: '商品' }

  // 皮带
};var beltFields = {
  // b_belt: {type:Schema.Types.ObjectId, ref:'goods_shoes', decription:'商品'},
  b_NID: { type: String, decription: '编号' },
  b_kuanhao: { type: String, decription: '款号' },
  b_material: { type: String, decription: '材质' },
  b_color: { type: String, decription: '颜色' },
  b_A: { type: Number, decription: '皮带测量数据A' },
  b_B: { type: Number, decription: '皮带测量数据B' },
  b_C: { type: Number, decription: '皮带测量数据C' },
  b_D: { type: Number, decription: '皮带测量数据D' },
  b_size_remark: { type: String, decription: '皮带测量备注' }

  // 表带
};var watchStrapFields = {
  // b_belt: {type:Schema.Types.ObjectId, ref:'goods_shoes', decription:'商品'},
  bs_NID: { type: String, decription: '编号' },
  bs_kuanhao: { type: String, decription: '款号' },
  bs_material: { type: String, decription: '材质' },
  bs_color: { type: String, decription: '颜色' },
  bs_type: { type: String, decription: '类别，男女' },
  bs_A: { type: Number, decription: '表带测量数据A' },
  bs_B: { type: Number, decription: '表带测量数据B' },
  bs_C: { type: Number, decription: '表带测量数据C' },
  bs_D: { type: Number, decription: '表带测量数据D' },
  bs_E: { type: Number, decription: '表带测量数据E' },
  bs_F: { type: Number, decription: '表带测量数据F' },
  bs_G: { type: Number, decription: '表带测量数据G' },
  bs_watch_brand: { type: String, decription: '手表品牌' },
  bs_size_remark: { type: String, decription: '表带测量备注' }

  // 护理
};var maintainFields = {
  m_NID: { type: String, decription: '编号' },
  m_name: { type: String, decription: '护理内容' },
  m_price: { type: String, decription: '护理价格' },
  m_time: { type: Number, decription: '护理时间' },
  m_color: { type: String, decription: '颜色' },
  m_demo: { type: String, decription: '样品' },
  m_wash: { type: Boolean, decription: '是否水洗' }

  // 辅料
};var fuliaoFields = {
  f_NID: { type: String, decription: '编号' },
  f_name: { type: String, decription: '名称' },
  f_kuanhao: { type: String, decription: '款号' }

  // 配饰
};var ornamentFields = {
  o_NID: { type: String, decription: '编号' },
  o_name: { type: String, decription: '名称' },
  o_kuanhao: { type: String, decription: '款号' }
};

var orderFields = _extends({
  type: { type: String, description: '类型' },
  source: { type: String, description: '来源' },
  pay: { type: Number, decription: '支付金额' },
  payType: { type: String, decription: '支付方式' },
  order_state: { type: String, decription: '订单状态' },
  transport_company: { type: String, decription: '快递公司' },
  transport_id: { type: String, decription: '快递单号' },
  transport_price: { type: Number, decription: '快递费用' },
  transport_name: { type: String, decription: '收货人' },
  transport_phone: { type: String, decription: '电话' },
  transport_address: { type: String, decription: '收货地址' },
  transport_zipcode: { type: String, decription: '邮编' },
  remark: { type: String, ddecription: '备注' },
  shop: { type: Schema.Types.ObjectId, ref: 'shop', decription: '店铺' },
  guide: { type: Schema.Types.ObjectId, ref: 'user_shop_guide', decription: '导购' },
  customer: { type: Schema.Types.ObjectId, ref: 'customer', decription: '客户' }
}, shoesFields, beltFields, watchStrapFields, maintainFields, fuliaoFields, ornamentFields, baseFields);
module.exports.orderModel = mongoose.model('order', orderFields);
//# sourceMappingURL=sales.js.map