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
import * as constants from '../../../constants/Constants'
import * as common from '../../../modules/common'
import DetailComponent from '../../common/DetailComponent'
import utils from '../../../../utils/utils'

class CustomerDetail extends Component {
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
    return (
      <div>ddd</div>
    );
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
      reqUpdateCustomer: Actions.updateCustomer
    }, dispatch);
  }
)(Form.create()(CustomerDetail));
