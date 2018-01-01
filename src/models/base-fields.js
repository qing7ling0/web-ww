var mongoose = require('mongoose');
var moment = require('moment')

module.exports = {
  create_time       : {type:Date, default:moment().format('YYYY-MM-DD HH:mm:ss')},
  editor_time       : {type:Date, default:moment().format('YYYY-MM-DD HH:mm:ss')},
  editor_id         : {type:String, default:''},
  editor_name       : {type:String, default:''}
}