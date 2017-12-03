'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.updateAdmin = exports.deleteAdmin = exports.addAdmin = exports.addUser = undefined;

var _graphql = require('graphql');

var _types = require('./types');

var types = _interopRequireWildcard(_types);

var _index = require('../../data/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var addUser = exports.addUser = {
  type: types.userType,
  args: {
    info: {
      name: 'info',
      type: new _graphql.GraphQLNonNull(types.userInputType)
    }
  },
  resolve: function resolve(root, params, options) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var newUser;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _index.userData.addUser(root, params);

            case 2:
              newUser = _context.sent;
              return _context.abrupt('return', newUser);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
};

var addAdmin = exports.addAdmin = {
  type: types.userType,
  args: {
    user: {
      name: 'user',
      type: new _graphql.GraphQLNonNull(types.adminInputType)
    },
    account: {
      name: 'account',
      type: new _graphql.GraphQLNonNull(types.accountInputType)
    }
  },
  resolve: function resolve(root, params, options) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var newUser;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              params.user_type = _index.userData.types().admin;
              _context2.next = 3;
              return _index.userData.addUser(root, params);

            case 3:
              newUser = _context2.sent;
              return _context2.abrupt('return', newUser);

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  }
};

var deleteAdmin = exports.deleteAdmin = {
  type: new _graphql.GraphQLList(_graphql.GraphQLString),
  args: {
    ids: { type: new _graphql.GraphQLList(_graphql.GraphQLString) }
  },
  resolve: function resolve(root, params, options) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var ids;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              params.user_type = _index.userData.types().admin;
              _context3.next = 3;
              return _index.userData.deleteUser(root, params);

            case 3:
              ids = _context3.sent;
              return _context3.abrupt('return', ids);

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3);
    }))();
  }
};

var updateAdmin = exports.updateAdmin = {
  type: types.userType,
  args: {
    fields: { type: types.adminInputType }
  },
  resolve: function resolve(root, params, options) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _index.userData.updateUser(_index.userData.types().admin, params.fields);

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

var login = exports.login = {
  type: types.userType,
  args: {
    account: {
      name: 'account',
      type: _graphql.GraphQLString
    },
    password: {
      name: 'password',
      type: _graphql.GraphQLString
    }
  },
  resolve: function resolve(ctx, params, options) {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var user;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _index.userData.login(ctx, params);

            case 2:
              user = _context5.sent;
              return _context5.abrupt('return', user);

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this5);
    }))();
  }
};

var logout = exports.logout = {
  type: types.logoutType,
  args: {
    id: {
      name: 'id',
      type: _graphql.GraphQLString
    }
  },
  resolve: function resolve(ctx, params, options) {
    var _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var ret;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _index.userData.logout(ctx, params);

            case 2:
              ret = _context6.sent;
              return _context6.abrupt('return', ret);

            case 4:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this6);
    }))();
  }
};
//# sourceMappingURL=mutations.js.map