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
import * as optionsType from '../types'

class GoodsEditModal extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.options = optionsType.getGoodsShoesEditOptions(this);
    this.setState({visible:this.props.visible})
  }

  componentWillReceiveProps(nextProps){
  }

  render() {
    let _options = this.options.map((item, index) => {
      if (!item.decoratorOptions) {
        item.decoratorOptions = {};
      }
      let value = this.props.data[item.name] || '';
      if (value._id) {
        value = value._id;
      }
      item.decoratorOptions.initialValue = value;
      return item;
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
        actionType={ActionTypes.GOODS_SHOES_UPDATE}
        onSubmitSuccess={()=>{
          this.props.reqGetGoodsShoesList(this.props.pageInfo.page, this.props.pageInfo.pageSize);
        }}
      />
    );
  }


  onSubmit = (err, values) => {
    if (!err) {
      values = utils.diffent(values, this.props.data);
      if (values.put_date) {
        values.put_date = values.put_date.format('YYYY-MM-DD')
      }
      values._id = this.props.data._id;
      this.props.reqUpdateGoodsShoes(values);
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
    materialColorList:state.sales.materialColorList,
    outColorList:state.sales.outColorList,
    inColorList:state.sales.inColorList,
    bottomColorList:state.sales.bottomColorList,
    bottomSideColorList:state.sales.bottomSideColorList,
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetGoodsShoesList: Actions.getGoodsShoesList,
      reqUpdateGoodsShoes: Actions.updateGoodsShoes
    }, dispatch);
  }
)(Form.create()(GoodsEditModal));
