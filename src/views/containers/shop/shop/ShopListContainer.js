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
import ContentContainer from '../../common/ContentComponent'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import DataContentComponent from '../../common/DataContentComponent'
import BaseListComponent from '../../common/BaseListComponent'
import * as common from '../../../modules/common'
import { commonUtils } from '../../../modules/common';
import * as constants from '../../../constants/Constants'
import ShopAddModal from './ShopAddModal'
import ShopEditModal from './ShopEditModal'

class ShopListContainer extends Component {
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
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.props.reqGetShopList(this.props.pageInfo.page);
  }
  
  componentWillReceiveProps(nextProps){
  }

  render() {
    const columns = [
      { title: '门店', dataIndex: 'name', key: 'name'},
      { title: '开业时间', dataIndex: 'open_date', key: 'open_date'},
      { title: '区域', dataIndex: 'regionInfoLabel', key: 'regionInfoLabel'},
      { title: '市场级别', dataIndex: 'marketLevelLabel', key: 'marketLevel'},
      { title: '门店性质', dataIndex: 'propertyLabel', key: 'property'},
      { title: '房租到期时间', dataIndex: 'rents_expire_date', key: 'rents_expire_date'},
      { title: '租金', dataIndex: 'rent', key: 'rent'},
      { title: '面积', dataIndex: 'area_label', key: 'area_label'},
      { title: '地址', dataIndex: 'address', key: 'address'},
      { title: '电话', dataIndex: 'phone', key: 'phone'},
      { title: '关店时间', dataIndex: 'close_date', key: 'close_date'},
      { title: '操作', dataIndex: 'id', key: 'id', render:(text, record, index)=>{
        return (<Button type="primary" shape="circle" icon="delete" size="large" onClick={(e)=>{
          e.stopPropagation();
          this.onDelete([record._id])}
        }
        />);
      }}
    ]

    return (
      <Root>
        <ContentHeaderComponent willSelectNavKey={constants.MENU_IDS.shopInfo} history={this.props.history} />
        <ContentContainer>
          <BaseListComponent
            columns={columns} 
            canOperate={this.canOperate()}
            dataSource={this.props.list} 
            loading={this.props.loading}
            onRowClick={this.onRowClick}
            onBtnAddClicked={()=>{this.setState({addVisible:true});}}
            pageInfo={this.props.pageInfo}
            onGetList={(pageInfo)=>{
              if (pageInfo) {
                this.props.reqGetShopList(pageInfo.page, pageInfo.pageSize, this.searchWord);
              } else {
                this.props.reqGetShopList(this.props.pageInfo.page, this.props.pageInfo.pageSize, this.searchWord);
              }
            }}
            hasSearch={true}
            searchPlaceholder={'请输入店铺名称'}
            onSearch={(value)=>{
              this.searchWord = value;
              this.props.reqGetShopList(this.props.pageInfo.page, this.props.pageInfo.pageSize, value);
            }}
            onDelItems={this.props.reqDeleteShop}
            onItemConver={this.onItemConver}
            deleteIDS={this.props.shopDeleteIDS}
            addVisible={this.state.addVisible}
            editVisible={this.state.editVisible}
            addNode={<ShopAddModal title={'添加门店'} pageInfo={this.props.pageInfo} visible={this.state.addVisible} afterClose={()=>this.setState({addVisible:false})}/> }
            editNode={<ShopEditModal title={'门店编辑'} data={this.state.editData} pageInfo={this.props.pageInfo} visible={this.state.editVisible} afterClose={()=>this.setState({editVisible:false})}/> }
          />
        </ContentContainer>
      </Root>
    );
  }

  onItemConver = (item, index) => {
    let info = Object.assign({}, item);
    let levelInfo = common.commonUtils.getMarketLevel(info.marketLevel);
    let proInfo = common.commonUtils.getShopPro(info.property);
    info.regionInfoLabel = item.country+'/'+item.region+'/'+item.province;
    info.regionInfo = [item.country, item.region, item.province];
    info.marketLevelLabel = levelInfo ? levelInfo.label : '';
    info.propertyLabel = proInfo ? proInfo.label : '';
    info.open_date = moment(info.open_date).format('YYYY-MM-DD');
    info.rents_expire_date = moment(info.rents_expire_date).format('YYYY-MM-DD');
    info.close_date = info.close_date ? moment(info.close_date).format('YYYY-MM-DD') : '';
    info.area_label = info.area ? info.area+'m²' : '0m²';

    return info;
  }
  
  onDelete = (ids) => {
    this.props.reqDeleteShop(ids);
  }

  onRowClick = (record, index, event) => {
    if (!this.canOperate()) return;
    this.setState({editVisible:true, editData:record});
  }
  canOperate = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.shopInfo)
    return this.power && this.power.canOperate;
  }
}

export default connect(
  state => ({
    list:state.shop.shopList,
    loading:state.shop.loading,
    pageInfo:state.shop.shopListPage,
    shopDeleteIDS:state.shop.shopDeleteIDS,
    user:state.app.loginInfo.user
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetShopList: Actions.getShopList,
      reqDeleteShop: Actions.deleteShop,
    }, dispatch);
  }
)(ShopListContainer);
