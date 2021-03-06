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
import * as ActionTypes from '../../../constants/ActionTypes'
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
  {key:'4', label:'已取消'},
  {key:'5', label:'全部'}
]
const ROOT_URL = common.findRouterById(config.Routers, constants.MENU_IDS.salesOrder).url;
const URL_REG = new RegExp(ROOT_URL + '/list/' +'\\d/') ;
const ADD_URL = ROOT_URL + '/add';
const URL_PROFILE = ROOT_URL + '/profile';

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
      selectedKeys: [ORDER_MENUS[0].key],
    }

    this.searchWord = '';
    this.searchGuide = '';
    this.searchShop = '';
    this.orderMenuKey = ORDER_MENUS[0].key;
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
    this.props.reqCustomerList(1, 10000);
    this.props.reqShopList(1, 100);
    this.props.reqShopGuideList(1, 1000);
  }

  componentDidMount() {
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

    if ((nextProps.result.type === ActionTypes.ORDER_SUB_UPDATE) && nextProps.loading !== this.props.loading && !nextProps.loading) {
      if (nextProps.result.code === 0) {
        this.onReqList();
      }
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
          {
            this.canOperate() ?
            <ButtonOp type="primary" onClick={this.onAddClicked}>添加</ButtonOp>
            :null
          }
          <SearchInput placeholder={'请输入订单号'} onSearch={this.onSearchOrderID} enterButton />
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
          <SelectInput placeholder={'请选择订单类型'} allowClear={true} onChange={this.onOrderTypeChange}>
            {
              ORDER_TYPES.map((item) => {
                return <Select.Option key={item.key}>{item.label}</Select.Option>;
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

  render() {
    let pagination = false;
    if (this.props.pageInfo && this.props.pageInfo.pageSize) {
      pagination = {
        current:this.props.pageInfo.page,
        pageSize:this.props.pageInfo.pageSize,
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
          canOperate={this.canAdd()}
          headerRender={this.renderHeader}
          >
          <Table 
            bordered={true}
            columns={this.columns} 
            dataSource={this.props.list} 
            loading={this.props.loading}
            rowKey={(record)=>record._id||record.key}
            onRow={(record, index) => ({
              onClick: ()=>this.onRowClick(record, index),
            })}
            pagination={pagination}
          />
        </DataContentComponent>
      </Root>
    );
  }

  onReqList = (pageInfo) => {
    pageInfo = pageInfo || this.props.pageInfo;
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
    if (this.searchOrderType) {
      con.type = this.searchOrderType;
    }
    if (this.orderMenuKey === '1') {
      con.state = constants.BASE_CONSTANTS.E_ORDER_STATUS.REVIEW;
    } else if (this.orderMenuKey === '2') {
      con.state = {$gt:constants.BASE_CONSTANTS.E_ORDER_STATUS.REVIEW, $lt:constants.BASE_CONSTANTS.E_ORDER_STATUS.COMPLETED};
    } else if (this.orderMenuKey === '3') {
      con.state = constants.BASE_CONSTANTS.E_ORDER_STATUS.COMPLETED;
    } else if (this.orderMenuKey === '4') {
      con.state = constants.BASE_CONSTANTS.E_ORDER_STATUS.CANCEL;
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
  
  onCancel = (id) => {
    this.props.reqCancelSuborder(id);
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
    // this.props.history.push(URL_PROFILE+'/' + record._id);
  }

  onPageChange = (page, pageSize) => {
    if (this.props.onPageChange) {
      this.props.onPageChange(page, pageSize);
    } else {
      this.onReqList({page:page, pageSize:pageSize});
    }
  }
  onRowSelectionChange = (selectedRowKeys, selectedRows) => {
    this.setState({selectedRows:selectedRows});
  }

  onEdit = (record) => {
    if (record) {
      this.props.history.push(URL_PROFILE+'/' + record._id);
      // this.setState({reviewModalVisible:true, reviewOrderInfo:JSON.parse(JSON.stringify(record))});
    }
  }

  onMenuClicked = ({item, key}) => {
    this.setState({orderMenuKey:key})
    // const rootPath = this.props.match.url.match(URL_REG);
    // if (rootPath && rootPath.length > 0) {
    //   this.props.history.push(rootPath[0] + key);
    // }
    this.orderMenuKey = key;
    this.onReqList();
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

  onOrderTypeChange = (value) => {
    this.searchOrderType = value;
    this.onReqList(this.props.pageInfo);
  }

  canOperate = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.salesOrder)
    return this.power && this.power.canOperate;
  }

  canAdd = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.salesOrder)
    return this.power && this.power.add;
  }

  canEdit = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.salesOrder)
    return this.power && this.power.edit;
  }

}

export default connect(
  state => ({
    sales:state.sales,
    loading:state.sales.loading,
    result:state.sales.result,
    pageInfo:state.sales.subOrderListPage,
    list:state.sales.subOrderList,
    deleteIDS:state.sales.orderDeleteIDS,
    shopList:state.shop.shopList,
    guideList:state.shop.shopGuideList,
    customerList:state.customer.customerList,
    goodsShoesList:state.sales.goodsShoesList,
    user:state.app.loginInfo.user
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetOrderList: Actions.getOrderList,
      reqGetSubOrderList: Actions.getSubOrderList,
      reqDeleteOrder: Actions.deleteOrder,
      reqCancelSuborder: Actions.suborderCancel,
      reqAddOrder: Actions.addOrder,
      reqUpdateOrder: Actions.updateOrder,
      reqUpdateSuborder: Actions.suborderUpdate,
      reqGetOrderProfile: Actions.getOrderProfile,
      reqShopList:Actions.getShopList,
      reqShopList:Actions.getShopList,
      reqShopGuideList:Actions.getShopGuideList,
      reqCustomerList:Actions.getCustomerList,
      reqGoodsShoesList:Actions.getGoodsShoesList,
    }, dispatch);
  }
)(OrderListContainer);
