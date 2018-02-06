import moment from 'moment'

import { commonUtils } from '../../modules/common';

// 门店销售报表
export const SHOP_SALSE_STATISTICS_COLS = [
  {key:'create_time', sum:false, label:'日期'},
  {key:'shop', sum:false, label:'门店', render:item=>item&&item.name || ''},
  {key:'guide', sum:false, label:'导购', render:item=>item&&item.name || ''},
  {key:'vip_level', sum:false, label:'会员等级', render:item=>item&&item.vip_level || 0},
  {key:'count', sum:true, label:'销售数量', render:item=>item || 0},
  {key:'system_price', sum:true, label:'吊牌金额', render:item=>item+'元' || '0元'},
  {key:'real_pay_price', sum:true, label:'销售金额', render:item=>item+'元' || '0元'},
  {key:'discount_price', sum:true, label:'折扣金额', render:item=>item+'元' || '0元'},
]

// 商品销售报表
export const GOODS_STATISTICS_COLS = [
  {key:'create_time', sum:false, label:'日期'},
  {key:'shop', sum:false, label:'门店', render:item=>item&&item.name || ''},
  {key:'NID', sum:false, label:'货号', render:item=>item || ''},
  {key:'type', sum:false, label:'商品大类', render:item=>item || ''},
  {key:'s_material', sum:false, label:'材料', render:item=>item&&item.name || ''},
  {key:'sex', sum:false, label:'性别'},
  {key:'s_out_color', sum:false, label:'斜面颜色', render:item=>item&&item.name || ''},
  {key:'s_in_color', sum:false, label:'里皮颜色', render:item=>item&&item.name || ''},
  {key:'s_bottom_color', sum:false, label:'鞋底颜色', render:item=>item&&item.name || ''},
  {key:'s_bottom_side_color', sum:false, label:'底边颜色', render:item=>item&&item.name || ''},
  {key:'s_gui_ge', sum:false, label:'规格', render:item=>item&&item.name || ''},
  {key:'count', sum:true, label:'销售数量', render:item=>item || 0},
  {key:'system_price', sum:true, label:'吊牌金额', render:item=>item || ''},
]

// 脚型报表
export const FOOTER_STATISTICS_COLS = [
  {key:'name', sum:false, label:'名称', render:item=>item || ''},
  {key:'sex', sum:false, label:'性别', render:item=>item || ''},
  {key:'phone', sum:false, label:'手机', render:item=>item || ''},
  {key:'shop', sum:false, label:'门店', render:item=>item&&item.name || ''},
  {key:'sub_order_id', sum:false, label:'订单号', render:item=>item || ''},
  {key:'create_time', sum:false, label:'订单日期'},
  {key:'NID', sum:false, label:'货号', render:item=>item || ''},
  {key:'s_xuan_hao', sum:false, label:'楦号', render:item=>item&&item.name || ''},
  {key:'s_foot_size', sum:false, label:'尺码', render:item=>item || ''},
  {key:'s_left_length', sum:false, label:'左脚长度', render:item=>item || ''},
  {key:'s_left_zhiWei', sum:false, label:'左脚趾围', render:item=>item || ''},
  {key:'s_left_fuWei', sum:false, label:'左脚附维', render:item=>item || ''},
  {key:'s_right_length', sum:false, label:'右脚长度', render:item=>item || ''},
  {key:'s_right_zhiWei', sum:false, label:'右脚趾围', render:item=>item || ''},
  {key:'s_right_fuWei', sum:false, label:'右脚附维', render:item=>item || ''},
  {key:'remark', sum:false, label:'备注', render:item=>item || ''},
]

// 客户订单表
export const FOOTER_STATISTICS_COLS = [
  {key:'name', sum:false, label:'名称', render:item=>item || ''},
  {key:'sex', sum:false, label:'性别', render:item=>item || ''},
  {key:'phone', sum:false, label:'手机', render:item=>item || ''},
  {key:'shop', sum:false, label:'门店', render:item=>item&&item.name || ''},
  {key:'sub_order_id', sum:false, label:'订单号', render:item=>item || ''},
  {key:'create_time', sum:false, label:'订单日期'},
  {key:'NID', sum:false, label:'货号', render:item=>item || ''},
  {key:'s_xuan_hao', sum:false, label:'楦号', render:item=>item&&item.name || ''},
  {key:'s_foot_size', sum:false, label:'尺码', render:item=>item || ''},
  {key:'s_left_length', sum:false, label:'左脚长度', render:item=>item || ''},
  {key:'s_left_zhiWei', sum:false, label:'左脚趾围', render:item=>item || ''},
  {key:'s_left_fuWei', sum:false, label:'左脚附维', render:item=>item || ''},
  {key:'s_right_length', sum:false, label:'右脚长度', render:item=>item || ''},
  {key:'s_right_zhiWei', sum:false, label:'右脚趾围', render:item=>item || ''},
  {key:'s_right_fuWei', sum:false, label:'右脚附维', render:item=>item || ''},
  {key:'remark', sum:false, label:'备注', render:item=>item || ''},
]

