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
  async getAnalyseShopSalesList(params) {
    let date = moment();
    let dateBegan = date.toDate();
    let dateEnd = date.toDate();
    if (params.date_type === 2) { // 周
      let _date = moment(date.weekday(0));
      dateBegan = _date.toDate();
      dateEnd = _date.add(7, 'days').toDate();
    } else if (params.date_type === 3) { // 月
      let _date = moment(date.format("YYYY-MM")+"-01");
      dateBegan = _date.toDate();
      dateEnd = _date.add(1, 'month').toDate();
    } else if (params.date_type === 4) { // 年
      let _date = moment(date.format("YYYY")+"-01-01");
      dateBegan = _date.toDate();
      dateEnd = _date.add(1, 'year').toDate();
    } else {
      let _date = moment(date.format("YYYY-MM-DD"));
      dateBegan = _date.toDate();
      dateEnd = _date.add(1, 'day').toDate();
    }

    let aggOptions = [
      { $match: {is_recharge:false, create_time:{$gte:dateBegan, $lt:dateEnd}} },
      { $group: {"_id": { "shop": "$shop"}, "amount":{$sum:"$system_price"}, "count":{$sum:1}, "sub_count":{$sum:{"$size":"$sub_orders"}}}},
      { $project : {"_id": 0, "shop" : "$_id.shop", "amount" : "$amount", "count" : "$count", "sub_count" : "$sub_count"}}
    ];
    let orders = await orderModel.aggregate(aggOptions);
    // console.log('getAnalyseShopSalesList orders=' + JSON.stringify(orders))
    let newOrders = await orderModel.populate(orders, {path:'shop', model:'shop'});
    // console.log('getAnalyseShopSalesList orders=' + JSON.stringify(newOrders))
    
    return newOrders;
  }

  /**
   * 获取最近5周的销量
   */
  async getAnalyseSalesListLast5Week() {
    let date = moment(moment().format("YYYY-MM-DD")).add(1, 'day');
    let dateBegan = null;
    let dateEnd = null;

    let list = [];
    for(let i=0; i<5; i++) {
      dateEnd = moment(date);
      dateBegan = moment(date.subtract(7, 'days'));
      // console.log('getAnalyseSalesListLast5Week dateBegan=' + dateBegan.format("YYYY-MM-DD HH:mm:ss") + 'dateEnd=' + dateEnd.format("YYYY-MM-DD HH:mm:ss"))
      let aggOptions = [
        { $match: {is_recharge:false, create_time:{$gte:dateBegan.toDate(), $lt:dateEnd.toDate()}} },
        { $group: {"_id": { "is_recharge": "$is_recharge"}, "amount":{$sum:"$system_price"}}}
      ];
      let orders = await orderModel.aggregate(aggOptions);
      // console.log('getAnalyseSalesListLast5Week list=' + JSON.stringify(orders))
      if (orders.length > 0) {
        list.push(orders[0].amount);
      } else {
        list.push(0);
      }
    }
    console.log('getAnalyseSalesListLast5Week list=' + JSON.stringify(list))
    return list;
  }

  /**
   * 获取最近12个月的销量
   */
  async getAnalyseSalesListLast12Month() {
    let date = moment(moment().format("YYYY-MM"));
    let dateBegan = moment(date);
    let dateEnd = moment(date.add(1, 'month'));

    let list = [];
    for(let i=0; i<12; i++) {
      console.log('getAnalyseSalesListLast12Month dateBegan=' + dateBegan.format("YYYY-MM-DD HH:mm:ss") + 'dateEnd=' + dateEnd.format("YYYY-MM-DD HH:mm:ss"))

      let aggOptions = [
        { $match: {is_recharge:false, create_time:{$gte:dateBegan.toDate(), $lt:dateEnd.toDate()}} },
        { $group: {"_id": { "is_recharge": "$is_recharge"}, "amount":{$sum:"$system_price"}}}
      ];
      let orders = await orderModel.aggregate(aggOptions);
      // console.log('getAnalyseSalesListLast12Month list=' + JSON.stringify(orders))
      if (orders.length > 0) {
        list.push(orders[0].amount);
      } else {
        list.push(0);
      }
      dateEnd = moment(dateBegan);
      dateBegan = moment(dateBegan.subtract(1, 'month'));
    }
    return list;
  }

  /**
   * 获取今年和去年12个月的销量
   */
  async getAnalyseSalesListLast2Year12Month() {
    let date = moment(moment().format("YYYY-MM"));
    let dateBegan = moment(date);
    let dateEnd = moment(date.add(1, 'month'));

    let list = [];
    for(let i=0; i<12; i++) {
      dateBegan = moment(date.month(i));
      dateEnd = moment(date.month(i+1));
      let aggOptions = [
        { $match: {is_recharge:false, create_time:{$gte:dateBegan.toDate(), $lt:dateEnd.toDate()}} },
        { $group: {"_id": { "is_recharge": "$is_recharge"}, "amount":{$sum:"$system_price"}}}
      ];
      let orders = await orderModel.aggregate(aggOptions);
      if (orders.length > 0) {
        list.push(orders[0].amount);
      } else {
        list.push(0);
      }
    }

    date = moment(moment().format("YYYY-MM")).subtract(1, 'year');

    let yesteryearList = [];
    for(let i=0; i<12; i++) {
      dateBegan = moment(date.month(i));
      dateEnd = moment(date.month(i+1));
      let aggOptions = [
        { $match: {is_recharge:false, create_time:{$gte:dateBegan.toDate(), $lt:dateEnd.toDate()}} },
        { $group: {"_id": { "is_recharge": "$is_recharge"}, "amount":{$sum:"$system_price"}}}
      ];
      let orders = await orderModel.aggregate(aggOptions);
      if (orders.length > 0) {
        yesteryearList.push(orders[0].amount);
      } else {
        yesteryearList.push(0);
      }
    }
    return {
      year:list,
      yesteryear:yesteryearList
    }
  }
  
  /**
   * 获取最近5年销售额
   */
  async getAnalyseSalesListLast5Year() {
    let date = moment(moment().format("YYYY"+"-01-01")).add(1, 'year');
    let dateBegan = moment(date).subtract(1, 'year');
    let dateEnd = moment(date);

    let list = [];
    for(let i=0; i<5; i++) {
      let aggOptions = [
        { $match: {is_recharge:false, create_time:{$gte:dateBegan.toDate(), $lt:dateEnd.toDate()}} },
        { $group: {"_id": { "is_recharge": "$is_recharge"}, "amount":{$sum:"$system_price"}}}
      ];
      let orders = await orderModel.aggregate(aggOptions);
      if (orders.length > 0) {
        list.push(orders[0].amount);
      } else {
        list.push(0);
      }      
      console.log('getAnalyseSalesListLast5Year list=' + JSON.stringify(orders))

      dateEnd = moment(dateBegan);
      dateBegan = moment(dateBegan).subtract(1, 'year');
    }
    return list.reverse();
  }

  /**
   * 获取当年4个季度销售额
   */
  async getAnalyseSalesList4Quarter() {
    let date = moment(moment().format("YYYY"+"-01-01"));
    let dateBegan = moment(date);
    let dateEnd = moment(date).add(3, 'months');

    let list = [];
    for(let i=0; i<4; i++) {
      let aggOptions = [
        { $match: {is_recharge:false, create_time:{$gte:dateBegan.toDate(), $lt:dateEnd.toDate()}} },
        { $group: {"_id": { "is_recharge": "$is_recharge"}, "amount":{$sum:"$system_price"}}}
      ];
      let orders = await orderModel.aggregate(aggOptions);
      if (orders.length > 0) {
        list.push(orders[0].amount);
      } else {
        list.push(0);
      }
      console.log('getAnalyseSalesList4Quarter list=' + JSON.stringify(orders))

      dateBegan = moment(dateEnd);
      dateEnd = moment(dateEnd).add(3, 'month');
    }

    return list;
  }

}

module.exports = new AnalyseData()