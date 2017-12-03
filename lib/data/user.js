'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../models/index.js');

var _apiErrors = require('../error/api-errors');

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _utils3 = require('../base/utils/utils');

var _utils4 = _interopRequireDefault(_utils3);

var _constants = require('../constants/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import 

var logUtil = require('../utils/log-utils');

var UserData = function () {
  function UserData() {
    _classCallCheck(this, UserData);
  }

  _createClass(UserData, [{
    key: 'getUserModel',
    value: function getUserModel(type) {
      switch (type) {
        case _constants2.default.USER_TYPES.shopGuide:
          return _index.userShopGuideModel;
        case _constants2.default.USER_TYPES.operate:
          return _index.userOperateModel;
        case _constants2.default.USER_TYPES.production:
          return _index.userProductionModel;
        case _constants2.default.USER_TYPES.admin:
          return _index.userAdminModel;
        default:
          break;
      }
      return null;
    }
  }, {
    key: 'populateUserModel',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(type, query) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = type;
                _context.next = _context.t0 === _constants2.default.USER_TYPES.shopGuide ? 3 : _context.t0 === _constants2.default.USER_TYPES.operate ? 6 : _context.t0 === _constants2.default.USER_TYPES.production ? 9 : _context.t0 === _constants2.default.USER_TYPES.admin ? 12 : 15;
                break;

              case 3:
                _context.next = 5;
                return query.populate('account').populate('shop').exec();

              case 5:
                return _context.abrupt('return', _context.sent);

              case 6:
                _context.next = 8;
                return query.populate('account').exec();

              case 8:
                return _context.abrupt('return', _context.sent);

              case 9:
                _context.next = 11;
                return query.populate('account').exec();

              case 11:
                return _context.abrupt('return', _context.sent);

              case 12:
                _context.next = 14;
                return query.populate('account').exec();

              case 14:
                return _context.abrupt('return', _context.sent);

              case 15:
                return _context.abrupt('break', 16);

              case 16:
                return _context.abrupt('return', null);

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function populateUserModel(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return populateUserModel;
    }()
  }, {
    key: 'getUserList',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, params) {
        var model, skip, limit, conditions, total, users;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                model = this.getUserModel(params.user_type);

                if (!model) {
                  _context2.next = 16;
                  break;
                }

                skip = 0;
                limit = params.pageSize || 100;

                if (params.page) {
                  skip = Math.max(params.page - 1, 0) * limit;
                }
                conditions = params.conditions || {};
                _context2.next = 8;
                return model.find(conditions).count();

              case 8:
                total = _context2.sent;
                _context2.next = 11;
                return this.populateUserModel(params.user_type, model.find(conditions).skip(skip).limit(limit));

              case 11:
                users = _context2.sent;

                console.log('users' + JSON.stringify(users));
                return _context2.abrupt('return', {
                  page: { page: params.page, pageSize: limit, total: total },
                  list: users
                });

              case 16:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.UPDATE_FAIL);

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getUserList(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return getUserList;
    }()
  }, {
    key: 'getUserById',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(type, id) {
        var user, model;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                user = null;
                model = this.getUserModel(type);

                if (!model) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 5;
                return this.populateUserModel(type, model.findOne({ _id: id }));

              case 5:
                user = _context3.sent;
                _context3.next = 9;
                break;

              case 8:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.UPDATE_FAIL);

              case 9:
                return _context3.abrupt('return', user);

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getUserById(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return getUserById;
    }()
  }, {
    key: 'getUser',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx, params) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!params.user_type) {
                  _context4.next = 4;
                  break;
                }

                return _context4.abrupt('return', null);

              case 4:
                _context4.next = 6;
                return getUserById(params.type, params.id);

              case 6:
                return _context4.abrupt('return', _context4.sent);

              case 9:
                return _context4.abrupt('return', user);

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getUser(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return getUser;
    }()

    /**
     * 添加用户信息
     * 
     * @param {any} ctx 
     * @param {user{usertype}, account{account, password}} params
     * @returns 
     * @memberof UserData
     */

  }, {
    key: 'addUser',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx, params) {
        var account, acUser, info, _user, model, newUser, _info;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (params.user_type) {
                  _context5.next = 4;
                  break;
                }

                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.UPDATE_FAIL);

              case 4:
                if (params.user) {
                  _context5.next = 6;
                  break;
                }

                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.UPDATE_FAIL);

              case 6:
                account = null;

                if (!(params.account && params.account.account && params.account.password)) {
                  _context5.next = 24;
                  break;
                }

                if (!(!UserData.checkAccount(params.account.account) || !UserData.checkPassword(params.account.password))) {
                  _context5.next = 10;
                  break;
                }

                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ACCOUNT_PASSWORD_ERROR);

              case 10:
                _context5.next = 12;
                return _index.accountModel.findOne({ account: params.account.account });

              case 12:
                account = _context5.sent;

                if (!(account && account.user)) {
                  _context5.next = 19;
                  break;
                }

                _context5.next = 16;
                return this.getUserById(account.user_type, account.user);

              case 16:
                acUser = _context5.sent;

                if (!acUser) {
                  _context5.next = 19;
                  break;
                }

                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ACCOUNT_EXIST);

              case 19:
                if (account) {
                  _context5.next = 24;
                  break;
                }

                // 如果没有账号创建账号
                info = { account: params.account.account, password: _utils2.default.sha1(params.account.password), user_type: params.user_type };
                _context5.next = 23;
                return new _index.accountModel(info).save();

              case 23:
                account = _context5.sent;

              case 24:

                // 开始创建用户表
                _user = null;
                model = this.getUserModel(params.user_type);

                if (model) {
                  _user = new model(params.user);
                }

                if (!_user) {
                  _context5.next = 41;
                  break;
                }

                _context5.next = 30;
                return _user.save();

              case 30:
                newUser = _context5.sent;

                if (!newUser) {
                  _context5.next = 37;
                  break;
                }

                _info = { account: params.account.account, password: _utils2.default.sha1(params.account.password), user: newUser._id, user_type: params.user_type };

                if (!account) {
                  _context5.next = 36;
                  break;
                }

                _context5.next = 36;
                return _index.accountModel.findByIdAndUpdate(account._id, _info, { new: true });

              case 36:

                if (account) {
                  // 如果账号更新成功，则更新user中的account字段
                  newUser = model.findByIdAndUpdate(newUser._id, { account: account._id }, { new: true }).populate('account');
                }

              case 37:
                ctx.result = '添加成功！';
                return _context5.abrupt('return', newUser);

              case 41:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.UPDATE_FAIL);

              case 42:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addUser(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return addUser;
    }()

    /**
     * 
     * @param {*} ctx 
     * @param {user{userType}, account{account, password}} params
     */

  }, {
    key: 'updateUser',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userType, fields, options, modelOptions) {
        var account, info, _model, userInfo, _user2, model, _info2;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (userType) {
                  _context6.next = 2;
                  break;
                }

                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.UPDATE_FAIL);

              case 2:
                if (fields._id) {
                  _context6.next = 4;
                  break;
                }

                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.UPDATE_FAIL);

              case 4:
                account = null;
                // 更新账号信息

                if (!fields.account) {
                  _context6.next = 43;
                  break;
                }

                info = {};

                if (!('account' in fields.account)) {
                  _context6.next = 11;
                  break;
                }

                if (UserData.checkAccount(fields.account.account)) {
                  _context6.next = 10;
                  break;
                }

                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ACCOUNT_PASSWORD_ERROR);

              case 10:
                info.account = fields.account.account;

              case 11:
                if (!('password' in fields.account)) {
                  _context6.next = 15;
                  break;
                }

                if (UserData.checkPassword(fields.account.password)) {
                  _context6.next = 14;
                  break;
                }

                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ACCOUNT_PASSWORD_ERROR);

              case 14:
                info.password = _utils2.default.sha1(fields.account.password);

              case 15:
                if (!info) {
                  _context6.next = 43;
                  break;
                }

                if (!info.account) {
                  _context6.next = 28;
                  break;
                }

                _context6.next = 19;
                return _index.accountModel.findOne({ account: info.account });

              case 19:
                account = _context6.sent;

                if (!(account && account.user)) {
                  _context6.next = 28;
                  break;
                }

                // 根据账号获取用户信息
                _model = this.getUserModel(account.user_type);

                if (!_model) {
                  _context6.next = 28;
                  break;
                }

                _context6.next = 25;
                return _model.findById(account.user);

              case 25:
                userInfo = _context6.sent;

                if (!(userInfo && (userInfo._id !== fields._id || account.user_type !== userType))) {
                  _context6.next = 28;
                  break;
                }

                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ACCOUNT_EXIST);

              case 28:
                if (!fields.account._id) {
                  _context6.next = 34;
                  break;
                }

                _context6.next = 31;
                return _index.accountModel.findByIdAndUpdate(fields.account._id, info, { new: true });

              case 31:
                account = _context6.sent;
                _context6.next = 43;
                break;

              case 34:
                // 没有添加
                info.user_type = userType;
                info.user = fields._id;

                if (!account) {
                  _context6.next = 40;
                  break;
                }

                account = _index.accountModel.findByIdAndUpdate(account._id, info, { new: true });
                _context6.next = 43;
                break;

              case 40:
                _context6.next = 42;
                return new _index.accountModel(info).save();

              case 42:
                account = _context6.sent;

              case 43:
                _context6.prev = 43;
                _user2 = null;
                model = this.getUserModel(userType);

                if (!model) {
                  _context6.next = 57;
                  break;
                }

                _info2 = _extends({}, fields);

                if (account) {
                  _info2.account = account._id;
                } else {
                  _info2.account = '';
                }
                console.log('update user' + JSON.stringify(fields) + "; info=" + JSON.stringify(_info2));
                _context6.next = 52;
                return model.findByIdAndUpdate(fields._id, _info2, modelOptions || { new: true });

              case 52:
                _user2 = _context6.sent;

                console.log('update user' + JSON.stringify(_user2));
                return _context6.abrupt('return', _user2);

              case 57:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.UPDATE_FAIL);

              case 58:
                _context6.next = 63;
                break;

              case 60:
                _context6.prev = 60;
                _context6.t0 = _context6['catch'](43);
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.UPDATE_FAIL);

              case 63:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[43, 60]]);
      }));

      function updateUser(_x11, _x12, _x13, _x14) {
        return _ref6.apply(this, arguments);
      }

      return updateUser;
    }()
  }, {
    key: 'deleteUserByIds',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(type, ids) {
        var users, model, i;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                users = null;
                model = this.getUserModel(type);

                if (!model) {
                  _context7.next = 17;
                  break;
                }

                _context7.next = 5;
                return model.deleteMany({ _id: { $in: ids } });

              case 5:
                users = _context7.sent;

                if (!(users && users.length > 0)) {
                  _context7.next = 14;
                  break;
                }

                i = 0;

              case 8:
                if (!(i < users.length)) {
                  _context7.next = 14;
                  break;
                }

                _context7.next = 11;
                return _index.accountModel.findByIdAndRemove(users[i].account);

              case 11:
                i++;
                _context7.next = 8;
                break;

              case 14:
                return _context7.abrupt('return', users);

              case 17:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.UPDATE_FAIL);

              case 18:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function deleteUserByIds(_x15, _x16) {
        return _ref7.apply(this, arguments);
      }

      return deleteUserByIds;
    }()
  }, {
    key: 'deleteUserById',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(type, id) {
        var user, model;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                user = null;
                model = this.getUserModel(type);

                if (!model) {
                  _context8.next = 12;
                  break;
                }

                _context8.next = 5;
                return model.findByIdAndRemove(id);

              case 5:
                user = _context8.sent;

                if (!user) {
                  _context8.next = 9;
                  break;
                }

                _context8.next = 9;
                return _index.accountModel.findByIdAndRemove(user.account);

              case 9:
                return _context8.abrupt('return', user);

              case 12:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.UPDATE_FAIL);

              case 13:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function deleteUserById(_x17, _x18) {
        return _ref8.apply(this, arguments);
      }

      return deleteUserById;
    }()
  }, {
    key: 'deleteUser',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(ctx, params) {
        var ret, model;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                ret = null;
                model = this.getUserModel(params.user_type);

                if (!(model || params.ids && params.ids.length > 0)) {
                  _context9.next = 21;
                  break;
                }

                if (!(params.ids.length === 1)) {
                  _context9.next = 9;
                  break;
                }

                _context9.next = 6;
                return model.deleteOne({ _id: params.ids[0] });

              case 6:
                ret = _context9.sent;
                _context9.next = 12;
                break;

              case 9:
                _context9.next = 11;
                return model.deleteMany({ _id: { $in: params.ids } });

              case 11:
                ret = _context9.sent;

              case 12:
                if (ret) {
                  ret = JSON.parse(ret);
                }

                if (!(ret && ret.ok == 1)) {
                  _context9.next = 18;
                  break;
                }

                if (params.ids.length !== ret.n) {
                  logUtil.debug('delete user count not equal ids=' + JSON.stringify(params.ids) + '; result=' + JSON.stringify(ret));
                }
                return _context9.abrupt('return', params.ids);

              case 18:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.DELETE_FAIL);

              case 19:
                _context9.next = 22;
                break;

              case 21:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.DELETE_FAIL);

              case 22:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function deleteUser(_x19, _x20) {
        return _ref9.apply(this, arguments);
      }

      return deleteUser;
    }()

    // async 

  }, {
    key: 'login',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(ctx, params) {
        var superAdmin, user, account;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                superAdmin = require('./super-admin');

                if (!(superAdmin.account.account === params.account)) {
                  _context10.next = 4;
                  break;
                }

                ctx.session.user = superAdmin;
                return _context10.abrupt('return', superAdmin);

              case 4:
                if (!ctx.session.user) {
                  _context10.next = 7;
                  break;
                }

                logUtil.debug('login user session====' + JSON.stringify(ctx.session.user));
                return _context10.abrupt('return', ctx.session.user);

              case 7:
                if (!(!UserData.checkAccount(params.account) || !UserData.checkPassword(params.password))) {
                  _context10.next = 9;
                  break;
                }

                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ACCOUNT_PASSWORD_ERROR);

              case 9:
                user = null;
                _context10.next = 12;
                return _index.accountModel.findOne({ account: params.account, password: _utils2.default.sha1(params.password) });

              case 12:
                account = _context10.sent;

                if (!account) {
                  _context10.next = 19;
                  break;
                }

                _context10.next = 16;
                return this.getUserById(account.user_type, account.user);

              case 16:
                user = _context10.sent;
                _context10.next = 20;
                break;

              case 19:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ACCOUNT_PASSWORD_ERROR);

              case 20:
                if (user) {
                  _context10.next = 22;
                  break;
                }

                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ACCOUNT_PASSWORD_ERROR);

              case 22:
                ctx.session.user = user;
                return _context10.abrupt('return', user);

              case 24:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function login(_x21, _x22) {
        return _ref10.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: 'logout',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(ctx, params) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                ctx.session.user = null;
                return _context11.abrupt('return', { success: true });

              case 2:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function logout(_x23, _x24) {
        return _ref11.apply(this, arguments);
      }

      return logout;
    }()
  }, {
    key: 'types',
    value: function types() {
      return _constants2.default.USER_TYPES;
    }
  }], [{
    key: 'checkPassword',
    value: function checkPassword(value) {
      if (!value) return false;

      if (!_utils4.default.IsString(value)) return false;

      if (value.length < _constants2.default.ACCOUNT_MIN_LENGTH || value.length > _constants2.default.ACCOUNT_MAX_LENGTH) return false;

      return _utils2.default.isPasswordValid(value);
    }
  }, {
    key: 'checkAccount',
    value: function checkAccount(value) {
      if (!value) return false;

      if (!_utils4.default.IsString(value)) return false;

      if (value.length < _constants2.default.ACCOUNT_MIN_LENGTH || value.length > _constants2.default.ACCOUNT_MAX_LENGTH) return false;

      return _utils2.default.isAccountValid(value);
    }
  }]);

  return UserData;
}();

module.exports = new UserData();
//# sourceMappingURL=user.js.map