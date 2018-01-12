var mongoose = require('mongoose');
var moment = require('moment')

module.exports = {
  create_time       : {type:Date},
  editor_time       : {type:Date},
  editor_id         : {type:String, default:''},
  editor_name       : {type:String, default:''}
}