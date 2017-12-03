'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require("koa-session2"),
    Store = _require.Store;

var mongoose = require('mongoose');

var _require2 = require('crypto'),
    randomBytes = _require2.randomBytes;

var Schema = mongoose.Schema;

var sessionSchema = new Schema({
  sid: String,
  maxAage: Number,
  session: String
});

var SessonStore = function () {
  function SessonStore() {
    _classCallCheck(this, SessonStore);

    this.__timer = new Map();
    this.sessionModel = mongoose.model('session', sessionSchema);
  }

  _createClass(SessonStore, [{
    key: 'getID',
    value: function getID(length) {
      return randomBytes(length).toString('hex');
    }
  }, {
    key: 'get',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sid, ctx) {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sessionModel.findOne({ sid: 'SESSION:' + sid });

              case 2:
                data = _context.sent;

                if (!(data && data.session)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', JSON.parse(data.session));

              case 5:
                return _context.abrupt('return', null);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'set',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(session) {
        var _this = this;

        var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref3$sid = _ref3.sid,
            sid = _ref3$sid === undefined ? this.getID(24) : _ref3$sid,
            _ref3$maxAge = _ref3.maxAge,
            maxAge = _ref3$maxAge === undefined ? 1000000 : _ref3$maxAge;

        var ctx = arguments[2];

        var data, update, __timeout;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                data = this.sessionModel.findOne({ sid: 'SESSION:' + sid });
                update = true;
                _context2.next = 5;
                return this.sessionModel.update({ sid: 'SESSION:' + sid }, { sid: 'SESSION:' + sid, session: JSON.stringify(session), maxAge: maxAge }, { multi: true, upsert: true });

              case 5:
                data = _context2.sent;


                if (data) {
                  if (this.__timer.has(sid)) {
                    __timeout = this.__timer.get(sid);

                    if (__timeout) clearTimeout(__timeout);
                  }

                  if (maxAge) {
                    this.__timer.set(sid, setTimeout(function () {
                      return _this.destroy(sid);
                    }, maxAge));
                  }
                }
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](0);

                console.log('session set error' + JSON.stringify(_context2.t0));

              case 12:
                return _context2.abrupt('return', sid);

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 9]]);
      }));

      function set(_x3) {
        return _ref2.apply(this, arguments);
      }

      return set;
    }()
  }, {
    key: 'destroy',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(sid, ctx) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.__timer.delete(sid);
                _context3.next = 3;
                return this.sessionModel.deleteOne({ sid: 'SESSION:' + sid });

              case 3:
                return _context3.abrupt('return', _context3.sent);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function destroy(_x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return destroy;
    }()
  }]);

  return SessonStore;
}();

module.exports = SessonStore;
//# sourceMappingURL=session-store.js.map