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
  Popconfirm
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
  {title: '审核'}, 
  {title: '试鞋'}, 
  {title: '制作'}, 
  {title: '发货'},
  {title: '完成'},
];

// 基础
const ORDER_SHOES = [
  { title: '编号', dataIndex: 'NID', key: 'NID'},
  { title: '价格', dataIndex: 'price', key: 'price_label', render:(item) => item+' RMB'},
  { title: '分类', dataIndex: 'type', key: 'type_label', render:(item) => item.name},
  { title: '系列', dataIndex: 'style', key: 'style_label', render:(item) => item.name},
  { title: '季节', dataIndex: 'season', key: 'season_label', render:(item) => item.name},
  { title: '性别', dataIndex: 'sex', key: 'sex'},
  { title: '楦号', dataIndex: 's_xuan_hao', key: 's_xuan_hao', render:(item) => item.name},
  { title: '规格', dataIndex: 's_gui_ge', key: 's_gui_ge', render:(item) => item.name},
  { title: '跟高', dataIndex: 's_gen_gao', key: 's_gen_gao', render:(item) => item.name},
  { title: '材质', dataIndex: 's_material', key: 's_material', render:(item) => item.name},
  { title: '鞋面颜色', dataIndex: 's_out_color', key: 's_out_color', render:(item) => item.name},
  { title: '里皮颜色', dataIndex: 's_in_color', key: 's_in_color', render:(item) => item.name},
  { title: '鞋底颜色', dataIndex: 's_bottom_color', key: 's_bottom_color', render:(item) => item.name},
  { title: '底边颜色', dataIndex: 's_bottom_side_color', key: 's_bottom_side_color', render:(item) => item.name}
]

// 尺寸
const ORDER_SHOES_FOOT = [
  { 
    title: '尺寸', dataIndex: 's_foot_size', key: 's_foot_size', span:24,
    left:[
      {title: '长度', dataIndex: 's_left_length', key: 's_left_length', span:24},
      {title: '趾围', dataIndex: 's_left_zhiWei', key: 's_left_zhiWei', span:24},
      {title: '附维', dataIndex: 's_left_fuWei', key: 's_left_fuWei', span:24},
    ],
    right:[
      {title: '长度', dataIndex: 's_right_length', key: 's_right_length', span:24},
      {title: '趾围', dataIndex: 's_right_zhiWei', key: 's_right_zhiWei', span:24},
      {title: '附维', dataIndex: 's_right_fuWei', key: 's_right_fuWei', span:24},
    ],
  }
]


