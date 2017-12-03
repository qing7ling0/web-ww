var path = require('path');

//日志根目录
var baseLogPath = path.resolve(__dirname, '../logs')

//错误日志目录
var errorPath = "/error";
//错误日志文件名
var errorFileName = "error";
//错误日志输出完整路径
var errorLogPath = baseLogPath + errorPath + "/" + errorFileName;


//响应日志目录
var responsePath = "/response";
//响应日志文件名
var responseFileName = "response";
//响应日志输出完整路径
var responseLogPath = baseLogPath + responsePath + "/" + responseFileName;


//用户修改日志目录
var userModifyPath = "/user-modify";
//用户修改日志文件名
var userModifyFileName = "user-modify";
//用户修改日志输出完整路径
var userModifyLogPath = baseLogPath + userModifyPath + "/" + userModifyFileName;

//调试日志目录
var debugPath = "/debug";
//调试日志文件名
var debugFileName = "debug";
//调试日志输出完整路径
var debugLogPath = baseLogPath + debugPath + "/" + debugFileName;

module.exports = {
    "appenders":
    {
        //错误日志
        error: {
            "category":"errorLogger",             //logger名称
            "type": "dateFile",                   //日志类型
            "filename": errorLogPath,             //日志输出位置
            "alwaysIncludePattern":true,          //是否总是有后缀名
            "pattern": "-yyyy-MM-dd.log",      //后缀，每小时创建一个新的日志文件
            "path": errorPath                     //自定义属性，错误日志的根目录
        },
        //响应日志
        res: {
            "category":"resLogger",
            "type": "dateFile",
            "filename": responseLogPath,
            "alwaysIncludePattern":true,
            "pattern": "-yyyy-MM-dd.log",
            "path": responsePath  
        },
        //用户修改日志
        userModify: {
            "category":"userModifyLogger",
            "type": "dateFile",
            "filename": userModifyLogPath,
            "alwaysIncludePattern":true,
            "pattern": "-yyyy-MM-dd.log",
            "path": userModifyPath  
        },
        //debug日志
        debug: {
            "category":"debugLogger",
            "type": "dateFile",
            "filename": debugLogPath,
            "alwaysIncludePattern":true,
            "pattern": "-yyyy-MM-dd.log",
            "path": debugPath  
        }
    },
    categories: { 
        default: { appenders: ['res', 'userModify'], level: 'all' },
        userModify: { appenders: ['userModify'], level: 'all' },
        debug: { appenders: ['debug'], level: 'debug' },
        error: { appenders:['error'], level: 'error'}
    },
    "baseLogPath": baseLogPath                  //logs根目录
}