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
  Loading,
  ProfileCol,
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
import * as optionsType from '../types'

class GoodsProfileContainer extends Component {
  // 构造函数，在创建组件的时候调用一次
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
    }

    this.options = optionsType.getGoodsShoesProfileOptions(this);
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
  componentWillMount(){
    this.setState({visible:this.props.visible})
  }

  componentWillReceiveProps(nextProps){
  }
  componentDidMount() {
    this.props.reqGoodsShoesProfile(this.props.match.params.id);
  }

  renderCol = (col) => {
    if (col.dataIndex in this.props.profile) {
      let value = this.props.profile[col.dataIndex];
      if (col.render) {
        value = col.render(value);
      }
      return (
        <ProfileCol xs={24} sm={12} lg={8} key={col.key}>
          <ProfileColLabel>{col.title}: </ProfileColLabel>
          <ProfileColValue>{value}</ProfileColValue>
        </ProfileCol>
      )
    }

    return null;
  }

  render() {
    return (
      <Root>
        <Card 
          loading={this.props.loading} 
          title={<ProfileRowTitle>{this.props.profile.name}</ProfileRowTitle>} 
          bordered={false} 
          noHovering={true}
          extra={
            <ProfileBtnBack><Button type="primary" shape="circle" icon="rollback" onClick={()=>{
              this.props.history.goBack();
            }} /></ProfileBtnBack>
          }>
          <Row>
            {this.options.map((option) => {
              return this.renderCol(option);
            })}
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
    profile:state.sales.goodsShoesProfile
  }),
  (dispatch) => {
    return bindActionCreators({
      reqGoodsShoesProfile: Actions.getGoodsShoesProfile,
    }, dispatch);
  }
)(GoodsProfileContainer);
