var mongoose = require('mongoose');
var moment = require('moment')
var DB = require('../db/DB')

var constants = require('../constants/constants')
var baseFields = require('./base-fields')

var Schema = mongoose.Schema;

export const logFields = {
  uid: {type:Schema.Types.ObjectId, description:'用户ID'},
  name: {type:String, description:'姓名'},
  type: {type:String, description:'类型'},
  sub_type: {type:String, description:'子类型'},
  message: {type:String, description:'内容'},
  ...baseFields
};
// 店铺
module.exports.logModel = mongoose.model('log', new Schema(logFields));
