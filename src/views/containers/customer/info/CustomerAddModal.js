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
      {type:'datePicker', name:'birthday', label:'生日', rule:{required:true}},
      {type:'input', name:'phone', label:'电话', itemOptions:{hasFeedback:true}, rule:{required:true, validator:this.checkPhone}},
      {type:'input', name:'vip_card', label:'vip卡号', itemOptions:{hasFeedback:true}}
    ];
    this.setState({visible:this.props.visible})
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

      this.props.reqAddCustomer(values);
    }
  }

  checkPhone = (rule, value, callback) => {
    if (validate.isTel(value) || validate.isMobile(value)) {
      callback();
    } else {
      callback('格式不合法，手机或者电话号码');
    }
  }
}

export default connect(
  state => ({
    loading:state.customer.loading,
    result:state.customer.result
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetCustomerList: Actions.getCustomerList,
      reqAddCustomer: Actions.addCustomer
    }, dispatch);
  }
)(Form.create()(CustomerAddModal));
