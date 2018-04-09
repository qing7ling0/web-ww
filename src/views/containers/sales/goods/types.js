import React, { Component } from 'react';
import { Icon, Button, Row, Col } from 'antd'
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
const getGoodsShoesBaseColumns = function(target) {
  return [
    { title: '货号', dataIndex: 'NID', key: 'NID'},
    { title: '名称', dataIndex: 'name', key: 'name'},
    { title: '价格', dataIndex: 'price', key: 'price_label', render:(item) => item+' RMB'},
    { title: '分类', dataIndex: 'type', key: 'type_label', render:(item) => item&&item.name||''},
    { title: '系列', dataIndex: 'style', key: 'style_label', render:(item) => item&&item.name||''},
    { title: '季节', dataIndex: 'season', key: 'season_label', render:(item) => item&&item.name||''},
    { title: '性别', dataIndex: 'sex', key: 'sex'},
    { title: '楦号', dataIndex: 's_xuan_hao', key: 's_xuan_hao', render:(item) => item&&item.name||''},
    { title: '跟高', dataIndex: 's_gen_gao', key: 's_gen_gao', render:(item, record) => record&&record.sex===constants.BASE_CONSTANTS.SEX_FEMALE&&item&&item.name||'无'},
    { title: '材质', dataIndex: 's_material', key: 's_material', render:(item) => item&&item.name||''},
    { title: '贴底', dataIndex: 's_tie_di', key: 's_tie_di', render:(item) => item&&item.name||''},
    { title: '规格', dataIndex: 's_gui_ge', key: 's_gui_ge', render:(item) => item||''},
    { title: '皮胚色', dataIndex: 's_out_color', key: 's_out_color', render:(item) => item&&item.name||''},
    { title: '内里色', dataIndex: 's_in_color', key: 's_in_color', render:(item) => item&&item.name||''},
    { title: '底板色', dataIndex: 's_bottom_color', key: 's_bottom_color', render:(item) => item&&item.name||''},
    { title: '底侧色', dataIndex: 's_bottom_side_color', key: 's_bottom_side_color', render:(item) => item&&item.name||''},
    { title: '保养周期', dataIndex: 's_material', key: 'maintain_cycle', render:(item) => (item&&item.maintain_cycle||0)+' 天'},
    { title: '上架时间', dataIndex: 'put_date', key: 'put_date_label', render:(item) => item&&moment(item).format('YYYY-MM-DD')||''},
  ]
}
const getGoodsShoesProfileOptions = function(target) {
  let options = getGoodsShoesBaseColumns(target);
  return options;
}
const getGoodsShoesListOptions = function(target) {
  let options = getGoodsShoesBaseColumns(target);
  if (target.canOperate()) {
    options.push(
      { title: '上下架', dataIndex: 'id', key: 'id2', width:80, className:"table-column-center", render:(text, record, index)=>{
      return (
        <div>
          <OpeateBtn type={record&&record.put?"danger":"primary"} onClick={(e)=>{
            e.stopPropagation();
            target.onPut(record._id, !record.put)
          }}>{record&&record.put?"下架":"上架"}</OpeateBtn>
        </div>
      );
    }})
    options.push(
      { title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
        return (
          <div>
              <OpeateBtn type="primary" shape="circle" icon="delete" onClick={(e)=>{
                e.stopPropagation();
                target.onDelete([record._id])
              }} />
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
const getGoodsShoesAddOptions = function(target) {
  let genGao = [
  ];
  if (target.isFemale()) {
    genGao.push({type:'select', name:'s_gen_gao', label:'跟高', selectItems:listToSelectOptions(target.props.sales['genGaoList']), options:{defaultActiveFirstOption:true}, rule:{required:true}});
  }
  let colorPaletteList = [{label:'自定义', value:''}].concat(listToSelectOptions(target.props.sales.colorPaletteList));
  return [
    {type:'input', name:'NID', label:'货号', itemOptions:{hasFeedback:true}},
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'upload', name:'pics', label:'图片',  itemOptions:{hasFeedback:true}, render:target.renderPicUpload, rule:{required:true}},
    {type:'number', name:'price', label:'价格', options:{formatter:(value) => `${value}RMB`, parser:value => value.replace('RMB', '')}, itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'select', name:'type', label:'分类', selectItems:listToSelectOptions(target.props.sales['goodsTypeList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'style', label:'系列', selectItems:listToSelectOptions(target.props.sales['goodsStyleList']), options:{defaultActiveFirstOption:true}, rule:{}},
    {type:'select', name:'season', label:'季节', selectItems:listToSelectOptions(target.props.sales['goodsSeasonList']), options:{defaultActiveFirstOption:true}, rule:{}},
    {type:'select', name:'sex', label:'性别', selectItems:constants.BASE_CONSTANTS.SEX_DATA, options:{defaultActiveFirstOption:true, onChange:target.onSexChange}, rule:{required:true}},
    
    {type:'select', name:'s_xuan_hao', label:'楦号', selectItems:listToSelectOptions(target.props.sales['xuanHaoList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'s_tie_di', label:'贴底', selectItems:listToSelectOptions(target.props.sales['shoesTieBianList']), options:{defaultActiveFirstOption:true}, rule:{required:false}},
    {type:'select', name:'s_material', label:'材质', selectItems:listToSelectOptions(target.props.sales['materialList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'input', name:'s_gui_ge', label:'规格', itemOptions:{hasFeedback:true}, rule:{required:false}},
    // {type:'select', name:'s_gui_ge', label:'规格', selectItems:listToSelectOptions(target.props.sales['guiGeList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    ...genGao,
    {
      type:'select', name:'s_color_palette', label:'颜色', 
      selectItems:colorPaletteList, 
      options:{
        defaultActiveFirstOption:true,
        onChange:(value)=>target.onColorPaletteChange('s_color_palette', value)
      }, 
      rule:{required:false}
    },
    // {type:'text', name:'s_out_color', label:'皮胚色', options:{render:(value)=>target.renderColor(target.props.sales['outColorList'], value)}},
    // {type:'text', name:'s_in_color', label:'内里色', options:{render:(value)=>target.renderColor(target.props.sales['inColorList'], value)}},
    // {type:'text', name:'s_bottom_color', label:'底板色', options:{render:(value)=>target.renderColor(target.props.sales['bottomColorList'], value)}},
    // {type:'text', name:'s_bottom_side_color', label:'底侧色', options:{render:(value)=>target.renderColor(target.props.sales['bottomSideColorList'], value)}},
    {
      type:'select', name:'s_out_color', label:'皮胚色', 
      selectItems:listToSelectOptions(target.props.sales['outColorList']), 
      options:{
        defaultActiveFirstOption:true,
        onChange:(value)=>target.onColorChange('s_out_color', value)
      }, 
      rule:{required:true}
    },
    {
      type:'select', name:'s_in_color', label:'内里色', 
      selectItems:listToSelectOptions(target.props.sales['inColorList']), 
      options:{
        defaultActiveFirstOption:true,
        onChange:(value)=>target.onColorChange('s_in_color', value)
      }, 
      rule:{required:true}
    },
    {
      type:'select', name:'s_bottom_color', label:'底板色', 
      selectItems:listToSelectOptions(target.props.sales['bottomColorList']), 
      options:{
        defaultActiveFirstOption:true,
        onChange:(value)=>target.onColorChange('s_bottom_color', value)
      }, 
      rule:{required:true}
    },
    {
      type:'select', name:'s_bottom_side_color', label:'底侧色', 
      selectItems:listToSelectOptions(target.props.sales['bottomSideColorList']), 
      options:{
        defaultActiveFirstOption:true,
        onChange:(value)=>target.onColorChange('s_bottom_side_color', value)
      }, 
      rule:{required:true}
    },
    
    {type:'datePicker', name:'put_date', label:'上架时间', rule:{required:true}},
  ];
} 
const getGoodsShoesEditOptions = function(target) {
  let options = getGoodsShoesAddOptions(target);
  return defaultInitFormValue(options, target);
}

// 皮带
const getGoodsBeltBaseColumns = function(target) {
  return [
    { title: '货号', dataIndex: 'NID', key: 'NID'},
    { title: '名称', dataIndex: 'name', key: 'name'},
    { title: '价格', dataIndex: 'price', key: 'price_label', render:(item) => item+'RMB'},
    { title: '分类', dataIndex: 'type', key: 'type_label', render:(item) => item&&item.name||''},
    { title: '系列', dataIndex: 'style', key: 'style_label', render:(item) => item&&item.name||''},
    { title: '季节', dataIndex: 'season', key: 'season_label', render:(item) => item&&item.name||''},
    { title: '性别', dataIndex: 'sex', key: 'sex'},
    { title: '材质', dataIndex: 'b_material', key: 'b_material', render:(item) => item&&item.name||''},
    { title: '颜色', dataIndex: 'b_color', key: 'b_color', render:(item) => item&&item.name||''},
    { title: '保养周期', dataIndex: 'b_material', key: 'maintain_cycle', render:(item) => (item&&item.maintain_cycle||0)+' 天'},    
    { title: '上架时间', dataIndex: 'put_date', key: 'put_date_label', render:(item) => item&&moment(item).format('YYYY-MM-DD')||''},
  ]
}
const getGoodsBeltProfileOptions = function(target) {
  let options = getGoodsBeltBaseColumns(target);
  return options;
}
const getGoodsBeltListOptions = function(target) {
  let options = getGoodsBeltBaseColumns(target);
  options.push({ title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
    return (
      <div>
        <OpeateBtn type="primary" shape="circle" icon="delete" size="large" onClick={(e)=>{
          e.stopPropagation();
          target.onDelete([record._id])
        }} />
        <OpeateBtn type="primary" shape="circle" icon="edit" size="large" onClick={(e)=>{
          e.stopPropagation();
          target.onEditClick(record);
        }} />
      </div>
    );
  }})
  return options;
}
const getGoodsBeltAddOptions = function(target) {
  return [
    {type:'input', name:'NID', label:'货号', itemOptions:{hasFeedback:true}},
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'upload', name:'pics', label:'图片',  itemOptions:{hasFeedback:true}, render:target.renderPicUpload, rule:{required:true}},
    {type:'number', name:'price', label:'价格', options:{formatter:(value) => `${value}RMB`, parser:value => value.replace('RMB', '')}, itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'select', name:'type', label:'分类', selectItems:listToSelectOptions(target.props.sales['goodsTypeList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'style', label:'系列', selectItems:listToSelectOptions(target.props.sales['goodsStyleList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'season', label:'季节', selectItems:listToSelectOptions(target.props.sales['goodsSeasonList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'sex', label:'性别', selectItems:constants.BASE_CONSTANTS.SEX_DATA, options:{defaultActiveFirstOption:true}, rule:{required:true}},
    
    {type:'select', name:'b_material', label:'材质', selectItems:listToSelectOptions(target.props.sales['materialList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'b_color', label:'颜色', selectItems:listToSelectOptions(target.props.sales['materialColorList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    
    {type:'datePicker', name:'put_date', label:'上架时间', rule:{required:true}},
  ];
} 
const getGoodsBeltEditOptions = function(target) {
  let options = getGoodsBeltAddOptions(target);
  return defaultInitFormValue(options, target);
}

// 表带
const getGoodsWatchStrapBaseColumns = function(target) {
  return [
    { title: '货号', dataIndex: 'NID', key: 'NID'},
    { title: '名称', dataIndex: 'name', key: 'name'},
    { title: '价格', dataIndex: 'price', key: 'price_label', render:(item) => item+'RMB'},
    { title: '分类', dataIndex: 'type', key: 'type_label', render:(item) => item&&item.name||''},
    { title: '系列', dataIndex: 'style', key: 'style_label', render:(item) => item&&item.name||''},
    { title: '季节', dataIndex: 'season', key: 'season_label', render:(item) => item&&item.name||''},
    { title: '性别', dataIndex: 'sex', key: 'sex'},
    { title: '材质', dataIndex: 'ws_material', key: 'ws_material', render:(item) => item&&item.name||''},
    { title: '类别', dataIndex: 'ws_style', key: 'ws_style', render:(item) => item && item.name || ''},
    { title: '颜色', dataIndex: 'ws_color', key: 'ws_color', render:(item) => item&&item.name||''},
    { title: '保养周期', dataIndex: 'ws_material', key: 'maintain_cycle', render:(item) => (item&&item.maintain_cycle||0)+' 天'},    
    { title: '上架时间', dataIndex: 'put_date', key: 'put_date_label', render:(item) => item&&moment(item).format('YYYY-MM-DD')||''},
  ]
}
const getGoodsWatchStrapProfileOptions = function(target) {
  let options = getGoodsWatchStrapBaseColumns(target);
  return options;
}
const getGoodsWatchStrapListOptions = function(target) {
  let options = getGoodsWatchStrapBaseColumns(target);
  options.push({ title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
    return (
      <div>
        <OpeateBtn type="primary" shape="circle" icon="delete" size="large" onClick={(e)=>{
          e.stopPropagation();
          target.onDelete([record._id])
        }} />
        <OpeateBtn type="primary" shape="circle" icon="edit" size="large" onClick={(e)=>{
          e.stopPropagation();
          target.onEditClick(record);
        }} />
      </div>
    );
  }})
  return options;
}
const getGoodsWatchStrapAddOptions = function(target) {
  return [
    {type:'input', name:'NID', label:'货号', itemOptions:{hasFeedback:true}},
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'upload', name:'pics', label:'图片',  itemOptions:{hasFeedback:true}, render:target.renderPicUpload, rule:{required:true}},
    {type:'number', name:'price', label:'价格', options:{formatter:(value) => `${value}RMB`, parser:value => value.replace('RMB', '')}, itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'select', name:'type', label:'分类', selectItems:listToSelectOptions(target.props.sales['goodsTypeList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'style', label:'系列', selectItems:listToSelectOptions(target.props.sales['goodsStyleList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'season', label:'季节', selectItems:listToSelectOptions(target.props.sales['goodsSeasonList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'sex', label:'性别', selectItems:constants.BASE_CONSTANTS.SEX_DATA, options:{defaultActiveFirstOption:true}, rule:{required:true}},
    
    {type:'select', name:'ws_material', label:'材质', selectItems:listToSelectOptions(target.props.sales['materialList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'ws_style', label:'类别', selectItems:listToSelectOptions(target.props.sales['watchStrapStyleList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'ws_color', label:'颜色', selectItems:listToSelectOptions(target.props.sales['materialColorList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    
    {type:'datePicker', name:'put_date', label:'上架时间', rule:{required:true}},
  ];
} 
const getGoodsWatchStrapEditOptions = function(target) {
  let options = getGoodsWatchStrapAddOptions(target);
  return defaultInitFormValue(options, target);
}

// 配饰
const getGoodsOrnamentBaseColumns = function(target) {
  return [
    { title: '货号', dataIndex: 'NID', key: 'NID'},
    { title: '名称', dataIndex: 'name', key: 'name'},
    { title: '价格', dataIndex: 'price', key: 'price_label', render:(item) => item+'RMB'},
    { title: '分类', dataIndex: 'type', key: 'type_label', render:(item) => item&&item.name||''},
    { title: '系列', dataIndex: 'style', key: 'style_label', render:(item) => item&&item.name||''},
    { title: '季节', dataIndex: 'season', key: 'season_label', render:(item) => item&&item.name||''},
    { title: '性别', dataIndex: 'sex', key: 'sex'},
    { title: '上架时间', dataIndex: 'put_date', key: 'put_date_label', render:(item) => item&&moment(item).format('YYYY-MM-DD')||''},
  ]
}
const getGoodsOrnamentProfileOptions = function(target) {
  let options = getGoodsOrnamentBaseColumns(target);
  return options;
}
const getGoodsOrnamentListOptions = function(target) {
  let options = getGoodsOrnamentBaseColumns(target);
  options.push({ title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
    return (
      <div>
        <OpeateBtn type="primary" shape="circle" icon="delete" size="large" onClick={(e)=>{
          e.stopPropagation();
          target.onDelete([record._id])
        }} />
        <OpeateBtn type="primary" shape="circle" icon="edit" size="large" onClick={(e)=>{
          e.stopPropagation();
          target.onEditClick(record);
        }} />
      </div>
    );
  }})
  return options;
}
const getGoodsOrnamentAddOptions = function(target) {
  return [
    {type:'input', name:'NID', label:'货号', itemOptions:{hasFeedback:true}},
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'upload', name:'pics', label:'图片',  itemOptions:{hasFeedback:true}, render:target.renderPicUpload, rule:{required:true}},
    {type:'number', name:'price', label:'价格', options:{formatter:(value) => `${value}RMB`, parser:value => value.replace('RMB', '')}, itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'select', name:'type', label:'分类', selectItems:listToSelectOptions(target.props.sales['goodsTypeList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'style', label:'系列', selectItems:listToSelectOptions(target.props.sales['goodsStyleList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'season', label:'季节', selectItems:listToSelectOptions(target.props.sales['goodsSeasonList']), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'sex', label:'性别', selectItems:constants.BASE_CONSTANTS.SEX_DATA, options:{defaultActiveFirstOption:true}, rule:{required:true}},

    {type:'datePicker', name:'put_date', label:'上架时间', rule:{required:true}},
  ];
} 
const getGoodsOrnamentEditOptions = function(target) {
  let options = getGoodsOrnamentAddOptions(target);
  return defaultInitFormValue(options, target);
}

export const GOODS_TYPES = [
  {
    key:BASE_CONSTANTS.GOODS_SHOES,
    listTag:'goodsList', tag:'goodsList', label:'鞋', 
    graphqlType:graphqlTypes.goodsType,
    listOptions:getGoodsShoesListOptions,
    addOptions:getGoodsShoesAddOptions,
    editOptions:getGoodsShoesEditOptions,
  },
  {
    key:BASE_CONSTANTS.GOODS_BELT,
    listTag:'goodsList', tag:'goodsList', label:'皮带', 
    graphqlType:graphqlTypes.goodsType,
    listOptions:getGoodsBeltListOptions,
    addOptions:getGoodsBeltAddOptions,
    editOptions:getGoodsBeltEditOptions,
  },
  {
    key:BASE_CONSTANTS.GOODS_WATCH_STRAP,
    listTag:'goodsList', tag:'goodsList', label:'表带', 
    graphqlType:graphqlTypes.goodsType,
    listOptions:getGoodsWatchStrapListOptions,
    addOptions:getGoodsWatchStrapAddOptions,
    editOptions:getGoodsWatchStrapEditOptions,
  },
  {
    key:BASE_CONSTANTS.GOODS_ORNAMENT,
    listTag:'goodsList', tag:'goodsList', label:'配饰', 
    graphqlType:graphqlTypes.goodsType,
    listOptions:getGoodsOrnamentListOptions,
    addOptions:getGoodsOrnamentAddOptions,
    editOptions:getGoodsOrnamentEditOptions,
  }
]
