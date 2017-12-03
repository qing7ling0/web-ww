import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import {
  Card,
  Icon,
  Layout,
  message
} from 'antd'

import {
  Root,
  LoginInput,
  Container,
  LoginCard,
  BtnLogin
} from './LoginContainer.styled'

import Actions from '../../actions'
import Navigation from '../../modules/Navigation'
import BaseContainer from '../../components/BaseContainer'
import FooterComponent from '../common/FooterComponent'
import * as constants from '../../constants/Constants'

class LoginContainer extends BaseContainer {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: true,
      account: '',
      password: '',
      accountError: false,
      passwordError: false,
    }

    this.onAccountChange = this._onAccountChange.bind(this);
    this.onPasswordChange = this._onPasswordChange.bind(this);
    this.onEmitEmptyAccount = this._onEmitEmptyAccount.bind(this);
    this.onEmitEmptyPassowrd = this._onEmitEmptyPassowrd.bind(this);
    this.onLoginBtnClicked = this._onLoginBtnClicked.bind(this);
    this.getInputSuffix = this._getInputSuffix.bind(this);
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.navigation = new Navigation(this.props.history);
    // const {Load} = this.props;
    // Load();
  }

  // 在组件挂载之后调用一次。这个时候，子主键也都挂载好了，可以在这里使用refs
  componentDidMount() {
  }

  // props是父组件传递给子组件的。
  // 父组件发生render的时候子组件就会调用componentWillReceiveProps
  //（不管props有没有更新，也不管父子组件之间有没有数据交换）
  componentWillReceiveProps(nextProps){
    super.componentWillReceiveProps(nextProps);
    if (nextProps.loginInfo.code === 0) {
      this.navigation.push("/home");
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
    const accountSuffix = this.getInputSuffix(this.state.account, this.state.accountError, this.onEmitEmptyAccount);
    const passwordSuffix = this.getInputSuffix(this.state.password, this.state.passwordError, this.onEmitEmptyPassowrd);
    return (
      <Layout>
        <Layout.Content style={{position: 'relative'}}>
          <Root>
            <Container>
              <LoginCard title="Bola Family 登录系统">
                <LoginInput 
                  innerRef={r=>this.refAccountInput=r} 
                  placeholder="账号" 
                  suffix={accountSuffix} 
                  prefix={<Icon type="user" />} 
                  size="large" 
                  value={this.state.account}
                  onChange={this.onAccountChange} />
                <LoginInput 
                  innerRef={r=>this.refPasswordInput=r} 
                  placeholder="密码" 
                  suffix={passwordSuffix} 
                  prefix={<Icon type="lock" />} 
                  size="large"
                  value={this.state.password}
                  onChange={this.onPasswordChange} />
                <BtnLogin type="primary" size="large" onClick={this.onLoginBtnClicked}> <Icon type="lock" />登录 </BtnLogin>
              </LoginCard>
            </Container>
          </Root>
        </Layout.Content>
        <FooterComponent />
      </Layout>
    );
  }

  _getInputSuffix(close, tip, cb) {
    return (<span>
      {tip ? <Icon type="exclamation-circle-o" style={{color:'red', marginRight:'5px'}} />:null}
      {close ? <Icon type="close-circle" onClick={cb} /> : null}
    </span>)
  }

  _onEmitEmptyAccount() {
    if (this.refAccountInput) {
      this.refAccountInput.focus();
    }
    this.setState({account: ''});
  }

  _onEmitEmptyPassowrd() {
    if (this.refPasswordInput) {
      this.refPasswordInput.focus();
    }
    this.setState({password: ''});
  }
  
  _onAccountChange(e) {
    this.setState({account: e.target.value});
  }
  
  _onPasswordChange(e) {
    this.setState({password: e.target.value});
  }

  _onLoginBtnClicked() {
    let account = this.state.account.trim();
    let password = this.state.password.trim();

    let focusAccount = false;
    let focusPassword = false;

    if (!account) {
      message.error("账号密码不能为空!");
      focusAccount = true;
    } else if (account.length < constants.ACCOUNT_MIN_LENGTH || account.length > constants.ACCOUNT_MAX_LENGTH) {
      message.error(`账号密码长度在${constants.ACCOUNT_MIN_LENGTH}-${constants.ACCOUNT_MAX_LENGTH}!`);
      focusAccount = true;
    } else if(!account) {
      // todo 验证字符串格式是否合法
      message.error("账号密码只能是数字、字母");
      focusAccount = true;
    } 
    
    if (!password) {
      if (!focusAccount) message.error("账号密码不能为空!");
      focusPassword = true;
    } else if (password.length < constants.ACCOUNT_MIN_LENGTH || password.length > constants.ACCOUNT_MAX_LENGTH) {
      if (!focusAccount) message.error(`账号密码长度在${constants.ACCOUNT_MIN_LENGTH}-${constants.ACCOUNT_MAX_LENGTH}!`);
      focusPassword = true;
    }  else if(!password) {
      // todo 验证字符串格式是否合法
      if (!focusAccount) message.error("账号密码只能是数字、字母");
      focusPassword = true;
    }
    
    if (focusAccount || focusPassword) {
      if (focusAccount) {
        if(this.refAccountInput) {
          this.refAccountInput.focus();
        }
      }
          
      if (focusPassword) {
        if(this.refPasswordInput) {
          this.refPasswordInput.focus();
        }
      }
      this.setState({accountError:focusAccount, passwordError:focusPassword});
    } else {
      this.props.reqLogin(account, password);
      this.setState({accountError:false, passwordError:false});
    }
  }
}

export default connect(
  state => ({
    loginInfo:state.app.loginInfo,
    results:state.app.results
  }),
  (dispatch) => {
    return bindActionCreators({
      reqLoad: Actions.Load,
      reqLogin: Actions.login,
    }, dispatch);
  }
)(LoginContainer);
