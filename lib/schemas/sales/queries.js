'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderList = exports.goodsShoesList = exports.goodsShoesProfile = exports.urgentList = exports.customList = exports.orderShoesList = exports.maintainPriceList = exports.goodsTypeList = exports.goodsSeasonList = exports.goodsStyleList = exports.colorList = exports.materialList = undefined;

var _graphql = require('graphql');

var _types = require('./types');

var types = _interopRequireWildcard(_types);

var _index = require('../../data/index');

var _sales = require('../../models/sales');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var DB = require('../../db/DB');
var commonFields = require('../common/common-fields');
var commonUtils = require('../../utils/common-utils');
var schemasUtils = require('../../utils/schemas-utils');

var materialList = exports.materialList = schemasUtils.createDefaultListQuery('materialList', types.materialType, _sales.materialModel, function (query) {
  return query.populate('color');
});
var colorList = exports.colorList = schemasUtils.createDefaultListQuery('colorList', types.colorType, _sales.colorModel);
var goodsStyleList = exports.goodsStyleList = schemasUtils.createDefaultListQuery('goodsStyleList', types.baseType, _sales.goodsStyleModel);
var goodsSeasonList = exports.goodsSeasonList = schemasUtils.createDefaultListQuery('goodsSeasonList', types.baseType, _sales.goodsSeasonModel);
var goodsTypeList = exports.goodsTypeList = schemasUtils.createDefaultListQuery('goodsTypeList', types.baseType, _sales.goodsTypeModel);
var maintainPriceList = exports.maintainPriceList = schemasUtils.createDefaultListQuery('maintainPriceList', types.maintainPriceType, _sales.maintainPriceModel);
var orderShoesList = exports.orderShoesList = schemasUtils.createDefaultListQuery('orderShoesList', types.orderShoesType, _sales.orderShoesModel);
var customList = exports.customList = schemasUtils.createDefaultListQuery('customList', types.customType, _sales.customModel);
var urgentList = exports.urgentList = schemasUtils.createDefaultListQuery('urgentList', types.urgentType, _sales.urgentModel);

var goodsShoesProfile = exports.goodsShoesProfile = {
  type: types.goodsShoesType,
  args: {
    id: { type: _graphql.GraphQLString }
  },
  resolve: function resolve(root, params, options) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _index.salesData.getGoodsShoesProfile(params.id);

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

var goodsShoesList = exports.goodsShoesList = {
  type: new _graphql.GraphQLObjectType({
    name: 'goodsShoesList',
    fields: {
      page: { type: commonFields.defaultPageType },
      list: { type: new _graphql.GraphQLList(types.goodsShoesType) }
    }
  }),
  args: {
    page: { type: _graphql.GraphQLInt },
    pageSize: { type: _graphql.GraphQLInt },
    conditions: { type: _graphql.GraphQLString }
  },
  resolve: function resolve(root, params, options) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (params.conditions) {
                params.conditions = commonUtils.urlString2Conditions(params.conditions);
              }
              _context2.next = 3;
              return _index.salesData.getGoodsShoesList({ page: params.page, pageSize: params.pageSize }, { conditions: params.conditions });

            case 3:
              return _context2.abrupt('return', _context2.sent);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  }
};

var orderList = exports.orderList = {
  type: new _graphql.GraphQLObjectType({
    name: 'orderList',
    fields: {
      page: { type: commonFields.defaultPageType },
      list: { type: new _graphql.GraphQLList(types.orderType) }
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
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (params.conditions) {
                params.conditions = commonUtils.urlString2Conditions(params.conditions);
              }
              _context3.next = 3;
              return _index.salesData.getOrderList({ page: params.page, pageSize: params.pageSize }, { conditions: params.conditions });

            case 3:
              return _context3.abrupt('return', _context3.sent);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3);
    }))();
  }
};
//# sourceMappingURL=queries.js.map