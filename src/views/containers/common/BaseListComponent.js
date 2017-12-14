import React, { Component } from 'react';
import moment from 'moment'
import styled from 'styled-components'

import {
  Table
} from 'antd'

import DataContentComponent from './DataContentComponent'
import * as constants from '../../constants/Constants'

const Root = styled.div``

class BaseListComponent extends Component {

  static defaultProps = {
    columns : [],
    onGetList : () => {},
    onDelItems : (ids) => {},
    onItemConver : (item) => {return item},
    onPageChange : null,
    dataSource : [],
    deleteIDS : [],
    pageInfo: {},
    loading: false,
    editNode: null,
    addNode: null,
    onRowClick: null,
    onBtnAddClicked: ()=>{},
    onSearch: () => {},
    hasSearch: false,
    searchPlaceholder:'',
  }

  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      addVisible:false,
      page: 0,
      selectRows:[],
      source:[]
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.props.onGetList();
    this.setState({source:this.converList(this.props.dataSource)})
  }
  
  componentWillReceiveProps(nextProps){
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({source:this.converList(nextProps.dataSource)})
    }

    if (nextProps.deleteIDS !== this.props.deleteIDS) {
      if (this.props.pageInfo.pageSize){
        let page = this.props.pageInfo.page;
        if (nextProps.deleteIDS && nextProps.deleteIDS.length >= this.props.dataSource.length) {
          page = Math.max(1, page-1);
        }
      }
      this.props.onGetList(this.props.pageInfo);
    }
  }

  render() {
    let pagination = false;
    if (this.props.pageInfo && this.props.pageInfo.pageSize) {
      pagination = {
        current:this.props.pageInfo.page,
        pageSize:constants.DEFAULT_PAGE_SIZE,
        onChange:this.onPageChange,
        showTotal:total => `Total:${total}`,
        total: this.props.pageInfo.total
      }
    }
    return (
      <Root>
        <DataContentComponent
          hasSearch={this.props.hasSearch}
          searchPlaceholder={this.props.searchPlaceholder}
          listener={(e, value)=>{
            if (e === 'add') {
              if (this.props.onBtnAddClicked) {
                this.props.onBtnAddClicked();
              }
            } else if (e === 'delArray') {
              let ids = this.state.selectedRows.map((item) => {
                return item._id;
              })
              this.props.onDelItems(ids);
            } else if (e === 'search') {
              this.props.onSearch(value);
            }
          }}>
          <Table 
            bordered={true}
            columns={this.props.columns} 
            dataSource={this.state.source} 
            loading={this.props.loading}
            rowKey={'_id'}
            onRowClick={this.onRowClick}
            rowSelection={{onChange:this.onRowSelectionChange}}
            pagination={pagination}
          />
        </DataContentComponent>
        {
          this.props.addVisible ? 
          this.props.addNode 
          : null
        }
        {
          this.props.editVisible ? 
          this.props.editNode
          : null
        }
      </Root>
    );
  }

  onRowSelectionChange = (selectedRowKeys, selectedRows) => {
    this.setState({selectedRows:selectedRows});
  }

  onRowClick = (record, index, event) => {
    if (this.props.onRowClick) {
      this.props.onRowClick(record, index, event);
    } 
  }

  onPageChange = (page, pageSize) => {
    if (this.props.onPageChange) {
      this.props.onPageChange(page, pageSize);
    } else {
      this.props.onGetList({page:page, pageSize:pageSize, total:0})
    }
  }
  
  converList = (list) => {
    if (list) {
      return list.map((item, index) => {
        if (this.props.onItemConver) {
          return this.props.onItemConver(item);
        }
        return item;
      });
    } else {
      return [];
    }
  }
}

export default BaseListComponent;
