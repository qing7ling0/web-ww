import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { withRouter, Link} from 'react-router-dom'

import styled from 'styled-components'
import { Layout, Row, Col, Menu, Icon } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;


import Actions from '../../../actions'
import BaseComponent from '../../../components/BaseComponent'
import { 
  Root, 
  MenuTitle, 
  MenuSubTitle, 
  SubMenuContainer, 
  MenuContainer,
  HeaderContainer
} from './NavComponent.styled'
import * as constants from '../../../../constants/constants'

import utils from '../../../../base/utils/utils'

class NavComponent extends BaseComponent {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: true,
      openKeys: [],
      selectedKeys: []
    }
    this.renderSubMenus = this._renderSubMenus.bind(this);
    this.navReset = this._navReset.bind(this);
    this.onOpenChange = this._onOpenChange.bind(this);
  }

  componentWillMount(){
    this.navReset(this.props.currentNavKey);
  }

  componentDidMount() {
  }
  
  componentWillUpdate(nextProps, nextState){
    if (nextProps.currentNavKey !== this.props.currentNavKey) {
      this.navReset(nextProps.currentNavKey);
    }
  }

  onRender() {
    let items = this.renderSubMenus(this.props.menus, true);
    return (
      <Root>
        <HeaderContainer>
          Bola Family
        </HeaderContainer>
        <MenuContainer
          mode="inline"
          theme="dark"
          inlineCollapsed="false"
          openKeys={this.state.openKeys}
          selectedKeys={this.state.selectedKeys}
          onOpenChange={this.onOpenChange}
          onClick={(item)=>{
            // this.props.reqSelectNav(item.key);
            this.props.history.replace(this.props.routersIDMap[item.key].url);
          }}
        >
          {items}
        </MenuContainer>
      </Root>
    );
  }

  _onOpenChange(openKeys) {
    // const latestOpenKey = utils.StringToInt(openKeys.find(key => this.state.openKeys.indexOf(key) === -1), 0);

    // if (latestOpenKey > 0 && latestOpenKey < 100) {
    //   this.setState({openKeys:[latestOpenKey]})
    // } else if (latestOpenKey > 100) {
    //   this.setState({openKeys:openKeys});
    // } else {
    //   this.setState({openKeys:[]})
    // }
    this.setState({openKeys:openKeys})
  }

  _navReset(key) {
    let numKey = utils.StringToInt(key, 0);
    let arrNav = [];
    while(numKey > 0) {
      arrNav.push(numKey);
      numKey = Math.floor(numKey / 100);
    }
    let _selectedKeys = [];
    let _openKeys = this.state.openKeys;
    for(let i=0; i<arrNav.length; i++) {
      if (i === 0) {
        _selectedKeys.push(arrNav[i]+'');
      } else {
        let key = arrNav[i] + '';
        if (_openKeys.indexOf(key) === -1){
          _openKeys.push(arrNav[i]+'');
        }
      }
    }

    this.setState({openKeys:_openKeys, selectedKeys:_selectedKeys});
  }

  _renderSubMenus(subMenus, sub) {
    if (!subMenus) return null;

    return subMenus.map((item, index) => {
      let view = null;
      if (sub) {
        if (item.subMenus) {
          let subViews = this.renderSubMenus(item.subMenus, false);
          view = (<SubMenuContainer key={item.id} title={<span><Icon type={item.icon} /><MenuTitle>{item.name}</MenuTitle></span>}>{subViews}</SubMenuContainer>);
        } else {
          view = (<Menu.Item key={item.id}><span><Icon type={item.icon} /><MenuTitle>{item.name}</MenuTitle></span></Menu.Item>);
        }
      } else {
        if (item.subMenus) {
          let subViews = this.renderSubMenus(item.subMenus, false);
          view = (<SubMenu key={item.id} title={<MenuSubTitle>{item.name}</MenuSubTitle>}>{subViews}</SubMenu>);
        } else {
          view = (<Menu.Item key={item.id}><span><Icon type="right" /><MenuSubTitle>{item.name}</MenuSubTitle></span></Menu.Item>);
        }
      }
      return view;
    });
  }
}

export default connect(
  state => ({
    menus:state.app.menus,
    currentNavKey: state.app.currentNavKey,
    routersIDMap: state.app.routersIDMap
  }),
  (dispatch) => {
    return bindActionCreators({
      reqLoad: Actions.Load,
      reqUserListGet: Actions.getUserList,
      reqUserAdd: Actions.addUser,
      reqSelectNav: Actions.selectNav,
    }, dispatch);
  }
)(NavComponent);
