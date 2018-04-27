import React, { Component } from 'react';
import { Icon, Button } from 'antd'
import styled from 'styled-components'

import { commonUtils } from '../../../modules/common';
import * as constants from '../../../constants/Constants'
import * as graphqlTypes from '../../../modules/graphqlTypes'
import * as orderTypes from '../../../modules/orderTypes'
import moment from 'moment'

import { 
  Report, 
  SHOP_SALSE_STATISTICS_COLS,
  GOODS_STATISTICS_COLS,
  FOOTER_STATISTICS_COLS
} from '../report.js'

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

const getVipListBaseOptions = function(target) {
  return [
    { title: '姓名', dataIndex: 'name', key: 'name', className:"table-column-left"},
    { title: '性别', dataIndex: 'sex', key: 'sex', className:"table-column-left"},
    { title: '手机', dataIndex: 'phone', key: 'phone', className:"table-column-left"},
    { title: '尺码', dataIndex: 's_foot_size', key: 'nas_foot_sizeme', className:"table-column-left", render:value=>(value===null||value===undefined)?"暂无":value},
    { title: '左脚长度', dataIndex: 's_left_length', key: 's_left_length', className:"table-column-left", render:value=>(value===null||value===undefined)?"暂无":value},
    { title: '左脚趾围', dataIndex: 's_left_zhiWei', key: 's_left_zhiWei', className:"table-column-left", render:value=>(value===null||value===undefined)?"暂无":value},
    { title: '左脚附维', dataIndex: 's_left_fuWei', key: 's_left_fuWei', className:"table-column-left", render:value=>(value===null||value===undefined)?"暂无":value},
    { title: '右脚长度', dataIndex: 's_right_length', key: 's_right_length', className:"table-column-left", render:value=>(value===null||value===undefined)?"暂无":value},
    { title: '右脚趾围', dataIndex: 's_right_zhiWei', key: 's_right_zhiWei', className:"table-column-left", render:value=>(value===null||value===undefined)?"暂无":value},
    { title: '右脚附维', dataIndex: 's_right_fuWei', key: 's_right_fuWei', className:"table-column-left", render:value=>(value===null||value===undefined)?"暂无":value},
  ]
}

const getVipListOptions = function(target) {
  let options = getVipListBaseOptions(target);
  options.push({
    title: '操作', dataIndex: 'id', key: 'id', width:120, className:"table-column-center", render:(text, record, index)=>{
      return (<OpeateBtn type="primary" onClick={(e)=>{
        e.stopPropagation();
        target.onView(record)}
      }>查看</OpeateBtn>);
    }
  })

  return options;
}

const getVipOrderListOptions = function(target) {
  let options = [
    { title: '订单日期', dataIndex: 'create_time', key: 'create_time', className:"table-column-left", render:value=>value?moment(value).format("YYYY-MM-DD HH:mm:ss"):""},
    { title: '订单号', dataIndex: 'sub_order_id', key: 'sub_order_id', className:"table-column-left"},
    { title: '店铺', dataIndex: 'NID', key: 'NID', className:"table-column-left"},
    { title: '货号', dataIndex: 's_xuan_hao_name', key: 's_xuan_hao_name', className:"table-column-left"},
    { title: '楦型', dataIndex: 'shop_name', key: 'shop_name', className:"table-column-left"},
  
    { title: '样板', dataIndex: 's_yang_ban', key: 's_yang_ban', className:"table-column-left", render:(value, record)=>target.renderItem(record, "s_yang_ban", value, false, target.state.isEditor[record._id])},
    { title: '贴楦', dataIndex: 's_tie_xuan', key: 's_tie_xuan', className:"table-column-left", render:(value, record)=>target.renderItem(record, "s_tie_xuan", value, false, target.state.isEditor[record._id])},
    { title: '贴法', dataIndex: 's_tie_fa', key: 's_tie_fa', className:"table-column-left", render:(value, record)=>target.renderItem(record, "s_tie_fa", value, false, target.state.isEditor[record._id])},
    { title: '备注', dataIndex: 'remark', key: 'remark', width:220, className:"table-column-left", render:(value, record)=>target.renderItem(record, "s_mark", value, true, target.state.isEditor[record._id])},
    { title: '试脚鞋汇总', dataIndex: 's_feedback', key: 's_feedback', width:220, className:"table-column-left", render:(value, record)=>target.renderItem(record, "s_feedback", value, true, target.state.isEditor[record._id])},
  ]
  options.push({
    title: '操作', dataIndex: 'id', key: 'id', width:160, className:"table-column-center", render:(text, record, index)=>{
      if (target.state.isEditor[record._id]) {
        return (
        <div>
          <OpeateBtn type="primary" size="small" onClick={(e)=>{
            e.stopPropagation();
            target.onSave(record)}
          }>保存</OpeateBtn>
          <span> </span>
          <OpeateBtn type="primary" size="small" onClick={(e)=>{
            e.stopPropagation();
            target.onCancel(record)}
          }>取消</OpeateBtn>
        </div>);
      } else {
        return (<OpeateBtn type="primary" size="small" onClick={(e)=>{
          e.stopPropagation();
          target.onEdit(record)}
        }>编辑</OpeateBtn>);
      }
    }
  })

  return options;
}

export const OPTIONS = {
  getVipListBaseOptions
}

export const TYPES = [
  {
    key:"foot",
    tag:'', listTag:'', label:'VIP脚型数据', 
    graphqlType:graphqlTypes.customerReportVipType,
    listOptions:getVipListOptions
  },
  {
    key:"order",
    tag:'', listTag:'', label:'订单数据', 
    graphqlType:graphqlTypes.customerReportVipFootOrderType,
    listOptions:getVipOrderListOptions
  },
]
