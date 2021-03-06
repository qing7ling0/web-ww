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
} from 'antd'

import {
  Root,
  LoginInput,
  Container,
  LoginCard,
  BtnLogin
} from './styled'

const {RangePicker} = DatePicker;
const Search = Input.Search;

import Actions from '../../../actions'
import BaseListComponent from '../../common/BaseListComponent'
import DataContentComponent from '../../common/DataContentComponent'
import SearchInputComponent from '../../common/SearchInput'
import * as common from '../../../modules/common'
import * as constants from '../../../constants/Constants'
import { commonUtils } from '../../../modules/common';
import {TYPES} from './types'
import utils from '../../../../utils/utils'
import {Report, SHOP_SALSE_STATISTICS_COLS, GOODS_STATISTICS_COLS} from '../report.js'

const dateFormat = 'YYYY-MM-DD';

const SearchContainer = styled.div`
  margin: 0.2rem 0 0 0;
`
const SearchInput = styled(SearchInputComponent)`
  width: 2rem;
  margin-right: 0.15rem;
`
const SelectInput = styled(Select)`
  width: 1.6rem;
  margin-right: 0.15rem;
`

class ReportListContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      addVisible:false,
      editVisible:false,
      page: 0,
      selectRows:[]
    }

    this.searchWord = '';
    this.options = [];
		this.itemType = TYPES[0];
    this.report = new Report();
    
    this.beganDate = moment(moment().subtract(1, 'M'), dateFormat);
    this.endDate = moment(moment(), dateFormat);
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.type !== this.props.match.params.type) {
      for(let value of TYPES) {
        if (value.key === nextProps.match.params.type) {
          this.itemType = value;
        }
      }
      this.onReqList();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.searchGuide !== this.props.searchGuide) {
      this.onReqList();
    }
  }
  componentDidMount(){
    for(let value of TYPES) {
      if (value.key === this.props.match.params.type) {
        this.itemType = value;
      }
    }
    this.props.reqShopList(0, 100);
    this.onReqList();
  }

  renderHeader = () => {
    return(
      <div>
        <SearchContainer>
					<RangePicker
						defaultValue={[this.beganDate, this.endDate]}
						onChange={this.onDateChange}
						format={dateFormat}
					/>
          <span></span>
          <SelectInput placeholder={'请选择店铺'} allowClear={true} onChange={this.onShopChange}>
            {
              this.props.shopList.map((item) => {
                return <Select.Option key={item._id}>{item.name}</Select.Option>;
              })
            }
          </SelectInput>
          <span></span>
          <SearchInput placeholder={'请输入手机号'} onSearch={this.onPhoneSearch} enterButton />
        </SearchContainer>
      </div>
    );
  }

  render() {
    this.options = this.itemType.listOptions(this);
    this.list = this.currentList();
    let pagination = {
      pageSize:constants.DEFAULT_PAGE_SIZE,
      showTotal:total => `Total:${total}`,
      total: this.list.length
    }
    return (
      <Root>
        <DataContentComponent
          headerRender={this.renderHeader}
          canOperate={false}
          canDelete={false}
          hasSearch={false}
          searchPlaceholder={''}>
          <Table 
            bordered={true}
            columns={this.options} 
            dataSource={this.list} 
            loading={this.props.loading}
            rowKey={record=>record._id || record.key}
            pagination={pagination}
          />
        </DataContentComponent>
      </Root>
    );
  }

  onDateChange = (datas) => {
    if (datas && datas.length > 1) {
      this.beganDate = datas[0];
      this.endDate = datas[1];

      this.onReqList();
    }
  }

  onShopChange = (value) => {
    this.shop = value;
    this.onReqList();
  }

  onPhoneSearch = (value) => {
    this.props.reqShopGuideProfile({phone:value});
  }

  currentList = () => {
		let listKey = this.itemType.listKey;
		let list = this.props.sales[listKey] || [];
    let time = new Date().getTime();
    let ret = this.itemType.getReport(this, list);
    console.log('ReportListContainer currentList time=' + (new Date().getTime()-time));
    return ret;
  }

  onReqList = () => {
    let con = {};
    if (this.shop) {
      con.shop = this.shop;
    }
    if (this.props.searchGuide) {
      con.guide = this.props.searchGuide._id;
    }
    con.create_time = {$gt:this.beganDate, $lt:this.endDate};

    return this.itemType.getList(this, con);
  }
}

export default connect(
  state => ({
    sales:state.sales,
    loading:state.sales.loading,
    deleteIDS:state.sales.salesBaseDeleteIDS,
    user:state.app.loginInfo.user,
    shopList:state.shop.shopList,
    orderList:state.sales.orderList,
    subOrderList:state.sales.subOrderList,
    shoesOrderList:state.sales.shoesOrderList,
    searchGuide: state.shop.shopGuideProfile
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetOrderList: Actions.getOrderList,
      reqGetSubOrderList: Actions.getSubOrderList,
      reqShopList:Actions.getShopList,
      reqShopGuideProfile: Actions.shopGuideProfile
    }, dispatch);
  }
)(ReportListContainer);
