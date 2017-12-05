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

export const getSalesBaseListOptions = function(target) {
  return [
    { title: '名称', dataIndex: 'name', key: 'name'},
    { title: '编辑人', dataIndex: 'editor_name', key: 'editor_name'},
    { title: '编辑时间', dataIndex: 'editor_time', key: 'editor_time'},
    { title: '操作', dataIndex: 'id', key: 'id', render:(text, record, index)=>{
      return (<OpeateBtn type="primary" shape="circle" icon="delete" size="large" onClick={()=>target.onDelete([record._id])} />);
    }}
  ]
}

export const getSalesBaseAddOptions = function(target) {
  return [
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
  ];
}

export const getSalesBaseEditOptions = function(target) {
  let options = getSalesBaseAddOptions(target);
  // options.push({type:'input', name:'editor_name', label:'编辑人', options:{disabled:true}})
  // options.push({type:'input', name:'editor_time', label:'编辑时间', options:{disabled:true}})

  return options.map((item, index) => {
    if (!item.decoratorOptions) {
      item.decoratorOptions = {};
    }
    item.decoratorOptions.initialValue = target.props.data[item.name];
    return item;
  });
}

export const getGoodsShoesBaseColumns = function(target) {
  return [
    { title: '名称', dataIndex: 'name', key: 'name'},
    { title: '属性', dataIndex: 'property_label', key: 'property_label'},
    { title: '分类', dataIndex: 'type', key: 'type_label', render:(item) => item.name},
    { title: '系列', dataIndex: 'style', key: 'style_label', render:(item) => item.name},
    { title: '季节', dataIndex: 'season', key: 'season_label', render:(item) => item.name},
    { title: '上架时间', dataIndex: 'put_date_label', key: 'put_date_label'},
    { title: '性别', dataIndex: 'sex', key: 'sex'},
    { title: '楦号', dataIndex: 'xuan_hao', key: 'xuan_hao'},
    { title: '鞋面颜色', dataIndex: 'out_color', key: 'out_color_label', render:(item) => item.name},
    { title: '里皮颜色', dataIndex: 'in_color', key: 'in_color_label', render:(item) => item.name},
    { title: '鞋底颜色', dataIndex: 'bottom_color', key: 'bottom_color_label', render:(item) => item.name},
    { title: '底边颜色', dataIndex: 'bottom_side_color', key: 'bottom_side_color_label', render:(item) => item.name},
    { title: '跟高', dataIndex: 'height', key: 'height_label', render:(item) => item+'cm'},
    { title: '价格', dataIndex: 'price', key: 'price_label', render:(item) => item+'RMB'},
    { title: '保养周期', dataIndex: 'maintain_cycle', key: 'maintain_cycle_label', render:(item) => item+'天'},
  ]
}

export const getGoodsShoesProfileOptions = function(target) {
  let options = getGoodsShoesBaseColumns(target);
  return options;
}

export const getGoodsShoesListOptions = function(target) {
  let options = getGoodsShoesBaseColumns(target);
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

export const getGoodsShoesAddOptions = function(target) {
  return [
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'select', name:'property', label:'属性', selectItems:constants.BASE_CONSTANTS.GOODS_PROPERTY, options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'type', label:'分类', selectItems:listToSelectOptions(target.props.goodsTypeList), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'style', label:'系列', selectItems:listToSelectOptions(target.props.goodsStyleList), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'season', label:'季节', selectItems:listToSelectOptions(target.props.goodsSeasonList), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'datePicker', name:'put_date', label:'上架时间', rule:{required:true}},
    {type:'select', name:'sex', label:'性别', selectItems:constants.BASE_CONSTANTS.SEX_DATA, options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'input', name:'xuan_hao', label:'楦号', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'select', name:'out_color', label:'鞋面颜色', selectItems:listToSelectOptions(target.props.outColorList), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'in_color', label:'里皮颜色', selectItems:listToSelectOptions(target.props.inColorList), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'bottom_color', label:'鞋底颜色', selectItems:listToSelectOptions(target.props.bottomColorList), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'select', name:'bottom_side_color', label:'底边颜色', selectItems:listToSelectOptions(target.props.bottomSideColorList), options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'number', name:'height', label:'跟高', options:{formatter:(value) => `${value}cm`, parser:value => value.replace('cm', '')}, itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'number', name:'price', label:'价格', options:{formatter:(value) => `${value}RMB`, parser:value => value.replace('RMB', '')}, itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'number', name:'maintain_cycle', label:'保养周期', options:{formatter:(value) => `${value}天`, parser:value => value.replace('天', '')}, itemOptions:{hasFeedback:true}, rule:{required:true}},
  ];
} 

