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
import BaseListComponent from '../../common/BaseListComponent'
import * as common from '../../../modules/common'
import * as constants from '../../../constants/Constants'
import GoodsAddModal from './GoodsAddModal'
import GoodsEditModal from './GoodsEditModal'
import { commonUtils } from '../../../modules/common';
import * as optionsType from '../types'

class GoodsListContainer extends Component {
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
    this.props.reqGetGoodsBaseDatas();
    // this.props.reqGetGoodsShoesList(this.props.pageInfo.page);
  }
  
  componentWillReceiveProps(nextProps){
  }

  render() {
    const columns = optionsType.getGoodsShoesListOptions(this);

    return (
      <BaseListComponent
        columns={columns} 
        dataSource={this.props.list} 
        loading={this.props.loading}
        onRowClick={this.onRowClick}
        onBtnAddClicked={()=>{this.setState({addVisible:true});}}
        pageInfo={this.props.pageInfo}
        onGetList={(pageInfo)=>{
          if (pageInfo) {
            this.props.reqGetGoodsShoesList(pageInfo.page, pageInfo.pageSize, this.searchWord);
          } else {
            this.props.reqGetGoodsShoesList(this.props.pageInfo.page, this.props.pageInfo.pageSize, this.searchWord);
          }
        }}
        hasSearch={true}
        searchPlaceholder={'请输入商品名称'}
        onSearch={(value)=>{
          this.searchWord = value;
          this.props.reqGetGoodsShoesList(this.props.pageInfo.page, this.props.pageInfo.pageSize, value);
        }}
        onDelItems={this.props.reqDeleteGoods}
        onItemConver={this.onItemConver}
        deleteIDS={this.props.goodsDeleteIDS}
        addVisible={this.state.addVisible}
        editVisible={this.state.editVisible}
        addNode={<GoodsAddModal title={'添加商品'} pageInfo={this.props.pageInfo} visible={this.state.addVisible} afterClose={()=>this.setState({addVisible:false})}/> }
        editNode={<GoodsEditModal title={'商品编辑'} data={this.state.editData} pageInfo={this.props.pageInfo} visible={this.state.editVisible} afterClose={()=>this.setState({editVisible:false})}/> }
      />
    );
  }

  onItemConver = (item, index) => {
    let info = Object.assign({}, item);
    let typeInfo = common.commonUtils.getGoodsProperty(info.property);
    info.property_label = (typeInfo && typeInfo.label) || '';
    info.put_date_label = moment(info.put_date).format('YYYY-MM-DD');
    info.type_label = (info.type && info.type.name) || '';
    info.style_label = (info.style && info.style.name) || '';
    info.season_label = (info.season && info.season.name) || '';
    info.out_color_label = (info.out_color && info.out_color.name) || '';
    info.in_color_label = (info.in_color && info.in_color.name) || '';
    info.bottom_color_label = (info.bottom_color && info.bottom_color.name) || '';
    info.bottom_side_color_label = (info.bottom_side_color && info.bottom_side_color.name) || '';
    info.height_label = info.height + 'cm';
    info.price_label = info.price + 'RMB';
    info.maintain_cycle_label = info.maintain_cycle + '天';

    return info;
  }
  
  onDelete = (ids) => {
    this.props.reqDeleteGoodsShoes(ids);
  }

  onRowClick = (record, index, event) => {
    this.props.history.push(this.props.match.path+'/' + record._id);
  }

  onEdit = (record) => {
    this.setState({editVisible:true, editData:record});
  }
}

export default connect(
  state => ({
    list:state.sales.goodsShoesList,
    goodsTypeList:state.sales.goodsTypeList,
    goodsStyleList:state.sales.goodsStyleList,
    goodsSeasonList:state.sales.goodsSeasonList,
    matriealColorList:state.sales.matriealColorList,
    outColorList:state.sales.outColorList,
    inColorList:state.sales.inColorList,
    bottomColorList:state.sales.bottomColorList,
    bottomSideColorList:state.sales.bottomSideColorList,
    loading:state.sales.loading,
    pageInfo:state.sales.goodsShoesListPage,
    goodsDeleteIDS:state.sales.goodsShoesDeleteIDS
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetGoodsShoesList: Actions.getGoodsShoesList,
      reqDeleteGoodsShoes: Actions.deleteGoodsShoes,
      reqGetGoodsShoesProfile: Actions.getGoodsShoesProfile,
      reqGetGoodsBaseDatas: Actions.getGoodsBaseDatas
    }, dispatch);
  }
)(GoodsListContainer);
