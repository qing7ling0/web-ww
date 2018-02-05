import moment from 'moment'

// 门店销售报表
export const SHOP_SALSE_STATISTICS_COLS = [
  {key:'create_date', sum:false, label:'时间', render:item=>item&&moment(item).format("YYYY-MM-DD")||''},
  {key:'shop', sum:false, label:'门店', render:item=>item&&item.name || ''},
  {key:'guide', sum:false, label:'导购', render:item=>item&&item.name || ''},
  {key:'vip_level', sum:false, label:'会员等级', render:item=>item&&item.vip_level || 0},
  {key:'count', sum:true, label:'销售数量', render:item=>item || 1},
  {key:'system_price', sum:true, label:'吊牌金额', render:item=>item || ''},
  {key:'real_pay_price', sum:true, label:'销售金额', render:item=>item || ''},
  {key:'discount_price', sum:true, label:'折扣金额', render:item=>item || ''},
]

// 门店销售报表
export const GOODS_STATISTICS_COLS = [
  {key:'create_date', sum:false, label:'时间', render:item=>item&&moment(item).format("YYYY-MM-DD")||''},
  {key:'shop', sum:false, label:'门店', render:item=>item&&item.name || ''},
  {key:'NID', sum:false, label:'编号', render:item=>item || ''},
  {key:'goods_type', sum:false, label:'商品大类', render:item=>item || 1},
  {key:'material', sum:false, label:'材料', render:item=>item || ''},
  {key:'sex', sum:false, label:'性别'},
  {key:'s_out_color', sum:false, label:'斜面颜色', render:item=>item&&item.name || ''},
  {key:'s_in_color', sum:false, label:'里皮颜色', render:item=>item&&item.name || ''},
  {key:'s_bottom_color', sum:false, label:'鞋底颜色', render:item=>item&&item.name || ''},
  {key:'s_bottom_side_color', sum:false, label:'底边颜色', render:item=>item&&item.name || ''},
  {key:'s_gui_ge', sum:false, label:'规格', render:item=>item&&item.name || ''},
  {key:'system_price', sum:true, label:'吊牌金额', render:item=>item || ''},
]

export class Report {

  getSalesReport(list) {
    let statisticsCols = []
    let sumCols = [];
    SHOP_SALSE_STATISTICS_COLS.forEach((item) => {
      if (item.sum) {
        sumCols.push(item);
      } else {
        statisticsCols.push(item);
      }
    })

    list = list.map((item,index) => {
      if (!item.customer || item.customer.vip_level) {
        if (!item.customer) item.customer = {};
        item.customer.vip_level = 0;
      }
      item.count = 1;

      return item;
    })

    return this.getReportList(list, statisticsCols, sumCols);
  }
  
  getReportList(list, statisticsCols, sumCols, sort) {
    let ret = this.analyse(list, statisticsCols);
    ret = this.sum(list, ret, statisticsCols, sumCols)
    if (sort) {
      ret.sort(sort);
    }
    return ret;
  }

  sum(list, statistics, statisticsCols, sumCols) {
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
            if (!item[col.key]) {
              item[col.key] = 0;
              item.prices[col.key] = [];
            }
            item[col.key] += data[col.key]||0;
            item.prices[col.key].push(data[col.key]);
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
        key += data[col.key]
      }
      if (!ret[key]) {
        ret[key] = [];
      }
      ret[key].push(index);
    }

    return ret;
  }

}