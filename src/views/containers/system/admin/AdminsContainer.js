import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import {
  Card,
  Icon,
  Layout,
  message,
  Table,
  Button,
  Modal
} from 'antd'

import {
  Root
} from './styled'

import Actions from '../../../actions'
import ContentContainer from '../../common/ContentComponent'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import DataContentComponent from '../../common/DataContentComponent'
import * as constants from '../../../constants/Constants'
import Navigation from '../../../modules/Navigation'
import AdminAddModal from './AdminAddModal'
import AdminEditModal from './AdminEditModal'


class AdminsContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      addVisible:false,
      page: 0,
      selectRows:[]
    }
    this.navigation = new Navigation(this.props.history);
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.props.reqGetAdminList(this.props.pageInfo.page);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.adminDeleteIDS !== this.props.adminDeleteIDS) {
      let page = this.props.pageInfo.page;
      if (nextProps.adminDeleteIDS.length >= this.props.list.length) {
        page = Math.max(1, page-1);
      }
      this.props.reqGetAdminList(page, this.props.pageInfo.pageSize);
    }
  }

  render() {
    const columns = [
      { title: '姓名', dataIndex: 'name', key: 'name'},
      { title: '账号', dataIndex: 'account', key: 'account'},
      { title: '编辑时间', dataIndex: 'editor_time', key: 'editor_time'},
      { title: '操作', dataIndex: 'id', key: 'id', render:(text, record, index)=>{
        return (<Button type="primary" shape="circle" icon="delete" size="large" onClick={()=>this.onDelete([record._id])} />);
      }}
    ]
    return (
      <Root>
        <ContentHeaderComponent willSelectNavKey={constants.MENU_IDS.systemAdmin} history={this.props.history} />
        <ContentContainer>
          <DataContentComponent listener={(e)=>{
            if (e === 'add') {
              // let path = `${this.props.history.location.pathname}/edit/0`;
              // this.navigation.push(path)
              this.setState({addVisible:true})
            } else if (e === 'delArray') {
              let ids = this.state.selectedRows.map((item) => {
                return item._id;
              })
              this.props.reqDeleteAdmin(ids);
            }
          }}>
            <Table 
              columns={columns} 
              dataSource={this.props.list} 
              loading={this.props.loading}
              rowKey={'_id'}
              onRowClick={this.onRowClick}
              rowSelection={{onChange:this.onRowSelectionChange}}
              pagination={{
                current:this.props.pageInfo.page,
                pageSize:constants.DEFAULT_PAGE_SIZE,
                onChange:this.onPageChange,
                showTotal:total => `Total:${total}`,
                total: this.props.pageInfo.total
              }}
            />
          </DataContentComponent>
        </ContentContainer>
        {
          this.state.addVisible ? 
          <AdminAddModal title={'账号添加'} pageInfo={this.props.pageInfo} visible={this.state.addVisible} afterClose={()=>this.setState({addVisible:false})}/> 
          : null
        }
        {
          this.state.editVisible ? 
          <AdminEditModal title={'账号编辑'} data={this.state.editData} pageInfo={this.props.pageInfo} visible={this.state.editVisible} afterClose={()=>this.setState({editVisible:false})}/> 
          : null
        }
      </Root>
    );
  }

  onRowSelectionChange = (selectedRowKeys, selectedRows) => {
    // console.log('selectedRowKeys' + JSON.stringify(selectedRowKeys) + '; selectedRows=' + JSON.stringify(selectedRows ))
    this.setState({selectedRows:selectedRows});
  }

  onRowClick = (record, index, event) => {
    // console.log('record' + JSON.stringify(record) + '; index=' + index + '; EVENT=' + event)
    this.setState({editVisible:true, editData:record});
  }

  onPageChange = (page, pageSize) => {
    this.props.reqGetAdminList(page, pageSize);
  }

  onDelete = (ids) => {
    this.props.reqDeleteAdmin(ids);
  }

}

const converList = (list) => {
  if (list) {
    return list.map((item, index) => {
      let info = Object.assign({}, item);
      info.account._accountId = info.account._id;
      delete info.account._id;
      info.account = null;
      return Object.assign({}, info, {...item.account});
    });
  } else {
    return [];
  }
}

export default connect(
  state => ({
    list:converList(state.system.adminList),
    loading:state.system.loading,
    pageInfo:state.system.adminListPage,
    adminDeleteIDS:state.system.adminDeleteIDS
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetAdminList: Actions.getAdminList,
      reqDeleteAdmin:Actions.deleteAdmin,
    }, dispatch);
  }
)(AdminsContainer);
