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
import * as commonUtils from '../utils/common-utils'
import utils from '../utils/utils'
import baseUtils from '../base/utils/utils'
import constants from '../constants/constants'
import { subOrderModel } from '../models/sales.js';
import { customerModel } from '../models/customer.js';
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
      console.log('getAnalyseShopSalesList dateBegan=' + moment(dateBegan).format("YYYY-MM-DD HH:mm:ss") + 'dateEnd=' + moment(dateEnd).format("YYYY-MM-DD HH:mm:ss"))

    let aggOptions = [
      { $match: {is_recharge:false, create_time:{$gte:dateBegan, $lt:dateEnd}} },
      { $group: {"_id": { "shop": "$shop"}, "amount":{$sum:"$system_price"}, "count":{$sum:1}, "sub_count":{$sum:{"$size":"$sub_orders"}}}},
      { $project : {"_id": 0, "shop" : "$_id.shop", "amount" : "$amount", "count" : "$count", "sub_count" : "$sub_count"}}
    ];
    let orders = await orderModel.aggregate(aggOptions);
    console.log('getAnalyseShopSalesList orders=' + JSON.stringify(orders))
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
      // console.log('getAnalyseSalesListLast12Month dateBegan=' + dateBegan.format("YYYY-MM-DD HH:mm:ss") + 'dateEnd=' + dateEnd.format("YYYY-MM-DD HH:mm:ss"))

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
      dateBegan = _date.add(7*index, 'days').toDate();
      dateEnd = _date.add(7, 'days').toDate();
    } else if (date_type === 3) { // 月
      let _date = moment(date.format("YYYY-MM")+"-01");
      dateBegan = _date.add(index, 'month').toDate();
      dateEnd = _date.add(1, 'month').toDate();
      console.log('getdate month')
    } else if (date_type === 4) { // 年
      let _date = moment(date.format("YYYY")+"-01-01");
      dateBegan = _date.add(index, 'years').toDate();
      dateEnd = _date.add(1, 'years').toDate();
      console.log('getdate year')
    } else if (date_type === 5) { // 季度
      if (index === undefined || index === null) {
        // 未指定index，表示当前季度
        let month = moment().month();
        index = (month / 3) + 1;
      }
      let _date = moment(date.format("YYYY")+"-01-01");
      dateBegan = moment(_date).add(3*(index-1), 'month').toDate();
      dateEnd = moment(_date).add(3*index, 'month').toDate();
    } else { // 日
      let _date = moment(date.format("YYYY-MM-DD"));
      dateBegan = _date.add(index, 'day').toDate();
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
      { $group: {"_id": { "NID": "$NID","s_material": "$s_material._id","b_material": "$b_material._id","ws_material": "$ws_material._id"}, "amount":{$sum:"$system_price"}, "count":{$sum:1}}},
      { $project : {"_id": 0, "NID" : "$_id.NID", "amount" : "$amount", "count" : "$count", "s_material":"$_id.s_material", "b_material":"$_id.b_material", "ws_material":"$_id.ws_material"}}
    ];
    let orders = await subOrderModel.aggregate(aggOptions).sort({amount: -1, NID:-1}).limit(10);
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
    // console.log("getAnalyseGoodsSalesPer date_type=" + params.date_type + " dateBegan=" + moment(dateBegan).format("YYYY-MM-DD HH-mm-ss"));
    // console.log("getAnalyseGoodsSalesPer dateEnd=" + moment(dateBegan).format("YYYY-MM-DD HH-mm-ss"));

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
      { $group: {"_id": null, "amount":{$sum:"$system_price"}, "count":{$sum:1}}}
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
    // console.log("getAnalyseGoodsMaterial date_type=" + params.date_type + " dateBegan=" + moment(dateBegan).format("YYYY-MM-DD HH-mm-ss"));
    // console.log("getAnalyseGoodsMaterial dateEnd=" + moment(dateBegan).format("YYYY-MM-DD HH-mm-ss"));

    let notGoodsTypes = [constants.E_ORDER_TYPE.RECHARGE, constants.E_ORDER_TYPE.MAINTAIN, constants.E_ORDER_TYPE.ORNAMENT]
    let aggOptions = [
      { $match: {type:{$nin:notGoodsTypes}, create_time:{$gte:dateBegan, $lt:dateEnd}},  },
      { $group: {"_id": {"s_material": "$s_material._id","b_material": "$b_material._id","ws_material": "$ws_material._id"}, "count":{$sum:1}}},
      { $project : {"s_material": "$_id.s_material", "b_material": "$_id.b_material", "ws_material": "$_id.ws_material", "count":"$count"}},
    ];
    let orders = await subOrderModel.aggregate(aggOptions);
    let total = 0;
    // console.log('getAnalyseGoodsMaterial orders=' + JSON.stringify(orders))
    orders = orders.map(item=> {
      let ret = {
        _id:'',
        value:0,
      }
      if (item.s_material) {
        ret._id = item.s_material;
      } else if (item.b_material) {
        ret._id = item.b_material;
      } else if (item.ws_material) {
        ret._id = item.ws_material;
      }
      ret.value = item.count;
      total += item.count;
      if (ret._id) return ret;
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
  async getAnalyseGoodsSex(params, dateOffset) {
    const {dateBegan, dateEnd} = this.getDate(params.date_type, dateOffset);

    let notGoodsTypes = [constants.E_ORDER_TYPE.RECHARGE];
    let aggOptions = [
      { $match: {type:{$nin:notGoodsTypes}, create_time:{$gte:dateBegan, $lt:dateEnd}},  },
      { $group: {"_id": {"sex": "$sex"}, "count":{$sum:1}}},
      { $project : {"name": "$_id.sex", "value":"$count"}},
    ];
    let orders = await subOrderModel.aggregate(aggOptions);
    // console.log('getAnalyseGoodsSex orders=' + JSON.stringify(orders))
    // console.log('getAnalyseGoodsMaterial total=' + total)
    for(let order of orders) {
      let sexTypeInfo = commonUtils.getSex(order.name);
      order.color = sexTypeInfo&&sexTypeInfo.color || "#76EEC6";
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
  async getAnalyseGoodsPrice(params, dateOffset) {
    const {dateBegan, dateEnd} = this.getDate(params.date_type, dateOffset);

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
    // console.log('getAnalyseGoodsPrice orders=' + JSON.stringify(orders))
    let ret = [];
    for(let key in data) {
      let item = {
        price:0,value:0
      }
      item.price = data[key].price;
      item.value = orders && orders.length>0 && orders[0][key] || 0;
      ret.push(item);
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
          $group: {"_id": {"s_material": "$s_material._id","b_material": "$b_material._id","ws_material": "$ws_material._id"}, "count":{$sum:1}}
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
      // console.log('getAnalyseGoodsMaterialList4Quarter list=' + JSON.stringify(orders))

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
    let list = [];
    let length = 4;
    for(let i=0; i<length; i++) {
      let orders = await this.getAnalyseGoodsSex({date_type:5}, i+1)
      if (orders.length > 0) {
        list.push(orders);
      } else {
        list.push([]);
      }
    }

    let ret = constants.SEX_DATA.map(item=>{
      return {name:item.value, color:item.color, value:new Array(length)}
    });
    list.forEach((sexList, index)=> {
      sexList.forEach(item=>{
        for(let _item of ret) {
          if (_item.name === item.name) {
            _item.value[index] = item.value;
            break;
          }
        }
      })
    })
    // console.log('getAnalyseGoodsSexList4Quarter list=' + JSON.stringify(list))
    // console.log('getAnalyseGoodsSexList4Quarter list=' + JSON.stringify(ret))

    return ret;
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
      let orders = await this.getAnalyseGoodsPrice({date_type:5}, i+1);
      if (orders.length > 0) {
        list.push(orders);
      } else {
        list.push([]);
      };
    }

    let newList = {};
    let ret = [];
    let types = [];
    // console.log('getAnalyseGoodsPriceList4Quarter list=' + JSON.stringify(list))
    list.forEach((item, index) => {
      let newItem = {price:index, value:new Array(item.length)};
      ret.push(newItem)
      item.forEach((ele, _index) => {
        newItem.value[_index] = ele.value;
        if (index === 0) {
          types.push(ele.price);
        }
      })
    })

    // ret.sort((a,b)=>a.price>b.price?1:-1);
    // console.log('getAnalyseGoodsPriceList4Quarter list=' + JSON.stringify(ret))

    return {
      list:ret,
      types:types
    };
  }

  /**
   * 获取新增会员前三名店铺
   * 
   * @param {*} params 
   * @param {*} dateOffset 
   * 
   * return [{shop{},count,total_count}]
   */
  async getAnalyseVipNew(params, dateOffset) {
    const {dateBegan, dateEnd} = this.getDate(params.date_type, dateOffset);
    let notGoodsTypes = [constants.E_ORDER_TYPE.RECHARGE]
    let shops = await shopModel.find({});
    let aggOptions = [
      { $match: {vip_card_date:{$gte:dateBegan, $lt:dateEnd}}},
      { $group: {"_id": { "shop": "$vip_card_shop"}, "count":{$sum:1}}},
      { $project : {"_id": 0, "shop" : "$_id.shop",  "count" : "$count"}}
    ];
    let shopNewCustomers = await customerModel.aggregate(aggOptions).sort({count:-1}).limit(3);
    shopNewCustomers = await customerModel.populate(shopNewCustomers, {path:'shop', model:'shop'});

    let startIndex = shopNewCustomers.length;
    for(let i=startIndex; i<3; i++) { // 不足3个补齐3个
      if (i<shops.length) {
        shopNewCustomers.push({
          shop:shops[i],
          count:0,
          total_count:0
        })
      }
    }
    
    let ids = shopNewCustomers.map(item=>item.shop && item.shop._id.toString());
    aggOptions = [
      { $group: {"_id": { "shop": "$vip_card_shop"}, "count":{$sum:1}}},
      { $project : {"_id": 0, "shop" : "$_id.shop",  "count" : "$count"}}
    ];
    let shopCustomers = await customerModel.aggregate(aggOptions);
    // console.log('getAnalyseVipNew shopCustomers=' + JSON.stringify(shopCustomers))

    for(let cus of shopNewCustomers) {
      let _cus = shopCustomers.find(item=>item.shop.toString() === (cus.shop && cus.shop._id.toString() || null));
      if (_cus) {
        cus.total_count = _cus.count;
      } else {
        cus.total_count = 0;
      }
    }

    return shopNewCustomers;
  }

  /**
   * 获取会员的客单价/客单件
   * @param {} orders 
   */
  async getVipPerCountAndAmount(orders) {
    let newCount = 0;
    let newSubCount = 0;
    let newAmount = 0;
    let otherCount = 0;
    let otherSubCount = 0;
    let otherAmount = 0;

    orders.forEach(item=>{
      if (item.is_new) {
        newCount += item.count;
        newSubCount += item.sub_count;
        newAmount += item.amount;
      } else {
        otherCount += item.count;
        otherSubCount += item.sub_count;
        otherAmount += item.amount;
      }
    })

    // let newCountPer = newCount === 0 ? 0 : (newSubCount / newCount);
    // let newAmountPer = newCount === 0 ? 0 : (newAmount / newCount);
    // let countPer = otherCount === 0 ? 0 : (otherSubCount / otherCount);
    // let amountPer = otherCount === 0 ? 0 : (otherAmount / otherCount);

    return {newCount, newSubCount, newAmount, otherCount, otherSubCount, otherAmount};
  }

  async getVipOrders(params, dateOffset) {
    const {dateBegan, dateEnd} = this.getDate(params.date_type, dateOffset);
    // console.log("getVipOrders date_type=" + params.date_type + " dateBegan=" + moment(dateBegan).format("YYYY-MM-DD HH-mm-ss"));
    // console.log("getVipOrders dateEnd=" + moment(dateEnd).format("YYYY-MM-DD HH-mm-ss"));

    let newCustomers = await customerModel.find({vip_card_date:{$gte:dateBegan, $lt:dateEnd}}, {_id:1});
    let newCusDatas = {};
    newCustomers.forEach(item=>{
      newCusDatas[item._id] = item;
    })

    let aggOptions = [
      { $match: {is_recharge:false, create_time:{$gte:dateBegan, $lt:dateEnd}}},
      { $group: {"_id": {"customer":"$customer"}, amount:{$sum:"$system_price"}, "count":{$sum:1}, "sub_count":{$sum:{"$size":"$sub_orders"}}}},
      { $project: {"_id": 0, "customer" : "$_id.customer", "count" : "$count", "sub_count" : "$sub_count", "amount" : "$amount"}},
    ];
    let orders = await orderModel.aggregate(aggOptions);
    orders.forEach(item=>{
      item.is_new = !!newCusDatas[item.customer];
    })
    // console.log('getVipOrders orders=' + JSON.stringify(orders))

    return {orders:orders, newCusDatas:newCusDatas};
  }

  /**
   * 复购人数
   * @param {*} params 
   * @param {*} dateOffset 
   */
  async getVipBuy2Count(params, dateOffset) {
    const {dateBegan, dateEnd} = this.getDate(params.date_type, dateOffset);
    let allCustomer = await customerModel.find({}, {_id:1});
    let allCustomerCount = allCustomer && allCustomer.length || 0;

    let aggOptions = [
      { $match: {is_recharge:false, create_time:{$gte:dateBegan, $lt:dateEnd}}},
      { $group: {"_id": {"customer":'$customer'}, "count":{$sum:1}}},
      { $match: {count:{$gte:2}}},
      { $group: {"_id": null, "count":{$sum:1}}},
    ];
    let orders = await orderModel.aggregate(aggOptions);
    let buy2Count = orders && orders.length > 0 && orders[0].count;

    return buy2Count;
  }

  /**
   * 获取分析数据
   * @param {*} params 
   * @param {*} dateOffset 
   */
  async getAnalyseVipNewAndOld(params, dateOffset) {
    if (dateOffset===null || dateOffset === undefined || isNaN(dateOffset)) dateOffset = 0;
    const {orders} = await this.getVipOrders(params, dateOffset);
    // console.log('getAnalyseVipNewAndOld orders=' + JSON.stringify(orders))

    let countAndAmount = await this.getVipPerCountAndAmount(orders);

    // 新老会员销售额
    let newAndOldAmount = [countAndAmount.newAmount, countAndAmount.otherAmount];    

    // 获取客单价和客单价
    let countAndAmountPer = new Array(4);
    countAndAmountPer[0] = countAndAmount.newCount === 0 ? 0 : (countAndAmount.newSubCount / countAndAmount.newCount);
    countAndAmountPer[1] = countAndAmount.newCount === 0 ? 0 : (countAndAmount.newAmount / countAndAmount.newCount);
    countAndAmountPer[2] = countAndAmount.otherCount === 0 ? 0 : (countAndAmount.otherSubCount / countAndAmount.otherCount);
    countAndAmountPer[3] = countAndAmount.otherCount === 0 ? 0 : (countAndAmount.otherAmount / countAndAmount.otherCount);

    let allCustomerCount = 0;

    if (params.date_type === 1) { // 日
      return {newAndOldAmount, countAndAmountPer};
    } else if (params.date_type !== 1) { // 周/月/年
      let allCustomer = await customerModel.find({}, {_id:1});
      allCustomerCount = allCustomer && allCustomer.length || 0;

      let _lastDate = this.getDate(params.date_type, dateOffset-1);
      let lastAllCustomer = await customerModel.find({vip_card_date:{$lt:_lastDate.dateEnd}}, {_id:1});
      lastAllCustomer = lastAllCustomer && lastAllCustomer.length || 0;
      
      // 复购率
      let repeatBuyPer = {
        all_count:allCustomerCount,
        old_count:countAndAmount.otherCount,
        current_count:0,
        last_count:0,
        last_all_count:allCustomerCount,
      };
      orders.forEach(item=>{
        if (item.count > 1) {
          repeatBuyPer.current_count++;
        }
      })

      repeatBuyPer.last_count = await this.getVipBuy2Count(params, dateOffset+1);

      if (params.date_type === 2) { // 周
        return {newAndOldAmount, countAndAmountPer, repeatBuyPer};
      }

      if (params.date_type === 3) { // 月
        let monthBuyCountList = [];
        // 最近5个月老会员消费次数
        for(let i=4; i>0; i--) {
          const monthVipOrders = await this.getVipOrders(params, dateOffset - i);
          let _countAndAmount = await this.getVipPerCountAndAmount(monthVipOrders.orders);
          monthBuyCountList.push(_countAndAmount.otherCount);
        }
        monthBuyCountList.push(countAndAmount.otherCount);

        let vaildVip = {
          all_count:allCustomerCount,
          vaild_count:0,
        };
        
        let _date = this.getDate(params.date_type, dateOffset);
        let _dateEnd = _date.dateEnd;
        let _dateBegan = moment(_dateEnd).subtract(365, 'days');
        let aggOptions = [
          { $match: {is_recharge:false, create_time:{$gte:_dateBegan, $lt:_dateEnd}}},
          { $group: {"_id": {"customer":'$customer'}, "count":{$sum:1}}},
        ];
        let _orders = await orderModel.aggregate(aggOptions);
        vaildVip.vaild_count = _orders && _orders.length;

        return {newAndOldAmount, countAndAmountPer, repeatBuyPer, monthBuyCountList, vaildVip};
      }

      if (params.date_type === 4) { // 年

        // 本年4季度老会员消费次数
        let quarterBuyCountList = [];
        for(let i=0; i<4; i++) {
          const quarterVipOrders = await this.getVipOrders({date_type:5}, i + 1 + dateOffset*4);
          let _countAndAmount = await this.getVipPerCountAndAmount(quarterVipOrders.orders);
          quarterBuyCountList.push(_countAndAmount.otherCount);
        }

        let _date = this.getDate(params.date_type, dateOffset);
        let aggOptions = [
          { $match: {is_recharge:false, create_time:{$gte:_date.dateBegan, $lt:_date.dateEnd}}},
          { $group: {"_id": {"customer":'$customer'}, "count":{$sum:1}}},
          {
            $project: { 
              "customer": "$_id.customer", "count":"$count", 
              "count1": {
                $cond: [{
                  $and:[
                    { $gte:['$count',0]},
                    { $lte:['$count',1]}
                  ]
                }, 1, 0]
              }, 
              "count3": {
                $cond: [{
                  $and:[
                    { $gte:['$count',2]},
                    { $lte:['$count',3]}
                  ]
                }, 1, 0]
              }, 
              "count5": {
                $cond: [{
                  $and:[
                    { $gte:['$count',4]},
                    { $lte:['$count',5]}
                  ]
                }, 1, 0]
              }, 
              "count_other": {
                $cond: [{ $gte:['$count',6]}, 1, 0]
              }
            }
          },
          { 
            $group: {
              "_id": null, "count":{$sum:"$count"}, "max_count":{$max:"$count"}, "customer_count":{$sum:1},
              "count1":{$sum:"$count1"}, "count3":{$sum:"$count3"}, "count5":{$sum:"$count5"}, "count_other":{$sum:"$count_other"},
            }
          }
        ];
        let _orders = await orderModel.aggregate(aggOptions);
        // console.log('getVipOrders _orders=' + JSON.stringify(_orders))
        let _order = _orders&&_orders.length>0&&_orders[0] || {
          count:0, max_count:0, customer_count:0, count1:0, count3:0, count5:0, count_other:0
        };

        
        let _lastYearDate = this.getDate(params.date_type, dateOffset-1);
        let lastYearAggOptions = [
          { $match: {is_recharge:false, create_time:{$gte:_lastYearDate.dateBegan, $lt:_lastYearDate.dateEnd}}},
          { $group: {"_id": {"customer":'$customer'}, "count":{$sum:1}}},
          { $group: {"_id": null, "customer_count":{$sum:1}, "count":{$sum:"$count"}}},
        ];
        let _lastYearOrders = await orderModel.aggregate(lastYearAggOptions);

        // 有效会员数
        let vaildVip = {
          all_count:allCustomerCount, // 总会员数
          vaild_count:_order.customer_count// 有效会员数
        };

        // 复购次数
        let repeatBuyCount = {
          current_all_count:vaildVip.vaild_count,
          current:_order.count, // 本年
          last:_lastYearOrders&&_lastYearOrders.length>0&&_lastYearOrders[0].count||0, // 上一年
          last_all_count:_lastYearOrders&&_lastYearOrders.length>0&&_lastYearOrders[0].customer_count||0,
          highest:_order.max_count // 最高消费次数
        }

        // 消费次数分布[1，3，5，999999]
        let buyCount = [
          { name:"1次", value:_order.count1}, 
          { name:"2-3次", value:_order.count3}, 
          { name:"4-5次", value:_order.count5}, 
          { name:"5次以上", value:_order.count_other}
        ];
        return {
          newAndOldAmount, 
          countAndAmountPer, 
          repeatBuyPer, 
          quarterBuyCountList, 
          repeatBuyCount,
          buyCount, 
          vaildVip
        };
      }

    } 
  }

}

module.exports = new AnalyseData()