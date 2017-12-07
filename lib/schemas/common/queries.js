'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonList = exports.routers = exports.menus = undefined;

var _graphql = require('graphql');

var _types = require('./types');

var types = _interopRequireWildcard(_types);

var _index = require('../../data/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var commonFields = require('../common/common-fields');
var commonUtils = require('../../utils/common-utils');
var schemasUtils = require('../../utils/schemas-utils');

var menus = exports.menus = {
  type: new _graphql.GraphQLList(types.menu),
  resolve: function resolve(ctx, params, options) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _index.commonData.getMenus(ctx, params);

            case 2:
              return _context.abrupt('return', _context.sent);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
};

var routers = exports.routers = {
  type: new _graphql.GraphQLList(types.router),
  resolve: function resolve(ctx, params, options) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _index.commonData.getRouters(ctx, params);

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

var commonList = exports.commonList = {
  type: new _graphql.GraphQLObjectType({
    name: 'commonList',
    fields: {
      page: { type: commonFields.defaultPageType },
      list: { type: new _graphql.GraphQLList(types.commonType) }
    }
  }),
  args: {
    page: { type: _graphql.GraphQLInt },
    pageSize: { type: _graphql.GraphQLInt },
    conditions: { type: _graphql.GraphQLString }
  },
  resolve: function resolve(root, params, options) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var page;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (params.conditions) {
                params.conditions = commonUtils.urlString2Conditions(params.conditions);
              }
              page = { page: -1, pageSize: 0 };

              if (params.page && params.pageSize) {
                page.page = params.page;
                page.pageSize = params.pageSize;
              }
              _context3.next = 5;
              return _index.commonData.getCommonList(null, { conditions: params.conditions }, page);

            case 5:
              return _context3.abrupt('return', _context3.sent);

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3);
    }))();
  }
};
//# sourceMappingURL=queries.js.map