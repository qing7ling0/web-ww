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

const ShoesContent = styled.div`
  font-size: 0.2rem;
  text-align:center;
  width:100%;
  padding:0.1rem 0;
`
const ShoesContentBtn = styled(Button)`
margin:0.1rem 0;
`

class ProductionStep extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);
  }

  renderTransport = () => {
    return (<div style={{width:'100%'}}>
      <Row>
        <ShoesContent>正在制作中...</ShoesContent>
      </Row>
      <Row style={{textAlign:'center'}}>
        <div style={{width:'60%', margin:'0 auto', textAlign:'center'}}>
          <Popconfirm 
            title="是否已制作完成去发货，确定后无法返回?" 
            onConfirm={()=> {
              this.props.reqSuborderUpdate(this.props.profile._id, {s_production_step:4, state:constants.BASE_CONSTANTS.E_ORDER_STATUS.TRANSPORT})
            }} 
            okText="确定" 
            cancelText="取消"
          >
            <Button style={{margin:'0 auto'}} type="primary">去发货</Button>
          </Popconfirm>
        </div>
      </Row>
    </div>);
  }

  render() {
    return (
      <div style={{width:'100%'}}>
        <OrderStepContent>
          <Card  >
            {
              this.renderTransport()
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
)(ProductionStep);
