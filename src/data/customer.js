import moment from 'moment'

import { 
  userModel, 
  usercustomerGuideModel, 
  userOperateModel, 
  userProductionModel,
  userAdminModel,
  accountModel,
  shopModel,
  customerModel
} from '../models/index.js'

import { ApiError, ApiErrorNames } from '../error/api-errors'
import utils from '../utils/utils'
import baseUtils from '../base/utils/utils'
import constants from '../constants/constants'
// import 

const logUtil = require('../utils/log-utils');

class CustomerData {

  /**
   * 获取客户列表
   * 
   * @param {any} page 
   * @param {any} options {conditions}
   * @memberof customerData
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
    let total = await customerModel.find(conditions).count();
    let customers = await customerModel.find(conditions, null, findOptions);
    customers = customers.map((item) => {
      return item;
    })
    return {
      page:{page:page.page, pageSize:limit, total:total},
      list: customers
    };
  }

  async find(conditions, projection, options) {
    return await customerModel.findOne(conditions, projection, options);
  }

  async add(doc, options={}) {
    if (doc) {
      let customer = new customerModel(doc);
      if (customer) {
        let newcustomer = await customer.save(options);
        if (newcustomer) {
          return newcustomer;
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
      let ret = await customerModel.update(conditions, doc, options);
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
      return await customerModel.remove({_id:{$in:ids}});
    } else {
      throw new ApiError(ApiErrorNames.DELETE_FAIL);
    }
  }
}

module.exports = new CustomerData()