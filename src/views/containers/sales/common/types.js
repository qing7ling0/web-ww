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
        }
        />);
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

// 基础
const getNIDBaseListOptions = function(target) {
  let options = [
    { title: '名称', dataIndex: 'name', key: 'name', className:"table-column-left"},
    { title: '编号', dataIndex: 'NID', key: 'NID', className:"table-column-left"},
    { title: '编辑人', dataIndex: 'editor_name', key: 'editor_name', width:120}
  ]
  if (target.canOperate()) {
    options.push({
      title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
        return (<OpeateBtn type="primary" shape="circle" icon="delete" onClick={(e)=>{
          e.stopPropagation();
          target.onDelete([record._id])
        }} />);
      }
    })
  }

  return options;
}
const getNIDBaseAddOptions = function(target) {
  return [
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'input', name:'NID', label:'编号', itemOptions:{hasFeedback:true}, rule:{required:true}}
  ];
}
const getNIDBaseEditOptions = function(target) {
  let options = getNIDBaseAddOptions(target);
  return defaultInitFormValue(options, target);
}

// 特殊定制
const getCustomListOptions = function(target) {
  let options = [
    { title: '名称', dataIndex: 'name', key: 'name'},
    { title: '内增皮料', dataIndex: 'n_material', key: 'n_material', render:(item)=>item&&item.name||''},
    { title: '特大码皮料', dataIndex: 'd_material', key: 'd_material', render:(item)=>item&&item.name||''},
    { title: '价格', dataIndex: 'price', key: 'price', render:(text)=>text+'RMB'},
    { title: '编辑人', dataIndex: 'editor_name', width:120, key: 'editor_name'}
  ]
  if (target.canOperate()) {
    options.push({
      title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
        return (<OpeateBtn type="primary" shape="circle" icon="delete" onClick={(e)=>{
          e.stopPropagation();
          target.onDelete([record._id])
        }} />);
      }
    })
  }

  return options;
}
const getCustomAddOptions = function(target) {
  return [
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'select', name:'n_material', label:'内增皮料', selectItems:listToSelectOptions(target.props['materialList']), options:{defaultActiveFirstOption:true}},
    {type:'select', name:'d_material', label:'特大码皮料', selectItems:listToSelectOptions(target.props['materialList']), options:{defaultActiveFirstOption:true}},
    {type:'number', name:'price', label:'价格', itemOptions:{hasFeedback:true}, options:{formatter:(value) => `${value}RMB`, parser:value => value.replace('RMB', '')}, rule:{required:true}},
  ];
}
const getCustomEditOptions = function(target) {
  let options = getCustomAddOptions(target);
  return defaultInitFormValue(options, target);
}

// 加急
const getUrgentListOptions = function(target) {
  let options = [
    { title: '天数', dataIndex: 'day', key: 'day'},
    { title: '价格', dataIndex: 'price', key: 'price', render:(text)=>text+'RMB'},
    { title: '编辑人', dataIndex: 'editor_name', key: 'editor_name', width:120}
  ]
  if (target.canOperate()) {
    options.push({
      title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
        return (<OpeateBtn type="primary" shape="circle" icon="delete"  onClick={(e)=>{
          e.stopPropagation();
          target.onDelete([record._id])
        }} />);
      }
    })
  }

  return options;
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
const getMaterialBaseColumns = function(target) {
  return [
    { title: '名称', dataIndex: 'name', key: 'name'},
    { title: '编号', dataIndex: 'NID', key: 'NID'},
    { title: '颜色', dataIndex: 'color', key: 'color', render:(item) => item.name},
    { title: '数量', dataIndex: 'count', key: 'count'},
  ]
}
const getMaterialListOptions = function(target) {
  let options = getMaterialBaseColumns(target);
  if (target.canOperate()) {
    options.push({ title: '编辑人', dataIndex: 'editor_name', key: 'editor_name', width:120});
    options.push({ title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
      return (
        <div>
          <OpeateBtn type="primary" shape="circle" icon="delete"  onClick={(e)=>{
            e.stopPropagation();
            target.onDelete([record._id])
          }} />
        </div>
      );
    }})
  }
  return options;
}
const getMaterialAddOptions = function(target) {
  return [
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'input', name:'NID', label:'编号', itemOptions:{hasFeedback:true}, rule:{required:true}},
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
    { title: '编号', dataIndex: 'NID', key: 'NID'},
    { title: '价格', dataIndex: 'price', key: 'price',render:(item) => item+'RMB'},
    { title: '时间', dataIndex: 'time', key: 'time',render:(item) => item+'天'},
  ]
}
const getMaintainListOptions = function(target) {
  let options = getMaintainBaseColumns(target);
  if (target.canOperate) {
    options.push({ title: '编辑人', dataIndex: 'editor_name', key: 'editor_name'});
    options.push({ title: '编辑时间', dataIndex: 'editor_time', key: 'editor_time'});
    options.push({ title: '操作', dataIndex: 'id', key: 'id', render:(text, record, index)=>{
      return (
        <div>
          <OpeateBtn type="primary" shape="circle" icon="delete"  onClick={(e)=>{
            e.stopPropagation();
            target.onDelete([record._id])
          }} />
        </div>
      );
    }})
  }
  return options;
}
const getMaintainAddOptions = function(target) {
  return [
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'input', name:'NID', label:'编号', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'number', name:'price', label:'价格', itemOptions:{hasFeedback:true}, options:{formatter:(value) => `${value}RMB`, parser:value => value.replace('RMB', '')}, rule:{required:true}},
    {type:'number', name:'time', label:'时间', itemOptions:{hasFeedback:true}, options:{formatter:(value) => `${value}天`, parser:value => value.replace('天', '')}, rule:{required:true}},
  ];
} 
const getMaintainEditOptions = function(target) {
  let options = getMaintainAddOptions(target);
  return defaultInitFormValue(options, target);
}

