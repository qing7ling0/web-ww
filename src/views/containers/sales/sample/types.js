import React, { Component } from 'react';
import { Icon, Button } from 'antd'
import styled from 'styled-components'
import moment from 'moment'

import { commonUtils } from '../../../modules/common';
import * as constants from '../../../constants/Constants'
import * as optionsType from '../types'
import * as graphqlTypes from '../../../modules/graphqlTypes'
import * as orderTypes from '../../../modules/orderTypes'

import * as goodsTypes from '../goods/types'

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
const getSampleGoodsBaseColumns = function(target) {
  return [
    { title: '货号', dataIndex: 'NID', key: 'NID'},
    { title: '分类', dataIndex: 'type', key: 'type', render:(item) => {
      let type = commonUtils.getOrderType(item);
      if (type) return type.label;
      return '';
    }},
    { title: '店铺', dataIndex: 'shop', key: 'shop', render:(item) => item.name},
    { title: '数量', dataIndex: '_id', key: '_id', render:(item, record)=>{
      if (record.left_count && record.right_count) return '一双';
      if (record.left_count && !record.right_count) return '左脚';
      if (!record.left_count && record.right_count) return '右脚';
      return '无';
    }},
  ]
}

const getSampleGoodsShoesProfileOptions = function(target) {
  return {
    base: {
      title:'基础信息',
      options:getSampleGoodsBaseColumns(target)
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
        { title: '规格', dataIndex: 's_gui_ge', key: 's_gui_ge', render:(item) => item||''},
        { title: '跟高', dataIndex: 's_gen_gao', key: 's_gen_gao', render:(item) => item&&item.name||''},
        { title: '材质', dataIndex: 's_material', key: 's_material', render:(item) => item&&item.name||''},
        { title: '皮胚色', dataIndex: 's_out_color', key: 's_out_color', render:(item) => item&&item.name||''},
        { title: '内里色', dataIndex: 's_in_color', key: 's_in_color', render:(item) => item&&item.name||''},
        { title: '底板色', dataIndex: 's_bottom_color', key: 's_bottom_color', render:(item) => item&&item.name||''},
        { title: '底侧色', dataIndex: 's_bottom_side_color', key: 's_bottom_side_color', render:(item) => item&&item.name||''},
      ]
    }
  }
}
const getSampleGoodsShoesListOptions = function(target) {
  let options = getSampleGoodsShoesBaseColumns(target);
  options.push({ title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
    return (
      <div>
        <OpeateBtn type="primary" shape="circle" icon="edit" onClick={(e)=>{
          e.stopPropagation();
          target.onEditClick(record);
        }} />
      </div>
    );
  }})
  return options;
}
const getSampleGoodsShoesAddOptions = function(target) {
  return [
    {
      name:'基础数据',
      options: [
        {type:'select', name:'shop', label:'门店', itemOptions:{labelLeft:true}, selectItems:listToSelectOptions(target.props.shopList), options:{defaultActiveFirstOption:true, showSearch:true, optionFilterProp:'children'}, rule:{required:true}},    
        {type:'number', name:'s_left', label:'左脚', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
        {type:'number', name:'s_right', label:'右脚', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}}
      ]
    },
    {
      name:'商品数据',
      options: [
        {
          type:'select', name:'NID', label:'货号', 
          itemOptions:{labelLeft:true}, 
          selectItems:listToSelectOptions(target.props.sales.goodsShoesList, (item)=>item.NID, (item)=>item.NID+'-'+item.name), 
          decoratorOptions:{initialValue:target.state.NID},
          options:{
            defaultActiveFirstOption:true,
            showSearch:true,
            optionFilterProp:"children",
            filterOption:(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
            onChange:target.onNIDChange, 
            onFocus:target.onNIDFocus,
            onSelect:target.onNIDSelect,
          }, 
          rule:{required:true}
        },    
        { type:'text', name:'s_xuan_hao', label:'楦型', itemOptions:{labelLeft:true}, rule:{required:true} },
        { type:'text', name:'s_material', label:'材料', itemOptions:{labelLeft:true}, rule:{required:true} },   
        { type:'text', name:'sex', label:'性别', itemOptions:{labelLeft:true}, rule:{required:true} },
        { type:'input', name:'s_gui_ge', label:'规格', itemOptions:{labelLeft:true}, options:{onChange:(value)=>target.onNIDPropertyChange('s_gui_ge', value)}, rule:{required:false}},   
        {
          type:'select', name:'s_color_palette', label:'颜色', itemOptions:{labelLeft:true}, 
          selectItems:[{label:'自定义', value:''}].concat(listToSelectOptions(target.props.sales.colorPaletteList)), 
          options:{
            defaultActiveFirstOption:true,
            onChange:(value)=>target.onNIDPropertyChange('s_color_palette', value)
          }, 
          rule:{required:false}
        },
        {type:'text', name:'s_out_color', label:'皮胚色', itemOptions:{labelLeft:true}, rule:{required:true}},    
        {type:'text', name:'s_in_color', label:'内里色', itemOptions:{labelLeft:true}, rule:{required:true}},  
        {type:'text', name:'s_bottom_side_color', label:'底侧色', itemOptions:{labelLeft:true}, rule:{required:true}},   
        {
          type:'select', name:'s_bottom_color', label:'底板色', itemOptions:{labelLeft:true}, 
          selectItems:listToSelectOptions(target.props.sales.bottomColorList, (item)=>item.name), 
          options:{
            defaultActiveFirstOption:true, 
            mode:"combobox", 
            filterOption:false, 
            onChange:(value)=>target.onColorChange('s_bottom_color', value)
          }, 
          rule:{required:true}
        },
        {
          type:'select', name:'s_tie_di', label:'贴底', itemOptions:{labelLeft:true}, 
          selectItems:listToSelectOptions(target.props.sales.shoesTieBianList, (item)=>item.name), 
          options:{
            defaultActiveFirstOption:true,
            mode:"combobox", 
            filterOption:false, 
            onChange:(value)=>target.onNIDPropertyChange('s_tie_di', value)
          }, 
          rule:{required:false}
        }
      ]
    },
  ]
} 
const getSampleGoodsShoesEditOptions = function(target) {
  let options = getSampleGoodsShoesAddOptions(target);
  return defaultInitFormValue(options, target);
}

const getSampleGoodsBeltProfileOptions = function(target) {
  return {
    base: {
      title:'基础信息',
      options:getSampleGoodsBaseColumns(target)
    },
    size: {
      title:'测量信息',
      options: [
        { title: 'A', dataIndex: 'b_A', key: 'b_A'},
        { title: 'B', dataIndex: 'b_B', key: 'b_B'},
        { title: 'C', dataIndex: 'b_C', key: 'b_C'},
        { title: 'D', dataIndex: 'b_D', key: 'b_D'},
      ]
    },
    goods: {
      title:'详细信息',
      options: [
        { title: '名称', dataIndex: 'name', key: 'name'},
        { title: '性别', dataIndex: 'sex', key: 'sex'},
        { title: '材质', dataIndex: 'b_material', key: 'b_material', render:(item) => item.name},
        { title: '颜色', dataIndex: 'b_color', key: 'b_color', render:(item) => item.name},
      ]
    }
  }
}
const getSampleGoodsBeltListOptions = function(target) {
  let options = getSampleGoodsBeltBaseColumns(target);
  options.push({ title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
    return (
      <div>
        <OpeateBtn type="primary" shape="circle" icon="edit" onClick={(e)=>{
          e.stopPropagation();
          target.onEditClick(record);
        }} />
      </div>
    );
  }})
  return options;
}
const getSampleGoodsBeltAddOptions = function(target) {
  return [
    {type:'select', name:'shop', label:'门店', itemOptions:{labelLeft:true}, selectItems:listToSelectOptions(target.props.shopList), options:{defaultActiveFirstOption:true, showSearch:true, optionFilterProp:'children'}, rule:{required:true}},    
    {type:'number', name:'b_A', label:'A', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'number', name:'b_B', label:'B', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'number', name:'b_C', label:'C', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'number', name:'b_D', label:'D', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'number', name:'count', label:'数量', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
  ];
} 
const getSampleGoodsBeltEditOptions = function(target) {
  let options = getSampleGoodsBeltAddOptions(target);
  return defaultInitFormValue(options, target);
}

// 表带
const getSampleGoodsWatchStrapBaseColumns = function(target) {
  return [
    { title: '货号', dataIndex: 'NID', key: 'NID'},
    { title: '名称', dataIndex: 'name', key: 'name'},
    { title: '价格', dataIndex: 'price', key: 'price_label', render:(item) => item+'RMB'},
    { title: '分类', dataIndex: 'type', key: 'type_label', render:(item) => item.name},
    { title: '系列', dataIndex: 'style', key: 'style_label', render:(item) => item.name},
    { title: '季节', dataIndex: 'season', key: 'season_label', render:(item) => item.name},
    { title: '性别', dataIndex: 'sex', key: 'sex'},
    // { title: '保养周期', dataIndex: 'ws_material', key: 'maintain_cycle', render:(item) => (item&&item.maintain_cycle||0)+' 天'},    
    { title: '上架时间', dataIndex: 'put_date', key: 'put_date_label', render:(item) => moment(item).format('YYYY-MM-DD')},
  ]
}
const getSampleGoodsWatchStrapProfileOptions = function(target) {
  return {
    base: {
      title:'基础信息',
      options:getSampleGoodsBaseColumns(target)
    },
    size: {
      title:'测量信息',
      options: [
        { title: 'A', dataIndex: 'ws_A', key: 'ws_A'},
        { title: 'B', dataIndex: 'ws_B', key: 'ws_B'},
        { title: 'C', dataIndex: 'ws_C', key: 'ws_C'},
        { title: 'D', dataIndex: 'ws_D', key: 'ws_D'},
        { title: 'E', dataIndex: 'ws_E', key: 'ws_E'},
        { title: 'F', dataIndex: 'ws_F', key: 'ws_F'},
        { title: 'G', dataIndex: 'ws_G', key: 'ws_G'},
      ]
    },
    goods: {
      title:'详细信息',
      options: [
        { title: '名称', dataIndex: 'name', key: 'name'},
        { title: '性别', dataIndex: 'sex', key: 'sex'},
        { title: '材质', dataIndex: 'ws_material', key: 'ws_material', render:(item) => item.name},
        { title: '类别', dataIndex: 'ws_style', key: 'ws_style', render:(item) => item && item.name || ''},
        { title: '颜色', dataIndex: 'ws_color', key: 'ws_color', render:(item) => item && item.name || ''},
      ]
    }
  }
}
const getSampleGoodsWatchStrapListOptions = function(target) {
  let options = getSampleGoodsWatchStrapBaseColumns(target);
  options.push({ title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
    return (
      <div>
        <OpeateBtn type="primary" shape="circle" icon="edit" onClick={(e)=>{
          e.stopPropagation();
          target.onEditClick(record);
        }} />
      </div>
    );
  }})
  return options;
}
const getSampleGoodsWatchStrapAddOptions = function(target) {
  return [
    {type:'select', name:'shop', label:'门店', itemOptions:{labelLeft:true}, selectItems:listToSelectOptions(target.props.shopList), options:{defaultActiveFirstOption:true, showSearch:true, optionFilterProp:'children'}, rule:{required:true}},    
    {type:'number', name:'ws_A', label:'A', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'number', name:'ws_B', label:'B', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'number', name:'ws_C', label:'C', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'number', name:'ws_D', label:'D', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'number', name:'ws_E', label:'E', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'number', name:'ws_F', label:'F', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'number', name:'ws_G', label:'G', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'number', name:'count', label:'数量', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
  ];
} 
const getSampleGoodsWatchStrapEditOptions = function(target) {
  let options = getSampleGoodsWatchStrapAddOptions(target);
  return defaultInitFormValue(options, target);
}

// 配饰
const getSampleGoodsOrnamentProfileOptions = function(target) {
  return {
    base: {
      title:'基础信息',
      options:getSampleGoodsBaseColumns(target).push([
        { title: '名称', dataIndex: 'o_name', key: 'o_name'},
        { title: '性别', dataIndex: 'sex', key: 'sex'},
      ])
    },
  }
}
const getSampleGoodsOrnamentListOptions = function(target) {
  let options = getSampleGoodsOrnamentBaseColumns(target);
  options.push({ title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
    return (
      <div>
        <OpeateBtn type="primary" shape="circle" icon="edit" size="large" onClick={(e)=>{
          e.stopPropagation();
          target.onEditClick(record);
        }} />
      </div>
    );
  }})
  return options;
}
const getSampleGoodsOrnamentAddOptions = function(target) {
  return [
    {type:'select', name:'shop', label:'门店', itemOptions:{labelLeft:true}, selectItems:listToSelectOptions(target.props.shopList), options:{defaultActiveFirstOption:true, showSearch:true, optionFilterProp:'children'}, rule:{required:true}},    
    {type:'number', name:'count', label:'数量', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
  ];
} 
const getSampleGoodsOrnamentEditOptions = function(target) {
  let options = getSampleGoodsOrnamentAddOptions(target);
  return defaultInitFormValue(options, target);
}

export const GOODS_TYPES = [
  {
    key:BASE_CONSTANTS.GOODS_SHOES,
    listTag:'sampleShoesList:sampleGoodsList', tag:'sampleGoodsList', label:'鞋', 
    graphqlType:graphqlTypes.sampleGoodsType,
    listOptions:getSampleGoodsBaseColumns,
    addOptions:getSampleGoodsShoesAddOptions,
    editOptions:getSampleGoodsShoesEditOptions,
    profileOptions:getSampleGoodsShoesProfileOptions,
  },
  {
    key:BASE_CONSTANTS.GOODS_BELT,
    listTag:'sampleBeltList:sampleGoodsList', tag:'sampleGoodsList', label:'皮带', 
    graphqlType:graphqlTypes.sampleGoodsType,
    listOptions:getSampleGoodsBaseColumns,
    addOptions:getSampleGoodsBeltAddOptions,
    editOptions:getSampleGoodsBeltEditOptions,
    profileOptions:getSampleGoodsBeltProfileOptions,
  },
  {
    key:BASE_CONSTANTS.GOODS_WATCH_STRAP,
    listTag:'sampleWatchStrapList:sampleGoodsList', tag:'sampleGoodsList', label:'表带', 
    graphqlType:graphqlTypes.sampleGoodsType,
    listOptions:getSampleGoodsBaseColumns,
    addOptions:getSampleGoodsWatchStrapAddOptions,
    editOptions:getSampleGoodsWatchStrapEditOptions,
    profileOptions:getSampleGoodsWatchStrapProfileOptions,
  },
  {
    key:BASE_CONSTANTS.GOODS_ORNAMENT,
    listTag:'sampleOrnamentList:sampleGoodsList', tag:'sampleGoodsList', label:'配饰', 
    graphqlType:graphqlTypes.sampleGoodsType,
    listOptions:getSampleGoodsBaseColumns,
    addOptions:getSampleGoodsOrnamentAddOptions,
    editOptions:getSampleGoodsOrnamentEditOptions,
    profileOptions:getSampleGoodsOrnamentProfileOptions,
  }
]
