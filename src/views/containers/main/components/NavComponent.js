import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import styled from 'styled-components'
import { Layout, Row, Col, Menu, Icon } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;

import Actions from '../../../actions'
import BaseComponent from '../../../components/BaseComponent'
import { Root, MenuTitle, MenuSubTitle } from './NavComponent.styled'

class NavComponent extends BaseComponent {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: true,
      openKeys: ['sub1']
    }
    this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  }
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  componentWillMount(){
  }

  componentDidMount() {
  }

  onRender() {
    return (
      <Root>
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
        >
          <SubMenu key="sub1" title={<span><Icon type="mail" /><MenuTitle>Navigation One</MenuTitle></span>}>
            <Menu.Item key="1"><MenuSubTitle>Option 1</MenuSubTitle></Menu.Item>
            <Menu.Item key="2"><MenuSubTitle>Option 1</MenuSubTitle></Menu.Item>
            <Menu.Item key="3"><MenuSubTitle>Option 1</MenuSubTitle></Menu.Item>
            <Menu.Item key="4"><MenuSubTitle>Option 1</MenuSubTitle></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><MenuTitle>Navigation Two</MenuTitle></span>}>
            <Menu.Item key="5"><MenuSubTitle>Option 1</MenuSubTitle></Menu.Item>
            <Menu.Item key="6"><MenuSubTitle>Option 1</MenuSubTitle></Menu.Item>
            <SubMenu key="sub3" title={<MenuTitle>SubMenu</MenuTitle>}>
              <Menu.Item key="7"><MenuTitle>Navigation Two</MenuTitle></Menu.Item>
              <Menu.Item key="8"><MenuTitle>Navigation Two</MenuTitle></Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting" /><MenuTitle>Navigation Three</MenuTitle></span>}>
            <Menu.Item key="1"><MenuSubTitle>Option 1</MenuSubTitle></Menu.Item>
            <Menu.Item key="2"><MenuSubTitle>Option 1</MenuSubTitle></Menu.Item>
            <Menu.Item key="3"><MenuSubTitle>Option 1</MenuSubTitle></Menu.Item>
            <Menu.Item key="4"><MenuSubTitle>Option 1</MenuSubTitle></Menu.Item>
          </SubMenu>
        </Menu>
      </Root>
    );
  }
}

export default connect(
  state => ({
    app:state.app
  }),
  (dispatch) => {
    return bindActionCreators({
      reqLoad: Actions.Load,
      reqUserListGet: Actions.getUserList,
      reqUserAdd: Actions.addUser
    }, dispatch);
  }
)(NavComponent);
