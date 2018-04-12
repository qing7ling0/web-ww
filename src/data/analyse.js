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
import { subOrderModel } from '../models/sales.js';
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
    const {dateBegan, dateEnd} = this.getDate(params.date_type);

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

  /**
   * 获取时间区间
   * 
   * @param {any} date_type 
   * @param {any} index 第几个
   * @returns 
   * @memberof AnalyseData
   */
  getDate(date_type, index) {
    let date = moment();
    let dateBegan = date.toDate();
    let dateEnd = date.toDate();
    if (date_type === 2) { // 周
      let _date = moment(date.weekday(0));
      dateBegan = _date.toDate();
      dateEnd = _date.add(7, 'days').toDate();
    } else if (date_type === 3) { // 月
      let _date = moment(date.format("YYYY-MM")+"-01");
      dateBegan = _date.toDate();
      dateEnd = _date.add(1, 'month').toDate();
    } else if (date_type === 4) { // 年
      let _date = moment(date.format("YYYY")+"-01-01");
      dateBegan = _date.toDate();
      dateEnd = _date.add(1, 'year').toDate();
    } else if (date_type === 5) { // 季度
      if (!index) {
        let month = moment().month();
        index = (month / 3) + 1;
      }
      let _date = moment(date.format("YYYY")+"-01-01");
      dateBegan = moment(_date).add(3*(index-1), 'month').toDate();
      dateEnd = moment(_date).add(3*index, 'month').toDate();
    } else { // 日
      let _date = moment(date.format("YYYY-MM-DD"));
      dateBegan = _date.toDate();
      dateEnd = _date.add(1, 'day').toDate();
    }

    return {dateBegan, dateEnd};
  }

  // 获取top10
  async getAnalyseGoodsTop10(params) {
    const {dateBegan, dateEnd} = this.getDate(params.date_type);

    let notGoodsTypes = [constants.E_ORDER_TYPE.RECHARGE]
    let aggOptions = [
      { $match: {type:{$nin:notGoodsTypes}, create_time:{$gte:dateBegan, $lt:dateEnd}}},
      { $group: {"_id": { "NID": "$NID","s_material": "$s_material","b_material": "$b_material","ws_material": "$ws_material"}, "amount":{$sum:"$system_price"}, "count":{$sum:1}}},
      { $project : {"_id": 0, "NID" : "$_id.NID", "amount" : "$amount", "count" : "$count", "s_material":"$_id.s_material", "b_material":"$_id.b_material", "ws_material":"$_id.ws_material"}}
    ];
    let orders = await subOrderModel.aggregate(aggOptions).sort({amount: -1, NID:-1});
    // console.log('getAnalyseGoodsTop10 orders=' + JSON.stringify(orders))
    // let newOrders = await subOrderModel.populate(orders, {path:'s_material', model:'material'})
    // .populate(orders, {path:'b_material', model:'material'})
    // .populate(orders, {path:'ws_material', model:'material'});
    // console.log('getAnalyseShopSalesList orders=' + JSON.stringify(newOrders))
    
    return orders;
  } 

  /**
   * 获取商品销售比（top10/else）
   * @param {*} params 
   */
  async getAnalyseGoodsSalesPer(params) {
    const {dateBegan, dateEnd} = this.getDate(params.date_type);

    let notGoodsTypes = [constants.E_ORDER_TYPE.RECHARGE, constants.E_ORDER_TYPE.MAINTAIN, constants.E_ORDER_TYPE.ORNAMENT]
    let aggOptions = [
      { $match: {type:{$nin:notGoodsTypes}, create_time:{$gte:dateBegan, $lt:dateEnd}},  },
      { $group: {"_id": { "NID": "$NID"}, "amount":{$sum:"$system_price"}, "count":{$sum:1}}},
    ];
    let orders = await subOrderModel.aggregate(aggOptions).sort({amount: -1, create_time:-1}).limit(10);
    let top10Price = 0;
    let top10Count = 0;
    for(let order of orders) {
      top10Price += order.amount;
      top10Count += order.count;
    }

    aggOptions = [
      { $match: {type:{$nin:notGoodsTypes}, create_time:{$gte:dateBegan, $lt:dateEnd}},  },
      { $group: {"_id": { "type": "$type"}, "amount":{$sum:"$system_price"}, "count":{$sum:1}}}
    ];
    let allSuborders = await subOrderModel.aggregate(aggOptions);
    let allPrice = 0;
    let allCount = 0;
    for(let order of allSuborders) {
      allPrice += order.amount;
      allCount += order.count;
    }

    let ret = [ top10Price, top10Count, allPrice, allCount ];
    
    // console.log('getAnalyseGoodsSalesPer ret=' + JSON.stringify(ret))
    return ret;
  }

  
  /**
   * 获取商品材质销售比
   * @param {*} params 
   */
  async getAnalyseGoodsMaterial(params) {
    const {dateBegan, dateEnd} = this.getDate(params.date_type);

    let notGoodsTypes = [constants.E_ORDER_TYPE.RECHARGE, constants.E_ORDER_TYPE.MAINTAIN, constants.E_ORDER_TYPE.ORNAMENT]
    let aggOptions = [
      { $match: {type:{$nin:notGoodsTypes}, create_time:{$gte:dateBegan, $lt:dateEnd}},  },
      { $group: {"_id": {"s_material": "$s_material","b_material": "$b_material","ws_material": "$ws_material"}, "count":{$sum:1}}},
      { $project : {"s_material": "$_id.s_material", "b_material": "$_id.b_material", "ws_material": "$_id.ws_material", "count":"$count"}},
    ];
    let orders = await subOrderModel.aggregate(aggOptions);
    let total = 0;
    orders = orders.map(item=> {
      let ret = {
        NID:'',
        name:'',
        value:0,
        color:''
      }
      if (item.s_material) {
        ret.NID = item.s_material.NID;
        ret.name = item.s_material.name;
        ret.color = item.s_material.color_css;
      } else if (item.b_material) {
        ret.NID = item.b_material.NID;
        ret.name = item.b_material.name;
        ret.color = item.b_material.color_css;
      } else if (item.ws_material) {
        ret.NID = item.ws_material.NID;
        ret.name = item.ws_material.name;
        ret.color = item.ws_material.color_css;
      }
      ret.value = item.count;
      total += item.count;
      if (ret.NID) return ret;
      return null;
    }).filter(item=>item!==null);
    // console.log('getAnalyseGoodsMaterial orders=' + JSON.stringify(orders))
    // console.log('getAnalyseGoodsMaterial total=' + total)
    
    return orders;
  }

  /**
   * 获取商品性别销售比
   * @param {*} params 
   */
  async getAnalyseGoodsSex(params) {
    const {dateBegan, dateEnd} = this.getDate(params.date_type);

    let notGoodsTypes = [constants.E_ORDER_TYPE.RECHARGE];
    let aggOptions = [
      { $match: {type:{$nin:notGoodsTypes}, create_time:{$gte:dateBegan, $lt:dateEnd}},  },
      { $group: {"_id": {"sex": "$sex"}, "count":{$sum:1}}},
      { $project : {"name": "$_id.sex", "value":"$count"}},
    ];
    let orders = await subOrderModel.aggregate(aggOptions);
    console.log('getAnalyseGoodsSex orders=' + JSON.stringify(orders))
    // console.log('getAnalyseGoodsMaterial total=' + total)
    for(let order of orders) {
      if (order.name === constants.SEX_MAN) {
        order.color = "#2980D9";
      } else if (order.name === constants.SEX_MAN) {
        order.color = "#EB4986";
      } else {
        order.color = "#76EEC6";
      }
    }
    
    return orders;
  }

  /**
   * 获取商品销量的价格分布
   * 
   * @param {any} params 
   * @returns 
   * @memberof AnalyseData
   */
  async getAnalyseGoodsPrice(params) {
    const {dateBegan, dateEnd} = this.getDate(params.date_type);

    let notGoodsTypes = [constants.E_ORDER_TYPE.RECHARGE];
    let prices = [0, 3999, 4999, 5999, 12999, 23999]
    let data = {};
    let priceFileds = {};
    let groupFileds = {};
    for(let i=1; i<prices.length; i++) {
      priceFileds[`price${i}`] = {
        $cond: [{
          $and:[
            { $gt:['$system_price',prices[i-1]]},
            { $lte:['$system_price',prices[i]]}
          ]
        }, 1, 0]
      }
      groupFileds[`price${i}`] = {$sum: `$price${i}`}
      data[`price${i}`] = {
        price:prices[i],
        value:0
      };
    }
    let aggOptions = [  
      { 
        $match: { type:{$nin:notGoodsTypes}, create_time:{$gte:dateBegan, $lt:dateEnd} }
      },
      {
        $project: { system_price:1, NID: 1, ...priceFileds} 
      },
      { 
        $group: {'_id':null,...groupFileds} 
      }
    ]  
    let orders = await subOrderModel.aggregate(aggOptions);
    let ret = [];
    if (orders && orders.length > 0) {
      let item = {
        price:0,value:0
      }
      for(let key in data) {
        if (orders[0][key]) {
          item.price = data[key].price;
          item.value = orders[0][key];
          ret.push(item);
        }
      }
    }

    return ret;
  }

  /**
   * 获取当年4个季度的材质销量分布
   * 
   * @memberof AnalyseData
   */
  async getAnalyseGoodsMaterialList4Quarter() {
    let date = moment(moment().format("YYYY"+"-01-01"));
    let dateBegan = moment(date);
    let dateEnd = moment(date).add(3, 'months');

    let notGoodsTypes = [constants.E_ORDER_TYPE.RECHARGE, constants.E_ORDER_TYPE.MAINTAIN, constants.E_ORDER_TYPE.ORNAMENT]
    let list = [];
    for(let i=0; i<4; i++) {
      let aggOptions = [
        { 
          $match: {type:{$nin:notGoodsTypes}, create_time:{$gte:dateBegan.toDate(), $lt:dateEnd.toDate()}} 
        },
        { 
          $group: {"_id": {"s_material": "$s_material","b_material": "$b_material","ws_material": "$ws_material"}, "count":{$sum:1}}
        },
        { 
          $project : {"s_material": "$_id.s_material", "b_material": "$_id.b_material", "ws_material": "$_id.ws_material", "count":"$count"}
        }
      ];
      let orders = await subOrderModel.aggregate(aggOptions);
      if (orders.length > 0) {
        list.push(orders);
      } else {
        list.push([]);
      }
      console.log('getAnalyseGoodsMaterialList4Quarter list=' + JSON.stringify(orders))

      dateBegan = moment(dateEnd);
      dateEnd = moment(dateEnd).add(3, 'month');
    }

    return list;
  }
  
  /**
   * 获取当年4个季度的男女销量分布
   * 
   * @memberof AnalyseData
   */
  async getAnalyseGoodsSexList4Quarter() {
    let date = moment(moment().format("YYYY"+"-01-01"));
    let dateBegan = moment(date);
    let dateEnd = moment(date).add(3, 'months');

    let notGoodsTypes = [constants.E_ORDER_TYPE.RECHARGE];
    let list = [];
    for(let i=0; i<4; i++) {
      let aggOptions = [
        { $match: {type:{$nin:notGoodsTypes}, create_time:{$gte:dateBegan, $lt:dateEnd}},  },
        { $group: {"_id": {"sex": "$sex"}, "count":{$sum:1}}},
        { $project : {"name": "$_id.sex", "count":"$count"}},
      ];
      let orders = await subOrderModel.aggregate(aggOptions);
      if (orders.length > 0) {
        list.push(orders);
      } else {
        list.push([]);
      }
      console.log('getAnalyseGoodsMaterialList4Quarter list=' + JSON.stringify(orders))

      dateBegan = moment(dateEnd);
      dateEnd = moment(dateEnd).add(3, 'month');
    }

    return list;
  }

  
  /**
   * 获取当年4个季度的价格销量分布
   * 
   * @memberof AnalyseData
   */
  async getAnalyseGoodsPriceList4Quarter() {
    let list = [];
    let length = 4;
    for(let i=0; i<length; i++) {
      let orders = await this.getAnalyseGoodsPrice({date_type:5, index:i+1});
      if (orders.length > 0) {
        list.push(orders);
      } else {
        list.push([]);
      };
    }

    let newList = {};
    let ret = [];
    list.forEach((item, index) => {
      for(let data of item) {
        let key = "id" + data.price;
        let newItem = null;
        if (newList[key]) {
          newItem = newList[key];
        } else {
          newItem = {price:data.price, value:new Array(length)}
          newList[key] = newItem;
        }
        newItem.value[index] = item.value;
      }
    })

    for(let key of newList) {
      ret.push(newList[key]);
    }
    ret.sort((a,b)=>a.price>b.price?1:-1);

    return ret;
  }
}

module.exports = new AnalyseData()