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
import utils from '../../../../utils/utils';
import BaseUtils from '../../../../base/utils/utils';

class CustomerEditModal extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    let vipList = this.props.vipLevelList || [];
    vipList = vipList.sort((a,b)=>a.level>b.level?1:-1);
    this.options = [
      {type:'input', name:'name', label:'姓名', itemOptions:{hasFeedback:true}, rule:{required:true}},
      {type:'select', name:'sex', label:'性别', selectItems:constants.SEX_DATA, options:{defaultActiveFirstOption:true}, rule:{required:true}},
      {type:'datePicker', name:'birthday', label:'生日'},
      {type:'input', name:'phone', label:'电话', itemOptions:{hasFeedback:true}, rule:{required:true, validator:this.checkPhone}},
      {type:'input', name:'weixin', label:'微信号', itemOptions:{hasFeedback:true}},
      {type:'input', name:'country', label:'国家', itemOptions:{hasFeedback:true}},
      {type:'input', name:'city', label:'城市', itemOptions:{hasFeedback:true}},
      {type:'input', name:'address', label:'地址', itemOptions:{hasFeedback:true}},
      {type:'input', name:'zipcode', label:'邮编', itemOptions:{hasFeedback:true}},
      {type:'datePicker', name:'vip_card_date', label:'开卡日期'},{
        type:'select', name:'vip_card_shop', label:'开卡门店', selectItems:common.listToSelectOptions(this.props.shopList), 
        options:{
          showSearch:true,
          optionFilterProp:"children",
          filterOption:(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
          defaultActiveFirstOption:true
        }, rule:{required:true}
      },
      {
        type:'select', name:'vip_card_guide', label:'开卡导购', selectItems:common.listToSelectOptions(this.props.guideList), 
        options:{
          showSearch:true,
          optionFilterProp:"children",
          filterOption:(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
          defaultActiveFirstOption:true
        }, rule:{required:true}
      },
      {type:'number', name:'point', label:'积分', itemOptions:{hasFeedback:true}},
      {
        type:'select', name:'vip_level', label:'Vip等级', 
        selectItems:common.listToSelectOptions(vipList,item=>item.level,item=>item.level), 
        options:{
          showSearch:true,
          optionFilterProp:"children",
          filterOption:(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
          defaultActiveFirstOption:true
        }
      },
      {
        type:'select', name:'tags', label:'客户标签', 
        selectItems:common.listToSelectOptions(this.props.customerTagList), 
        options:{
          defaultActiveFirstOption:true,
          mode:"tags",
          tokenSeparators:[',']
        }
      },
    ];
    this.setState({visible:this.props.visible})
  }

  componentDidMount() {
    this.props.reqShopList(0, 1000);
    this.props.reqShopGuideList(0, 1000);
  }

  componentWillReceiveProps(nextProps){
  }

  render() {
    let _options = common.initFormDefaultValues(this.options, this.props.data, (value)=>{
      if (BaseUtils.IsArray(value)) 
      {
        return value.map(item=>item.tag);
      }
      if (value._id) {
        return value._id;
      }
      return value;
    });
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
        actionType={ActionTypes.CUSTOMER_UPDATE}
        onSubmitSuccess={()=>{
          this.props.reqGetCustomerList(this.props.pageInfo.page, this.props.pageInfo.pageSize);
        }}
      />
    );
  }

  onSubmit = (err, values) => {
    if (!err) {
      // values = utils.diffent(values, this.props.data);
      if (values.birthday) {
        values.birthday = values.birthday.format('YYYY-MM-DD')
      } else {
        values.birthday = "";
      }
      if (values.vip_card_date) {
        values.vip_card_date = values.vip_card_date.format('YYYY-MM-DD')
      } else {
        values.vip_card_date = "";
      }
      values._id = this.props.data._id;
      if (values.tags) {
        values.tags = values.tags.map(tag=>{return {tag:tag}})
      }
      if (!values.vip_level) values.vip_level = 0;
      if (!values.point) values.point = 0;
      if (this.props.vipLevelList) {
        for(let lv of this.props.vipLevelList) {
          if (lv.level === values.vip_level) {
            values.vip_exp = lv.exp;
            break;
          }
        }
      }
      this.props.reqUpdateCustomer(values);
    }
  }

  checkPhone = (rule, value, callback) => {
    if (validate.isTel(value) || validate.isMobile(value)) {
      callback();
    } else {
      callback('手机或者电话号码格式不合法');
    }
  }
}

export default connect(
  state => ({
    loading:state.customer.loading,
    shopList:state.shop.shopList,
    guideList:state.shop.shopGuideList,
    result:state.customer.result,
    vipLevelList:state.sales.vipLevelList,
    customerTagList:state.sales.customerTagList||[]
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetCustomerList: Actions.getCustomerList,
      reqShopList:Actions.getShopList,
      reqShopGuideList:Actions.getShopGuideList,
      reqUpdateCustomer: Actions.updateCustomer
    }, dispatch);
  }
)(Form.create()(CustomerEditModal));
