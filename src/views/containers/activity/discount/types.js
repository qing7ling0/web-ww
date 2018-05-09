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

// discount
const getListOptions = function(target) {
  let options = [
    { title: '名称', dataIndex: 'name', key: 'name', className:"table-column-left"},
    { title: '类型', dataIndex: 'discount_type', key: 'discount_type', className:"table-column-left", render: (item) => {
      let info = commonUtils.getValueByList(constants.BASE_CONSTANTS.ACTIVITY_DISCOUNT_TYPE_DATAS, item);
      return info ? info.label : '无';
    }},
    { title: '折扣', dataIndex: 'discount', key: 'discount', className:"table-column-left", render:(text)=>text},
    { title: '是否可用', dataIndex: 'enabled', key: 'enabled', render:item=>item?("是"):(<span style={{color:'red'}}>否</span>)},
  ]

  if (target.canOperate()) {
    options.push({
      title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
        return (
          <div>
            <OpeateBtn type="primary" shape="circle" icon="delete" onClick={(e)=>{
              e.stopPropagation();
              target.onDelete([record._id])}
            } />
            <OpeateBtn type="primary" shape="circle" icon="edit" onClick={(e)=>{
              e.stopPropagation();
              target.onEditClick(record);
            }} />
          </div>
        );
      }
    })
  }

  return options;
}
const getAddOptions = function(target) {
  return [
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, options:{}, rule:{required:true}},
    {type:'select', name:'discount_type', label:'类型', selectItems:constants.BASE_CONSTANTS.ACTIVITY_DISCOUNT_TYPE_DATAS, options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'number', name:'discount', label:'折扣', itemOptions:{hasFeedback:true}, options:{}, rule:{required:true}},
    {type:'switch', name:'enabled', label:'是否可用', decoratorOptions:{valuePropName:"checked"}, rule:{required:true}},  
  ];
}
const getEditOptions = function(target) {
  let options = getAddOptions(target);
  return defaultInitFormValue(options, target);
}

export const TYPES = [
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.ACTIVITY_DISCOUNT,
    tag:'commonList', listTag:'discountList:commonList', label:'折扣活动', 
    graphqlType:graphqlTypes.activityDiscountType,
    listOptions:getListOptions,
    addOptions:getAddOptions,
    editOptions:getEditOptions,
  },
]
