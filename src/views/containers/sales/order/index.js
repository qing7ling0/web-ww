import React, { Component } from 'react';

import {HashRouter, Route,Link, Switch, Redirect} from 'react-router-dom'
import {Menu, Icon} from 'antd'

import { Root } from './styled'

import * as constants from '../../../constants/Constants'
import ContentContainer from '../../common/ContentComponent'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import DataContentComponent from '../../common/DataContentComponent'

import OrderListContainer from './OrderListContainer'
import OrderProfileContianer from './OrderProfileContainer'
import {ORDER_TYPES} from './types'

class OrderContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [ORDER_TYPES[0].tag]
    }
  }
  componentWillMount(){
    const { location } = this.props.history;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    let len = pathSnippets.length;
    if(len > 2 && pathSnippets[len-2] === 'order' && pathSnippets[len-1].indexOf('List') !== -1) {
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
        {ORDER_TYPES.map((item) => {
          return (
            <Menu.Item key={item.tag}>{item.label}</Menu.Item>
          );
        })}
      </Menu>
    );
  }

  render() {
    let { match } = this.props;
    return (
      <Root>
        <ContentHeaderComponent willSelectNavKey={constants.MENU_IDS.salesOrder} history={this.props.history} contentRender={this.renderHeaderContent} />
        <ContentContainer>
          <Switch>
            <Route exact path={match.path} component={OrderListContainer} />
            <Redirect from={match.path} to={match.path+'/'+ORDER_TYPES[0].tag} />
            <Route exact path={`${match.path}/:type`} component={OrderListContainer} />
            <Route path={`${match.path}/:type/:id`} component={OrderProfileContianer} />
          </Switch>
        </ContentContainer>
      </Root>
    );
  }
}

export default OrderContainer;
