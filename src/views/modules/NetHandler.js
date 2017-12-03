'use strict'
import netUtils from '../../base/utils/NetUtils'
import * as config from '../constants/Config'
import * as constants from '../constants/Constants'
import * as types from './graphqlTypes'
import utils from '../../base/utils/Utils'


const object2String = (object) => {
  if (!object) return '';
  
  let ret = '';
  if (utils.IsObject(object)) {
    let str = '';
    for(let key in object) {
      if (object[key] !== undefined) {
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

  static reqLogin(account, password) {
    const graphqlValue =  `
      mutation Mutation {
        login(account:"${account}",password:"${password}")${types.userType}
        
        menus {
          id,name,subMenus{id,name}
        }
        routers {
          id, name, url
        }
      }
    `;
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', graphqlValue)
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

  static getAdminList(pageIndex, pageSize=constants.DEFAULT_PAGE_SIZE) {
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', `
      query Query {
        adminList(page:${pageIndex}, pageSize:${pageSize})${types.pageListType(types.userType)}
      }
    `);
  }

  static addAdmin(user, accountInfo) {
    let mut = `
      mutation Mutation {
        addAdmin(user:${object2String(user)}, account:${object2String(accountInfo)})${types.userType}
      }
    `
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }

  static deleteAdmin(ids) {
    let mut = `
      mutation Mutation {
        deleteAdmin(ids:${object2String(ids)}) 
      }
    `    
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', mut);
  }

  static updateAdmin(data) {
    let mut = `
      mutation Mutation {
        updateAdmin(fields:${object2String(data)}) ${types.userType}
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

  static  getGoodsShoesList(pageIndex, pageSize=constants.DEFAULT_PAGE_SIZE, conditions) {
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

  static getGoodsBaseDatas() {
    let outColor = {type:constants.BASE_CONSTANTS.COLOR_TYPE_OUT};
    let inColor = {type:constants.BASE_CONSTANTS.COLOR_TYPE_IN};
    let bottomColor = {type:constants.BASE_CONSTANTS.COLOR_TYPE_BOTTOM};
    let bottomSideColor = {type:constants.BASE_CONSTANTS.COLOR_TYPE_BOTTOM_SIDE};
    let materialColor = {type:constants.BASE_CONSTANTS.COLOR_TYPE_MATERIAL};
    // let outColor = `conditions: "${encodeURIComponent(object2String({}))}"`
    let pageIndex = -1;
    let pageSize = 0;
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', `
      query Query {
        goodsStyleList(page:${pageIndex}, pageSize:${pageSize})${types.pageListType(types.salesBaseType)}
        goodsSeasonList(page:${pageIndex}, pageSize:${pageSize})${types.pageListType(types.salesBaseType)}
        goodsTypeList(page:${pageIndex}, pageSize:${pageSize})${types.pageListType(types.salesBaseType)}
        outColorList:colorList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify(outColor))}")${types.pageListType(types.salesBaseType)}
        inColorList:colorList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify(inColor))}")${types.pageListType(types.salesBaseType)}
        bottomColorList:colorList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify(bottomColor))}")${types.pageListType(types.salesBaseType)}
        bottomSideColorList:colorList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify(bottomSideColor))}")${types.pageListType(types.salesBaseType)}
        materialColorList:colorList(page:${pageIndex}, pageSize:${pageSize}, conditions: "${encodeURIComponent(JSON.stringify(materialColor))}")${types.pageListType(types.salesBaseType)}
      }
  `);
  }

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