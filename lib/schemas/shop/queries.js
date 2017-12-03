'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shopDetail = exports.shopList = undefined;

var _graphql = require('graphql');

var _types = require('./types');

var types = _interopRequireWildcard(_types);

var _index = require('../../data/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var commonFields = require('../common/common-fields');
var commonUtils = require('../../utils/common-utils');

var shopList = exports.shopList = {
  type: new _graphql.GraphQLObjectType({
    name: 'shopList',
    fields: {
      page: { type: commonFields.defaultPageType },
      list: { type: new _graphql.GraphQLList(types.shopType) }
    }
  }),
  args: {
    page: { type: _graphql.GraphQLInt },
    pageSize: { type: _graphql.GraphQLInt },
    conditions: { type: _graphql.GraphQLString }
  },
  resolve: function resolve(root, params, options) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (params.conditions) {
                console.log(decodeURIComponent(params.conditions));
                params.conditions = commonUtils.urlString2Conditions(params.conditions);
                console.log(JSON.stringify(params.conditions));
              }
              _context.next = 3;
              return _index.shopData.getList({ page: params.page, pageSize: params.pageSize }, { conditions: params.conditions });

            case 3:
              return _context.abrupt('return', _context.sent);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
};

var shopDetail = exports.shopDetail = {
  type: types.shopType,
  args: {
    conditions: { type: _graphql.GraphQLString }
  },
  resolve: function resolve(root, params, options) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _index.shopData.find(conditions);

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
//# sourceMappingURL=queries.js.map