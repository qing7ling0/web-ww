const {Menus, Routers} = require('../constants/config')
import { 
  commonModel
} from '../models/index.js'

import DB from '../db/DB'
import { ApiError, ApiErrorNames } from '../error/api-errors'

class CommonData {

  async getMenus() {
    return Menus;
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
    return DB.getList(commonModel, options, page);
  }
  async addCommon(doc, options={}) {
    let NIDUnique = await this.checkNIDUnique(doc.NID, doc.type);
    if (!NIDUnique) {
      throw new ApiError(ApiErrorNames.ADD_FAIL, '编号已存在!');
    }

    return DB.add(commonModel, doc, options);
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
    return DB.update(commonModel, conditions, doc, options);
  }
  async removeCommon(conditions) {
    // return DB.remove(commonModel, conditions);
    return DB.update(commonModel, conditions, {hide:true}, options);
  }
  async removeByIdsCommon(model, ids) {
    return DB.update(commonModel, {_id:{$in:ids}}, {hide:true}, options);
    // return DB.removeByIds(commonModel, ids);
  }
  async findByIdCommon(id, onQuery) {
    return DB.findById(commonModel, id, onQuery);
  }

  createCurrentOrderIndex() {
    let _time = new Date().getTime() / 1000;
    if (!CommonData.currentOrderTime) {
      CommonData.currentOrderTime = _time;
      CommonData.currentOrderIndex = 1001;
    } else {
      if (_time !== CommonData.currentOrderTime) {
        CommonData.currentOrderTime = _time;
        CommonData.currentOrderIndex = 1001;
      } else {
        if (!CommonData.currentOrderIndex) CommonData.currentOrderIndex = 1001;
      }
    }
    return CommonData.currentOrderIndex++;
  }
}

module.exports = new CommonData();