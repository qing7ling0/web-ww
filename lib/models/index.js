'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var account = require('./account');
var user = require('./user');
var shop = require('./shop');
var customer = require('./customer');
var sales = require('./sales');

module.exports = _extends({
  accountModel: account
}, user, shop, customer, sales);
//# sourceMappingURL=index.js.map