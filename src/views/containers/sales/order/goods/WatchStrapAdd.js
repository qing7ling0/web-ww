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
  Row,Col,
  Input
} from 'antd'

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
  PhotoUploadBtnCotnainer
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

class WatchStrapAdd extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
      currentOrderType:'',
      data:{},
      customs:[],
      selectGoods:{}, // 当前选择的鞋子
      pics:[],
      goodsReviewSure:false,
      customReviewSure:false,
      photoReviewSure:false
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentDidMount(){
    this.props.setGoodsCallback(this.onAdd);
    this.onReqOrderGoodsList(this.props.orderType.key);
    if (!this.props.isReview) {
      this.props.reqLastCustomerOrderInfo(this.props.customerId, this.props.orderType.key, 'lastWatchStrapCustomerOrderInfo');
    }

    if (this.props.data) {
      this.setState({
        pics:this.props.data.pics||[],
        customs:this.props.data.s_customs||[],
      })
    }
  }

  renderReviewBtn = (isReview, sure, onChange) => {
    let cardExtra = null;
    if (isReview) {
      cardExtra = (
        <Switch checkedChildren="已审核" unCheckedChildren="未审核" checked={sure} onChange={onChange} />
      )
    }
    return cardExtra;
  }

  renderBaseForm(item, index, vertical, isReviewRender) {
    let span = {sm:24, lg:12};
    if (vertical) {
      span={};
    }
    let cardExtra = this.renderReviewBtn(this.props.isReview && isReviewRender, this.state.goodsReviewSure, (value)=> {
      this.setState({goodsReviewSure:value})
    })
    return (
      <Card key={index} title={item.title} bordered={false}  bodyStyle={{padding:0}} extra={cardExtra}>
        <Row>
          {
            item.options.map((item, index) => {
              if (!item.options) item.options = {};
              item.options.disabled = this.props.isReview&&this.state.goodsReviewSure;
              return <Col key={index} {...span}><FormItemComponent key={item.name} options={item} form={this.props.form} /></Col>
            })
          }
        </Row>
      </Card>
    )
  }

  renderFoot(item, index) {
    return (
      <Card key={index} title={item.title} bordered={false} >
        <Row>
          {
            item.options.map((item, index) => {
              if (!item.options) item.options = {};
              item.options.disabled = this.props.isReview&&this.state.goodsReviewSure;
              return (<Col key={index} xs={24} sm={12} lg={8}><FormItemComponent key={item.name} options={item} form={this.props.form} /></Col>);
            })
          }
        </Row>
        <Row>
          <Col xs={{span:24}} md={{span:10, offset:1}} lg={{span:8, offset:2}}>{this.renderBaseForm(item.left, index+1000, true)}</Col>
          <Col xs={{span:24}} md={{span:10, offset:2}} lg={{span:8, offset:4}}>{this.renderBaseForm(item.right, index+1000, true)}</Col>
        </Row>
      </Card>
    )
  }

  renderPics = () =>{
    let cardExtra = this.renderReviewBtn(this.props.isReview, this.state.photoReviewSure, (value)=> {
      this.setState({photoReviewSure:value})
    })
    let disabled = this.props.isReview&&this.state.photoReviewSure;
    return (
      <Row>
        <Col><span style={{float:'right'}}>{cardExtra}</span><ContentTitle>拍照信息</ContentTitle></Col>
        {
          this.state.pics.map((item,index) => {
            return (
              <Row key={index} style={{marginTop:20}}>
                <Col span={6}>
                  <Upload
                    name="order"
                    accept="image/*"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    style={{padding:0, position:'relative'}}
                    action={config.GetServerAddress() + '/upload'}
                    onChange={({file, fileList})=>this.onUploadPicChange(index, file)}
                    withCredentials={true}
                    disabled={disabled}
                  >
                    {
                      item.file ? 
                      <div style={{width:'100%', height:'100%', position:'relative'}}>
                        <img src={config.GetServerAddress() + '/file/'+item.file} alt="" style={{width:'100%', height:'100%'}} /> 
                        {
                          disabled ? null :
                          <PhotoDeleteBtn icon='minus' type="danger" shape="circle" size="small" ghost onClick={(e)=>{
                            e.stopPropagation();
                            this.onRemovePhoto(index);
                          }} />
                        }
                      </div>
                      :
                      <PhotoUploadBtnCotnainer>
                        <Icon type='plus' />
                        <div className="ant-upload-text">Upload</div>
                      </PhotoUploadBtnCotnainer>
                    }
                  </Upload>
                </Col>
                <Col span={12}>
                  <TextArea disabled={disabled} placeholder="请输入拍照备注" autosize={{ minRows: 2, maxRows: 10 }} defaultValue={item.desc} onChange={(e)=>{
                    let pics = this.state.pics;
                    let pic = pics[index];
                    if (pic) {
                      pic.desc = e.target.value;
                      this.setState({pics:pics})
                    }
                  }} />
                </Col>
              </Row>
            );
          })
        }
        {
          disabled || constants.BASE_CONSTANTS.ORDER_UPLOAD_PIC_MAX_COUNT<=this.state.pics.length?
          null :
          <Col span={24} style={{paddingTop:20}}>
            <Button type="dashed" onClick={this.onAddPhoto} style={{ width: 120 }}>
              <Icon type="plus" /> 增加
            </Button>
          </Col>
        }
      </Row>
    )
  }

  render() {
    this.options = this.props.orderType.addOptions(this);
    let watchStrapSize = {};
    watchStrapSize.ws_A = '';
    watchStrapSize.ws_B = '';
    watchStrapSize.ws_C = '';
    watchStrapSize.ws_D = '';
    watchStrapSize.ws_E = '';
    watchStrapSize.ws_F = '';
    watchStrapSize.ws_G = '';
    if (this.props.lastCustomerOrderInfo && !this.props.isReview) {
      watchStrapSize.ws_A = this.props.lastCustomerOrderInfo.ws_A;
      watchStrapSize.ws_B = this.props.lastCustomerOrderInfo.ws_B;
      watchStrapSize.ws_C = this.props.lastCustomerOrderInfo.ws_C;
      watchStrapSize.ws_D = this.props.lastCustomerOrderInfo.ws_D;
      watchStrapSize.ws_E = this.props.lastCustomerOrderInfo.ws_E;
      watchStrapSize.ws_F = this.props.lastCustomerOrderInfo.ws_F;
      watchStrapSize.ws_G = this.props.lastCustomerOrderInfo.ws_G;
    }
    if (this.props.data) {
      let data = {...this.props.data};
      this.options = common.initFormDefaultValues(this.options, data);
    } else {
      if (!this.props.isReview) {
        this.options = common.initFormDefaultValues(this.options, watchStrapSize);
      }
    }

    let span = {sm:24, lg:12};

    let customExtra = this.renderReviewBtn(this.props.isReview, this.state.customReviewSure, (value)=> {
      this.setState({customReviewSure:value})
    })
    let customDisable = this.props.isReview && this.state.customReviewSure;

    let urgentOptionItem = {
      type:'select', 
      name:'urgent', 
      label:'加急', 
      itemOptions:{labelLeft:true}, 
      selectItems:common.listToSelectOptions(this.props.sales.urgentList, null, (item)=>item.day+'天'), 
      options:{disabled:customDisable}, 
      rule:{},
      decoratorOptions:{}
    };
    
    if (this.props.data && this.props.data.urgent) {
      urgentOptionItem.decoratorOptions.initialValue = this.props.data.urgent._id;
    }

    return (
      <div>
        <NormalForm>
          {
            this.options.map((item, index) => {
              return this.renderBaseForm(item, index, false, true);
            })
          }
          {
            this.renderPics()
          }
          <Row>
            <Col><span style={{float:'right'}}>{customExtra}</span><ContentTitle>加急</ContentTitle></Col>
            <FormItemComponent key={urgentOptionItem.name} options={urgentOptionItem} form={this.props.form} />
          </Row>
        </NormalForm>
      </div>
    );
  }

  onUploadPicChange = (index, file) => {
    let pics = this.state.pics;
    let pic = pics[index];
    if (pic && file.response && file.response.data.files && file.response.data.files.length > 0) {
      pic.file = file.response.data.files[0];
      this.setState({pics:pics})
    }
  }

  onAddPhoto = () => {
    let pics = this.state.pics;
    pics.push({file:'', desc:''});
    this.setState({pics:pics});
  }
  onRemovePhoto = (index) => {
    let pics = this.state.pics;
    pics.splice(index, 1);
    this.setState({pics:pics});
  }

  onReqOrderGoodsList = (type) => {
    this.props.reqGetGoodsList('goodsWatchStrapList:goodsList', graphqlTypes.goodsType, {goods:type, put:true}, {page:-1, pageSize:0});
  }

  onAdd = () => {
    if (this.props.isReview) {
      if (!this.state.goodsReviewSure || !this.state.customReviewSure || !this.state.photoReviewSure) {
        message.error('还有部分信息未审核，请审核！')
        return;
      }
    }

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.onAddSuccess) {
          values.type = this.props.orderType.type;
          let watchStrapInfo = values;
          watchStrapInfo.ws_material = this.getValueFromListById(this.props.sales.materialList, watchStrapInfo.ws_material);
          watchStrapInfo.ws_style = this.getValueFromListById(this.props.sales.watchStrapStyleList, watchStrapInfo.ws_style);
          watchStrapInfo.ws_color = this.getValueFromListById(this.props.sales.materialColorList, watchStrapInfo.ws_color);
          if (watchStrapInfo.ws_material) {
            watchStrapInfo.ws_material = {...watchStrapInfo.ws_material};
            watchStrapInfo.ws_material.count = null;
            if (watchStrapInfo.ws_material.color) {
              watchStrapInfo.ws_material.color = watchStrapInfo.ws_material.color.name;
            }
          }
          if (watchStrapInfo.urgent) {
            watchStrapInfo.urgent = this.getValueFromListById(this.props.sales.urgentList, watchStrapInfo.urgent);
          }
          if (this.state.pics) {
            let pics = this.state.pics.map((item)=>{
              if (item.file) return item;
            })
            watchStrapInfo.pics = pics;
          }

          this.props.onAddSuccess(watchStrapInfo);
          return true;
        }
      }
    })

    return false;
  }

  filterEditorProperty = (value) => {
    if (value) {
      let ret = {};
      for(let key in value) {
        if (key.indexOf('editor_') === -1) {
          ret[key] = value[key];
        }
      }
      return ret;
    }

    return null;
  }

  onNIDFocus = (value) => {
    // TODO 检查NID合法性

  }
  onNIDChange = (value) => {
    // TODO 检查NID合法性

  }
  onNIDSelect = (value, option) => {
    for(let i=0; i<this.props.sales.goodsWatchStrapList.length; i++) {
      let watchStrap = this.props.sales.goodsWatchStrapList[i];
      if (watchStrap.NID === value) {
        const {form:forms} = this.props;
        forms.setFieldsValue({NID:watchStrap.NID});
        forms.setFieldsValue({ws_material:watchStrap.ws_material._id});
        forms.setFieldsValue({ws_style:watchStrap.ws_style._id});
        forms.setFieldsValue({ws_color:watchStrap.ws_color._id});
        forms.setFieldsValue({sex:watchStrap.sex});
        forms.setFieldsValue({price:watchStrap.price});

        this.setState({selectGoods:watchStrap});
      }
    }
  }

  getGoodsByCurrentInput = (goodsInputInfo) => {
    if (goodsInputInfo.ws_material && goodsInputInfo.sex && goodsInputInfo.ws_color && goodsInputInfo.ws_style) {
      for(let goods of this.props.sales.goodsWatchStrapList) {
        if (goods.ws_material && goods.ws_color && goods.sex && goods.ws_style) {
          if (goods.ws_material._id === goodsInputInfo.ws_material._id
            && goods.ws_color._id === goodsInputInfo.ws_color._id
            && goods.ws_style._id === goodsInputInfo.ws_style._id
            && goods.sex === goodsInputInfo.sex
          ) {
            return goods;
          }
        }
      }
    }
    return null;
  }

  onNIDPropertyChange = (key, value) => {
    const {form:forms} = this.props;
    let watchStrapInfo = forms.getFieldsValue();
    watchStrapInfo[key] = value;
    watchStrapInfo.ws_material = this.getValueFromListById(this.props.sales.materialList, watchStrapInfo.ws_material);
    watchStrapInfo.ws_style = this.getValueFromListById(this.props.sales.watchStrapStyleList, watchStrapInfo.ws_style);
    watchStrapInfo.ws_color = this.getValueFromListById(this.props.sales.materialColorList, watchStrapInfo.ws_color);
    
    let goods = this.getGoodsByCurrentInput(watchStrapInfo);
    if (!this.props.isReview) { // 审核过程不修改价格
      if (goods) {
        forms.setFieldsValue({price:goods.price});
      } else {
        forms.setFieldsValue({price:null});
      }
    }
    if (goods) {
      forms.setFieldsValue({NID:goods.NID});
    } else {
      forms.setFieldsValue({NID:constants.BASE_CONSTANTS.NULL_NID});
    }
    // let nid = commonUtils.createGoodsNID(this.props.orderType.key, watchStrapInfo, this.props.customer.sex);
    // if (nid !== constants.BASE_CONSTANTS.NULL_NID) {
    //   let watchStrap = this.getValueFromListById(this.props.sales.goodsWatchStrapList, 0, (item)=>item.NID === nid);
    //   if (watchStrap) {
    //     forms.setFieldsValue({price:watchStrap.price});
    //   } else {
    //     forms.setFieldsValue({price:null});
    //   }
    // } else {
    //   forms.setFieldsValue({price:null});
    // }
    // forms.setFieldsValue({NID:nid});
  }

  getValueFromListById = (list, id, checkFn) => {
    if (!list) return null;
    let ret = null;
    for(let item of list) {
      if (checkFn) {
        if (checkFn(item)) {
          ret = item;
          break;
        }
      } else {
        if (item._id === id) {
          ret = item;
          break;
        }
      }
    }
    return this.filterEditorProperty(ret);
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
    lastCustomerOrderInfo:state.customer.lastWatchStrapCustomerOrderInfo
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetOrderList: Actions.getOrderList,
      reqAddOrder: Actions.addOrder,
      reqGetGoodsList: Actions.getGoodsList,
      reqGetGoodsBaseDatas: Actions.getGoodsBaseDatas,
      reqLastCustomerOrderInfo: Actions.lastCustomerOrderInfo
    }, dispatch);
  }
)(Form.create()(WatchStrapAdd));
