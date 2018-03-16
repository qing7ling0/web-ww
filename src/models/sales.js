const mongoose = require('mongoose');
const moment = require('moment')
const DB = require('../db/DB')

const constants = require('../constants/constants')
const baseFields = require('./base-fields')
const {commonSchema, commonModel} = require('./common')

const Schema = mongoose.Schema;

const materialFields = {
  name: {type:String, description:'名称'},
  NID: {type:String, description:'编号'},
  count: {type:Number, description:'数量'},
  color: {type:String, ref:'common', description:'颜色'},
  color_css: {type:Number, description:'css颜色', default:0xffff000},
  ...baseFields
};

module.exports.materialModel = mongoose.model('material', new Schema(materialFields,{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
}));

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
  })],
  hide:{type:Boolean, description:'是否隐藏，前端进行删除操作，进行假删除', default:false}
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
    ...ornamentFields,
    ...baseFields
  },{
    timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
});
module.exports.goodsModel = mongoose.model('goods', goodsSchema);

const sampleBaseFields = {
  NID: {type:String, decription:'编号'},
  type: {type: String, decription:'类型'},
  shop: {type:Schema.Types.ObjectId, ref:'shop', description:'店铺'},
  count: {type: Number, decription:'数量'},
  left_count: {type: Number, decription:'左脚数量'},
  right_count: {type: Number, decription:'右脚数量'},
}
// 样品鞋数据
const sampleShoesFields = {
  s_right: {type:Boolean, decription:'右脚'},
  s_foot_size: {type:Number, decription:'尺码'},
  s_length: {type: Number, description:'长度'},
  s_zhiWei: {type: Number, decription:'趾围'},
  s_fuWei: {type: Number, decription:'附维'},
}
// 样品皮带数据
const sampleBeltFields = {
  b_A: {type: Number, decription:'皮带测量数据A'},
  b_B: {type: Number, decription:'皮带测量数据B'},
  b_C: {type: Number, decription:'皮带测量数据C'},
  b_D: {type: Number, decription:'皮带测量数据D'},
}
// 样品表带数据
const sampleWatchStrapFields = {
  ws_A: {type: Number, decription:'表带测量数据A'},
  ws_B: {type: Number, decription:'表带测量数据B'},
  ws_C: {type: Number, decription:'表带测量数据C'},
  ws_D: {type: Number, decription:'表带测量数据D'},
  ws_E: {type: Number, decription:'表带测量数据E'},
  ws_F: {type: Number, decription:'表带测量数据F'},
  ws_G: {type: Number, decription:'表带测量数据G'},
}
// 样品配饰数据
const sampleOrnamentFields = {
  o_name: {type: String, decription:'名称'},
}

const sampleFields = {
  ...sampleBaseFields,
  ...sampleShoesFields,
  ...sampleBeltFields,
  ...sampleWatchStrapFields,
  ...sampleOrnamentFields,
  ...baseFields
}
module.exports.sampleGoodsModel = mongoose.model('sample_goods', 
  new Schema(
    sampleFields,
    {
      timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
    }
  )
);

// 样品调拨记录
const sampleAllotFields = {
  sample: {type:Schema.Types.ObjectId, ref:'sample_goods', decription:'样品'},
  left_count: {type: Number, decription:'左脚数量'},
  right_count: {type: Number, decription:'右脚数量'},
  status: {type: Number, decription:'状态'},
  apply_shop: {type:Schema.Types.ObjectId, ref:'shop', decription:'申请的店铺'},
  apply_shop_guide: {type:Schema.Types.ObjectId, ref:'user_shop_guide', decription:'申请人'},
  goods_user: {type:Schema.Types.ObjectId, ref:'user_operate', decription:'商品部跟进人'},
  accept_shop: {type:Schema.Types.ObjectId, ref:'shop', decription:'店铺'},
  accept_shop_guide: {type:Schema.Types.ObjectId, ref:'user_shop_guide', decription:'店铺负责人'},
  transport_company: {type:String, decription:'快递公司'},
  transport_id: {type:String, decription:'快递单号'},
  transport_phone: {type:String, decription:'联系电话'},
  ...baseFields
}
module.exports.sampleAllotModel = mongoose.model('sample_allot', 
  new Schema(
    sampleAllotFields,
    {
      timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
    }
  )
);

// 试鞋反馈
const tryFeedbackFields = {
  suborder_id: {type:Schema.Types.ObjectId, ref:'sub_order', decription:'订单ID'},
  message: {type:String, default:'', decription:'内容'},
  transport_id: {type:String, decription:'快递单号'},
  status: {type:Number, decription:'当前反馈状态'},
  ...baseFields
};

const tryFeedbackSchema = new Schema(tryFeedbackFields,{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
});
module.exports.tryFeedbackModel = mongoose.model('try_feedback', tryFeedbackSchema);

