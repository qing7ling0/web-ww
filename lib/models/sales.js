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

var baseOrderFields = _extends({
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
  remark: { type: String, ddecription: '备注' }
}, baseFields);

var orderShoesSchema = new Schema(_extends({}, baseOrderFields, {
  goods: { type: Schema.Types.ObjectId, ref: 'goods_shoes', decription: '商品' },
  shop: { type: Schema.Types.ObjectId, ref: 'shop', decription: '店铺' },
  guide: { type: Schema.Types.ObjectId, ref: 'user_shop_guide', decription: '导购' },
  customer: { type: Schema.Types.ObjectId, ref: 'customer', decription: '客户' },
  count: { type: Number, decription: '数量' },
  xieXuan: { type: String, decription: '鞋楦型' },
  xieGen: { type: String, decription: '鞋跟型' },
  foot_size: { type: Number, description: '尺码' },
  left_length: { type: Number, description: '左脚长度' },
  left_zhiWei: { type: Number, decription: '左脚趾围' },
  left_fuWei: { type: Number, decription: '左脚附维' },
  right_length: { type: Number, description: '右脚长度' },
  right_zhiWei: { type: Number, decription: '右脚趾围' },
  right_fuWei: { type: Number, decription: '右脚附维' }
}));
module.exports.orderShoesModel = mongoose.model('order_shoes', orderShoesSchema);

var orderBeltSchema = new Schema(_extends({}, baseOrderFields, {
  goods: { type: Schema.Types.ObjectId, ref: 'goods_belt', decription: '皮带' },
  belt_size: { type: Schema.Types.ObjectId, ref: 'belt', decription: '皮带测量数据' }
}));
module.exports.orderBeltModel = mongoose.model('order_belt', orderBeltSchema);

// 表带
var orderWatchStrapSchema = new Schema(_extends({}, baseOrderFields, {
  goods: { type: Schema.Types.ObjectId, ref: 'goods_watch_strap', decription: '表带' },
  watch_strap_size: { type: Schema.Types.ObjectId, ref: 'watch_strap', decription: '表带测量数据' }
}));
module.exports.orderWatchStrapModel = mongoose.model('order_watch_strap', orderWatchStrapSchema);

// 配饰
var orderOrnamentSchema = new Schema(_extends({}, baseOrderFields, {
  goods: { type: Schema.Types.ObjectId, ref: 'goods_ornament', decription: '配饰' }
}));
module.exports.orderOrnamentModel = mongoose.model('order_ornament', orderOrnamentSchema);

// 辅料
var orderFuliaoSchema = new Schema(_extends({}, baseOrderFields, {
  goods: { type: Schema.Types.ObjectId, ref: 'goods_fuliao', decription: '配饰' }
}));
module.exports.orderFuliaoModel = mongoose.model('order_fuliao', orderFuliaoSchema);

// 护理
var orderMaintainSchema = new Schema(_extends({}, baseOrderFields, {
  goods: { type: Schema.Types.ObjectId, ref: 'goods_maintain', decription: '护理项目' },
  color: { type: String, decription: '颜色' },
  demo: { type: String, decription: '保莱色卡编号或者参照样品' },
  wash: { type: Boolean, description: '是否水洗' }
}));
module.exports.orderMaintainModel = mongoose.model('order_maintain', orderMaintainSchema);
//# sourceMappingURL=sales.js.map