import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'

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
  List,
  Collapse
} from 'antd'

const Panel = Collapse.Panel
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
import ProductionStep from './ProductionStep'
import TransportStep from './TransportStep'

const DEFAULT_COL_SPAN = {xs:24,sm:12,lg:8};

const ORDER_STEPS = [
  {title: '审核'},
  {title: '制作中'},
  {title: '发货'},
  {title: '完成'},
];

// 皮带
const ORDER_BELT = [
  { title: '货号', dataIndex: 'NID', key: 'NID'},
  { title: '价格', dataIndex: 'price', key: 'price_label', render:(item) => item+' RMB'},
  { title: '材质', dataIndex: 'b_material', key: 'b_material', render:(item) => item.name},
  { title: '颜色', dataIndex: 'b_color', key: 'b_color', render:(item) => item.name},
  { title: 'A', dataIndex: 'b_A', key: 'b_A'},
  { title: 'B', dataIndex: 'b_B', key: 'b_B'},
  { title: 'C', dataIndex: 'b_C', key: 'b_C'},
  { title: 'D', dataIndex: 'b_D', key: 'b_D'},
]

// 表带
const ORDER_WATCH_STRAP = [
  { title: '货号', dataIndex: 'NID', key: 'NID'},
  { title: '价格', dataIndex: 'price', key: 'price_label', render:(item) => item+' RMB'},
  { title: '材质', dataIndex: 'ws_material', key: 'ws_material', render:(item) => item&&item.name||""},
  { title: '类型', dataIndex: 'ws_style', key: 'ws_style', render:(item) => item&&item.name||""},
  { title: '颜色', dataIndex: 'ws_color', key: 'ws_color', render:(item) => item&&item.name||""},
  { title: 'A', dataIndex: 'ws_A', key: 'ws_A'},
  { title: 'B', dataIndex: 'ws_B', key: 'ws_B'},
  { title: 'C', dataIndex: 'ws_C', key: 'ws_C'},
  { title: 'D', dataIndex: 'ws_D', key: 'ws_D'},
  { title: 'E', dataIndex: 'ws_E', key: 'ws_E'},
  { title: 'F', dataIndex: 'ws_F', key: 'ws_F'},
  { title: 'G', dataIndex: 'ws_G', key: 'ws_G'},
  { title: '手表品牌', dataIndex: 'ws_watch_brand', key: 'ws_watch_brand'},
]

// 护理
const ORDER_MAINTAIN = [
  { title: '货号', dataIndex: 'NID', key: 'NID'},
  { title: '价格', dataIndex: 'price', key: 'price_label', render:(item) => item+' RMB'},
  { title: '护理内容', dataIndex: 'm_name', key: 'm_name'},
  { title: '护理时间', dataIndex: 'm_time', key: 'm_time'},
  { title: '颜色', dataIndex: 'm_color', key: 'm_color', render:(item) => item||""},
  { title: '是否水洗', dataIndex: 'm_wash', key: 'm_wash', render:(item) => item?'是':'否'},
  { title: '样品', dataIndex: 'm_demo', key: 'm_demo'},
]

// 配饰
const ORDER_ORNAMEN = [
  { title: '货号', dataIndex: 'NID', key: 'NID'},
  { title: '价格', dataIndex: 'price', key: 'price_label', render:(item) => item+' RMB'},
  { title: '名称', dataIndex: 'o_name', key: 'o_name'}
]

// 快递信息
const ORDER_TRANSPORT = [
  { title: '快递公司', dataIndex: 'transport_company', key: 'transport_company'},
  { title: '快递单号', dataIndex: 'transport_id', key: 'transport_id'},
  { title: '快递地址', dataIndex: 'transport_address', key: 'transport_address'},
]

const OPTIONS = [
  {
    key:constants.BASE_CONSTANTS.E_ORDER_TYPE.BELT,
    options:ORDER_BELT,
    title:'皮带'
  },
  {
    key:constants.BASE_CONSTANTS.E_ORDER_TYPE.WATCH_STRAP,
    options:ORDER_WATCH_STRAP,
    title:'表带'
  },
  {
    key:constants.BASE_CONSTANTS.E_ORDER_TYPE.MAINTAIN,
    options:ORDER_MAINTAIN,
    title:'护理'
  },
  {
    key:constants.BASE_CONSTANTS.E_ORDER_TYPE.ORNAMENT,
    options:ORDER_ORNAMEN,
    title:'配饰'
  },
]


