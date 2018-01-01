const mongoose = require('mongoose');
const moment = require('moment')

const DB = require('../db/DB')
const baseFields = require('./base-fields')
const utils = require('../utils/utils')

const Schema = mongoose.Schema;

export const fileSchema = new Schema({
  name: {type:String, decription:'文件名'},
  path: {type:String, decription:'路径'},
  ext: {type:String, decription:'文件扩展名'},
  temp: {type:Boolean, decription:'是否临时文件'},
  ...baseFields
});

export const fileModel = mongoose.model('file', fileSchema);