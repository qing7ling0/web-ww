import React, { Component } from 'react';
import {HashRouter, Route,Link, Switch} from 'react-router-dom'
import {Menu, Icon} from 'antd'
const SubMenu = Menu.SubMenu;

import { Root } from './styled'

import * as constants from '../../../constants/Constants'
import ContentContainer from '../../common/ContentComponent'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import DataContentComponent from '../../common/DataContentComponent'

import CommonListContainer from './CommonListContainer'
import {COMMON_TYPES} from './types'

class CommonContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: true,
      selectedKeys: [COMMON_TYPES[0].key]
    }
  }
  
  componentWillMount(){
    const { location } = this.props.history;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    let len = pathSnippets.length;
    if(len > 2 && pathSnippets[len-2] === 'base') {
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
        {COMMON_TYPES.map((item) => {
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
        <ContentHeaderComponent willSelectNavKey={constants.MENU_IDS.salesItemsBase} history={this.props.history} contentRender={this.renderHeaderContent} />
        <ContentContainer>
          <Switch>
            <Route exact path={match.path} component={CommonListContainer} />
            <Route path={`${match.path}/:type`} component={CommonListContainer} />
          </Switch>
        </ContentContainer>
      </Root>
    );
  }

  onMenuClicked = ({item, key}) => {
    this.props.history.replace(this.props.match.path+'/' + key);
  }
}

export default CommonContainer;
