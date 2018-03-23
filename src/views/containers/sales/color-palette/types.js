import React, { Component } from 'react';
import { Icon, Button } from 'antd'
import styled from 'styled-components'

import * as constants from '../../../constants/Constants'
import { commonUtils } from '../../../modules/common';
import * as orderTypes from '../order/types'

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

export const getColorPaletteListOptions = function(target) {
  let options = getColorPaletteBaseColumns(target);
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

export const getColorPaletteAddOptions = function(target) {
  return [
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'input', name:'NID', label:'编号', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'select', name:'out_color', label:'皮胚色', selectItems:listToSelectOptions(target.props.sales.outColorList), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'in_color', label:'内里色', selectItems:listToSelectOptions(target.props.sales.inColorList), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'bottom_color', label:'底板色', selectItems:listToSelectOptions(target.props.sales.bottomColorList), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'bottom_side_color', label:'底侧色', selectItems:listToSelectOptions(target.props.sales.bottomSideColorList), options:{defaultActiveFirstOption:true}, rule:{required:true}},
  ];
} 

export const getColorPaletteEditOptions = function(target) {
  let options = getColorPaletteAddOptions(target);

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

export const getColorPaletteBaseColumns = function(target) {
  return [
    { title: '名称', dataIndex: 'name', key: 'name'},
    { title: '编号', dataIndex: 'NID', key: 'NID'},
    { title: '皮胚色', dataIndex: 'out_color', key: 'out_color', render:(item) => item&&item.name||''},
    { title: '内里色', dataIndex: 'in_color', key: 'in_color', render:(item) => item&&item.name||''},
    { title: '底板色', dataIndex: 'bottom_color', key: 'bottom_color', render:(item) => item&&item.name||''},
    { title: '底侧色', dataIndex: 'bottom_side_color', key: 'bottom_side_color', render:(item) => item&&item.name||''}
  ]
}