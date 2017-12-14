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
  ...baseFields
}

var _commonSchema = new Schema(commonFields);

module.exports.commonSchema = _commonSchema;
module.exports.commonModel = mongoose.model('common', _commonSchema);
