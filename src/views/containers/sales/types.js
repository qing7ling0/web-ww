import React, { Component } from 'react';
import { Icon, Button } from 'antd'
import styled from 'styled-components'

import * as constants from '../../constants/Constants'
import { commonUtils } from '../../modules/common';
import * as orderTypes from './order/types'

const OpeateBtn = styled(Button)`
  margin: 0 0.05rem;
`

const listToSelectOptions = (list, valueFormat, labelFormat) => {
  return list.map((item) => {
    let ret = {_id:item._id};
    ret.value = valueFormat ? valueFormat(item) : item._id;
    ret.label = labelFormat ? labelFormat(item) : item.name;
    return ret;
  })
}

export const getMaterialListOptions = function(target) {
  let options = getMaterialBaseColumns(target);
  options.push({ title: '编辑人', dataIndex: 'editor_name', key: 'editor_name', width:120});
  options.push({ title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
    return (
      <div>
        <OpeateBtn type="primary" shape="circle" icon="delete" size="large" onClick={(e)=>{
          e.stopPropagation();
          target.onDelete([record._id])
        }} />
      </div>
    );
  }})
  return options;
}

export const getMaterialAddOptions = function(target) {
  return [
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'input', name:'NID', label:'编号', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'select', name:'color', label:'颜色', selectItems:listToSelectOptions(target.props.materialColorList), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'number', name:'count', label:'数量', itemOptions:{hasFeedback:true}, rule:{required:true}},
  ];
} 

export const getMaterialEditOptions = function(target) {
  let options = getMaterialAddOptions(target);

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

export const getMaterialBaseColumns = function(target) {
  return [
    { title: '名称', dataIndex: 'name', key: 'name'},
    { title: '编号', dataIndex: 'NID', key: 'NID'},
    { title: '颜色', dataIndex: 'color', key: 'color', render:(item) => item.name},
    { title: '数量', dataIndex: 'count', key: 'count'},
  ]
}