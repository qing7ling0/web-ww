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
  Button
} from 'antd'

import {
  Root,
  LoginInput,
  Container,
  LoginCard,
  BtnLogin
} from './styled'

import Actions from '../../../actions'
import * as config from '../../../constants/Config'
import * as common from '../../../modules/common'
import * as constants from '../../../constants/Constants'
import { commonUtils } from '../../../modules/common';
import { ORDER_TYPES } from './types'
import * as optionsType from '../types'

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
    this.props.reqGoodsShoesList(0, 1000);
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
    this.setState({editVisible:true, editData:record});
  }

  onRowClick = (record, index, event) => {
    this.props.history.push(this.props.match.path+'/' + record._id);
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
