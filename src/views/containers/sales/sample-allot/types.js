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
  // sample: {type:sampleGoodsType},
  // left_count: {type: GraphQLInt, decription:'左脚数量'},
  // right_count: {type: GraphQLInt, decription:'右脚数量'},
  // status: {type: GraphQLInt, decription:'状态'},
  // apply_shop: {type:sampleAllotBaseType, decription:'申请的店铺'},
  // apply_user: {type:sampleAllotBaseType, decription:'申请人'},
  // goods_user: {type:sampleAllotBaseType, decription:'商品部跟进人'},
  // accept_shop: {type:sampleAllotBaseType, decription:'申请的店铺'},
  // accept_shop_guide: {type:sampleAllotBaseType, decription:'店铺负责人'},
  // transport_company: {type:GraphQLString, decription:'快递公司'},
  // transport_id: {type:GraphQLString, decription:'快递单号'},
  // transport_phone: {type:GraphQLString, decription:'联系电话'},
  // ...commonFields.defaultCreateFields,
  return [
    { title: '编号', dataIndex: 'NID', key: 'NID', render:item=>item.sample&&item.sample.NID || ""},
    { title: '状态', dataIndex: 'status', key: 'status', render:(item) => {
      let type = commonUtils.getValueByList(constants.BASE_CONSTANTS.SAMPLE_ALLOT_STATUS_DATAS, item);
      return type&&type.label||'';
    }},
    { title: '申请的店铺', dataIndex: 'apply_shop', key: 'apply_shop', render:(item) => item&&item.name||''},
    { title: '申请人', dataIndex: 'apply_user', key: 'apply_user', render:(item) => item&&item.name||''},
    { title: '样品店铺', dataIndex: 'accept_shop', key: 'accept_shop', render:(item) => item&&item.name||''},
    { title: '快递公司', dataIndex: 'transport_company', key: 'transport_company'},
    { title: '快递单号', dataIndex: 'transport_id', key: 'transport_id'},
    { title: '联系电话', dataIndex: 'transport_phone', key: 'transport_phone'},
    { title: '数量', dataIndex: '_id', key: '_id', render:(item, record)=>{
      if (record.left_count && record.right_count) return '一双';
      if (record.left_count && !record.right_count) return '左脚';
      if (!record.left_count && record.right_count) return '右脚';
      return '无';
    }},
  ]
}


export const GOODS_TYPES = [
  {
    key:BASE_CONSTANTS.GOODS_SHOES,
    listTag:'sampleAllotList', tag:'sampleAllotList', label:'鞋', 
    graphqlType:graphqlTypes.sampleAllotType,
    listOptions:getSampleAllotColumns
  },
]
