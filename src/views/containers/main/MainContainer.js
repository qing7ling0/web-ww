import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import {HashRouter,Route,Link, Switch} from 'react-router-dom'
import { Layout, Row, Col, Avatar } from 'antd';
const { Header, Content, Sider, Footer } = Layout;

import Actions from '../../actions'
import Navigation from '../../modules/Navigation'
import BaseContainer from '../../components/BaseContainer'
import NavComponent from './components/NavComponent'
import FooterComponent from '../common/FooterComponent'
import HeaderComponent from '../common/HeaderComponent'
import {
  ContentContainer
} from './MainContainer.styled'

import mainRouters from './MainRouters'

class MainContainer extends BaseContainer {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: true
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.navigation = new Navigation(this.props.history);
    const {reqLogin, loginInfo} = this.props;
    if (!loginInfo.user) {
      reqLogin();
    }
  }

  // 在组件挂载之后调用一次。这个时候，子主键也都挂载好了，可以在这里使用refs
  componentDidMount() {
  }

  // props是父组件传递给子组件的。
  // 父组件发生render的时候子组件就会调用componentWillReceiveProps
  //（不管props有没有更新，也不管父子组件之间有没有数据交换）
  componentWillReceiveProps(nextProps){
    super.componentWillReceiveProps(nextProps);
    
    if (!nextProps.loginInfo.loading && !nextProps.loginInfo.user) {
      this.navigation.replace('/login');
    }

    if (!nextProps.navKey && nextProps.navKey !== this.props.navKey) {
      
    }
  }

  // 组件挂载之后，每次调用setState后都会
  // 调用shouldComponentUpdate判断是否需要重新渲染组件。
  // 默认返回true，需要重新render。
  // 在比较复杂的应用里，有一些数据的改变并不影响界面展示，
  // 可以在这里做判断，优化渲染效率
  shouldComponentUpdate(nextProps, nextState){
    return true;
  }

  // shouldComponentUpdate返回true或者调用forceUpdate之后，
  // componentWillUpdate会被调用
  componentWillUpdate(nextProps, nextState){
  }

  // 除了首次render之后调用componentDidMount，
  // 其它render结束之后都是调用componentDidUpdate。
  // componentWillMount、componentDidMount和componentWillUpdate、componentDidUpdate可以对应起来。
  // 区别在于，前者只有在挂载的时候会被调用；而后者在以后的每次更新渲染之后都会被调用。
  componentDidUpdate() {
  }

  // 组件被卸载的时候调用。一般在componentDidMount里面注册的事件需要在这里删除。
  componentWillUnmount() {
  }

  onRender() {

    return (
      <Layout>
        <Sider style={{overflowX: 'hidden', overflowY: 'auto', backgroundColor: '#181d20'}}><NavComponent history={this.props.history} /></Sider>
        <Layout>
          <HeaderComponent />
          <Content>
            <ContentContainer>
              <Switch>
                {mainRouters}
              </Switch>
            </ContentContainer>
          </Content>
          <FooterComponent/>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  state => ({
    app:state.app,
    loginInfo:state.app.loginInfo,
    navKey:state.app.navKey,
    results:state.app.results
  }),
  (dispatch) => {
    return bindActionCreators({
      reqLogin: Actions.login,
      reqUserListGet: Actions.getUserList,
      reqUserAdd: Actions.addUser
    }, dispatch);
  }
)(MainContainer);
