const {Menus, Routers} = require('../constants/config')
import { 
  commonModel
} from '../models/index.js'

import DB from '../db/DB'
import { ApiError, ApiErrorNames } from '../error/api-errors'
import Menu from 'antd/lib/menu';
import * as commonUtils from '../utils/common-utils'

class CommonData {

  async getMenus(user) {
    if (!user) return [];
    let menuList = [];
    Menus.forEach((item) => {
      if (item.subMenus) {
        let subList = [];
        item.subMenus.forEach(sub=>{
          let power = commonUtils.getPower(user, sub.id);
          if (power.view) {
            subList.push(sub);
          }
        })
        if (subList.length > 0) {
          let menu = {...item};
          menu.subMenus = subList;
          menuList.push(menu);
        }
      }
    })
    return menuList;
  }

  async getRouters() {
    return Routers;
  }

  // 检查NID是否唯一（NID === 0 不用检测）
  async checkNIDUnique(NID, type) {
    if (NID === null || NID === undefined || type === null || type === undefined) return false;

    // 为0不用检查
    if (NID == 0) return true;
  
    let data = await commonModel.findOne({ NID: NID, type:type } );
    if (data) {
      return false;
    }
  
    return true;
  }

  async getCommonList(type, options={}, page) {
    if (type){
      if (!options) {
        options = {conditions:{}};
      } else if(!options.conditions) {
        options.conditions = {};
      }
      options.conditions.type = type;
    }
    return await DB.getList(commonModel, options, page);
  }
  async addCommon(doc, options={}) {
    let NIDUnique = await this.checkNIDUnique(doc.NID, doc.type);
    if (!NIDUnique) {
      throw new ApiError(ApiErrorNames.ADD_FAIL, '编号已存在!');
    }

    return await DB.add(commonModel, doc, options);
  }
  async updateCommon(conditions, doc, options) {
    if (doc && doc.NID) {
      let data = await commonModel.findOne(conditions);
      if (!data) {
        throw new ApiError(ApiErrorNames.UPDATE_FAIL);
      }
      let NIDUnique = await this.checkNIDUnique(doc.NID, data.type);
      if (!NIDUnique) {
        throw new ApiError(ApiErrorNames.ADD_FAIL, '编号已使用!');
      }
    }
    console.log(JSON.stringify(doc));
    return await DB.update(commonModel, conditions, doc, options);
  }
  async removeCommon(conditions) {
    // return DB.remove(commonModel, conditions);
    return await DB.update(commonModel, conditions, {hide:true});
  }
  async removeByIdsCommon(ids) {
    return await DB.update(commonModel, {_id:{$in:ids}}, {hide:true});
    // return DB.removeByIds(commonModel, ids);
  }
  async findByIdCommon(id, onQuery) {
    return DB.findById(commonModel, id, onQuery);
  }

  createCurrentOrderIndex() {
    let _time = Math.floor(new Date().getTime() / 1000);
    // console.log('createCurrentOrderIndex' + _time)
    if (!CommonData.currentOrderTime) {
      CommonData.currentOrderTime = _time;
      CommonData.currentOrderIndex = 101;
    } else {
      if (_time !== CommonData.currentOrderTime) {
        CommonData.currentOrderTime = _time;
        CommonData.currentOrderIndex = 101;
      } else {
        if (!CommonData.currentOrderIndex) CommonData.currentOrderIndex = 101;
      }
    }
    return CommonData.currentOrderIndex++;
  }
}
CommonData.currentOrderTime = 0;
CommonData.currentOrderIndex = 101;
module.exports = new CommonData();