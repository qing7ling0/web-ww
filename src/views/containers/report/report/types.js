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
  GOODS_STATISTICS_COLS 
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
    listOptions:getListOptions.bind(SHOP_SALSE_STATISTICS_COLS),
    listKey:'orderList',
    cols:SHOP_SALSE_STATISTICS_COLS
  },
  {
    key:BASE_CONSTANTS.E_REPORT_TYPES.GOODS,
    label:'商品销售报表',
    listOptions:getListOptions.bind(GOODS_STATISTICS_COLS),
    listKey:'subOrderList',
    cols:GOODS_STATISTICS_COLS
  },
]
