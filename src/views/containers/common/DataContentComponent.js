import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { Table, Button, Input, Icon } from 'antd'

import * as constants from '../../constants/Constants'

import SearchInput from './SearchInput'

const Search = Input.Search;

const Root = styled.div`
`
const TableHeader = styled.div`
  padding: 0.1rem 0;
`
const ButtonOp = styled(Button)`
  margin-right: 0.08rem;
`
const SearchOp = styled(SearchInput)`
  width: 2rem;
  margin
`

class DataContentComponent extends Component {
  static defaultProps = {
    tableOptions: {},
    showHeader: true,
    headerRender: null,
    listener: null,
    hasSearch: false,
    searchPlaceholder:'',
    canOperate:false,
    canDelete:false,
  }


  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

  }

  componentWillMount(){
  }

  render() {
    let header = null;
    if (this.props.showHeader) {
      if (this.props.headerRender) {
        header = (
          <TableHeader>{this.props.headerRender()}</TableHeader>
        );
      } else {
        header = (
          <TableHeader>
            {
              this.props.canOperate ?
              <ButtonOp type="primary" onClick={(e)=>this.onClick(e, 'add')}>添加</ButtonOp>
              : null
            }
            {
              this.props.canDelete ?
              <ButtonOp type="primary" onClick={(e)=>this.onClick(e, 'delArray')}>批量删除</ButtonOp>
              : null
            }
            {this.props.hasSearch ? <SearchOp placeholder={this.props.searchPlaceholder} onSearch={this.onSearch} enterButton/> : null}
          </TableHeader>
        );
      }
    }

    return (
      <Root>
        {header}
        {this.props.children}
      </Root>
    )
  }

  /**
   * event: add, delArray
   */
  onClick = (e, eventName, value) => {
    if (this.props.listener) {
      e.stopPropagation();
      this.props.listener(eventName, value);
    }
  }

  onSearch = (value) => {
    if (this.props.listener) {
      this.props.listener('search', value);
    }
  }
}

export default DataContentComponent;
