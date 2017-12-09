import React, { Component } from 'react';
import { Icon, Button } from 'antd'
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

export const ORDER_TYPES = [
  {
    key:BASE_CONSTANTS.E_ORDER_TYPE.SHOES,
    listTag:'orderShoesList:orderList', tag:'orderList', label:'鞋', 
    graphqlType:graphqlTypes.orderType,
    listOptions:getOrderListColumns,
    addOptions:getOrderAddOptions,
    editOptions:getOrderEditOptions,
  },
  {
    key:BASE_CONSTANTS.E_ORDER_TYPE.BELT,
    listTag:'orderBeltList:goodsList', tag:'orderList', label:'皮带', 
    graphqlType:graphqlTypes.orderType,
    listOptions:getOrderListColumns,
    addOptions:getOrderAddOptions,
    editOptions:getOrderEditOptions,
  },
  {
    key:BASE_CONSTANTS.E_ORDER_TYPE.WATCH_STRAP,
    listTag:'orderWatchStrapList:goodsList', tag:'orderList', label:'表带', 
    graphqlType:graphqlTypes.orderType,
    listOptions:getOrderListColumns,
    addOptions:getOrderAddOptions,
    editOptions:getOrderEditOptions,
  },
  {
    key:BASE_CONSTANTS.E_ORDER_TYPE.MAINTAIN,
    listTag:'orderMaintainList:goodsList', tag:'orderList', label:'护理', 
    graphqlType:graphqlTypes.orderType,
    listOptions:getOrderListColumns,
    addOptions:getOrderAddOptions,
    editOptions:getOrderEditOptions,
  },
  {
    key:BASE_CONSTANTS.E_ORDER_TYPE.ORNAMENT,
    listTag:'orderOrnamentList:goodsList', tag:'orderList', label:'配饰', 
    graphqlType:graphqlTypes.orderType,
    listOptions:getOrderListColumns,
    addOptions:getOrderAddOptions,
    editOptions:getOrderEditOptions,
  },
  {
    key:BASE_CONSTANTS.E_ORDER_TYPE.RECHARGE,
    listTag:'orderRechageList:goodsList', tag:'orderList', label:'充值', 
    graphqlType:graphqlTypes.orderType,
    listOptions:getOrderListColumns,
    addOptions:getOrderAddOptions,
    editOptions:getOrderEditOptions,
  }
]

