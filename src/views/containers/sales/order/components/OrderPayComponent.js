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
} from '../../../common/common.styled'

import {
  Root,
  ProfileCol,
  ProfileColLabel,
  ProfileColValue,
  ProfileBtnBack,
  ProfileRowTitle,
  BtnNext,
  NextContainer
} from '../styled'

import * as graphqlTypes from '../../../../modules/graphqlTypes'
import * as orderTypes from '../../../../modules/orderTypes'
import * as ActionTypes from '../../../../constants/ActionTypes'
import Actions from '../../../../actions'
import * as validate from '../../../../../base/utils/validate'
import * as constants from '../../../../constants/Constants'
import * as common from '../../../../modules/common'
import FormItemComponent from '../../../common/FormItemComponent'
import BaseFormModal from '../../../common/BaseFormModal'
import * as optionsType from '../../types'
import { ORDER_TYPES, ORDER_PAY_OPTIONS, listToSelectOptions } from '../types';
import { commonUtils } from '../../../../modules/common';

class OrderPayComponent extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
      currentOrderType:'',
      data:{},
      customs:[],
      selectShoes:{}, // 当前选择的鞋子
      submitOrdering:false,
      pay_type:'0',
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    if (constants.BASE_CONSTANTS.PAY_TYPE.length > 0) {
      this.setState({pay_type:constants.BASE_CONSTANTS.PAY_TYPE[0].value})
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.result.type === ActionTypes.ORDER_ADD && nextProps.loading !== this.props.loading && !nextProps.loading) {
      this.setState({submitOrdering:false})
      if (nextProps.result.code === 0) {
        this.props.onOrderAddSuccess();
      }
    }
  }

  renderBaseForm(item, index, vertical) {
    let span = {sm:24, lg:12};
    if (vertical) {
      span={};
    }
    return (
      <Card key={index} title={item.title} bordered={false} noHovering={true} bodyStyle={{padding:0}}>
        <Row>
          {
            item.options.map((item, index) => {
              return <Col key={index} {...span}><FormItemComponent key={item.name} options={item} form={this.props.form} /></Col>
            })
          }
        </Row>
      </Card>
    )
  }

  renderFoot(item, index) {
    return (
      <Card key={index} title={item.title} bordered={false} noHovering={true}>
        <Row>
          {
            item.options.map((item, index) => {
              return (<Col key={index} xs={24} sm={12} lg={8}><FormItemComponent key={item.name} options={item} form={this.props.form} /></Col>);
            })
          }
        </Row>
        <Row>
          <Col xs={{span:24}} md={{span:10, offset:1}} lg={{span:8, offset:2}}>{this.renderBaseForm(item.left, index+1000, true)}</Col>
          <Col xs={{span:24}} md={{span:10, offset:2}} lg={{span:8, offset:4}}>{this.renderBaseForm(item.right, index+1000, true)}</Col>
        </Row>
      </Card>
    )
  }

  render() {
    return (
      <div>
        <Table
          bordered={true}
          columns={ORDER_PAY_OPTIONS.goodsList(this)} 
          dataSource={this.props.goods}
          pagination={false}
          footer={()=>{
            return (
              <Row>
                <Col span={12}>
                  <Row>
                    <ProfileCol span={24}>
                      <ProfileColLabel>合计：</ProfileColLabel>
                      <ProfileColValue>{this.calcPayMount()}</ProfileColValue>
                    </ProfileCol>
                      <ProfileCol span={24}>
                        <ProfileColLabel>优惠：</ProfileColLabel>
                        <ProfileColValue>{this.calcDiscountMount()}</ProfileColValue>
                      </ProfileCol>
                  </Row>
                </Col>
                <Col span={6}>
                  <Select defaultValue={this.state.pay_type} onChange={(value)=>{
                    this.setState({pay_type:value});
                  }}>
                    {
                      constants.BASE_CONSTANTS.PAY_TYPE.map((item, index) => {
                        return <Option key={item.value}>{item.label}</Option>
                      })
                    }
                  </Select>
                </Col>
                <Col span={6}>
                  <Button type="primary" onClick={()=>this.handleSelectDiscount}>选择优惠券</Button>
                </Col>
              </Row>
            );
          }}
        />
        {
          this.state.addVisible ?
          <OrderGoodsAddModal 
            title={'添加商品'}
            isRecharge={this.state.isRechargeOrder}
            visible={this.state.addVisible} 
            customer={this.state.customer}
            onAdd={this.onGoodsAdd}
            afterClose={()=>this.setState({addVisible:false})}/> 
          : null
        }
        <NextContainer>
          <BtnNext type="primary" onClick={this.props.onPrev}>上一步</BtnNext>
          <BtnNext type="primary" onClick={this.handlePay}>提交订单</BtnNext>
        </NextContainer>
      </div>
    );
  }

  calcDiscountMount = () => {
    return 1000;
  }

  calcPayMount = ()=> {
    let price = 0;
    for(let good of this.props.goods) {
      price += good.price;
      if (good.s_customs) {
        for(let cus of good.s_customs) {
          price += cus.price;
        }
      }

      if (good.urgent) {
        price += good.urgent.price;
      }
    }
    return Math.max(0, price-this.calcDiscountMount());
  }

  handlePay = () => {
    let order = {};
    order.source = this.props.order.source;
    order.pay = this.calcPayMount();
    order.pay_type = this.state.pay_type;

    let subOrders = [];
    for(let good of this.props.goods) {
      let sub = {...good};
      sub.shop = this.props.order.shop;
      sub.guide = this.props.order.guide;
      sub.customer = this.props.customer;
      subOrders.push(sub);
    }
    order.sub_orders = subOrders;

    this.props.reqAddOrder('', order);
    this.setState({submitOrdering:true});
  }

  handleSelectDiscount = () => {

  }
}

export default connect(
  state => ({
    loading:state.sales.loading,
    result:state.sales.result,
    sales:state.sales,
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetOrderList: Actions.getOrderList,
      reqAddOrder: Actions.addOrder,
      reqGetGoodsList: Actions.getGoodsList,
      reqGetGoodsBaseDatas: Actions.getGoodsBaseDatas,
      reqLastCustomerOrderInfo: Actions.lastCustomerOrderInfo
    }, dispatch);
  }
)(OrderPayComponent);
