'use strict'

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


const _router = new router();

const index = require('./routes/index')
const users = require('./routes/users')

const logUtil = require('./lib/utils/log-utils');
const responseFormatter = require('./middlewares/response-formatter');

// error handler
onerror(app)

const graphqlHTTP = require('koa-graphql');
const Schemas = require('./schemas/index.js');
const graphqlModule = graphqlHTTP((request) => ({
    schema: Schemas,
    graphiql: true,
    // context: { token: request.header.authorization, platform: request.query.platform },
    formatError: error => ({
        type: 'graphql',
        path: error.path,
        message: error.message + JSON.stringify(request),
        locations: error.locations ? error.locations[0] : null
    })
}));
_router.all('/api', graphqlModule);

// middlewares
app.use(cors());
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