'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queries = require('./queries');

var queries = _interopRequireWildcard(_queries);

var _mutations = require('./mutations');

var _mutations2 = _interopRequireDefault(_mutations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = { queries: queries, mutations: _mutations2.default };
//# sourceMappingURL=index.js.map