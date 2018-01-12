var mongoose = require('mongoose');
var moment = require('moment')

var DB = require('../db/DB')
var baseFields = require('./base-fields')
var utils = require('../utils/utils')

var Schema = mongoose.Schema;

var accountSchema = new Schema({
  account           : {type:String, validate:{
    validator:function(v) {
      return utils.isAccountValid(v);
    }
  }},
  password          : {type:String, validate:{
    validator:function(v) {
      return utils.isAccountValid(v);
    }
  }},
  user              : Schema.Types.ObjectId,
  user_type         : Number,
  last_login_time   : { type:Date, default:moment().format('YYYY-MM-DD HH:mm:ss') },
  last_login_ip     : { type:String, default:'' },
  ...baseFields
},{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
});
// DB.addPost(userSchema, ['save', 'find']);
// DB.addPre(userSchema, ['save', 'find']);

module.exports = mongoose.model('account', accountSchema);