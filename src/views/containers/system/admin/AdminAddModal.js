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
import ContentContainer from '../../common/ContentComponent'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import DataContentComponent from '../../common/DataContentComponent'
import * as constants from '../../../constants/Constants'
import * as common from '../../../modules/common'
import FormItemComponent from '../../common/FormItemComponent'


class AdminAddModal extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
      confirmLoading:false,
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.options = [
      {type:'input', name:'account', label:'账号', itemOptions:{hasFeedback:true}, rule:{required:true, validator:this.checkAccount}},
      {type:'input', name:'password', label:'密码', itemOptions:{hasFeedback:true}, rule:{required:true, validator:this.checkPassword}},
      {type:'input', name:'name', label:'姓名', itemOptions:{hasFeedback:true}, rule:{required:true, max:20}}
    ];
    this.setState({visible:this.props.visible})
  }

  componentWillReceiveProps(nextProps){
    if (this.props.visible !== nextProps.visible) {
      this.state.visible = nextProps.visible;
    }
    if(!nextProps.visible) {
      this.state.confirmLoading = false;
    }

    if (nextProps.result.type === ActionTypes.ADMIN_ACCOUNT_ADD && nextProps.loading !== this.props.loading && !nextProps.loading) {
      if (nextProps.result.code === 0) {
        this.setState({confirmLoading:false, visible:false})
        this.props.reqGetAdminList(this.props.pageInfo.page, this.props.pageInfo.pageSize);
      } else {
        this.setState({confirmLoading:false})
      }
    }
  }

  render() {
    return (
      <Modal
        title={this.props.title}
        visible={this.state.visible}
        onOk={this.onSubmit}
        onCancel={this.onCancel}
        confirmLoading={this.state.confirmLoading}
        afterClose={this.props.afterClose || null}
      >
        <NormalForm onSubmit={this.onSubmit}>
          {
            this.options.map((item, index) => {
              return <FormItemComponent key={item.name} options={item} form={this.props.form} />
            })
          }
        </NormalForm>
      </Modal>
    );
  }

  onCancel = (e) => {
    this.setState({visible:false, confirmLoading:false});
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.setState({confirmLoading:true});
        this.props.reqAddAdmin({name:values.name}, {account:values.account, password:values.password});
      }
    });
  }

  checkAccount = (rule, value, callback) => {
    let msg = common.checkAccountInput(value);
    if (msg) {
      callback(msg);
    } else {
      callback();
    }
  }

  checkPassword = (rule, value, callback) => {
    let msg = common.checkPasswordInput(value);
    if (msg) {
      callback(msg);
    } else {
      callback();
    }
  }
}

export default connect(
  state => ({
    loading:state.system.loading,
    result:state.system.result
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetAdminList: Actions.getAdminList,
      reqAddAdmin: Actions.addAdmin
    }, dispatch);
  }
)(Form.create()(AdminAddModal));
