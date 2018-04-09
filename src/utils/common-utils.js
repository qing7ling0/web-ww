
import constants from '../constants/constants'
import config from '../constants/config'
import transportCompanys from '../constants/transport'
import BaseUtils from '../base/utils/utils'

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
export const getOrderType = function(id) {
  for(let i=0; i<constants.ORDER_TYPE.length; i++) {
    if (constants.ORDER_TYPE[i].value === id) return constants.ORDER_TYPE[i];
  }

  return null;
}
export const getPayType = function(id) {
}
export const getSex = function(id) {
  for(let i=0; i<constants.SEX_DATA.length; i++) {
    if (constants.SEX_DATA[i].value === id) return constants.SEX_DATA[i];
  }

  return null;
}

export const getOrderStatus = function(id) {
  for(let i=0; i<constants.ORDER_STATUS_LIST.length; i++) {
    if (constants.ORDER_STATUS_LIST[i].value === id) return constants.ORDER_STATUS_LIST[i];
  }

  return null;
}
export const getTransportCompany = function(id) {
  for(let i=0; i<transportCompanys.companys.length; i++) {
    if (transportCompanys.companys[i].value === id) return transportCompanys.companys[i];
  }

  return null;
}

const conditionsRegexConver = function(object) {
  if (!object) return object;

  for(let key in object) {
    if (key === '$regex') {
      let v = object[key];
      v = v.replace(/\/\//g,"\/");
      object[key] = eval(v);//转成正则
    } else if (BaseUtils.IsObject(object[key]) || BaseUtils.IsArray(object[key])) {
      object[key] = conditionsRegexConver(object[key]);
    }
  }
  return object;
}

export const urlString2Conditions = function(value) {
  if (!value) return '';
  let ret = JSON.parse(decodeURIComponent(value));
  if (ret) {
    ret = conditionsRegexConver(ret);
  }
  return ret;
}

export const createGoodsNID = function(type, data, sex) {
  let NID = '';
  let sexData = getSex(sex);
  if (!sexData) return constants.NULL_NID;
  NID = sexData.etc;
  let order = getOrderType(type);
  if(!order) return constants.NULL_NID;
  NID += order.etc;

  switch(type) {
    case constants.GOODS_SHOES:
      for(let key of constants.GOODS_SHOES_NID_FIELDS) {
        if (key === 's_gen_gao') {
          if (sex !== constants.SEX_FEMALE) continue;
        }
        if (data[key] && data[key].NID) {
          NID += data[key].NID;
        } else {
          console.log('createGoodsNID shoes fail key=' + key);
          return constants.NULL_NID;
        }
      }

      return NID;
    case constants.GOODS_BELT:
      for(let key of constants.GOODS_BLET_NID_FIELDS) {
        if (data[key] && data[key].NID) {
          NID += data[key].NID;
        } else {
          return constants.NULL_NID;
        }
      }
      return NID;
    case constants.GOODS_WATCH_STRAP:
      for(let key of constants.GOODS_WATCH_STRAP_NID_FIELDS) {
        if (data[key] && data[key].NID) {
          NID += data[key].NID;
        } else {
          return constants.NULL_NID;
        }
      }
      return NID;

    case constants.GOODS_ORNAMENT:
      
    return NID;
  }
}

const _getPowerByType = function(powerId, powerType) {
  for(let powerInfo of config.Powers) {
    if (powerInfo.id == powerId) {
      for(let power of powerInfo.powers) {
        if (power.id == powerType) {
          let ret = {...power.power};
          ret.canOperate = ret.add || ret.edit;
          return ret;
        }
      }
    }
  }

  return {};
}

export const getPowerByType = _getPowerByType;

export const getPower= function(user, powerId) {
  if (!user) return {};
  let powerType = 0;
  switch(user.user_type) {
    case constants.USER_TYPES.shopGuide:
      powerType = user.manager ? constants.POWER_TYPES.SHOP_MANAGER : constants.POWER_TYPES.SHOP_GUIDE;
      return getPowerByType(powerId, powerType);
    case constants.USER_TYPES.operate:
      if (user.department === constants.E_DEPARTMENT_TYPES.shop) {
        return getPowerByType(powerId, constants.POWER_TYPES.MANAGER_SENIOR);
      }
      return getPowerByType(powerId, constants.POWER_TYPES.MANAGER_NORMAL);
    case constants.USER_TYPES.production:
      powerType = constants.POWER_TYPES.FACTORY_PRODUCTION;
      return getPowerByType(powerId, powerType);
    case constants.USER_TYPES.admin:
      return {view:true, add:true, edit:true, del:true, canOperate:true}
    default:
    break;
  }

  return {};
}

export const getValueByList= function(list, id) {
  if (!list) return null;
  for(let i=0; i<list.length; i++) {
    if (list[i].value === id) return list[i];
  }

  return null;
}