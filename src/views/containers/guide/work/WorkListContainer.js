import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'
import styled from 'styled-components'

import {
  Card,
  Icon,
  Layout,
  message,
  Table,
	Button,
  DatePicker,
  Select,
  Input,
  Calendar,
  Col,
  Row,
  Divider
} from 'antd'

import {
  Root,
  Container,
} from '../styled'

const {RangePicker} = DatePicker;
const Search = Input.Search;

import Actions from '../../../actions'
import BaseListComponent from '../../common/BaseListComponent'
import * as common from '../../../modules/common'
import * as constants from '../../../constants/Constants'
import { commonUtils } from '../../../modules/common';
import {TYPES} from './types'
import utils from '../../../../utils/utils'

const dateFormat = 'YYYY-MM-DD';

const SearchContainer = styled.div`
  margin: 0.2rem 0 0 0;
`
const SearchInput = styled(Search)`
  width: 1.6rem;
  margin-right: 0.15rem;
`
const SelectInput = styled(Select)`
  width: 1.6rem;
  margin-right: 0.15rem;
`

class WorkListContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);
    this.state = {
      value: moment(),
      selectedValue: moment(),
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
  }
  
  componentWillReceiveProps(nextProps){
  }

  componentDidMount(){
  }

  render() {
    // this.options = this.itemType.listOptions(this);
    // this.list = this.currentList();
    const { value, selectedValue } = this.state;
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    }, {
      title: 'Age',
      dataIndex: 'age',
      width: 150,
    }, {
      title: 'Address',
      dataIndex: 'address',
    }];
    
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
    return (
      <Root>
        <Row style={{height:731}}>
          <Col span={12}>
            <Card title="日历" bordered={true}>
              <Calendar 
                value={value} 
                onSelect={this.onSelect} 
                onPanelChange={this.onPanelChange}
                mode={'month'}
                validRange={[moment(1, 'DD').subtract(1, 'month'), moment(1,'DD').add(1, 'month')]}
              />
            </Card>
          </Col>
          {/* <Col span={1}>
          </Col> */}
          <Col span={12} style={{paddingLeft:20}}>
            <Card title="排班" bordered={true}>
              <Table columns={columns} dataSource={data} pagination={false} scroll={{ y: 747 }} />
            </Card>
          </Col>
        </Row>
      </Root>
    );
  }

  onSelect = (value) => {
    this.setState({
      value,
      selectedValue: value,
    });
  }
  onPanelChange = (value) => {
    this.setState({ value });
  }

  onReqList = () => {
    // let con = {};
    // if (this.shop) {
    //   con.shop = this.shop;
    // }
    // con.create_time = {$gt:this.beganDate, $lt:this.endDate};

    // return this.itemType.getList(this, con);
  }
}

export default connect(
  state => ({
    sales:state.sales,
    loading:state.sales.loading,
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetOrderList: Actions.getOrderList,
    }, dispatch);
  }
)(WorkListContainer);
