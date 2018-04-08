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
import SampleGoodsAddModal from './SampleGoodsAddModal'
import SampleGoodsEditModal from './SampleGoodsEditModal'
import { commonUtils } from '../../../modules/common';
import { GOODS_TYPES } from './types'

const ROOT_URL = common.findRouterById(config.Routers, constants.MENU_IDS.salesSampleGoods).url;
const ADD_URL = ROOT_URL + '/add';
const URL_PROFILE = ROOT_URL + '/profile';
const URL_REG = new RegExp(ROOT_URL + '/list/' +'\\d/') ;

class SampleGoodsListContainer extends Component {
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
    this.sampleGoodsType = GOODS_TYPES[0];
  }

  componentWillMount(){
    for(let value of GOODS_TYPES) {
      if (value.key === this.props.match.params.type) {
        this.sampleGoodsType = value;
      }
    }
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.type !== this.props.match.params.type) {
      for(let value of GOODS_TYPES) {
        if (value.key === nextProps.match.params.type) {
          this.sampleGoodsType = value;
        }
      }
      this.onReqList();
    }
  }

  componentDidMount() {
    this.props.reqShopList(1, 100);
    this.props.reqGetGoodsBaseDatas();
  }

  render() {
    this.options = this.sampleGoodsType.listOptions(this);

    return (
      <BaseListComponent
        canOperate={this.canOperate()}
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
        searchPlaceholder={`请输入货号`}
        onSearch={(value)=>{
          this.searchWord = value;
          this.onReqList(this.props.pageInfo);
        }}
        onDelItems={this.onDelete}
        onItemConver={this.onItemConver}
        deleteIDS={this.props.deleteIDS}
        addVisible={this.state.addVisible}
        editVisible={this.state.editVisible}
        addNode={
          <SampleGoodsEditModal 
            title={`添加${this.sampleGoodsType.label}`} 
            pageInfo={this.props.pageInfo} 
            visible={this.state.addVisible} 
            sampleGoodsType={this.sampleGoodsType} 
            onAdd={this.onAdd}
            onSubmitSuccess={this.onReqList}
            afterClose={()=>this.setState({addVisible:false})}/> 
        }
        editNode={
          <SampleGoodsEditModal 
            title={`编辑${this.sampleGoodsType.label}`} 
            data={this.state.editData} 
            pageInfo={this.props.pageInfo} 
            visible={this.state.editVisible} 
            sampleGoodsType={this.sampleGoodsType} 
            onEdit={this.onEdit}
            onSubmitSuccess={this.onReqList}
            afterClose={()=>this.setState({editVisible:false})}/> 
        }
      />
    );
  }
  currentList = () => {
    let listKey = this.sampleGoodsType.listTag;
    let index = this.sampleGoodsType.listTag.indexOf(':');
    if (index > -1) {
      listKey = this.sampleGoodsType.listTag.substring(0, index);
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
      type:this.sampleGoodsType.key,
      $or:[{left_count:{$gt:0}}, {right_count:{$gt:0}}]
    };
    if (this.searchWord) {
      con = {};
      con.NID = {$regex:`/${this.searchWord}/i`};
    }
    this.props.reqGetSampleGoodsList(this.sampleGoodsType.listTag, con, pageInfo);
  }
  onReqUpdate = (id, data) => {
    if (data) {
      data.type = this.sampleGoodsType.key;
    }
    this.props.reqUpdateSampleGoods(this.sampleGoodsType.tag, id, data);
  }
  onReqAdd = (data) => {
    if (data) {
      data.type = this.sampleGoodsType.key;
    }
    this.props.reqAddSampleGoods(this.sampleGoodsType.tag, data);
  }
  onReqRemove = (ids) => {
    this.props.reqDeleteSampleGoods(this.sampleGoodsType.tag, ids);
  }
  onReqProfile = (id) => {
    this.props.reqGetSampleGoodsProfile(this.sampleGoodsType.tag, id);
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

  canOperate = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.salesItems)
    return this.power && this.power.canOperate;
  }
}

export default connect(
  state => ({
    sales:state.sales,
    loading:state.sales.loading,
    pageInfo:state.sales.sampleGoodsListPage,
    deleteIDS:state.sales.sampleGoodsDeleteIDS,
    user:state.app.loginInfo.user
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetSampleGoodsList: Actions.getSampleGoodsList,
      reqAddSampleGoods: Actions.addSampleGoods,
      reqDeleteSampleGoods: Actions.deleteSampleGoods,
      reqUpdateSampleGoods: Actions.updateSampleGoods,
      reqGetSampleGoodsProfile: Actions.getSampleGoodsProfile,
      reqGetGoodsBaseDatas: Actions.getGoodsBaseDatas
    }, dispatch);
  }
)(SampleGoodsListContainer);
