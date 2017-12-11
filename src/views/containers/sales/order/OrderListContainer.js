import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'

import {
  Card,
  Icon,
  Layout,
  message,
  Table,
  Button,
  Tabs
} from 'antd'

const TabPane = Tabs.TabPane;


import {
  Root
} from './styled'

import Actions from '../../../actions'
import * as config from '../../../constants/Config'
import * as common from '../../../modules/common'
import * as constants from '../../../constants/Constants'
import { commonUtils } from '../../../modules/common';
import { ORDER_TYPES } from './types'
import * as optionsType from '../types'

import DataContentComponent from '../../common/DataContentComponent'
import BaseListComponent from '../../common/BaseListComponent'
import OrderAddModal from './OrderAddModal'
import OrderEditModal from './OrderEditModal'

class OrderListContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      addVisible:false,
      editVisible:false,
      page: 0,
      selectRows:[],
    }

    this.searchWord = '';
    this.routerPath = common.findRouterById(config.Routers, constants.MENU_IDS.salesOrder).url;
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.orderType = ORDER_TYPES[0];
    for(let value of ORDER_TYPES) {
      if (value.tag === this.props.match.params.type) {
        this.orderType = value;
      }
    }
    this.props.reqCustomerList(0, 10000);
    this.props.reqShopList(0, 100);
    this.props.reqShopGuideList(0, 1000);
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.type !== this.props.match.params.type) {
      for(let value of ORDER_TYPES) {
        if (value.tag === nextProps.match.params.type) {
          this.orderType = value;
        }
      }
      this.onReqList();
    }
  }

  renderHeader = () => {
    return(
      <Tabs defaultActiveKey="2" size="small">
        <TabPane tab="Tab 1" key="1">Content of tab 1</TabPane>
        <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
        <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
      </Tabs>
    );
  }

  renderSubOrder = (item) => {
    const subColumns = {};
    return (
      <Table
        columns={subColumns}
        dataSource={item.sub_order}
        pagination={false}
      />
    );
  }

  /**
   * 
    render() {
    const columns = optionsType.getOrderListOptions(this);
    const list = this.props.orderList;
    return (
      <BaseListComponent
        columns={columns} 
        dataSource={list} 
        loading={this.props.loading}
        onRowClick={this.onRowClick}
        onBtnAddClicked={()=>{
          this.props.history.push(this.routerPath+'/add/' + this.props.match.params.type);
          // this.setState({addVisible:true});
        }}
        pageInfo={this.props.pageInfo}
        onGetList={(pageInfo)=>{
          this.onReqList(pageInfo);
        }}
        hasSearch={true}
        searchPlaceholder={`请输入${this.orderType.label}`}
        onSearch={(value)=>{
          this.searchWord = value;
          this.onReqList(this.props.pageInfo);
        }}
        onDelItems={this.props.reqDeleteOrder}
        deleteIDS={this.props.orderDeleteIDS}
        addVisible={this.state.addVisible}
        editVisible={this.state.editVisible}
        addNode={
          <OrderAddModal 
            orderType={this.orderType} 
            title={`添加${this.orderType.label}`} 
            pageInfo={this.props.pageInfo} 
            visible={this.state.addVisible} 
            onSubmitSuccess={this.onReqList}
            onAdd={this.onAdd}
            afterClose={()=>this.setState({addVisible:false})}/> 
        }
        editNode={
          <OrderEditModal 
          orderType={this.orderType} 
          title={`编辑${this.orderType.label}`} 
          data={this.state.editData} 
          pageInfo={this.props.pageInfo} 
          visible={this.state.editVisible} 
          onSubmitSuccess={this.onReqList}
          onEdit={this.onEdit}
          afterClose={()=>this.setState({editVisible:false})}/> }
      />
    );
  }
  */

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
    this.columns=[
      { title: '名称', dataIndex: 'name', key: 'name'},
      { title: '颜色', dataIndex: 'color', key: 'color', render:(item) => item.name},
      { title: '数量', dataIndex: 'count', key: 'count'}
    ]
    this.source = [
      
    ]
    return (
      <Root>
        <DataContentComponent
          hasSearch={true}
          searchPlaceholder={'输入订单编号'}
          headerRender={this.renderHeader}
          listener={(e, value)=>{
            if (e === 'add') {
              if (this.props.onBtnAddClicked) {
                // this.props.onBtnAddClicked();
              }
            } else if (e === 'delArray') {
              // let ids = this.state.selectedRows.map((item) => {
              //   return item._id;
              // })
              // this.props.onDelItems(ids);
            } else if (e === 'search') {
              // this.props.onSearch(value);
            }
          }}>
          <Table 
            columns={this.columns} 
            dataSource={this.state.source} 
            loading={this.props.loading}
            rowKey={'_id1'}
            onRowClick={this.onRowClick}
            rowSelection={{onChange:this.onRowSelectionChange}}
            pagination={pagination}
          />
        </DataContentComponent>
      </Root>
    );
  }

  onReqList = (pageInfo) => {
    let con = null;
    if (this.searchWord) {
      con = {};
      con.type=this.orderType.id;
      con.name = {$regex:`/${this.searchWord}/i`}
    }
    this.props.reqGetOrderList(this.orderType.query, con, pageInfo);
  }

  onReqUpdate = (id, data) => {
    this.props.reqUpdateOrder(id, data);
  }
  
  onReqAdd = (data) => {
    this.props.reqAddOrder(this.orderType.query, data);
  }

  onReqRemove = (ids) => {
    this.props.reqDeleteOrder(this.orderType.query, ids);
  }

  onDelete = (ids) => {
    this.onReqRemove(ids);
  }
  
  onDelete = (ids) => {
    this.onReqRemove(ids);
  }

  onAdd = (values) => {
    this.onReqAdd(values);
  }

  onEdit = (values) => {
    values = utils.diffent(values, this.state.editData);
    if (values) {
      this.onReqUpdate(this.state.editData._id, values);
    }
  }

  onRowClick = (record, index, event) => {
    // this.setState({editVisible:true, editData:record});
  }

  onRowClick = (record, index, event) => {
    // this.props.history.push(this.props.match.path+'/' + record._id);
  }
  onPageChange = (page, pageSize) => {
    // if (this.props.onPageChange) {
    //   this.props.onPageChange(page, pageSize);
    // } else {
    //   this.props.onGetList({page:page, pageSize:pageSize, total:0})
    // }
  }
  onRowSelectionChange = (selectedRowKeys, selectedRows) => {
    this.setState({selectedRows:selectedRows});
  }

  onEdit = (record) => {
    // this.setState({editVisible:true, editData:record});
  }
}

export default connect(
  state => ({
    sales:state.sales,
    loading:state.sales.loading,
    pageInfo:state.sales.orderListPage,
    deleteIDS:state.sales.orderDeleteIDS,
    orderList:state.sales.orderList,
    shopList:state.shop.shopList,
    guideList:state.shop.shopGuideList,
    customerList:state.customer.customerList,
    goodsShoesList:state.sales.goodsShoesList
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetOrderList: Actions.getOrderList,
      reqDeleteOrder: Actions.deleteOrder,
      reqAddOrder: Actions.addOrder,
      reqUpdateOrder: Actions.updateOrder,
      reqGetOrderProfile: Actions.getOrderProfile,
      reqShopList:Actions.getShopList,
      reqShopGuideList:Actions.getShopGuideList,
      reqCustomerList:Actions.getCustomerList,
      reqGoodsShoesList:Actions.getGoodsShoesList,
    }, dispatch);
  }
)(OrderListContainer);
