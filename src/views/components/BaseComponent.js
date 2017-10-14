import React, { Component } from 'react';
import { Spin, message } from 'antd';
import { BaseH1, BaseLoading, ErrorTitle } from './BaseComponent.styled'

import {H1} from './styled'

import Navigation from '../modules/Navigation'

class BaseComponent extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      success: true
    }
    this.navigation = new Navigation(this.props.history);
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
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

  onRenderLoading() {
    return (
    <BaseLoading>
      <Spin delay={200}/>
    </BaseLoading>);
  }

  onRenderFail() {
    return (<H1>请求超时！</H1>);
  }

  onRender() {

  }

  onRenderError(err) {
    return (<ErrorTitle>{err.toString()}</ErrorTitle>);
  }

  render() {
    if (this.state.loading) {
      return this.onRenderLoading();
    }

    if (this.state && !this.state.success) {
      return this.onRenderFail()
    } else {
      try {
        return this.onRender();
      } catch (e) {
        if (navigator.userAgent.indexOf("MSIE 8.0") == -1){
          console.log(e, this);
        }
        return this.onRenderError(e)
      }
    }
  }

}

export default BaseComponent
