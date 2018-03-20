const {
  testAddOrder
} = require('./data/sales')
const shop = require('./data/shop')
const commonData = require('./data/common-data')

var add = false;

var test = async function(ctx) {
  // if (add) return;
  try {
    // await commonData(ctx);
    // await shop(ctx);
    
    console.log('-----------test BEGAN-----------')
    await testAddOrder(ctx);
    console.log('-----------test END-----------')
  } catch(error) {
    console.log('----test error ' + error.message + 'stack=' + error.stack);
    console.log('-----------test END-----------')
  }
  add = true;
}

module.exports = test;