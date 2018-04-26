import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import {
  Card,
  Icon,
  Layout,
  message,
  Table,
  Button,
  Form, 
  Select, 
  InputNumber, 
  Switch,
  Radio,
  Slider, Upload,
  Modal,
  Row,Col
} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import {
  NormalForm,
  ContentTitle
} from '../../common/common.styled'

import {
  Root,
} from './styled'

import * as graphqlTypes from '../../../modules/graphqlTypes'
import * as orderTypes from '../../../modules/orderTypes'
import * as ActionTypes from '../../../constants/ActionTypes'
import Actions from '../../../actions'
import * as validate from '../../../../base/utils/validate'
import * as constants from '../../../constants/Constants'
import * as common from '../../../modules/common'
import FormItemComponent from '../../common/FormItemComponent'
import BaseFormModal from '../../common/BaseFormModal'
import * as optionsType from '../types'
import { ORDER_TYPES, listToSelectOptions } from './types';

import ShoesAdd from './goods/ShoesAdd'
import BeltAdd from './goods/BeltAdd'
import WatchStrapAdd from './goods/WatchStrapAdd'
import MaintainAdd from './goods/MaintainAdd'
import OrnamentAdd from './goods/OrnamentAdd'
import GoodsAddBase from './goods/GoodsAddBase'
import { GOODS_TYPES } from '../goods/types'

