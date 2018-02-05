import React, { Component } from 'react';
import {HashRouter, Route,Link, Switch} from 'react-router-dom'
import {Menu, Icon} from 'antd'
const SubMenu = Menu.SubMenu;

import { Root } from './styled'

import * as constants from '../../../constants/Constants'
import ContentContainer from '../../common/ContentComponent'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import DataContentComponent from '../../common/DataContentComponent'

import ReportListContainer from './ReportListContainer'
import {TYPES} from './types'

class ReportContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: true,
      selectedKeys: [TYPES[0].key]
    }
  }
  
  componentWillMount(){
    const { location } = this.props.history;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    let len = pathSnippets.length;
    if(len > 3 && pathSnippets[len-3] === 'table') {
      this.state.selectedKeys = [pathSnippets[len-1]];
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
    let { match } = this.props;
    return (
      <Root>
        <ContentHeaderComponent willSelectNavKey={constants.MENU_IDS.reportTable} history={this.props.history} contentRender={this.renderHeaderContent} />
        <ContentContainer>
          <Switch>
            <Route exact path={match.path} component={ReportListContainer} />
            <Route path={`${match.path}/:type`} component={ReportListContainer} />
          </Switch>
        </ContentContainer>
      </Root>
    );
  }
}

export default ReportContainer;
