'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../models/index.js');

var _DB = require('../db/DB');

var _DB2 = _interopRequireDefault(_DB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('../constants/config'),
    Menus = _require.Menus,
    Routers = _require.Routers;

var CommonData = function () {
  function CommonData() {
    _classCallCheck(this, CommonData);
  }

  _createClass(CommonData, [{
    key: 'getMenus',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', Menus);

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getMenus() {
        return _ref.apply(this, arguments);
      }

      return getMenus;
    }()
  }, {
    key: 'getRouters',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', Routers);

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getRouters() {
        return _ref2.apply(this, arguments);
      }

      return getRouters;
    }()
  }, {
    key: 'getCommonList',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(type) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var page = arguments[2];
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (type) {
                  if (!options) {
                    options = { conditions: {} };
                  } else if (!options.conditions) {
                    options.conditions = {};
                  }
                  options.conditions.type = type;
                }

                return _context3.abrupt('return', _DB2.default.getList(_index.commonModel, options, page));

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getCommonList(_x) {
        return _ref3.apply(this, arguments);
      }

      return getCommonList;
    }()
  }, {
    key: 'addCommon',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(doc) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', _DB2.default.add(_index.commonModel, doc, options));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function addCommon(_x3) {
        return _ref4.apply(this, arguments);
      }

      return addCommon;
    }()
  }, {
    key: 'updateCommon',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(conditions, doc, options) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', _DB2.default.update(_index.commonModel, conditions, doc, options));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function updateCommon(_x5, _x6, _x7) {
        return _ref5.apply(this, arguments);
      }

      return updateCommon;
    }()
  }, {
    key: 'removeCommon',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(conditions) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt('return', _DB2.default.remove(_index.commonModel, conditions));

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function removeCommon(_x8) {
        return _ref6.apply(this, arguments);
      }

      return removeCommon;
    }()
  }, {
    key: 'removeByIdsCommon',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(model, ids) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt('return', _DB2.default.removeByIds(_index.commonModel, ids));

              case 1:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function removeByIdsCommon(_x9, _x10) {
        return _ref7.apply(this, arguments);
      }

      return removeByIdsCommon;
    }()
  }, {
    key: 'findByIdCommon',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(id, onQuery) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt('return', _DB2.default.findById(_index.commonModel, id, onQuery));

              case 1:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function findByIdCommon(_x11, _x12) {
        return _ref8.apply(this, arguments);
      }

      return findByIdCommon;
    }()
  }]);

  return CommonData;
}();

module.exports = new CommonData();
//# sourceMappingURL=common-data.js.map