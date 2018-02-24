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

const TRANSPORT_OPTIONS = [
  {key:'transport_company', label:'快递公司', render:(value)=>{
    let com = commonUtils.getTransportCompany(value);
    if (com) {
      return com.label;
    }

    return '未填写';
  }},
  {key:'transport_id', label:'快递单号', render:(value)=>value||'未填写'},
  {key:'transport_address', label:'快递地址', render:(value)=>value||'未填写'},
];

const TRANSPORT_INPUT_OPTIONS = (target) => { 
  return [
    {
      type:'select', name:'transport_company', label:'快递公司', 
      itemOptions:{labelLeft:true}, 
      selectItems:constants.BASE_CONSTANTS.TRANSPORT_COMPANYS, 
      decoratorOptions:{initialValue:target.props.profile.transport_company},
      options:{
        defaultActiveFirstOption:true,
      }, 
      rule:{required:true}
    },
    {
      type:'input',  name:'transport_id', label:'快递单号',
      decoratorOptions:{initialValue:target.props.profile.transport_id}, 
      itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}
    },
    {
      type:'input', name:'transport_address', label:'快递地址', 
      decoratorOptions:{initialValue:target.props.profile.transport_address}, 
      itemOptions:{hasFeedback:true, labelLeft:true}, rule:{required:true}
    },
  ];
}
const ShoesContent = styled.div`
  font-size: 0.2rem;
  text-align:center;
  width:100%;
  padding:0.1rem 0;
`
const ShoesContentBtn = styled(Button)`
margin:0.1rem 0;
`

class ShoesTransportStep extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
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

  renderTransport = () => {
    return (<div style={{width:'100%'}}>
      <Row>
        <ShoesContent>{this.props.message}</ShoesContent>
      </Row>
      <Row>
        <Card 
          title="快递信息" 
          style={{width:'70%', margin:'0 auto'}}
          extra={
            <Button style={{margin:'0 0.15rem'}} type="primary" disabled={!this.props.canOperate} onClick={()=> {
              this.setState({modify:true});
            }}>{this.props.profile.transport_id ? "修改" : '填写'}</Button>
          }
        >
          {
            TRANSPORT_OPTIONS.map((item)=>this.renderCol(item))
          }
        </Card>
      </Row>
      <Row style={{textAlign:'center'}}>
      {
        this.props.profile.state === constants.BASE_CONSTANTS.E_ORDER_STATUS.TRANSPORT ?
        <Button style={{margin:'0.2rem 0.15rem'}} disabled={!this.props.canOperate} type="primary" onClick={()=> {
          this.props.reqChangeSuborderState(this.props.profile._id, {state:constants.BASE_CONSTANTS.E_ORDER_STATUS.INBOUND});
        }}>已收货，入库</Button>
        : null
      }
      {
        this.props.profile.state === constants.BASE_CONSTANTS.E_ORDER_STATUS.INBOUND ?
        <Button style={{margin:'0.2rem 0.15rem'}} disabled={!this.props.canOperate} type="primary" onClick={()=> {
          this.props.reqChangeSuborderState(this.props.profile._id, {state:constants.BASE_CONSTANTS.E_ORDER_STATUS.OUTBOUND});
        }}>已提货，出库</Button>
        : null
      }
      {
        this.props.profile.state === constants.BASE_CONSTANTS.E_ORDER_STATUS.OUTBOUND ?
        <Button style={{margin:'0.2rem 0.15rem'}} disabled={!this.props.canOperate} type="primary" onClick={()=> {
          this.props.reqChangeSuborderState(this.props.profile._id, {state:constants.BASE_CONSTANTS.E_ORDER_STATUS.COMPLETED});
        }}>已验货,完成订单!</Button>
        : null
      }
      </Row>
    </div>);
  }

  render() {

    let options = TRANSPORT_INPUT_OPTIONS(this);
    let step = this.props.profile.s_production_step || 0;
    return (
      <div style={{width:'100%'}}>
          {this.renderTransport()}
        
        <BaseFormModal
          title={"快递信息修改"}
          options={options}
          visible={this.state.modify}
          loading={this.props.loading}
          result={this.props.result}
          onSubmit={this.onSubmitTransport}
          onCancel={()=>this.setState({modify:false})}
          actionType={ActionTypes.ORDER_SUB_UPDATE}
          onSubmitSuccess={()=>this.setState({modify:false})}
        />
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
)(ShoesTransportStep);
