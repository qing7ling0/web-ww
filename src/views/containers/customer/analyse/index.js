import React, { Component } from 'react';
import {HashRouter, Route,Link, Switch} from 'react-router-dom'
import {Menu, Icon} from 'antd'
const SubMenu = Menu.SubMenu;

import { Root } from './styled'

import * as constants from '../../../constants/Constants'
import ContentContainer from '../../common/ContentComponent'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import DataContentComponent from '../../common/DataContentComponent'

import AnalyseListContainer from './AnalyseListContainer'

class AnalyseContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: true
    }
  }
  
  render() {
    let { match } = this.props;
    return (
      <Root>
        <ContentHeaderComponent willSelectNavKey={constants.MENU_IDS.customerAnalyse} history={this.props.history} />
        <ContentContainer>
          <Switch>
            <Route exact path={match.path} component={AnalyseListContainer} />
            <Route path={`${match.path}/:type`} component={AnalyseListContainer} />
          </Switch>
        </ContentContainer>
      </Root>
    );
  }
}

export default AnalyseContainer;
