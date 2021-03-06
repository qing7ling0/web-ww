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
import MaintainAddModal from './MaintainAddModal'
import MaintainEditModal from './MaintainEditModal'
import { commonUtils } from '../../../modules/common';
import * as optionsType from '../types'
import utils from '../../../../utils/utils'

const CONTAINER_TITLE = '维修保养价目'

class MaintainListContainer extends Component {
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
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
  }
  
  componentWillReceiveProps(nextProps){
  }

  componentDidMount(){
    // this.onReqList();
    this.options = optionsType.getMaintainListOptions(this);
  }

  render() {
    return (
      <BaseListComponent
        columns={this.options} 
        dataSource={this.props.list} 
        loading={this.props.loading}
        onRowClick={this.onRowClick}
        onBtnAddClicked={()=>{this.setState({addVisible:true});}}
        onGetList={(pageInfo)=>{
          this.onReqList();
        }}
        hasSearch={true}
        searchPlaceholder={`请输入${CONTAINER_TITLE}`}
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
          <MaintainAddModal 
            title={`添加${CONTAINER_TITLE}`}
            visible={this.state.addVisible}
            onSubmitSuccess={this.onReqList}
            onAdd={this.onAdd}
            afterClose={()=>this.setState({addVisible:false})}/> 
        }
        editNode={
          <MaintainEditModal 
            title={`编辑${CONTAINER_TITLE}`}
            data={this.state.editData} 
            visible={this.state.editVisible} 
            onSubmitSuccess={this.onReqList}
            onEdit={this.onEdit}
            afterClose={()=>this.setState({editVisible:false})}/> 
          }
      />
    );
  }

  onReqList = () => {
    let con = null;
    if (this.searchWord) {
      con = {};
      con.name = {$regex:`/${this.searchWord}/i`}
    }
    this.props.reqGetMaintainList(con);
  }

  onReqUpdate = (id, data) => {
    this.props.reqUpdateMaintain(id, data);
  }
  
  onReqAdd = (data) => {
    this.props.reqAddMaintain(data);
  }

  onReqRemove = (ids) => {
    this.props.reqDeleteMaintain(ids);
  }

  onItemConver = (item, index) => {
    item.editor_time = moment(item.editor_time).format('YYYY-MM-DD HH:mm:ss');
    return item;
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
}

export default connect(
  state => ({
    sales:state.sales,
    loading:state.sales.loading,
    deleteIDS:state.sales.maintainPriceDeleteIDS,
    list:state.sales.maintainPriceList
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetMaintainList: Actions.getMaintainList,
      reqAddMaintain: Actions.addMaintain,
      reqDeleteMaintain: Actions.deleteMaintain,
      reqUpdateMaintain: Actions.updateMaintain,
    }, dispatch);
  }
)(MaintainListContainer);
