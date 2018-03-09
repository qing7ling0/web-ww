import React, { Component } from 'react';

import {HashRouter, Route,Link, Switch} from 'react-router-dom'
import {Menu, Icon} from 'antd'
const SubMenu = Menu.SubMenu;

import { Root } from './styled'

import * as constants from '../../../constants/Constants'
import ContentContainer from '../../common/ContentComponent'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import DataContentComponent from '../../common/DataContentComponent'

import SampleAllotListContainer from './SampleAllotListContainer'
import SampleAllotProfileContianer from './SampleAllotProfileContainer'

import {GOODS_TYPES} from './types'

class SampleAllotContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: true,
    }
  }
  
  componentWillMount(){
  }

  render() {
    let { match } = this.props;
    return (
      <Root>
        <ContentHeaderComponent willSelectNavKey={constants.MENU_IDS.salesSampleAllot} history={this.props.history} />
        <ContentContainer>
          <Switch>
            <Route exact path={match.path} component={SampleAllotListContainer} />
            <Route path={`${match.path}/list/:type`} component={SampleAllotListContainer} />
          </Switch>
        </ContentContainer>
      </Root>
    );
  }

  onMenuClicked = ({item, key}) => {
    this.props.history.replace(this.props.match.path+'/list/' + key);
  }
}

export default SampleAllotContainer;
