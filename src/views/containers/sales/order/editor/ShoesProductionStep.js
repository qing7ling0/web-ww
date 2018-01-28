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
  Row,Col,
  Input,
  Steps,
  Popconfirm,
  List
} from 'antd'

const Step = Steps.Step;
const TextArea = Input.TextArea;
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
  PhotoDeleteBtn,
  PhotoUploadBtnCotnainer,
  OrderSteps,
  OrderStepContent,
  BtnNext,
  NextContainer,
  OrderSuccessContainer,
  OrderSuccessTitle,
} from '../styled'

import * as graphqlTypes from '../../../../modules/graphqlTypes'
import * as orderTypes from '../../../../modules/orderTypes'
import * as ActionTypes from '../../../../constants/ActionTypes'
import Actions from '../../../../actions'
import * as validate from '../../../../../base/utils/validate'
import * as constants from '../../../../constants/Constants'
import * as config from '../../../../constants/Config'
import * as common from '../../../../modules/common'
import FormItemComponent from '../../../common/FormItemComponent'
import BaseFormModal from '../../../common/BaseFormModal'
import * as optionsType from '../../types'
import { ORDER_TYPES, listToSelectOptions } from '../types';
import { commonUtils } from '../../../../modules/common';

const DEFAULT_COL_SPAN = {xs:24,sm:12,lg:8};

const ORDER_STEPS = [
  {title: '正品鞋投产'}, 
  {title: '帮面针车'}, 
  {title: '复底成型'}, 
  {title: '染色水洗'}, 
  {title: '品检出货'}, 
];
const ShoesContent = styled.div`
  font-size: 0.2rem;
  text-align:center;
  width:100%;
  padding:0.1rem 0;
`
const ShoesContentBtn = styled(Button)`
margin:0.1rem 0;
`

class ShoesProductionStep extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      currentStep:-1,
      currentFeedback:null,
      transportModify:false,
    }
  }
  
  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
  }
  
  componentWillReceiveProps(nextProps){
    if (nextProps.profile !== this.props.profile) {
    }
  }

  componentDidMount(){
  }

  renderCol = (col) => {
    if (col.key in this.props.profile) {
      let value = this.props.profile[col.key];
      if (col.render) {
        value = col.render(value);
      }
      let span = col.span || DEFAULT_COL_SPAN;
      return (
        <ProfileCol {...span} key={col.key}>
          <ProfileColLabel>{col.label}: </ProfileColLabel>
          <ProfileColValue>{value}</ProfileColValue>
        </ProfileCol>
      )
    }

    return null;
  }

  renderProduction = () =>{
    return (
      <div style={{width:'60%', margin:'0 auto', textAlign:'center'}}>
        <Button style={{margin:'0 auto'}}  disabled={!this.props.canOperate} type="primary" onClick={()=> {
          // this.setState({modify:true});
          this.props.reqSuborderUpdate(this.props.profile._id, {s_production_step:this.props.profile.s_production_step+1})
        }}>下一环节</Button>
      </div>
    );
  }

  renderTransport = () => {
    return (<div style={{width:'100%'}}>
      <Row>
        <ShoesContent>正品鞋制作完成，请完成品检并发货！</ShoesContent>
      </Row>
      <Row style={{textAlign:'center'}}>
        <div style={{width:'60%', margin:'0 auto', textAlign:'center'}}>
          <Button style={{margin:'0 auto'}} disabled={!this.props.canOperate} type="primary" onClick={()=> {
            // this.setState({modify:true});
            this.props.reqSuborderUpdate(this.props.profile._id, {s_production_step:4, state:constants.BASE_CONSTANTS.E_ORDER_STATUS.TRANSPORT})
          }}>去发货</Button>
        </div>
      </Row>
    </div>);
  }

  render() {

    let step = this.props.profile.s_production_step || 0;
    return (
      <div style={{width:'100%'}}>
        <OrderSteps current={step}>
          {ORDER_STEPS.map((item) => {
            return <Step key={item.title} title={item.title} />
          })}
        </OrderSteps>
        <OrderStepContent>
          <Card  >
            {
              step<4
              &&
              this.renderProduction()
            }
            {
              step===4 
              &&
              this.renderTransport()
            }
          </Card>
        </OrderStepContent>
      </div>
    );
  }

  onSubmitTransport = (err, values) => {
    if (!err) {
      this.setState({modify:false})
      this.props.reqSuborderUpdate(this.props.profile._id, values);
    }
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
    lastCustomerOrderInfo:state.customer.lastCustomerOrderInfo,
    tryFeedbackList:state.sales.tryFeedbackList
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetOrderList: Actions.getOrderList,
      reqAddOrder: Actions.addOrder,
      reqGetGoodsList: Actions.getGoodsList,
      reqGetGoodsBaseDatas: Actions.getGoodsBaseDatas,
      reqLastCustomerOrderInfo: Actions.lastCustomerOrderInfo,
      getSuborderTryFeedbackList: Actions.getSuborderTryFeedbackList,
      addSuborderTryFeedback:Actions.addSuborderTryFeedback,
      reqChangeSuborderState:Actions.suborderStateChange,
      reqSuborderProfile: Actions.suborderProfile,
      reqSuborderUpdate:Actions.suborderUpdate
    }, dispatch);
  }
)(ShoesProductionStep);
