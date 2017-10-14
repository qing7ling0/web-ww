import React, { Component } from 'react';
import {HashRouter,Route,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout, Row, Col, Avatar } from 'antd';
const { Header, Content, Sider, Footer } = Layout;

import HeaderComponent from './common/HeaderComponent'

import login from './login/LoginContainer'
import main from './main/MainContainer'

const App = () => (
  <HashRouter>
    <Layout style={{height: '100%'}}>
      <HeaderComponent />
      <Layout>
        <Route exact path="/" component={login}/>
        <Route path="/login" component={login}/>
        <Route path="/main" component={main}/>
      </Layout>
    </Layout>
  </HashRouter>
)

export default connect()(App)