const user = require('./user')
const commonData = require('./common-data')
const shop = require('./shop')
const customer = require('./customer')
const sales = require('./sales')

module.exports = {
  userData: user,
  commonData: commonData,
  shopData: shop,
  customerData: customer,
  salesData: sales,
}