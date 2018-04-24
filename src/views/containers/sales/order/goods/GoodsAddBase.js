import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { Table, Button, Input, Icon } from 'antd'

import Actions from '../../../../actions'
import BaseComponent from '../../../../components/BaseComponent'
import * as constants from '../../../../constants/Constants'

import GoodsAddModal from '../../goods/GoodsAddModal'
import MaterialAddModal from '../../material/MaterialAddModal'
import CommonAddModal from '../../common/CommonAddModal'

import { GOODS_TYPES } from '../../goods/types'
import { COMMON_TYPES } from '../../common/types'

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
    let commonType = null;
    if (this.props.commonAddProps && this.props.commonAddProps.visible) {
      for(let type of COMMON_TYPES) {
        if (type.key === this.props.commonAddProps.key) {
          commonType = type;
          break;
        }
      }
    }
    let goodsType = null;
    if (this.props.goodsAddProps && this.props.goodsAddProps.visible) {
      let key = this.props.goodsAddProps.key;
      if (key === constants.BASE_CONSTANTS.E_ORDER_TYPE.DESIGN) {
        key = constants.BASE_CONSTANTS.E_ORDER_TYPE.SHOES;
      }
      for(let type of GOODS_TYPES) {
        if (type.key === key) {
          goodsType = type;
          break;
        }
      }
    }
    return (
      <Root>
        {
          goodsType ? 
          <GoodsAddModal 
            {...this.props.goodsAddProps}
            title={`添加${goodsType.label}`}
            goodsType={goodsType}  
          /> 
          : null
        }
        {
          this.props.materialAddProps && this.props.materialAddProps.visible ? 
          <MaterialAddModal {...this.props.materialAddProps} title={`添加原材料`} /> 
          : null
        }
        {
          commonType ? 
          <CommonAddModal 
            {...this.props.commonAddProps} 
            title={`添加`+commonType.label} 
            commonType={commonType} 
          /> 
          : null
        }
      </Root>
    )
  }

}

export default GoodsAddBase;
