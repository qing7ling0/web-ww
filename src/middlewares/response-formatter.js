'use strict'

const {ApiError, ApiErrorNames} = require('../error/api-errors');

/**
 * 在app.use(router)之前调用
 */
var responseFormatter = (ctx) => {
    //如果有返回数据，将返回数据添加到data中
    console.log('responseFormatter' + JSON.stringify(ctx.body));
    // console.log('responseFormatter message ' + ctx.result);
    if (ctx.body) {
        let body = JSON.parse(ctx.body);
        
        if (body.errors ) {
            let error = body.errors.length > 0 ? body.errors[0] : body.errors;
            if (typeof(error.code)=="undefined") {
                ctx.body = {
                    code: -1,
                    message: JSON.stringify(error)
                }
            } else {
                ctx.body = {
                    code: error.code,
                    message: error.message,
                    data: body.data
                }
            }
        } else {
            ctx.body = {
                code: 0,
                message: ctx.result || '',
                data: body.data
            }
        }
    } else {
        ctx.body = {
            code: 0,
            message: ''
        }
    }
}

var urlFilter = function(pattern) {

    return async(ctx, next) => {
        var reg = new RegExp(pattern);
        try {
            //先去执行路由
            await next();
        } catch (error) {
            //如果异常类型是API异常并且通过正则验证的url，将错误信息添加到响应体中返回。
            if (error instanceof ApiError && reg.test(ctx.originalUrl)) {
                ctx.status = 200;
                ctx.body = {
                    code: error.code,
                    message: error.message
                }
            }
            //继续抛，让外层中间件处理日志
            throw error;
        }

        //通过正则的url进行格式化处理
        if (reg.test(ctx.originalUrl)) {
            responseFormatter(ctx);
        }
    }
}
module.exports = urlFilter;