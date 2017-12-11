const mongoose = require('mongoose');
const moment = require('moment')
const DB = require('../db/DB')

const constants = require('../constants/constants')
const baseFields = require('./base-fields')
const {commonSchema, commonModel} = require('./common')

const Schema = mongoose.Schema;

const materialFields = {
  name: {type:String, description:'名称'},
  count: {type:Number, description:'数量'},
  color: {type:String, ref:'common', description:'颜色'},
  ...baseFields
};

module.exports.materialModel = mongoose.model('material', new Schema(materialFields));

// 商品档案
const goodsBaseFields = {
  NID: {type:String, decription:'编号'},
  name: {type:String, description:'名称'},
  goods: {type:String, description:'商品（鞋皮带表带）'},
  type: {type: Schema.Types.ObjectId, ref:'common', description:'大分类'},
  style: {type: Schema.Types.ObjectId, ref:'common', decription:'系列'},
  season: {type: Schema.Types.ObjectId, ref:'common', decription:'季节'},
  put_date: {type:Date, decription:'上架时间'},
  sex: {type:String, decription:'男女'},
  price: {type:Number, decription:'价格'},
  maintain_cycle: {type:Number, decription:'保养周期'},
  pics:[new Schema({
    file:{type: Schema.Types.ObjectId, ref:'file', description:'图片'}
  })]
};
const goodsShoesFields = {
  s_material: {type:Schema.Types.ObjectId, ref:'material', decription:'材质'},
  s_xuan_hao: {type:Schema.Types.ObjectId, ref:'common', decription:'楦号'},
  s_gui_ge: {type:Schema.Types.ObjectId, ref:'common', decription:'规格'},
  s_out_color: {type:Schema.Types.ObjectId, ref:'common', decription:'鞋面颜色'},
  s_in_color: {type:Schema.Types.ObjectId, ref:'common', decription:'里皮颜色'},
  s_bottom_color: {type:Schema.Types.ObjectId, ref:'common', decription:'鞋底颜色'},
  s_bottom_side_color: {type:Schema.Types.ObjectId, ref:'common', decription:'底边颜色'},
  s_gen_gao: {type:Schema.Types.ObjectId, ref:'common', decription:'跟高'},
};
var goodsBeltFields = {
  b_material: {type:Schema.Types.ObjectId, ref:'material', description:'材质'},
  b_color: {type:Schema.Types.ObjectId, ref:'common', description:'颜色'}
};
var goodsWatchStrapFields = {
  ws_material: {type:Schema.Types.ObjectId, ref:'material', description:'材质'},
  ws_style: {type:Schema.Types.ObjectId, ref:'common', description:'类型，男女'},
};
var goodsSchema = new Schema({
  ...goodsBaseFields,
  ...goodsShoesFields,
  ...goodsBeltFields,
  ...goodsWatchStrapFields,
  // ...ornamentFields,
  ...baseFields
});
module.exports.goodsModel = mongoose.model('goods', goodsSchema);


// 订单信息
// 鞋
const shoesFields = {
  s_NID: {type:String, decription:'编号'},
  s_material: {type:String, decription:'材质'},
  s_xuan_hao: {type:String, decription:'楦号'},
  s_gui_ge: {type:String, decription:'规格'},
  s_gen_gao: {type:String, decription:'跟高'},
  s_out_color: {type:String, decription:'鞋面颜色'},
  s_in_color: {type:String, decription:'里皮颜色'},
  s_bottom_color: {type:String, decription:'鞋底颜色'},
  s_bottom_side_color: {type:String, decription:'底边颜色'},
  s_tie_di: {type:String, decription:'贴底'},
  s_design_self: {type:Boolean, default:false, decription:'是否来样设计'},
  s_shoes: {type:Schema.Types.ObjectId, ref:'goods', decription:'商品'},

  s_foot_size: {type: Number, description:'尺码'},
  s_left_length: {type: Number, description:'左脚长度'},
  s_left_zhiWei: {type: Number, decription:'左脚趾围'},
  s_left_fuWei: {type: Number, decription:'左脚附维'},
  s_right_length: {type: Number, description:'右脚长度'},
  s_right_zhiWei: {type: Number, decription:'右脚趾围'},
  s_right_fuWei: {type: Number, decription:'右脚附维'},
  s_customs:[commonSchema], // 特殊定制
  s_urgent_day: {type: Number, decription:'加急天数'},
  s_urgent_price: {type: Number, decription:'加急价格'},
}

