import moment from 'moment'

import { 
  userModel, 
  userShopGuideModel, 
  userOperateModel, 
  userProductionModel,
  userAdminModel,
  accountModel,
  shopModel,
  orderModel
} from '../models/index.js'

import { ApiError, ApiErrorNames } from '../error/api-errors'
import utils from '../utils/utils'
import baseUtils from '../base/utils/utils'
import constants from '../constants/constants'
// import 

const logUtil = require('../utils/log-utils');

class AnalyseData {

  /**
   * 获取店铺销售汇总
   * 
   * @param {any} page 
   * @param {any} options {conditions}
   * @memberof ShopData
   */
  async getAnalyseShopSalesList() {
    let list = [];



    return list;
  }

  async find(conditions, projection, options) {
    let shop = await shopModel.findOne(conditions, projection, options);
    if (shop) {
      let isNew = moment(shop.open_date).add(180, 'days').isSameOrAfter(Date.now());
      shop.isNew = isNew;
      return shop;
    } else {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
  }

  async add(doc, options={}) {
    if (doc) {
      let shop = new shopModel(doc);
      if (shop) {
        let newShop = await shop.save(options);
        if (newShop) {
          return newShop;
        }
      } else {
        throw new ApiError(ApiErrorNames.ADD_FAIL);
      }
    } else {
      throw new ApiError(ApiErrorNames.ADD_FAIL);
    }
  }

  async update(conditions, doc, options) {
    if (doc) {
      let ret = await shopModel.update(conditions, doc, options);
      return ret;
    } else {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
  }

  // async remove(conditions) {
  //   if (conditions) {
  //     return await model.deleteMany(conditions);
  //   } else {
  //     throw new ApiError(ApiErrorNames.DELETE_FAIL);
  //   }
  // }

  async checkCanRemoveByIds(ids) {
    let guids = await userShopGuideModel.find({shop:{$in:ids}});
    if (guids && guids.length > 0) {
      throw new ApiError(ApiErrorNames.DELETE_FAIL, '此店铺下有导购，无法删除！');
    }
    let oders = await orderModel.find({shop:{$in:ids}});
    if (oders && oders.length > 0) {
      throw new ApiError(ApiErrorNames.DELETE_FAIL, '此店铺下有订单，无法删除！');
    }
    return true;
  }

  async removeByIds(ids) {
    if (ids && ids.length > 0) {
      await this.checkCanRemoveByIds(ids)
      return await shopModel.remove({_id:{$in:ids}});
    } else {
      throw new ApiError(ApiErrorNames.DELETE_FAIL);
    }
  }

  // 获取店长
  async getShopManager(shopId) {
    if (shopId) {
      return await userShopGuideModel.findOne({shop:shopId, manager:true});
    } else {
      return null;
    }
  }
}

module.exports = new ShopData()