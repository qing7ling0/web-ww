var account = require('./account')
var user = require('./user')
var shop = require('./shop')
var customer = require('./customer')
var sales = require('./sales')
var common = require('./common')
var file = require('./file')

module.exports = {
  accountModel:account,
  ...user, ...shop, ...customer, ...sales, ...common, ...file
};