export const getGoodsShoesEditOptions = function(target) {
  let options = getGoodsShoesAddOptions(target);
  // options.push({type:'input', name:'editor_name', label:'编辑人', options:{disabled:true}})
  // options.push({type:'input', name:'editor_time', label:'编辑时间', options:{disabled:true}})

  return options;
}


export const getMaterialBaseColumns = function(target) {
  return [
    { title: '名称', dataIndex: 'name', key: 'name'},
    { title: '颜色', dataIndex: 'color', key: 'color', render:(item) => item.name},
    { title: '数量', dataIndex: 'count', key: 'count'},
  ]
}

export const getMaterialListOptions = function(target) {
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

export const getMaterialAddOptions = function(target) {
  return [
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
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

export const getMaintainBaseColumns = function(target) {
  return [
    { title: '编号', dataIndex: 'NID', key: 'NID'},
    { title: '名称', dataIndex: 'name', key: 'name'},
    { title: '类型', dataIndex: 'type', key: 'type', render:(item) => {
      let maintainType = commonUtils.getMaintainPriceType(item);
      if (maintainType) {
        return maintainType.label;
      }
      return '';
    }},
    { title: '价格', dataIndex: 'price', key: 'price',render:(item) => item+'RMB'},
    { title: '时间', dataIndex: 'time', key: 'price',render:(item) => item+'天'},
  ]
}
export const getMaintainListOptions = function(target) {
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

export const getMaintainAddOptions = function(target) {
  return [
    {type:'input', name:'NID', label:'编号', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'input', name:'name', label:'名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
    {type:'select', name:'type', label:'类型', selectItems:constants.BASE_CONSTANTS.MAINTAIN_PRICE_TYPE, options:{defaultActiveFirstOption:true}, rule:{required:true}},
    {type:'number', name:'price', label:'价格', itemOptions:{hasFeedback:true}, options:{formatter:(value) => `${value}RMB`, parser:value => value.replace('RMB', '')}, rule:{required:true}},
    {type:'number', name:'time', label:'时间', itemOptions:{hasFeedback:true}, options:{formatter:(value) => `${value}天`, parser:value => value.replace('天', '')}, rule:{required:true}},
  ];
} 

export const getMaintainEditOptions = function(target) {
  let options = getMaintainAddOptions(target);

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




export const getOrderBaseColumns = function(target) {
  return [
    { title: '类型', dataIndex: 'type', key: 'type'},
    { title: '来源', dataIndex: 'source', key: 'source', render:(item) => {
      let _source = commonUtils.getOrderSource(item);
      if (_source) {
        return _source.label;
      }
      return '';
    }},
    { title: '数量', dataIndex: 'count', key: 'count'},
    { title: '支付金额', dataIndex: 'pay', key: 'pay', render:(item) => item+'RMB'},
    { title: '支付方式', dataIndex: 'pay_type', key: 'pay_type', render:(item) => {
      let _source = commonUtils.getPayType(item);
      if (_source) {
        return _source.label;
      }
      return '';
    }},
    { title: '鞋楦型', dataIndex: 'xieXuan', key: 'xieXuan'},
    { title: '鞋跟型', dataIndex: 'xieGen', key: 'xieGen'},
    { title: '订单状态', dataIndex: 'order_state', key: 'order_state'},
    { title: '物流公司', dataIndex: 'transport_company', key: 'transport_company', render:(item) => {
      let _source = commonUtils.getTransportCompany(item);
      if (_source) {
        return _source.label;
      }
      return '';
    }},
    { title: '快递单号', dataIndex: 'transport_id', key: 'transport_id'},
    { title: '快递费用', dataIndex: 'transport_price', key: 'transport_price'},
    { title: '备注', dataIndex: 'remark', key: 'remark'},
  ]
}

export const getOrderShoesColumns = function(target) {
  let options = getOrderBaseColumns(target);
  return options.concat([
    { title: '门店', dataIndex: 'shop', key: 'shop', render:(item) => item.name},
    { title: '导购', dataIndex: 'guide', key: 'guide', render:(item) => item.name},
    { title: '客户', dataIndex: 'customer', key: 'customer', render:(item) => item.name},
    { title: '商品', dataIndex: 'goods', key: 'goods', render:(item) => item.name}
  ]);
}

export const getOrderBeltColumns = function(target) {
  let options = getOrderBaseColumns(target);
  return options.concat([
    { title: '门店', dataIndex: 'shop', key: 'shop', render:(item) => item.name},
    { title: '导购', dataIndex: 'guide', key: 'guide', render:(item) => item.name},
    { title: '客户', dataIndex: 'customer', key: 'customer', render:(item) => item.name},
    { title: '商品', dataIndex: 'goods', key: 'goods', render:(item) => item.name}
  ]);
}

export const getOrderWatchStrapColumns = function(target) {
  let options = getOrderBaseColumns(target);
  return options.concat([
    { title: '门店', dataIndex: 'shop', key: 'shop', render:(item) => item.name},
    { title: '导购', dataIndex: 'guide', key: 'guide', render:(item) => item.name},
    { title: '客户', dataIndex: 'customer', key: 'customer', render:(item) => item.name},
    { title: '商品', dataIndex: 'goods', key: 'goods', render:(item) => item.name}
  ]);
}

export const getOrderListOptions = function(target) {
  let options = [];
  if (target.orderType.tag === orderTypes.E_ORDER_TYPES.shoes) {
    options = getOrderShoesColumns(target);
  } else if (target.orderType.tag === orderTypes.E_ORDER_TYPES.belt) {
    options = getOrderBeltColumns(target);
  } else if (target.orderType.tag === orderTypes.E_ORDER_TYPES.watchStrap) {
    options =  getOrderWatchStrapColumns(target);
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

export const getOrderBaseOptions = function(target) {
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
      index:2, title:'脚型数据', 
      options:[
        {type:'input', name:'s_foot_size', label:'尺码', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
      ],
      left:{title:'左脚', options:[
        {type:'input', name:'s_left_length', label:'长度', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
        {type:'input', name:'s_left_zhiWei', label:'趾围', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},    
        {type:'input', name:'s_left_fuWei', label:'附维', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},    
      ]},
      right:{title:'右脚', options:[
        {type:'input', name:'s_right_length', label:'长度', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
        {type:'input', name:'s_right_zhiWei', label:'趾围', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},    
        {type:'input', name:'s_right_fuWei', label:'附维', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},    
      ]}
    },
    {
      index:9, title:'收货地址', options:[
        {type:'input', name:'transport_name', label:'收货人', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
        {type:'input', name:'transport_address', label:'收货地址', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
        {type:'input', name:'transport_phone', label:'收货电话', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
        {type:'input', name:'transport_zipcode', label:'邮编', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
      ]
    },
    {
      index:10, title:'订单信息', options:[
        {type:'number', name:'pay', label:'支付金额', options:{formatter:(value) => `${value}RMB`, parser:value => value.replace('RMB', '')}, itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}},
        {type:'select', name:'pay_type', label:'支付方式', itemOptions:{labelLeft:true}, selectItems:constants.BASE_CONSTANTS.PAY_TYPE, options:{defaultActiveFirstOption:true}, rule:{required:true}},
        {type:'select', name:'transport_company', label:'快递公司', itemOptions:{labelLeft:true}, selectItems:constants.BASE_CONSTANTS.TRANSPORT_COMPANYS, options:{defaultActiveFirstOption:true}, rule:{}},
        {type:'input', name:'transport_id', label:'快递单号', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{}},
        {type:'number', name:'transport_price', label:'快递费用', options:{formatter:(value) => `${value}RMB`, parser:value => value.replace('RMB', '')}, itemOptions:{hasFeedback:true, labelLeft:true}, rule:{}},
        {type:'textarea', name:'remark', label:'备注', itemOptions:{hasFeedback:true, labelLeft:true}, rule:{}},
      ]
    }
  ];
} 
export const getOrderShoesOptions = function(target) {
  let options = getOrderBaseOptions(target);
  return options.concat([
    {
      index:3, title:'商品信息', options:[
        {type:'select', name:'goods', label:'商品', itemOptions:{labelLeft:true}, selectItems:listToSelectOptions(target.props.goodsShoesList), options:{defaultActiveFirstOption:true, showSearch:true, optionFilterProp:'children'}, rule:{required:true}},    
       ]
    }
  ]);
}
export const getOrderBeltOptions = function(target) {
  let options = getOrderBaseOptions(target);
  return options;
}
export const getOrderWatchStrapOptions = function(target) {
  return options;
}
export const getOrderAddOptions = function(target) {
  if (target.orderType.tag === orderTypes.E_ORDER_TYPES.shoes) {
    return getOrderShoesOptions(target);
  } else if (target.orderType.tag === orderTypes.E_ORDER_TYPES.belt) {
    return getOrderBeltOptions(target);
  } else if (target.orderType.tag === orderTypes.E_ORDER_TYPES.watchStrap) {
    return getOrderWatchStrapOptions(target);
  }
  return [];
} 
export const getOrderEditOptions = function(target) {
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
