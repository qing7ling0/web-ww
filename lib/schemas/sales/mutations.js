'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _sales = require('../../models/sales');

var _index = require('../../data/index');

var _types = require('./types');

var types = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var DB = require('../../db/DB');
var commonFields = require('../common/common-fields');
var commonUtils = require('../../utils/common-utils');
var schemasUtils = require('../../utils/schemas-utils');

var material = schemasUtils.createDefaultMutaion('material', types.materialType, types.materialInputType, _sales.materialModel);
var goods = schemasUtils.createDefaultMutaion('goods', types.goodsType, types.goodsInputType, _sales.goodsModel);

var orderAdd = {
  type: types.orderType,
  args: {
    doc: {
      name: 'doc',
      type: new _graphql.GraphQLNonNull(types.orderInputType)
    }
  },
  resolve: function resolve(ctx, params, options) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var shop;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _index.salesData.addOrder(params.doc);

            case 2:
              shop = _context.sent;

              ctx.result = '添加成功！';
              return _context.abrupt('return', shop);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
};

var orderRemove = {
  type: new _graphql.GraphQLList(_graphql.GraphQLString),
  args: {
    ids: { type: new _graphql.GraphQLList(_graphql.GraphQLString) }
  },
  resolve: function resolve(ctx, params, options) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var ret, res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _index.salesData.removeOrderByIds(params.ids);

            case 2:
              ret = _context2.sent;

              if (!ret) {
                _context2.next = 8;
                break;
              }

              res = JSON.parse(ret);

              if (!(ret.ok === 1)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt('return', params.ids);

            case 7:
              return _context2.abrupt('return', null);

            case 8:
              return _context2.abrupt('return', null);

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  }
};

var orderUpdate = {
  type: commonFields.operateResultType,
  args: {
    doc: { type: types.orderInputType }
  },
  resolve: function resolve(ctx, params, options) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _index.salesData.updateOrder({ _id: params.doc._id }, params.doc);

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

var mutations = _extends({}, material, { orderAdd: orderAdd, orderRemove: orderRemove, orderUpdate: orderUpdate
});
exports.default = mutations;
//# sourceMappingURL=mutations.js.map