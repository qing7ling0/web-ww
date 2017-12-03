'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var mongoose = require('mongoose');
var moment = require('moment');

var DB = require('../db/DB');
var baseFields = require('./base-fields');
var utils = require('../utils/utils');

var Schema = mongoose.Schema;

var accountSchema = new Schema(_extends({
  account: { type: String, validate: {
      validator: function validator(v) {
        return utils.isAccountValid(v);
      }
    } },
  password: { type: String, validate: {
      validator: function validator(v) {
        return utils.isAccountValid(v);
      }
    } },
  user: Schema.Types.ObjectId,
  user_type: Number,
  last_login_time: { type: Date, default: moment().format('YYYY-MM-DD HH:mm:ss') },
  last_login_ip: { type: String, default: '' }
}, baseFields));
// DB.addPost(userSchema, ['save', 'find']);
// DB.addPre(userSchema, ['save', 'find']);

module.exports = mongoose.model('account', accountSchema);
//# sourceMappingURL=account.js.map