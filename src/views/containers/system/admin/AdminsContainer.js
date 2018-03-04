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
  Modal,
  Menu
} from 'antd'

import {
  Root
} from './styled'

import Actions from '../../../actions'
import ContentContainer from '../../common/ContentComponent'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import DataContentComponent from '../../common/DataContentComponent'
import * as constants from '../../../constants/Constants'
import { commonUtils } from '../../../modules/common';
import Navigation from '../../../modules/Navigation'
import AdminAddModal from './AdminAddModal'
import AdminEditModal from './AdminEditModal'

const TYPES = [
  {
    key:'admins', label:'管理员账号', type:constants.BASE_CONSTANTS.USER_TYPES.admin,
    options:(target)=>[
      {type:'input', name:'account', label:'账号', itemOptions:{hasFeedback:true}, rule:{required:true, validator:target.checkAccount}},
      {type:'input', name:'password', label:'密码', itemOptions:{hasFeedback:true}, rule:{required:true, validator:target.checkPassword}},
      {type:'input', name:'name', label:'姓名', itemOptions:{hasFeedback:true}, rule:{max:20}},
      {type:'input', name:'phone', label:'电话', itemOptions:{hasFeedback:true}, rule:{required:true, validator:target.checkPhone}}
    ]
  },
  {
    key:'operates', label:'运营账号', type:constants.BASE_CONSTANTS.USER_TYPES.operate,
    options:(target)=>[
      {type:'input', name:'account', label:'账号', itemOptions:{hasFeedback:true}, rule:{required:true, validator:target.checkAccount}},
      {type:'input', name:'password', label:'密码', itemOptions:{hasFeedback:true}, rule:{required:true, validator:target.checkPassword}},
      {type:'input', name:'name', label:'姓名', itemOptions:{hasFeedback:true}, rule:{required:true, max:20}},
      {type:'input', name:'phone', label:'电话', itemOptions:{hasFeedback:true}, rule:{required:true, validator:target.checkPhone}}
    ]
  },
]

class AdminsContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      addVisible:false,
      page: 0,
      selectedKeys: [TYPES[0].key]
    }
    this.navigation = new Navigation(this.props.history);
    this.typeInfo = TYPES[0];
  }

  componentDidMount(){
    this.onReqList(this.props.pageInfo.page);
    const { location } = this.props.history;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    let len = pathSnippets.length;
    if(len > 2 && pathSnippets[len-2] === 'admins') {
      this.state.selectedKeys = [pathSnippets[len-1]];
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.adminDeleteIDS !== this.props.adminDeleteIDS) {
      let page = this.props.pageInfo.page;
      if (nextProps.adminDeleteIDS.length >= this.props.list.length) {
        page = Math.max(1, page-1);
      }
      this.onReqList(page, this.props.pageInfo.pageSize);
      // this.props.reqGetAdminList(page, this.props.pageInfo.pageSize);
    }
    if(nextProps.match.params.type !== this.props.match.params.type) {
      for(let value of TYPES) {
        if (value.key === nextProps.match.params.type) {
          this.typeInfo = value;
        }
      }
      this.onReqList(1, this.props.pageInfo.pageSize);
    }
  }

  renderHeaderContent = () => {
    return (
      <Menu
        onClick={this.onMenuClicked}
        mode="horizontal"
        defaultSelectedKeys={this.state.selectedKeys}
      >
        {TYPES.map((item) => {
          return (
            <Menu.Item key={item.key}>{item.label}</Menu.Item>
          );
        })}
      </Menu>
    );
  }

  render() {
    const columns = [
      { title: '姓名', dataIndex: 'name', key: 'name'},
      { title: '账号', dataIndex: 'account', key: 'account'},
      { title: '操作', dataIndex: 'id', key: 'id', render:(text, record, index)=>{
        return (<Button type="primary" shape="circle" icon="delete" size="large" onClick={(e)=>{
          e.stopPropagation();
          this.onDelete([record._id])}
        } />);
      }}
    ]
    return (
      <Root>
        <ContentHeaderComponent willSelectNavKey={constants.MENU_IDS.systemAdmin} history={this.props.history} contentRender={this.renderHeaderContent} />
        <ContentContainer>
          <DataContentComponent 
            canOperate={this.canOperate()}
            listener={(e)=>{
              if (e === 'add') {
                // let path = `${this.props.history.location.pathname}/edit/0`;
                // this.navigation.push(path)
                this.setState({addVisible:true})
              } else if (e === 'delArray') {
                let ids = this.state.selectedRows.map((item) => {
                  return item._id;
                })
                this.onDelete(ids);
              }
            }}
          >
            <Table 
              columns={columns} 
              dataSource={this.props.list} 
              loading={this.props.loading}
              rowKey={'_id'}
              onRow={(record, index) => ({
                onClick: ()=>this.onRowClick(record, index),
              })}
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
          <AdminAddModal title={'账号添加'} typeInfo={this.typeInfo} pageInfo={this.props.pageInfo} visible={this.state.addVisible} afterClose={()=>this.setState({addVisible:false})}/> 
          : null
        }
        {
          this.state.editVisible ? 
          <AdminEditModal title={'账号编辑'} typeInfo={this.typeInfo} data={this.state.editData} pageInfo={this.props.pageInfo} visible={this.state.editVisible} afterClose={()=>this.setState({editVisible:false})}/> 
          : null
        }
      </Root>
    );
  }

  onReqList = (page, pageSize) => {
    this.props.reqGetUserList(this.typeInfo.type, page, pageSize);
  }

  onMenuClicked = ({item, key}) => {
    let index = this.props.match.path.lastIndexOf('/');
    let _path = this.props.match.path;
    if (index !== -1) {
      _path = _path.substring(0, index);
    }
    this.props.history.replace(_path+'/' + key);
  }

  onRowSelectionChange = (selectedRowKeys, selectedRows) => {
    // console.log('selectedRowKeys' + JSON.stringify(selectedRowKeys) + '; selectedRows=' + JSON.stringify(selectedRows ))
    this.setState({selectedRows:selectedRows});
  }

  onRowClick = (record, index, event) => {
    if (this.canOperate()){
      this.setState({editVisible:true, editData:record});
    }
  }

  onPageChange = (page, pageSize) => {
    this.onReqList(page, pageSize);
  }

  onDelete = (ids) => {
    if (this.canOperate())
      this.props.reqDeleteUser(this.typeInfo.type, ids);
  }

  canOperate = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.shopInfo)
    return this.power && this.power.canOperate;
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
    list:converList(state.system.userList),
    loading:state.system.loading,
    pageInfo:state.system.userListPage,
    adminDeleteIDS:state.system.userDeleteIDS,
    user:state.app.loginInfo.user
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetUserList: Actions.getUserList,
      reqDeleteUser:Actions.deleteUser,
    }, dispatch);
  }
)(AdminsContainer);
