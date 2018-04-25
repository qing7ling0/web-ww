import React,  { Component } from 'react';
import ReactDOM from 'react-dom';
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
  GridBorder,
  GridCol,
  GridRow
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
import ShoesTryStep from './ShoesTryStep'
import ShoesProductionStep from './ShoesProductionStep'
import TransportStep from './TransportStep'

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
  { title: '货号', dataIndex: 'NID', key: 'NID'},
  { title: '价格', dataIndex: 'price', key: 'price_label', render:(item) => item+' RMB'},
  { title: '分类', dataIndex: 'type', key: 'type_label', render:(item) => item.name},
  { title: '系列', dataIndex: 'style', key: 'style_label', render:(item) => item.name},
  { title: '季节', dataIndex: 'season', key: 'season_label', render:(item) => item.name},
  { title: '性别', dataIndex: 'sex', key: 'sex'},
  { title: '楦号', dataIndex: 's_xuan_hao', key: 's_xuan_hao', render:(item) => item.name},
  { title: '跟高', dataIndex: 's_gen_gao', key: 's_gen_gao', render:(item) => item&&item.name||''},
  { title: '材质', dataIndex: 's_material', key: 's_material', render:(item) => item.name},
  { title: '规格', dataIndex: 's_gui_ge', key: 's_gui_ge', render:(item) => item||''},
  { title: '皮胚色', dataIndex: 's_out_color', key: 's_out_color', render:(item) => item.name},
  { title: '内里色', dataIndex: 's_in_color', key: 's_in_color', render:(item) => item.name},
  { title: '底板色', dataIndex: 's_bottom_color', key: 's_bottom_color', render:(item) => item.name},
  { title: '底侧色', dataIndex: 's_bottom_side_color', key: 's_bottom_side_color', render:(item) => item.name}
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

