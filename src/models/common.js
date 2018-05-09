/**
 * 通用表
 * 主要用来存储基本配置信息表
 */

var mongoose = require('mongoose');
var moment = require('moment')
var DB = require('../db/DB')

var constants = require('../constants/constants')
var baseFields = require('./base-fields')

var Schema = mongoose.Schema;

const commonBaseFields = {
  type: {type:String, description:'类型'},
  NID:{type:String, description:'编号', default:'0'},
  hide:{type:Boolean, description:'是否隐藏', default:false}
};

// 颜色（斜面颜色，内里颜色，鞋底颜色，底边颜色，原材料颜色）
const colorFields = {
  name:{type:String, description:'名字'}
}

// 特殊定制
const customFields = {
  name:{type:String, description:'名字'},
  n_material:{type: Schema.Types.ObjectId, ref:'material', decription:'内增皮料'},
  d_material:{type: Schema.Types.ObjectId, ref:'material', decription:'特大码皮料'},
  price:{type:Number, description:'价格'},
}

// 加急
const urgentFields = {
  day:{type:Number, description:'天数'},
  price:{type:Number, description:'价格'},
}

// 项目护理
const maintainFields = {
  name: {type: String, decription:'项目名称'},
  price: {type: Number, decription:'价格'},
  time: {type:Number, decription:'时间'},
}

// 商品大类
const goodsTypeFields = {
  name:{type:String, description:'名称'}
}

// 商品系列
const goodsStyleFields = {
  name:{type:String, description:'名称'}
}

// 商品季节
const goodsSeasonFields = {
  name:{type:String, description:'名称'}
}

// 鞋子楦号
const xuanHaoFields = {
  name:{type:String, description:'名称'}
}

// 鞋子跟高
const genGaoFields = {
  name:{type:Number, description:'跟高'}
}

// 鞋子规格
const guiGeFields = {
  name:{type:String, description:'名称'}
}

// 表带类型
const watchStrapStyleFields = {
  name:{type:String, description:'名称'}
}

// 鞋贴边
const shoesTieBianFields = {
  name:{type:String, description:'名称'}
}

// 充值奖励
const rechargeRewardFields = {
  mount: {type:Number, description:'梯次'},
  reward: {type:Number, description:'奖励'},
}

// vip等级
const VIPFields = {
  level: {type:Number}, // 等级
  exp: {type:Number}, // 升级经验
  discount:{type:Number}, // 享受的折扣
}

// 店铺区域
const regionFields = {
  color_css: {type:Number, description:'css颜色', default:0xffff000},
}

// 会员分析柱状图颜色
const customerAnalyseFields = {
  analyse_id: {type:String, description:'分析的类型'},
  color_css: {type:Number, description:'css颜色', default:0xffff000},
}

// 会员分析柱状图颜色
const activityDiscountFields = {
  name:{type:String, description:'名称'},
  discount_type:{type:Number, description:'折扣类型'},
  discount: {type:Number, description:'折扣值'},
  enabled: {type:Boolean, description:'是否可用'}
}

const commonFields = {
  ...commonBaseFields,
  ...colorFields,
  ...customFields,
  ...urgentFields,
  ...maintainFields,
  ...goodsTypeFields,
  ...goodsStyleFields,
  ...goodsSeasonFields,
  ...xuanHaoFields,
  ...genGaoFields,
  ...guiGeFields,
  ...watchStrapStyleFields,
  ...rechargeRewardFields,
  ...VIPFields,
  ...regionFields,
  ...customerAnalyseFields,
  ...activityDiscountFields,
  ...baseFields
}

var _commonSchema = new Schema(commonFields,{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
});

module.exports.commonSchema = _commonSchema;
module.exports.commonModel = mongoose.model('common', _commonSchema);

module.exports.NIDModel = mongoose.model('NID', new Schema({
  key: {type:String, description:'key'},
  count: {type:Number, description:'数量'},
},{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
}));


module.exports.appPlatformModel = mongoose.model('app-platform', new Schema({
  version: {type:Number, description:'版本共9位，001001001 表示1.1.1'},
  platform: {type:Number, description:'平台IOS/Android'},
  forced:{type:Boolean, description:'是否强制更新'},
  update_url: {type:String, description:'更新地址'},
  enable: {type:String, description:'是否可用'}
},{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
}));