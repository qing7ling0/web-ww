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
  sampleGoodsModel,
  sampleAllotModel
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

import customerData from './customer'
import { tryFeedbackModel } from '../models/sales';
import { subOrderType } from '../schemas/sales/types';
import { commonModel } from '../models/common';
import { fileModel } from '../models/file.js';
import { Schema, mongo } from 'mongoose';

const { ObjectID } = mongo
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
        if(suborder.s_gen_gao && suborder.s_gen_gao._id) {
          goods.s_gen_gao = suborder.s_gen_gao._id;
        }
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

  // 删除原材料
  async removeMaterialByIds(ids) {
    if (ids && ids.length > 0) {
      let goods = await goodsModel.find({$or:[{s_material:{$in:ids}},{b_material:{$in:ids}},{ws_material:{$in:ids}}]});
      if (goods && goods.length > 0) {
        throw new ApiError(ApiErrorNames.DELETE_FAIL, '此材料已被使用，无法删除!');
      }

      goods = await sampleGoodsModel.find({$or:[{s_material:{$in:ids}},{b_material:{$in:ids}},{ws_material:{$in:ids}}]});
      if (goods && goods.length > 0) {
        throw new ApiError(ApiErrorNames.DELETE_FAIL, '此材料已被使用，无法删除!');
      }

      let subOrders = await subOrderModel.find({$or:[{s_material:{$in:ids}},{b_material:{$in:ids}},{ws_material:{$in:ids}}]});
      if (subOrders && subOrders.length > 0) {
        throw new ApiError(ApiErrorNames.DELETE_FAIL, '此材料已被使用，无法删除!');
      }

      return await materialModel.deleteMany({_id:{$in:ids}});
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

  // 子订单
  async subOrderPopulate(query) {
    return query.populate('shop').populate('guide').populate('customer');
  }
  // 子订单列表
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
      if (customer.country !== customerDoc.country) {
        _customerData.country = customerDoc.country;
      }
      if (customer.city !== customerDoc.city) {
        _customerData.city = customerDoc.city;
      }
      if (customer.address !== customerDoc.address) {
        _customerData.address = customerDoc.address;
      }
      if (customer.zipcode !== customerDoc.zipcode) {
        _customerData.zipcode = customerDoc.zipcode;
      }
      await customerModel.findOneAndUpdate({_id:customer._id}, _customerData);
      return customer;
    } else { // 添加客户
      _customerData = {...customerDoc}
      _customerData.vip_card_date = moment().format('YYYY-MM-DD HH:mm:ss');
      _customerData.vip_card_shop = order.shop;
      _customerData.vip_card_guide = order.guide;
      _customerData.join_type = constants.E_CUSTOMER_TYPE.ORDER;
      let cmodel = new customerModel(_customerData);
      customer = await cmodel.save();
      return customer;
    }

    return null;
  }

  async recharge(customer, sub) {
    let rewardList = await commonData.getCommonList(constants.COMMON_DATA_TYPES.RECHARGE_REWARD) || [];
    rewardList = rewardList && rewardList.list || [];
    if (rewardList) {
      rewardList.sort((a,b)=>a.mount>b.mount?-1:1);
    }
    sub.r_reward = 0;
    for(let reward of rewardList) {
      if (sub.r_amount >= reward.mount) {
        sub.r_reward = reward.reward; // 充值奖励
        break;
      }
    }
    sub.state = constants.E_ORDER_STATUS.COMPLETED; // 充值订单直接完成

    let mount = sub.r_amount + sub.r_reward;
    // 计算vip等级
    let vipLevelList = await commonData.getCommonList(constants.COMMON_DATA_TYPES.VIP) || [];
    vipLevelList = vipLevelList && vipLevelList.list || [];
    vipLevelList.sort((a,b)=>a.level>b.level?1:-1);

    let exp = customer.vip_exp;
    let balance = customer.balance + mount;
    let recharge = customer.recharge + sub.r_amount;
    let rechargeReward = customer.recharge_reward + sub.r_reward;
    exp += mount;
    let vipLevel = 0;
    for(let lv of vipLevelList) {
      if (exp >= lv.exp) {
        vipLevel = lv.level;
        break;
      }
    }
    await customerModel.findOneAndUpdate({_id:customer._id}, {vip_level:vipLevel, vip_exp:exp, balance:balance, recharge:recharge, recharge_reward:rechargeReward});

    return sub;
  }

  // 支付支付金额
  async pay(customer, payInfo) {
    payInfo.real_pay_price = Math.round((payInfo.undiscount_mount + payInfo.discount * payInfo.discount_mount)*10)/10;
    payInfo.discount_price = payInfo.discount_mount+payInfo.undiscount_mount - payInfo.real_pay_price;
    if (!payInfo.select_store_card) return payInfo; // 只有选择从充值卡中支付才去计算
    if (!customer) return payInfo; // 如果不是会员则不用扣除金钱了

    let canUseBalance = customer&&customer.balance || 0;
    if (canUseBalance < payInfo.real_pay_price) {
      throw new ApiError(ApiErrorNames.MOUNT_NOT_ENOUGH);
    }
    console.log(payInfo)
    let balance = customer.balance - payInfo.real_pay_price;
    await customerModel.findOneAndUpdate({_id:customer._id}, {$set:{balance:balance}});
    return payInfo;
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

      let payInfo = {
        discount_mount:0, // 可以打折部分的金额
        undiscount_mount:0, // 不可以打折的金额
        real_pay_price:0,
        discount_price:0,
        discount:1,
        select_store_card:doc.store_card_select,
      }
      let customerInfo = null;
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

        if (customerInfo === null) {
          customerInfo = await customerModel.findOne({phone:sub.customer.phone});
        }

        // 计算价格
        payInfo.discount_mount += sub.price;
        if (sub.s_customs) {
          for(let c of sub.s_customs) {
            payInfo.undiscount_mount += c.price;
          }
        }
        if (sub.urgent) {
          payInfo.undiscount_mount += sub.urgent.price;
        }
      }

      // 查找vip等级
      let vipLevel = -1;
      if (customerInfo) {
        vipLevel = customerInfo.vip_level || 0;
      }

      // 查找vip对应的折扣，首次购买没有折扣,因为首次不是会员
      let vipLevelList = await commonData.getCommonList(constants.COMMON_DATA_TYPES.VIP);
      
      vipLevelList = vipLevelList && vipLevelList.list || [];
      console.log(vipLevelList)
      console.log(vipLevelList)
      vipLevelList.sort((a,b)=>a.level>b.level?1:-1);
      if (vipLevel > -1) {
        for(let lv of vipLevelList) {
          if (lv.level === vipLevel) {
            payInfo.discount = lv.discount / 10;
            break;
          }
        }
      }

      // 开始计算支付，主要是从储值卡中扣除
      console.log(payInfo)
      await this.pay(customerInfo, payInfo);
      doc.system_price = payInfo.discount_mount + payInfo.undiscount_mount;
      doc.real_pay_price = payInfo.real_pay_price;
      doc.discount_price = payInfo.discount_price;

      let customers = [];
      let newSubOrders = [];
      let isRechargeOrder = false;
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
        if (sub.type === constants.E_ORDER_TYPE.RECHARGE) { // 充值订单
          sub = await this.recharge(customer, sub);
          isRechargeOrder = true;
        }
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
      doc.is_recharge = isRechargeOrder;
      if (subOrders && subOrders.length>0) {
        doc.customer = subOrders[0].customer;
        doc.shop = subOrders[0].shop;
        doc.guide = subOrders[0].guide;
      }
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

      if (doc.file) {
        await fileData.update({_id:doc.file}, {temp:false});
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
            sample.left_count = 1;
            sample.right_count = 1;
            sample.shop = suborder.shop;
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

  // 获取当前导购的客户消费信息统计
  async getCustomerReportList(guideId, conditions, page) {
    if (!guideId) {
      throw new ApiError(ApiErrorNames.GET_FAIL);
    }
    let cusCond = {vip_card_guide:guideId};
    let minDate = null;
    let maxDate = null;
    if (conditions.dateBegan) {
      minDate = moment(conditions.dateBegan).toDate();
    }
    if (conditions.dateEnd) {
      maxDate = moment(conditions.dateEnd).toDate();
    }
    if (minDate && maxDate) {
      cusCond.birthday = {$gte:minDate, $lte:maxDate};
      // console.log('mindate + maxDate');
    } else if (minDate && !maxDate) {
      cusCond.birthday = {$gte:minDate};
    } else if (!minDate && maxDate) {
      cusCond.birthday = {$lte:maxDate};
    }
    if (conditions.phone) {
      cusCond = {
        vip_card_guide:guideId,
        phone: conditions.phone
      }
    }
    // console.log('getCustomerReportList conditions=' + JSON.stringify(conditions))

    let customers = await customerModel.find(cusCond);
    // let customers = await customerData.getList(page, {
    //   conditions: cusCond
    // });
    if (customers && customers.length > 0) {
      // console.log('getCustomerReportList customers=' + customers)
      let cIds = customers.map(item=>item._id);
      let orderCond = {customer:{$in:cIds}};
      orderCond.is_recharge = false;

      let aggOptions = [
        { $match: orderCond },
        { $group: {"_id": { "customer": "$customer"}, "costCount":{$sum:1}, "costAmount":{$sum:"$real_pay_price"}}},
      ];
      let costMatch = null;
      if (conditions.costMin && conditions.costMax) {
        aggOptions.push({
          $match: {"costAmount":{$gte:conditions.costMin, $lte:conditions.costMax}}
        })
      } else if (conditions.costMin && !conditions.costMax) {
        aggOptions.push({
          $match: {"costAmount":{$gte:conditions.costMin}}
        })
      } else if (!conditions.costMin && conditions.costMax) {
        aggOptions.push({
          $match: {"costAmount":{$lte:conditions.costMax}}
        })
      }
      aggOptions.push({ $project : {"_id": 0, "customer" : "$_id.customer", "costCount" : "$costCount", "costAmount" : "$costAmount"}} )
      let orders = await orderModel.aggregate(aggOptions);
      // console.log('getCustomerReportList orders=' + JSON.stringify(orders))
      let newOrders = await orderModel.populate(orders, {path:'customer', model:'customer'});
      for(let order of newOrders) {
        if (order.customer) {
          order.lastCostTime = '';
          let lastOrder = await orderModel.findOne({customer:order.customer._id}, null, {sort:{create_time:-1}});
          if (lastOrder) {
            order.lastCostTime = lastOrder.create_time;
          }
        }
      }
      // console.log('getCustomerReportList newOrders1=' + JSON.stringify(newOrders))
      if (conditions.day) { // 最后一次消费到今天的天数
        newOrders = newOrders.filter((item)=> {
          if (item.lastCostTime) {
            return moment().isBefore(moment(item.lastCostTime).add(conditions.day+1, 'days'), 'day');
          } 
          return false;
        })
      }
      // console.log('getCustomerReportList newOrders2=' + JSON.stringify(newOrders))
      return newOrders;
    } else {
      return [];
    }
  }
  // 获取当前导购的客户消费基本信息
  async getCustomerReportInfo(guideId) {
    // if (!guideId) {
    //   throw new ApiError(ApiErrorNames.GET_FAIL);
    // }
    let customers = await customerModel.find({});

    let monthCount = 0;
    let month = moment(moment().format("YYYY-MM"));
    let orderCond = {};
    orderCond.is_recharge = false;
    orderCond.create_time = {$gte:month.toDate(), $lt:month.add(1, 'months').toDate()}
    if (guideId) orderCond.guide = ObjectID(guideId);
    
    let aggOptions = [
      { $match: orderCond},
      { $group: {"_id": { "customer": "$customer"}, "count":{$sum:1}}},
      { $match: {"count":{$gte:2}}}
    ];
    
    let orders = await orderModel.aggregate(aggOptions);
    monthCount = orders.length;
    // console.log("monthCount orders=" + orders.length + "; da=" + month.format("YYYY-MM-DD HH:mm:ss"));
    
    let yearCount = 0;
    let year = moment(moment().format("YYYY")+"-01-01");
    orderCond = {};
    if (guideId) orderCond.guide = ObjectID(guideId);
    orderCond.create_time = {$gte:year.toDate(), $lte:year.add(1, 'years').toDate()}
    orderCond.is_recharge = false;
    aggOptions = [
      { $match: orderCond },
      { $group: {"_id": { "customer": "$customer"}, "count":{$sum:1}}},
      { $match: {"count":{$gte:2}}}
    ];
    orders = await orderModel.aggregate(aggOptions);
    // console.log("yearCount date1=" + date1 + " date2=" + date2);
    // console.log("yearCount orders=" + JSON.stringify(orders));
    yearCount = orders.length;

    let notBuyCount = customers.length;
    if (notBuyCount) {
      orderCond = {};
      orderCond.is_recharge = false;
      orderCond.create_time = {$gte:moment().subtract(1,'year').toDate(), $lte:moment().toDate()}
  
      aggOptions = [
        { $match: orderCond },
        { $group: {"_id": { "customer": "$customer"}, "count":{$sum:1}}}
      ];
      orders = await orderModel.aggregate(aggOptions);
      notBuyCount = Math.max(0, notBuyCount - orders.length);
    }


    return {
      totalCount: customers.length,
      monthCount: monthCount,
      yearCount: yearCount,
      notBuyCount: notBuyCount
    }

  }
  // 获取店铺的消费信息统计
  async getCustomerShopReportList(conditions, page) {
    let customers = await customerModel.find({});

    let guideCon = {};
    if (conditions.shop) {
      guideCon.shop = conditions.shop;
    } 

    let shop_guides = await userShopGuideModel.find(guideCon).populate('shop');
    // console.log("getCustomerShopReportList shop_guides" + JSON.stringify(shop_guides));

    if (!shop_guides || shop_guides.length === 0) return [];

    let guideIds = shop_guides.map(item=>ObjectID(item._id));
    // console.log("getCustomerShopReportList shop_guides" + JSON.stringify(guideIds));

    if (!conditions.date) conditions.date = moment();
    else conditions.date = moment(conditions.date);
    let monthCount = 0;
    let year = conditions.date;
    let yearEnd = year.toDate();
    let yearBegan = moment(year.format("YYYY-MM-DD")).subtract(1,'years').toDate();
    let aggOptions = [
      { $match: {is_recharge:false, guide:{$in:guideIds}, create_time:{$gte:yearBegan, $lte:yearEnd}} },
      { $group: {"_id": { "guide": "$guide", "customer": "$customer"}, "count":{$sum:1}}},
      { $match: {"count":{$gte:2}}},
      { $group: {"_id": { "guide": "$_id.guide"}, "yearCount":{$sum:1}}},
      { $project : {"_id": 0, "guide" : "$_id.guide", "yearCount" : "$yearCount"}}
    ];
    let guides = await orderModel.aggregate(aggOptions);

    // console.log("getCustomerShopReportList year=" + yearBegan + "; yearEnd=" + moment(yearEnd).format("YYYY/MM/DD HH:mm:ss") + "; orers 111=" + JSON.stringify(guides));
    shop_guides = shop_guides.map((sg)=> {
      let orderGuide = null;
      for(let item of guides) {
        if (item.guide.toString() == sg._id.toString()) {
          orderGuide = item;
          break;
        }
      }
      return { guide:sg, shop:sg.shop, totalCount:customers.length, yearCount:orderGuide&&orderGuide.yearCount||0, monthCount:0, notBuyCount:customers.length}
    })
    guides = shop_guides;    
    // console.log("getCustomerShopReportList year=" + yearBegan + "; yearEnd=" + moment(yearEnd).format("YYYY/MM/DD HH:mm:ss") + "; orers 111=" + JSON.stringify(guides));


    let month = moment(conditions.date.format("YYYY-MM"));
    let monthBegan = month.toDate();
    let monthEnd = month.add(1, 'month').toDate();

    aggOptions = [
      { $match: {is_recharge:false, guide:{$in:guideIds}, create_time:{$gte:monthBegan, $lte:monthEnd}} },
      { $group: {"_id": { "guide": "$guide", "customer": "$customer"}, "count":{$sum:1}}},
      { $match: {"count":{$gte:2}}},
      { $group: {"_id": { "guide": "$_id.guide"}, "monthCount":{$sum:1}}},
    ]
    let guides2 = await orderModel.aggregate(aggOptions);
    console.log("getCustomerShopReportList monthBegan=" + moment(monthBegan).format("YYYY/MM/DD HH:mm:ss") + "; monthEnd=" + moment(monthEnd).format("YYYY/MM/DD HH:mm:ss") + "; guides2 222=" + JSON.stringify(guides2));

    for(let guide of guides) {
      let monthGuide = guides2.find(item=>item._id.guide.toString() === (guide.guide&&guide.guide._id.toString()));
      if (monthGuide) {
        guide.monthCount = monthGuide.monthCount;
      }
    }

    let notBuyCount = customers.length;
    if (notBuyCount) {
      let orderCond = {};
      orderCond.is_recharge = false;
      orderCond.guide = {$in:guideIds};
      orderCond.create_time = {$gte:moment(conditions.date).subtract(1,'year').toDate(), $lte:moment(conditions.date).toDate()}
  
      let aggOptions = [
        { $match: orderCond },
        { $group: {"_id": { "guide": "$guide", "customer": "$customer"}, "count":{$sum:1}}},
        { $match: {"count":{$gte:1}}},
        { $group: {"_id": { "guide": "$_id.guide"}, "buyCount":{$sum:1}}},
      ];
      let guides3 = await orderModel.aggregate(aggOptions);
      for(let guide of guides) {
        let buyGuide = guides3.find(item=>item._id.guide.toString() === (guide.guide && guide.guide._id.toString()));
        if (buyGuide) {
          guide.notBuyCount = Math.max(0, guide.totalCount - buyGuide.buyCount);
        }
      }
    }

    return guides;
  }

  getSampleAllotList(page, options) {
    const list = await DB.getList(sampleAllotModel, options, page, (query)=>{
      return query.populate('shop').populate('guide').populate('customer');
    });
    return list;
  }
}

module.exports = new SalesData()