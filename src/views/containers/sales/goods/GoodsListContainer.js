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
import * as config from '../../../constants/Config'
import utils from '../../../../utils/utils'
import GoodsAddModal from './GoodsAddModal'
import GoodsEditModal from './GoodsEditModal'
import { commonUtils } from '../../../modules/common';
import { GOODS_TYPES } from './types'

const ROOT_URL = common.findRouterById(config.Routers, constants.MENU_IDS.salesItems).url;
const ADD_URL = ROOT_URL + '/add';
const URL_PROFILE = ROOT_URL + '/profile';
const URL_REG = new RegExp(ROOT_URL + '/list/' +'\\d/') ;
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
    this.goodsType = GOODS_TYPES[0];
  }

  componentWillMount(){
    for(let value of GOODS_TYPES) {
      if (value.key === this.props.match.params.type) {
        this.goodsType = value;
      }
    }
    this.props.reqGetGoodsBaseDatas();
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.type !== this.props.match.params.type) {
      for(let value of GOODS_TYPES) {
        if (value.key === nextProps.match.params.type) {
          this.goodsType = value;
        }
      }
      this.onReqList();
    }
  }

  render() {
    this.options = this.goodsType.listOptions(this);

    return (
      <BaseListComponent
        columns={this.options} 
        dataSource={this.currentList()} 
        loading={this.props.loading}
        onRowClick={this.onRowClick}
        onBtnAddClicked={()=>{this.setState({addVisible:true});}}
        pageInfo={this.props.pageInfo}
        onGetList={(pageInfo)=>{
          this.onReqList(pageInfo);
        }}
        hasSearch={true}
        searchPlaceholder={`请输入${this.goodsType.label}名称`}
        onSearch={(value)=>{
          this.searchWord = value;
          this.onReqList(this.props.pageInfo);
        }}
        onDelItems={this.onDelete}
        onItemConver={this.onItemConver}
        deleteIDS={this.props.deleteIDS}
        addVisible={this.state.addVisible}
        editVisible={this.state.editVisible}
        canOperate={this.canOperate()}
        addNode={
          <GoodsAddModal 
            title={`添加${this.goodsType.label}`} 
            pageInfo={this.props.pageInfo} 
            visible={this.state.addVisible} 
            goodsType={this.goodsType} 
            onAdd={this.onAdd}
            onSubmitSuccess={this.onReqList}
            afterClose={()=>this.setState({addVisible:false})}/> 
        }
        editNode={
          <GoodsEditModal 
            title={`编辑${this.goodsType.label}`} 
            data={this.state.editData} 
            pageInfo={this.props.pageInfo} 
            visible={this.state.editVisible} 
            goodsType={this.goodsType} 
            onEdit={this.onEdit}
            onSubmitSuccess={this.onReqList}
            afterClose={()=>this.setState({editVisible:false})}/> 
        }
      />
    );
  }
  currentList = () => {
    let listKey = this.goodsType.listTag;
    let index = this.goodsType.listTag.indexOf(':');
    if (index > -1) {
      listKey = this.goodsType.listTag.substring(0, index);
    }
    for(let key in this.props.sales) {
      if (listKey === key) {
        return this.props.sales[key];
      }
    }
    return [];
  }

  onReqList = (pageInfo) => {
    pageInfo = pageInfo || this.props.pageInfo;
    let con = {
      goods:this.goodsType.key
    };
    if (this.searchWord) {
      con = {};
      con.name = {$regex:`/${this.searchWord}/i`}
    }
    this.props.reqGetGoodsList(this.goodsType.listTag, this.goodsType.graphqlType, con, pageInfo);
  }
  onReqUpdate = (id, data) => {
    if (data) {
      data.goods = this.goodsType.key;
    }
    this.props.reqUpdateGoods(this.goodsType.tag, id, data);
  }
  onReqAdd = (data) => {
    if (data) {
      data.goods = this.goodsType.key;
    }
    this.props.reqAddGoods(this.goodsType.tag, this.goodsType.graphqlType, data);
  }
  onReqRemove = (ids) => {
    this.props.reqDeleteGoods(this.goodsType.tag, ids);
  }
  onReqProfile = (id) => {
    this.props.reqGetGoodsProfile(this.goodsType.tag, id);
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
    if (values.put_date) {
      values.put_date = moment(values.put_date).format('YYYY-MM-DD HH:mm:ss');
    }
    values = utils.diffent(values, this.state.editData);
    if (values) {
      if (values) {
        this.onReqUpdate(this.state.editData._id, values);
      }
    }
  }
  onDelete = (ids) => {
    this.onReqRemove(ids);
  }

  onRowClick = (record, index, event) => {
    // this.props.history.push(URL_PROFILE+'/' + record._id);
  }

  onEditClick = (record) => {
    if (this.canOperate())
      this.setState({editVisible:true, editData:record});
  }

  canOperate = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.salesItems)
    return this.power && this.power.canOperate;
  }
}

export default connect(
  state => ({
    sales:state.sales,
    loading:state.sales.loading,
    pageInfo:state.sales.goodsListPage,
    deleteIDS:state.sales.goodsDeleteIDS,
    user:state.app.loginInfo.user
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetGoodsList: Actions.getGoodsList,
      reqAddGoods: Actions.addGoods,
      reqDeleteGoods: Actions.deleteGoods,
      reqUpdateGoods: Actions.updateGoods,
      reqGetGoodsProfile: Actions.getGoodsProfile,
      reqGetGoodsBaseDatas: Actions.getGoodsBaseDatas
    }, dispatch);
  }
)(GoodsListContainer);
