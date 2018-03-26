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
      pics:['']
    }
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.setState({visible:this.props.visible})
  }

  componentWillReceiveProps(nextProps){
  }

  renderColor = (list, id) => {
    list = list || [];
    for(let item of list) {
      if (item._id === id) {
        return item.name;
      }
    }

    return '';
  }

  renderPicUpload = (item, record) => {
    <Row style={{width:'100%'}}>
      <Col span={6}>
        <Upload
          name="order"
          accept="image/*"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          style={{padding:0, position:'relative'}}
          action={config.GetServerAddress() + '/upload'}
          onChange={({file, fileList})=>this.onUploadPicChange(0, file)}
          withCredentials={true}
          disabled={disabled}
        >
          {
            item.file ? 
            <div style={{width:'100%', height:'100%', position:'relative'}}>
              <img src={config.GetServerAddress() + '/file/'+item.file} alt="" style={{width:'100%', height:'100%'}} /> 
              {
                disabled ? null :
                <PhotoDeleteBtn icon='minus' type="danger" shape="circle" size="small" ghost onClick={(e)=>{
                  e.stopPropagation();
                  this.onRemovePhoto(0);
                }} />
              }
            </div>
            :
            <PhotoUploadBtnCotnainer>
              <Icon type='plus' />
              <div className="ant-upload-text">Upload</div>
            </PhotoUploadBtnCotnainer>
          }
        </Upload>
      </Col>
      <Col span={12}>
        <TextArea disabled={disabled} placeholder="请输入拍照备注" autosize={{ minRows: 2, maxRows: 10 }} defaultValue={item.desc} onChange={(e)=>{
          let pics = this.state.pics;
          let pic = pics[index];
          if (pic) {
            pic.desc = e.target.value;
            this.setState({pics:pics})
          }
        }} />
      </Col>
    </Row>
  }

  onRemovePhoto = (index) => {
    let pics = this.state.pics;
    pics.splice(index, 1);
    this.setState({pics:pics});
  }
  
  onUploadPicChange = (index, file) => {
    let pics = this.state.pics;
    let pic = pics[index];
    if (pic && file.response && file.response.data.files && file.response.data.files.length > 0) {
      pic.file = file.response.data.files[0];
      this.setState({pics:pics})
    }
  }

  render() {
    this.options = this.props.goodsType.addOptions(this);
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
        actionType={ActionTypes.GOODS_ADD}
        onSubmitSuccess={this.props.onSubmitSuccess}
        ref="formModal"
      />
    );
  }

  setColorByColorPalette = (palette) => {
    if (this.refs.formModal) {
      let forms = this.refs.formModal;
      forms.setFieldsValue({s_out_color:palette.out_color._id});
      forms.setFieldsValue({s_in_color:palette.in_color._id});
      forms.setFieldsValue({s_bottom_color:palette.bottom_color._id});
      forms.setFieldsValue({s_bottom_side_color:palette.bottom_side_color._id});
    }
  }

  onColorPaletteChange = (key, value) => {
    let list = this.props.sales.colorPaletteList || [];
    for(let palette of list) {
      if (palette._id === value) {
        this.setColorByColorPalette(palette);
      }
    }
  }

  onSubmit = (err, values) => {
    if (!err) {
      if (this.props.onAdd) {
        this.props.onAdd(values);
      }
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
    sales:state.sales,
    loading:state.sales.loading,
    result:state.sales.result,
  }),
  (dispatch) => {
    return bindActionCreators({
    }, dispatch);
  }
)(Form.create()(GoodsAddModal));
