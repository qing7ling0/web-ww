import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'
import styled from 'styled-components'

import {
  Card,
  Icon,
  Layout,
  message,
  Table,
	Button,
  DatePicker,
  Select,
  Input,
} from 'antd'

import {
  Root,
  Container,
  ProfileCol,
  ProfileColLabel,
  ProfileColValue,
} from './styled'

const {RangePicker} = DatePicker;
const Search = Input.Search;

import Actions from '../../../actions'
import * as config from '../../../constants/Config'
import BaseListComponent from '../../common/BaseListComponent'
import DataContentComponent from '../../common/DataContentComponent'
import SearchInputComponent from '../../common/SearchInput'
import * as common from '../../../modules/common'
import * as constants from '../../../constants/Constants'
import { commonUtils } from '../../../modules/common';
import {TYPES, OPTIONS} from './types'
import utils from '../../../../utils/utils'
import FormItemComponent from '../../common/FormItemComponent'

const dateFormat = 'YYYY-MM-DD';

const SearchContainer = styled.div`
  margin: 0.2rem 0 0 0;
`
const SearchInput = styled(SearchInputComponent)`
  width: 2rem;
  margin-right: 0.15rem;
`
const SelectInput = styled(Select)`
  width: 1.6rem;
  margin-right: 0.15rem;
`
const EDITOR_KEYS = ['s_yang_ban', 's_tie_xuan', 's_tie_fa', 's_mark', 's_feedback']

class VipFootOrderListContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      addVisible:false,
      editVisible:false,
      page: 0,
      editorDatas:[],
      isEditor:{},
    }

    this.searchWord = '';
    this.options = [];
    this.itemType = TYPES[1];
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
  }
  
  componentWillReceiveProps(nextProps){
    if (nextProps.updateIds !== this.props.updateIds) {
      this.onReqList(this.props.pageInfo);
    }
  }

  componentDidUpdate(prevProps, prevState) {
  }

  componentDidMount(){
    this.props.reqGetVipFootProfile(this.props.match.params.id)
  }

  renderHeader = () => {
    return (<Button type="primary" onClick={(e)=>{
      this.props.history.goBack();
    }}>返回</Button>)
  }

  renderItem = (record, key, value, isTextarea, isEdit) => {
    if (isEdit) {
      const target = this.state.editorDatas.find(item =>item._id === record._id);
      let _value = value;
      if (target) {
        _value = target[key];
      }
      if (isTextarea) {
        return <Input.TextArea style={{ margin: '-5px 0' }} rows={5} value={_value} onChange={e => this.onInputChange(record, key, e.target.value)} />
      } else {
        return <Input style={{ margin: '-5px 0' }} value={_value} onChange={e => this.onInputChange(record, key, e.target.value)} />
      }
    } else {
      return value;
    }
  }

  render() {
    this.options = this.itemType.listOptions(this);
    this.list = this.currentList();
    let cusList = [];
    if (this.props.profile) {
      cusList.push(this.props.profile)
    }
    return (
      <Root>
        <DataContentComponent
          canOperate={false}
          canDelete={false}
          hasSearch={false}
          headerRender={this.renderHeader}
          searchPlaceholder={''}>
          <Card title="脚型数据" style={{marginBottom:20}}>
            <Table 
              bordered={true}
              columns={OPTIONS.getVipListBaseOptions(this)} 
              dataSource={cusList} 
              rowKey={record=>record._id || record.key}
              pagination={false}
            />
          </Card>
          <Card title={this.itemType.label}>
            <BaseListComponent
              canOperate={this.canOperate()}
              columns={this.options} 
              dataSource={this.list} 
              loading={this.props.loading}
              pageInfo={this.props.pageInfo}
              onGetList={(pageInfo)=>{
                this.onReqList(pageInfo);
              }}
              showHeader={false}
            />
          </Card>
        </DataContentComponent>
      </Root>
    );
  }

  onInputChange = (record, key, value) => {
    const newData = [...this.state.editorDatas];
    
    const target = newData.find(item =>item._id === record._id);
    if (target) {
      target[key] = value;
      this.setState({ editorDatas: newData });
    }
  }

  onEdit = (record) => {
    const newData = [...this.state.editorDatas];
    
    let target = newData.find(item =>item._id === record._id); 
    if (target) {
    } else {
      target = {_id:record._id};
      newData.push(target);
    }
    for(let key of EDITOR_KEYS) {
      target[key] = record[key];
    }
    const isEditor = {...this.state.isEditor}
    isEditor[record._id] = true;

    this.setState({ editorDatas: newData, isEditor });
  }

  onSave = (record) => {
    const newData = [...this.state.editorDatas];
    
    let target = newData.find(item =>item._id === record._id); 
    if (target) {
      delete target._id;
      this.props.reqVipFootOrderUpdate(record._id, target);
    }

    const isEditor = {...this.state.isEditor}
    isEditor[record._id] = false;
    this.setState({isEditor})
  }

  onCancel = (record) => {
    const isEditor = {...this.state.isEditor}
    isEditor[record._id] = false;
    this.setState({isEditor})
  }

  onSearch = (value) => {
    this.searchWord = value;
    this.onReqList();
  }

  currentList = () => {
		return this.props.customerVipFooterOrderList || [];
  }

  onReqList = (pageInfo) => {
    if (!this.props.match.params.id) return;
    let con = {
      customer:this.props.match.params.id,
      type:{$in:[constants.BASE_CONSTANTS.E_ORDER_TYPE.SHOES, constants.BASE_CONSTANTS.E_ORDER_TYPE.DESIGN]}
    };

    return this.props.reqGetVipFootOrderList(con, pageInfo);
  }

  canOperate = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.reportTableVip)
    return this.power && this.power.canOperate;
  }
}

export default connect(
  state => ({
    loading:state.sales.loading,
    deleteIDS:state.sales.salesBaseDeleteIDS,
    user:state.app.loginInfo.user,
    profile: state.customer.customerVipFooterProfile,
    customerVipFooterOrderList:state.customer.customerVipFooterOrderList,
    pageInfo:state.customer.customerVipFooterOrderListPage,
    updateIds:state.customer.customerVipFooterOrderUpdateIDS
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetVipFootOrderList: Actions.getVipFootOrderList,
      reqGetVipFootProfile: Actions.getVipFootProfile,
      reqVipFootOrderUpdate: Actions.vipFooterOrderUpdate
    }, dispatch);
  }
)(VipFootOrderListContainer);
