import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { Table, Button, Input, Icon } from 'antd'

import Actions from '../../actions'
import BaseComponent from '../../components/BaseComponent'
import * as constants from '../../constants/Constants'
import ContentHeaderComponent from './ContentHeaderComponent'

const Search = Input.Search;

const Root = styled.div`
  padding: 0.24rem 0.24rem 0 0.24rem;
`

class SearchInput extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);
    this.state = {
      searchValue:''
    }
  }
  render() {
    let props = {};
    for(let key in this.props) {
      if (key !== 'onSearch') {
        props[key] = this.props[key];
      }
    }
    return (
      <Search 
        onPressEnter={()=>this.onSearch(this.state.searchValue)} 
        onSearch={this.onSearch}
        onChange={(value)=>this.setState({searchValue:value.target.value})}
        value={this.state.searchValue}
        prefix={this.state.searchValue ? <Icon type="close-circle" onClick={()=>{
          this.setState({searchValue:''})
          this.onSearch('');
        }} />:null}
        {
          ...props
        }
      />
    )
  }

  onSearch = (value) => {
    if (this.props.onSearch) {
      this.props.onSearch(value);
    }
  }
}

export default SearchInput;
