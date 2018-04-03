'use strict'
import netUtils from '../../base/utils/NetUtils'
import * as config from '../constants/Config'
import * as constants from '../constants/Constants'
import * as types from './graphqlTypes'
import utils from '../../base/utils/utils'


const object2String = (object) => {
  if (object === undefined || object === null) return '""';
  
  let ret = '';
  if (utils.IsObject(object)) {
    let str = '';
    for(let key in object) {
      if (object[key] !== undefined && object[key] !== null) {
        str = str + (str.length>0?',':'') +  key + ':' + object2String(object[key]);
      } 
    }
    ret = ret + '{' + str + '}';
  } else if (utils.IsArray(object)) {
    let str = '';
    for(let value of object) {
      str = str + (str.length>0?',':'') + object2String(value);
    }
    ret = ret + '[' + str + ']';
  } else if (utils.IsBoolean(object) || utils.IsNumber(object)) {
    ret = ret + object;
  } else if (utils.IsString(object)) {
    ret = ret + JSON.stringify(object);
  }

  return ret;
}

class NetHandler {
  constructor() {

  }

  static reqUserList() {

  }

  static getNetError(code, message) {
    return new Promise(function(resolve, reject) {
      resolve({code:code, message:message});
     });
  }

  static reqLogin(account, password, check) {
    const graphqlValue =  `
      mutation Login {
        login(account:"${account}",password:"${password}",check:${check?true:false})${types.userType}
        
        menus {
          id,name,subMenus{id,name}
        }
        routers {
          id, name, url
        }
      }
    `;
    return netUtils.graphqlJson(config.GetServerAddress() + '/login', graphqlValue)
  }

  static reqLogout() {
    const graphqlValue =  `
      mutation Mutation {
        logout {
          success
        }
      }
    `;
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', graphqlValue)
  }

