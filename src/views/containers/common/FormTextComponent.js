import React, { Component } from 'react';
import styled from 'styled-components'
import { Card } from 'antd'

const Root = styled.div`
  width:100%;
  font-size:0.14rem;
  font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color:rgba(0, 0, 0, 0.65);
  height: 32px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  display: inline-block;
  line-height:32px;
  padding:0 11px;
`

class FormTextComponent extends Component {
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
    let value = (this.state.value!==null && this.state.value !== undefined) ? this.state.value : "";
    return (
      <Root>
        {
          this.props.render ?
          this.props.render(value)
          :
          value
        }
      </Root>
    )
  }
}

export default FormTextComponent;