// 订单基础表
const getOrderBaseListColumns = function(target) {
  return [
    { title: '门店', dataIndex: 'shop', key: 'shop', render:(item) => item.name},
    { title: '导购', dataIndex: 'guide', key: 'guide', render:(item) => item.name},
    { title: '客户', dataIndex: 'customer', key: 'customer', render:(item) => item.name},
    { title: '数量', dataIndex: 'count', key: 'count'},
    { title: '支付金额', dataIndex: 'pay', key: 'pay', render:(item) => item+'RMB'},
    // { title: '订单状态', dataIndex: 'order_state', key: 'order_state'},
    { title: '物流公司', dataIndex: 'transport_company', key: 'transport_company', render:(item) => {
      let _source = commonUtils.getTransportCompany(item);
      if (_source) {
        return _source.label;
      }
      return '';
    }},
    { title: '快递单号', dataIndex: 'transport_id', key: 'transport_id'},
    { title: '备注', dataIndex: 'remark', key: 'remark'},
    { title: '来源', dataIndex: 'source', key: 'source', render:(item) => {
      let _source = commonUtils.getOrderSource(item);
      if (_source) {
        return _source.label;
      }
      return '';
    }},
  ]
}
// 脚型
const FOOT_OPTIONS = {
  index:2, title:'脚型数据', 
  options:[
    {type:'input', name:'s_foot_size', label:'尺码', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
  ],
  left:{title:'左脚', options:[
    {type:'number', name:'s_left_length', label:'长度', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'number', name:'s_left_zhiWei', label:'趾围', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},    
    {type:'number', name:'s_left_fuWei', label:'附维', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},    
  ]},
  right:{title:'右脚', options:[
    {type:'number', name:'s_right_length', label:'长度', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'number', name:'s_right_zhiWei', label:'趾围', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},    
    {type:'number', name:'s_right_fuWei', label:'附维', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},    
  ]}
}
// 快递信息
const TRANSPORT_OPTIONS = {
  index:9, title:'快递信息', options:[
    {type:'input', name:'transport_name', label:'收货人', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'input', name:'transport_address', label:'收货地址', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'input', name:'transport_phone', label:'收货电话', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'input', name:'transport_zipcode', label:'邮编', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
    {type:'select', name:'transport_company', label:'快递公司', itemOptions:{labelLeft:true}, selectItems:constants.BASE_CONSTANTS.TRANSPORT_COMPANYS, options:{defaultActiveFirstOption:true}, rule:{}},
    {type:'input', name:'transport_id', label:'快递单号', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{}},
    {type:'number', name:'transport_price', label:'快递费用', options:{formatter:(value) => `${value}RMB`, parser:value => value.replace('RMB', '')}, itemOptions:{hasFeedback:true, labelLeft:true}, rule:{}},
  ]
}
const getOrderBaseOptions = function(target) {
  let valuePhoneList = listToSelectOptions(target.props.customerList, (item)=>item.phone, (item)=>item.name+'-'+item.phone);
  let valueNameList = listToSelectOptions(target.props.customerList, (item)=>item.name, (item)=>item.name+'-'+item.phone);
  return [
    {
      index:1, title:'基础信息', options:[
        {type:'select', name:'source', label:'来源', itemOptions:{labelLeft:true}, selectItems:constants.BASE_CONSTANTS.ORDER_SOURCE, options:{defaultActiveFirstOption:true}, rule:{required:true}},
        {type:'select', name:'shop', label:'门店', itemOptions:{labelLeft:true}, selectItems:listToSelectOptions(target.props.shopList), options:{defaultActiveFirstOption:true, showSearch:true, optionFilterProp:'children'}, rule:{required:true}},    
        {type:'select', name:'guide', label:'导购', itemOptions:{labelLeft:true}, selectItems:listToSelectOptions(target.props.guideList), options:{defaultActiveFirstOption:true, showSearch:true, optionFilterProp:'children'}, rule:{required:true}},    
        {type:'select', name:'customer', label:'客户', itemOptions:{labelLeft:true}, selectItems:listToSelectOptions(target.props.customerList), options:{defaultActiveFirstOption:true, showSearch:true, optionFilterProp:'children'}, rule:{required:true}},            
      ]
    },
    {
      index:1, title:'客户信息', options:[
        {
          type:'select', name:'phone', label:'手机号', 
          itemOptions:{labelLeft:true}, 
          selectItems:valuePhoneList, 
          decoratorOptions:{initialValue:target.state.customerPhone},
          options:{
            defaultActiveFirstOption:true,
            mode:"combobox", 
            filterOption:false, 
            onChange:target.onCustomerPhoneChange, 
            onFocus:target.onCustomerPhoneFocus,
            onSelect:target.onCustomerPhoneSelect,
          }, 
          rule:{required:true}
        },            
        {
          type:'select', name:'name', label:'姓名',
          itemOptions:{labelLeft:true}, 
          selectItems:valueNameList, 
          decoratorOptions:{initialValue:target.state.customerName},
          options:{
            defaultActiveFirstOption:true, 
            mode:"combobox", 
            filterOption:false, 
            onChange:target.onCustomerNameChange, 
            onFocus:target.onCustomerNameFocus,
            onSelect:target.onCustomerNameSelect,
          }, 
          rule:{required:true}
        },            
        {type:'select', name:'sex', label:'性别', itemOptions:{labelLeft:true}, selectItems:constants.BASE_CONSTANTS.SEX_DATA, options:{defaultActiveFirstOption:true}, rule:{required:true}},
        {type:'datePicker', name:'birthday', label:'生日', itemOptions:{labelLeft:true}, rule:{required:true}},
        {type:'input', name:'weixin', label:'微信号', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
      ]
    },
    {
      index:10, title:'订单信息', options:[
        {type:'number', name:'pay', label:'支付金额', options:{formatter:(value) => `${value}RMB`, parser:value => value.replace('RMB', '')}, itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
        {type:'select', name:'pay_type', label:'支付方式', itemOptions:{labelLeft:true}, selectItems:constants.BASE_CONSTANTS.PAY_TYPE, options:{defaultActiveFirstOption:true}, rule:{required:true}},
        {type:'textarea', name:'remark', label:'备注', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{}},
      ]
    }
  ];
} 

// 鞋
const getOrderShoesListColumns = function(target) {
  let options = getOrderBaseListColumns(target);
  return [
    { title: '编号', dataIndex: 's_NID', key: 'ws_NID'}
  ].concat(options);
}
const getOrderShoesOptions = function(target) {
  let options = getOrderBaseOptions(target);
  return options.concat([
    {
      index:3, title:'商品信息', options:[
        {type:'select', name:'s_shoes', label:'鞋', itemOptions:{labelLeft:true}, selectItems:listToSelectOptions(target.props.goodsShoesList), options:{defaultActiveFirstOption:true, showSearch:true, optionFilterProp:'children'}, rule:{required:true}},    
      ]
    },
    FOOT_OPTIONS, TRANSPORT_OPTIONS
  ]).sort();
}

// 皮带
const getOrderBeltListColumns = function(target) {
  let options = getOrderBaseListColumns(target);
  return [
    { title: '编号', dataIndex: 'b_NID', key: 'ws_NID'}
  ].concat(options);
}
const getOrderBeltOptions = function(target) {
  let options = getOrderBaseOptions(target);
  return options.concat([
    {
      index:3, title:'商品信息', options:[
        {type:'select', name:'s_belt', label:'皮带', itemOptions:{labelLeft:true}, selectItems:listToSelectOptions(target.props.goodsShoesList), options:{defaultActiveFirstOption:true, showSearch:true, optionFilterProp:'children'}, rule:{required:true}},    
       ]
    },
    FOOT_OPTIONS, TRANSPORT_OPTIONS
  ]).sort();
}

// 表带
const getOrderWatchStrapListColumns = function(target) {
  let options = getOrderBaseListColumns(target);
  return [
    { title: '编号', dataIndex: 'ws_NID', key: 'ws_NID'}
  ].concat(options);
}
const getOrderWatchStrapOptions = function(target) {
  let options = getOrderBaseOptions(target);
  return options.concat([
    {
      index:3, title:'商品信息', options:[
        {type:'select', name:'ws_watch_strap', label:'表带', itemOptions:{labelLeft:true}, selectItems:listToSelectOptions(target.props.goodsShoesList), options:{defaultActiveFirstOption:true, showSearch:true, optionFilterProp:'children'}, rule:{required:true}},    
       ]
    }
  ]).sort();
}
// 护理
const getOrderMaintainListColumns = function(target) {
  let options = getOrderBaseListColumns(target);
  return [
    { title: '编号', dataIndex: 'm_NID', key: 'm_NID'}
  ].concat(options);
}
const getOrderMaintainOptions = function(target) {
  let options = getOrderBaseOptions(target);
  return options.concat([
    {
      index:3, title:'商品信息', options:[
        {type:'select', name:'m_maintain', label:'护理项目', itemOptions:{labelLeft:true}, selectItems:listToSelectOptions(target.props.goodsShoesList), options:{defaultActiveFirstOption:true, showSearch:true, optionFilterProp:'children'}, rule:{required:true}},    
      ]
    },
    FOOT_OPTIONS, TRANSPORT_OPTIONS
  ]).sort();
}

// 配饰
const getOrderOrnamentListColumns = function(target) {
  let options = getOrderBaseListColumns(target);
  return [
    { title: '编号', dataIndex: 'o_NID', key: 'o_NID'}
  ].concat(options);
}
const getOrderOrnamentOptions = function(target) {
  let options = getOrderBaseOptions(target);
  return options.concat([
    {
      index:3, title:'商品信息', options:[
        {type:'select', name:'o_ornament', label:'配饰', itemOptions:{labelLeft:true}, selectItems:listToSelectOptions(target.props.goodsShoesList), options:{defaultActiveFirstOption:true, showSearch:true, optionFilterProp:'children'}, rule:{required:true}},    
       ]
    },
    FOOT_OPTIONS, TRANSPORT_OPTIONS
  ]).sort();
}

// 充值
const getOrderRechargeListColumns = function(target) {
  let options = getOrderBaseListColumns(target);
  return [
    { title: '金额', dataIndex: 'r_amount', key: 'r_amount'}
  ].concat(options);
}
const getOrderRechargeOptions = function(target) {
  let options = getOrderBaseOptions(target);
  return options.concat([
    {
      index:3, title:'商品信息', options:[
        {type:'number', name:'r_amount', label:'金额', options:{formatter:(value) => `${value}RMB`, parser:value => value.replace('RMB', '')}, itemOptions:{hasFeedback:true}, rule:{required:true}},
      ]
    }
  ]).sort();
}

const getOrderListColumns = function(target) {
  let options = [];
  switch(target.orderType.key) {
    case BASE_CONSTANTS.E_ORDER_TYPE.SHOES:
      options = getOrderShoesListColumns(target);
    break;
    case BASE_CONSTANTS.E_ORDER_TYPE.BELT:
    options = getOrderBeltListColumns(target);
    break;
    case BASE_CONSTANTS.E_ORDER_TYPE.WATCH_STRAP:
    options = getOrderWatchStrapListColumns(target);
    break;
    case BASE_CONSTANTS.E_ORDER_TYPE.MAINTAIN:
    options = getOrderMaintainListColumns(target);
    break;
    case BASE_CONSTANTS.E_ORDER_TYPE.ORNAMENT:
    options = getOrderOrnamentListColumns(target);
    break;
    case BASE_CONSTANTS.E_ORDER_TYPE.RECHARGE:
    options = getOrderRechargeListColumns(target);
    break;
  }
  options.push({ title: '编辑人', dataIndex: 'editor_name', key: 'editor_name'});
  options.push({ title: '编辑时间', dataIndex: 'editor_time', key: 'editor_time'});
  options.push({ title: '操作', dataIndex: 'id', key: 'id', render:(text, record, index)=>{
    return (
      <div>
        <OpeateBtn type="primary" shape="circle" icon="delete" size="large" onClick={(e)=>{
          e.stopPropagation();
          target.onDelete([record._id])
        }} />
        <OpeateBtn type="primary" shape="circle" icon="edit" size="large" onClick={(e)=>{
          e.stopPropagation();
          target.onEdit(record);
        }} />
      </div>
    );
  }})
  return options;
}
const getOrderAddOptions = function(target) {
  let options = [];
  switch(target.orderType.key) {
    case BASE_CONSTANTS.E_ORDER_TYPE.SHOES:
      options = getOrderShoesListColumns(target);
    break;
    case BASE_CONSTANTS.E_ORDER_TYPE.BELT:
      options = getOrderBeltListColumns(target);
    break;
    case BASE_CONSTANTS.E_ORDER_TYPE.WATCH_STRAP:
      options = getOrderWatchStrapListColumns(target);
    break;
    case BASE_CONSTANTS.E_ORDER_TYPE.MAINTAIN:
      options = getOrderMaintainListColumns(target);
    break;
    case BASE_CONSTANTS.E_ORDER_TYPE.ORNAMENT:
      options = getOrderOrnamentListColumns(target);
    break;
    case BASE_CONSTANTS.E_ORDER_TYPE.RECHARGE:
      options = getOrderRechargeListColumns(target);
    break;
  }
  return options;
} 
const getOrderEditOptions = function(target) {
  let options = getOrderAddOptions(target);

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