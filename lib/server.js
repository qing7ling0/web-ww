'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Koa = require('koa');
var app = new Koa();
var views = require('koa-views');
var json = require('koa-json');
var onerror = require('koa-onerror');
var bodyparser = require('koa-bodyparser');
var logger = require('koa-logger');
var cors = require('koa-cors');
var router = require('koa-router');
var conver = require('koa-convert');
var session = require('koa-session2');

var SessionStore = require('./session-store');
var config = require('../config/index');
var logUtil = require('./utils/log-utils');
var responseFormatter = require('./middlewares/response-formatter');
var schemas = require('./schemas/index');

var _router = new router();
var _sessionStore = new SessionStore();

app.use(session(_extends({}, config.session, { store: _sessionStore })));
// error handler
onerror(app);

schemas(_router);

// middlewares
app.use(cors({ credentials: true }));
// app.use(json())

app.use(logger());
// logger
app.use(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
        var start, ms;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        //响应开始时间
                        start = new Date();
                        //响应间隔时间

                        _context.prev = 1;
                        _context.next = 4;
                        return next();

                    case 4:

                        ms = new Date() - start;
                        //记录响应日志
                        logUtil.logResponse(ctx, ms);

                        _context.next = 12;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](1);


                        ms = new Date() - start;
                        //记录异常日志
                        logUtil.logError(ctx, _context.t0, ms);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 8]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());
app.use(responseFormatter('^/api'));

// // routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

app.use(_router.routes(), _router.allowedMethods());
// error-handling
app.on('error', function (err, ctx) {
    console.error('server error', err, ctx);
});

module.exports = app;
//# sourceMappingURL=server.js.map