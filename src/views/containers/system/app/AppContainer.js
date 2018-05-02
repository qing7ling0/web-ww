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
import AppAddModal from './AppAddModal'
import AppEditModal from './AppEditModal'

const TYPES = [
  {
    key:'app', label:'管理员账号',
    options:(target)=>[
      {type:'number', name:'version', label:'版本号', itemOptions:{hasFeedback:true}, rule:{required:true, validator:target.checkAccount}},
      {type:'select', name:'platform', label:'平台', selectItems:constants.BASE_CONSTANTS.PLATFORM_TYPE_DATAS, options:{defaultActiveFirstOption:true}, rule:{required:true}},
      {type:'switch', name:'forced', label:'是否强制更新', decoratorOptions:{valuePropName:"checked"}, rule:{required:true}},            
      {type:'input', name:'update_url', label:'更新地址', itemOptions:{hasFeedback:true}, rule:{required:true}},
      {type:'switch', name:'enable', label:'是否发布', decoratorOptions:{valuePropName:"checked"}, rule:{required:true}},     
    ]
  }
]

class AppContainer extends Component {
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
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.deleteIDS !== this.props.deleteIDS) {
      let page = this.props.pageInfo.page;
      if (nextProps.deleteIDS.length >= this.props.list.length) {
        page = Math.max(1, page-1);
      }
      this.onReqList({page, pageSize:this.props.pageInfo.pageSize});
      // this.props.reqGetAppList(page, this.props.pageInfo.pageSize);
    }
  }

  render() {
    const columns = [
      { title: '平台', dataIndex: 'platform', key: 'platform', render: (item) => {
        let info = commonUtils.getValueByList(constants.BASE_CONSTANTS.PLATFORM_TYPE_DATAS, item);
        return info ? info.label : '无';
      }},
      { title: '版本号', dataIndex: 'version', key: 'version',render:(item)=>{
        let versionArr = [];
        let ver = item;
        while(ver > 0) {
          let temp = (ver % 1000);
          versionArr.splice(0, 0, temp);
          ver = Math.floor(ver/1000);
        }
        return versionArr.join('.');
      }},
      { title: '是否强制更新', dataIndex: 'forced', key: 'forced', render: item=>item?"是":"否"},
      { title: '更新地址', dataIndex: 'update_url', key: 'update_url'},
      { title: '是否发布', dataIndex: 'enable', key: 'enable', render:item=>item?("已发布"):(<span style={{color:'red'}}>未发布</span>)},
      { title: '操作', dataIndex: 'id', key: 'id', render:(text, record, index)=>{
        return (<div>
            <Button type="primary" shape="circle" icon="edit" onClick={(e)=>{
              e.stopPropagation();
              this.onEdit(record)}
            } />
            <span> </span>
            <Button type="primary" shape="circle" icon="delete" onClick={(e)=>{
              e.stopPropagation();
              this.onDelete([record._id])}
            } />
          </div>);
      }}
    ]
    return (
      <Root>
        <ContentHeaderComponent willSelectNavKey={constants.MENU_IDS.appAdmin} history={this.props.history} />
        <ContentContainer>
          <DataContentComponent 
            canOperate={this.canOperate()}
            listener={(e)=>{
              if (e === 'add') {
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
          <AppAddModal title={'版本添加'} onReqList={this.onReqList} typeInfo={this.typeInfo} pageInfo={this.props.pageInfo} visible={this.state.addVisible} afterClose={()=>this.setState({addVisible:false})}/> 
          : null
        }
        {
          this.state.editVisible ? 
          <AppEditModal title={'版本编辑'} onReqList={this.onReqList} typeInfo={this.typeInfo} data={this.state.editData} pageInfo={this.props.pageInfo} visible={this.state.editVisible} afterClose={()=>this.setState({editVisible:false})}/> 
          : null
        }
      </Root>
    );
  }

  onReqList = (page) => {
    this.props.reqGetList(null, page||this.props.pageInfo);
  }

  onRowSelectionChange = (selectedRowKeys, selectedRows) => {
    // console.log('selectedRowKeys' + JSON.stringify(selectedRowKeys) + '; selectedRows=' + JSON.stringify(selectedRows ))
    this.setState({selectedRows:selectedRows});
  }

  onRowClick = (record, index, event) => {
    this.onEdit(record);
  }

  onEdit = (record) => {
    if (this.canOperate()){
      this.setState({editVisible:true, editData:record});
    }
  }

  onPageChange = (page, pageSize) => {
    this.onReqList({page, pageSize});
  }

  onDelete = (ids) => {
    if (this.canOperate())
      this.props.reqDelete(ids);
  }

  canOperate = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.appAdmin)
    return this.power && this.power.canOperate;
  }

}

export default connect(
  state => ({
    list:state.system.appVersionList,
    loading:state.system.loading,
    pageInfo:state.system.appVersionListPage,
    deleteIDS:state.system.appVersionRemove,
    user:state.app.loginInfo.user
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetList: Actions.getAppVersionList,
      reqDelete:Actions.appVersionDelete,
    }, dispatch);
  }
)(AppContainer);
