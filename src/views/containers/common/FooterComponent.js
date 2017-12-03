import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import styled from 'styled-components'
import { Layout, Row, Col, Avatar } from 'antd';
const { Header, Content, Footer } = Layout;

import Actions from '../../actions'
import BaseComponent from '../../components/BaseComponent'

class FooterContainer extends BaseComponent {
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
      <Footer style={{ textAlign: 'center', backgournd:'#e6e8ea' }}>
        <span>
          © 2016-2017 Bola Family.cn. All rights reserved.
        </span>
      </Footer>
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
)(FooterContainer);
