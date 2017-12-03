'use strict';

var _graphql = require('graphql');

var _koaGraphql = require('koa-graphql');

var _koaGraphql2 = _interopRequireDefault(_koaGraphql);

var _DB = require('../db/DB');

var _DB2 = _interopRequireDefault(_DB);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var schema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
        name: 'rootQueryType',
        fields: {
            hello: {
                type: _graphql.GraphQLString,
                resolve: function resolve() {
                    var _this = this;

                    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                        var a;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.next = 2;
                                        return _DB2.default.queryTest();

                                    case 2:
                                        a = _context.sent;
                                        return _context.abrupt('return', 'world' + a.name + a.id);

                                    case 4:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, _this);
                    }))();
                }
            }
        }
    })
});

var graphqlModule = (0, _koaGraphql2.default)(function (request) {
    return {
        schema: Schemas,
        graphiql: true,
        // context: { token: request.header.authorization, platform: request.query.platform },
        formatError: function formatError(error) {
            return {
                type: 'graphql',
                path: error.path,
                message: error.message + JSON.stringify(request),
                locations: error.locations ? error.locations[0] : null
            };
        }
    };
});

module.exports = schema;
//# sourceMappingURL=user.js.map