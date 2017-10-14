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

const Root = styled(Header)`
  border-bottom: 1px solid #f00;
  background: #000
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
    background: rgba(255,255,255,0.3);
    outline: none;
    cursor:pointer
  }
  &:active  {
    color: #fff;
    border:none;
    background: rgba(255,255,255,0.43);
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
      background-color:#ffffff;
      filter:Alpha(opacity=50);
      position:static; /* IE6、7、8只能设置position:static(默认属性) ，否则会导致子元素继承Alpha值 */
      *zoom:1; /* 激活IE6、7的haslayout属性，让它读懂Alpha */
    }
  }
  line-height: 64px;
  height: auto;
`

const UserName = styled.span`
  border:none;
  height: 100%;
  font-size: 1rem;
  color: #fff;
  padding: 0 15px;
  &:hover, &:active, &:after, &:focus {
    color: #fff;
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
const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3d menu item</a>
    </Menu.Item>
  </Menu>
);

class HeaderContainer extends BaseComponent {
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

  componentDidMount() {
  }
  

  onRender() {
    return (
      <Root>
        <Row>
          <Col span={6}><BaseH1>欢迎使用Bola Family管理系统</BaseH1></Col>
          <Col span={12}></Col>
          <Col span={6}>
          {
            (this.props.loginInfo && this.props.loginInfo.user) ?
            <Dropdown overlay={menu}>
              <UserContainer>
                <UserAvatar size="small" icon="user" />
                <UserName ghost>
                  {this.props.loginInfo.user.nickname} <Icon type="down" />
                </UserName>
              </UserContainer>
            </Dropdown>
            : null
          }
          </Col>
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
      reqUserAdd: Actions.addUser
    }, dispatch);
  }
)(HeaderContainer);