// 快递信息
const ORDER_TRANSPORT = [
  { title: '快递公司', dataIndex: 'transport_company', key: 'transport_company'},
  { title: '快递单号', dataIndex: 'transport_id', key: 'transport_id'},
  { title: '快递地址', dataIndex: 'transport_address', key: 'transport_address'},
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
    this.props.getSuborderTryFeedbackList(null, this.props.profile._id);
  }

  resetStep = (profile) => {
    if (profile) {
      switch(profile.state) {
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.REVIEW:
          this.setState({currentStep:0});
        break;
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.TRY:
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.TRY_TRANSPORT:
          this.setState({currentStep:1});
        break;
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.MAKING:
          this.setState({currentStep:2});
        break;
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.DELIVERY:
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.TRANSPORT:
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.SURE:
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.INBOUND:
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.OUTBOUND:
          this.setState({currentStep:3});
        break;
        case constants.BASE_CONSTANTS.E_ORDER_STATUS.COMPLETED:
          this.setState({currentStep:4});
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

  renderShoes = () => {
    return (
      <Card title="鞋子信息"  style={{marginBottom:20}} bordered={false} type="inner">
        <Row>
          {ORDER_SHOES.map((option, index) => {
            return this.renderCol(option, index);
          })}
        </Row>
      </Card>
    );
  }

  renderFooter = () => {
    return (
      <Card title={`尺寸：${this.props.profile.s_foot_size}`}  style={{marginBottom:20}} bordered={false} type="inner">
        <Row>
          <Col xs={{span:24}} sm={{span:8, offset:2}}>
            <Card title="左脚"  bordered={false} type="inner">
              <Row>
                {ORDER_SHOES_FOOT[0].left.map((option, index) => {
                  return this.renderCol(option, index);
                })}
              </Row>
            </Card>
          </Col>
          <Col xs={{span:24}} sm={{span:8, offset:2}} type="inner">
            <Card title="右脚"  bordered={false}>
              <Row>
                {ORDER_SHOES_FOOT[0].right.map((option, index) => {
                  return this.renderCol(option, index);
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

  renderCustoms = () => {
    return (
      <Card title="特殊定制" bordered={false} type="inner" >
        {
          this.props.profile.s_customs 
          ?
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
          : "无"
        }
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

  renderFeedbackList = () => {
    let list = this.props.tryFeedbackList.map((item) => {
      if (item && item.message) {
        return item;
      }
      return null;
    })
    return (
      <Card title='反馈记录'>
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
      </Card>
    )
  }

  renderTransform = () => {
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
  
  // renderDetail = () => {
  //   return (
  //     <Collapse defaultActiveKey={['']}>
  //       <Panel header="订单详情" key="1">
  //         {
  //           this.renderShoes()
  //         }
  //         {
  //           this.renderFooter()
  //         }
  //         {
  //           this.renderPics()
  //         }
  //         {
  //           this.renderCustoms()
  //         }
  //         {
  //           this.state.currentStep > 1 ?
  //           this.renderFeedbackList()
  //           : null
  //         }
  //         {
  //           this.state.currentStep > 3 ?
  //           this.renderTransform()
  //           : null
  //         }
  //       </Panel>
  //     </Collapse>
  //   )
  // }

  renderDetail = () => {
    return (
      <div>
          {
            this.renderShoesOrder()
          }
          {
            this.state.currentStep > 1 ?
            this.renderFeedbackList()
            : null
          }
          {
            this.state.currentStep > 3 ?
            this.renderTransform()
            : null
          }
      </div>
    )
  }

  renderShoesOrder = () => {
    return (
      <Collapse defaultActiveKey={['']}>
        <Panel header="订单详情" key="1" ref="table">
          <GridBorder border="2" width="100%">
            <GridRow>
              <GridCol width={2.5}>款号</GridCol>
              <GridCol width={5.5}>sdfas</GridCol>
              <GridCol rowSpan="7" width={16} colSpan="4">的</GridCol>
            </GridRow>
            <GridRow>
              <GridCol>皮料</GridCol>
              <GridCol>sdfas</GridCol>
            </GridRow>
            <GridRow>
              <GridCol>颜色</GridCol>
              <GridCol>sdfas</GridCol>
            </GridRow>
            <GridRow>
              <GridCol>底号</GridCol>
              <GridCol>sdfas</GridCol>
            </GridRow>
            <GridRow>
              <GridCol>底边色</GridCol>
              <GridCol>sdfas</GridCol>
            </GridRow>
            <GridRow>
              <GridCol>底板色</GridCol>
              <GridCol>sdfas</GridCol>
            </GridRow>
            <GridRow>
              <GridCol>贴底</GridCol>
              <GridCol>sdfas</GridCol>
            </GridRow>
            <GridRow>
              <GridCol width={2.5}>沿条</GridCol>
              <GridCol width={5.5}>sdfas</GridCol>
              <GridCol width={2.5}>尺码</GridCol>
              <GridCol width={5.5}>sdfas</GridCol>
              <GridCol width={2.5}>样板</GridCol>
              <GridCol>sdfas</GridCol>
            </GridRow>
            <GridRow>
              <GridCol>贴楦</GridCol>
              <GridCol colSpan="5">sdfas</GridCol>
            </GridRow>
            <GridRow>
              <GridCol>贴法</GridCol>
              <GridCol colSpan="5">sdfas</GridCol>
            </GridRow>
            <GridRow>
              <GridCol>特殊要求</GridCol>
              <GridCol colSpan="5">sdfas</GridCol>
            </GridRow>
          </GridBorder>

          <Button onClick={()=>{
            function myPrint(obj){
                //打开一个新窗口newWindow
                var newWindow=window.open("打印窗口","_blank");
                //要打印的div的内容
                var docStr = obj.innerHTML;
                var body = window.document.head;
                //打印内容写入newWindow文档

                var html = window.document;
                for(let item of window.document.head.childNodes) {
                  newWindow.document.head.childNodes.push(item);
                }
                newWindow.document.write(docStr);
                //关闭文档
                // newWindow.document.close();
                //调用打印机
                newWindow.print();
                //关闭newWindow页面
                // newWindow.close();
            }

            myPrint(ReactDOM.findDOMNode(this.refs.table));

          }}>打印</Button>
        </Panel>
      </Collapse>
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
        {
          this.props.canOperate ?
          <Row style={{textAlign:'center', paddingTop:20, paddingBottom:20}}>
            <Button type="primary" onClick={()=>{
              this.props.onOpenReview()
            }}>审核</Button>
          </Row>
          :null
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
              <ShoesTryStep canOperate={this.props.canOperate} profile={this.props.profile} />
            }
            {
              this.state.currentStep===2 
              &&
              <ShoesProductionStep canOperate={this.props.canOperate}  profile={this.props.profile} />
            }
            {
              this.state.currentStep===3 
              &&
              <TransportStep canOperate={this.props.canOperate}  profile={this.props.profile} message="正品鞋制作完成，请发货！" />
            }
            {
              this.state.currentStep===4 
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
)(OrderShoesProfile);
