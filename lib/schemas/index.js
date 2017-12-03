'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _koaGraphql = require('koa-graphql');

var _koaGraphql2 = _interopRequireDefault(_koaGraphql);

var _graphql = require('graphql');

var _DB = require('../db/DB');

var _DB2 = _interopRequireDefault(_DB);

var _index = require('./user/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./common/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./shop/index');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('./customer/index');

var _index8 = _interopRequireDefault(_index7);

var _index9 = require('./sales/index');

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _expressGraphql = require('express-graphql');


function createModule(schema) {
    var _this = this;

    return (0, _koaGraphql2.default)(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, response, ctx) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt('return', {
                                schema: schema,
                                graphiql: false,
                                rootValue: ctx,
                                // context: {platform: JSON.stringify(dd)},
                                formatError: function formatError(error) {
                                    return {
                                        type: 'graphql',
                                        path: error.path,
                                        name: error.originalError && error.originalError.name || error.name,
                                        message: error.message,
                                        code: error.originalError && error.originalError.code || -1,
                                        locations: error.locations ? error.locations[0] : null
                                    };
                                }
                            });

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }());
}

var schema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
        name: 'Query',
        fields: _extends({}, _index2.default.queries, _index4.default.queries, _index6.default.queries, _index8.default.queries, _index10.default.queries)
    }),

    mutation: new _graphql.GraphQLObjectType({
        name: 'Mutation',
        fields: _extends({}, _index2.default.mutations, _index6.default.mutations, _index4.default.mutations, _index4.default.queries, _index8.default.mutations, _index10.default.mutations)
    })
});

function register() {
    return function (router) {
        router.all('/api', createModule(schema));
    };
}

module.exports = register();
//# sourceMappingURL=index.js.map