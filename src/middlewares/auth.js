'use strict'

const {ApiError, ApiErrorNames} = require('../error/api-errors');

const mongoose = require('mongoose');
const { randomBytes } = require('crypto');

const EXPIRE_TIME = 1000*60*60*24*2; // 2天

const Schema = mongoose.Schema;

const authSchema = new Schema({
  expireTime:   Number,
  user:         String
});
const authModel = mongoose.model('auth', authSchema);

var auth = async function(ctx, next) {
  if (/^\/login$/.test(ctx.originalUrl)) {
    await next();
    if (ctx.session.user){
      let data = {expireTime:new Date().getTime()+EXPIRE_TIME, user:ctx.session.user};
      let _auth = new authModel(data);
      let x = await _auth.save();
      ctx.response.append('auth', x._id);
    }
  } else {
    if (ctx.session.user){
      await next();
    } else {
      if (ctx.request.headers.auth) {
        let time = new Date().getTime();
        let data = await authModel.findById(ctx.request.headers.auth);
        if (!data || data.expireTime < time) {
          throw new ApiError(ApiErrorNames.LOGIN_INVALID);
        } else {
          await authModel.findByIdAndUpdate(ctx.request.headers.auth, {expireTime:time+EXPIRE_TIME});
          ctx.response.append('auth', x._id);
        }
      } else {
        throw new ApiError(ApiErrorNames.LOGIN_INVALID);
      }
    }
  }
}

module.exports = auth;