export const COMMON_TYPES = [
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.GOODS_TYPE,
    tag:'commonList', listTag:'goodsTypeList:commonList', label:'商品分类', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.GOODS_STYLE,
    listTag:'goodsStyleList:commonList', tag:'commonList', label:'商品系列', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.GOODS_SEASON,
    listTag:'goodsSeasonList:commonList', tag:'commonList', label:'商品季节', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.MATERIAL_COLOR,
    listTag:'materialColorList:commonList', tag:'commonList', label:'原材料颜色', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getNIDBaseListOptions,
    addOptions:getNIDBaseAddOptions,
    editOptions:getNIDBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_OUT_COLOR,
    listTag:'outColorList:commonList', tag:'commonList', label:'鞋颜色', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getNIDBaseListOptions,
    addOptions:getNIDBaseAddOptions,
    editOptions:getNIDBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_IN_COLOR,
    listTag:'inColorList:commonList', tag:'commonList', label:'鞋内里颜色', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getNIDBaseListOptions,
    addOptions:getNIDBaseAddOptions,
    editOptions:getNIDBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_BOTTOM_COLOR,
    listTag:'bottomColorList:commonList', tag:'commonList', label:'鞋底侧颜色', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getNIDBaseListOptions,
    addOptions:getNIDBaseAddOptions,
    editOptions:getNIDBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_BOTTOM_SIDE_COLOR,
    listTag:'bottomSideColorList:commonList', tag:'commonList', label:'鞋底板颜色', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:getNIDBaseListOptions,
    addOptions:getNIDBaseAddOptions,
    editOptions:getNIDBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.XUAN_HAO,
    listTag:'xuanHaoList:commonList', tag:'commonList', label:'鞋楦号', 
    graphqlType:graphqlTypes.xuanHaoType,
    listOptions:getNIDBaseListOptions,
    addOptions:getNIDBaseAddOptions,
    editOptions:getNIDBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_GUI_GE,
    listTag:'guiGeList:commonList', tag:'commonList', label:'鞋规格', 
    graphqlType:graphqlTypes.guiGeType,
    listOptions:getNIDBaseListOptions,
    addOptions:getNIDBaseAddOptions,
    editOptions:getNIDBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_GEN_GAO,
    listTag:'genGaoList:commonList', tag:'commonList', label:'鞋跟高', 
    graphqlType:graphqlTypes.genGaoType,
    listOptions:getNIDBaseListOptions,
    addOptions:getNIDBaseAddOptions,
    editOptions:getNIDBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.MAINTAIN,
    listTag:'maintainList:commonList', tag:'commonList', label:'护理项目', 
    graphqlType:graphqlTypes.maintainType,
    listOptions:getMaintainListOptions,
    addOptions:getMaintainAddOptions,
    editOptions:getMaintainEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.CUSTOM,
    listTag:'customList:commonList', tag:'commonList', label:'特殊定制', 
    graphqlType:graphqlTypes.customType,
    listOptions:getCustomListOptions,
    addOptions:getCustomAddOptions,
    editOptions:getCustomEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.URGENT,
    listTag:'urgentList:commonList', tag:'commonList', label:'加急天数', 
    graphqlType:graphqlTypes.urgentType,
    listOptions:getUrgentListOptions,
    addOptions:getUrgentAddOptions,
    editOptions:getUrgentEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.WATCH_STRAP_STYLE,
    listTag:'watchStrapStyleList:commonList', tag:'commonList', label:'表带类型', 
    graphqlType:graphqlTypes.watchStrapStyleType,
    listOptions:getNIDBaseListOptions,
    addOptions:getNIDBaseAddOptions,
    editOptions:getNIDBaseEditOptions,
  },
  {
    key:BASE_CONSTANTS.COMMON_DATA_TYPES.SHOES_TIE_BIAN,
    listTag:'shoesTieBianList:commonList', tag:'commonList', label:'鞋贴边', 
    graphqlType:graphqlTypes.shoesTieBianType,
    listOptions:getSalesBaseListOptions,
    addOptions:getSalesBaseAddOptions,
    editOptions:getSalesBaseEditOptions,
  },
]
