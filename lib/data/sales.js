'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _index = require('../models/index.js');

var _apiErrors = require('../error/api-errors');

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _utils3 = require('../base/utils/utils');

var _utils4 = _interopRequireDefault(_utils3);

var _validate = require('../base/utils/validate');

var validate = _interopRequireWildcard(_validate);

var _constants = require('../constants/constants');

var _constants2 = _interopRequireDefault(_constants);

var _DB = require('../db/DB');

var _DB2 = _interopRequireDefault(_DB);

var _index2 = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import 

var logUtil = require('../utils/log-utils');

var SalesData = function () {
  function SalesData() {
    _classCallCheck(this, SalesData);
  }

  _createClass(SalesData, [{
    key: 'goodsPopulate',
    value: function goodsPopulate(query) {
      return query.populate('type').populate('season').populate('style').populate('s_material').populate('s_out_color').populate('s_in_color').populate('s_bottom_color').populate('s_bottom_side_color').populate('b_material').populate('b_color').populate('ws_material').exec();
    }

    /**
     * 获取商品列表
     * 
     * @param {any} goods 商品类型（鞋，皮带，表带）
     * @param {any} page 
     * @param {any} options 
     * @returns 
     * @memberof SalesData
     */

  }, {
    key: 'getGoodsList',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(goods, page, options) {
        var _this = this;

        var list;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (goods) {
                  if (!options.conditions) {
                    options.conditions = {};
                  }
                  options.conditions.goods = goods;
                }
                _context.next = 3;
                return _DB2.default.getList(_index.goodsModel, options, page, function (query) {
                  return _this.goodsPopulate(query);
                });

              case 3:
                list = _context.sent;
                return _context.abrupt('return', list);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getGoodsList(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return getGoodsList;
    }()
  }, {
    key: 'getGoodsProfile',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var _this2 = this;

        var profile;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _DB2.default.findById(_index.goodsModel, id, function (query) {
                  return _this2.goodsPopulate(query);
                });

              case 2:
                profile = _context2.sent;
                return _context2.abrupt('return', profile);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getGoodsProfile(_x4) {
        return _ref2.apply(this, arguments);
      }

      return getGoodsProfile;
    }()
  }, {
    key: 'orderPopulate',
    value: function orderPopulate(query) {
      return query.populate('s_shoes').populate('shop').populate('guide').populate('customer').exec();
    }
  }, {
    key: 'getOrderList',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(page, options) {
        var _this3 = this;

        var list;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _DB2.default.getList(_index.orderModel, options, page, function (query) {
                  return _this3.orderPopulate(query);
                });

              case 2:
                list = _context3.sent;
                return _context3.abrupt('return', list);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getOrderList(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return getOrderList;
    }()
  }, {
    key: 'updateOrAddCustomerByOrder',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(order, customerDoc) {
        var customer, _customerData, cmodel;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(customerDoc && customerDoc.phone && !validate.isMobile(customerDoc.phone))) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return', null);

              case 2:
                _context4.next = 4;
                return _index.customerModel.findOne({ phone: customerDoc.phone });

              case 4:
                customer = _context4.sent;
                _customerData = {};

                if (!customer) {
                  _context4.next = 16;
                  break;
                }

                // 更新客户信息
                if (customerDoc.name && customer.name !== customerDoc.name) {
                  _customerData.name = customerDoc.name;
                }
                if (customerDoc.sex && customer.sex !== customerDoc.sex) {
                  _customerData.sex = customerDoc.sex;
                }
                if (customerDoc.birthday && customer.birthday !== customerDoc.birthday) {
                  _customerData.birthday = customerDoc.birthday;
                }
                if (customer.weixin !== customerDoc.weixin) {
                  _customerData.weixin = customerDoc.weixin;
                }
                _context4.next = 13;
                return _index.customerModel.findOneAndUpdate(customer._id, _customerData);

              case 13:
                return _context4.abrupt('return', customer);

              case 16:
                // 添加客户
                _customerData = _extends({}, customerDoc);
                _customerData.vip_card_date = (0, _moment2.default)().format('YYYY-MM-DD');
                _customerData.vip_card_shop = order.shop;
                _customerData.vip_card_guide = order.guide;
                cmodel = new _index.customerModel(_customerData);
                _context4.next = 23;
                return cmodel.save();

              case 23:
                customer = _context4.sent;
                return _context4.abrupt('return', customer);

              case 25:
                return _context4.abrupt('return', null);

              case 26:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateOrAddCustomerByOrder(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return updateOrAddCustomerByOrder;
    }()
  }, {
    key: 'addOrder',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(doc) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var customer, order, newOrder;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!doc) {
                  _context5.next = 21;
                  break;
                }

                if (!(!doc.customer || !doc.customer.phone)) {
                  _context5.next = 3;
                  break;
                }

                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ADD_FAIL);

              case 3:
                _context5.next = 5;
                return this.updateOrAddCustomerByOrder(doc, doc.customer);

              case 5:
                customer = _context5.sent;

                if (customer) {
                  _context5.next = 8;
                  break;
                }

                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ADD_FAIL);

              case 8:
                doc.customer = customer._id;

                order = new _index.orderModel(doc);

                if (!order) {
                  _context5.next = 18;
                  break;
                }

                _context5.next = 13;
                return order.save(options);

              case 13:
                newOrder = _context5.sent;

                if (!newOrder) {
                  _context5.next = 16;
                  break;
                }

                return _context5.abrupt('return', newOrder);

              case 16:
                _context5.next = 19;
                break;

              case 18:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ADD_FAIL);

              case 19:
                _context5.next = 22;
                break;

              case 21:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ADD_FAIL);

              case 22:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addOrder(_x9) {
        return _ref5.apply(this, arguments);
      }

      return addOrder;
    }()
  }, {
    key: 'updateOrder',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(conditions, doc, options) {
        var customer, ret;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!doc) {
                  _context6.next = 15;
                  break;
                }

                if (!(!doc.customer || !doc.customer.phone)) {
                  _context6.next = 3;
                  break;
                }

                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ADD_FAIL);

              case 3:
                _context6.next = 5;
                return this.updateOrAddCustomerByOrder(doc.customer);

              case 5:
                customer = _context6.sent;

                if (customer) {
                  _context6.next = 8;
                  break;
                }

                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ADD_FAIL);

              case 8:
                doc.customer = customer._id;

                _context6.next = 11;
                return _index.orderModel.update(conditions, doc, options);

              case 11:
                ret = _context6.sent;
                return _context6.abrupt('return', ret);

              case 15:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.UPDATE_FAIL);

              case 16:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function updateOrder(_x11, _x12, _x13) {
        return _ref6.apply(this, arguments);
      }

      return updateOrder;
    }()
  }, {
    key: 'removeOrder',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(conditions) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!conditions) {
                  _context7.next = 6;
                  break;
                }

                _context7.next = 3;
                return _index.orderModel.deleteMany(conditions);

              case 3:
                return _context7.abrupt('return', _context7.sent);

              case 6:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.DELETE_FAIL);

              case 7:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function removeOrder(_x14) {
        return _ref7.apply(this, arguments);
      }

      return removeOrder;
    }()
  }, {
    key: 'removeOrderByIds',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(ids) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(ids && ids.length > 0)) {
                  _context8.next = 6;
                  break;
                }

                _context8.next = 3;
                return _index.orderModel.remove({ _id: { $in: ids } });

              case 3:
                return _context8.abrupt('return', _context8.sent);

              case 6:
                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.DELETE_FAIL);

              case 7:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function removeOrderByIds(_x15) {
        return _ref8.apply(this, arguments);
      }

      return removeOrderByIds;
    }()
  }]);

  return SalesData;
}();

module.exports = new SalesData();
//# sourceMappingURL=sales.js.map