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
  {title: '试脚鞋投产'}, 
  {title: '试脚鞋寄出'}, 
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

class ShoesTryStep extends Component {
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
    if ((nextProps.result.type === ActionTypes.SUB_ORDER_TRY_FEEDBACK_ADD ||
      nextProps.result.type === ActionTypes.SUB_ORDER_TRY_FEEDBACK_UPDATE
      ) && nextProps.loading !== this.props.loading && !nextProps.loading) {
      if (nextProps.result.code === 0) {
        this.props.getSuborderTryFeedbackList(null, this.props.profile._id);
      }
    }
    if (nextProps.profile !== this.props.profile) {
      this.props.getSuborderTryFeedbackList(null, nextProps.profile._id);
      this.resetStep(this.state.currentFeedback);
    }
    if (nextProps.tryFeedbackList !== this.props.tryFeedbackList) {
      this.setCurrentFeedBack(nextProps.tryFeedbackList);
    }
  }

  componentDidMount(){
    if (this.props.profile.state === constants.BASE_CONSTANTS.E_ORDER_STATUS.TRY ||
      this.props.profile.state === constants.BASE_CONSTANTS.E_ORDER_STATUS.TRY_TRANSPORT
    ) { // 试鞋
      this.props.getSuborderTryFeedbackList(null, this.props.profile._id);
    }
    this.resetStep(this.state.currentFeedback);
  }

  setCurrentFeedBack = (list) => {
    if(!list){
      this.setState({currentFeedback:null, transportModify:true})
      return;
    }
    let data = null;
    for(let item of list) {
      if (item.status !== constants.BASE_CONSTANTS.E_ORDER_TRY_FEEDBACK_STATUS.END) {
        data = item;
        break;
      }
    }
    this.setState({currentFeedback:data, transportModify:!(data && data.transport_id)});
    this.resetStep(data);
  }

  resetStep = (currentFeedback) => {
    if (currentFeedback) {
      switch(currentFeedback.status) {
        case constants.BASE_CONSTANTS.E_ORDER_TRY_FEEDBACK_STATUS.START:
          this.setState({currentStep:0});
          break;
        case constants.BASE_CONSTANTS.E_ORDER_TRY_FEEDBACK_STATUS.TRANSPORT:
          this.setState({currentStep:1});
          break;
        default:
          this.setState({currentStep:0});
      }
    } else {
      this.setState({currentStep:0});
    }
  }

  renderCol = (col) => {
    if (col.dataIndex in this.props.profile) {
      let value = this.props.profile[col.dataIndex];
      if (col.render) {
        value = col.render(value);
      }
      let span = col.span || DEFAULT_COL_SPAN;
      return (
        <ProfileCol {...span} key={col.key}>
          <ProfileColLabel>{col.title}: </ProfileColLabel>
          <ProfileColValue>{value}</ProfileColValue>
        </ProfileCol>
      )
    }

    return null;
  }

  renderProuduct = () => {
    return (<div>
      <Row>
        <ShoesContent>试脚鞋投产中</ShoesContent>
      </Row>
      <Row style={{textAlign:'center'}}>
        <ShoesContentBtn type="primary" onClick={()=>{
          this.props.reqChangeSuborderState(this.props.profile._id, {state:constants.BASE_CONSTANTS.E_ORDER_STATUS.TRY_TRANSPORT});
        }}>制作完成去发货</ShoesContentBtn>
      </Row>
      {this.renderFeedBackList()}
    </div>);
  }

  renderTransport = () => {
    let transportId = '';
    if (this.state.currentFeedback) {
      transportId = this.state.currentFeedback.transport_id;
    }
    let isModify = this.state.transportModify;
    return (<div>
      <Row>
        <ShoesContent>试脚鞋已做好，请发货。</ShoesContent>
      </Row>
      <Row style={{width:'60%', textAlign:'center', margin:'0 auto'}}>
        <Input 
          placeholder="请输入快递单号" 
          disabled={!isModify} 
          defaultValue={transportId} 
          onChange={(e)=>this.setState({inputTransportId:e.target.value})}
          addonBefore={'快递单号'}
          addonAfter={
          isModify ?
          <a type="primary" onClick={()=>{
            this.props.reqUpdateSuborderTryFeedback(null, this.state.currentFeedback._id, {transport_id:this.state.inputTransportId})
            this.setState({transportModify:true})
          }}>确定</a>
          : <a type="primary" onClick={()=>this.setState({transportModify:true})}>修改</a>
        } />
      </Row>
      <Row style={{width:'60%', textAlign:'center', margin:'0.2rem auto'}}>
        {
          this.state.currentFeedback && this.state.currentFeedback.message ?
          <Button style={{margin:'0 0.15rem'}} type="primary" onClick={()=> {
            this.props.reqUpdateSuborderTryFeedback(null, this.state.currentFeedback._id, {status:constants.BASE_CONSTANTS.E_ORDER_TRY_FEEDBACK_STATUS.END})
          }}>修改试脚鞋</Button>
          :
          <Button style={{margin:'0 0.15rem'}} type="primary" onClick={()=> {
            this.setState({tryFeedbackAdding:true, tryFeedbackValue:''});
          }}>填写反馈内容</Button>
        }
        <Popconfirm title="确定到正品鞋投产阶段吗，确定后无法返回?" onConfirm={()=>{
          this.props.reqChangeSuborderState(this.props.profile._id, {state:constants.BASE_CONSTANTS.E_ORDER_STATUS.MAKING});
        }} okText="确定" cancelText="取消">
          <Button style={{margin:'0 0.15rem'}} type="primary">正品投产</Button>
        </Popconfirm>
      </Row>
      {this.renderFeedBackList()}
    </div>);
  }

  renderFeedBackList = () => {
    let rendTryAdd = () => {
      return(
        <div>
          <TextArea placeholder="请输入反馈内容" autosize={{ minRows: 2, maxRows: 10 }} defaultValue={this.state.currentFeedback && this.state.currentFeedback.message} onChange={(e)=>{
            this.setState({tryFeedbackValue:e.target.value})
          }} />
          <Row style={{padding:'0.2rem'}}>
            <Col span='12' style={{textAlign:'center'}}><Button type="primary" onClick={()=>{
              if (this.state.currentFeedback) {              
                this.props.reqUpdateSuborderTryFeedback(null, this.state.currentFeedback._id, {suborder_id:this.props.profile._id, message:this.state.tryFeedbackValue});
              }
              this.setState({tryFeedbackAdding:false, tryFeedbackValue:''})
            }}>确定</Button></Col>
            <Col span='12' style={{textAlign:'center'}}><Button type="primary" onClick={()=>{
              this.setState({tryFeedbackAdding:false, tryFeedbackValue:''})
            }}>取消</Button></Col>
          </Row>
        </div>
      );
    }
    let list = this.props.tryFeedbackList.map((item) => {
      if (item && item.message) {
        return item;
      }
      return null;
    })
    return (
      <Card title='反馈记录'>
        <div style={{width:"70%", margin:'0 auto'}}>
          {
            this.state.currentStep === 1 ?
            <div style={{width:"100%", margin:'0.15rem 0'}}>
                {
                  this.state.tryFeedbackAdding ? 
                  rendTryAdd()
                  : <Button type="dashed" style={{width:'100%'}} onClick={()=>this.setState({tryFeedbackAdding:true})}>{this.state.currentFeedback&&this.state.currentFeedback.message ? '修改当前反馈' : '新建反馈'}</Button>
                }
            </div>
            : null
          }
          <List
            header={null}
            footer={null}
            bordered
            dataSource={list}
            renderItem={item => {
              if (item && item.message) {
                let msgs = item.message.split('\n');
                return (<List.Item extra={moment(item.editor_time).format('YYYY-MM-DD HH:mm:ss')}>
                  <div style={{paddingBottom:5}}>{msgs.map((item, index) =>(<p style={{padding:0, margin:0, wordBreak:'break-all'}} key={index}>{item}</p>))}</div>
                </List.Item>)
              } else {
                return <div style={{height:0}}></div>;
              }
            }}
          />
        </div>
      </Card>
    )
  }

  renderEnd = () => {
    return (<div>
      {
        this.renderTransport()
      }
    </div>)
  }

  render() {
    return (
      <div>
        <OrderSteps current={this.state.currentStep}>
          {ORDER_STEPS.map((item) => {
            return <Step key={item.title} title={item.title} />
          })}
        </OrderSteps>
        <OrderStepContent>
          <Card  >
            {
              this.state.currentStep===0 
              &&
              this.renderProuduct()
            }
            {
              this.state.currentStep===1 
              &&
              this.renderEnd()
            }
          </Card>
        </OrderStepContent>
      </div>
    );
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
      reqUpdateSuborderTryFeedback:Actions.updateSuborderTryFeedback
    }, dispatch);
  }
)(ShoesTryStep);
