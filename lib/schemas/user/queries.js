'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productionList = exports.operateList = exports.shopGuideList = exports.adminList = undefined;

var _graphql = require('graphql');

var _types = require('./types');

var types = _interopRequireWildcard(_types);

var _index = require('../../data/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var commonFields = require('../common/common-fields');
var commonUtils = require('../../utils/common-utils');

// export const adminList = {
// 	type: new GraphQLList(types.userType),
//   args: {
//     page: {type: GraphQLInt},
//     pageSize: {type: GraphQLInt},
//   },
// 	async resolve (root, params, options) {
// 		params.user_type = userData.types().admin;
// 		var users = await userData.getUserList(root, params);
// 		return users;
// 	}
// }

var adminList = exports.adminList = {
  type: new _graphql.GraphQLObjectType({
    name: 'adminListPage',
    fields: {
      page: { type: commonFields.defaultPageType },
      list: { type: new _graphql.GraphQLList(types.userType) }
    }
  }),
  args: {
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
              params.user_type = _index.userData.types().admin;
              _context.next = 3;
              return _index.userData.getUserList(root, params);

            case 3:
              ret = _context.sent;
              return _context.abrupt('return', ret);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
};

var shopGuideList = exports.shopGuideList = {
  type: new _graphql.GraphQLObjectType({
    name: 'shopGuideList',
    fields: {
      page: { type: commonFields.defaultPageType },
      list: { type: new _graphql.GraphQLList(types.userType) }
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
      var ret;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              params.user_type = _index.userData.types().shopGuide;
              params.conditions = commonUtils.urlString2Conditions(params.conditions);
              _context2.next = 4;
              return _index.userData.getUserList(root, params);

            case 4:
              ret = _context2.sent;
              return _context2.abrupt('return', ret);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  }
};

var operateList = exports.operateList = {
  type: new _graphql.GraphQLObjectType({
    name: 'operateList',
    fields: {
      page: { type: commonFields.defaultPageType },
      list: { type: new _graphql.GraphQLList(types.userType) }
    }
  }),
  args: {
    page: { type: _graphql.GraphQLInt },
    pageSize: { type: _graphql.GraphQLInt }
  },
  resolve: function resolve(root, params, options) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var ret;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              params.user_type = _index.userData.types().operate;
              _context3.next = 3;
              return _index.userData.getUserList(root, params);

            case 3:
              ret = _context3.sent;
              return _context3.abrupt('return', ret);

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3);
    }))();
  }
};

var productionList = exports.productionList = {
  type: new _graphql.GraphQLObjectType({
    name: 'productionList',
    fields: {
      page: { type: commonFields.defaultPageType },
      list: { type: new _graphql.GraphQLList(types.userType) }
    }
  }),
  args: {
    page: { type: _graphql.GraphQLInt },
    pageSize: { type: _graphql.GraphQLInt },
    conditions: { type: _graphql.GraphQLString }
  },
  resolve: function resolve(root, params, options) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var ret;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              params.user_type = _index.userData.types().production;
              _context4.next = 3;
              return _index.userData.getUserList(root, params);

            case 3:
              ret = _context4.sent;
              return _context4.abrupt('return', ret);

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this4);
    }))();
  }
};
//# sourceMappingURL=queries.js.map