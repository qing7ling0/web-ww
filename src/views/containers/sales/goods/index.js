import React, { Component } from 'react';

import {HashRouter, Route,Link, Switch} from 'react-router-dom'

import { Root } from './styled'

import * as constants from '../../../constants/Constants'
import ContentContainer from '../../common/ContentComponent'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import DataContentComponent from '../../common/DataContentComponent'

import GoodsListContainer from './GoodsListContainer'
import GoodsProfileContianer from './GoodsProfileContainer'

class GoodsContainer extends Component {
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
        <ContentHeaderComponent willSelectNavKey={constants.MENU_IDS.salesItems} history={this.props.history} />
        <ContentContainer>
          <Switch>
            <Route exact path={match.path} component={GoodsListContainer} />
            <Route path={`${match.path}/:id`} component={GoodsProfileContianer} />
          </Switch>
        </ContentContainer>
      </Root>
    );
  }
}

export default GoodsContainer;
