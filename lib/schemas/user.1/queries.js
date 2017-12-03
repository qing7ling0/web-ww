'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminList = undefined;

var _graphql = require('graphql');

var _types = require('./types');

var types = _interopRequireWildcard(_types);

var _index = require('../../data/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var commonFields = require('../common/common-fields');

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
//# sourceMappingURL=queries.js.map