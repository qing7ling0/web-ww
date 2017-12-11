import React, { Component } from 'react';

import {HashRouter, Route,Link, Switch, Redirect} from 'react-router-dom'
import {Menu, Icon} from 'antd'

import { Root } from './styled'

import * as constants from '../../../constants/Constants'
import ContentContainer from '../../common/ContentComponent'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import DataContentComponent from '../../common/DataContentComponent'

import OrderListContainer from './OrderListContainer'
import OrderProfileContainer from './OrderProfileContainer'
import OrderAddContainer from './OrderAddContainer'
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
    if(len > 3 && pathSnippets[len-3] === 'order') {
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
        <ContentHeaderComponent willSelectNavKey={constants.MENU_IDS.salesOrder} history={this.props.history} contentRender={this.renderHeaderContent} />
        <ContentContainer>
          <Switch>
            <Redirect exact from={match.path} to={match.path+'/list/'+ORDER_TYPES[0].tag} />
            <Route exact path={`${match.path}/list/:type`} component={OrderListContainer} />
            <Route path={`${match.path}/profile/:type/:id`} component={OrderProfileContainer} />
            <Route path={`${match.path}/add/:type`} component={OrderAddContainer} />
          </Switch>
        </ContentContainer>
      </Root>
    );
  }

  onMenuClicked = ({item, key}) => {
    this.props.history.replace(this.props.match.path+'/list/' + key);
  }
}

export default OrderContainer;
