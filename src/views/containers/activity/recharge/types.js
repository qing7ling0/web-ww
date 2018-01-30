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

// 充值
const getListOptions = function(target) {
  let options = [
    { title: '充值金额', dataIndex: 'mount', key: 'mount', className:"table-column-left", render:(text)=>text+' RMB'},
    { title: '赠送金额', dataIndex: 'reward', key: 'reward', className:"table-column-left", render:(text)=>text+' RMB'},
  ]

  if (target.canOperate()) {
    options.push({
      title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
        return (<OpeateBtn type="primary" shape="circle" icon="delete" size="large" onClick={()=>target.onDelete([record._id])} />);
      }
    })
  }

  return options;
}
const getAddOptions = function(target) {
  return [
    {type:'number', name:'mount', step:1, label:'充值金额', itemOptions:{hasFeedback:true}, options:{formatter:(value) => `${value}RMB`, parser:value => value.replace('RMB', '')}, rule:{required:true}},
    {type:'number', name:'reward', step:1, label:'赠送金额', itemOptions:{hasFeedback:true}, options:{formatter:(value) => `${value}RMB`, parser:value => value.replace('RMB', '')}, rule:{required:true}},
  ];
}
const getEditOptions = function(target) {
  let options = getAddOptions(target);
  return defaultInitFormValue(options, target);
}

export const TYPES = [
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.RECHARGE_REWARD,
    tag:'commonList', listTag:'rechargeList:commonList', label:'充值奖励', 
    graphqlType:graphqlTypes.rechargeType,
    listOptions:getListOptions,
    addOptions:getAddOptions,
    editOptions:getEditOptions,
  },
]
