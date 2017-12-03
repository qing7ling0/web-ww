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
`