class OrderShoesProfile extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      currentStep:-1,
    }
  }
  
  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.loading !== this.props.loading) {
      this.resetStep();
    }
    if (nextProps.sales.tryFeedbackAdd !== this.props.sales.tryFeedbackAdd) {
      this.props.getSuborderTryFeedbackList(null, this.props.profile._id);
    }
  }

  componentDidMount(){
    this.resetStep();
  }

  resetStep = () => {
    if (this.props.profile) {
      switch(this.props.profile.state) {
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.REVIEW:
          this.setState({currentStep:0});
        break;
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.TRY:
          this.setState({currentStep:1});
        break;
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.MAKING:
          this.setState({currentStep:2});
        break;
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.DELIVERY:
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.TRANSPORT:
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.SURE:
          this.setState({currentStep:3});
        break;
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.COMPLETED:
          this.setState({currentStep:4});
        break;
      }
      if (this.props.profile.state === constants.BASE_CONSTANTS.E_ORDER_STATUS.TRY) { // 试鞋
        this.props.getSuborderTryFeedbackList(null, this.props.profile._id);
      }
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

  renderShoes = () => {
    return (
      <Card title="鞋子信息" noHovering={true} style={{marginBottom:20}} bordered={false} type="inner">
        <Row>
          {ORDER_SHOES.map((option) => {
            return this.renderCol(option);
          })}
        </Row>
      </Card>
    );
  }

  renderFooter = () => {
    return (
      <Card title={`尺寸：${this.props.profile.s_foot_size}`} noHovering={true} style={{marginBottom:20}} bordered={false} type="inner">
        <Row>
          <Col xs={{span:24}} sm={{span:8, offset:2}}>
            <Card title="左脚" noHovering={true} bordered={false} type="inner">
              <Row>
                {ORDER_SHOES_FOOT[0].left.map((option) => {
                  return this.renderCol(option);
                })}
              </Row>
            </Card>
          </Col>
          <Col xs={{span:24}} sm={{span:8, offset:2}} type="inner">
            <Card title="右脚" noHovering={true} bordered={false}>
              <Row>
                {ORDER_SHOES_FOOT[0].right.map((option) => {
                  return this.renderCol(option);
                })}
              </Row>
            </Card>
          </Col>
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
      <Card title="图片信息" bordered={false} type="inner" noHovering={true}>
        {
          list.map((pics, index) => {
            return(
              <div style={{paddingBottom:20}}>
                {
                  pics.map(renderItem)
                }
                <div style={{clear:'both'}}></div>
              </div>
            )
          })
        }
      </Card>
    )
  }

  renderCustoms = () => {
    return (
      <Card title="特殊定制" bordered={false} type="inner" noHovering={true}>
        {
          this.props.profile.s_customs.map((item, index) => {
            return (
              <Row key={index}>
                <ProfileCol span={8}>
                  <ProfileColLabel>收费内容：</ProfileColLabel>
                  <ProfileColValue>{item.name}</ProfileColValue>
                </ProfileCol>
                <ProfileCol span={8}>
                  <ProfileColLabel>价  格：</ProfileColLabel>
                  <ProfileColValue>
                    {item.price} RMB
                  </ProfileColValue>
                </ProfileCol>
              </Row>
            )
          })
        }
        <Row>
          <ProfileCol span={8}>
            <ProfileColLabel>加急天数：</ProfileColLabel>
            <ProfileColValue>{this.props.profile.urgent.day} 天</ProfileColValue>
          </ProfileCol>
          <ProfileCol span={8}>
            <ProfileColLabel>价  格：</ProfileColLabel>
            <ProfileColValue>
              {this.props.profile.urgent.price} RMB
            </ProfileColValue>
          </ProfileCol>
        </Row>
      </Card>
    )
  }

  renderReviewStep = () => {
    return (
      <div>
        {
          this.renderShoes()
        }
        {
          this.renderFooter()
        }
        {
          this.renderPics()
        }
        {
          this.renderCustoms()
        }
        <Row style={{textAlign:'center', paddingTop:20, paddingBottom:20}}>
          <Button type="primary" onClick={()=>{
            this.props.onOpenReview()
          }}>审核</Button>
        </Row>
      </div>
    )
  }

  renderTry = () => {
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

    return (<Card title='试鞋反馈' noHovering={true} bordered={false} type="inner" loading={this.props.loading}>
      <div style={{width:"70%", margin:'0 auto'}}>
        <div style={{width:"100%"}}>
            {
              this.state.tryFeedbackAdding ? 
              rendTryAdd()
              : <Button type="dashed" style={{width:'100%'}} onClick={()=>this.setState({tryFeedbackAdding:true})}>新建反馈</Button>
            }
        </div>
        {
          this.props.tryFeedbackList.map((item, index) => {
            return (<div key={index} style={{width:"100%", borderBottom:'1px solid #e0e0e0'}}>
              {item.message}
              <div style={{color:'gray', fontSize:'12px'}}>
                {moment(item.editor_time).format('YYYY-MM-DD HH:mm:ss')}
              </div>
            </div>)
          })
        }
      </div>
    </Card>)
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
          <Card noHovering={true} >
            {
              this.state.currentStep===0 
              &&
              this.renderReviewStep()
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
      addSuborderTryFeedback:Actions.addSuborderTryFeedback
    }, dispatch);
  }
)(Form.create()(OrderShoesProfile));
