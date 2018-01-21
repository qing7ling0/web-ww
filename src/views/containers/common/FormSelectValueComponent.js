import React, { Component } from 'react';
import styled from 'styled-components'
import { Select } from 'antd'

class FormSelectValueComponent extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      value:this.props.value||''
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({value:value});
    }
  }

  render() {
    let source = this.props.source || [];
    return (
      <Select
        defaultActiveFirstOption={true}
        mode="combobox" 
        filterOption='false'
        onChange={(value)=>{
          this.props.onChange(this.findItemByName(value))
        }}
      >
        {
          source.map((item, index) => {
            return (<Option key={index} value={item.name}>{item.name}</Option>)
          })
        }
      </Select>
    )
  }

  findItemByName = (name) => {
    if (!this.props.source) return {
      _id:0, name:name
    }
    for(let item of this.props.source) {
      if (item.name === name) return item;
    }

    return {_id:0, name:''};
  }
}

export default FormSelectValueComponent;
