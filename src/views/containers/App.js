import React, { Component } from 'react';
import {HashRouter,Route,Link,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout, Row, Col, Avatar } from 'antd';
const { Header, Content, Sider, Footer } = Layout;
import styled from 'styled-components'

import HeaderComponent from './common/HeaderComponent'

import login from './login/LoginContainer'
import main from './main/MainContainer'

const Root = styled(HashRouter)`
  font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
`

const App = () => (
  <Root>
    <Layout style={{height: '100%', background:'#e6e8ea'}}>
      <Layout>
        <Switch>
          <Route exact path="/" component={login}/>
          <Route path="/login" component={login}/>
          <Route path="/home" component={main}/>
        </Switch>
      </Layout>
    </Layout>
  </Root>
)

export default connect()(App)