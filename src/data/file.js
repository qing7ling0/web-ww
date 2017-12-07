import moment from 'moment'

import { 
  fileModel
} from '../models/index.js'

import { ApiError, ApiErrorNames } from '../error/api-errors'
import utils from '../utils/utils'
import baseUtils from '../base/utils/utils'
import constants from '../constants/constants'
// import 

const logUtil = require('../utils/log-utils');

class FileData {

  async add(data, name, options={}) {
    // if (doc) {
    //   let file = new customerModel(doc);
    //   if (customer) {
    //     let newcustomer = await customer.save(options);
    //     if (newcustomer) {
    //       return newcustomer;
    //     }
    //   } else {
    //     throw new ApiError(ApiErrorNames.ADD_FAIL);
    //   }
    // } else {
    //   throw new ApiError(ApiErrorNames.ADD_FAIL);
    // }
  }

  async update(conditions, doc, options) {
    // if (doc) {
    //   let ret = await customerModel.update(conditions, doc, options);
    //   return ret;
    // } else {
    //   throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    // }
  }

  async remove(conditions) {
    // if (conditions) {
    //   return await model.deleteMany(conditions);
    // } else {
    //   throw new ApiError(ApiErrorNames.DELETE_FAIL);
    // }
  }

  async removeByIds(ids) {
    // if (ids && ids.length > 0) {
    //   return await customerModel.remove({_id:{$in:ids}});
    // } else {
    //   throw new ApiError(ApiErrorNames.DELETE_FAIL);
    // }
  }
}

module.exports = new FileData()