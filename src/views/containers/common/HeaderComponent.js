import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import styled from 'styled-components'
import { 
  Layout, 
  Row, 
  Col, 
  Avatar, 
  Button,
  Icon,
  Dropdown,
  Menu
 } from 'antd';
const { Header, Content, Footer } = Layout;

import Actions from '../../actions'
import BaseComponent from '../../components/BaseComponent'
import { BaseH1, BaseH2, BaseLoading } from '../../components/BaseComponent.styled'

const HEAD_HEIGHT = '0.64rem';

const Root = styled(Header)`
  background: #fff;
  padding: 0 0.32rem;
  box-shadow:0 1px 4px rgba(0, 21, 41, 0.08);
  line-height: 0;
`
const HeadCol = styled(Col)`
  height: ${HEAD_HEIGHT};
  line-height: 0;
`
const UserContainer = styled.button`
  float: right;
  position: relative;
  padding-left: 28px;
  background: transparent;
  border:none;
  border-radius: 0;
  &:hover {
    color: #fff;
    border:none;
    background: rgba(16,142,233,0.3);
    outline: none;
    cursor:pointer
  }
  &:active  {
    color: #fff;
    border:none;
    background: rgba(16,142,233,0.43);
    outline: none;
  }
  &:focus  {
    color: #fff;
    border:none;
    outline: none;
  }
  &:after {
    color: #fff;
    border:none;
    background: transparent;
    outline: none;
  }
  @media \0screen\,screen\9 {/* 只支持IE6、7、8 */
    &:hover{
      background-color:#108ee9;
      filter:Alpha(opacity=50);
      position:static; /* IE6、7、8只能设置position:static(默认属性) ，否则会导致子元素继承Alpha值 */
      *zoom:1; /* 激活IE6、7的haslayout属性，让它读懂Alpha */
    }
  }
  line-height: ${HEAD_HEIGHT};
  height: ${HEAD_HEIGHT};
`

const UserName = styled.div`
  float:right;
  border:none;
  height: ${HEAD_HEIGHT};
  font-size: 0.1rem;
  color: #4c4f53;
  padding: 0 15px;
  &:hover, &:active, &:after, &:focus {
    color: #4c4f53;
    border:none;
    background: transparent;
  }
  @media \0screen\,screen\9 {/* 只支持IE6、7、8 */
    position: relative;/* 设置子元素为相对定位，可让子元素不继承Alpha值 */
  }
`
const UserAvatar = styled(Avatar)`
  background: #f56a00;
  position: absolute;
  top:50%;
  left: 4px;
  margin-top:-12px;
  @media \0screen\,screen\9 {/* 只支持IE6、7、8 */
    position: relative;/* 设置子元素为相对定位，可让子元素不继承Alpha值 */
  }
`
const USER_MENUS = [
  {key:'profile', title:'个人信息'},
  {key:'logout', title:'退出'}
];

class HeaderContainer extends BaseComponent {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: true
    }

    this.userMenus = (
      <Menu onClick={(item)=>{
        switch(item.key) {
          case 'profile':
          break;
          case 'logout':
            this.props.reqLogout();
          break;
        }
      }}>
        {
          USER_MENUS.map((item)=>{
            return (<Menu.Item key={item.key}>{item.title}</Menu.Item>)
          })
        }
      </Menu>
    )
  }

  componentWillMount(){
  }

  componentDidMount() {
  }
  
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  onRender() {
    return (
      <Root>
        <Row>
          <HeadCol span={6} style={{height:64}}>
            {/* <Button type="primary" onClick={this.toggleCollapsed}>
              <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
            </Button> */}
          </HeadCol>
          <HeadCol span={12}></HeadCol>
          <HeadCol span={6} style={{height:64}}>
          {
            (this.props.loginInfo && this.props.loginInfo.user) ?
            <Dropdown overlay={this.userMenus}>
              <UserContainer>
                <UserAvatar size="default" icon="user" />
                <UserName ghost>
                  {this.props.loginInfo.user.name} <Icon type="down" />
                </UserName>
              </UserContainer>
            </Dropdown>
            : null
          }
          </HeadCol>
        </Row>
      </Root>
    );
  }
}

export default connect(
  state => ({
    loginInfo:state.app.loginInfo
  }),
  (dispatch) => {
    return bindActionCreators({
      reqLoad: Actions.Load,
      reqUserListGet: Actions.getUserList,
      reqUserAdd: Actions.addUser,
      reqLogout: Actions.logout
    }, dispatch);
  }
)(HeaderContainer);