export class Report {

  getSalesReport(list) {
    let statisticsCols = []
    let sumCols = [];
    SHOP_SALSE_STATISTICS_COLS.forEach((item) => {
      if (item.sum) {
        sumCols.push(item.key);
      } else {
        statisticsCols.push(item.key);
      }
    })

    list = list.map((item,index) => {
      if (!item.customer) {
        item.vip_level = 0;
      } else {
        item.vip_level = item.customer.vip_level || 0;
      }
      item.count = 1;
      item.create_time = item.create_time&&moment(item.create_time).format("YYYY-MM-DD")||''

      return item;
    })

    return this.getReportList(list, statisticsCols, sumCols);
  }

  getGoodsSalesReport(list) {
    let statisticsCols = []
    let sumCols = [];
    GOODS_STATISTICS_COLS.forEach((item) => {
      if (item.sum) {
        sumCols.push(item.key);
      } else {
        statisticsCols.push(item.key);
      }
    })

    list = list.map((item,index) => {
      if (!item.customer) {
        item.sex = '未知';
      } else {
        item.sex = item.customer.sex || '未知';
      }
      item.type = commonUtils.getOrderType(item.type);
      if (item.type) {
        item.type = item.type.label;
      }
      item.count = 1;
      item.create_time = item.create_time&&moment(item.create_time).format("YYYY-MM-DD")||''

      item.system_price = item.price;
      if (item.s_customs) {
        for(let c of item.s_customs) {
          item.system_price += c.price;
        }
      }
      if (item.urgent) {
        item.system_price += item.urgent.price;
      }

      return item;
    })

    return this.getReportList(list, statisticsCols, sumCols);
  }

  getFooterReport(list) {
    let statisticsCols = []
    let sumCols = [];
    FOOTER_STATISTICS_COLS.forEach((item) => {
      if (item.sum) {
        sumCols.push(item.key);
      } else {
        statisticsCols.push(item.key);
      }
    })

    list = list.map((item,index) => {
      if (!item.customer) {
        item.sex = '未知';
      } else {
        item.sex = item.customer.sex || '未知';
      }
      if (!item.customer) {
        item.name = '';
      } else {
        item.name = item.customer.name || '';
      }
      if (!item.customer) {
        item.phone = '';
      } else {
        item.phone = item.customer.phone || '';
      }
      item.count = 1;
      item.create_time = item.create_time&&moment(item.create_time).format("YYYY-MM-DD")||''

      item.system_price = item.price;
      if (item.s_customs) {
        for(let c of item.s_customs) {
          item.system_price += c.price;
        }
      }
      if (item.urgent) {
        item.system_price += item.urgent.price;
      }

      return item;
    })

    return this.getReportList(list, statisticsCols, sumCols);
  }
  
  getReportList(list, statisticsCols, sumCols, sort) {
    let totalList = {};
    for(let col of sumCols) {
      totalList[col] = 0;
    }

    let ret = this.analyse(list, statisticsCols);
    ret = this.sum(list, ret, statisticsCols, sumCols, totalList)
    if (sort) {
      ret.sort(sort);
    }
    if (sumCols.length > 0) {
      totalList[statisticsCols[0]] = '总计:';
      totalList.key = ret.length;
      ret.push(totalList);
    }
    return ret;
  }

  sum(list, statistics, statisticsCols, sumCols, totalSumList) {
    let retList = [];
      for(let key in statistics) {
        let item = {};
        if (statistics[key].length > 0) {
          for(let col of statisticsCols) {
            item[col] = list[statistics[key][0]][col];
          }
        }
        for(let index of statistics[key]) {
          let data = list[index];
          for(let col of sumCols) {
            if (!item[col]) {
              item[col] = 0;
            }
            if (!totalSumList[col]) {
              totalSumList[col] = 0;
            }
            let v = data[col]||0;
            item[col] += v;
            totalSumList[col] += v;
          }
        }
        item.key = retList.length;
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
        let v = data[col];
        if (v && v.hasOwnProperty('_id')) {
          key += v._id;
        } else {
          key += v;
        }
      }
      if (!ret[key]) {
        ret[key] = [];
      }
      ret[key].push(index);
    }

    return ret;
  }

}