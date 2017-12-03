var account = require('./account')
var user = require('./user')
var shop = require('./shop')
var customer = require('./customer')
var sales = require('./sales')

module.exports = {
  accountModel:account,
  ...user, ...shop, ...customer, ...sales
};