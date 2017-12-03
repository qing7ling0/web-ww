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
import * as optionsType from '../types'

class GoodsAddModal extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    
    this.options = optionsType.getGoodsShoesAddOptions(this);
    this.setState({visible:this.props.visible})
  }

  componentWillReceiveProps(nextProps){
  }

  render() {
    return (
      <BaseFormModal
        title={this.props.title}
        options={this.options}
        visible={this.state.visible}
        loading={this.props.loading}
        result={this.props.result}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        onAfterClose={this.props.afterClose || null}
        confirmLoading={this.state.confirmLoading}
        actionType={ActionTypes.GOODS_SHOES_ADD}
        onSubmitSuccess={()=>{
          this.props.reqGetGoodsShoesList(this.props.pageInfo.page, this.props.pageInfo.pageSize);
        }}
      />
    );
  }


  onSubmit = (err, values) => {
    if (!err) {
      if (values.put_date) {
        values.put_date = values.put_date.format('YYYY-MM-DD')
      }

      this.props.reqAddGoodsShoes(values);
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
    loading:state.sales.loading,
    result:state.sales.result,
    goodsTypeList:state.sales.goodsTypeList,
    goodsStyleList:state.sales.goodsStyleList,
    goodsSeasonList:state.sales.goodsSeasonList,
    matriealColorList:state.sales.matriealColorList,
    outColorList:state.sales.outColorList,
    inColorList:state.sales.inColorList,
    bottomColorList:state.sales.bottomColorList,
    bottomSideColorList:state.sales.bottomSideColorList,
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetGoodsShoesList: Actions.getGoodsShoesList,
      reqAddGoodsShoes: Actions.addGoodsShoes
    }, dispatch);
  }
)(Form.create()(GoodsAddModal));
