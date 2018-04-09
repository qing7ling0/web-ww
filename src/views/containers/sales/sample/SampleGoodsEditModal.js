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
      confirmLoading:false
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.setState({visible:this.props.visible})
  }

  componentWillReceiveProps(nextProps){
    if (this.props.visible !== nextProps.visible) {
      this.state.visible = nextProps.visible;
    }
    if(!nextProps.visible) {
      this.state.confirmLoading = false;
    }

    if ((nextProps.result.type === ActionTypes.SAMPLE_GOODS_ADD||nextProps.result.type === ActionTypes.SAMPLE_GOODS_UPDATE) && nextProps.loading !== this.props.loading && !nextProps.loading) {
      if (nextProps.result.code === 0) {
        this.setState({confirmLoading:false, visible:false})
        this.props.onSubmitSuccess();
      } else {
        this.setState({confirmLoading:false})
      }
    }
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

  // onSubmit = (err, values) => {
  //   if (!err) {
  //     if (this.props.onEdit) {
  //       this.props.onEdit(values);
  //     }
  //   }
  // }

  onCancel = (e) => {
    this.setState({visible:false, confirmLoading:false});
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let goodsInfo = this.getGoodsInfo(values);
        if (goodsInfo) {
          switch (this.props.sampleGoodsType.key) {
            case constants.BASE_CONSTANTS.E_ORDER_TYPE.SHOES:
              goodsInfo.s_material = goodsInfo.s_material&&goodsInfo.s_material._id || '';
              goodsInfo.s_xuan_hao = goodsInfo.s_xuan_hao&&goodsInfo.s_xuan_hao._id || '';
              goodsInfo.s_out_color = goodsInfo.s_out_color&&goodsInfo.s_out_color._id || '';
              goodsInfo.s_in_color = goodsInfo.s_in_color&&goodsInfo.s_in_color._id || '';
              goodsInfo.s_bottom_color = goodsInfo.s_bottom_color&&goodsInfo.s_bottom_color._id || '';
              goodsInfo.s_bottom_side_color = goodsInfo.s_bottom_side_color&&goodsInfo.s_bottom_side_color._id || '';
              goodsInfo.s_gen_gao = goodsInfo.s_gen_gao&&goodsInfo.s_gen_gao._id || '';
              goodsInfo.s_tie_di = goodsInfo.s_tie_di&&goodsInfo.s_tie_di._id || '';
            break;
            case constants.BASE_CONSTANTS.E_ORDER_TYPE.BELT:
              goodsInfo.b_material = goodsInfo.b_material&&goodsInfo.b_material._id || '';
              goodsInfo.b_color = goodsInfo.b_color&&goodsInfo.b_color._id || '';
            break;
            case constants.BASE_CONSTANTS.E_ORDER_TYPE.WATCH_STRAP:
              goodsInfo.ws_material = goodsInfo.ws_material&&goodsInfo.ws_material._id || '';
              goodsInfo.ws_style = goodsInfo.ws_style&&goodsInfo.ws_style._id || '';
              goodsInfo.ws_color = goodsInfo.ws_color&&goodsInfo.ws_color._id || '';
            break;
          }
        }
        if (this.props.onEdit) {
          if(!goodsInfo.s_color_palette) {
            delete goodsInfo.s_color_palette;
          }
          if(!goodsInfo.s_gen_gao) {
            delete goodsInfo.s_gen_gao;
          }
          this.props.onEdit(goodsInfo);
          this.setState({confirmLoading:true});
        } else {

        }
      }
    });
  }

  onNIDSelect = (value, option) => {
    const {form:forms} = this.props;
    switch (this.props.sampleGoodsType.key) {
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.SHOES:
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
          forms.setFieldsValue({s_tie_di:shoes.s_tie_di &&shoes.s_tie_di.name||''});
          forms.setFieldsValue({sex:shoes.sex});
          forms.setFieldsValue({s_gui_ge:shoes.s_gui_ge});
          if (shoes.sex === constants.BASE_CONSTANTS.SEX_FEMALE && shoes.s_gen_gao) {
            forms.setFieldsValue({s_gen_gao:shoes.s_gen_gao.name});
          } else {
            forms.setFieldsValue({s_gen_gao:null});
          }
  
          this.setState({selectShoes:shoes});
        }
      }
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.BELT:
        for(let i=0; i<this.props.sales.goodsBeltList.length; i++) {
          let shoes = this.props.sales.goodsBeltList[i];
          if (shoes.NID === value) {
            forms.setFieldsValue({NID:shoes.NID});
            forms.setFieldsValue({sex:shoes.sex});
            forms.setFieldsValue({b_material:shoes.b_material.name});
            forms.setFieldsValue({b_color:shoes.b_color.name});
            forms.setFieldsValue({b_A:shoes.b_A});
            forms.setFieldsValue({b_B:shoes.b_B});
            forms.setFieldsValue({b_C:shoes.b_C});
            forms.setFieldsValue({b_D:shoes.b_D});
          }
        }
        // shoesInfo.b_material = this.getValueFromListByName(this.props.sales.materialList, shoesInfo.b_material);
        // shoesInfo.b_color = this.getValueFromListByName(this.props.sales.materialColorList, shoesInfo.b_color);
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.WATCH_STRAP:
        for(let i=0; i<this.props.sales.goodsWatchStrapList.length; i++) {
          let shoes = this.props.sales.goodsWatchStrapList[i];
          if (shoes.NID === value) {
            forms.setFieldsValue({NID:shoes.NID});
            forms.setFieldsValue({sex:shoes.sex});
            forms.setFieldsValue({ws_material:shoes.ws_material.name});
            forms.setFieldsValue({ws_style:shoes.ws_style.name});
            forms.setFieldsValue({ws_color:shoes.ws_color.name});
            forms.setFieldsValue({ws_A:shoes.ws_A});
            forms.setFieldsValue({ws_B:shoes.ws_B});
            forms.setFieldsValue({ws_C:shoes.ws_C});
            forms.setFieldsValue({ws_D:shoes.ws_D});
            forms.setFieldsValue({ws_E:shoes.ws_E});
            forms.setFieldsValue({ws_F:shoes.ws_F});
            forms.setFieldsValue({ws_G:shoes.ws_G});
          }
        }
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.ORNAMENT:
      for(let i=0; i<this.props.sales.goodsOrnamentList.length; i++) {
        let shoes = this.props.sales.goodsOrnamentList[i];
        if (shoes.NID === value) {
          forms.setFieldsValue({NID:shoes.NID});
          forms.setFieldsValue({sex:shoes.sex});
          forms.setFieldsValue({o_name:shoes.name});
        }
      }
      break;
    }
  }

  getGoodsInfo = (values)=> {
    let shoesInfo = values;
    switch (this.props.sampleGoodsType.key) {
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.SHOES:
        shoesInfo.s_material = this.getValueFromListByName(this.props.sales.materialList, shoesInfo.s_material);
        shoesInfo.s_xuan_hao = this.getValueFromListByName(this.props.sales.xuanHaoList, shoesInfo.s_xuan_hao);
        shoesInfo.s_out_color = this.getValueFromListByName(this.props.sales.outColorList, shoesInfo.s_out_color);
        shoesInfo.s_in_color = this.getValueFromListByName(this.props.sales.inColorList, shoesInfo.s_in_color);
        shoesInfo.s_bottom_color = this.getValueFromListByName(this.props.sales.bottomColorList, shoesInfo.s_bottom_color);
        shoesInfo.s_bottom_side_color = this.getValueFromListByName(this.props.sales.bottomSideColorList, shoesInfo.s_bottom_side_color);
        shoesInfo.s_gen_gao = this.getValueFromListByName(this.props.sales.genGaoList, shoesInfo.s_gen_gao);
        shoesInfo.s_tie_di = this.getValueFromListByName(this.props.sales.shoesTieBianList, shoesInfo.s_tie_di);
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.BELT:
        shoesInfo.b_material = this.getValueFromListByName(this.props.sales.materialList, shoesInfo.b_material);
        shoesInfo.b_color = this.getValueFromListByName(this.props.sales.materialColorList, shoesInfo.b_color);
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.WATCH_STRAP:
        shoesInfo.ws_material = this.getValueFromListByName(this.props.sales.materialList, shoesInfo.ws_material);
        shoesInfo.ws_color = this.getValueFromListByName(this.props.sales.materialColorList, shoesInfo.ws_color);
        shoesInfo.ws_style = this.getValueFromListByName(this.props.sales.watchStrapStyleList, shoesInfo.ws_style);
      break;
    }
    return shoesInfo;
  }

  getFromGoodsInfo = (goodsInfo) => {
    if (!goodsInfo) return null;
    let info = {...goodsInfo};
    switch(goodsInfo.type) {
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.SHOES:
        info.s_material = goodsInfo.s_material.name;
        info.s_xuan_hao = goodsInfo.s_xuan_hao.name;
        info.s_out_color = goodsInfo.s_out_color.name;
        info.s_in_color = goodsInfo.s_in_color.name;
        info.s_bottom_color = goodsInfo.s_bottom_color.name;
        info.s_bottom_side_color = goodsInfo.s_bottom_side_color.name;
        info.s_tie_di = goodsInfo.s_tie_di && goodsInfo.s_tie_di.name || '';
        info.s_gen_gao = goodsInfo.s_gen_gao && goodsInfo.s_gen_gao.name || '';
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.BELT:
        info.b_material = goodsInfo.b_material.name;
        info.b_color = goodsInfo.b_color.name;
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.WATCH_STRAP:
        info.ws_material = goodsInfo.ws_material.name;
        info.ws_style = goodsInfo.ws_style.name;
        info.ws_color = goodsInfo.ws_color.name;
      break;
    }
    return info;
  }

  getGoodsByCurrentInput = (goodsInputInfo) => {
    switch (this.props.sampleGoodsType.key) {
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.SHOES:
        if (goodsInputInfo.s_material && goodsInputInfo.sex&& goodsInputInfo.s_xuan_hao && goodsInputInfo.s_color_palette) {
          for(let goods of this.props.sales.goodsShoesList) {
            if (goods.s_material && goods.s_xuan_hao && goods.sex && goods.s_color_palette) {
              if (goods.s_material._id === goodsInputInfo.s_material._id
                && goods.s_xuan_hao._id === goodsInputInfo.s_xuan_hao._id
                && goods.s_color_palette._id === goodsInputInfo.s_color_palette
                && goods.sex === goodsInputInfo.sex
              ) {
                if ((goods.sex === constants.BASE_CONSTANTS.SEX_FEMALE && goods.s_gen_gao && goodsInputInfo.s_gen_gao && goodsInputInfo.s_gen_gao._id === goods.s_gen_gao._id) ||
                goods.sex !== constants.BASE_CONSTANTS.SEX_FEMALE
                ) {
                  return goods;
                }
              }
            }
          }
        }
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.BELT:
        if (goodsInputInfo.b_material && goodsInputInfo.sex && goodsInputInfo.b_color) {
          for(let goods of this.props.sales.goodsBeltList) {
            if (goods.b_material && goods.b_color && goods.sex) {
              if (goods.b_material._id === goodsInputInfo.b_material._id
                && goods.b_color._id === goodsInputInfo.b_color._id
                && goods.sex === goodsInputInfo.sex
              ) {
                return goods;
              }
            }
          }
        }
      break;
      case constants.BASE_CONSTANTS.E_ORDER_TYPE.WATCH_STRAP:
        if (goodsInputInfo.ws_material && goodsInputInfo.sex && goodsInputInfo.ws_color && goodsInputInfo.ws_style) {
          for(let goods of this.props.sales.goodsWatchStrapList) {
            if (goods.ws_material && goods.ws_color && goods.sex && goods.ws_style) {
              if (goods.ws_material._id === goodsInputInfo.ws_material._id
                && goods.ws_color._id === goodsInputInfo.ws_color._id
                && goods.ws_style._id === goodsInputInfo.ws_style._id
                && goods.sex === goodsInputInfo.sex
              ) {
                return goods;
              }
            }
          }
        }
      break;
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

  filterEditorProperty = (value) => {
    if (value) {
      let ret = {};
      for(let key in value) {
        if (key.indexOf('editor_') === -1) {
          ret[key] = value[key];
        }
      }
      return ret;
    }

    return null;
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
