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

const STATISTICS_COLS = [
  {key:'shop', sum:false},
  {key:'date', sum:false},
  {key:'guide', sum:false},
  {key:'vip_level', sum:false},
  {key:'count', sum:true},
  {key:'price', sum:true},
  {key:'pay_price', sum:true},
  {key:'discount_amount', sum:true},
]

class ReportData {

  async getSalesList(con) {

    
    let list = []

    let sexList = ['男', '女'];
    // let dateList = ['1900-11-1', '1900-11-2', '1900']
    let dateList = [];
    for(let i=0; i<10; i++) {
      dateList.push(`1920-11-${i+1}`);
    }

    let guideList = ['王玲', 'Json', 'Lily', 'Lucy', 'Mei', 'Ward', 'God'];
    for(let i=0; i<20; i++) {
      let item = {};
      item.id = i;
      item.sex = sexList[Math.floor(Math.random()*sexList.length)];
      item.date = dateList[Math.floor(Math.random()*dateList.length)];
      item.guide = guideList[Math.floor(Math.random()*guideList.length)];
      item.price = 100+2*i;
      list.push(item);
    }

    sum = (list, statistics, statisticsCols, sumCols) => {
      let retList = [];
      for(let key in statistics) {
        let keyList = key.split('|');
        let item = {};
        item.prices = {};
        for(let index in statisticsCols) {
          item[statisticsCols[index]] = keyList[index];
        }
        for(let index of statistics[key]) {
          let data = list[index];
          for(let col of sumCols) {
            if (!item[col]) {
              item[col] = 0;
              item.prices[col] = [];
            }
            item[col] += data[col]||0;
            item.prices[col].push(data[col]);
          }
        }

        retList.push(item);
      }

      return retList;
    }

    analyse = (list, statisticsCols) => {
      let ret = {};

      for(let index=0; index<list.length; index++) {
        let data = list[index];
        let key = '';
        for(let col of statisticsCols) {
          if (key) key += '|';
          key += data[col]
        }
        if (!ret[key]) {
          ret[key] = [];
        }
        ret[key].push(index);
      }

      return ret;
    }

    let statisticsCols = ['sex',]
    let sumCols = ['price'];
    let ret = analyse(list, statisticsCols);
    ret = sum(list, ret, statisticsCols, sumCols)
    ret.sort((a,b)=>{
      if (a.date > b.date) return 1;
      else if (a.date<b.date) return -1;
      else {
        return a.sex > b.sex ? 1 : -1;
      }
    })
    console.log(ret);
  }

  sum(list, statistics, statisticsCols, sumCols) {
    let retList = [];
    for(let key,value in statistics) {
      let keyList = key.split('|');
      let item = {};
      for(let index in statisticsCols) {
        item[statisticsCols[index]] = keyList[index];
      }
      for(let index of value) {
        let data = list[index];
        for(let col of sumCols) {
          if (!item[col]) {
            item[col] = 0;
          }
          item[col] += data[col]||0;
        }
      }

      retList.push(item);
    }

    return retList;
  }

  analyse(list, statisticsCols) {
    let ret = {};

    for(let index=0; index<list.length; index++) {
      let data = list[index];
      let key = '';
      for(let col of statisticsCols) {
        if (key) key += '|';
        key += data[col]
      }
      if (!ret[key]) {
        ret[key] = [];
      }
      ret[key].push(index);
    }

    return ret;
  }

  getSalesReport(){
    
  }
}

let report = new ReportData();
report.getList();

module.exports = new ReportData()