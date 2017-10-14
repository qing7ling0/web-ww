var mongoose = require('mongoose');
var DB = require('../db/DB')

var Schema = mongoose.Schema;

var userSchema = new Schema({
  account:          String,
  name:             String,
  nickname:         String,
  password:         String,
  vip_level:        Number,
  last_login_time:  {type:Date, default:Date.now},
  last_login_ip:    String,
  editer_time:      {type:Date, default:Date.now},
  editer_id:        {type:String, default:''},
  editer_name:      {type:String, default:''},
  create_time:      {type:Date, default:Date.now}
});
// DB.addPost(userSchema, ['save', 'find']);
// DB.addPre(userSchema, ['save', 'find']);

module.exports = mongoose.model('User', userSchema);