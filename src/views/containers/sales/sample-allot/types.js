import React, { Component } from 'react';
import { Icon, Button } from 'antd'
import styled from 'styled-components'
import moment from 'moment'

import { commonUtils } from '../../../modules/common';
import * as constants from '../../../constants/Constants'
import * as optionsType from '../types'
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
const getSampleAllotColumns = function(target) {
  return [
    { title: '编号', dataIndex: 'NID', key: 'NID'},
    { title: '分类', dataIndex: 'type', key: 'type', render:(item) => {
      let type = commonUtils.getOrderType(item);
      if (type) return type.label;
      return '';
    }},
    { title: '店铺', dataIndex: 'shop', key: 'shop', render:(item) => item.name},
  ]
}

const getSampleAllotProfileOptions = function(target) {
  return {
    base: {
      title:'基础信息',
      options:getSampleAllotColumns(target)
    },
    size: {
      title:'测量信息',
      options: [
        {title: '左右脚', dataIndex: 's_right', key: 's_right', render:(item) => item?"右脚":"左脚"},
        {title: '尺寸', dataIndex: 's_foot_size', key: 's_foot_size'},
        {title: '长度', dataIndex: 's_length', key: 's_length'},
        {title: '趾围', dataIndex: 's_zhiWei', key: 's_zhiWei'},
        {title: '附维', dataIndex: 's_fuWei', key: 's_fuWei'},
      ]
    },
    goods: {
      title:'详细信息',
      options: [
        { title: '名称', dataIndex: 'name', key: 'name'},
        { title: '性别', dataIndex: 'sex', key: 'sex'},
        { title: '楦号', dataIndex: 's_xuan_hao', key: 's_xuan_hao', render:(item) => item&&item.name||''},
        { title: '规格', dataIndex: 's_gui_ge', key: 's_gui_ge', render:(item) => item&&item.name||''},
        { title: '跟高', dataIndex: 's_gen_gao', key: 's_gen_gao', render:(item) => item&&item.name||''},
        { title: '材质', dataIndex: 's_material', key: 's_material', render:(item) => item&&item.name||''},
        { title: '鞋面颜色', dataIndex: 's_out_color', key: 's_out_color', render:(item) => item&&item.name||''},
        { title: '里皮颜色', dataIndex: 's_in_color', key: 's_in_color', render:(item) => item&&item.name||''},
        { title: '鞋底颜色', dataIndex: 's_bottom_color', key: 's_bottom_color', render:(item) => item&&item.name||''},
        { title: '底边颜色', dataIndex: 's_bottom_side_color', key: 's_bottom_side_color', render:(item) => item&&item.name||''},
      ]
    }
  }
}

export const GOODS_TYPES = [
  {
    key:BASE_CONSTANTS.GOODS_SHOES,
    listTag:'sampleAllotList', tag:'sampleAllotList', label:'鞋', 
    graphqlType:graphqlTypes.sampleAllotType,
    listOptions:getSampleAllotColumns,
    profileOptions:getSampleAllotProfileOptions,
  },
]
