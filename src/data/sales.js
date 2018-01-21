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
  subOrderModel,
  sampleGoodsModel
} from '../models/index.js'

import { ApiError, ApiErrorNames } from '../error/api-errors'
import utils from '../utils/utils'
import * as commonUtils from '../utils/common-utils'
import baseUtils from '../base/utils/utils'
import * as validate from '../base/utils/validate'
import constants from '../constants/constants'
import DB from '../db/DB'
import commonData from './common-data'
import fileData from './file'

import { customerData } from './index'
import { tryFeedbackModel } from '../models/sales';
import { subOrderType } from '../schemas/sales/types';
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

  async addGoodsBySuborder(suborder) {
    if (suborder) {
      let createBase = function(suborder) {
        let ret = {};
        ret.NID = suborder.NID;
        ret.name ='';
        ret.goods = suborder.type;
        ret.price = suborder.price;
        ret.pics = [];
        ret.sex = suborder.sex;
        ret.hide = false;
        ret.put_date = moment().format("YYYY-MM-DD HH:mm:ss");
        return ret;
      }
      let goods = createBase(suborder);
      if (suborder.type === constants.E_ORDER_TYPE.SHOES) {
        goods.s_material = suborder.s_material && suborder.s_material._id || '';
        goods.s_xuan_hao = suborder.s_xuan_hao && suborder.s_xuan_hao._id || '';
        goods.s_gui_ge = suborder.s_gui_ge && suborder.s_gui_ge._id || '';
        goods.s_in_color = suborder.s_in_color && suborder.s_in_color._id || '';
        goods.s_out_color = suborder.s_out_color && suborder.s_out_color._id || '';
        goods.s_bottom_color = suborder.s_bottom_color && suborder.s_bottom_color._id || '';
        goods.s_bottom_side_color = suborder.s_bottom_side_color && suborder.s_bottom_side_color._id || '';
        goods.s_gen_gao = suborder.s_gen_gao && suborder.s_gen_gao._id || '';
      } else if (suborder.type === constants.E_ORDER_TYPE.BELT){
        goods.b_material = suborder.b_material && suborder.b_material._id || '';
        goods.b_color = suborder.b_color && suborder.b_color._id || '';
      } else if (suborder.type === constants.E_ORDER_TYPE.WATCH_STRAP){
        goods.ws_material = suborder.ws_material && suborder.ws_material._id || '';
        goods.ws_style = suborder.ws_style && suborder.ws_style._id || '';
      } else if (suborder.type === constants.E_ORDER_TYPE.ORNAMENT){
        goods.o_name = suborder.o_name || '';
      }

      if (goods) {
        let _goodsM = new goodsModel(goods);
        await _goodsM.save();
      }
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
      let ret = await goodsModel.update(conditions, doc, options);
      if (NIDChange) {
        let goods = await this.goodsPopulate(goodsModel.findOne(conditions));
        if (goods) {
          let NID = commonUtils.createGoodsNID(goods.goods, goods, goods.sex);
          await goodsModel.findOneAndUpdate({_id:goods._id}, {NID:NID});
        }
      }
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

  async getGoodsProfileByNID(nid) {
    if (!nid) return null;
    console.log(nid)
    const profile = await DB.findOne(goodsModel, {NID:nid}, (query)=>{
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
  async subOrderPopulate(query) {
    return query.populate('shop').populate('guide').populate('customer');
  }
  // 自订单列表
  async getSubOrderList(page, options) {
    const list = await DB.getList(subOrderModel, options, page, (query)=>{
      return this.subOrderPopulate(query);
    });
    return list;
  }
  async getSuborderProfile(id) {
    return await this.findSubOrder({_id:id});
  }

  async findSubOrder(conditions, fields, options) {
    let query = subOrderModel.findOne(conditions, fields, options);
    if (query) {
      return await this.subOrderPopulate(query);
    } else {
      return null;
    }
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
      
      if (doc.pay!==0 && !doc.pay || !doc.pay_type) {
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
        // handle pics
        let fileIds = sub.pics && sub.pics.map((item)=>item.file);
        if (fileIds && fileIds.length > 0) {
          await fileData.update({_id:{$in:fileIds}}, {temp:false});
        }
        sub.sub_order_id = this.createOrderId(sub.type, commonData.createCurrentOrderIndex());
        sub.state = constants.E_ORDER_STATUS.REVIEW;
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
  
  async suborderStateUpdate(id, state) {
    if (!id || !state) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
    if (state === constants.E_ORDER_STATUS.TRY_TRANSPORT) {
      return await this.subOrderTryShoesMakeComplete(id, state);
    } else {
      let suborder = await subOrderModel.findById(id);
      if (suborder) {
        if (suborder.state === state) {
          return {n:0,ok:false};
        } else {
          // TODO 检查state合法性
          return await subOrderModel.update({_id:id}, {state:state})
        }
      }
    }
    throw new ApiError(ApiErrorNames.UPDATE_FAIL);
  }

  async reviewSubOrder(id, doc, options) {
    if (!id || !doc || !doc.type || !doc.NID || doc.NID === constants.NULL_NID) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
    
    let goods = await this.getGoodsProfileByNID(doc.NID);
    if (!goods) {
      // 如果商品里面没有此商品则添加
      await this.addGoodsBySuborder(doc);
    } else {
      console.log(goods);
    }

    let conditions = {_id:id};
    if (doc.type === constants.E_ORDER_TYPE.SHOES) { // 鞋子订单到制作样品环节
      doc.state = constants.E_ORDER_STATUS.TRY;
    } else if(doc.type === constants.E_ORDER_TYPE.RECHARGE) { // 充值订单直接完成
      doc.state = constants.E_ORDER_STATUS.COMPLETED;
    } else { // 其他订单到打包环节
      doc.state = constants.E_ORDER_STATUS.MAKING;
    }
    return await this.updateSubOrder(conditions, doc, options);
  } 

  async updateSubOrder(conditions, doc, options) {
    if (doc) {
      if (doc.customer && doc.customer.phone) {

        let customer = await this.updateOrAddCustomerByOrder(doc, doc.customer);
        if (!customer) {
          // TODO
          // 必须有用户
          throw new ApiError(ApiErrorNames.UPDATE_FAIL);
        }
        doc.customer = customer._id;
      }
      if (doc.pics) {
        let subOrder = await subOrderModel.findOne(conditions);
        if (subOrder) {
          // handle pics
          let newFileIDS = []; // 新增的图片
          for(let pic of doc.pics) {
            newFileIDS.push(pic.file);
          }
          let deleteFileIDS = []; // 要删除的图片
          for(let pic of subOrder.pics) {
            if (doc.pics.findIndex((item)=>item.file == pic.file) === -1) {
              deleteFileIDS.push(pic.file);
            }
          }
          if (newFileIDS && newFileIDS.length > 0) {
            await fileData.update({_id:{$in:newFileIDS}}, {temp:false});
          }
          if (deleteFileIDS && deleteFileIDS.length > 0) {
            await fileData.update({_id:{$in:deleteFileIDS}}, {temp:true});
          }
        }
      }

      let ret = await subOrderModel.update(conditions, doc, options);
      return ret;
    } else {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
  }

  async subOrderTryShoesMakeComplete(id, state) {
    if (!id) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
    let ret = await subOrderModel.update({_id:id}, {state:state});
    if (ret) {
      if (ret.ok) {
        await tryFeedbackModel.updateMany({suborder_id:id}, {status:constants.E_ORDER_TRY_FEEDBACK_STATUS.END});
        let fd = new tryFeedbackModel({suborder_id:id, status:constants.E_ORDER_TRY_FEEDBACK_STATUS.TRANSPORT});
        if (fd) {
          let newFD = await fd.save();
        } else {
          throw new ApiError(ApiErrorNames.UPDATE_FAIL);
        }
      }
    }
    return ret;
  } 

  async cancelSuborder(id) {
    if (!id) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
    let suborder = await subOrderModel.findById(id);

    if (!suborder) throw new ApiError(ApiErrorNames.UPDATE_FAIL);

    if (suborder.state >= constants.E_ORDER_STATUS.MAKING_4) { // 东西没有制作完成，无法转入样品
      if (suborder.type === constants.E_ORDER_TYPE.SHOES ||
        suborder.type === constants.E_ORDER_TYPE.BELT ||
        suborder.type === constants.E_ORDER_TYPE.WATCH_STRAP ||
        suborder.type === constants.E_ORDER_TYPE.ORNAMENT 
      ) {
        if (suborder.type === constants.E_ORDER_TYPE.SHOES) {
          let list = this.createSample(suborder);
          for(let item of list) {
            let sample = new sampleGoodsModel(item);
            sample.count = 1;
            let newSample = await sample.save();
            // TODO 这里出错需要还原
          }
        }
      }
    }
    let ret = await subOrderModel.update({_id:id}, {state:constants.E_ORDER_STATUS.CANCEL});

    return ret;
  }

  /**
   * 根据订单创建样品库
   * 
   * @param {*} suborder 
   * 
   * @returns list
   */
  createSample(suborder) {
    let list = [];

    let createBase = function(suborder) {
      let ret = {};
      ret.NID = suborder.NID;
      ret.shop = suborder.shop&&suborder.shop.toString() || '';
      ret.type = suborder.type;
      return ret;
    }
    if (suborder.type === constants.E_ORDER_TYPE.SHOES) {
      for(let i=0; i<2; i++) {
        let shoes = createBase(suborder);
        shoes.s_foot_size = suborder.s_foot_size;
        shoes.s_right = i===0;
        if (i===0) {
          shoes.s_right = true;
          shoes.s_length = suborder.s_right_length;
          shoes.s_zhiWei = suborder.s_right_zhiWei;
          shoes.s_fuWei = suborder.s_right_fuWei;
        } else {
          shoes.s_right = false;
          shoes.s_length = suborder.s_left_length;
          shoes.s_zhiWei = suborder.s_left_zhiWei;
          shoes.s_fuWei = suborder.s_left_fuWei;
        }

        list.push(shoes);
      }
    } else if (suborder.type === constants.E_ORDER_TYPE.BELT){
      let belt = createBase(suborder);
      belt.b_A = suborder.b_A;
      belt.b_B = suborder.b_B;
      belt.b_C = suborder.b_C;
      belt.b_D = suborder.b_D;
      list.push(belt);
    } else if (suborder.type === constants.E_ORDER_TYPE.WATCH_STRAP){
      let ws = createBase(suborder);
      ws.ws_A = suborder.ws_A;
      ws.ws_B = suborder.ws_B;
      ws.ws_C = suborder.ws_C;
      ws.ws_D = suborder.ws_D;
      ws.ws_E = suborder.ws_E;
      ws.ws_F = suborder.ws_F;
      ws.ws_G = suborder.ws_G;
      list.push(ws);
    } else if (suborder.type === constants.E_ORDER_TYPE.ORNAMENT){
      let ornament = createBase(suborder);
      list.push(ornament);
    }

    return list;
  }
}

module.exports = new SalesData()