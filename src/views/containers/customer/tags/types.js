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
const getSalesBaseListOptions = function(target) {
  let options = [
    { title: '名称', dataIndex: 'name', key: 'name', className:"table-column-left"},
    { title: '编辑人', dataIndex: 'editor_name', width:'120', key: 'editor_name'}
  ]

  if (target.canOperate()) {
    options.push({
      title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
        return (<OpeateBtn type="primary" shape="circle" icon="delete" onClick={(e)=>{
          e.stopPropagation();
          target.onDelete([record._id])}
        } />);
      }
    })
  }

  return options;
}
const getSalesBaseAddOptions = function(target) {
  return [
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
  ];
}
const getSalesBaseEditOptions = function(target) {
  let options = getSalesBaseAddOptions(target);
  return defaultInitFormValue(options, target);
}

export const TYPES = [
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.CUSTOMER_TAGS,
    tag:'commonList', listTag:'customerTagList:commonList', label:'客户标签', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions
  }
]
