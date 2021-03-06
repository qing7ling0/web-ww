var mongoose = require('mongoose');
var moment = require('moment')
var DB = require('../db/DB')

var constants = require('../constants/constants')
var baseFields = require('./base-fields')

var Schema = mongoose.Schema;

export const customerFields = {
  name: {type:String, description:'姓名'},
  phone: { type: String, description:'电话', unique: true},
  sex: { type:String},
  birthday: { type: Date, default:moment().format('YYYY-MM-DD') },
  weixin: {type:String, description:'微信'},
  weixin_code_pic: {type:String, description:'微信二维码图片'},
  country: {type:String, description:'国家'},
  city: {type:String, description:'城市'},
  address: {type:String, description:'地址'},
  zipcode: {type:String, description:'邮编'},
  vip_card_date: {type: Date, description:'开卡日期'},
  vip_card_shop: {type: Schema.Types.ObjectId, ref:'shop', description:'开卡门店'},
  vip_card_guide: {type: Schema.Types.ObjectId, ref:'user_shop_guide', description:'开卡导购'},
  vip_level: {type: Number, default:0},
  vip_exp: {type:Number, default:0},
  balance:{type:Number, default:0, description:'余额'},
  recharge:{type:Number, default:0, description:'充值的数量'},
  recharge_reward:{type:Number, default:0, description:'充值赠送部分'},
  join_type: { type:String, description:'加入方式' },
  tags:[new Schema({
    tag:{type: Schema.Types.ObjectId, ref:'common', description:'标签'}
  })],
  point:{type:Number, default:0, description:'积分'},
  ...baseFields
};
// 店铺
module.exports.customerModel = mongoose.model('customer', new Schema(customerFields,{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
}));

// 脚型
var footSchema = new Schema({
  type: {type: String, description:'左右脚'},
  size: {type: Number, description:'尺码'},
  length: {type: Number, description:'长度'},
  zhiWei: {type: Number, decription:'趾围'},
  fuWei: {type: Number, decription:'附维'},
  ...baseFields
},{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
});
module.exports.footModel = mongoose.model('foot', footSchema);

// 皮带尺寸
var beltSchema = new Schema({
  A: {type: Number, description:'A'},
  B: {type: Number, decription:'B'},
  C: {type: Number, decription:'C'},
  D: {type: Number, decription:'D'},
  ...baseFields
},{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
});
module.exports.beltModel = mongoose.model('belt', beltSchema);

// 表带尺寸
var watchStrapSchema = new Schema({
  A: {type: Number, description:'A'},
  B: {type: Number, decription:'B'},
  C: {type: Number, decription:'C'},
  D: {type: Number, decription:'D'},
  E: {type: Number, decription:'E'},
  F: {type: Number, decription:'F'},
  G: {type: Number, decription:'G'},
  ...baseFields
},{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
});
module.exports.watchStrapModel = mongoose.model('watch_strap', watchStrapSchema);
