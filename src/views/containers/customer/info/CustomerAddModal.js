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
  Modal
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
} from './styled'

import * as ActionTypes from '../../../constants/ActionTypes'
import Actions from '../../../actions'
import * as validate from '../../../../base/utils/validate'
import * as constants from '../../../constants/Constants'
import * as common from '../../../modules/common'
import FormItemComponent from '../../common/FormItemComponent'
import BaseFormModal from '../../common/BaseFormModal'

class CustomerAddModal extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    
    this.options = [
      {type:'input', name:'name', label:'姓名', itemOptions:{hasFeedback:true}, rule:{required:true}},
      {type:'select', name:'sex', label:'性别', selectItems:constants.SEX_DATA, options:{defaultActiveFirstOption:true}, rule:{required:true}},
      {type:'datePicker', name:'birthday', label:'生日'},
      {type:'input', name:'phone', label:'电话', itemOptions:{hasFeedback:true}, rule:{required:true, validator:this.checkPhone}},
      {type:'input', name:'weixin', label:'微信号', itemOptions:{hasFeedback:true}},
      {type:'input', name:'country', label:'国家', itemOptions:{hasFeedback:true}},
      {type:'input', name:'city', label:'城市', itemOptions:{hasFeedback:true}},
      {type:'input', name:'address', label:'地址', itemOptions:{hasFeedback:true}},
      {type:'input', name:'zipcode', label:'邮编', itemOptions:{hasFeedback:true}},
      {type:'datePicker', name:'vip_card_date', label:'开卡日期'},
      {type:'select', name:'vip_card_shop', label:'开卡门店', selectItems:common.listToSelectOptions(this.props.shopList), options:{defaultActiveFirstOption:true}},
      {type:'select', name:'vip_card_guide', label:'开卡导购', selectItems:common.listToSelectOptions(this.props.guideList), options:{defaultActiveFirstOption:true}},
      {
        type:'select', name:'tags', label:'客户标签', 
        selectItems:common.listToSelectOptions(this.props.customerTagList), 
        options:{
          defaultActiveFirstOption:true,
          mode:"tags",
          tokenSeparators:[',']
        }
      },
    ];
    this.setState({visible:this.props.visible})
  }

  componentDidMount() {
    this.props.reqShopList(0, 1000);
    this.props.reqShopGuideList(0, 1000);
  }

  componentWillReceiveProps(nextProps){
  }

  render() {
    return (
      <BaseFormModal
        title={this.props.title}
        options={this.options}
        visible={this.state.visible}
        loading={this.props.loading}
        result={this.props.result}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        onAfterClose={this.props.afterClose || null}
        confirmLoading={this.state.confirmLoading}
        actionType={ActionTypes.CUSTOMER_ADD}
        onSubmitSuccess={()=>{
          this.props.reqGetCustomerList(this.props.pageInfo.page, this.props.pageInfo.pageSize);
        }}
      />
    );
  }


  onSubmit = (err, values) => {
    if (!err) {
      if (values.birthday) {
        values.birthday = values.birthday.format('YYYY-MM-DD')
      }
      if (values.vip_card_date) {
        values.vip_card_date = values.vip_card_date.format('YYYY-MM-DD HH:mm:ss')
      }
      values.join_type = constants.BASE_CONSTANTS.E_CUSTOMER_TYPE.ADMIN;
      if (values.tags) {
        values.tags = values.tags.map(tag=>{return {tag:tag}})
      }
      this.props.reqAddCustomer(values);
    }
  }

  checkPhone = (rule, value, callback) => {
    if (validate.isTel(value) || validate.isMobile(value)) {
      callback();
    } else {
      callback('手机或者电话号码格式不合法');
    }
  }
}

export default connect(
  state => ({
    loading:state.customer.loading,
    result:state.customer.result,
    shopList:state.shop.shopList,
    guideList:state.shop.shopGuideList,
    customerTagList:state.sales.customerTagList||[]
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetCustomerList: Actions.getCustomerList,
      reqAddCustomer: Actions.addCustomer,
      reqShopList:Actions.getShopList,
      reqShopGuideList:Actions.getShopGuideList,
    }, dispatch);
  }
)(Form.create()(CustomerAddModal));
