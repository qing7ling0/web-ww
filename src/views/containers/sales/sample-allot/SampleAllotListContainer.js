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
  Menu,
  Select
} from 'antd'

import {
  Root,
  SearchContainer,
  SelectInput,
  SearchInput,
  ButtonOp,
} from './styled'

import Actions from '../../../actions'
import BaseListComponent from '../../common/BaseListComponent'
import * as common from '../../../modules/common'
import * as constants from '../../../constants/Constants'
import * as config from '../../../constants/Config'
import utils from '../../../../utils/utils'
import { commonUtils } from '../../../modules/common';
import { GOODS_TYPES } from './types'

const ROOT_URL = common.findRouterById(config.Routers, constants.MENU_IDS.salesSampleAllot).url;
const ADD_URL = ROOT_URL + '/add';
const URL_PROFILE = ROOT_URL + '/profile';
const URL_REG = new RegExp(ROOT_URL + '/list/' +'\\d/') ;

const ORDER_MENUS = [
  {key:'1', label:'待审核'},
  {key:'2', label:'调拨中'},
  {key:'3', label:'已完成'},
  {key:'4', label:'已取消'}
]

class SampleAllotListContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      addVisible:false,
      editVisible:false,
      page: 0,
      selectRows:[],
      selectedKeys: [ORDER_MENUS[0].key],
      searchShop:''
    }

    this.searchWord = '';
    this.typeInfo = GOODS_TYPES[0];
    this.orderMenuKey = ORDER_MENUS[0].key;
    this.routerPath = common.findRouterById(config.Routers, constants.MENU_IDS.salesSampleAllot).url;
  }

  componentWillMount(){
    for(let value of GOODS_TYPES) {
      if (value.key === this.props.match.params.type) {
        this.typeInfo = value;
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
    // this.props.reqGetGoodsBaseDatas();
    this.props.reqShopList(1, 100);
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.type !== this.props.match.params.type) {
      for(let value of GOODS_TYPES) {
        if (value.key === nextProps.match.params.type) {
          this.typeInfo = value;
        }
      }
      // this.onReqList();
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
          <SelectInput placeholder={'请选择申请的店铺'} allowClear={true} onChange={this.onShopChange}>
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

  render() {
    this.options = this.typeInfo.listOptions(this);

    return (
      <BaseListComponent
        headerRender={this.renderHeader}
        canOperate={false}
        canDelete={false}
        columns={this.options} 
        dataSource={this.currentList()} 
        loading={this.props.loading}
        onRowClick={this.onRowClick}
        onBtnAddClicked={()=>{this.setState({addVisible:true});}}
        pageInfo={this.props.pageInfo}
        onGetList={(pageInfo)=>{
          this.onReqList(pageInfo);
        }}
        hasSearch={false}
        searchPlaceholder={`请输入${this.typeInfo.label}名称`}
        onSearch={(value)=>{
          this.searchWord = value;
          this.onReqList(this.props.pageInfo);
        }}
        onDelItems={this.onDelete}
        onItemConver={this.onItemConver}
        deleteIDS={this.props.deleteIDS}
        addVisible={this.state.addVisible}
        editVisible={this.state.editVisible}
      />
    );
  }
  currentList = () => {
    let listKey = this.typeInfo.listTag;
    let index = this.typeInfo.listTag.indexOf(':');
    if (index > -1) {
      listKey = this.typeInfo.listTag.substring(0, index);
    }
    for(let key in this.props.sales) {
      if (listKey === key) {
        return this.props.sales[key];
      }
    }
    return [];
  }

  onReqList = (pageInfo) => {
    let con = {
    };
    if (this.searchShop) {
      con.apply_shop = this.searchShop;
    }
    if (this.orderMenuKey === '1') {
      con.status = constants.BASE_CONSTANTS.E_SAMPLE_ALLOT_STATUS.REVIEW;
    } else if (this.orderMenuKey === '2') {
      con.status = {$gt:constants.BASE_CONSTANTS.E_SAMPLE_ALLOT_STATUS.REVIEW, $lt:constants.BASE_CONSTANTS.E_SAMPLE_ALLOT_STATUS.COMPLETED};
    } else if (this.orderMenuKey === '3') {
      con.status = constants.BASE_CONSTANTS.E_SAMPLE_ALLOT_STATUS.COMPLETED;
    } else if (this.orderMenuKey === '4') {
      con.status = constants.BASE_CONSTANTS.E_SAMPLE_ALLOT_STATUS.CANCEL;
    }
    this.props.reqGetSampleAllotList(con, pageInfo);
  }
  onReqUpdate = (id, data) => {
    if (data) {
      data.type = this.typeInfo.key;
    }
    this.props.reqUpdateSampleAllot(this.typeInfo.tag, id, data);
  }
  onReqAdd = (data) => {
    if (data) {
      data.type = this.typeInfo.key;
    }
    this.props.reqAddSampleAllot(this.typeInfo.tag, data);
  }
  onReqRemove = (ids) => {
    this.props.reqDeleteSampleAllot(this.typeInfo.tag, ids);
  }
  onReqProfile = (id) => {
    this.props.reqGetSampleAllotProfile(this.typeInfo.tag, id);
  }

  onAdd = (values) => {
    if (values) {
      if (values.put_date) {
        values.put_date = moment(values.put_date).format('YYYY-MM-DD');
      }


      this.onReqAdd(values);
    }
  }
  onEdit = (values) => {
    values = utils.diffent(values, this.state.editData);
    if (values) {
      if (values) {
        if (values.put_date) {
          values.put_date = moment(values.put_date).format('YYYY-MM-DD');
        }
        this.onReqUpdate(this.state.editData._id, values);
      }
    }
  }
  onDelete = (ids) => {
    this.onReqRemove(ids);
  }

  onRowClick = (record, index, event) => {
    this.props.history.push(URL_PROFILE+'/' + record._id);
  }

  onEditClick = (record) => {
    if (!this.canOperate()) return;
    this.setState({editVisible:true, editData:record});
  }
  onMenuClicked = ({item, key}) => {
    this.setState({orderMenuKey:key})
    this.orderMenuKey = key;
    this.onReqList();
  }
  onShopChange = (value) => {
    this.searchShop = value;
    this.onReqList();
  }
  canOperate = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.salesSampleAllot)
    return this.power && this.power.canOperate;
  }
  canDelete = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.salesSampleAllot)
    return this.power && this.power.del;
  }
}

export default connect(
  state => ({
    sales:state.sales,
    loading:state.sales.loading,
    pageInfo:state.sales.sampleAllotListPage,
    deleteIDS:state.sales.sampleAllotRemove,
    shopList:state.shop.shopList,
    user:state.app.loginInfo.user
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetSampleAllotList: Actions.getSampleAllotList,
      reqDeleteSampleAllot: Actions.deleteSampleAllot,
      reqUpdateSampleAllot: Actions.updateSampleAllot,
      reqShopList:Actions.getShopList,
      reqGetGoodsBaseDatas: Actions.getGoodsBaseDatas
    }, dispatch);
  }
)(SampleAllotListContainer);
