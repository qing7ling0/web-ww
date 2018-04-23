import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { Table, Button, Input, Icon } from 'antd'

import Actions from '../../../../actions'
import BaseComponent from '../../../../components/BaseComponent'
import * as constants from '../../../../constants/Constants'

import GoodsAddModal from '../../goods/GoodsAddModal'

const Search = Input.Search;

const Root = styled.div`
`

class GoodsAddBase extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <Root>
        {
          this.props.goodsAddProps && this.props.goodsAddProps.visible ? 
          <GoodsAddModal {...this.props.goodsAddProps} /> 
          : null
        }
      </Root>
    )
  }

}

export default GoodsAddBase;
