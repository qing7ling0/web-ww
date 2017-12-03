'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queries = require('./queries');

var queries = _interopRequireWildcard(_queries);

var _mutations = require('./mutations');

var mutations = _interopRequireWildcard(_mutations);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = { queries: queries, mutations: mutations };
//# sourceMappingURL=index.js.map