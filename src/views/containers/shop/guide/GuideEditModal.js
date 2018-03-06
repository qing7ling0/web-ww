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
import utils from '../../../../utils/utils'

class GuideEditModal extends Component {
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
      {type:'input', name:'phone', label:'手机号码', itemOptions:{hasFeedback:true}, rule:{required:true, validator:this.checkPhone}},
      {type:'input', name:'account', label:'账号', itemOptions:{hasFeedback:true}, rule:{required:true, validator:this.checkAccount}},
      {type:'input', name:'password', label:'密码', itemOptions:{hasFeedback:true}, rule:{validator:this.checkPassword}},
      {type:'select', name:'shop_id', label:'门店', selectItems:this.props.shopList, options:{defaultActiveFirstOption:true}, rule:{required:true}},            
      {type:'select', name:'sex', label:'性别', selectItems:constants.SEX_DATA, options:{defaultActiveFirstOption:true}, rule:{required:true}},
      {type:'datePicker', name:'birthday', label:'生日', rule:{required:true}},
      {type:'number', name:'height', label:'身高', options:{formatter:(value) => `${value}cm`, parser:value => value.replace('cm', '')}},
      {type:'number', name:'weight', label:'体重', options:{formatter:(value) => `${value}Kg`, parser:value => value.replace('Kg', '')}},
      {type:'datePicker', name:'entry_time', label:'入职日期', rule:{required:true}},
      {type:'datePicker', name:'leave_time', label:'离职日期'}
    ];
    this.setState({visible:this.props.visible})
    if (this.props.shopList.length === 0) {
      // this.props.reqGetShopList(0, 1000);
    }
  }

  componentWillReceiveProps(nextProps){
  }

  render() {
    let _options = this.options.map((item, index) => {
      if (!item.decoratorOptions) {
        item.decoratorOptions = {};
      }
      item.decoratorOptions.initialValue = this.props.data[item.name];
      return item;
    });
    return (
      <BaseFormModal
        title={this.props.title}
        options={_options}
        visible={this.state.visible}
        loading={this.props.loading}
        result={this.props.result}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        onAfterClose={this.props.afterClose || null}
        confirmLoading={this.state.confirmLoading}
        actionType={ActionTypes.SHOP_GUIDE_UPDATE}
        onSubmitSuccess={()=>{
          this.props.reqGetShopGuideList(this.props.pageInfo.page, this.props.pageInfo.pageSize);
        }}
      />
    );
  }

  onSubmit = (err, values) => {
    if (!err) {
      values = utils.diffent(values, this.props.data);
      if (values.birthday) {
        values.birthday = values.birthday.format('YYYY-MM-DD')
      }
      if (values.entry_time) {
        values.entry_time = values.entry_time.format('YYYY-MM-DD')
      }
      if (values.leave_time) {
        values.leave_time = values.leave_time.format('YYYY-MM-DD')
      }

      let account = {}
      if (this.props.data.accountId) {
        account._id = this.props.data.accountId;
      }
      if (values.account && values.account.length > 0) {
        account.account = values.account;
      }
      delete values.account;
      delete values.password;
      values.account = account;
      values._id = this.props.data._id;

      if (values.shop_id) {
        values.shop = values.shop_id;
        delete values.shop_id;
      }
      this.props.reqUpdateShopGuide(values);
    }
  }

  checkAccount = (rule, value, callback, form) => {
    if (!value || value.length === 0) {
      callback();
      return;
    }
    let msg = common.checkAccountInput(value);
    if (msg) {
      callback(msg);
    } else {
      callback();
    }
  }

  checkPassword = (rule, value, callback, form) => {
    let account = form.getFieldValue('account');
    if (account === this.props.data.account) {
      if (!value || value.length === 0) {
        callback();
        return;
      }
    }

    let msg = common.checkPasswordInput(value);
    if (msg) {
      callback(msg);
    } else {
      callback();
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

const listConver = (list) => {
  if (!list) return [];
  return list.map((item) => {
    return {value:item._id, label:item.name};
  })
}

export default connect(
  state => ({
    loading:state.shop.loading,
    result:state.shop.result,
    shopList:listConver(state.shop.shopList)
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetShopList: Actions.getShopList,
      reqGetShopGuideList: Actions.getShopGuideList,
      reqUpdateShopGuide: Actions.updateShopGuide
    }, dispatch);
  }
)(Form.create()(GuideEditModal));
