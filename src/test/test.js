const {
  testAddOrder
} = require('./data/sales')

var test = function() {
  try {
    console.log('-----------test BEGAN-----------')
    testAddOrder();
    console.log('-----------test END-----------')
  } catch(error) {
    console.log('----test error ' + error.message + 'stack=' + error.stack);
    console.log('-----------test END-----------')
  }
}

module.exports = test;