const mongoose = require('mongoose');
const moment = require('moment')

const DB = require('../db/DB')
const baseFields = require('./base-fields')
const utils = require('../utils/utils')

const Schema = mongoose.Schema;

export const messageSchema = new Schema({
  type: {type:Number, decription:'类型'},
  accept_guide:{type: Schema.Types.ObjectId, ref:'user_shop_guide', decription:'导购'},
  sub_order: {type: Schema.Types.ObjectId, ref:'sub_order', decription:'订单'},
  allot_sample: {type: Schema.Types.ObjectId, ref:'sample_allot', decription:'申请调拨样品记录'},
  customer_birthday: {type: Schema.Types.ObjectId, ref:'customer', decription:'要过生日的客户'},

  status: {type:Number, decription:'状态'},
  ...baseFields
},{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
});

export const messageModel = mongoose.model('message', fileSchema);