'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('../error/api-errors'),
    ApiError = _require.ApiError,
    ApiErrorNames = _require.ApiErrorNames;

/**
 * 在app.use(router)之前调用
 */


var responseFormatter = function responseFormatter(ctx) {
    //如果有返回数据，将返回数据添加到data中
    console.log('responseFormatter' + JSON.stringify(ctx.body));
    // console.log('responseFormatter message ' + ctx.result);
    if (ctx.body) {
        var body = JSON.parse(ctx.body);

        if (body.errors) {
            var error = body.errors.length > 0 ? body.errors[0] : body.errors;
            if (typeof error.code == "undefined") {
                ctx.body = {
                    code: -1,
                    message: JSON.stringify(error)
                };
            } else {
                ctx.body = {
                    code: error.code,
                    message: error.message,
                    data: body.data
                };
            }
        } else {
            ctx.body = {
                code: 0,
                message: ctx.result || '',
                data: body.data
            };
        }
    } else {
        ctx.body = {
            code: 0,
            message: ''
        };
    }
};

var urlFilter = function urlFilter(pattern) {
    var _this = this;

    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
            var reg;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            reg = new RegExp(pattern);
                            _context.prev = 1;
                            _context.next = 4;
                            return next();

                        case 4:
                            _context.next = 10;
                            break;

                        case 6:
                            _context.prev = 6;
                            _context.t0 = _context['catch'](1);

                            //如果异常类型是API异常并且通过正则验证的url，将错误信息添加到响应体中返回。
                            if (_context.t0 instanceof ApiError && reg.test(ctx.originalUrl)) {
                                ctx.status = 200;
                                ctx.body = {
                                    code: _context.t0.code,
                                    message: _context.t0.message
                                };
                            }
                            //继续抛，让外层中间件处理日志
                            throw _context.t0;

                        case 10:

                            //通过正则的url进行格式化处理
                            if (reg.test(ctx.originalUrl)) {
                                responseFormatter(ctx);
                            }

                        case 11:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[1, 6]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};
module.exports = urlFilter;
//# sourceMappingURL=response-formatter.js.map