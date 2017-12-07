'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCommon = exports.deleteCommon = exports.addCommon = exports.menuAdd = undefined;

var _graphql = require('graphql');

var _types = require('./types');

var types = _interopRequireWildcard(_types);

var _index = require('../../data/index');

var _models = require('../../models');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var commonFields = require('../common/common-fields');
var schemasUtils = require('../../utils/schemas-utils');

var menuAdd = exports.menuAdd = {
  type: types.menu,
  args: {
    info: {
      name: 'info',
      type: _graphql.GraphQLString
    }
  },
  resolve: function resolve(root, params, options) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
};

var addCommon = exports.addCommon = {
  type: types.commonType,
  args: {
    doc: {
      name: 'doc', type: new _graphql.GraphQLNonNull(types.commonInputType)
    }
  },
  resolve: function resolve(ctx, params, options) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var common;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _index.commonData.addCommon(params.doc);

            case 2:
              common = _context2.sent;

              ctx.result = '添加成功！';
              return _context2.abrupt('return', common);

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  }
};
var deleteCommon = exports.deleteCommon = {
  type: new _graphql.GraphQLList(_graphql.GraphQLString),
  args: {
    ids: { type: new _graphql.GraphQLList(_graphql.GraphQLString) }
  },
  resolve: function resolve(ctx, params, options) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var ret, res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _index.commonData.removeCommonByIds(params.ids);

            case 2:
              ret = _context3.sent;

              if (!ret) {
                _context3.next = 8;
                break;
              }

              res = JSON.parse(ret);

              if (!(ret.ok === 1)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt('return', params.ids);

            case 7:
              return _context3.abrupt('return', null);

            case 8:
              return _context3.abrupt('return', null);

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3);
    }))();
  }
};
var updateCommon = exports.updateCommon = {
  type: commonFields.operateResultType,
  args: {
    doc: { type: types.commonInputType }
  },
  resolve: function resolve(ctx, params, options) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _index.commonData.updateCommon({ _id: params.doc._id }, params.doc);

            case 2:
              return _context4.abrupt('return', _context4.sent);

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this4);
    }))();
  }
};
//# sourceMappingURL=mutations.js.map