import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'
import styled from 'styled-components'

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
  Row,Col,Steps 
} from 'antd'

const Step = Steps.Step;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import {
  NormalForm
} from '../../common/common.styled'

import {
  Root,
  OrderSteps,
  OrderStepContent,
  BtnNext,
  NextContainer
} from './styled'

import * as ActionTypes from '../../../constants/ActionTypes'
import Actions from '../../../actions'
import * as validate from '../../../../base/utils/validate'
import * as constants from '../../../constants/Constants'
import * as common from '../../../modules/common'
import FormItemComponent from '../../common/FormItemComponent'
import BaseFormModal from '../../common/BaseFormModal'
import * as optionsType from '../types'
import { ORDER_TYPES, ORDER_OPTIONS } from './types'

import OrderGoodsAddModal from './OrderGoodsAddModal'


const ADD_ORDER_STEPS = [{
  title: '选择客户',
}, {
  title: '选择商品',
}, {
  title: '结算',
}, {
  title: '完成',
}];

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

class OrderAddContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      addVisible:false,
      visible:false,
      customerPhoneList:[],
      customerPhone:'',
      customerName:'',
      goods:[],
      customCount:1,
      currentStep:0,
      currentStepStatus:'finish',
      stepOneValues:{}
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.orderType = ORDER_TYPES[0];
    for(let value of ORDER_TYPES) {
      if (value.tag === this.props.match.params.type) {
        this.orderType = value;
      }
    }
    this.setState({visible:this.props.visible})
    this.props.reqGetGoodsBaseDatas();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.type !== this.props.match.params.type) {
      for(let value of ORDER_TYPES) {
        if (value.tag === nextProps.match.params.type) {
          this.orderType = value;
        }
      }
    }
  }
  // <BaseFormModal
  //   title={this.props.title}
  //   options={this.options}
  //   visible={this.state.visible}
  //   loading={this.props.loading}
  //   result={this.props.result}
  //   onSubmit={this.onSubmit}
  //   onCancel={this.onCancel}
  //   onAfterClose={this.props.afterClose || null}
  //   confirmLoading={this.state.confirmLoading}
  //   actionType={ActionTypes.ORDER_ADD}
  //   onSubmitSuccess={this.props.onSubmitSuccess}
  // />

  renderBaseForm(item, index, vertical) {
    let span = {xs:24, sm:12, lg:8};
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
              <Col key={index} xs={24} sm={12} lg={8}><FormItemComponent key={item.name} options={item} form={this.props.form} /></Col>
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

  renderCustomer = () => {
    this.options = ORDER_OPTIONS.add(this);
    this.options = initFormDefaultValues(this.options, this.state.stepOneValues);
    return (
      <NormalForm onSubmit={this.onNext}>
        {
          this.options.map((item, index) => {
            return item.left ? this.renderFoot(item,index) : this.renderBaseForm(item, index);
          })
        }
        <NextContainer>
          <BtnNext type="primary" onClick={()=>{
            this.props.form.validateFields((err, values) => {
              if (!err) {
                this.onNext(values);
              }
            });
          }}>下一步</BtnNext>
        </NextContainer>
      </NormalForm>
    )
  }

  renderGoods = () => {
    return (
      <div>
        <Table
          bordered={true}
          columns={ORDER_OPTIONS.goodsList(this)} 
          dataSource={this.state.goods}
          showHeader={true}
          title={()=>{
            return (
              <div>
                <Button type="primary" onClick={()=>{this.setState({addVisible:true})}}>添加</Button>
                <Button type="primary" onClick={()=>{this.setState({addVisible:true, isRechargeOrder:true})}}>充值</Button>
              </div>
            );
          }}
        />
        {
          this.state.addVisible ?
          <OrderGoodsAddModal 
            title={'添加商品'}
            isRecharge={this.state.isRechargeOrder}
            visible={this.state.addVisible} 
            onAdd={this.onGoodsAdd}
            afterClose={()=>this.setState({addVisible:false})}/> 
          : null
        }
        <NextContainer>
          <BtnNext type="primary" onClick={()=>{this.onPrev()}}>上一步</BtnNext>
          <BtnNext type="primary" disabled={this.state.goods.length === 0} onClick={()=>{this.onNext()}}>下一步</BtnNext>
        </NextContainer>
      </div>
    );
  }

  render() {
    return (
      <div>
        <OrderSteps current={this.state.currentStep}>
          {ADD_ORDER_STEPS.map((item) => {
            return <Step key={item.title} title={item.title} />
          })}
        </OrderSteps>
        <OrderStepContent>
          <Card noHovering={true}>
            {
              this.state.currentStep===0 
              && 
              this.renderCustomer()
            }
            {
              this.state.currentStep===1 
              && 
              this.renderGoods()
            }
          </Card>
        </OrderStepContent>
      </div>
    );
  }

  onCustomerPhoneFocus = (value) => {
    let con = null;
    if (this.state.customerPhone) {
      con = `{"phone":{"$regex":"/^${this.state.customerPhone}/i"}}`;
    }
    this.props.reqCustomerList(0, 10000, con);
  }
  onCustomerPhoneChange = (value) => {
    if (value !== this.state.customerPhone) {
      this.setState({ customerPhone:value });
      let con = null;
      if (value) {
        con = `{"phone":{"$regex":"/^${value}/i"}}`;
      }
      this.props.reqCustomerList(0, 10000, con);
    }
  }
  onCustomerPhoneSelect = (value, option) => {
    let _id = option.props.haId;
    if (_id) {
      this.selectCustomer(_id);
    }
  }
  
  onCustomerNameFocus = (value) => {
    let con = null;
    if (this.state.customerName) {
      con = `{"name":{"$regex":"/^${this.state.customerName}/i"}}`;
    }
    this.props.reqCustomerList(0, 10000, con);
  }
  onCustomerNameChange = (value) => {
    if (value !== this.state.customerName) {
      this.setState({ customerName:value });
      let con = null;
      if (value) {
        con = `{"name":{"$regex":"/^${value}/i"}}`;
      }
      this.props.reqCustomerList(0, 10000, con);
    }
  }
  onCustomerNameSelect = (value, option) => {
    let _id = option.props.haId;
    if (_id) {
      this.selectCustomer(_id);
    }
  }

  selectCustomer = (id) => {
    const {form:forms} = this.props;
    for(let value of this.props.customerList) {
      if (value._id === id) {
        forms.setFieldsValue({name:value.name});
        forms.setFieldsValue({phone:value.phone});
        forms.setFieldsValue({sex:value.sex});
        forms.setFieldsValue({birthday:new moment(value.birthday)});
        forms.setFieldsValue({weixin:value.weixin});
        
        if (value.leftFoot) {
          forms.setFieldsValue({foot_size:value.leftFoot.size});
          forms.setFieldsValue({l_length:value.leftFoot.length});
          forms.setFieldsValue({l_zhiWei:value.leftFoot.zhiWei});
          forms.setFieldsValue({l_fuWei:value.leftFoot.fuWei});
        }
        
        if (value.rightFoot) {
          forms.setFieldsValue({r_length:value.rightFoot.length});
          forms.setFieldsValue({r_zhiWei:value.rightFoot.zhiWei});
          forms.setFieldsValue({r_fuWei:value.rightFoot.fuWei});
        }
      }
    }
  }

  onPrev = () => {
    this.setState({currentStep:Math.max(0,this.state.currentStep-1)})
  }

  onNext = (values) => {
    if (this.state.currentStep === 0) {
      let order = {};
      let customer = {};
      for(let key in values) {
        if (key !== 'source') {
          order[key] = values[key];
        } else if (key === 'birthday') {
          customer[key] = moment(values[key]).format('YYYY-MM-DD');
        } else {
          customer[key] = values[key];
        }
      }
      this.setState({stepOneValues:values, customer:customer, order:order, currentStep:this.state.currentStep+1});
    } else if (this.state.currentStep === 1) {
      
      this.setState({currentStep:this.state.currentStep+1});
    } else if (this.state.currentStep === 2) {
      
      this.setState({currentStep:this.state.currentStep+1});
    }
    // let customer = {};
    // for(let key in values) {
    //   if (key === 'name' || key ==='phone' || key==='sex' || key==='weixin') {
    //     customer[key] = values[key];
    //   } else if (key === 'birthday') {
    //     customer[key] = moment(values[key]).format('YYYY-MM-DD');
    //   } else {
    //     order[key] = values[key];
    //   }
    // }
    // if (this.orderType.tag === E_ORDER_TYPES.shoes) {
    //   // order
    //   order.s_count = 1;
    //   order.s_kuanhao = '款号';
    //   order.s_xieXuan = '鞋楦';
    //   order.s_xieGen = '鞋跟';
    //   order.s_guiGe = '规格';
    //   order.s_material = this.shoes.material.name;
    //   order.s_xiemian_color = this.shoes.out_color.name;
    //   order.s_leili_color = this.shoes.in_color.name;
    //   // s_customs:[customSchema], // 特殊定制
    // }
    // order.customer = customer;
    // this.props.reqAddOrder(this.orderType.query, order);
  }

  onGoodsAdd = (values) => {
    let goods = this.state.goods;
    goods.push(values);
    this.setState({goods:goods});
  }
}

export default connect(
  state => ({
    loading:state.sales.loading,
    result:state.sales.result,
    sales:state.sales,
    shopList:state.shop.shopList,
    guideList:state.shop.shopGuideList,
    customerList:state.customer.customerList
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetOrderList: Actions.getOrderList,
      reqAddOrder: Actions.addOrder,
      reqGetGoodsList: Actions.getGoodsList,
      reqCustomerList:Actions.getCustomerList,
      reqGetGoodsBaseDatas: Actions.getGoodsBaseDatas
    }, dispatch);
  }
)(Form.create()(OrderAddContainer));