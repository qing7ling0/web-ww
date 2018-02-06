import React, { Component } from 'react';
import { Icon, Button } from 'antd'
import styled from 'styled-components'

import { commonUtils } from '../../../modules/common';
import * as constants from '../../../constants/Constants'
import * as graphqlTypes from '../../../modules/graphqlTypes'
import * as orderTypes from '../../../modules/orderTypes'

import { 
  Report, 
  SHOP_SALSE_STATISTICS_COLS,
  GOODS_STATISTICS_COLS,
  FOOTER_STATISTICS_COLS
} from '../report.js'

const {BASE_CONSTANTS} = constants;

const OpeateBtn = styled(Button)`
  margin: 0 0.05rem;
`
const defaultInitFormValue = (options, target) => {
  return options.map((item, index) => {
    if (!item.decoratorOptions) {
      item.decoratorOptions = {};
    }
    let value = target.props.data[item.name] || '';
    if (value._id) {
      value = value._id;
    }
    item.decoratorOptions.initialValue = value;
    return item;
  });
}

const listToSelectOptions = (list, valueFormat, labelFormat) => {
  return list.map((item) => {
    let ret = {_id:item._id};
    ret.value = valueFormat ? valueFormat(item) : item._id;
    ret.label = labelFormat ? labelFormat(item) : item.name;
    return ret;
  })
}

// vip
const getListOptions = function(cols, target) {
  return cols.map((item, index)=>{
    return { title: item.label, dataIndex: item.key, key: item.key, className:"table-column-left", render:item.render};
  });
}

export const TYPES = [
  {
    key:BASE_CONSTANTS.E_REPORT_TYPES.SALES,
    label:'门店销售报表',
    listOptions:getListOptions.bind(undefined, SHOP_SALSE_STATISTICS_COLS),
    listKey:'orderList',
    cols:SHOP_SALSE_STATISTICS_COLS,
    getReport:(target, list)=>target.report.getSalesReport(list),
    getList:(target, con)=>target.props.reqGetOrderList('orderList', con)
  },
  {
    key:BASE_CONSTANTS.E_REPORT_TYPES.GOODS,
    label:'商品销售报表',
    listOptions:getListOptions.bind(undefined,GOODS_STATISTICS_COLS),
    listKey:'subOrderList',
    cols:GOODS_STATISTICS_COLS,
    getReport:(target, list)=>target.report.getGoodsSalesReport(list),
    getList:(target, con)=>target.props.reqGetSubOrderList('subOrderList', con)
  },
  {
    key:BASE_CONSTANTS.E_REPORT_TYPES.FOOTER,
    label:'VIP脚型数据',
    listOptions:getListOptions.bind(undefined, FOOTER_STATISTICS_COLS),
    listKey:'shoesOrderList',
    cols:FOOTER_STATISTICS_COLS,
    getReport:(target, list)=>target.report.getFooterReport(list),
    getList:(target, con)=>{
      if (!con) con = {};
      con.type = constants.BASE_CONSTANTS.E_ORDER_TYPE.SHOES;
      target.props.reqGetSubOrderList('shoesOrderList:subOrderList', con)
    }
  },
]
