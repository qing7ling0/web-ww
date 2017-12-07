'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customerDetail = exports.customerList = undefined;

var _graphql = require('graphql');

var _types = require('./types');

var types = _interopRequireWildcard(_types);

var _index = require('../../data/index');

var _customer = require('../../models/customer');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var commonFields = require('../common/common-fields');
var commonUtils = require('../../utils/common-utils');
var schemasUtils = require('../../utils/schemas-utils');

var customerList = exports.customerList = {
  type: new _graphql.GraphQLObjectType({
    name: 'customerList',
    fields: {
      page: { type: commonFields.defaultPageType },
      list: { type: new _graphql.GraphQLList(types.customerType) }
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
                params.conditions = commonUtils.urlString2Conditions(params.conditions);
              }
              _context.next = 3;
              return _index.customerData.getList({ page: params.page, pageSize: params.pageSize }, { conditions: params.conditions });

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

var customerDetail = exports.customerDetail = {
  type: types.customerType,
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
              return _index.customerData.find(conditions);

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