'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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

var CustomerData = function () {
  function CustomerData() {
    _classCallCheck(this, CustomerData);
  }

  _createClass(CustomerData, [{
    key: 'getList',


    /**
     * 获取客户列表
     * 
     * @param {any} page 
     * @param {any} options {conditions}
     * @memberof customerData
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(page, options) {
        var skip, limit, findOptions, conditions, total, customers;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                skip = 0;
                limit = page.pageSize || 100;

                if (page.page) {
                  skip = Math.max(page.page - 1, 0) * limit;
                }
                findOptions = options.options || {};

                findOptions.limit = limit;
                findOptions.skip = skip;
                conditions = options.conditions || {};
                _context.next = 9;
                return _index.customerModel.find(conditions).count();

              case 9:
                total = _context.sent;
                _context.next = 12;
                return _index.customerModel.find(conditions, null, findOptions);

              case 12:
                customers = _context.sent;

                customers = customers.map(function (item) {
                  return item;
                });
                return _context.abrupt('return', {
                  page: { page: page.page, pageSize: limit, total: total },
                  list: customers
                });

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getList(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getList;
    }()
  }, {
    key: 'find',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(conditions, projection, options) {
        var customer;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _index.customerModel.findOne(conditions, projection, options);

              case 2:
                customer = _context2.sent;

                if (!customer) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt('return', customer);

              case 7:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.UPDATE_FAIL);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function find(_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: 'add',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(doc) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var customer, newcustomer;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!doc) {
                  _context3.next = 13;
                  break;
                }

                customer = new _index.customerModel(doc);

                if (!customer) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 5;
                return customer.save(options);

              case 5:
                newcustomer = _context3.sent;

                if (!newcustomer) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt('return', newcustomer);

              case 8:
                _context3.next = 11;
                break;

              case 10:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ADD_FAIL);

              case 11:
                _context3.next = 14;
                break;

              case 13:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ADD_FAIL);

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function add(_x6) {
        return _ref3.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: 'update',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(conditions, doc, options) {
        var ret;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!doc) {
                  _context4.next = 7;
                  break;
                }

                _context4.next = 3;
                return _index.customerModel.update(conditions, doc, options);

              case 3:
                ret = _context4.sent;
                return _context4.abrupt('return', ret);

              case 7:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.UPDATE_FAIL);

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function update(_x8, _x9, _x10) {
        return _ref4.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: 'remove',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(conditions) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!conditions) {
                  _context5.next = 6;
                  break;
                }

                _context5.next = 3;
                return model.deleteMany(conditions);

              case 3:
                return _context5.abrupt('return', _context5.sent);

              case 6:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.DELETE_FAIL);

              case 7:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function remove(_x11) {
        return _ref5.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: 'removeByIds',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ids) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(ids && ids.length > 0)) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 3;
                return _index.customerModel.remove({ _id: { $in: ids } });

              case 3:
                return _context6.abrupt('return', _context6.sent);

              case 6:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.DELETE_FAIL);

              case 7:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function removeByIds(_x12) {
        return _ref6.apply(this, arguments);
      }

      return removeByIds;
    }()
  }]);

  return CustomerData;
}();

module.exports = new CustomerData();
//# sourceMappingURL=customer.js.map