  static getUserList(type, pageIndex, pageSize=constants.DEFAULT_PAGE_SIZE) {
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', `
      query Query {
        userList(user_type:${type}, page:${pageIndex}, pageSize:${pageSize})${types.pageListType(types.userType)}
      }
    `);
  }

  static addUser(type, user, accountInfo) {
    let mut = `
      mutation Mutation {
        addUser(user_type:${type}, user:${object2String(user)}, account:${object2String(accountInfo)})${types.userType}
      }
    `
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }

  static deleteUser(type, ids) {
    let mut = `
      mutation Mutation {
        deleteUser(user_type:${type}, ids:${object2String(ids)}) 
      }
    `    
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }

  static updateUser(type, data) {
    let mut = `
      mutation Mutation {
        updateUser(user_type:${type}, fields:${object2String(data)}) ${types.userType}
      }
    `    
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }
  
  static getShopList(pageIndex, pageSize=constants.DEFAULT_PAGE_SIZE, keyword) {
    let conditions = '';
    if (keyword) {
      let con = `{"name":{"$regex":"/${keyword}/i"}}`
      conditions = `, conditions: "${encodeURIComponent(con)}"`
    }
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', `
      query Query {
        shopList(page:${pageIndex}, pageSize:${pageSize} ${conditions})${types.pageListType(types.shopType)}
      }
    `);
  }

  static addShop(data) {
    let mut = `
      mutation Mutation {
        addShop(doc:${object2String(data)})${types.shopType}
      }
    `
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }

  static deleteShop(ids) {
    let mut = `
      mutation Mutation {
        deleteShop(ids:${object2String(ids)}) 
      }
    `    
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }

  static updateShop(data) {
    let mut = `
      mutation Mutation {
        updateShop(doc:${object2String(data)}) ${types.resultType}
      }
    `    
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }

  static getShopGuideList(pageIndex, pageSize=constants.DEFAULT_PAGE_SIZE, conditions) {
    let _conditions = '';
    if (conditions) {
      _conditions = `, conditions: "${encodeURIComponent(object2String(conditions))}"`
    }
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', `
      query Query {
        shopGuideList(page:${pageIndex}, pageSize:${pageSize} ${_conditions})${types.pageListType(types.userType)}
      }
    `);
  }

  static addShopGuide(data, accountInfo) {
    let mut = `
      mutation Mutation {
        addShopGuide(user:${object2String(data)}, account:${object2String(accountInfo)})${types.userType}
      }
    `
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }

  static deleteShopGuide(ids) {
    let mut = `
      mutation Mutation {
        deleteShopGuide(ids:${object2String(ids)}) 
      }
    `    
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }

  static updateShopGuide(data) {
    let mut = `
      mutation Mutation {
        updateShopGuide(fields:${object2String(data)}) ${types.userType}
      }
    `    
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }

  static getCustomerList(pageIndex, pageSize=constants.DEFAULT_PAGE_SIZE, conditions) {
    let _conditions = '';
    if (conditions) {
      _conditions = `, conditions: "${encodeURIComponent(conditions)}"`
    }
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', `
      query Query {
        customerList(page:${pageIndex}, pageSize:${pageSize} ${_conditions})${types.pageListType(types.customerType)}
      }
    `);
  }
  static addCustomer(data) {
    let mut = `
      mutation Mutation {
        addCustomer(doc:${object2String(data)})${types.customerType}
      }
    `
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }
  static deleteCustomer(ids) {
    let mut = `
      mutation Mutation {
        deleteCustomer(ids:${object2String(ids)}) 
      }
    `    
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }
  static updateCustomer(data) {
    let mut = `
      mutation Mutation {
        updateCustomer(doc:${object2String(data)}) ${types.resultType}
      }
    `    
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }

  static getLastCustomerOrderInfo(id, orderType, tag, graphqlType) {
    let conditions ={};
    conditions.type = orderType;
    let options = {sort:{create_time:"desc"}}
    let query = `
      query Query {
        ${tag}:customerOrderInfo(id:"${id}", conditions:"${encodeURIComponent(JSON.stringify(conditions))}", options:"${encodeURIComponent(JSON.stringify(options))}")${graphqlType}
      }
    `;
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', query);
  }

  static getGoodsByNID(tag, type, nid) {
    let query = `
      query Query {
        ${tag}(nid:"${nid}")${type}
      }
    `;
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', query);
  }

  static getGoodsShoesList(pageIndex, pageSize=constants.DEFAULT_PAGE_SIZE, conditions) {
    let _conditions = '';
    if (conditions) {
      _conditions = `, conditions: "${encodeURIComponent(conditions)}"`
    }
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', `
      query Query {
        goodsShoesList(page:${pageIndex}, pageSize:${pageSize} ${_conditions})${types.pageListType(types.goodsShoesType)}
      }
    `);
  }
  static addGoodsShoes(data) {
    let mut = `
      mutation Mutation {
        goodsShoesAdd (doc:${object2String(data)})${types.goodsShoesType}
      }
    `
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }
  static deleteGoodsShoes(ids) {
    let mut = `
      mutation Mutation {
        goodsShoesRemove (ids:${object2String(ids)})
      }
    `    
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }
  static updateGoodsShoes(data) {
    let mut = `
      mutation Mutation {
        goodsShoesUpdate (doc:${object2String(data)}) ${types.resultType}
      }
    `    
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }

  static cancelSuborder(id) {
    let mut = `
      mutation Mutation {
        suborderCancel (id:"${id}") ${types.resultType}
      }
    `    
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }

  static getGoodsBaseDatas() {
    let pageIndex = -1;
    let pageSize = 0;
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', `
      query Query {
        goodsStyleList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.GOODS_STYLE}))}")${types.pageListType(types.salesBaseType)}
        goodsSeasonList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.GOODS_SEASON}))}")${types.pageListType(types.salesBaseType)}
        goodsTypeList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.GOODS_TYPE}))}")${types.pageListType(types.salesBaseType)}
        outColorList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_OUT_COLOR}))}")${types.pageListType(types.colorType)}
        inColorList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_IN_COLOR}))}")${types.pageListType(types.colorType)}
        bottomColorList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_BOTTOM_COLOR}))}")${types.pageListType(types.colorType)}
        bottomSideColorList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_BOTTOM_SIDE_COLOR}))}")${types.pageListType(types.colorType)}
        materialColorList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.MATERIAL_COLOR}))}")${types.pageListType(types.colorType)}
        customList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.CUSTOM}))}")${types.pageListType(types.customType)}
        urgentList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.URGENT}))}")${types.pageListType(types.urgentType)}
        maintainList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.MAINTION}))}")${types.pageListType(types.maintainType)}
        xuanHaoList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.XUAN_HAO}))}")${types.pageListType(types.xuanHaoType)}
        guiGeList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_GUI_GE}))}")${types.pageListType(types.guiGeType)}
        genGaoList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_GEN_GAO}))}")${types.pageListType(types.genGaoType)}
        shoesTieBianList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_TIE_BIAN}))}")${types.pageListType(types.shoesTieBianType)}
        watchStrapStyleList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.WATCH_STRAP_STYLE}))}")${types.pageListType(types.watchStrapStyleType)}
        materialList(page:${pageIndex}, pageSize:${pageSize})${types.pageListType(types.materialType)}
        colorPaletteList(page:${pageIndex}, pageSize:${pageSize})${types.pageListType(types.colorPaletteType)}
        rechargeList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.RECHARGE_REWARD}))}")${types.pageListType(types.rechargeType)}
        vipLevelList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.VIP}))}")${types.pageListType(types.vipLevelType)}
        customerTagList:commonList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify({type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.CUSTOMER_TAG}))}")${types.pageListType(types.salesBaseType)}
      }
  `);
  }

  // static getLast3MonthWork()

  static getDefaultList(tag, type, conditions, pageIndex=-1, pageSize=constants.DEFAULT_PAGE_SIZE) {
    
    let _conditions = '';
    if (!utils.ObjectIsEmpty(conditions)) {
      _conditions = `, conditions: "${encodeURIComponent(JSON.stringify(conditions))}"`
    }

    if (pageIndex === undefined || pageIndex === null) {
      pageIndex = -1;
      pageSize = 0;
    } 
    
    let query = `
      query Query {
        ${tag}(page:${pageIndex}, pageSize:${pageSize} ${_conditions})${types.pageListType(type)}
      }
    `;
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', query);
  }
  
  static getDefaultProfile(tag, type, id) {
    let query = `
      query Query {
        ${tag}(id:"${id}")${type}
      }
    `;
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', query);
  }
  
  static addDefault(tag, type, data) {
    let name = tag;
    let index = tag.lastIndexOf('List');
    if (index !== -1) {
      name = tag.substring(0, index);
    }
    console.log(JSON.stringify(data));
    let mut = `
      mutation Mutation {
        ${name}Add(doc:${object2String(data)})${type}
      }
    `
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }

  static deleteDefault(tag, ids) {
    let name = tag;
    let index = tag.lastIndexOf('List');
    if (index !== -1) {
      name = tag.substring(0, index);
    }
    let mut = `
      mutation Mutation {
        ${name}Remove(ids:${object2String(ids)})
      }
    `    
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }

  static updateDefault(tag, id, data) {
    let name = tag;
    let index = tag.lastIndexOf('List');
    if (index !== -1) {
      name = tag.substring(0, index);
    }
    
    let mut = `
      mutation Mutation {
        ${name}Update(doc:${object2String(data)}, id:"${id}") ${types.resultType}
      }
    `    
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }
}

export default NetHandler;