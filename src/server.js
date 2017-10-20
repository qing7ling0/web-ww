'use strict'
require('babel-register');
require('babel-polyfill');

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')
const router = require('koa-router')
const conver = require('koa-convert')
const session = require('koa-session2')

const _router = new router();

const config = require('../config/index')
const logUtil = require('./utils/log-utils');
const responseFormatter = require('./middlewares/response-formatter');
const schemas = require('./schemas/index');

app.use(session(config.session))
// error handler
onerror(app);

schemas(_router);

// middlewares
app.use(cors({credentials:true}));
// app.use(json())

app.use(logger());
// logger
app.use(async(ctx, next) => {
    //响应开始时间
    const start = new Date();
    //响应间隔时间
    var ms;
    try {
        //开始进入到下一个中间件
        await next();

        ms = new Date() - start;
        //记录响应日志
        logUtil.logResponse(ctx, ms);

    } catch (error) {

        ms = new Date() - start;
        //记录异常日志
        logUtil.logError(ctx, error, ms);
    }
});
app.use(responseFormatter('^/api'));

// // routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

app.use(_router.routes(), _router.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app