const {Menus, Routers} = require('../constants/config')
import { 
  commonModel
} from '../models/index.js'

import DB from '../db/DB'

class CommonData {

  async getMenus() {
    return Menus;
  }

  async getRouters() {
    return Routers;
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
    return DB.add(commonModel, doc, options);
  }
  async updateCommon(conditions, doc, options) {
    return DB.update(commonModel, conditions, doc, options);
  }
  async removeCommon(conditions) {
    return DB.remove(commonModel, conditions);
  }
  async removeByIdsCommon(model, ids) {
    return DB.removeByIds(commonModel, ids);
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