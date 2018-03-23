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
import ColorPaletteAddModal from './ColorPaletteAddModal'
import ColorPaletteEditModal from './ColorPaletteEditModal'
import { commonUtils } from '../../../modules/common';
import * as optionsType from './types'
import utils from '../../../../utils/utils'
import * as graphqlTypes from '../../../modules/graphqlTypes'

const CONTAINER_TITLE = '搭配'
const MATERIAL_TAG = 'color-palette'

class ColorPaletteListContainer extends Component {
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
    this.options = optionsType.getColorPaletteListOptions(this);
    this.props.reqGetBaseList();
  }

  render() {
    return (
      <BaseListComponent
        canOperate={this.canOperate()}
        columns={this.options} 
        dataSource={this.props.list} 
        loading={this.props.loading}
        onRowClick={this.onRowClick}
        onBtnAddClicked={()=>{this.setState({addVisible:true});}}
        onGetList={(pageInfo)=>{
          this.onReqList();
        }}
        hasSearch={false}
        onDelItems={this.onDelete}
        onItemConver={this.onItemConver}
        deleteIDS={this.props.deleteIDS}
        addVisible={this.state.addVisible}
        editVisible={this.state.editVisible}
        addNode={
          <ColorPaletteAddModal 
            title={`添加${CONTAINER_TITLE}`}
            visible={this.state.addVisible}
            onSubmitSuccess={this.onReqList}
            onAdd={this.onAdd}
            afterClose={()=>this.setState({addVisible:false})}/> 
        }
        editNode={
          <ColorPaletteEditModal 
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
    this.props.reqGetColorPaletteList();
  }

  onReqUpdate = (id, data) => {
    this.props.reqUpdateColorPalette(id, data);
  }
  
  onReqAdd = (data) => {
    this.props.reqAddColorPalette(data);
  }

  onReqRemove = (ids) => {
    this.props.reqDeleteColorPalette(ids);
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
    // values = utils.diffent(values, this.state.editData);
    // 这里不去除相同值的字段
    if (values) {
      this.onReqUpdate(this.state.editData._id, values);
    }
  }

  onRowClick = (record, index, event) => {
    if (!this.canOperate()) return;
    this.setState({editVisible:true, editData:record});
  }

  canOperate = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.salesColorPalette)
    return this.power && this.power.canOperate;
  }
}

export default connect(
  state => ({
    sales:state.sales,
    loading:state.sales.loading,
    deleteIDS:state.sales.deleteIDS,
    list:state.sales.colorPaletteList,
    user:state.app.loginInfo.user
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetColorPaletteList: Actions.getColorPaletteList,
      reqAddColorPalette: Actions.addColorPalette,
      reqDeleteColorPalette: Actions.deleteColorPalette,
      reqUpdateColorPalette: Actions.updateColorPalette,
      reqGetBaseList:Actions.getGoodsBaseDatas,
    }, dispatch);
  }
)(ColorPaletteListContainer);
