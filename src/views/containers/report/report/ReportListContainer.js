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
const SearchInput = styled(Search)`
  width: 1.6rem;
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
      // this.onReqList();
    }
  }

  componentDidMount(){
    for(let value of TYPES) {
      if (value.key === this.props.match.params.type) {
        this.itemType = value;
      }
    }
    this.props.reqShopList(0, 100);
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
          <span> </span>
          <SelectInput placeholder={'请选择店铺'} allowClear={true} onChange={this.onShopChange}>
            {
              this.props.shopList.map((item) => {
                return <Select.Option key={item._id}>{item.name}</Select.Option>;
              })
            }
          </SelectInput>
        </SearchContainer>
      </div>
    );
  }

  render() {
    this.options = this.itemType.listOptions(this);
    this.list = this.currentList();
    return (
      <BaseListComponent
        columns={this.options} 
        dataSource={this.list} 
        loading={this.props.loading}
        onRowClick={this.onRowClick}
        onGetList={(pageInfo)=>{
          this.onReqList();
        }}
        onDelItems={this.onDelete}
        onItemConver={this.onItemConver}
        headerRender={this.renderHeader}
      />
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

  currentList = () => {
		let listKey = this.itemType.listKey;
		let list = this.props.sales[listKey] || [];
    return this.itemType.getReport(this, list);
  }

  onReqList = () => {
    let con = {};
    if (this.shop) {
      con.shop = this.shop;
    }
    con.create_time = {$gt:this.beganDate, $lt:this.endDate};

    return this.itemType.getList(this, con);
  }

  onReqUpdate = (id, data) => {
    if (data) {
      data.type = this.itemType.key;
    }
    this.props.reqUpdateSalesBase(this.itemType.tag, id, data);
  }
  
  onReqAdd = (data) => {
    if (data) {
      data.type = this.itemType.key;
    }
    this.props.reqAddSalesBase(this.itemType.tag, this.itemType.graphqlType, data);
  }

  onReqRemove = (ids) => {
    this.props.reqDeleteSalesBase(this.itemType.tag, ids);
  }

  onItemConver = (item, index) => {
    item.editor_time = moment(item.editor_time).format('YYYY-MM-DD HH:mm:ss');
    return item;
  }
  
  onDelete = (ids) => {
    this.onReqRemove(ids);
  }

  onAdd = (values) => {
    if (values.NID === undefined) {
      values.NID = '0';
    }
    this.onReqAdd(values);
  }

  onEdit = (values) => {
    values = utils.diffent(values, this.state.editData);
    if (values) {
      if (values.NID === undefined) {
        values.NID = '0';
      }
      this.onReqUpdate(this.state.editData._id, values);
    }
  }

  onRowClick = (record, index, event) => {
    if (!this.canOperate()) return;
    this.setState({editVisible:true, editData:record});
  }
  canOperate = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.activityVIP)
    return this.power && this.power.canOperate;
  }
}

export default connect(
  state => ({
    sales:state.sales,
    loading:state.sales.loading,
    deleteIDS:state.sales.goodsBaseDeleteIDS,
    user:state.app.loginInfo.user,
    shopList:state.shop.shopList,
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetOrderList: Actions.getOrderList,
      reqGetSubOrderList: Actions.getSubOrderList,
      reqShopList:Actions.getShopList,
    }, dispatch);
  }
)(ReportListContainer);
