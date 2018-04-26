import React, { Component } from 'react';
import styled from 'styled-components'

import {
  Modal,
  Form
} from 'antd'
const confirm = Modal.confirm;

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
    let mOptions = this.props.modalOptions || {};
    return (
      <Modal 
        title={this.props.title}
        visible={this.state.visible}
        onOk={this.onSubmit}
        onCancel={this.onCancel}
        confirmLoading={this.state.confirmLoading}
        afterClose={this.props.onAfterClose || null}
        {...mOptions}
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
              this.props.options && this.props.options.map((item, index) => {
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
    if (this.props.confirmMessage) {
      confirm({
        title: this.props.confirmMessage,
        content: '',
        onOk:() => {
          this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              if (this.props.onSubmit) {
                let suc = this.props.onSubmit(err, values);
                this.setState({confirmLoading:suc});
              } else {
      
              }
            }
          });
        },
        onCancel: () => {
        },
      });
    } else {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          if (this.props.onSubmit) {
            let suc = this.props.onSubmit(err, values);
            this.setState({confirmLoading:suc});
          } else {

          }
        }
      });
    }
  }
}

export default Form.create()(BaseFormModal);
