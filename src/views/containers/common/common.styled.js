import styled from 'styled-components'
import { Form, Input, InputNumber, Radio, Slider, Upload, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

export const NormalForm = styled(Form)`
  margin: 0 auto;
`

export const FormItemLabel = styled.span`
  font-size: 2rem;
  font-weight: 500;
  color: #000;
  line-height: 1;
  width: auto;
  height: auto;
`
export const FormItemNormal = styled(Form.Item)`
  margin: 0.2rem;
  font-size: 0.2rem;
  font-weight: 500;
  color: #000;
  ${props => props.labelLeft ? 'div {text-align:left;}' : ''}
`

export const ContentTitle = styled.div`
  width: 100%;
  padding: 0.15rem;
  font-size: 0.16rem;
  text-align:left;
  border-bottom: 1px solid #e9e9e9;
`