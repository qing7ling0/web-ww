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
  Form, 
  Select, 
  InputNumber, 
  Switch,
  Radio,
  Slider, Upload,
  Modal,
  Row,Col
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
import * as optionsType from '../types'
import { ORDER_TYPES } from './types'

class OrderAddContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
      customerPhoneList:[],
      customerPhone:'',
      customerName:'',
      selectCustomer:{}
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.orderType = ORDER_TYPES[0];
    for(let value of ORDER_TYPES) {
      if (value.tag === this.props.match.params.type) {
        this.orderType = value;
      }
    }
    this.setState({visible:this.props.visible})
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.orderType !== this.props.nextProps)
      this.orderType = nextProps.orderType;
  }
  // <BaseFormModal
  //   title={this.props.title}
  //   options={this.options}
  //   visible={this.state.visible}
  //   loading={this.props.loading}
  //   result={this.props.result}
  //   onSubmit={this.onSubmit}
  //   onCancel={this.onCancel}
  //   onAfterClose={this.props.afterClose || null}
  //   confirmLoading={this.state.confirmLoading}
  //   actionType={ActionTypes.ORDER_ADD}
  //   onSubmitSuccess={this.props.onSubmitSuccess}
  // />

  renderBaseForm(item, index, vertical) {
    let span = {xs:24, sm:12, lg:8};
    if (vertical) {
      span={};
    }
    return (
      <Card key={index} title={item.title} bordered={false} noHovering={true} bodyStyle={{padding:0}}>
        <Row>
          {
            item.options.map((item, index) => {
              return <Col key={index} {...span}><FormItemComponent key={item.name} options={item} form={this.props.form} /></Col>
            })
          }
        </Row>
      </Card>
    )
  }
  renderFoot(item, index) {
    return (
      <Card key={index} title={item.title} bordered={false} noHovering={true}>
        <Row>
          {
            item.options.map((item, index) => {
              <Col key={index} xs={24} sm={12} lg={8}><FormItemComponent key={item.name} options={item} form={this.props.form} /></Col>
            })
          }
        </Row>
        <Row>
          <Col xs={{span:24}} md={{span:10, offset:1}} lg={{span:8, offset:2}}>{this.renderBaseForm(item.left, index+1000, true)}</Col>
          <Col xs={{span:24}} md={{span:10, offset:2}} lg={{span:8, offset:4}}>{this.renderBaseForm(item.right, index+1000, true)}</Col>
        </Row>
      </Card>
    )
  }

  render() {
    this.options = optionsType.getOrderAddOptions(this);
    return (
      <NormalForm onSubmit={this.onSubmit}>
        {
          this.options.map((item, index) => {
            return item.left ? this.renderFoot(item,index) : this.renderBaseForm(item, index);
          })
        }
        <FormItem
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </NormalForm>
    );
  }

  onCustomerPhoneFocus = (value) => {
    let con = null;
    if (this.state.customerPhone) {
      con = `{"phone":{"$regex":"/^${this.state.customerPhone}/i"}}`;
    }
    this.props.reqCustomerList(0, 10000, con);
  }
  onCustomerPhoneChange = (value) => {
    if (value !== this.state.customerPhone) {
      this.setState({ customerPhone:value });
      let con = null;
      if (value) {
        con = `{"phone":{"$regex":"/^${value}/i"}}`;
      }
      this.props.reqCustomerList(0, 10000, con);
    }
  }
  onCustomerPhoneSelect = (value, option) => {
    let _id = option.props.haId;
    if (_id) {
      this.selectCustomer(_id);
    }
  }
  
  onCustomerNameFocus = (value) => {
    let con = null;
    if (this.state.customerName) {
      con = `{"name":{"$regex":"/^${this.state.customerName}/i"}}`;
    }
    this.props.reqCustomerList(0, 10000, con);
  }
  onCustomerNameChange = (value) => {
    if (value !== this.state.customerName) {
      this.setState({ customerName:value });
      let con = null;
      if (value) {
        con = `{"name":{"$regex":"/^${value}/i"}}`;
      }
      this.props.reqCustomerList(0, 10000, con);
    }
  }
  onCustomerNameSelect = (value, option) => {
    let _id = option.props.haId;
    if (_id) {
      this.selectCustomer(_id);
    }
  }

  selectCustomer = (id) => {
    const {form:forms} = this.props;
    for(let value of this.props.customerList) {
      if (value._id === id) {
        forms.setFieldsValue({name:value.name});
        forms.setFieldsValue({phone:value.phone});
        forms.setFieldsValue({sex:value.sex});
        forms.setFieldsValue({birthday:new moment(value.birthday)});
        forms.setFieldsValue({weixin:value.weixin});
        
        if (value.leftFoot) {
          forms.setFieldsValue({foot_size:value.leftFoot.size});
          forms.setFieldsValue({l_length:value.leftFoot.length});
          forms.setFieldsValue({l_zhiWei:value.leftFoot.zhiWei});
          forms.setFieldsValue({l_fuWei:value.leftFoot.fuWei});
        }
        
        if (value.rightFoot) {
          forms.setFieldsValue({r_length:value.rightFoot.length});
          forms.setFieldsValue({r_zhiWei:value.rightFoot.zhiWei});
          forms.setFieldsValue({r_fuWei:value.rightFoot.fuWei});
        }
      }
    }
  }

  onSubmit = (err, values) => {
    if (!err) {
      if (this.props.onAdd) {
        let order = {
          type:values.type,
          source:values.source,
          shop:values.shop,
          guide:values.guide,
          pay:values.pay,
          pay_type:values.pay_type,
          transport_company:values.transport_company,
          transport_id:valuse.transport_id,
          transport_price:values.transport_price,
          remark:valuse.remark
        };

        let customer = {
          name:values.name,
          phone:values.phone,
          sex:values.sex,
          birthday:moment(values.birthday).format('YYYY-MM-DD'),
          weixin:values.weixin
        }

        let left_foot = {
          type:constants.BASE_CONSTANTS.LEFT_FOOT_ID,
          size:values.foot_size,
          length:values.l_length,
          zhiWei:values.l_zhiWei,
          fuWei:values.l_fuWei,
        }
        
        let right_foot = {
          type:constants.BASE_CONSTANTS.RIGHT_FOOT_ID,
          size:values.foot_size,
          length:values.r_length,
          zhiWei:values.r_zhiWei,
          fuWei:values.r_fuWei,
        }

        let doc = {
          order, customer, leftFoot, rightFoot
        }
        this.props.reqAddOrder(this.orderType.tag, this.orderType.value, doc);
      }
    }
  }
}

export default connect(
  state => ({
    loading:state.sales.loading,
    result:state.sales.result,
    shopList:state.shop.shopList,
    guideList:state.shop.shopGuideList,
    customerList:state.customer.customerList,
    goodsShoesList:state.sales.goodsShoesList
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetOrderList: Actions.getOrderList,
      reqAddOrder: Actions.addOrder,
      reqCustomerList:Actions.getCustomerList,
    }, dispatch);
  }
)(Form.create()(OrderAddContainer));
