import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { withRouter, Link} from 'react-router-dom'

import styled from 'styled-components'
import { 
  Layout, 
  Row, 
  Col, 
  Avatar, 
  Button,
  Icon,
  Dropdown,
  Menu,
  Breadcrumb
 } from 'antd';
const {Item:BreadcrumbItem} = Breadcrumb;
const { Header, Content, Footer } = Layout;

import Actions from '../../actions'
import BaseComponent from '../../components/BaseComponent'
import { BaseH1, BaseH2, BaseLoading } from '../../components/BaseComponent.styled'

const Root = styled.div`
  margin-top: 2px;
  background-color: #fff;
  padding:0.16rem 0.32rem 0 0.32rem;
  border-bottom: 1px solid #e8e8e8;
`
const TitleContainer = styled.div`
  font-size: 0.20rem;
  font-weight: 600;
  padding: 0;
  margin: 0 0 0.16rem 0;
  color: #000;
`
const BreadcrumbContainer = styled(Breadcrumb)`
  font-size:0.14rem;
  margin: 0 0 0.16rem 0;
`
const BodyContainer = styled.div`
  margin: 0 0 0.16rem 0;
`

class ContentHeaderComponent extends BaseComponent {
  static defaultProps = {
    contentRender:null
  }

  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: true,
    }
  }

  componentWillMount(){
    if (this.props.willSelectNavKey && this.props.willSelectNavKey !== this.props.currentNavKey && this.props.reqSelectNav) {
      this.props.reqSelectNav(this.props.willSelectNavKey);
    }
  }

  componentDidMount() {
  }
  

  onRender() {
    let title = '首页';
    const { location } = this.props.history;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      if (!this.props.routers || !this.props.routers[url]) {
        title = this.props.title || '';
      } else {
        title = this.props.routers[url].name;
      }
      if (index < pathSnippets.length-1 && this.props.routers[url] && this.props.routers[url].url) {
        return (
          <BreadcrumbItem key={url}>
            <Link to={url} replace={true}>
              {title}
            </Link>
          </BreadcrumbItem>
        );
      } else {
        if (this.props.routers[url]) {
          return (
            <BreadcrumbItem key={url}>
              {title}
            </BreadcrumbItem>
          );
        } else {
          return null;
        }
      }
    });
    return (
      <Root>
        <BreadcrumbContainer>{breadcrumbItems}</BreadcrumbContainer>
        <TitleContainer>{title}</TitleContainer>
        {
          this.props.contentRender?
          <BodyContainer>{this.props.contentRender()}</BodyContainer>
          :null
        }
      </Root>
    );
  }
}

export default connect(
  state => ({
    routers: state.app.routers,
    currentNavKey:state.app.currentNavKey
  }),
  (dispatch) => {
    return bindActionCreators({
      reqSelectNav: Actions.selectNav
    }, dispatch);
  }
)(ContentHeaderComponent);
