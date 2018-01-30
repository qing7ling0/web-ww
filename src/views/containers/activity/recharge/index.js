import React, { Component } from 'react';
import {HashRouter, Route,Link, Switch} from 'react-router-dom'
import {Menu, Icon} from 'antd'
const SubMenu = Menu.SubMenu;

import { Root } from './styled'

import * as constants from '../../../constants/Constants'
import ContentContainer from '../../common/ContentComponent'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import DataContentComponent from '../../common/DataContentComponent'

import RechargeListContainer from './RechargeListContainer'

class RechargeContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: true
    }
  }
  
  componentWillMount(){
  }

  render() {
    let { match } = this.props;
    return (
      <Root>
        <ContentHeaderComponent willSelectNavKey={constants.MENU_IDS.activityRecharge} history={this.props.history} />
        <ContentContainer>
          <Switch>
            <Route exact path={match.path} component={RechargeListContainer} />
          </Switch>
        </ContentContainer>
      </Root>
    );
  }
}

export default RechargeContainer;
