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
  Modal
} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import {
  NormalForm
} from '../../common/common.styled'

import {
  Root,
} from './styled'

import * as ActionTypes from '../../../constants/ActionTypes'
import Actions from '../../../actions'
import * as validate from '../../../../base/utils/validate'
import * as constants from '../../../constants/Constants'
import * as common from '../../../modules/common'
import FormItemComponent from '../../common/FormItemComponent'
import BaseFormModal from '../../common/BaseFormModal'
import * as optionsType from '../types'
import { ORDER_TYPES } from './types';

class OrderGoodsAddModal extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
      currentOrderType:'',
      data:{}
    }
    this.orderType = null;
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    if (this.props.isRecharge) {
      this.currentOrderType = constants.BASE_CONSTANTS.E_ORDER_TYPE.RECHARGE;
    }
    if (this.props.isEditMode) {
      this.currentOrderType = this.props.orderType;
    }
    this.setState({visible:this.props.visible})
  }

  renderHeader = () => {
    return (
      <div>
        {
          this.props.isRecharge || this.props.isEditMode ? null
          :
          <Select style={{ width:120, marginBottom:20 }} onChange={this.onChange}>
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

  render() {
    this.orderType = null;
    for(let value of ORDER_TYPES) {
      if (value.key === this.state.currentOrderType) {
        this.orderType = value;
      }
    }
    this.options=[];
    if (this.orderType) {
      this.options = this.orderType.addOptions(this);
      this.options = options.map((item, index) => {
        if (!item.decoratorOptions) {
          item.decoratorOptions = {};
        }
        let value = this.props.data[item.name] || '';
        if (value._id) {
          value = value._id;
        }
        item.decoratorOptions.initialValue = value;
        return item;
      });
    }

    return (
      <BaseFormModal
        title={this.props.title}
        options={this.options}
        visible={this.state.visible}
        result={this.props.result}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        onAfterClose={this.props.afterClose || null}
      />
    );
  }

  onChange = (value) => {
    this.setState({currentOrderType:value});
  }

  onSubmit = (err, values) => {
    if (!err) {
      if (this.props.onAdd) {
        values.type = this.currentOrderType;
        this.props.onAdd(values);
      }
    }
  }
}

export default connect(
  state => ({
    loading:state.sales.loading,
    result:state.sales.result,
    shopList:state.shop.shopList,
    guideList:state.shop.shopGuideList,
    customerList:state.customer.customerList,
    goodsShoesList:state.sales.goodsShoesList
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetOrderList: Actions.getOrderList,
      reqAddOrder: Actions.addOrder
    }, dispatch);
  }
)(Form.create()(OrderGoodsAddModal));