const orderBaseSchema = new Schema({
  _id: {type:String, decription:'ID'},
  name: {type:String, decription:'名称'},
  NID: {type:String, decription:'编号'},
  color: {type:String, decription:'颜色'},
  price: {type:Number, decription:'价格'},
  day: {type:Number, decription:'天数'}
});
// 订单信息
// 鞋
const shoesFields = {
  s_material: {type:orderBaseSchema, decription:'材质'},
  s_xuan_hao: {type:orderBaseSchema, decription:'楦号'},
  s_gui_ge: {type:orderBaseSchema, decription:'规格'},
  s_gen_gao: {type:orderBaseSchema, decription:'跟高'},
  s_out_color: {type:orderBaseSchema, decription:'鞋面颜色'},
  s_in_color: {type:orderBaseSchema, decription:'里皮颜色'},
  s_bottom_color: {type:orderBaseSchema, decription:'鞋底颜色'},
  s_bottom_side_color: {type:orderBaseSchema, decription:'底边颜色'},

  s_tie_di: {type:orderBaseSchema, decription:'贴底'},
  s_design_self: {type:Boolean, default:false, decription:'是否来样设计'},
  s_production_step: {type:Number, default:0, decription:'正品鞋生产步骤'},
  s_shoes: {type:Schema.Types.ObjectId, ref:'goods', decription:'商品'},

  s_foot_size: {type: Number, description:'尺码'},
  s_left_length: {type: Number, description:'左脚长度'},
  s_left_zhiWei: {type: Number, decription:'左脚趾围'},
  s_left_fuWei: {type: Number, decription:'左脚附维'},
  s_right_length: {type: Number, description:'右脚长度'},
  s_right_zhiWei: {type: Number, decription:'右脚趾围'},
  s_right_fuWei: {type: Number, decription:'右脚附维'},
  s_customs:[orderBaseSchema], // 特殊定制
}

// 皮带
const beltFields = {
  b_material:{type:orderBaseSchema, decription:'材质'},
  b_color:{type:orderBaseSchema, decription:'颜色'},
  b_belt: {type:Schema.Types.ObjectId, ref:'goods', decription:'商品'},

  b_A: {type: Number, decription:'皮带测量数据A'},
  b_B: {type: Number, decription:'皮带测量数据B'},
  b_C: {type: Number, decription:'皮带测量数据C'},
  b_D: {type: Number, decription:'皮带测量数据D'},
  b_size_remark: {type: String, decription:'皮带测量备注'},
}

// 表带
const watchStrapFields = {
  ws_material:{type:orderBaseSchema, decription:'材质'},
  ws_style:{type:orderBaseSchema, decription:'类别，男女'},
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
  m_price:{type:Number, decription:'护理价格'},
  m_time:{type:Number, decription:'护理时间'},
  m_color:{type:String, decription:'颜色'},
  m_demo:{type:String, decription:'样品'},
  m_wash:{type:Boolean, decription:'是否水洗'}
}

// 充值
const rechargeFields = {
  r_amount:{type:Number, decription:'充值金额'},
  r_reward:{type:Number, decription:'奖励金额'}
}

// 配饰
const ornamentFields = {
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
  ...orderGoodsFields,
  type: {type:String, description:'类型'},
  state: {type:Number, decription:'订单状态'},
  pics:[new Schema({
    file:{type:Schema.Types.ObjectId, ref:'file', decription:'图片'},
    desc:{type:String, decription:'说明'}
  })],
  NID: {type:String, decription:'编号'},
  name:{type:String, decription:'名称'},
  count:{type:Number, decription:'数量', default:1},
  price:{type:Number, decription:'价格'},
  remark:{type:String, ddecription:'备注'},
  file:{type:Schema.Types.ObjectId, ref:'file', decription:'工程文件'},
  sub_order_id: {type:String, description:'子订单订单ID'},
  transport_company: {type:String, decription:'快递公司'},
  transport_id:{type:String, decription:'快递单号'},
  transport_price:{type:Number, decription:'快递费用'},
  transport_name: {type:String, decription:'收货人'},
  transport_phone: {type:String, decription:'电话'},
  transport_address: {type:String, decription:'收货地址'},
  transport_zipcode: {type:String, decription:'邮编'},

  urgent:{type:orderBaseSchema, decription:'加急'},
  shop: {type:Schema.Types.ObjectId, ref:'shop', decription:'店铺'},
  guide: {type:Schema.Types.ObjectId, ref:'user_shop_guide', decription:'导购'},
  customer: {type:Schema.Types.ObjectId, ref:'customer', decription:'客户'},
  order:{type:Schema.Types.ObjectId, ref:'order', decription:'订单信息'},
  ...baseFields
},{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
});
module.exports.subOrderModel = mongoose.model('sub_order', subOrderSchema);

const orderFields = {
  order_id: {type:String, description:'订单ID'},
  source: {type:String, description:'来源'},
  shop: {type:Schema.Types.ObjectId, ref:'shop', decription:'店铺'},
  guide: {type:Schema.Types.ObjectId, ref:'user_shop_guide', decription:'导购'},
  customer: {type:Schema.Types.ObjectId, ref:'customer', decription:'客户'},
  pay:{type:Number, decription:'支付金额'},
  pay_type:{type:String, decription:'支付方式'},
  store_card_selected:{type:Boolean, decription:'储值卡是否选择', default:false},
  cash_ticket_NID:{type:String, decription:'代金券ID', default:''},
  sub_orders:[{type:Schema.Types.ObjectId, ref:'sub_order', decription:'子订单'}],
  system_price:{type:Number, default:0, decription:'吊牌价格'},
  real_pay_price:{type:Number, default:0, decription:'实际支付价格'},
  discount_price:{type:Number, default:0, decription:'实际优惠了多少'},
  is_recharge:{type:Boolean, default:false, decription:'是否是充值订单'},
  signature_pic:{type:String, decription:'签名图片'},
  ...baseFields
}
const orderSchema = new Schema({
  ...orderFields
},{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
});
module.exports.orderModel = mongoose.model('order', orderSchema);

// 代金券
const cashTicketFields = {
  NID: {type:String}, // 编号
  start_time:{type:Date, default:moment().format('YYYY-MM-DD')}, // 开始时间
  expire_time: {type:Date, default:moment().format('YYYY-MM-DD')}, // 过期时间
  mount: {type:Number, default:0}, // 面额
  least_mount: {type:Number, default:0}, // 达到多少钱可以使用
}
const cashTicketSchema = new Schema({
  ...cashTicketFields
},{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
});
module.exports.cashTicketModel = mongoose.model('cash_ticket', orderSchema);