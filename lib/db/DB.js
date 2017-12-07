'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _apiErrors = require('../error/api-errors');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var logUtils = require('../utils/log-utils');
var mongoose = require('mongoose');

var DB = function () {
    function DB() {
        _classCallCheck(this, DB);
    }

    _createClass(DB, null, [{
        key: 'connect',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return mongoose.connect('mongodb://localhost:27017/web-ww', {
                                    server: { poolSize: 4 },
                                    useMongoClient: true,
                                    promiseLibrary: require('bluebird')
                                });

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function connect() {
                return _ref.apply(this, arguments);
            }

            return connect;
        }()
    }, {
        key: 'collection',
        value: function collection(name) {
            // return db.get(name);
        }
    }, {
        key: 'test',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function test() {
                return _ref2.apply(this, arguments);
            }

            return test;
        }()
    }, {
        key: 'queryTest',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function queryTest() {
                return _ref3.apply(this, arguments);
            }

            return queryTest;
        }()
    }, {
        key: 'addPost',
        value: function addPost(schema, options) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop = function _loop() {
                    var op = _step.value;

                    schema.post(op.name, op.fn ? on.fn : function (doc) {
                        DB.post(op.name, doc);
                    });
                };

                for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'post',
        value: function post(name, doc) {
            logUtils.logUserModify(name, doc, Date.now);
        }
    }, {
        key: 'addPre',
        value: function addPre(schema, options) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                var _loop2 = function _loop2() {
                    var op = _step2.value;

                    schema.pre(op.name, op.fn ? on.fn : function (doc) {
                        DB.pre(op.name, doc);
                    });
                };

                for (var _iterator2 = options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    _loop2();
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'pre',
        value: function pre(name, doc) {
            logUtils.logUserModify(name, doc, Date.now);
            logUtils.logDebug(name, Date.now);
        }
    }, {
        key: 'getList',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(model, options, page, onQuery) {
                var findOptions, newPage, skip, limit, conditions, datas, query;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!model) {
                                    _context4.next = 23;
                                    break;
                                }

                                findOptions = options.options || {};
                                newPage = { page: -1, pageSize: 0, total: 0 };

                                if (page && page.pageSize > -1) {
                                    skip = 0;
                                    limit = page.page || 100;

                                    if (page.page) {
                                        skip = Math.max(page.page - 1, 0) * limit;
                                    }
                                    findOptions.limit = limit;
                                    findOptions.skip = skip;
                                    newPage.page = page.page;
                                    newPage.pageSize = limit;
                                }

                                conditions = options.conditions || {};

                                if (!(page && page.page > -1)) {
                                    _context4.next = 9;
                                    break;
                                }

                                _context4.next = 8;
                                return model.find(conditions).count();

                            case 8:
                                newPage.total = _context4.sent;

                            case 9:
                                datas = null;

                                if (!onQuery) {
                                    _context4.next = 17;
                                    break;
                                }

                                query = model.find(conditions, null, findOptions);
                                _context4.next = 14;
                                return onQuery(query);

                            case 14:
                                datas = _context4.sent;
                                _context4.next = 20;
                                break;

                            case 17:
                                _context4.next = 19;
                                return model.find(conditions, null, findOptions);

                            case 19:
                                datas = _context4.sent;

                            case 20:
                                return _context4.abrupt('return', { list: datas, page: newPage });

                            case 23:
                                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.GET_FAIL);

                            case 24:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getList(_x, _x2, _x3, _x4) {
                return _ref4.apply(this, arguments);
            }

            return getList;
        }()
    }, {
        key: 'add',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(model, doc) {
                var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                var data;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (!(doc && model)) {
                                    _context5.next = 11;
                                    break;
                                }

                                _context5.next = 3;
                                return new model(doc).save(options);

                            case 3:
                                data = _context5.sent;

                                if (!data) {
                                    _context5.next = 8;
                                    break;
                                }

                                return _context5.abrupt('return', data);

                            case 8:
                                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ADD_FAIL);

                            case 9:
                                _context5.next = 12;
                                break;

                            case 11:
                                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.ADD_FAIL);

                            case 12:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function add(_x5, _x6) {
                return _ref5.apply(this, arguments);
            }

            return add;
        }()
    }, {
        key: 'update',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(model, conditions, doc, options) {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (!(doc && conditions && model)) {
                                    _context6.next = 6;
                                    break;
                                }

                                _context6.next = 3;
                                return model.update(conditions, doc, options);

                            case 3:
                                return _context6.abrupt('return', _context6.sent);

                            case 6:
                                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.UPDATE_FAIL);

                            case 7:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function update(_x8, _x9, _x10, _x11) {
                return _ref6.apply(this, arguments);
            }

            return update;
        }()
    }, {
        key: 'remove',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(model, conditions) {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                if (!(conditions && model)) {
                                    _context7.next = 6;
                                    break;
                                }

                                _context7.next = 3;
                                return model.deleteMany(conditions);

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

            function remove(_x12, _x13) {
                return _ref7.apply(this, arguments);
            }

            return remove;
        }()
    }, {
        key: 'removeByIds',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(model, ids) {
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                if (!(ids && ids.length > 0 && model)) {
                                    _context8.next = 6;
                                    break;
                                }

                                _context8.next = 3;
                                return DB.remove(model, { _id: { $in: ids } });

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

            function removeByIds(_x14, _x15) {
                return _ref8.apply(this, arguments);
            }

            return removeByIds;
        }()
    }, {
        key: 'find',
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(model, conditions, onQuery) {
                var query;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                if (!(conditions && model)) {
                                    _context9.next = 13;
                                    break;
                                }

                                if (!onQuery) {
                                    _context9.next = 8;
                                    break;
                                }

                                query = model.find(conditions);
                                _context9.next = 5;
                                return onQuery(query);

                            case 5:
                                return _context9.abrupt('return', _context9.sent);

                            case 8:
                                _context9.next = 10;
                                return model.find(conditions);

                            case 10:
                                return _context9.abrupt('return', _context9.sent);

                            case 11:
                                _context9.next = 14;
                                break;

                            case 13:
                                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.DELETE_FAIL);

                            case 14:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function find(_x16, _x17, _x18) {
                return _ref9.apply(this, arguments);
            }

            return find;
        }()
    }, {
        key: 'findById',
        value: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(model, id, onQuery) {
                var query;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                if (!(id && model)) {
                                    _context10.next = 13;
                                    break;
                                }

                                if (!onQuery) {
                                    _context10.next = 8;
                                    break;
                                }

                                query = model.findById(id);
                                _context10.next = 5;
                                return onQuery(query);

                            case 5:
                                return _context10.abrupt('return', _context10.sent);

                            case 8:
                                _context10.next = 10;
                                return model.findById(id);

                            case 10:
                                return _context10.abrupt('return', _context10.sent);

                            case 11:
                                _context10.next = 14;
                                break;

                            case 13:
                                throw new _apiErrors.ApiError(_apiErrors.ApiErrorNames.GET_FAIL);

                            case 14:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function findById(_x19, _x20, _x21) {
                return _ref10.apply(this, arguments);
            }

            return findById;
        }()
    }]);

    return DB;
}();

DB.connect();
// var Cat = mongoose.model('Cat', { name: String });

module.exports = DB;
//# sourceMappingURL=DB.js.map