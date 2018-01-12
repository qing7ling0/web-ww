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
  Tabs,
  Menu,
  Select,
  Steps
} from 'antd'

const TabPane = Tabs.TabPane;

import {
  Root,
  SearchContainer,
  SelectInput,
  SearchInput,
  ButtonOp,
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
import OrderEditModal from './OrderEditModal'
import OrderGoodsReviewModal from './OrderGoodsReviewModal'

const ORDER_MENUS = [
  {key:'1', label:'需审核'},
  {key:'2', label:'制作中'},
  {key:'3', label:'已完成'},
  {key:'4', label:'全部'}
]
const ROOT_URL = common.findRouterById(config.Routers, constants.MENU_IDS.salesOrder).url;
const ADD_URL = ROOT_URL + '/add';
const URL_PROFILE = ROOT_URL + '/profile';
const URL_REG = new RegExp(ROOT_URL + '/list/' +'\\d/') ;

class OrderListContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      addVisible:false,
      editVisible:false,
      reviewModalVisible:false,
      reviewOrderInfo:null,
      page: 0,
      selectRows:[],
      selectedKeys: [ORDER_MENUS[0].key]
    }

    this.searchWord = '';
    this.searchGuide = '';
    this.searchShop = '';
    this.routerPath = common.findRouterById(config.Routers, constants.MENU_IDS.salesOrder).url;
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.orderType = ORDER_TYPES[0];
    for(let value of ORDER_TYPES) {
      if (value.key === this.props.match.params.type) {
        this.orderType = value;
      }
    }
    const { location } = this.props.history;
    if (location.pathname.match(URL_REG)) {
      const pathSnippets = location.pathname.replace(URL_REG, '').split('/').filter(i => i);
      let len = pathSnippets.length;
      if(len > 0) {
        this.state.selectedKeys = [pathSnippets[0]];
      }
    }
    this.props.reqCustomerList(0, 10000);
    this.props.reqShopList(0, 100);
    this.props.reqShopGuideList(0, 1000);
    this.onReqList();
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.type !== this.props.match.params.type) {
      for(let value of ORDER_TYPES) {
        if (value.key === nextProps.match.params.type) {
          this.orderType = value;
        }
      }
      this.onReqList();
    }
  }

  renderHeader = () => {
    return(
      <div>
        <Menu
          onClick={this.onMenuClicked}
          mode="horizontal"
          defaultSelectedKeys={this.state.selectedKeys}
        >
          {ORDER_MENUS.map((item) => {
            return (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            );
          })}
        </Menu>
        <SearchContainer>
          <ButtonOp type="primary" onClick={this.onAddClicked}>添加</ButtonOp>
          <SearchInput placeholder={'请输入订单号'} onSearch={this.onSearchOrderID}/>
          <SelectInput showSearch={true} placeholder={'请选择导购'} allowClear={true} optionFilterProp='children' onChange={this.onGudieChange}>
            {
              this.props.guideList.map((item) => {
                return <Select.Option key={item._id} >{item.name}</Select.Option>;
              })
            }
          </SelectInput>
          <SelectInput placeholder={'请选择店铺'} allowClear={true} onChange={this.onShopChange}>
            {
              this.props.shopList.map((item) => {
                return <Select.Option key={item._id}>{item.name}</Select.Option>;
              })
            }
          </SelectInput>
        </SearchContainer>
      </div>
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
    this.columns= this.orderType.listOptions(this);
    this.source = [
      
    ]
    return (
      <Root>
        <DataContentComponent
          headerRender={this.renderHeader}
          >
          <Table 
            columns={this.columns} 
            dataSource={this.props.list} 
            loading={this.props.loading}
            rowKey={(record)=>record._id}
            onRow={(record, index) => ({
              onClick: ()=>this.onRowClick(record, index),
            })}
            rowSelection={{onChange:this.onRowSelectionChange}}
            pagination={pagination}
          />
        </DataContentComponent>
      </Root>
    );
  }

  onReqList = (pageInfo) => {
    let con = {};
    if (this.searchOrderId) {
      // con.sub_order_id=this.orderType.id;
      con.sub_order_id = {$regex:`/${this.searchOrderId}/i`}
    }
    if (this.searchGuide) {
      con.guide = this.searchGuide;
    }
    if (this.searchShop) {
      con.shop = this.searchShop;
    }
    this.props.reqGetSubOrderList('subOrderList', con, pageInfo);
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
    this.props.history.push(URL_PROFILE+'/' + record._id);
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
    if (record) {
      this.setState({reviewModalVisible:true, reviewOrderInfo:JSON.parse(JSON.stringify(record))});
    }
  }

  onMenuClicked = ({item, key}) => {
    const rootPath = this.props.match.url.match(URL_REG);
    if (rootPath && rootPath.length > 0) {
      this.props.history.push(rootPath[0] + key);
    }
  }

  onAddClicked = () => {
    this.props.history.push(ADD_URL);
  }

  onSearchOrderID = (value) => {
    this.searchOrderId = value;
    this.onReqList(this.props.pageInfo);
  }

  onGudieChange = (value) => {
    this.searchGuide = value;
    this.onReqList(this.props.pageInfo);
    console.log('onGudieChange ' + value)
  }

  onShopChange = (value) => {
    this.searchShop = value;
    this.onReqList(this.props.pageInfo);
  }

}

export default connect(
  state => ({
    sales:state.sales,
    loading:state.sales.loading,
    pageInfo:state.sales.orderListPage,
    list:state.sales.subOrderList,
    deleteIDS:state.sales.orderDeleteIDS,
    shopList:state.shop.shopList,
    guideList:state.shop.shopGuideList,
    customerList:state.customer.customerList,
    goodsShoesList:state.sales.goodsShoesList
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetOrderList: Actions.getOrderList,
      reqGetSubOrderList: Actions.getSubOrderList,
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
