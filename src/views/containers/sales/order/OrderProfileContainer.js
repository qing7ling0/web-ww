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
  Spin 
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
  Loading,
  ProfileCol,
  ProfileColLabel,
  ProfileColValue,
  ProfileBtnBack,
  ProfileRowTitle
} from './styled'

import * as ActionTypes from '../../../constants/ActionTypes'
import Actions from '../../../actions'
import * as constants from '../../../constants/Constants'
import * as common from '../../../modules/common'
import DetailComponent from '../../common/DetailComponent'
import utils from '../../../../utils/utils'
import * as optionsType from '../types'
import OrderShoesProfile from './editor/OrderShoesProfile'
import OrderBaseProfile from './editor/OrderBaseProfile'
import OrderGoodsReviewModal from './OrderGoodsReviewModal'

const ORDER_STEPS = [
  {title: '审核'}, 
  {title: '试鞋'}, 
  {title: '制作'}, 
  {title: '发货'},
  {title: '完成'},
];

class OrderProfileContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
      reviewModalVisible:false
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.setState({visible:this.props.visible})
  }

  componentWillReceiveProps(nextProps){
  }
  componentDidMount() {
    this.props.reqSuborderProfile(this.props.match.params.id);
  }

  renderCol = (col) => {
    if (col.dataIndex in this.props.profile) {
      let value = this.props.profile[col.dataIndex];
      if (col.render) {
        value = col.render(value);
      }
      return (
        <ProfileCol xs={24} sm={12} lg={8} key={col.key}>
          <ProfileColLabel>{col.title}: </ProfileColLabel>
          <ProfileColValue>{value}</ProfileColValue>
        </ProfileCol>
      )
    }

    return null;
  }
  
  renderProfile = () => {
    if (!this.props.profile) {
      return null;
    }

    switch(this.props.profile.type) {
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.DESIGN:
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.SHOES:
        return (
          <OrderShoesProfile 
            profile={this.props.profile}
            onOpenReview={this.onOpenReview}
          />
        )
      
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.BELT:
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.ORNAMENT:
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.MAINTAIN:
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.WATCH_STRAP:
        return (
          <OrderBaseProfile 
            profile={this.props.profile}
            onOpenReview={this.onOpenReview}
            orderKey={this.props.profile.type}
          />
        )
    }
    return null;
  }

  render() {
    return (
      <Root>
        <Card 
          title={<ProfileRowTitle>订单详情</ProfileRowTitle>} 
          bordered={false} 
          
          extra={
            <ProfileBtnBack><Button type="primary" shape="circle" icon="rollback" onClick={()=>{
              this.props.history.goBack();
            }} /></ProfileBtnBack>
          }>
            <div>
              {
                this.renderProfile()
              }
            </div>
        </Card>
        {
          this.state.reviewModalVisible ?
          <OrderGoodsReviewModal 
            title={'订单审核'}
            isRecharge={false}
            visible={this.state.reviewModalVisible} 
            data={this.props.profile}
            customer={this.props.profile.customer}
            onSubmitSuccess={this.onSubmitSuccess}
            afterClose={()=>this.setState({reviewModalVisible:false})}/> 
          : null
        }
      </Root>
    );
  }

  onOpenReview = () => {
    this.setState({reviewModalVisible:true})
  }

  onSubmitSuccess = () => {
    this.setState({reviewModalVisible:false})
    this.props.reqSuborderProfile(this.props.match.params.id);
  }
}

export default connect(
  state => ({
    loading:state.sales.loading,
    result:state.sales.result,
    profile:state.sales.suborderProfile,
    customer:state.customer.customerProfile
  }),
  (dispatch) => {
    return bindActionCreators({
      reqSuborderProfile: Actions.suborderProfile,
      reqGetCustomerProfile:Actions.getCustomer
    }, dispatch);
  }
)(OrderProfileContainer);
