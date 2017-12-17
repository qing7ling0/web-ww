import React, { Component } from 'react';
import styled from 'styled-components'

import {
  Modal,
  Form
} from 'antd'

import {
  NormalForm
} from './common.styled'

import FormItemComponent from './FormItemComponent'

const Root = styled.div``

class BaseFormModal extends Component {
  static defaultProps = {
    options:[],
    visible:false,
    loading: false,
    title: '',
    result: {code:0},
    onCancel:null,
    onSubmit:null,
    actionType:0,
    onSubmitSuccess: () =>{},
    onAfterClose: () =>{},
  }

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
    this.setState({visible:this.props.visible})
  }

  componentWillReceiveProps(nextProps){
    if (this.props.visible !== nextProps.visible) {
      this.state.visible = nextProps.visible;
    }
    if(!nextProps.visible) {
      this.state.confirmLoading = false;
    }

    if (nextProps.result.type === this.props.actionType && nextProps.loading !== this.props.loading && !nextProps.loading) {
      if (nextProps.result.code === 0) {
        this.setState({confirmLoading:false, visible:false})
        this.props.onSubmitSuccess();
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
        afterClose={this.props.onAfterClose || null}
      >
        {
          this.props.renderHeader ?
          this.props.renderHeader()
          :null
        }
        {
          this.props.renderBody ?
          this.props.renderBody()
          :
          <NormalForm onSubmit={this.onSubmit}>
            {
              this.props.options.map((item, index) => {
                return <FormItemComponent key={item.name} options={item} form={this.props.form} />
              })
            }
          </NormalForm>
        }
        
      </Modal>
    );
  }

  onCancel = (e) => {
    this.setState({visible:false, confirmLoading:false});
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({confirmLoading:true});
        if (this.props.onSubmit) {
          this.props.onSubmit(err, values);
        }
      }
    });
  }
}

export default Form.create()(BaseFormModal);