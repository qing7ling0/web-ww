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
import CustomerAddModal from './CustomerAddModal'
import CustomerEditModal from './CustomerEditModal'
import { commonUtils } from '../../../modules/common';

class CustomerListContainer extends Component {
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
    this.props.reqGetCustomerList(this.props.pageInfo.page);
  }
  
  componentWillReceiveProps(nextProps){
  }

  render() {
    const columns = [
      { title: '姓名', dataIndex: 'name', key: 'name'},
      { title: '电话', dataIndex: 'phone', key: 'phone'},
      { title: '性别', dataIndex: 'sex', key: 'sex'},
      { title: '生日', dataIndex: 'birthday', key: 'birthday'},
      { title: '微信', dataIndex: 'weixin', key: 'weixin'},
      { title: '国家', dataIndex: 'country', key: 'country'},
      { title: '城市', dataIndex: 'city', key: 'city'},
      { title: '地址', dataIndex: 'address', key: 'address'},
      { title: '开卡门店', dataIndex: 'vip_card_shop_label', key: 'vip_card_shop_label'},
      { title: '开卡人员', dataIndex: 'vip_card_shop_guide_label', key: 'vip_card_shop_guide_label'},
      { title: 'vip等级', dataIndex: 'vip_level', key: 'vip_level'},
      { title: '申请方式', dataIndex: 'join_type_label', key: 'join_type_label'},
      { title: '操作', dataIndex: 'id', key: 'id', render:(text, record, index)=>{
        return (<Button type="primary" shape="circle" icon="delete" size="large" onClick={()=>this.onDelete([record._id])} />);
      }}
    ]

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
            this.props.reqGetCustomerList(pageInfo.page, pageInfo.pageSize, this.searchWord);
          } else {
            this.props.reqGetCustomerList(this.props.pageInfo.page, this.props.pageInfo.pageSize, this.searchWord);
          }
        }}
        hasSearch={true}
        searchPlaceholder={'请输入客户名称'}
        onSearch={(value)=>{
          this.searchWord = value;
          this.props.reqGetCustomerList(this.props.pageInfo.page, this.props.pageInfo.pageSize, value);
        }}
        onDelItems={this.props.reqDeleteCustomer}
        onItemConver={this.onItemConver}
        deleteIDS={this.props.customerDeleteIDS}
        addVisible={this.state.addVisible}
        editVisible={this.state.editVisible}
        addNode={<CustomerAddModal title={'添加客户'} pageInfo={this.props.pageInfo} visible={this.state.addVisible} afterClose={()=>this.setState({addVisible:false})}/> }
        editNode={<CustomerEditModal title={'客户编辑'} data={this.state.editData} pageInfo={this.props.pageInfo} visible={this.state.editVisible} afterClose={()=>this.setState({editVisible:false})}/> }
      />
    );
  }

  onItemConver = (item, index) => {
    let info = Object.assign({}, item);
    let typeInfo = common.commonUtils.getCustomerType(info.join_type);
    info.birthday = moment(info.birthday).format('YYYY-MM-DD');
    info.vip_card_date = moment(info.vip_card_date).format('YYYY-MM-DD HH:mm:ss');
    info.vip_card_shop_label = info.vip_card_shop ? info.vip_card_shop.name: '';
    info.vip_card_shop_guide_label = info.vip_card_shop_guide ? info.vip_card_shop_guide.name: '';
    info.join_type_label = typeInfo ? typeInfo.label : '';

    return info;
  }
  
  onDelete = (ids) => {
    this.props.reqDeleteCustomer(ids);
  }

  onRowClick = (record, index, event) => {
    // this.setState({editVisible:true, editData:record});
  }
}

export default connect(
  state => ({
    list:state.customer.customerList,
    loading:state.customer.loading,
    pageInfo:state.customer.customerListPage,
    customerDeleteIDS:state.customer.customerDeleteIDS
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetCustomerList: Actions.getCustomerList,
      reqDeleteCustomer: Actions.deleteCustomer,
    }, dispatch);
  }
)(CustomerListContainer);
