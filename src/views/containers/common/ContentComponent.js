import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { Card } from 'antd'

import Actions from '../../actions'
import BaseComponent from '../../components/BaseComponent'
import * as constants from '../../constants/Constants'
import ContentHeaderComponent from './ContentHeaderComponent'

const Root = styled.div`
  padding: 0.24rem 0.24rem 0 0.24rem;
`

class ContentContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

  }

  componentWillMount(){
  }

  render() {
    return (
      <Root><Card>{this.props.children}</Card></Root>
    )
  }
}

export default ContentContainer;
