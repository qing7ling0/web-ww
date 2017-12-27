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
  goodsModel,
  orderModel,
  customerModel,
  subOrderModel
} from '../models/index.js'

import { ApiError, ApiErrorNames } from '../error/api-errors'
import utils from '../utils/utils'
import * as commonUtils from '../utils/common-utils'
import baseUtils from '../base/utils/utils'
import * as validate from '../base/utils/validate'
import constants from '../constants/constants'
import DB from '../db/DB'
import commonData from './common-data'

import {customerData} from './index'
// import 

const logUtil = require('../utils/log-utils');

class SalesData {

  createOrderId = function(type, count) {
    const moment = require('moment')
    let date = moment().format('MMDDHHmmss');
  
    return type+date+count;
  }

  goodsPopulate(query) {
    return query
      .populate('type').populate('season').populate('style')
      .populate('s_material').populate('s_out_color').populate('s_in_color')
      .populate('s_bottom_color').populate('s_bottom_side_color').populate('s_xuan_hao').populate('s_gui_ge').populate('s_gen_gao')
      .populate('b_material').populate('b_color')
      .populate('ws_material').populate('ws_style');
  }

  /**
   * 获取商品列表
   * 
   * @param {any} goods 商品类型（鞋，皮带，表带）
   * @param {any} page 
   * @param {any} options 
   * @returns 
   * @memberof SalesData
   */
  async getGoodsList(goods, page, options) {
    if (!options.conditions) {
      options.conditions = {};
    }
    options.conditions.hide = false;
    if (goods) {
      options.conditions.goods = goods;
    }
    
    const list = await DB.getList(goodsModel, options, page, (query)=>{
      return this.goodsPopulate(query);
    });

    
    // for(let item of list.list) {
    //   let NID = commonUtils.createGoodsNID(item.goods, item, item.sex);
    //   // return {_id:item._id, NID:NID}
    //   console.log('----------getGoodsList NID=' + NID);
    //   await goodsModel.findOneAndUpdate({_id:item._id}, {NID:NID});
    // }


    return list;
  }
  
  async addGoods(doc, options={}) {
    if (doc) {
      let order = new goodsModel(doc);
      if (order) {
        let newOrder = await order.save(options);
        if (newOrder) {
          newOrder = await this.goodsPopulate(newOrder).execPopulate();
          let NID = commonUtils.createGoodsNID(newOrder.goods, newOrder, newOrder.sex);
          await goodsModel.findOneAndUpdate({_id:newOrder._id}, {NID:NID});
          return newOrder;
        }
        throw new ApiError(ApiErrorNames.ADD_FAIL);
      } else {
        throw new ApiError(ApiErrorNames.ADD_FAIL);
      }
    } else {
      throw new ApiError(ApiErrorNames.ADD_FAIL);
    }
  }

