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
import utils from '../../../../utils/utils'
import { BASE_CONSTANTS } from '../../../constants/Constants';
import * as graphqlTypes from '../../../modules/graphqlTypes'

class OrderRechargeModal extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
      data:{
        reward:0
      }
    }

    this.options = [
      {type:'select', name:'pay_type', label:'来源', itemOptions:{labelLeft:true}, selectItems:constants.BASE_CONSTANTS.PAY_TYPE, options:{defaultActiveFirstOption:true}, rule:{required:true}},
      {type:'number', name:'r_amount', label:'数额', itemOptions:{labelLeft:true}, options:{onChange:this.onMountChange}, rule:{required:true}},
      {type:'text', name:'reward', label:'赠送', itemOptions:{labelLeft:true}, rule:{required:true}},
    ]
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.setState({visible:this.props.visible})
  }

  componentWillReceiveProps(nextProps){
  }

  componentDidMount() {
    this.onReqRechargeList();
  }

  render() {
    let _options = this.options.map((item, index) => {
      if (!item.decoratorOptions) {
        item.decoratorOptions = {};
      }
      let value = this.state.data[item.name] || '';
      if (value._id) {
        value = value._id;
      }
      item.decoratorOptions.initialValue = value;
      return item;
    });
    return (
      <BaseFormModal
        title={this.props.title}
        options={_options}
        visible={this.state.visible}
        loading={this.props.loading}
        result={this.props.result}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        onAfterClose={this.props.afterClose || null}
        confirmLoading={this.state.confirmLoading}
        actionType={ActionTypes.ORDER_ADD}
        onSubmitSuccess={()=>{
          // this.props.reqGetGoodsShoesList(this.props.pageInfo.page, this.props.pageInfo.pageSize);
        }}
      />
    );
  }

  onSubmit = (err, values) => {
    if (!err) {
      let order = {};
      order.source = this.props.order.source;
      order.pay_type = values.pay_type;
      order.pay = values.r_amount;

      let sub = {};
      sub.shop = this.props.order.shop;
      sub.guide = this.props.order.guide;
      sub.customer = this.props.customer;
      sub.r_amount = values.r_amount;
      sub.price = values.r_amount;
      sub.type = BASE_CONSTANTS.E_ORDER_TYPE.RECHARGE;
      let subOrders = [];
      subOrders.push(sub);
      order.sub_orders = subOrders;

      this.props.reqAddOrder('', order);
    }
  }

  onMountChange = (value) => {
    let list = this.props.rechargeList;
    if (list) {
      list = list.sort((a,b)=>a.mount>b.mount?-1:1);
      for(let element of list) {
        if (value >= element.mount) {
          this.setState({data:{reward:element.reward}})
          return;
        }
      };
    }
    this.setState({data:{reward:0}})
  }

  onReqRechargeList = () => {
    let con = {
      type:BASE_CONSTANTS.COMMON_DATA_TYPES.RECHARGE_REWARD
    };
    this.props.reqRechargeList("rechargeList:commonList", graphqlTypes.rechargeType, con);
  }
}

export default connect(
  state => ({
    loading:state.sales.loading,
    result:state.sales.result,
    rechargeList:state.sales.rechargeList
  }),
  (dispatch) => {
    return bindActionCreators({
      reqRechargeList: Actions.getSalesBaseList,
      reqAddOrder: Actions.addOrder,
    }, dispatch);
  }
)(Form.create()(OrderRechargeModal));
