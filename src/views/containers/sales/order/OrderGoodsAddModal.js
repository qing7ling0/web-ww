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
  NormalForm,
  ContentTitle
} from '../../common/common.styled'

import {
  Root,
} from './styled'

import * as graphqlTypes from '../../../modules/graphqlTypes'
import * as orderTypes from '../../../modules/orderTypes'
import * as ActionTypes from '../../../constants/ActionTypes'
import Actions from '../../../actions'
import * as validate from '../../../../base/utils/validate'
import * as constants from '../../../constants/Constants'
import * as common from '../../../modules/common'
import FormItemComponent from '../../common/FormItemComponent'
import BaseFormModal from '../../common/BaseFormModal'
import * as optionsType from '../types'
import { ORDER_TYPES } from './types';

const initFormDefaultValues = (options, values) => {
  return options.map((item) => {
    item.options = item.options.map((sub) => {
      let value = values[sub.name] || '';
      if (value._id) {
        value = value._id;
      }
      if (value !== null && value !== undefined && value !== NaN && value !== '') {
        if (!sub.decoratorOptions) {
          sub.decoratorOptions = {};
        }
        sub.decoratorOptions.initialValue = value;
      }
      return sub;
    })
    return item;
  })
}
class OrderGoodsAddModal extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
      currentOrderType:'',
      data:{},
      customs:[]
    }
    this.orderType = null;
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.state.currentOrderType = constants.BASE_CONSTANTS.ORDER_TYPE[0].value;
    if (this.props.isRecharge) {
      this.state.currentOrderType = constants.BASE_CONSTANTS.E_ORDER_TYPE.RECHARGE;
    }
    if (this.props.isEditMode) {
      this.state.currentOrderType = this.props.orderType;
    }
    this.setState({visible:this.props.visible})
    
    // this.onReqOrderGoodsList(this.state.currentOrderType);
  }

  renderHeader = () => {
    return (
      <div>
        {
          this.props.isRecharge || this.props.isEditMode ? null
          :
          <Select style={{ width:120, marginBottom:20 }} defaultValue={this.state.currentOrderType} onChange={this.onChange}>
            {
              constants.BASE_CONSTANTS.ORDER_TYPE.map((item) => {
                if (item.value !== constants.BASE_CONSTANTS.E_ORDER_TYPE.RECHARGE) {
                  return <Option key={item.value} value={item.value}>{item.label}</Option>
                }
              })
            }
          </Select>
        }
        
      </div>
    );
  }

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

  renderBody = () => {
    let span = {xs:24, sm:12, lg:8};
    let urgentOptionItem = {type:'select', name:'urgent', label:'加急', itemOptions:{labelLeft:true}, selectItems:listToSelectOptions(this.props.sales.urgentList), options:{defaultActiveFirstOption:true}, rule:{required:true}};
    
    return (
      <div>
        <NormalForm onSubmit={this.onSubmit}>
          {
            this.options.map((item, index) => {
              return item.left ? this.renderFoot(item,index) : this.renderBaseForm(item, index);
            })
          }
          
          <Row>
            <Col><ContentTitle>特殊定制</ContentTitle></Col>
            {
              this.state.customs.map((item,index) => {
                return (
                  <Col key={index} {...span}>
                    <Select style={{ width:120, marginBottom:20 }} defaultValue={this.state.currentOrderType} 
                      onChange={(value) => {
                        this.onCustomChange(index, value)
                      }}>
                      {
                        this.props.customList.map((item) => {
                          return <Option key={item._id} value={item._id}>{item.name}</Option>
                        })
                      }
                    </Select>
                  </Col>
                );
              })
            }
            <Col {...span}>
              <Button type="dashed" onClick={this.add} style={{ width: 120 }}>
                <Icon type="plus" /> 增加
              </Button>
            </Col>
          </Row>
          <FormItemComponent key={urgentOptionItem.name} options={urgentOptionItem} form={this.props.form} />
        </NormalForm>
      </div>
    );
  }

  render() {
    this.orderType = null;
    for(let value of ORDER_TYPES) {
      if (value.key === this.state.currentOrderType) {
        this.orderType = value;
      }
    }
    this.options=[];
    if (this.orderType) {
      this.options = this.orderType.addOptions(this);
      if (this.props.data) {
        this.options = initFormDefaultValues(this.options, this.props.data);
      }
    }

    return (
      <BaseFormModal
        title={this.props.title}
        options={this.options}
        visible={this.state.visible}
        result={this.props.result}
        renderHeader={this.renderHeader}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        onAfterClose={this.props.afterClose || null}
      />
    );
  }

  onReqOrderGoodsList = (type) => {
    let con ={};
    switch(type) {
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.SHOES:
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.DESIGN:
        con = {
          goods:type
        };
        this.props.reqGetGoodsList('goodsShoesList:goodsList', graphqlTypes.goodsType, con, {page:-1, pageSize:0});
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.BELT:
        con = {
          goods:type
        };
        this.props.reqGetGoodsList('goodsBeltList:goodsList', graphqlTypes.goodsType, con, {page:-1, pageSize:0});
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.ORNAMENT:
        con = {
          goods:type
        };
        this.props.reqGetGoodsList('goodsOrnamentList:goodsList', graphqlTypes.goodsType, con, {page:-1, pageSize:0});
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.WATCH_STRAP:
        con = {
          goods:type
        };
        this.props.reqGetGoodsList('goodsWatchStrapList:goodsList', graphqlTypes.goodsType, con, {page:-1, pageSize:0});
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.MAINTAIN:
        con = {
          type:constants.BASE_CONSTANTS.COMMON_DATA_TYPES.MAINTAIN
        };
        this.props.reqGetGoodsList('maintainList:commonList', graphqlTypes.maintainType, con, {page:-1, pageSize:0});
      break;
    }
  }

  onChange = (value) => {
    this.setState({currentOrderType:value});
    this.onReqOrderGoodsList(value);
  }

  onSubmit = (err, values) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.onAdd) {
          values.type = this.currentOrderType;
          this.props.onAdd(values);
        }
      }
    })
  }
}

export default connect(
  state => ({
    loading:state.sales.loading,
    result:state.sales.result,
    sales:state.sales,
    shopList:state.shop.shopList,
    guideList:state.shop.shopGuideList,
    customerList:state.customer.customerList,
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetOrderList: Actions.getOrderList,
      reqAddOrder: Actions.addOrder,
      reqGetGoodsList: Actions.getGoodsList,
      reqGetGoodsBaseDatas: Actions.getGoodsBaseDatas
    }, dispatch);
  }
)(Form.create()(OrderGoodsAddModal));