  async updateGoods(conditions, doc, options) {
    if (doc) {
      let NIDChange = false;
      if (doc.sex) {
        NIDChange = true;
      }
      if (!NIDChange) {
        for(let key of constants.GOODS_SHOES_NID_FIELDS) {
          if (doc[key]) {
            NIDChange = true;
            break;
          }
        }
      }
      if (!NIDChange) {
        for(let key of constants.GOODS_BLET_NID_FIELDS) {
          if (doc[key]) {
            NIDChange = true;
            break;
          }
        }
      }
      if (!NIDChange) {
        for(let key of constants.GOODS_WATCH_STRAP_NID_FIELDS) {
          if (doc[key]) {
            NIDChange = true;
            break;
          }
        }
      }
      if (NIDChange) {
        let goods = await this.goodsPopulate(goodsModel.findOne(conditions));
        if (goods) {
          let NID = commonUtils.createGoodsNID(goods.goods, goods, goods.sex);
          await goodsModel.findOneAndUpdate({_id:goods._id}, {NID:NID});
        }
      }
      let ret = await goodsModel.update(conditions, doc, options);
      return ret;
    } else {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
  }

  async removeGoods(conditions) {
    if (conditions) {
      return await goodsModel.updateMany(conditions, {hide:true});
    } else {
      throw new ApiError(ApiErrorNames.DELETE_FAIL);
    }
  }

  async removeGoodsByIds(ids) {
    if (ids && ids.length > 0) {
      return await goodsModel.updateMany({_id:{$in:ids}}, {hide:true});
    } else {
      throw new ApiError(ApiErrorNames.DELETE_FAIL);
    }
  }

  async getGoodsProfile(id) {
    const profile = await DB.findById(goodsModel, id, (query)=>{
      return this.goodsPopulate(query);
    });
    return profile;
  }
  
  orderPopulate(query) {
    return query
      .populate('shop').populate('guide')
      .populate('customer').exec();
  }
  async getOrderList(page, options) {
    const list = await DB.getList(orderModel, options, page, (query)=>{
      return this.orderPopulate(query);
    });
    return list;
  }

  // 自订单
  subOrderPopulate(query) {
    return query
    .populate('s_xuan_hao').populate('s_material').populate('s_gui_ge')
    .populate('s_gen_gao').populate('s_out_color').populate('s_in_color')
    .populate('s_bottom_color').populate('s_bottom_side_color').populate('s_tie_di')
    .populate('b_material').populate('b_color')
    .populate('ws_material').populate('ws_style')
    .populate('shop').populate('guide').populate('customer').exec();
  }
  // 自订单列表
  async getSubOrderList(page, options) {
    const list = await DB.getList(subOrderModel, options, page, (query)=>{
      return this.subOrderPopulate(query);
    });
    return list;
  }

  async findSubOrder(conditions, fields, options) {
    return await subOrderModel.findOne(conditions, fields, options);
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
      
      if (!doc.pay || !doc.pay_type) {
        // 必须有支付信息
        throw new ApiError(ApiErrorNames.ADD_FAIL);
      }

      let subOrders = doc.sub_orders;
      if (!subOrders || !subOrders.length || subOrders.length < 1) {
        // 必须有自订单
        throw new ApiError(ApiErrorNames.ADD_FAIL);
      }

      for(let sub of subOrders) {
        if (!sub.customer || !sub.customer.phone) {
          // TODO
          // 必须有用户
          throw new ApiError(ApiErrorNames.ADD_FAIL);
        }
        if (!sub.type) {
          // TODO
          // 必须有类型
          throw new ApiError(ApiErrorNames.ADD_FAIL);
        }
      }
      
      let customers = [];
      let newSubOrders = [];
      for(let sub of subOrders) {
        let customer = await this.updateOrAddCustomerByOrder(sub, sub.customer);
        if (!customer) {
          // TODO
          // 必须有用户
          throw new ApiError(ApiErrorNames.ADD_FAIL);
        }
        sub.customer = customer._id;
        sub.sub_order_id = this.createOrderId(sub.type, commonData.createCurrentOrderIndex());
        let subOrder = new subOrderModel(sub);
        let newSubOrder = await subOrder.save();
        if (newSubOrder) {
          newSubOrders.push(newSubOrder._id);
        } else {
          // 添加失败 移除之前添加的 
          await subOrderModel.remove({_id:{$in:newSubOrders}});
          throw new ApiError(ApiErrorNames.ADD_FAIL);
        }
      }

      if (newSubOrders.length === 0) {
        // 添加失败
        throw new ApiError(ApiErrorNames.ADD_FAIL);
      }

      doc.sub_orders = newSubOrders;
      let order = new orderModel(doc);
      if (order) {
        let newOrder = await order.save(options);
        if (newOrder) {
          await subOrderModel.updateMany({_id:{$in:newSubOrders}}, {order:newOrder._id});
          return newOrder;
        }
        throw new ApiError(ApiErrorNames.ADD_FAIL);
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

      let customer = await this.updateOrAddCustomerByOrder(doc, doc.customer);
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
  
  async updateSubOrder(conditions, doc, options) {
    if (doc) {
      if (doc.customer && doc.customer.phone) {

        let customer = await this.updateOrAddCustomerByOrder(doc, doc.customer);
        if (!customer) {
          // TODO
          // 必须有用户
          throw new ApiError(ApiErrorNames.ADD_FAIL);
        }
        doc.customer = customer._id;
      }

      let ret = await subOrderModel.update(conditions, doc, options);
      return ret;
    } else {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
  }
}

module.exports = new SalesData()