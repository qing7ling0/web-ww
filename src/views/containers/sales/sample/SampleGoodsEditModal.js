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
  Modal,
  Row,
  Col
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

class SampleGoodsEditModal extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.setState({visible:this.props.visible})
  }

  componentWillReceiveProps(nextProps){
  }

  renderBaseForm(item, index, vertical, isReviewRender) {
    let span = {sm:24};
    if (vertical) {
      span={};
    }
    return (
      <Card key={index} title={item.title} bordered={false}  bodyStyle={{padding:0}}>
        <Row>
          {
            item.options.map((item, index) => {
              if (!item.options) item.options = {};
              return <Col key={index} {...span}><FormItemComponent key={item.name} options={item} form={this.props.form} /></Col>
            })
          }
        </Row>
      </Card>
    )
  }

  render() {
    this.options = this.props.sampleGoodsType.editOptions(this);
    // return (
    //   <BaseFormModal
    //     title={this.props.title}
    //     options={this.options}
    //     visible={this.state.visible}
    //     loading={this.props.loading}
    //     result={this.props.result}
    //     onSubmit={this.onSubmit}
    //     onCancel={this.onCancel}
    //     onAfterClose={this.props.afterClose || null}
    //     confirmLoading={this.state.confirmLoading}
    //     actionType={ActionTypes.GOODS_UPDATE}
    //     onSubmitSuccess={this.props.onSubmitSuccess}
    //     wrappedComponentRef={(inst) => this.formRef = inst}
    //   />
    // );

    return (
      <Modal 
        options={this.options}
        loading={this.props.loading}
        title={this.props.title}
        visible={this.state.visible}
        onOk={this.onSubmit}
        onCancel={this.onCancel}
        confirmLoading={this.state.confirmLoading}
        afterClose={this.props.afterClose || null}
      >
        
        <NormalForm>
          {
            this.options.map((item, index) => {
              return this.renderBaseForm(item, index, false, true);
            })
          }
        </NormalForm>
      </Modal>
    )
  }

  onSubmit = (err, values) => {
    if (!err) {
      if (this.props.onEdit) {
        this.props.onEdit(values);
      }
    }
  }

  onNIDSelect = (value, option) => {
    const {form:forms} = this.props;
    for(let i=0; i<this.props.sales.goodsShoesList.length; i++) {
      let shoes = this.props.sales.goodsShoesList[i];
      if (shoes.NID === value) {
        forms.setFieldsValue({NID:shoes.NID});
        forms.setFieldsValue({s_material:shoes.s_material.name});
        forms.setFieldsValue({s_xuan_hao:shoes.s_xuan_hao.name});
        // forms.setFieldsValue({s_gui_ge:shoes.s_gui_ge.name});
        forms.setFieldsValue({s_color_palette:shoes.s_color_palette&&shoes.s_color_palette._id||''});
        forms.setFieldsValue({s_out_color:shoes.s_out_color.name});
        forms.setFieldsValue({s_in_color:shoes.s_in_color.name});
        forms.setFieldsValue({s_bottom_color:shoes.s_bottom_color.name});
        forms.setFieldsValue({s_bottom_side_color:shoes.s_bottom_side_color.name});
        forms.setFieldsValue({s_tie_di:shoes.s_tie_di.name});
        forms.setFieldsValue({sex:shoes.sex});
        forms.setFieldsValue({s_gui_ge:shoes.s_gui_ge});
        if (!this.props.isReview) { // 审核过程不修改价格
          forms.setFieldsValue({price:shoes.price});
        }
        if (shoes.sex === constants.BASE_CONSTANTS.SEX_FEMALE && shoes.s_gen_gao) {
          forms.setFieldsValue({s_gen_gao:shoes.s_gen_gao.name});
        } else {
          forms.setFieldsValue({s_gen_gao:null});
        }

        this.setState({selectShoes:shoes});
      }
    }
  }

  getGoodsInfo = (values)=> {
    let shoesInfo = values;
    shoesInfo.s_material = this.getValueFromListByName(this.props.sales.materialList, shoesInfo.s_material);
    shoesInfo.s_xuan_hao = this.getValueFromListByName(this.props.sales.xuanHaoList, shoesInfo.s_xuan_hao);
    // shoesInfo.s_gui_ge = this.getValueFromListByName(this.props.sales.guiGeList, shoesInfo.s_gui_ge);
    // shoesInfo.s_color_palette = this.getValueFromListById(this.props.sales.colorPaletteList, shoesInfo.s_color_palette);
    shoesInfo.s_out_color = this.getValueFromListByName(this.props.sales.outColorList, shoesInfo.s_out_color);
    shoesInfo.s_in_color = this.getValueFromListByName(this.props.sales.inColorList, shoesInfo.s_in_color);
    shoesInfo.s_bottom_color = this.getValueFromListByName(this.props.sales.bottomColorList, shoesInfo.s_bottom_color);
    shoesInfo.s_bottom_side_color = this.getValueFromListByName(this.props.sales.bottomSideColorList, shoesInfo.s_bottom_side_color);
    shoesInfo.s_gen_gao = this.getValueFromListByName(this.props.sales.genGaoList, shoesInfo.s_gen_gao);
    shoesInfo.s_tie_di = this.getValueFromListByName(this.props.sales.shoesTieBianList, shoesInfo.s_tie_di);
    return shoesInfo;
  }

  getGoodsByCurrentInput = (shoesInfo) => {
    if (shoesInfo.s_material && shoesInfo.sex&& shoesInfo.s_xuan_hao && shoesInfo.s_color_palette) {
      for(let goods of this.props.sales.goodsShoesList) {
        if (goods.s_material && goods.s_xuan_hao && goods.sex && goods.s_color_palette) {
          if (goods.s_material._id === shoesInfo.s_material._id
            && goods.s_xuan_hao._id === shoesInfo.s_xuan_hao._id
            && goods.s_color_palette._id === shoesInfo.s_color_palette
            && goods.sex === shoesInfo.sex
          ) {
            if ((goods.sex === constants.BASE_CONSTANTS.SEX_FEMALE && goods.s_gen_gao && shoesInfo.s_gen_gao && shoesInfo.s_gen_gao._id === goods.s_gen_gao._id) ||
            goods.sex !== constants.BASE_CONSTANTS.SEX_FEMALE
            ) {
              return goods;
            }
          }
        }
      }
    }
    return null;
  }

  setColorByColorPalette = (palette) => {
    const {form:forms} = this.props;
    if (forms) {
      forms.setFieldsValue({s_out_color:palette.out_color.name});
      forms.setFieldsValue({s_in_color:palette.in_color.name});
      forms.setFieldsValue({s_bottom_color:palette.bottom_color.name});
      forms.setFieldsValue({s_bottom_side_color:palette.bottom_side_color.name});
    }
  }

  onNIDPropertyChange = (key, value) => {
    if (!this.formRef) return;
    let forms = this.formRef.props.form;
    if (key === 's_color_palette' && value) {
      let palette = null;
      let list = this.props.sales.colorPaletteList || [];
      for(let pa of list) {
        if (pa._id === value) {
          palette = pa;
          break;
        }
      }
      if (palette) {
        this.setColorByColorPalette(palette);
      }
    } 
    if (key === 's_gui_ge') {
      value = value.target.value;
    }

    if(key === 'sex') {
      if (value !== constants.BASE_CONSTANTS.SEX_FEMALE) {
        forms.setFieldsValue({s_gen_gao:''});
      }
    }

    let shoesInfo = forms.getFieldsValue();
    if (key) {
      shoesInfo[key] = value;
    }
    shoesInfo = this.getGoodsInfo(shoesInfo);

    // let nid = commonUtils.createGoodsNID(constants.BASE_CONSTANTS.GOODS_SHOES, shoesInfo, this.props.customer.sex);
    let goods = this.getGoodsByCurrentInput(shoesInfo);
    if (!this.props.isReview) { // 审核过程不修改价格
      if (goods) {
        forms.setFieldsValue({price:goods.price});
      } else {
        forms.setFieldsValue({price:null});
      }
    }
    if (goods) {
      forms.setFieldsValue({NID:goods.NID});
    } else {
      forms.setFieldsValue({NID:constants.BASE_CONSTANTS.NULL_NID});
    }
  }

  onColorChange = (key, value) => {
    if (!this.formRef) return;
    let forms = this.formRef.props.form;
    let shoesInfo = forms.getFieldsValue();
    if (key) {
      shoesInfo[key] = value;
    }
    shoesInfo = this.getGoodsInfo(shoesInfo);
    let _palette = null;
    let paletteList = this.props.sales.colorPaletteList || [];
    for(let palette of paletteList) {
      if (palette.out_color && palette.in_color && palette.bottom_color && palette.bottom_side_color &&
        shoesInfo.s_out_color && shoesInfo.s_in_color && shoesInfo.s_bottom_color && shoesInfo.s_bottom_side_color
      ) {
        if (palette.out_color._id === shoesInfo.s_out_color._id &&
          palette.in_color._id === shoesInfo.s_in_color._id &&
          palette.bottom_color._id === shoesInfo.s_bottom_color._id &&
          palette.bottom_side_color._id === shoesInfo.s_bottom_side_color._id
        ) {
          _palette = palette;
          break;
        }
      }
    }

    if (_palette) {
      forms.setFieldsValue({s_color_palette:_palette._id});
      this.onNIDPropertyChange('s_color_palette', _palette._id);
    } else {
      forms.setFieldsValue({s_color_palette:''});
      this.onNIDPropertyChange('s_color_palette', '');
    }
  }

  getValueFromListById = (list, id, checkFn) => {
    if (!list) return null;
    let ret = null;
    for(let item of list) {
      if (checkFn) {
        if (checkFn(item)) {
          ret = item;
          break;
        }
      } else {
        if (item._id === id) {
          ret = item;
          break;
        }
      }
    }
    return this.filterEditorProperty(ret);
  }
  getValueFromListByName = (list, name, checkFn) => {
    if (!list) return null;
    if (!name) return {_id:'', NID:'', name:''};
    name = name.trim();

    let ret = null;
    for(let item of list) {
      if (checkFn) {
        if (checkFn(item)) {
          ret = item;
          break;
        }
      } else {
        if (item.name && item.name.trim() === name) {
          ret = item;
          break;
        }
      }
    }
    if (ret) {
      return this.filterEditorProperty(ret);
    } else {
      return {_id:'', NID:'', name:name};
    }
  }
}

export default connect(
  state => ({
    sales:state.sales,
    loading:state.sales.loading,
    result:state.sales.result,
    sales:state.sales,
    shopList:state.shop.shopList,
  }),
  (dispatch) => {
    return bindActionCreators({
    }, dispatch);
  }
)(Form.create()(SampleGoodsEditModal));
