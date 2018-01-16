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

class ShoesAdd extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
      currentOrderType:'',
      data:{},
      customs:[],
      selectShoes:{}, // 当前选择的鞋子
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
    this.props.reqLastCustomerOrderInfo(this.props.customer._id, this.props.orderType.key, 'lastCustomerOrderInfo');

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
    if (this.props.data) {
      let data = {...this.props.data};
      if (this.props.lastCustomerOrderInfo && !this.props.isReview) {
        data.s_foot_size = this.props.lastCustomerOrderInfo.s_foot_size;
      }
      this.options = common.initFormDefaultValues(this.options, data);
      this.options = this.initFootData(this.options, data);
    } else {
      if (this.props.lastCustomerOrderInfo && !this.props.isReview) {
        let data = { s_foot_size: this.props.lastCustomerOrderInfo.s_foot_size};
        this.options = common.initFormDefaultValues(this.options, data);
      }
    }
    if (this.props.lastCustomerOrderInfo && !this.props.isReview) {
      let data = {}
      const {lastCustomerOrderInfo} = this.props;
      data.s_foot_size = lastCustomerOrderInfo.s_foot_size;
      data.s_left_length = lastCustomerOrderInfo.s_left_length;
      data.s_left_zhiWei = lastCustomerOrderInfo.s_left_zhiWei;
      data.s_left_fuWei = lastCustomerOrderInfo.s_left_fuWei;
      data.s_right_length = lastCustomerOrderInfo.s_right_length;
      data.s_right_zhiWei = lastCustomerOrderInfo.s_right_zhiWei;
      data.s_right_fuWei = lastCustomerOrderInfo.s_right_fuWei;

      this.options = this.initFootData(this.options, data);
      // this.options = common.initFormDefaultValues(this.options, data);
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
              return item.left ? this.renderFoot(item,index) : this.renderBaseForm(item, index, false, true);
            })
          }
          {
            this.renderPics()
          }
          <Row>
            <Col><span style={{float:'right'}}>{customExtra}</span><ContentTitle>特殊定制</ContentTitle></Col>
            {
              this.state.customs.map((item,index) => {
                return (
                  <Col key={index} span={24}>
                    <ProfileCol span={8}>
                      <ProfileColLabel>收费内容：</ProfileColLabel>
                      <ProfileColValue>
                        <Select disabled={customDisable} style={{ width:120 }} value={item.name} 
                          onChange={(value) => {
                            this.onCustomChange(index, value)
                          }}>
                          {
                            this.props.sales.customList.map((item) => {
                              if (this.state.customs.findIndex((value)=>value._id === item._id) === -1) {
                                return item;
                              }
                              return null;
                            }).map((item) => {
                              if (!item) return null;
                              return <Option key={item._id} value={item._id}>{item.name}</Option>
                            })
                          }
                        </Select>
                        {
                          customDisable ? null :
                          <Button icon="delete" size="small" shape="circle" style={{marginLeft:'0.1rem'}} onClick={()=>{
                            let cus = this.state.customs;
                            cus.splice(index, 1);
                            this.setState({customs:cus});
                          }} />
                        }
                      </ProfileColValue>
                    </ProfileCol>
                    <ProfileCol span={8}>
                      <ProfileColLabel>价  格：</ProfileColLabel>
                      <ProfileColValue>
                        {this.state.customs[index].price} RMB
                      </ProfileColValue>
                    </ProfileCol>
                  </Col>
                );
              })
            }
            {
              customDisable ? null :
              <Col {...span} style={{paddingTop:20}}>
                <Button type="dashed" onClick={this.addCustom} style={{ width: 120 }}>
                  <Icon type="plus" /> 增加
                </Button>
              </Col>
            }
          </Row>
          <FormItemComponent key={urgentOptionItem.name} options={urgentOptionItem} form={this.props.form} />
        </NormalForm>
      </div>
    );
  }

  initFootData = (options, data) => {
    return options.map((item) => {
      let initValue = function(options, values) {
        return options.map((sub) => {
          let value = values[sub.name] || '';
          if (value._id) {
            value = value._id;
          }
          if (value !== null && value !== undefined && value !== NaN && value !== '') {
            if (!sub.decoratorOptions) {
              sub.decoratorOptions = {};
            }
            sub.decoratorOptions.initialValue = value;
          }
          return sub;
        })
      }
      if (item.left) {
        item.left.options = initValue(item.left.options, data);
      }
      if (item.right) {
        item.right.options = initValue(item.right.options, data);
      }
      return item;
    })
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
    this.props.reqGetGoodsList('goodsShoesList:goodsList', graphqlTypes.goodsType, {goods:type}, {page:-1, pageSize:0});
  }

  onAdd = () => {
    if (this.props.isReview) {
      if (!this.state.customReviewSure || !this.state.goodsReviewSure || !this.state.photoReviewSure) {
        message.error('还有部分信息未审核，请审核！')
        return;
      }
    }

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.onAddSuccess) {
          values.type = this.props.orderType.type;
          let shoesInfo = values;
          shoesInfo.s_material = this.getValueFromListById(this.props.sales.materialList, shoesInfo.s_material);
          shoesInfo.s_xuan_hao = this.getValueFromListById(this.props.sales.xuanHaoList, shoesInfo.s_xuan_hao);
          shoesInfo.s_gui_ge = this.getValueFromListById(this.props.sales.guiGeList, shoesInfo.s_gui_ge);
          shoesInfo.s_out_color = this.getValueFromListById(this.props.sales.outColorList, shoesInfo.s_out_color);
          shoesInfo.s_in_color = this.getValueFromListById(this.props.sales.inColorList, shoesInfo.s_in_color);
          shoesInfo.s_bottom_color = this.getValueFromListById(this.props.sales.bottomColorList, shoesInfo.s_bottom_color);
          shoesInfo.s_bottom_side_color = this.getValueFromListById(this.props.sales.bottomSideColorList, shoesInfo.s_bottom_side_color);
          shoesInfo.s_gen_gao = this.getValueFromListById(this.props.sales.genGaoList, shoesInfo.s_gen_gao);
          shoesInfo.s_tie_di = this.getValueFromListById(this.props.sales.shoesTieBianList, shoesInfo.s_tie_di);
          if (shoesInfo.s_material) {
            shoesInfo.s_material = {...shoesInfo.s_material};
            shoesInfo.s_material.count = null;
            if (shoesInfo.s_material.color) {
              shoesInfo.s_material.color = shoesInfo.s_material.color.name;
            }
          }
          shoesInfo.s_customs = this.state.customs;
          if (shoesInfo.urgent) {
            shoesInfo.urgent = this.getValueFromListById(this.props.sales.urgentList, shoesInfo.urgent);
          }
          if (this.state.pics) {
            let pics = this.state.pics.map((item)=>{
              if (item.file) return item;
            })
            shoesInfo.pics = pics;
          }

          this.props.onAddSuccess(shoesInfo);
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

  getUnusedCustom = () => {
    for(let cus of this.props.sales.customList) {
      let index = this.state.customs.findIndex((value) => {
        return value._id === cus._id;
      });
      if (index === -1) {
        return this.filterEditorProperty(cus);
      }
    }

    return null;
  }

  addCustom = () => {
    let unusedCus = this.getUnusedCustom();
    if (unusedCus !== null) {
      let customs = this.state.customs;
      customs.push(unusedCus);
      this.setState({customs:customs}); 
    }
  }

  onCustomChange = (index, value) => {
    if (index < 0 || index >= this.state.customs.length) return;
    let customs = this.state.customs;
    let cus = this.getValueFromListById(this.props.sales.customList, value);
    if (cus && this.state.customs.findIndex((value)=>value._id === cus._id) === -1) {
      customs[index] = cus;
      this.setState({customs:customs}); 
    }
  }

  onNIDFocus = (value) => {

  }
  onNIDChange = (value) => {

  }
  onNIDSelect = (value, option) => {
    for(let i=0; i<this.props.sales.goodsShoesList.length; i++) {
      let shoes = this.props.sales.goodsShoesList[i];
      if (shoes.NID === value) {
        const {form:forms} = this.props;
        forms.setFieldsValue({NID:shoes.NID});
        forms.setFieldsValue({s_material:shoes.s_material._id});
        forms.setFieldsValue({s_xuan_hao:shoes.s_xuan_hao._id});
        forms.setFieldsValue({s_gui_ge:shoes.s_gui_ge._id});
        forms.setFieldsValue({s_out_color:shoes.s_out_color._id});
        forms.setFieldsValue({s_in_color:shoes.s_in_color._id});
        forms.setFieldsValue({s_bottom_color:shoes.s_bottom_color._id});
        forms.setFieldsValue({s_bottom_side_color:shoes.s_bottom_side_color._id});
        forms.setFieldsValue({price:shoes.price});
        if (this.props.customer.sex === constants.BASE_CONSTANTS.SEX_FEMALE) {
          forms.setFieldsValue({s_gen_gao:shoes.s_gen_gao._id});
        }

        this.setState({selectShoes:shoes});
      }
    }
  }

  onNIDPropertyChange = (key, value) => {
    const {form:forms} = this.props;
    let shoesInfo = forms.getFieldsValue();
    shoesInfo[key] = value;
    shoesInfo.s_material = this.getValueFromListById(this.props.sales.materialList, shoesInfo.s_material);
    shoesInfo.s_xuan_hao = this.getValueFromListById(this.props.sales.xuanHaoList, shoesInfo.s_xuan_hao);
    shoesInfo.s_gui_ge = this.getValueFromListById(this.props.sales.guiGeList, shoesInfo.s_gui_ge);
    shoesInfo.s_out_color = this.getValueFromListById(this.props.sales.outColorList, shoesInfo.s_out_color);
    shoesInfo.s_in_color = this.getValueFromListById(this.props.sales.inColorList, shoesInfo.s_in_color);
    shoesInfo.s_bottom_color = this.getValueFromListById(this.props.sales.bottomColorList, shoesInfo.s_bottom_color);
    shoesInfo.s_bottom_side_color = this.getValueFromListById(this.props.sales.bottomSideColorList, shoesInfo.s_bottom_side_color);
    shoesInfo.s_gen_gao = this.getValueFromListById(this.props.sales.genGaoList, shoesInfo.s_gen_gao);
    let nid = commonUtils.createGoodsNID(this.props.orderType.key, shoesInfo, this.props.customer.sex);
    if (nid !== constants.BASE_CONSTANTS.NULL_NID) {
      let shoes = this.getValueFromListById(this.props.sales.goodsShoesList, 0, (item)=>item.NID === nid);
      if (shoes) {
        forms.setFieldsValue({price:shoes.price});
      } else {
        forms.setFieldsValue({price:null});
      }
    }
    forms.setFieldsValue({NID:nid});
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
    lastCustomerOrderInfo:state.customer.lastCustomerOrderInfo
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
)(Form.create()(ShoesAdd));
