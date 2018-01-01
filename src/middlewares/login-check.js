'use strict'

const {ApiError, ApiErrorNames} = require('../error/api-errors');

var loginCheck = async function(ctx, next) {
  if (ctx.session.user){
    await next();
  } else {
    if (/^\/login$/.test(ctx.originalUrl)) {
      await next();
    } else {
      throw new ApiError(ApiErrorNames.LOGIN_INVALID);
    }
  }
}

module.exports = loginCheck;