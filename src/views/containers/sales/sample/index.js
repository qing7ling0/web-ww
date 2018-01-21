import React, { Component } from 'react';

import {HashRouter, Route,Link, Switch} from 'react-router-dom'
import {Menu, Icon} from 'antd'
const SubMenu = Menu.SubMenu;

import { Root } from './styled'

import * as constants from '../../../constants/Constants'
import ContentContainer from '../../common/ContentComponent'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import DataContentComponent from '../../common/DataContentComponent'

import SampleGoodsListContainer from './SampleGoodsListContainer'
import SampleGoodsProfileContianer from './SampleGoodsProfileContainer'

import {GOODS_TYPES} from './types'

class SampleGoodsContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: true,
      selectedKeys: [GOODS_TYPES[0].key]
    }
  }
  
  componentWillMount(){
    const { location } = this.props.history;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    let len = pathSnippets.length;
    if(len > 3 && pathSnippets[len-3] === 'items') {
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
        {GOODS_TYPES.map((item) => {
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
        <ContentHeaderComponent willSelectNavKey={constants.MENU_IDS.salesSampleGoods} history={this.props.history} contentRender={this.renderHeaderContent} />
        <ContentContainer>
          <Switch>
            <Route exact path={match.path} component={SampleGoodsListContainer} />
            <Route path={`${match.path}/list/:type`} component={SampleGoodsListContainer} />
            <Route path={`${match.path}/profile/:id`} component={SampleGoodsProfileContianer} />
          </Switch>
        </ContentContainer>
      </Root>
    );
  }

  onMenuClicked = ({item, key}) => {
    this.props.history.replace(this.props.match.path+'/list/' + key);
  }
}

export default SampleGoodsContainer;
