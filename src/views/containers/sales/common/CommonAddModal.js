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
import * as optionsType from '../types'
import { COMMON_TYPES, E_COMMON_TYPES } from './types'

class CommonAddModal extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    
    this.setState({visible:this.props.visible})
  }

  componentWillReceiveProps(nextProps){
  }

  render() {
    this.options = this.props.commonType.addOptions(this);
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
        actionType={ActionTypes.SALES_ADD}
        onSubmitSuccess={this.props.onSubmitSuccess}
      />
    );
  }

  onSubmit = (err, values) => {
    if (!err) {
      if (this.onAdd) {
        this.onAdd(values);
      }
    }
  }
  
  onReqAdd = (data) => {
    if (data) {
      data.type = this.props.commonType.key;
    }
    if (data.type === constants.BASE_CONSTANTS.COMMON_DATA_TYPES.CUSTOM) {
      if (!data.n_material && !data.d_material) {
        message.error('至少选择一个定制内容!');
        return;
      }
    }
    this.props.reqAddSalesBase(this.props.commonType.tag, this.props.commonType.graphqlType, data);
  }

  onAdd = (values) => {
    if (values.NID === undefined) {
      values.NID = '0';
    }
    this.onReqAdd(values);
  }
}

export default connect(
  state => ({
    loading:state.sales.loading,
    result:state.sales.result,
    materialList:state.sales.materialList
  }),
  (dispatch) => {
    return bindActionCreators({
      reqAddSalesBase: Actions.addSalesBase,
    }, dispatch);
  }
)(Form.create()(CommonAddModal));
