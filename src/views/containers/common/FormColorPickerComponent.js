import React, { Component } from 'react';
import { Form, Input, Select, Button } from 'antd';
import styled from 'styled-components'
import {SketchPicker} from 'react-color';


const FormItem = Form.Item;
const Option = Select.Option;

const Root = styled.span`
  position: relative;
  display: flex;
  justify-content: space-between;
  height:40px;
  /* margin: 2px 5px; */
`
const Box = styled.div`
  width: 100%;
  height:32px;
  margin:4px 0;
  border:1px solid #d9d9d9;
`
const Btn = styled(Button)`
  /* width:30px; */
`
const ColorMask = styled.div`
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2001;
`
const ColorDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 100%);
    z-index: 3001;
`

export default class FormColorPickerComponent extends React.Component {
  constructor(props) {
    super(props);

    const value = this.props.value || {};
    this.state = {
      pickerVisible:false,
      value:value
    };
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if (nextProps.value !== this.props.value) {
      const value = nextProps.value;
      this.setState({value});
    }
  }
  
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  render() {
    const color = this.state.value || 0xffff00;
    const r = (color>>16) & 0xff;
    const g = (color>>8) & 0xff;
    const b = (color) & 0xff;
    return (
      <Root>
        <Box style={{backgroundColor:`rgb(${r},${g},${b})`}} onClick={()=>{
          this.setState({pickerVisible:true})
        }} />
        {
          this.state.pickerVisible ?
          <div>
            <ColorMask onClick={()=>{
              this.setState({pickerVisible:false})
            }} />
            <ColorDiv onClick={(e)=>{
              e.stopPropagation();
            }}>
              <SketchPicker color={{r, g, b, a:1}} onChange={this.handleColorChange} />
            </ColorDiv>
          </div>
          : null
        }
      </Root>
    );
  }

  handleColorChange = (color) => {
    if (color) {
      // console.log('color=' + JSON.stringify(color));
      let value = ((color.rgb.r<<16)&0xff0000) + ((color.rgb.g<<8)&0xff00) + (color.rgb.b&0xff);
      // console.log('index='+index+'; color=' + colorInt + "; " + new Number(colorInt).toString(16));
      // this.source[index].color_css = colorInt;
      this.setState({value})

      this.triggerChange(value)
    }
  }
}