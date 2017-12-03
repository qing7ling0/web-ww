
import constants from '../constants/constants'
import transportCompanys from '../constants/transport'

export const getMarketLevel = function(id) {
  for(let i=0; i<constants.MARKET_LEVEL.length; i++) {
    if (constants.MARKET_LEVEL[i].value === id) return constants.MARKET_LEVEL[i];
  }

  return null;
}

export const getShopPro = function(id) {
  for(let i=0; i<constants.SHOP_PRO.length; i++) {
    if (constants.SHOP_PRO[i].value === id) return constants.SHOP_PRO[i];
  }

  return null;
}

export const getCustomerType = function(id) {
  for(let i=0; i<constants.CUSTOMER_TYPE.length; i++) {
    if (constants.CUSTOMER_TYPE[i].value === id) return constants.CUSTOMER_TYPE[i];
  }

  return null;
}
export const getGoodsProperty = function(id) {
  for(let i=0; i<constants.GOODS_PROPERTY.length; i++) {
    if (constants.GOODS_PROPERTY[i].value === id) return constants.GOODS_PROPERTY[i];
  }

  return null;
}
export const getColorType = function(id) {
  for(let i=0; i<constants.COLOR_TYPE.length; i++) {
    if (constants.COLOR_TYPE[i].value === id) return constants.COLOR_TYPE[i];
  }

  return null;
}
export const getMaintainPriceType = function(id) {
  for(let i=0; i<constants.MAINTAIN_PRICE_TYPE.length; i++) {
    if (constants.MAINTAIN_PRICE_TYPE[i].value === id) return constants.MAINTAIN_PRICE_TYPE[i];
  }

  return null;
}
export const getOrderSource = function(id) {
  for(let i=0; i<constants.ORDER_SOURCE.length; i++) {
    if (constants.ORDER_SOURCE[i].value === id) return constants.ORDER_SOURCE[i];
  }

  return null;
}
export const getPayType = function(id) {
  for(let i=0; i<constants.PAY_TYPE.length; i++) {
    if (constants.PAY_TYPE[i].value === id) return constants.PAY_TYPE[i];
  }

  return null;
}
export const getTransportCompany = function(id) {
  for(let i=0; i<transportCompanys.companys.length; i++) {
    if (transportCompanys.companys[i].value === id) return transportCompanys.companys[i];
  }

  return null;
}

export const urlString2Conditions = function(value) {
  if (!value) return '';
  let ret = JSON.parse(decodeURIComponent(value));
  for(let key in ret) {
    for(let subKey in ret[key]) {
      if (subKey === '$regex') {
        let v = ret[key][subKey];
        v = v.replace(/\/\//g,"\/");
        ret[key][subKey] = eval(v);//转成正则
      }
    }
  }

  return ret;
}