const initFormDefaultValues = (options, values) => {
  return options.map((item) => {
    item.options = item.options.map((sub) => {
      let value = values[sub.name] || '';
      if (value._id) {
        value = value._id;
      }
      if (value !== null && value !== undefined && value !== NaN && value !== '') {
        if (!sub.decoratorOptions) {
          sub.decoratorOptions = {};
        }
        sub.decoratorOptions.initialValue = value;
      }
      return sub;
    })
    return item;
  })
}
class OrderGoodsAddModal extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
      currentOrderType:'',
      data:{},
      customs:[]
    }
    this.orderType = null;
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.state.currentOrderType = constants.BASE_CONSTANTS.ORDER_TYPE[0].value;
    if (this.props.isRecharge) {
      this.state.currentOrderType = constants.BASE_CONSTANTS.E_ORDER_TYPE.RECHARGE;
    }
    if (this.props.data) {
      this.state.currentOrderType = this.props.data.type;
    }
    this.setState({visible:this.props.visible})
    
    this.props.reqGetGoodsBaseDatas();
    this.onGoodsAdd = null;
    if (this.state.currentOrderType) {
      this.onReqOrderGoodsList(this.state.currentOrderType);
    }
  }

  renderHeader = () => {
    return (
      <div>
        {
          this.props.isRecharge || this.props.data ? null
          :
          <Select style={{ width:120, marginBottom:20 }} defaultValue={this.state.currentOrderType} onChange={this.onChange}>
            {
              constants.BASE_CONSTANTS.ORDER_TYPE.map((item) => {
                if (item.value !== constants.BASE_CONSTANTS.E_ORDER_TYPE.RECHARGE) {
                  return <Option key={item.value} value={item.value}>{item.label}</Option>
                }
              })
            }
          </Select>
        }
        
      </div>
    );
  }

  renderBody = () => {
    if (!this.orderType) {
      return null;
    }
    switch(this.orderType.key) {
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.SHOES:
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.DESIGN:
      return (
        <ShoesAdd 
          data={this.props.data} 
          orderType={this.orderType} 
          setGoodsCallback={this.onSetGoodsAddCallback} 
          onAddSuccess={this.onAddSuccess}
          isDesigon={(this.orderType.key===constants.BASE_CONSTANTS.E_ORDER_TYPE.DESIGN)}
          customerId={this.props.customerId}
          onAddGoods={this.onAddGoods}
          onAddMaterial={this.onAddMaterial}
          onAddCommon={this.onAddCommon}
          customer={this.props.customer} />
      )
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.BELT:
      return (
        <BeltAdd 
          data={this.props.data} 
          orderType={this.orderType} 
          setGoodsCallback={this.onSetGoodsAddCallback} 
          onAddSuccess={this.onAddSuccess}
          customerId={this.props.customerId}
          onAddGoods={this.onAddGoods}
          onAddMaterial={this.onAddMaterial}
          onAddCommon={this.onAddCommon}
          customer={this.props.customer} />
      )
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.WATCH_STRAP:
      return (
        <WatchStrapAdd 
          data={this.props.data} 
          orderType={this.orderType} 
          setGoodsCallback={this.onSetGoodsAddCallback} 
          onAddSuccess={this.onAddSuccess}
          customerId={this.props.customerId}
          onAddGoods={this.onAddGoods}
          onAddMaterial={this.onAddMaterial}
          onAddCommon={this.onAddCommon}
          customer={this.props.customer} />
      )
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.MAINTAIN:
      return (
        <MaintainAdd 
          data={this.props.data} 
          orderType={this.orderType} 
          setGoodsCallback={this.onSetGoodsAddCallback} 
          onAddSuccess={this.onAddSuccess}
          customerId={this.props.customerId}
          onAddGoods={this.onAddGoods}
          onAddMaterial={this.onAddMaterial}
          onAddCommon={this.onAddCommon}
          customer={this.props.customer} />
      )
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.ORNAMENT:
      return (
        <OrnamentAdd 
          data={this.props.data} 
          orderType={this.orderType} 
          setGoodsCallback={this.onSetGoodsAddCallback} 
          onAddSuccess={this.onAddSuccess}
          customerId={this.props.customerId}
          onAddGoods={this.onAddGoods}
          onAddMaterial={this.onAddMaterial}
          onAddCommon={this.onAddCommon}
          customer={this.props.customer} />
      )
    }
    return null;
  }

  render() {
    this.orderType = null;
    for(let value of ORDER_TYPES) {
      if (value.key === this.state.currentOrderType) {
        this.orderType = value;
      }
    }

    return (
      <div>
        <BaseFormModal
          title={this.props.title}
          visible={this.state.visible}
          result={this.props.result}
          renderHeader={this.renderHeader}
          renderBody={this.renderBody}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          modalOptions={{width:'60%'}}
          onAfterClose={this.props.afterClose || null}
        />
        <GoodsAddBase 
          goodsAddProps= {{
            visible:this.state.goodsAddVisible,
            key: this.orderType.key,
            onSubmitSuccess:()=>{
              this.onReqOrderGoodsList(this.orderType.key);
            },
            afterClose:()=>{this.setState({goodsAddVisible:false})},
          }}

          materialAddProps={{
            visible:this.state.materialAddVisible,
            onSubmitSuccess:()=>{
              this.props.reqGetGoodsBaseDatas();
            },
            afterClose:()=>{this.setState({materialAddVisible:false})},
          }}

          commonAddProps={{
            visible:this.state.commonAddVisible,
            onSubmitSuccess:()=>{
              this.props.reqGetGoodsBaseDatas();
            },
            afterClose:()=>{this.setState({commonAddVisible:false})},
            key:this.state.commonAddKey
          }}
        />
      </div>
    );
  }

  onReqOrderGoodsList = (type) => {
    let con = {
      put:true
    };
    switch(type) {
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.SHOES:
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.DESIGN:
        con = {
          goods:constants.BASE_CONSTANTS.E_ORDER_TYPE.SHOES, put:true
        };
        this.props.reqGetGoodsList('goodsShoesList:goodsList', graphqlTypes.goodsType, con, {page:-1, pageSize:0});
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.BELT:
        con = {
          goods:type, put:true
        };
        this.props.reqGetGoodsList('goodsBeltList:goodsList', graphqlTypes.goodsType, con, {page:-1, pageSize:0});
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.ORNAMENT:
        con = {
          goods:type, put:true
        };
        this.props.reqGetGoodsList('goodsOrnamentList:goodsList', graphqlTypes.goodsType, con, {page:-1, pageSize:0});
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.WATCH_STRAP:
        con = {
          goods:type, put:true
        };
        this.props.reqGetGoodsList('goodsWatchStrapList:goodsList', graphqlTypes.goodsType, con, {page:-1, pageSize:0});
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.MAINTAIN:
        con = {
          type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.MAINTAIN, put:true
        };
        this.props.reqGetGoodsList('maintainList:commonList', graphqlTypes.maintainType, con, {page:-1, pageSize:0});
      break;
    }
  }

  onChange = (value) => {
    this.onGoodsAdd = null;
    this.setState({currentOrderType:value});
    this.onReqOrderGoodsList(value);
  }

  onSetGoodsAddCallback = (callback) => {
    this.onGoodsAdd = callback;
  }

  onSubmit = () => {
    if (this.onGoodsAdd) {
      return this.onGoodsAdd();
    }
    return false;
  }

  onAddSuccess = (values) => {
    if (this.props.onAdd) {
      values.type = this.state.currentOrderType;
      this.props.onAdd(values);
      this.setState({visible:false})
    }
  }

  onAddGoods = () => {
    let index = 0;

    switch(this.orderType.key) {
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.SHOES:
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.DESIGN:
        index = 0;
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.BELT:
        index = 1;
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.WATCH_STRAP:
        index = 2;
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.MAINTAIN:
        index = -1;
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.ORNAMENT:
        index = 4;
      break;
    }
    if (index === -1) {
      // 护理
    } else {
      this.setState({goodsAddTypeIndex:index, goodsAddVisible:true});
    }
  }

  onAddMaterial = () => {
    this.setState({materialAddVisible:true});
  }
  onAddCommon = (key) => {
    this.setState({commonAddKey:key, commonAddVisible:true});
  }
}

export default connect(
  state => ({
    loading:state.sales.loading,
    result:state.sales.result,
    sales:state.sales,
    shopList:state.shop.shopList,
    guideList:state.shop.shopGuideList,
    customerList:state.customer.customerList,
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetOrderList: Actions.getOrderList,
      reqAddOrder: Actions.addOrder,
      reqGetGoodsList: Actions.getGoodsList,
      reqGetGoodsBaseDatas: Actions.getGoodsBaseDatas
    }, dispatch);
  }
)(Form.create()(OrderGoodsAddModal));
