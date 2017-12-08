import React, { Component } from 'react';
import { Icon, Button } from 'antd'
import styled from 'styled-components'

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
    item.decoratorOptions.initialValue = target.props.data[item.name];
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
  return [
    { title: '名称', dataIndex: 'name', key: 'name'},
    { title: '编辑人', dataIndex: 'editor_name', key: 'editor_name'},
    { title: '编辑时间', dataIndex: 'editor_time', key: 'editor_time'},
    { title: '操作', dataIndex: 'id', key: 'id', render:(text, record, index)=>{
      return (<OpeateBtn type="primary" shape="circle" icon="delete" size="large" onClick={()=>target.onDelete([record._id])} />);
    }}
  ]
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

// 特殊定制
const getCustomListOptions = function(target) {
  return [
    { title: '名称', dataIndex: 'name', key: 'name'},
    { title: '价格', dataIndex: 'price', key: 'price', render:(text)=>text+' RMB'},
    { title: '编辑人', dataIndex: 'editor_name', key: 'editor_name'},
    { title: '编辑时间', dataIndex: 'editor_time', key: 'editor_time'},
    { title: '操作', dataIndex: 'id', key: 'id', render:(text, record, index)=>{
      return (<OpeateBtn type="primary" shape="circle" icon="delete" size="large" onClick={()=>target.onDelete([record._id])} />);
    }}
  ]
}
const getCustomAddOptions = function(target) {
  return [
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'number', name:'price', label:'价格', itemOptions:{hasFeedback:true}, options:{formatter:(value) => `${value} RMB`, parser:value => value.replace('RMB', '')}, rule:{required:true}},
  ];
}
const getCustomEditOptions = function(target) {
  let options = getCustomAddOptions(target);
  return defaultInitFormValue(options, target);
}

// 加急
const getUrgentListOptions = function(target) {
  return [
    { title: '天数', dataIndex: 'day', key: 'day'},
    { title: '价格', dataIndex: 'price', key: 'price', render:(text)=>text+' RMB'},
    { title: '编辑人', dataIndex: 'editor_name', key: 'editor_name'},
    { title: '编辑时间', dataIndex: 'editor_time', key: 'editor_time'},
    { title: '操作', dataIndex: 'id', key: 'id', render:(text, record, index)=>{
      return (<OpeateBtn type="primary" shape="circle" icon="delete" size="large" onClick={()=>target.onDelete([record._id])} />);
    }}
  ]
}
const getUrgentAddOptions = function(target) {
  return [
    {type:'number', name:'day', label:'天数', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'number', name:'price', label:'价格', itemOptions:{hasFeedback:true}, rule:{required:true}},
  ];
}
const getUrgentEditOptions = function(target) {
  let options = getUrgentAddOptions(target);
  return defaultInitFormValue(options, target);
}

// 原材料
const getMaterialListOptions = function(target) {
  let options = getMaterialBaseColumns(target);
  options.push({ title: '编辑人', dataIndex: 'editor_name', key: 'editor_name'});
  options.push({ title: '编辑时间', dataIndex: 'editor_time', key: 'editor_time'});
  options.push({ title: '操作', dataIndex: 'id', key: 'id', render:(text, record, index)=>{
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
const getMaterialAddOptions = function(target) {
  return [
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'select', name:'color', label:'颜色', selectItems:listToSelectOptions(target.props.materialColorList), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'number', name:'count', label:'数量', itemOptions:{hasFeedback:true}, rule:{required:true}},
  ];
} 
const getMaterialEditOptions = function(target) {
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

// 护理项目
const getMaintainBaseColumns = function(target) {
  return [
    { title: '名称', dataIndex: 'name', key: 'name'},
    { title: '价格', dataIndex: 'price', key: 'price',render:(item) => item+' RMB'},
    { title: '时间', dataIndex: 'time', key: 'time',render:(item) => item+' 天'},
  ]
}
const getMaintainListOptions = function(target) {
  let options = getMaintainBaseColumns(target);
  options.push({ title: '编辑人', dataIndex: 'editor_name', key: 'editor_name'});
  options.push({ title: '编辑时间', dataIndex: 'editor_time', key: 'editor_time'});
  options.push({ title: '操作', dataIndex: 'id', key: 'id', render:(text, record, index)=>{
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
const getMaintainAddOptions = function(target) {
  return [
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'number', name:'price', label:'价格', itemOptions:{hasFeedback:true}, options:{formatter:(value) => `${value} RMB`, parser:value => value.replace('RMB', '')}, rule:{required:true}},
    {type:'number', name:'time', label:'时间', itemOptions:{hasFeedback:true}, options:{formatter:(value) => `${value} 天`, parser:value => value.replace('天', '')}, rule:{required:true}},
  ];
} 
const getMaintainEditOptions = function(target) {
  let options = getMaintainAddOptions(target);
  return defaultInitFormValue(options, target);
}

export const COMMON_TYPES = [
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.GOODS_TYPE,
    tag:'goodsTypeList:commonList', label:'商品分类', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.GOODS_STYLE,
    tag:'goodsStyleList:commonList', label:'商品系列', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.GOODS_SEASON,
    tag:'goodsSeasonList:commonList', label:'商品季节', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.MATERIAL_COLOR,
    tag:'materialColorList:commonList', label:'原材料颜色', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_OUT_COLOR,
    tag:'outColorList:commonList', label:'鞋面颜色', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_IN_COLOR,
    tag:'inColorList:commonList', label:'里皮颜色', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_BOTTOM_COLOR,
    tag:'bottomColorList:commonList', label:'鞋底颜色', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_BOTTOM_SIDE_COLOR,
    tag:'bottomSideColorList:commonList', label:'底边颜色', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.XUAN_HAO,
    tag:'xuanHaoList:commonList', label:'鞋楦号', 
    graphqlType:graphqlTypes.xuanHaoType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_GUI_GE,
    tag:'guiGeList:commonList', label:'鞋规格', 
    graphqlType:graphqlTypes.guiGeType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_GEN_GAO,
    tag:'genGaoList:commonList', label:'鞋跟高', 
    graphqlType:graphqlTypes.genGaoType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.MAINTAIN,
    tag:'maintainList:commonList', label:'护理项目', 
    graphqlType:graphqlTypes.maintainType,
    listOptions:getMaintainListOptions,
    addOptions:getMaintainAddOptions,
    editOptions:getMaintainEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.CUSTOM,
    tag:'customList:commonList', label:'特殊定制', 
    graphqlType:graphqlTypes.customType,
    listOptions:getCustomListOptions,
    addOptions:getCustomAddOptions,
    editOptions:getCustomEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.URGENT,
    tag:'urgentList:commonList', label:'加急天数', 
    graphqlType:graphqlTypes.urgentType,
    listOptions:getUrgentListOptions,
    addOptions:getUrgentAddOptions,
    editOptions:getUrgentEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.WATCH_STRAP_STYLE,
    tag:'watchStrapStyleList:commonList', label:'表带类型', 
    graphqlType:graphqlTypes.watchStrapStyleType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_TIE_BIAN,
    tag:'shoesTieBianList:commonList', label:'鞋贴边', 
    graphqlType:graphqlTypes.shoesTieBianType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
]