// 皮带
const beltFields = {
  b_NID: {type:String, decription:'编号'},
  b_material:{type:String, decription:'材质'},
  b_color:{type:String, decription:'颜色'},
  b_belt: {type:Schema.Types.ObjectId, ref:'goods', decription:'商品'},

  b_A: {type: Number, decription:'皮带测量数据A'},
  b_B: {type: Number, decription:'皮带测量数据B'},
  b_C: {type: Number, decription:'皮带测量数据C'},
  b_D: {type: Number, decription:'皮带测量数据D'},
  b_size_remark: {type: String, decription:'皮带测量备注'},
}

// 表带
const watchStrapFields = {
  ws_NID: {type:String, decription:'编号'},
  ws_material:{type:String, decription:'材质'},
  ws_style:{type:String, decription:'类别，男女'},
  ws_watch_strap: {type:Schema.Types.ObjectId, ref:'goods', decription:'商品'},

  ws_A: {type: Number, decription:'表带测量数据A'},
  ws_B: {type: Number, decription:'表带测量数据B'},
  ws_C: {type: Number, decription:'表带测量数据C'},
  ws_D: {type: Number, decription:'表带测量数据D'},
  ws_E: {type: Number, decription:'表带测量数据E'},
  ws_F: {type: Number, decription:'表带测量数据F'},
  ws_G: {type: Number, decription:'表带测量数据G'},
  ws_watch_brand:{type: String, decription:'手表品牌'},
  ws_size_remark: {type: String, decription:'表带测量备注'},
}

// 护理
const maintainFields = {
  m_maintain: {type:Schema.Types.ObjectId, ref:'common', decription:'商品'},
  m_name:{type:String, decription:'护理内容'},
  m_price:{type:String, decription:'护理价格'},
  m_time:{type:Number, decription:'护理时间'},
  m_color:{type:String, decription:'颜色'},
  m_demo:{type:String, decription:'样品'},
  m_wash:{type:Boolean, decription:'是否水洗'}
}

// 充值
const rechargeFields = {
  r_amount:{type:Number, decription:'充值金额'},
}

// 配饰
const ornamentFields = {
  o_NID:{type:String, decription:'编号'},
  o_name:{type:String, decription:'名称'},
}

const orderGoodsFields = {
  ...shoesFields,
  ...beltFields,
  ...watchStrapFields,
  ...maintainFields,
  ...rechargeFields,
  ...ornamentFields
}
const subOrderSchema = new Schema({
  orderGoodsFields,
  type: {type:String, description:'类型'},
  state: {type:String, decription:'订单状态'},
  pics:[new Schema({
    file:{type:Schema.Types.ObjectId, ref:'file', decription:'图片'},
    desc:{type:String, decription:'说明'}
  })],
  sub_order_id: {type:String, description:'子订单订单ID'},
  transport_company: {type:String, decription:'快递公司'},
  transport_id:{type:String, decription:'快递单号'},
  transport_price:{type:Number, decription:'快递费用'},
  remark:{type:String, ddecription:'备注'},
  order:{type:Schema.Types.ObjectId, ref:'order', decription:'订单信息'},
  urgent:{type:Schema.Types.ObjectId, ref:'common', decription:'加急'},
  urgent_day: {type: Number, decription:'加急天数'},
  urgent_price: {type: Number, decription:'加急价格'},
  ...baseFields
});
module.exports.subOrderModel = mongoose.model('sub_order', subOrderSchema);

const orderFields = {
  order_id: {type:String, description:'订单ID'},
  source: {type:String, description:'来源'},
  pay:{type:Number, decription:'支付金额'},
  pay_type:{type:String, decription:'支付方式'},
  transport_name: {type:String, decription:'收货人'},
  transport_phone: {type:String, decription:'电话'},
  transport_address: {type:String, decription:'收货地址'},
  transport_zipcode: {type:String, decription:'邮编'},
  shop: {type:Schema.Types.ObjectId, ref:'shop', decription:'店铺'},
  guide: {type:Schema.Types.ObjectId, ref:'user_shop_guide', decription:'导购'},
  customer: {type:Schema.Types.ObjectId, ref:'customer', decription:'客户'},
  sub_order:[{type:Schema.Types.ObjectId, ref:'sub_order', decription:'子订单'}],
  ...baseFields
}
const orderSchema = new Schema({
  orderFields
});
module.exports.orderModel = mongoose.model('order', orderSchema);