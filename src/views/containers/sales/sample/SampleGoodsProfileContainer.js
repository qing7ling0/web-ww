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
  Col,
  Spin 
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
  ProfileCol,
  Loading,
  ProfileColLabel,
  ProfileColValue,
  ProfileBtnBack,
  ProfileRowTitle
} from './styled'

import * as ActionTypes from '../../../constants/ActionTypes'
import Actions from '../../../actions'
import * as constants from '../../../constants/Constants'
import * as common from '../../../modules/common'
import DetailComponent from '../../common/DetailComponent'
import utils from '../../../../utils/utils'
import * as optionsType from './types'

class SampleGoodsProfileContainer extends Component {
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
    if (nextProps.profile && nextProps.profile !== this.props.profile) {
      this.props.reqGoodsProfile(nextProps.profile.NID);
    }
  }

  componentDidMount() {
    this.props.reqSampleGoodsProfile(this.props.match.params.id);
  }

  renderCol = (col, index, profile) => {
    profile = profile || this.props.profile;
    if (col.dataIndex in profile) {
      let value = profile[col.dataIndex];
      if (col.render) {
        value = col.render(value);
      }
      return (
        <ProfileCol xs={24} sm={12} lg={8} key={index}>
          <ProfileColLabel>{col.title}: </ProfileColLabel>
          <ProfileColValue>{value}</ProfileColValue>
        </ProfileCol>
      )
    }

    return null;
  }

  render() {
    if (!this.props.profile) return null;
    this.options = null;
    for(let t of optionsType.GOODS_TYPES) {
      if (t.key === this.props.profile.type) {
        this.options = t.profileOptions(this);
      }
    }

    if (!this.options) return null;

    return (
      <Root>
        <Card 
          title={<ProfileRowTitle>库存详情</ProfileRowTitle>} 
          bordered={false} 
          extra={
            <ProfileBtnBack><Button type="primary" shape="circle" icon="rollback" onClick={()=>{
              this.props.history.goBack();
            }} /></ProfileBtnBack>
          }>
          <Row>
            {
              this.options.base ? 
              <Card
                title={<ProfileRowTitle>{this.options.base.title}</ProfileRowTitle>} 
                bordered={false} 
              >
                <Row>
                  {this.options.base.options.map((option, index) => {
                    return this.renderCol(option, index);
                  })}
                </Row>
              </Card>
              : null
            }
            {
              this.options.size ? 
              <Card
                title={<ProfileRowTitle>{this.options.size.title}</ProfileRowTitle>} 
                bordered={false} 
              >
                <Row>
                  {this.options.size.options.map((option, index) => {
                    return this.renderCol(option, index);
                  })}
                </Row>
              </Card>
              : null
            }
            {
              this.options.goods ? 
              <Card
                title={<ProfileRowTitle>{this.options.goods.title}</ProfileRowTitle>} 
                bordered={false} 
              >
                <Row>
                  {this.props.goodsProfile && this.options.goods.options.map((option, index) => {
                    return this.renderCol(option, index, this.props.goodsProfile);
                  })}
                </Row>
              </Card>
              : null
            }
          </Row>
        </Card>
      </Root>
    );
  }

}

export default connect(
  state => ({
    loading:state.sales.loading,
    result:state.sales.result,
    profile:state.sales.sampleGoodsProfile,
    goodsProfile:state.sales.goodsProfile
  }),
  (dispatch) => {
    return bindActionCreators({
      reqSampleGoodsProfile: Actions.getSampleGoodsProfile,
      reqGoodsProfile:Actions.getGoodsProfileByNID
    }, dispatch);
  }
)(SampleGoodsProfileContainer);
