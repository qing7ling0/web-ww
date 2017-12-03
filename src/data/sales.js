import moment from 'moment'

import { 
  userModel, 
  userShopGuideModel, 
  userOperateModel, 
  userProductionModel,
  userAdminModel,
  accountModel,
  materialModel,
  colorModel,
  goodsTypeModel,
  goodsSeasonModel,
  goodsStyleModel,
  xuanHaoModel,
  goodsShoesModel
} from '../models/index.js'

import { ApiError, ApiErrorNames } from '../error/api-errors'
import utils from '../utils/utils'
import baseUtils from '../base/utils/utils'
import constants from '../constants/constants'
import DB from '../db/DB'
// import 

const logUtil = require('../utils/log-utils');

class SalesData {

  goodsShoesPopulate(query) {
    return query
      .populate('type').populate('season').populate('style')
      .populate('out_color').populate('in_color')
      .populate('bottom_color').populate('bottom_side_color').exec();
  }

  async getGoodsShoesList(page, options) {
    const list = await DB.getList(goodsShoesModel, options, page, (query)=>{
      return this.goodsShoesPopulate(query);
    });
    return list;
  }

  async getGoodsShoesProfile(id) {
    const profile = await DB.findById(goodsShoesModel, id, (query)=>{
      return this.goodsShoesPopulate(query);
    });
    return profile;
  }
}

module.exports = new SalesData()