import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'

import {
  Card,
  Icon,
  Layout,
  message,
  Table,
  Button
} from 'antd'

import {
  Root,
  LoginInput,
  Container,
  LoginCard,
  BtnLogin,
  ColorDiv
} from './styled'

import Actions from '../../../actions'
import * as ActionTypes from '../../../constants/ActionTypes'

import BaseListComponent from '../../common/BaseListComponent'
import * as common from '../../../modules/common'
import * as constants from '../../../constants/Constants'
import AnalyseAddModal from './AnalyseAddModal'
import AnalyseEditModal from './AnalyseEditModal'
import { commonUtils } from '../../../modules/common';
import { TYPES } from './types'
import utils from '../../../../utils/utils'
import {PhotoshopPicker} from 'react-color';

class AnalyseListContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      addVisible:false,
      editVisible:false,
      page: 0,
      selectRows:[],
      colorPickerVisibles:constants.BASE_CONSTANTS.CUSTOMER_ANALYSE_TYPES_DATAS.map((item)=>{
        return false;
      })
    }

    this.searchWord = '';
    this.options = [];
    this.dataType=TYPES[0];
    this.source = constants.BASE_CONSTANTS.CUSTOMER_ANALYSE_TYPES_DATAS.map((item)=>{
      return item;
    })
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
  }
  
  componentWillReceiveProps(nextProps){
    if ((nextProps.result.type === ActionTypes.SALES_UPDATE || nextProps.result.type === ActionTypes.SALES_ADD) && nextProps.loading !== this.props.loading && !nextProps.loading) {
      if (nextProps.result.code === 0) {
        this.onReqList();
      }
    }

    if (nextProps.customerAnalyseList !== this.props.customerAnalyseList) {
      this.currentList(nextProps.customerAnalyseList);
    }
  }

  componentDidMount(){
    this.onReqList();
    this.currentList(this.props.customerAnalyseList)
  }

  // render() {
  //   this.options = this.dataType.listOptions(this);
  //   const list = this.currentList();
  //   return (
  //     <BaseListComponent
  //       canOperate={false}
  //       columns={this.options} 
  //       dataSource={list} 
  //       loading={this.props.loading}
  //       onGetList={(pageInfo)=>{
  //         this.onReqList();
  //       }}
  //       hasSearch={false}
  //       onItemConver={this.onItemConver}
  //     />
  //   );
  // }

  render() {
    const gridStyle = {
      position:'relative',
      width: '33.33%',
      textAlign: 'center',
    };
    return (
      <Card style={{minHeight: '300px'}}>
        {
          this.source.map((item, index)=>{
            let bgColor = item.color_css || 0xffffff;
            let color = Math.max(0, 0xffffff-bgColor);
            let style = {
              ...gridStyle, 
              color:`rgb(${(color&0XFF0000)>>16}, ${(color&0XFF00)>>8}, ${color&0XFF})`, 
              backgroundColor:`rgb(${(bgColor&0XFF0000)>>16}, ${(bgColor&0XFF00)>>8}, ${bgColor&0XFF})`
            }

            return (
              <Card.Grid key={index} style={style} onClick={()=>{
                let arr = this.state.colorPickerVisibles;
                arr = arr.map((item,_index)=>_index === index)
                this.setState({colorPickerVisibles:arr});
              }}>
                {item.label}
                {
                  this.state.colorPickerVisibles[index] ?
                  <ColorDiv onClick={(e)=>{
                    e.stopPropagation();
                  }}>
                    <PhotoshopPicker color={{r:(bgColor&0XFF0000)>>16, g: (bgColor&0XFF00)>>8, b:bgColor&0XFF, a:1}} type="Photoshop" onChangeComplete={(result)=>{
                      this.handleColorChange(result, item, index)
                    }} onAccept={ ()=>this.handleCloseColorChange(true, item, index) } onCancel={ ()=>this.handleCloseColorChange(false, item, index) } />
                  </ColorDiv>
                  : null
                }
              </Card.Grid>
            )
          })
        }
      </Card>
    )
  }

  currentList = (list) => {
    if (!list) return;
    this.source = this.source.map(item=> {
      for(let value of list) {
        if (value.analyse_id === item.value) {
          item._id = value._id;
          item.color_css = value.color_css;
          item.color_css_old = value.color_css;
          break;
        }
      }
      return item;
    })
  }

  handleCloseColorChange = (ok, item, index) => {
    let arr = this.state.colorPickerVisibles;
    arr = arr.map((item,_index)=>false)
    this.setState({colorPickerVisibles:arr});
    if (ok) {
      if (this.source[index].color_css !== this.source[index].color_css_old) {
        if (this.source[index]._id) {
          this.onReqUpdate(this.source[index]._id, {color_css:this.source[index].color_css})
        } else {
          this.onReqAdd({color_css:this.source[index].color_css, analyse_id:this.source[index].value})
        }
      }
    }
  }
  handleColorChange = (color, item, index) => {
    if (color) {
      // console.log('color=' + JSON.stringify(color));
      let colorInt = ((color.rgb.r<<16)&0xff0000) + ((color.rgb.g<<8)&0xff00) + (color.rgb.b&0xff);
      // console.log('index='+index+'; color=' + colorInt + "; " + new Number(colorInt).toString(16));
      this.source[index].color_css = colorInt;
    }
  }

  onReqList = () => {
    let con = {
      type:this.dataType.key
    };
    this.props.reqGetSalesBaseList(this.dataType.listTag, this.dataType.graphqlType, con);
  }

  onReqUpdate = (id, data) => {
    if (data) {
      data.type = this.dataType.key;
      data.NID = '0';
    }
    this.props.reqUpdateSalesBase(this.dataType.tag, id, data);
  }
  
  onReqAdd = (data) => {
    if (data) {
      data.type = this.dataType.key;
      data.NID = '0';
    }
    this.props.reqAddSalesBase(this.dataType.tag, this.dataType.graphqlType, data);
  }

  onReqRemove = (ids) => {
    this.props.reqDeleteSalesBase(this.dataType.tag, ids);
  }

  onItemConver = (item, index) => {
    item.editor_time = moment(item.editor_time).format('YYYY-MM-DD HH:mm:ss');
    return item;
  }
  
  onDelete = (ids) => {
    this.onReqRemove(ids);
  }

  onRowClick = (record, index, event) => {
    this.setState({editVisible:true, editData:record});
  }
  canOperate = () => {
    this.power = commonUtils.getPower(this.props.user, constants.MENU_IDS.salesItemsBase)
    return this.power && this.power.canOperate;
  }
}

export default connect(
  state => ({
    sales:state.sales,
    loading:state.sales.loading,
    result:state.sales.result,
    deleteIDS:state.sales.salesBaseDeleteIDS,
    user:state.app.loginInfo.user,
    customerAnalyseList:state.sales.customerAnalyseList
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGetSalesBaseList: Actions.getSalesBaseList,
      reqAddSalesBase: Actions.addSalesBase,
      reqDeleteSalesBase: Actions.deleteSalesBase,
      reqUpdateSalesBase: Actions.updateSalesBase,
    }, dispatch);
  }
)(AnalyseListContainer);
