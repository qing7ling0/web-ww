'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDefaultMutaion = exports.createDefaultProfileQuery = exports.createDefaultListQuery = undefined;

var _graphql = require('graphql');

var _DB = require('../db/DB');

var _DB2 = _interopRequireDefault(_DB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var commonUtils = require('./common-utils');
var commonFields = require('../schemas/common/common-fields');

var createDefaultListQuery = exports.createDefaultListQuery = function createDefaultListQuery(name, type, model, onQuery) {
  return {
    type: new _graphql.GraphQLObjectType({
      name: name,
      fields: {
        page: { type: commonFields.defaultPageType },
        list: { type: new _graphql.GraphQLList(type) }
      }
    }),
    args: {
      conditions: { type: _graphql.GraphQLString },
      page: { type: _graphql.GraphQLInt },
      pageSize: { type: _graphql.GraphQLInt }
    },
    resolve: function resolve(root, params, options) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var ret;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (params.conditions) {
                  params.conditions = commonUtils.urlString2Conditions(params.conditions);
                }
                console.log(JSON.stringify(params));
                ret = [];

                if (!(params.page > -1)) {
                  _context.next = 9;
                  break;
                }

                _context.next = 6;
                return _DB2.default.getList(model, { conditions: params.conditions }, { page: params.page, pageSize: params.pageSize }, onQuery);

              case 6:
                ret = _context.sent;
                _context.next = 12;
                break;

              case 9:
                _context.next = 11;
                return _DB2.default.getList(model, { conditions: params.conditions }, null, onQuery);

              case 11:
                ret = _context.sent;

              case 12:
                console.log(JSON.stringify(ret));
                return _context.abrupt('return', ret);

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
};

var createDefaultProfileQuery = exports.createDefaultProfileQuery = function createDefaultProfileQuery(type, model) {
  return {
    type: type,
    args: {
      id: { type: _graphql.GraphQLString }
    },
    resolve: function resolve(root, params, options) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _DB2.default.findById(model, params.id);

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    }
  };
};

var createDefaultMutaion = exports.createDefaultMutaion = function createDefaultMutaion(tag, type, inputType, model) {
  var ret = {};
  ret[tag + 'Add'] = {
    type: type,
    args: {
      doc: { type: inputType }
    },
    resolve: function resolve(ctx, params, options) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _DB2.default.add(model, params.doc);

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    }
  };
  ret[tag + 'Remove'] = {
    type: new _graphql.GraphQLList(_graphql.GraphQLString),
    args: {
      ids: { type: new _graphql.GraphQLList(_graphql.GraphQLString) }
    },
    resolve: function resolve(ctx, params, options) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var ret;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _DB2.default.removeByIds(model, params.ids);

              case 2:
                ret = _context4.sent;

                if (!ret) {
                  _context4.next = 7;
                  break;
                }

                ret = JSON.parse(ret);

                if (!ret.ok) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt('return', params.ids);

              case 7:
                return _context4.abrupt('return', null);

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this4);
      }))();
    }
  };
  ret[tag + 'Update'] = {
    type: commonFields.operateResultType,
    args: {
      doc: { type: inputType },
      conditions: { type: _graphql.GraphQLString },
      id: { type: _graphql.GraphQLString }
    },
    resolve: function resolve(ctx, params, options) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (params.conditions) {
                  params.conditions = commonUtils.urlString2Conditions(params.conditions);
                } else {
                  params.conditions = { _id: params.id };
                }
                _context5.next = 3;
                return _DB2.default.update(model, params.conditions, params.doc);

              case 3:
                return _context5.abrupt('return', _context5.sent);

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this5);
      }))();
    }
  };
  return ret;
};
//# sourceMappingURL=schemas-utils.js.map