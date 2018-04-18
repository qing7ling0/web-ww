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
import * as config from '../../../constants/Config'
import BaseListComponent from '../../common/BaseListComponent'
import DataContentComponent from '../../common/DataContentComponent'
import SearchInputComponent from '../../common/SearchInput'
import * as common from '../../../modules/common'
import * as constants from '../../../constants/Constants'
import { commonUtils } from '../../../modules/common';
import {TYPES} from './types'
import utils from '../../../../utils/utils'
import {VipFoot, SHOP_SALSE_STATISTICS_COLS, GOODS_STATISTICS_COLS} from '../report.js'

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

const ROOT_URL = common.findRouterById(config.Routers, constants.MENU_IDS.reportTableVip).url;

class VipFootListContainer extends Component {
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
    
    this.beganDate = moment(moment().subtract(1, 'M'), dateFormat);
    this.endDate = moment(moment(), dateFormat);
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
  }
  
  componentWillReceiveProps(nextProps){
  }

  componentDidUpdate(prevProps, prevState) {
  }
  componentDidMount(){
    // this.onReqList(this.props.pageInfo);
  }

  renderHeader = () => {
    return(
      <div>
        <SearchContainer>
          <SearchInput placeholder={'请输入姓名'} onSearch={this.onSearch} enterButton />
        </SearchContainer>
      </div>
    );
  }

  render() {
    this.options = this.itemType.listOptions(this);
    this.list = this.currentList();
    return (
      <BaseListComponent
        canOperate={this.canOperate()}
        columns={this.options} 
        dataSource={this.list} 
        loading={this.props.loading}
        pageInfo={this.props.pageInfo}
        onGetList={(pageInfo)=>{
          this.onReqList(pageInfo);
        }}
        headerRender={this.renderHeader}
      />
    );
  }

  onSearch = (value) => {
    this.searchWord = value;
    this.onReqList();
  }

  currentList = () => {
		return this.props.customerVipFooterList || [];
  }

  onReqList = (pageInfo) => {
    let con = {};
    if (this.searchWord) {
      con.name = {$regex:`/${this.searchWord}/i`};
    }

    return this.props.reqGetVipFootList(con, pageInfo);
  }

  onView = (item) => {
    this.props.history.push(ROOT_URL+'/order/' + item._id);
  }

  canOperate = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.reportTableVip)
    return this.power && this.power.canOperate;
  }
}

export default connect(
  state => ({
    loading:state.sales.loading,
    deleteIDS:state.sales.salesBaseDeleteIDS,
    user:state.app.loginInfo.user,
    customerVipFooterList:state.customer.customerVipFooterList,
    pageInfo:state.customer.customerVipFooterListPage,
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetOrderList: Actions.getOrderList,
      reqGetVipFootList: Actions.getVipFootList,
      reqShopList:Actions.getShopList,
      reqShopGuideProfile: Actions.shopGuideProfile
    }, dispatch);
  }
)(VipFootListContainer);
