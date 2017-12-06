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
  goodsShoesModel,
  orderModel,
  customerModel
} from '../models/index.js'

import { ApiError, ApiErrorNames } from '../error/api-errors'
import utils from '../utils/utils'
import baseUtils from '../base/utils/utils'
import * as validate from '../base/utils/validate'
import constants from '../constants/constants'
import DB from '../db/DB'

import {customerData} from './index'
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
  
  orderPopulate(query) {
    return query
      .populate('s_shoes').populate('shop').populate('guide')
      .populate('customer').exec();
  }
  async getOrderList(page, options) {
    const list = await DB.getList(orderModel, options, page, (query)=>{
      return this.orderPopulate(query);
    });
    return list;
  }

  async updateOrAddCustomerByOrder(order, customerDoc) {
    if (customerDoc && customerDoc.phone && !validate.isMobile(customerDoc.phone)) {
      return null;
    }

    let customer = await customerModel.findOne({phone:customerDoc.phone});
    let _customerData = {}
    if (customer) { // 更新客户信息
      if (customerDoc.name && customer.name !== customerDoc.name) {
        _customerData.name = customerDoc.name;
      }
      if (customerDoc.sex && customer.sex !== customerDoc.sex) {
        _customerData.sex = customerDoc.sex;
      }
      if (customerDoc.birthday && customer.birthday !== customerDoc.birthday) {
        _customerData.birthday = customerDoc.birthday;
      }
      if (customer.weixin !== customerDoc.weixin) {
        _customerData.weixin = customerDoc.weixin;
      }
      await customerModel.findOneAndUpdate(customer._id, _customerData);
      return customer;
    } else { // 添加客户
      _customerData = {...customerDoc}
      _customerData.vip_card_date = moment().format('YYYY-MM-DD');
      _customerData.vip_card_shop = order.shop;
      _customerData.vip_card_guide = order.guide;
      let cmodel = new customerModel(_customerData);
      customer = await cmodel.save();
      return customer;
    }

    return null;
  }

  async addOrder(doc, options={}) {
    if (doc) {
      if (!doc.customer || !doc.customer.phone) {
        // TODO
        // 必须有用户
        throw new ApiError(ApiErrorNames.ADD_FAIL);
      }

      let customer = await this.updateOrAddCustomerByOrder(doc, doc.customer);
      if (!customer) {
        // TODO
        // 必须有用户
        throw new ApiError(ApiErrorNames.ADD_FAIL);
      }
      doc.customer = customer._id;

      let order = new orderModel(doc);
      if (order) {
        let newOrder = await order.save(options);
        if (newOrder) {
          return newOrder;
        }
      } else {
        throw new ApiError(ApiErrorNames.ADD_FAIL);
      }
    } else {
      throw new ApiError(ApiErrorNames.ADD_FAIL);
    }
  }

  async updateOrder(conditions, doc, options) {
    if (doc) {
      if (!doc.customer || !doc.customer.phone) {
        // TODO
        // 必须有用户
        throw new ApiError(ApiErrorNames.ADD_FAIL);
      }

      let customer = await this.updateOrAddCustomerByOrder(doc.customer);
      if (!customer) {
        // TODO
        // 必须有用户
        throw new ApiError(ApiErrorNames.ADD_FAIL);
      }
      doc.customer = customer._id;

      let ret = await orderModel.update(conditions, doc, options);
      return ret;
    } else {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
  }

  async removeOrder(conditions) {
    if (conditions) {
      return await orderModel.deleteMany(conditions);
    } else {
      throw new ApiError(ApiErrorNames.DELETE_FAIL);
    }
  }

  async removeOrderByIds(ids) {
    if (ids && ids.length > 0) {
      return await orderModel.remove({_id:{$in:ids}});
    } else {
      throw new ApiError(ApiErrorNames.DELETE_FAIL);
    }
  }
}

module.exports = new SalesData()