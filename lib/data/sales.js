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

var _DB = require('../db/DB');

var _DB2 = _interopRequireDefault(_DB);

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
    key: 'goodsShoesPopulate',
    value: function goodsShoesPopulate(query) {
      return query.populate('type').populate('season').populate('style').populate('out_color').populate('in_color').populate('bottom_color').populate('bottom_side_color').exec();
    }
  }, {
    key: 'getGoodsShoesList',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(page, options) {
        var _this = this;

        var list;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _DB2.default.getList(_index.goodsShoesModel, options, page, function (query) {
                  return _this.goodsShoesPopulate(query);
                });

              case 2:
                list = _context.sent;
                return _context.abrupt('return', list);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getGoodsShoesList(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getGoodsShoesList;
    }()
  }, {
    key: 'getGoodsShoesProfile',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var _this2 = this;

        var profile;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _DB2.default.findById(_index.goodsShoesModel, id, function (query) {
                  return _this2.goodsShoesPopulate(query);
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

      function getGoodsShoesProfile(_x3) {
        return _ref2.apply(this, arguments);
      }

      return getGoodsShoesProfile;
    }()
  }]);

  return SalesData;
}();

module.exports = new SalesData();
//# sourceMappingURL=sales.js.map