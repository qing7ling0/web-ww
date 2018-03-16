import React, { Component } from 'react';
import { Icon, Button } from 'antd'
import styled from 'styled-components'

import { commonUtils } from '../../../modules/common';
import * as constants from '../../../constants/Constants'
import * as graphqlTypes from '../../../modules/graphqlTypes'
import * as orderTypes from '../../../modules/orderTypes'

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

// 基础
const getBaseListOptions = function(target) {
  let options = [
    { title: '名称', dataIndex: 'name', key: 'name', className:"table-column-left"},
    { title: '颜色', dataIndex: 'css_color', key: 'css_color'}
  ]

  return options;
}

export const TYPES = [
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.CUSTOMER_ANALYSE_CONFIG,
    tag:'commonList', listTag:'customerAnalyseList:commonList', label:'会员分析配置', 
    graphqlType:graphqlTypes.customerAnalyseType,
    listOptions:getBaseListOptions,
  }
]
