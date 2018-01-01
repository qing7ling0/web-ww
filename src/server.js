'use strict'
const path = require('path')
const fs = require('fs')
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
const multer = require('koa-multer');
const serve = require('koa-static');
const moment = require('moment')
const send = require('koa-send')

const SessionStore = require('./session-store');
const config = require('../config/index');
const logUtil = require('./utils/log-utils');
const responseFormatter = require('./middlewares/response-formatter');
const {fileUpload, fileSend} = require('./middlewares/file-middleware');
const loginCheck = require('./middlewares/login-check');
const schemas = require('./schemas/index');

const _router = new router();
const _sessionStore = new SessionStore();

global.LQ_ROOT_DIR = path.join(__dirname, '../');

const upload = multer({ 
    dest: config.upload.uploadDir, 
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let rootPath = config.upload.uploadDir;
            let time = moment().format('YYYYMMDD');
            let dirPath = path.join(rootPath, time);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath)
            }
            cb(null, dirPath)
          },
        filename: function (req, file, cb) {
            let ext = path.extname(file.originalname);
            cb(null, file.fieldname + '-' + moment().format('YYYYMMDDHHmmssSSSSS')+ext)
        }
    }),
    limits: config.upload.limits,
    fileFilter: function(req, file, cb) {
        if (config.upload.fileFilterReg.test(file.originalname)) {
            cb(null, true);
        } else {
            cb(new Error('当前文件格式不支持'));
        }
    }
 });

app.use(session({...config.session, store:_sessionStore}))
// error handler
onerror(app);

app.use(serve("./uploads"));
_router.post('/upload', upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'order', maxCount: 10 }
]));
_router.get('/file/:id', fileSend);

schemas(_router);

// middlewares
app.use(cors({credentials:true}));

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
app.use(responseFormatter('^/(api|upload|login)$'));
app.use(fileUpload);
app.use(loginCheck);

// routes
app.use(_router.routes(), _router.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app