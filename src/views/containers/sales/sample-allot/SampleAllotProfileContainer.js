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
  Row,
  Col,
  Spin,
  Steps,
  Popconfirm
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
  ProfileCol,
  Loading,
  ProfileColLabel,
  ProfileColValue,
  ProfileBtnBack,
  ProfileRowTitle,
  OrderSteps
} from './styled'

const Step = Steps.Step;

import * as ActionTypes from '../../../constants/ActionTypes'
import Actions from '../../../actions'
import * as constants from '../../../constants/Constants'
import * as common from '../../../modules/common'
import { commonUtils } from '../../../modules/common';
import DetailComponent from '../../common/DetailComponent'
import utils from '../../../../utils/utils'
import * as optionsType from './types'

const ORDER_STEPS = [
  {title: '审核中'}, 
  {title: '发货中'}, 
  {title: '完成'}
];

// { title: '编号', dataIndex: 'sample', key: 'sample', render:item=>item&&item.NID || ""},
// { title: '状态', dataIndex: 'status', key: 'status', render:(item) => {
//   let type = commonUtils.getValueByList(constants.BASE_CONSTANTS.SAMPLE_ALLOT_STATUS_DATAS, item);
//   return type&&type.label||'';
// }},
// { title: '申请的店铺', dataIndex: 'apply_shop', key: 'apply_shop', render:(item) => item&&item.name||''},
// { title: '申请人', dataIndex: 'apply_shop_guide', key: 'apply_shop_guide', render:(item) => item&&item.name||''},
// { title: '样品店铺', dataIndex: 'accept_shop', key: 'accept_shop', render:(item) => item&&item.name||''},
// { title: '快递公司', dataIndex: 'transport_company', key: 'transport_company'},
// { title: '快递单号', dataIndex: 'transport_id', key: 'transport_id'},
// { title: '联系电话', dataIndex: 'transport_phone', key: 'transport_phone'},
// { title: '数量', dataIndex: '_id', key: '_id', render:(item, record)=>{
//   if (record.left_count && record.right_count) return '一双';
//   if (record.left_count && !record.right_count) return '左脚';
//   if (!record.left_count && record.right_count) return '右脚';
//   return '无';
// }},
const OPTIONS = [
  { title: '编号', dataIndex: 'sample', key: 'sample', render:(item) => item&&item.NID || ''},
  { title: '申请的店铺', dataIndex: 'apply_shop', key: 'apply_shop', render:(item) => item&&item.name||''},
  { title: '申请人', dataIndex: 'apply_shop_guide', key: 'apply_shop_guide', render:(item) => item&&item.name||''},
  { title: '样品店铺', dataIndex: 'accept_shop', key: 'accept_shop', render:(item) => item&&item.name||''},
  { title: '快递公司', dataIndex: 'transport_company', key: 'transport_company'},
  { title: '快递单号', dataIndex: 'transport_id', key: 'transport_id'},
  { title: '联系电话', dataIndex: 'transport_phone', key: 'transport_phone'},
  { title: '数量', dataIndex: '_id', key: '_id', render:(item, record)=>{
    if (record.left_count && record.right_count) return '一双';
    if (record.left_count && !record.right_count) return '左脚';
    if (!record.left_count && record.right_count) return '右脚';
    return '无';
  }},
]

class SampleAllotProfileContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
      step:0,
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.setState({visible:this.props.visible})
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.result.type === ActionTypes.SAMPLE_ALLOT_UPDATE && nextProps.loading !== this.props.loading && !nextProps.loading) {
      if (nextProps.result.code === 0) {
        this.props.reqSampleAllotProfile(this.props.match.params.id);
      }
    }

    if (nextProps.profile !== this.props.profile) {
      this.initStep(nextProps.profile);
    }
  }

  componentDidMount() {
    this.props.reqSampleAllotProfile(this.props.match.params.id);
  }

  renderCol = (col, index, profile) => {
    profile = profile || this.props.profile || {};
    if (col.dataIndex in profile) {
      let value = profile[col.dataIndex];
      if (col.render) {
        value = col.render(value, profile);
      }
      return (
        <ProfileCol xs={24} sm={12} lg={8} key={index}>
          <ProfileColLabel>{col.title}: </ProfileColLabel>
          <ProfileColValue>{value}</ProfileColValue>
        </ProfileCol>
      )
    }

    return null;
  }

  renderReview = () => {
    return (
      <Row>
        <div style={{width:'60%', margin:'0 auto', textAlign:'center'}}>
          <Popconfirm title="确定审核通过?" onConfirm={()=>{
            this.props.reqUpdateSampleAllot(this.props.profile._id, {status:constants.BASE_CONSTANTS.E_SAMPLE_ALLOT_STATUS.REVIEW_FINISH});
            // this.props.reqChangeSuborderState(this.props.profile._id, {state:constants.BASE_CONSTANTS.E_ORDER_STATUS.MAKING});
          }} okText="确定" cancelText="取消">
            <Button style={{margin:'0 auto'}}  disabled={!this.canOperate()} type="primary">审核</Button>
          </Popconfirm>
        </div>
      </Row>
    )
  }

  render() {
    return (
      <Root>
        <Card 
          title={<ProfileRowTitle>调拨详情</ProfileRowTitle>} 
          bordered={false} 
          extra={
            <ProfileBtnBack><Button type="primary" shape="circle" icon="rollback" onClick={()=>{
              this.props.history.goBack();
            }} /></ProfileBtnBack>
          }>
          <Row>
            <OrderSteps current={this.state.step}>
              {ORDER_STEPS.map((item) => {
                return <Step key={item.title} title={item.title} />
              })}
            </OrderSteps>
          </Row>
          
          <Row>
            <Card title={`调拨详情`}  style={{marginBottom:20}} bordered={false} type="inner">
              <Row>
                {this.props.profile && OPTIONS.map((option, index) => {
                  return this.renderCol(option, index);
                })}
              </Row>
            </Card>
          </Row>
          {
            this.state.step === 0 ?
            this.renderReview()
            : null
          }
        </Card>
      </Root>
    );
  }

  initStep = (profile) => {
    let step = 0;
    if (profile.status === constants.BASE_CONSTANTS.E_SAMPLE_ALLOT_STATUS.REVIEW) {
      step = 0;
    } else if (profile.status < constants.BASE_CONSTANTS.E_SAMPLE_ALLOT_STATUS.INBOUND) {
      step = 1;
    } else {
      step = 2;
    }

    this.setState({step:step});
  }
  canOperate = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.salesSampleAllot)
    return this.power && this.power.canOperate;
  }

}

export default connect(
  state => ({
    loading:state.sales.loading,
    result:state.sales.result,
    profile:state.sales.sampleAllotProfile,
    updateSampleAllot:state.sales.updateSampleAllot,
    user:state.app.loginInfo.user
  }),
  (dispatch) => {
    return bindActionCreators({
      reqSampleAllotProfile: Actions.getSampleAllotProfile,
      reqUpdateSampleAllot:Actions.updateSampleAllot
    }, dispatch);
  }
)(SampleAllotProfileContainer);
