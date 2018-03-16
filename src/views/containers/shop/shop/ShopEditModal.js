import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import {
  Card,
  Icon,
  Layout,
  message,
  Table,
  Button,
  Form, 
  Select, 
  InputNumber, 
  Switch,
  Radio,
  Slider, Upload,
  Modal
} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import {
  NormalForm
} from '../../common/common.styled'

import {
  Root,
} from './styled'

import * as ActionTypes from '../../../constants/ActionTypes'
import Actions from '../../../actions'
import * as validate from '../../../../base/utils/validate'
import * as constants from '../../../constants/Constants'
import * as common from '../../../modules/common'
import FormItemComponent from '../../common/FormItemComponent'
import BaseFormModal from '../../common/BaseFormModal'
import utils from '../../../../utils/utils'

class ShopEditModal extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.options = [
      {type:'input', name:'name', label:'门店名称', itemOptions:{hasFeedback:true}, rule:{required:true}},
      {type:'datePicker', name:'open_date', label:'开业时间', rule:{required:true}},
      {type:'datePicker', name:'rents_expire_date', label:'房租到期时间'},
      {type:'input', name:'rent', label:'租金', itemOptions:{hasFeedback:true}, rule:{required:true}},
      {type:'number', name:'area', label:'面积', options:{formatter:(value) => `${value}m²`, parser:value => value.replace('m²', '')}, itemOptions:{hasFeedback:true}, rule:{required:true}},
      {type:'select', name:'region_id', label:'区域', selectItems:common.listToSelectOptions(this.props.shopRegionList), options:{defaultActiveFirstOption:true}, rule:{required:true}},
      {type:'cascader', name:'regionInfo', label:'省份', options:{options:constants.CITYS, expandTrigger:"hover"}, rule:{required:true}, decoratorOptions:{initialValue:['中国', '华东', '上海市']}},
      {type:'select', name:'marketLevel', label:'市场级别', selectItems:constants.MARKET_LEVEL, options:{defaultActiveFirstOption:true}, rule:{required:true}},
      {type:'select', name:'property', label:'店铺性质', selectItems:constants.SHOP_PRO, options:{defaultActiveFirstOption:true}, rule:{required:true}},
      {type:'input', name:'phone', label:'电话', itemOptions:{hasFeedback:true}, rule:{required:true, validator:this.checkPhone}},
      {type:'input', name:'address', label:'地址', itemOptions:{hasFeedback:true}, rule:{required:true}},
      {type:'input', name:'zipcode', label:'邮编'},
      {type:'datePicker', name:'close_date', label:'关店时间'},
      {type:'textarea', name:'close_reason', label:'关店原因'}
    ];
    this.setState({visible:this.props.visible})
  }

  componentWillReceiveProps(nextProps){
  }

  render() {
    // let _options = this.options.map((item, index) => {
    //   if (!item.decoratorOptions) {
    //     item.decoratorOptions = {};
    //   }
    //   item.decoratorOptions.initialValue = this.props.data[item.name];
    //   return item;
    // });
    let _options = common.initFormDefaultValues(this.options, this.props.data)
    return (
      <BaseFormModal
        title={this.props.title}
        options={_options}
        visible={this.state.visible}
        loading={this.props.loading}
        result={this.props.result}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        onAfterClose={this.props.afterClose || null}
        confirmLoading={this.state.confirmLoading}
        actionType={ActionTypes.SHOP_UPDATE}
        onSubmitSuccess={()=>{
          this.props.reqGetShopList(this.props.pageInfo.page, this.props.pageInfo.pageSize);
        }}
      />
    );
  }


  onSubmit = (err, values) => {
    if (!err) {
      values = utils.diffent(values, this.props.data);
      if (values.open_date) {
        values.open_date = values.open_date.format('YYYY-MM-DD')
      }
      if (values.rents_expire_date) {
        values.rents_expire_date = values.rents_expire_date.format('YYYY-MM-DD')
      }
      if (values.close_date) {
        values.close_date = values.close_date.format('YYYY-MM-DD')
      }

      if(values.regionInfo) {
        values.country = values.regionInfo[0];
        values.region = values.regionInfo[1];
        values.province = values.regionInfo[2];
        delete values.regionInfo;
      }
      values._id = this.props.data._id;
      this.props.reqUpdateShop(values);
    }
  }

  checkPhone = (rule, value, callback) => {
    if (validate.isTel(value) || validate.isMobile(value)) {
      callback();
    } else {
      callback('格式不合法，手机或者电话号码');
    }
  }
}

export default connect(
  state => ({
    loading:state.shop.loading,
    result:state.shop.result,
    shopRegionList:state.sales.shopRegionList||[]
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetShopList: Actions.getShopList,
      reqUpdateShop: Actions.updateShop
    }, dispatch);
  }
)(Form.create()(ShopEditModal));
