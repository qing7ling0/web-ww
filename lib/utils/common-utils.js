'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlString2Conditions = exports.getTransportCompany = exports.getPayType = exports.getOrderSource = exports.getMaintainPriceType = exports.getColorType = exports.getGoodsProperty = exports.getCustomerType = exports.getShopPro = exports.getMarketLevel = undefined;

var _constants = require('../constants/constants');

var _constants2 = _interopRequireDefault(_constants);

var _transport = require('../constants/transport');

var _transport2 = _interopRequireDefault(_transport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMarketLevel = exports.getMarketLevel = function getMarketLevel(id) {
  for (var i = 0; i < _constants2.default.MARKET_LEVEL.length; i++) {
    if (_constants2.default.MARKET_LEVEL[i].value === id) return _constants2.default.MARKET_LEVEL[i];
  }

  return null;
};

var getShopPro = exports.getShopPro = function getShopPro(id) {
  for (var i = 0; i < _constants2.default.SHOP_PRO.length; i++) {
    if (_constants2.default.SHOP_PRO[i].value === id) return _constants2.default.SHOP_PRO[i];
  }

  return null;
};

var getCustomerType = exports.getCustomerType = function getCustomerType(id) {
  for (var i = 0; i < _constants2.default.CUSTOMER_TYPE.length; i++) {
    if (_constants2.default.CUSTOMER_TYPE[i].value === id) return _constants2.default.CUSTOMER_TYPE[i];
  }

  return null;
};
var getGoodsProperty = exports.getGoodsProperty = function getGoodsProperty(id) {
  for (var i = 0; i < _constants2.default.GOODS_PROPERTY.length; i++) {
    if (_constants2.default.GOODS_PROPERTY[i].value === id) return _constants2.default.GOODS_PROPERTY[i];
  }

  return null;
};
var getColorType = exports.getColorType = function getColorType(id) {
  for (var i = 0; i < _constants2.default.COLOR_TYPE.length; i++) {
    if (_constants2.default.COLOR_TYPE[i].value === id) return _constants2.default.COLOR_TYPE[i];
  }

  return null;
};
var getMaintainPriceType = exports.getMaintainPriceType = function getMaintainPriceType(id) {
  for (var i = 0; i < _constants2.default.MAINTAIN_PRICE_TYPE.length; i++) {
    if (_constants2.default.MAINTAIN_PRICE_TYPE[i].value === id) return _constants2.default.MAINTAIN_PRICE_TYPE[i];
  }

  return null;
};
var getOrderSource = exports.getOrderSource = function getOrderSource(id) {
  for (var i = 0; i < _constants2.default.ORDER_SOURCE.length; i++) {
    if (_constants2.default.ORDER_SOURCE[i].value === id) return _constants2.default.ORDER_SOURCE[i];
  }

  return null;
};
var getPayType = exports.getPayType = function getPayType(id) {
  for (var i = 0; i < _constants2.default.PAY_TYPE.length; i++) {
    if (_constants2.default.PAY_TYPE[i].value === id) return _constants2.default.PAY_TYPE[i];
  }

  return null;
};
var getTransportCompany = exports.getTransportCompany = function getTransportCompany(id) {
  for (var i = 0; i < _transport2.default.companys.length; i++) {
    if (_transport2.default.companys[i].value === id) return _transport2.default.companys[i];
  }

  return null;
};

var urlString2Conditions = exports.urlString2Conditions = function urlString2Conditions(value) {
  if (!value) return '';
  var ret = JSON.parse(decodeURIComponent(value));
  for (var key in ret) {
    for (var subKey in ret[key]) {
      if (subKey === '$regex') {
        var v = ret[key][subKey];
        v = v.replace(/\/\//g, "\/");
        ret[key][subKey] = eval(v); //转成正则
      }
    }
  }

  return ret;
};
//# sourceMappingURL=common-utils.js.map