import moment from 'moment'

import { 
  userModel, 
  userShopGuideModel, 
  userOperateModel, 
  userProductionModel,
  userAdminModel,
  accountModel,
  shopModel
} from '../models/index.js'

import { ApiError, ApiErrorNames } from '../error/api-errors'
import utils from '../utils/utils'
import baseUtils from '../base/utils/utils'
import constants from '../constants/constants'
// import 

const logUtil = require('../utils/log-utils');

class ShopData {

  /**
   * 获取店铺列表
   * 
   * @param {any} page 
   * @param {any} options {conditions}
   * @memberof ShopData
   */
  async getList(page, options) {
    let skip = 0;
    let limit = page.pageSize || 100;
    if (page.page) {
      skip = Math.max(page.page-1,0) * limit;
    }
    let findOptions = options.options || {};
    findOptions.limit = limit;
    findOptions.skip = skip;
    let conditions = options.conditions || {};
    let total = await shopModel.find(conditions).count();
    let shops = await shopModel.find(conditions, null, findOptions);
    shops = shops.map((item) => {
      let isNew = false;
      if (item.open_date) {
        item.isNew = moment(item.open_date).add(180, 'days').isSameOrAfter(Date.now());
      }
      item = shopModel.toClient(item);
      return item;
    })
    return {
      page:{page:page.page, pageSize:limit, total:total},
      list: shops
    };
    
    // throw new ApiError(ApiErrorNames.UPDATE_FAIL);
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

  async remove(conditions) {
    if (conditions) {
      return await model.deleteMany(conditions);
    } else {
      throw new ApiError(ApiErrorNames.DELETE_FAIL);
    }
  }

  async removeByIds(ids) {
    if (ids && ids.length > 0) {
      return await shopModel.remove({_id:{$in:ids}});
    } else {
      throw new ApiError(ApiErrorNames.DELETE_FAIL);
    }
  }
}

module.exports = new ShopData()