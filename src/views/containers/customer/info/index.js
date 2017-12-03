import React, { Component } from 'react';

import {HashRouter, Route,Link, Switch} from 'react-router-dom'

import { Root } from './styled'

import * as constants from '../../../constants/Constants'
import ContentContainer from '../../common/ContentComponent'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import DataContentComponent from '../../common/DataContentComponent'

import CustomerListContainer from './CustomerListContainer'
import CustomerProfileContianer from './CustomerProfileContainer'

class CustomerContainer extends Component {
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
        <ContentHeaderComponent willSelectNavKey={constants.MENU_IDS.customerInfo} history={this.props.history} />
        <ContentContainer>
          <Switch>
            <Route exact path={match.path} component={CustomerListContainer} />
            <Route path={`${match.path}/:id`} component={CustomerProfileContianer} />
          </Switch>
        </ContentContainer>
      </Root>
    );
  }
}

export default CustomerContainer;
