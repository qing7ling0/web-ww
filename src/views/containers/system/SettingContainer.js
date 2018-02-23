import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

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
} from './SettingContainer.styled'

import Actions from '../../actions'
import ContentContainer from '../common/ContentComponent'
import ContentHeaderComponent from '../common/ContentHeaderComponent'
import DataContentComponent from '../common/DataContentComponent'
import * as constants from '../../constants/Constants'


const columns = [
  { title: '账号', dataIndex: 'account', key: 'account'},
  { title: '姓名', dataIndex: 'name', key: 'name'},
  { title: '操作', dataIndex: 'id', key: 'id', render:(text, record, index)=>{
    return (<a href='javascript:void(0);'>删除</a>);
  }}
]
const data = [{
  key: '1',
  account: '32',
  name: 'John Brown',
  editor_time: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  account: '42',
  editor_time: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park',
}, {
  key: '5',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park',
}, {
  key: '6',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park',
}, {
  key: '7',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park',
}, {
  key: '8',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park',
}, {
  key: '9',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park',
}, {
  key: '10',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park',
}, {
  key: '11',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park',
}, {
  key: '12',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park',
}, {
  key: '13',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park',
}, {
  key: '14',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park',
}, {
  key: '15',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park',
}, {
  key: '16',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park',
}, {
  key: '17',
  name: 'Joe Black',
  account: '32',
  editor_time: 'Sidney No. 1 Lake Park',
}];

class SettingContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
  }

  render() {
    return (
      <Root>
        <ContentHeaderComponent willSelectNavKey={constants.MENU_IDS.systemSetting} history={this.props.history} />
        <ContentContainer>
          <DataContentComponent >
            <Table columns={columns} dataSource={data}/>
          </DataContentComponent>
        </ContentContainer>
      </Root>
    );
  }
}

export default connect(
  state => ({
    loginInfo:state.app.loginInfo,
    results:state.app.results,
    currentNavKey: state.app.currentNavKey
  }),
  (dispatch) => {
    return bindActionCreators({
      reqSelectNav: Actions.selectNav
    }, dispatch);
  }
)(SettingContainer);
