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
import CommonAddModal from './CommonAddModal'
import CommonEditModal from './CommonEditModal'
import { commonUtils } from '../../../modules/common';
import { COMMON_TYPES } from './types'
import * as optionsType from '../types'
import utils from '../../../../utils/utils'

class CommonListContainer extends Component {
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
    this.options = [];
    this.commonType=COMMON_TYPES[0];
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    for(let value of COMMON_TYPES) {
      if (value.key === this.props.match.params.type) {
        this.commonType = value;
      }
    }
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.type !== this.props.match.params.type) {
      for(let value of COMMON_TYPES) {
        if (value.key === nextProps.match.params.type) {
          this.commonType = value;
        }
      }
      this.onReqList();
    }
  }

  componentDidMount(){
    this.props.reqMaterialList();
  }

  render() {
    this.options = this.commonType.listOptions(this);
    const list = this.currentList();
    return (
      <BaseListComponent
        canOperate={this.canOperate()}
        columns={this.options} 
        dataSource={list} 
        loading={this.props.loading}
        onRowClick={this.onRowClick}
        onBtnAddClicked={()=>{this.setState({addVisible:true});}}
        onGetList={(pageInfo)=>{
          this.onReqList();
        }}
        hasSearch={true}
        searchPlaceholder={`请输入${this.commonType.label}`}
        onSearch={(value)=>{
          this.searchWord = value;
          this.onReqList();
        }}
        onDelItems={this.onDelete}
        onItemConver={this.onItemConver}
        deleteIDS={this.props.deleteIDS}
        addVisible={this.state.addVisible}
        editVisible={this.state.editVisible}
        addNode={
          <CommonAddModal 
            title={`添加${this.commonType.label}`} 
            commonType={this.commonType} 
            visible={this.state.addVisible}
            onSubmitSuccess={this.onReqList}
            onAdd={this.onAdd}
            afterClose={()=>this.setState({addVisible:false})}/> 
        }
        editNode={
          <CommonEditModal 
            title={`编辑${this.commonType.label}`} 
            data={this.state.editData} 
            commonType={this.commonType} 
            visible={this.state.editVisible} 
            onSubmitSuccess={this.onReqList}
            onEdit={this.onEdit}
            afterClose={()=>this.setState({editVisible:false})}/> 
          }
      />
    );
  }

  currentList = () => {
    let listKey = this.commonType.listTag;
    let index = this.commonType.listTag.indexOf(':');
    if (index > -1) {
      listKey = this.commonType.listTag.substring(0, index);
    }
    for(let key in this.props.sales) {
      if (listKey === key) {
        return this.props.sales[key];
      }
    }
    return [];
  }

  onReqList = () => {
    let con = {
      type:this.commonType.key
    };
    if (this.searchWord) {
      con = {};
      con.name = {$regex:`/${this.searchWord}/i`}
    }
    this.props.reqGetSalesBaseList(this.commonType.listTag, this.commonType.graphqlType, con);
  }

  onReqUpdate = (id, data) => {
    if (data) {
      data.type = this.commonType.key;
    }
    if (data.type === constants.BASE_CONSTANTS.COMMON_DATA_TYPES.CUSTOM) {
      if (!data.n_material && !data.d_material) {
        message.error('至少选择一个定制内容!');
        return;
      }
    }
    this.props.reqUpdateSalesBase(this.commonType.tag, id, data);
  }
  
  onReqAdd = (data) => {
    if (data) {
      data.type = this.commonType.key;
    }
    if (data.type === constants.BASE_CONSTANTS.COMMON_DATA_TYPES.CUSTOM) {
      if (!data.n_material && !data.d_material) {
        message.error('至少选择一个定制内容!');
        return;
      }
    }
    this.props.reqAddSalesBase(this.commonType.tag, this.commonType.graphqlType, data);
  }

  onReqRemove = (ids) => {
    this.props.reqDeleteSalesBase(this.commonType.tag, ids);
  }

  onItemConver = (item, index) => {
    item.editor_time = moment(item.editor_time).format('YYYY-MM-DD HH:mm:ss');
    return item;
  }
  
  onDelete = (ids) => {
    this.onReqRemove(ids);
  }

  onAdd = (values) => {
    if (values.NID === undefined) {
      values.NID = '0';
    }
    this.onReqAdd(values);
  }

  onEdit = (values) => {
    values = utils.diffent(values, this.state.editData);
    if (values) {
      if (values.NID === undefined) {
        values.NID = '0';
      }
      this.onReqUpdate(this.state.editData._id, values);
    }
  }

  onRowClick = (record, index, event) => {
    this.setState({editVisible:true, editData:record});
  }
  canOperate = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.salesItemsBase)
    return this.power && this.power.canOperate;
  }
}

export default connect(
  state => ({
    sales:state.sales,
    loading:state.sales.loading,
    deleteIDS:state.sales.salesBaseDeleteIDS,
    user:state.app.loginInfo.user
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetSalesBaseList: Actions.getSalesBaseList,
      reqAddSalesBase: Actions.addSalesBase,
      reqDeleteSalesBase: Actions.deleteSalesBase,
      reqUpdateSalesBase: Actions.updateSalesBase,
      reqMaterialList: Actions.getMaterialList
    }, dispatch);
  }
)(CommonListContainer);
