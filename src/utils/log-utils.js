'use strict'

var log4js = require('log4js');

var logConfig = require('../../config/log-config');

//加载配置文件
log4js.configure(logConfig);

var logUtil = {};

var errorLogger = log4js.getLogger('errorLogger');
var resLogger = log4js.getLogger('resLogger');
var userModifyLogger = log4js.getLogger('userModifyLogger');
var debugLogger = log4js.getLogger('debugLogger')

//封装错误日志
logUtil.logError = function (ctx, error, resTime) {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime));
    }
};
//格式化错误日志
var formatError = function (ctx, err, resTime) {
    var logText = new String();

    //错误信息开始
    logText += "\n" + "*************** error log start ***************" + "\n";

    //添加请求日志
    logText += formatReqLog(ctx.request, resTime);

    //错误名称
    logText += "err name: " + err.name + "\n";
    //错误信息
    logText += "err message: " + err.message + "\n";
    //错误详情
    logText += "err stack: " + err.stack + "\n";

    //错误信息结束
    logText += "*************** error log end ***************" + "\n";

    return logText;
};

//封装响应日志
logUtil.logResponse = function (ctx, resTime) {
    if (ctx) {
        resLogger.info(formatRes(ctx, resTime));
    }
};
//格式化响应日志
var formatRes = function (ctx, resTime) {
    var logText = new String();

    //响应日志开始
    logText += "\n" + "*************** response log start ***************" + "\n";

    //添加请求日志
    logText += formatReqLog(ctx.request, resTime);

    //响应状态码
    logText += "response status: " + ctx.status + "\n";

    //响应内容
    logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";

    //响应日志结束
    logText += "*************** response log end ***************" + "\n";

    return logText;

}

//格式化请求日志
var formatReqLog = function (ctx, resTime) {

    var logText = new String();

    var method = ctx.method;
    //访问方法
    logText += "request method: " + method + "\n";

    //请求原始地址
    logText += "request originalUrl:  " + ctx.originalUrl + "\n";

    //客户端ip
    logText += "request client ip:  " + ctx.ip + "\n";

    //开始时间
    var startTime;
    //请求参数
    if (method === 'GET') {
        logText += "request query:  " + JSON.stringify(ctx.query) + "\n";
        // startTime = req.query.requestStartTime;
    } else {
        logText += "request body: " + "\n" + JSON.stringify(ctx.body) + "\n";
        // startTime = req.body.requestStartTime;
    }
    //服务器响应时间
    logText += "response time: " + resTime + "\n";

    return logText;
}

//封装用户修改日志
logUtil.logUserModify = function (type, data, time) {
    userModifyLogger.info(formatUserModify(type, data, time));
};
//格式化用户修改日志
var formatUserModify = function (type, data, time) {
    var logText = new String();

    //用户修改日志开始
    logText += "\n" + "*************** user modify [" + type + "] log start ***************" + "\n";

    //用户修改时间
    logText += "user modify time: " + time + "\n";

    //用户修改内容
    logText += "user modify content: " + "\n" + JSON.stringify(data) + "\n";

    //用户修改日志结束
    logText += "*************** user modify log end ***************" + "\n";

    return logText;
}


//封装调试日志
logUtil.logDebug = function (message, time) {
    debugLogger.debug(formatDebug(message, time));
};
//格式化调试日志
var formatDebug = function (message, time) {
    var logText = new String();
    //调试内容
    logText += "debug content: " + "\n" + message + "-----" + time + "\n";

    return logText;
}

module.exports = logUtil;