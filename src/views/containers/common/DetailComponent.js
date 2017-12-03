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
  Menu, 
  Card
 } from 'antd';

import Actions from '../../actions'
import BaseComponent from '../../components/BaseComponent'
import { Label } from '../../components/styled';

const LabelRight = styled.span`
  font-size: 0.14rem;
  color: #000;
`
const LabelLeft = styled.span`
  font-size: 0.14rem;
  color: #000;
  font-weight: 500;
`

class DetailComponent extends Component {

  static defaultProps = {
    loading: false,
    source:{},
  }

  constructor(props) {
    super(props);

    this.state = {}
  }

  componentWillMount(){
  }
  
  componentWillReceiveProps(nextProps){
  }

  componentDidMount() {
  }

  render() {
    let _content = null;
    if (this.props.source.mode === 'grid' || !this.props.source.mode) {
      _content = this.renderGrid(this.props.source.data);
    }
    return (
      <Card title={this.props.source.title} loading={this.props.loading} {...this.props.source.options}>
        {_content}
      </Card>
    );
  }

  renderGrid = (datas) => {
    return(
      <Row>
        {datas.map((item, index) => {
          let rightLabel = null;
          if (item.render) {
            rightLabel = item.render(item);
          } else {
            rightLabel = item.format ? item.format(item.value) : item.value;
          }
          return (
            <Col key={'key'+index} xs={24} sm={12} md={8} xl={6} >
              <LabelLeft>{item.label}:</LabelLeft>
              <LabelRight>{rightLabel}</LabelRight>
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default DetailComponent;
