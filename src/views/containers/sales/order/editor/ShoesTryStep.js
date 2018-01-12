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
    if (nextProps.sales.tryFeedbackAdd !== this.props.sales.tryFeedbackAdd) {
      this.props.getSuborderTryFeedbackList(null, this.props.profile._id);
    }
    if (nextProps.profile !== this.props.profile) {
      this.props.getSuborderTryFeedbackList(null, nextProps.profile._id);
    }
    if (nextProps.tryFeedbackList !== this.props.tryFeedbackList) {
      this.setCurrentFeedBack(nextProps.tryFeedbackList);
    }
  }

  componentDidMount(){
    if (this.props.profile.state === constants.BASE_CONSTANTS.E_ORDER_STATUS.TRY) { // 试鞋
      this.props.getSuborderTryFeedbackList(null, this.props.profile._id);
    }
    this.resetStep();
  }

  setCurrentFeedBack = (list) => {
    if(!list){
      this.setState({currentFeedback:null, transportModify:true})
      return;
    }
    let data = null;
    for(let item of list) {
      if (item.status !== constants.BASE_CONSTANTS.E_ORDER_TRY_FEEDBACK_STATUS.REVIEW ||
        item.status !== constants.BASE_CONSTANTS.E_ORDER_TRY_FEEDBACK_STATUS.END
      ) {
        data = item;
        break;
      }
    }
    this.setState({currentFeedback:data, transportModify:!(data && data.transport_id)});
  }

  resetStep = () => {
    if (this.state.currentFeedback) {
      switch(this.state.currentFeedback.state) {
        case constants.BASE_CONSTANTS.E_ORDER_TRY_FEEDBACK_STATUS.START:
          this.setState({currentStep:0});
        break;
        case constants.BASE_CONSTANTS.E_ORDER_TRY_FEEDBACK_STATUS.TRANSPORT:
          this.setState({currentStep:1});
        break;
        case constants.BASE_CONSTANTS.E_ORDER_TRY_FEEDBACK_STATUS.WAITTING:
          this.setState({currentStep:2});
        break;
        case constants.BASE_CONSTANTS.E_ORDER_TRY_FEEDBACK_STATUS.REVIEW:
        case constants.BASE_CONSTANTS.E_ORDER_TRY_FEEDBACK_STATUS.END:
          this.setState({currentStep:0});
        break;
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
        <ShoesContentBtn type="primary" onClick={()=>this.setState({tryFeedbackAdding:true})}>制作完成去发货</ShoesContentBtn>
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
        试脚鞋已做好，请发货。
      </Row>
      <Row>
        <Input placeholder="请输入订单号" disabled={!isModify} defaultValue={transportId} addonAfter={
          isModify ?
          <Button type="primary" onClick={()=>this.setState({transportModify:false})}>确定</Button>
          : <Button type="primary" onClick={()=>this.setState({transportModify:true})}>修改</Button>
        } />
      </Row>
      <Row>
        <Button type="primary" onClick={()=>this.setState({tryFeedbackAdding:true})}>增加反馈</Button>
        <Button type="primary" onClick={()=>this.setState({tryFeedbackAdding:true})}>正品投产</Button>
      </Row>
      {this.renderFeedBackList()}
    </div>);
  }

  renderFeedBackList = () => {
    let rendTryAdd = () => {
      return(
        <div>
          <TextArea placeholder="请输入反馈内容" autosize={{ minRows: 2, maxRows: 10 }} onChange={(e)=>{
            this.setState({tryFeedbackValue:e.target.value})
          }} />
          <Row style={{padding:'0.2rem'}}>
            <Col span='12' style={{textAlign:'center'}}><Button type="primary" onClick={()=>{
              this.props.addSuborderTryFeedback('', {suborder_id:this.props.profile._id, message:this.state.tryFeedbackValue});
              this.setState({tryFeedbackAdding:false, tryFeedbackValue:''})
            }}>确定</Button></Col>
            <Col span='12' style={{textAlign:'center'}}><Button type="primary" onClick={()=>{
              this.setState({tryFeedbackAdding:false, tryFeedbackValue:''})
            }}>取消</Button></Col>
          </Row>
        </div>
      );
    }

    return (
      <Card title='反馈记录'>
        <div style={{width:"70%", margin:'0 auto'}}>
          {
            this.state.currentStep === 1 ?
            <div style={{width:"100%", margin:'0.15rem 0'}}>
                {
                  this.state.tryFeedbackAdding ? 
                  rendTryAdd()
                  : <Button type="dashed" style={{width:'100%'}} onClick={()=>this.setState({tryFeedbackAdding:true})}>新建反馈</Button>
                }
            </div>
            : null
          }
          <List
            header={null}
            footer={null}
            bordered
            dataSource={this.props.tryFeedbackList}
            renderItem={item => {
              let msgs = item.message.split('\n');
              return (<List.Item extra={moment(item.editor_time).format('YYYY-MM-DD HH:mm:ss') + "---" + moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}>
                <div style={{paddingBottom:5}}>{msgs.map((item, index) =>(<p style={{padding:0, margin:0, wordBreak:'break-all'}} key={index}>{item}</p>))}</div>
              </List.Item>)
            }}
          />
        </div>
      </Card>
    )
  }

  renderTry = () => {
    // <Table 
    // columns={[
    //   {title:'反馈信息', dataIndex:'message', key:'message', width:'70%', render:(value)=>(<pre>{value}</pre>)},
    //   {title:'时间', dataIndex:'editor_time', key:'editor_time', render:(value)=>(<span style={{width:140}}></span>)},
    // ]} 
    // dataSource={this.props.tryFeedbackList}
    // pagination={false} />
    return (<Card title='试鞋反馈'  bordered={false} type="inner">
      <div style={{width:"70%", margin:'0 auto'}}>
        <div style={{width:"100%", margin:'0.15rem 0'}}>
            {
              this.state.tryFeedbackAdding ? 
              rendTryAdd()
              : <Button type="dashed" style={{width:'100%'}} onClick={()=>this.setState({tryFeedbackAdding:true})}>新建反馈</Button>
            }
        </div>
        <List
          header={null}
          footer={null}
          bordered
          dataSource={this.props.tryFeedbackList}
          renderItem={item => {
            let msgs = item.message.split('\n');
            return (<List.Item extra={moment(item.editor_time).format('YYYY-MM-DD HH:mm:ss') + "---" + moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}>
              <div style={{paddingBottom:5}}>{msgs.map((item, index) =>(<p style={{padding:0, margin:0, wordBreak:'break-all'}} key={index}>{item}</p>))}</div>
            </List.Item>)
          }}
        />
        <Row style={{textAlign:'center', paddingTop:20, paddingBottom:20}}>
          <Popconfirm title="确定到生产阶段吗，确定后无法返回?" onConfirm={()=>{
            this.props.reqChangeSuborderState(this.props.profile._id, {state:constants.BASE_CONSTANTS.E_ORDER_STATUS.MAKING});
          }} okText="确定" cancelText="取消">
            <Button type="primary">下一步</Button>
          </Popconfirm>
        </Row>
      </div>
    </Card>)
  }

  renderMake = () => {
    
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
              this.renderTry()
            }
          </Card>
        </OrderStepContent>

        <Modal
          title="Modal"
          visible={this.state.imageViewSrc?true:false}
          footer={null}
          onCancel={()=>{
            this.setState({imageViewSrc:null})
          }}
          width='50%'
          bodyStyle={{position:'relative', textAlign:'center'}}
        >
          {
            this.state.imageViewSrc?
            <img src={config.GetServerAddress() + '/file/'+this.state.imageViewSrc} alt="" style={{width:'100%'}} /> 
            : null
          }
        </Modal>
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
    }, dispatch);
  }
)(ShoesTryStep);
