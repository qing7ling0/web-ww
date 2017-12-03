import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import { Form } from 'antd'
import { Root } from './styled'

import * as ActionTypes from '../../../constants/ActionTypes'
import Actions from '../../../actions'
import * as validate from '../../../../base/utils/validate'
import * as constants from '../../../constants/Constants'
import * as optionsType from '../types'
import BaseFormModal from '../../common/BaseFormModal'

class MaterialAddModal extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    
    this.options = optionsType.getMaterialAddOptions(this);
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
        actionType={ActionTypes.MATERIAL_ADD}
        onSubmitSuccess={this.props.onSubmitSuccess}
      />
    );
  }

  onSubmit = (err, values) => {
    if (!err) {
      if (this.props.onAdd) {
        this.props.onAdd(values);
      }
    }
  }
}

export default connect(
  state => ({
    loading:state.sales.loading,
    result:state.sales.result,
    maintainColorList:state.sales.maintainColorList
  })
)(Form.create()(MaterialAddModal));
