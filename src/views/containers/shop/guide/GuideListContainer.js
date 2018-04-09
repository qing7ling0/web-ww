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
  Select
} from 'antd'

import {
  Root,
  Container,
  SearchContainer,
  SearchInput,
  SearchSelect
} from './styled'

import Actions from '../../../actions'
import ContentContainer from '../../common/ContentComponent'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import DataContentComponent from '../../common/DataContentComponent'
import BaseListComponent from '../../common/BaseListComponent'
import * as common from '../../../modules/common'
import * as constants from '../../../constants/Constants'
import GuideAddModal from './GuideAddModal'
import GuideEditModal from './GuideEditModal'
import { commonUtils } from '../../../modules/common';

class GuideListContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      addVisible:false,
      editVisible:false,
      page: 0,
      selectRows:[]
    }

    this.searchWord = '';
    this.searchShops = [];
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.props.reqGetShopList(0, 1000);
  }
  
  componentWillReceiveProps(nextProps){
  }

  render() {
    const columns = [
      { title: '名称', dataIndex: 'name', key: 'name'},
      { title: '手机', dataIndex: 'phone', key: 'phone'},
      { title: '账号', dataIndex: 'account', key: 'account'},
      { title: '性别', dataIndex: 'sex', key: 'sex'},
      { title: '身高', dataIndex: 'height_label', key: 'height_label'},
      { title: '体重', dataIndex: 'weight_label', key: 'weight_label'},
      { title: '门店', dataIndex: 'shop_label', key: 'shop_label'},
      { title: '店长', dataIndex: 'manager_label', key: 'manager_label'},
      { title: '入职日期', dataIndex: 'entry_time_label', key: 'entry_time_label'},
      { title: '离职日期', dataIndex: 'leave_time_label', key: 'leave_time_label'},
    ]

    if (this.canOperateDelete()) {
      columns.push(
        { title: '操作', dataIndex: 'id', key: 'id', render:(text, record, index)=>{
          return (<Button type="primary" shape="circle" icon="delete" onClick={(e)=>{
            e.stopPropagation();
            this.onDelete([record._id])}
          } />);
        }}
      );
    }

    return (
      <Root>
        <ContentHeaderComponent willSelectNavKey={constants.MENU_IDS.shopGuide} history={this.props.history} />
        <ContentContainer>
          <SearchContainer>
            <SearchInput placeholder="请输入姓名搜索" onSearch={this.onGuideSearch} />
            <SearchSelect 
              mode="multiple"
              placeholder="请选择店铺"
              showSearch={true}
              onChange={this.onShopChange}
              onBlur={this.onShopBlur}
            >
              {this.props.shopList.map((item, index) => {
                return (<Select.Option key={'key'+index} value={item._id}>{item.name}</Select.Option>);
              })}
            </SearchSelect>
          </SearchContainer>
          <BaseListComponent
            columns={columns} 
            canOperate={this.canOperate()}
            dataSource={this.props.list} 
            loading={this.props.loading}
            onRowClick={this.onRowClick}
            onBtnAddClicked={()=>{this.setState({addVisible:true});}}
            pageInfo={this.props.pageInfo}
            onGetList={this.onReqGuideList}
            onDelItems={this.props.reqDeleteShopGuide}
            onItemConver={this.onItemConver}
            deleteIDS={this.props.shopDeleteIDS}
            addVisible={this.state.addVisible}
            editVisible={this.state.editVisible}
            addNode={<GuideAddModal title={'添加导购'} pageInfo={this.props.pageInfo} visible={this.state.addVisible} afterClose={()=>this.setState({addVisible:false})}/> }
            editNode={<GuideEditModal title={'导购编辑'} data={this.state.editData} pageInfo={this.props.pageInfo} visible={this.state.editVisible} afterClose={()=>this.setState({editVisible:false})}/> }
          />
        </ContentContainer>
      </Root>
    );
  }

  onShopChange = (value) => {
    this.searchShops = value;
  }

  onShopBlur = () => {
    this.onReqGuideList();
  }

  onGuideSearch = (value) => {
    this.searchWord = value;
    this.onReqGuideList();
  }

  onReqGuideList = (pageInfo) => {
    let con = {};
    if (this.searchWord) {
      con.name = {$regex:`/${this.searchWord}/i`}
    }
    if (this.searchShops && this.searchShops.length > 0) {
      con.shop = {$in:this.searchShops}
    }

    if (pageInfo) {
      this.props.reqGetShopGuideList(pageInfo.page, pageInfo.pageSize, con);
    } else {
      this.props.reqGetShopGuideList(this.props.pageInfo.page, this.props.pageInfo.pageSize, con);
    }
  }

  onItemConver = (item, index) => {
    let info = Object.assign({}, item);
    if (info.account) {
      info.accountId = info.account._id;
      info.password = info.account.password;
      info.account = info.account.account;
    }

    info.manager_label = info.manager ? '店长':'导购';
    info.shop_label = info.shop ? info.shop.name : '';
    info.shop_id = info.shop ? info.shop._id : '';
    info.height_label = (info.height ? info.height:0) + 'cm';
    info.weight_label = (info.weight ? info.weight:0) + 'Kg';
    info.birthday_label = moment(info.birthday).format('YYYY-MM-DD');
    info.entry_time_label = moment(info.birthday).format('YYYY-MM-DD');
    info.leave_time_label = moment(info.birthday).format('YYYY-MM-DD');

    return info;
  }
  
  onDelete = (ids) => {
    this.props.reqDeleteShopGuide(ids);
  }

  onRowClick = (record, index, event) => {
    this.setState({editVisible:true, editData:record});
  }
  canOperate = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.shopGuide)
    return this.power && this.power.canOperate;
  }
  canOperateDelete = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.shopGuide)
    return this.power && this.power.del;
  }
}

export default connect(
  state => ({
    list:state.shop.shopGuideList,
    shopList:state.shop.shopList,
    loading:state.shop.loading,
    pageInfo:state.shop.shopGuideListPage,
    shopDeleteIDS:state.shop.shopGuideDeleteIDS,
    user:state.app.loginInfo.user
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetShopList: Actions.getShopList,
      reqGetShopGuideList: Actions.getShopGuideList,
      reqDeleteShopGuide: Actions.deleteShopGuide,
    }, dispatch);
  }
)(GuideListContainer);
