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

// vip
const getListOptions = function(target) {
  let options = [
    { title: '等级', dataIndex: 'level', key: 'level', className:"table-column-left", render:(text)=>text+' 级'},
    { title: '升级积分', dataIndex: 'exp', key: 'exp', className:"table-column-left", render:(text)=>text+' RMB'},
    { title: '折扣', dataIndex: 'discount', key: 'discount', className:"table-column-left", render:(text)=>text+' 折'},
  ]

  if (target.canOperate()) {
    options.push({
      title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
        return (<OpeateBtn type="primary" shape="circle" icon="delete" size="large" onClick={(e)=>{
          e.stopPropagation();
          target.onDelete([record._id])}
        }
        />);
      }
    })
  }

  return options;
}
const getAddOptions = function(target) {
  return [
    {type:'number', name:'level', step:1, label:'等级', itemOptions:{hasFeedback:true}, options:{formatter:(value) => `${value}级`, parser:value => value.replace('级', '')}, rule:{required:true}},
    {type:'number', name:'exp', step:1, label:'升级积分', itemOptions:{hasFeedback:true}, options:{rule:{required:true}}},
    {type:'number', name:'discount', label:'折扣', itemOptions:{hasFeedback:true}, options:{formatter:(value) => `${value}折`, parser:value => value.replace('折', '')}, rule:{required:true}},
  ];
}
const getEditOptions = function(target) {
  let options = getAddOptions(target);
  return defaultInitFormValue(options, target);
}

export const TYPES = [
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.VIP,
    tag:'commonList', listTag:'vipList:commonList', label:'VIP等级', 
    graphqlType:graphqlTypes.vipLevelType,
    listOptions:getListOptions,
    addOptions:getAddOptions,
    editOptions:getEditOptions,
  },
]