class OrderBeltProfile extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      currentStep:-1,
    }
    this.options = null;
  }
  
  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
  }
  
  componentWillReceiveProps(nextProps){

    if ((nextProps.result.type === ActionTypes.ORDER_SUB_STATE_CHANGE ||
        nextProps.result.type === ActionTypes.ORDER_SUB_UPDATE
      )
      && nextProps.loading !== this.props.loading && !nextProps.loading) {
      if (nextProps.result.code === 0) {
        this.props.reqSuborderProfile(this.props.profile._id);
      }
    } else if(nextProps.profile !== this.props.profile) {
      this.resetStep(nextProps.profile);
    }
  }

  componentDidMount(){
    this.resetStep(this.props.profile);
  }

  resetStep = (profile) => {
    if (profile) {
      switch(profile.state) {
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.REVIEW:
          this.setState({currentStep:0});
        break;
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.MAKING:
          this.setState({currentStep:1});
        break;
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.DELIVERY:
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.TRANSPORT:
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.SURE:
          this.setState({currentStep:2});
        break;
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.COMPLETED:
          this.setState({currentStep:3});
        break;
      }
    }
  }

  renderCol = (col, index) => {
    if (col.dataIndex in this.props.profile) {
      let value = this.props.profile[col.dataIndex];
      if (col.render) {
        value = col.render(value);
      }
      let span = col.span || DEFAULT_COL_SPAN;
      return (
        <ProfileCol {...span} key={index}>
          <ProfileColLabel>{col.title}: </ProfileColLabel>
          <ProfileColValue>{value}</ProfileColValue>
        </ProfileCol>
      )
    }

    return null;
  }

  renderBelt = () => {
    return (
      <Card title={`${this.options.title}信息`}  style={{marginBottom:20}} bordered={false} type="inner">
        <Row>
          {this.options.options.map((option, index) => {
            return this.renderCol(option, index);
          })}
        </Row>
      </Card>
    );
  }

  renderPics = () => {
    const gridStyle = {
      width: '25%',
      textAlign: 'center',
    };

    let renderItem = (item, index) => {
      return (
        <Card.Grid key={index} style={gridStyle}>
          <img 
            src={config.GetServerAddress() + '/file/'+item.file} alt="" 
            style={{width:'100%', height:'100%'}} 
            onClick={()=>{
            this.setState({imageViewSrc:item.file})
          }} /> 
          <p style={{textAlign:'left'}}>{item.desc}</p>
        </Card.Grid>
      )
    }
    let list = [];
    let pics = [];
    list.push(pics);
    for(let pic of this.props.profile.pics) {
      if (pics.length < 4) {
        pics.push(pic);
      } else {
        pics=[];
        list.push(pics);
      }
    }
    return (
      <Card title="拍照信息" bordered={false} type="inner" >
        {
          list && list.length > 0 && list[0].length > 0 ?
          list.map((pics, index) => {
            return(
              <div key={index} style={{paddingBottom:20}}>
                {
                  pics.map(renderItem)
                }
                <div style={{clear:'both'}}></div>
              </div>
            )
          })
          : "无"
        }
      </Card>
    )
  }

  renderUrgent = () => {
    return (
      <Card title="加急" bordered={false} type="inner" >
        <Row>
          {
            this.props.profile.urgent
            ?
            <ProfileCol span={8}>
              <ProfileColLabel>加急天数：</ProfileColLabel>
              <ProfileColValue>{this.props.profile.urgent.day} 天</ProfileColValue>
            </ProfileCol>
            : "无"
          }
          {
            this.props.profile.urgent
            ?
            <ProfileCol span={8}>
              <ProfileColLabel>价  格：</ProfileColLabel>
              <ProfileColValue>
                {this.props.profile.urgent.price} RMB
              </ProfileColValue>
            </ProfileCol>
            : null
          }
        </Row>
      </Card>
    )
  }

  renderTransport = () => {
    return (
      <Card title="快递信息"  style={{marginBottom:20}} bordered={false} type="inner">
        <Row>
          {ORDER_TRANSPORT.map((option, index) => {
            return this.renderCol(option, index);
          })}
        </Row>
      </Card>
    );
  }

  renderDetail = () => {
    return (
      <Collapse defaultActiveKey={['']}>
        <Panel header="订单详情" key="1">
          {
            this.renderBelt()
          }
          {
            this.renderPics()
          }
          {
            this.renderUrgent()
          }
          {
            this.state.currentStep > 2 ?
            this.renderTransport()
            : null
          }
        </Panel>
      </Collapse>
    )
  }

  renderReviewStep = () => {
    return (
      <div>
        {
          this.renderBelt()
        }
        {
          this.renderPics()
        }
        {
          this.renderUrgent()
        }
        {
          this.props.canOperate ?
          <Row style={{textAlign:'center', paddingTop:20, paddingBottom:20}}>
            <Popconfirm title="请确定信息是否正确，确定后继续?" onConfirm={()=>{
              this.props.onOpenReview()
            }} okText="确定" cancelText="取消">
              <Button type="primary">审核</Button>
            </Popconfirm>
          </Row>
          : null
        }
      </div>
    )
  }

  renderCompletedStep = () => {
    return <OrderSuccessContainer>
      <OrderSuccessTitle>订单已完成!</OrderSuccessTitle>
    </OrderSuccessContainer>
  }

  render() {
    this.options = null;
    for(let op of OPTIONS){
      if (op.key === this.props.orderKey) {
        this.options = op;
        break;
      }
    }

    if (!this.options) return null;

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
              this.renderReviewStep()
            }
            {
              this.state.currentStep===1 
              &&
              <ProductionStep canOperate={this.props.canOperate} profile={this.props.profile} />
            }
            {
              this.state.currentStep===2
              &&
              <TransportStep 
                canOperate={this.props.canOperate}
                profile={this.props.profile}
                message={`${this.options.title}已完成请发货!`}
              />
            }
            {
              this.state.currentStep===3
              &&
              this.renderCompletedStep()
            }
            {
              this.state.currentStep>0 
              &&
              this.renderDetail()
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
)(OrderBeltProfile);
