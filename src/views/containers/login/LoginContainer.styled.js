import styled from 'styled-components'

import {
  Card,
  Input,
  Button,
  Row,
  Col,
} from 'antd'

export const Root = styled.div`
  position: absolute; 
  text-align: center;
  width: 100%;
  height: 100%;
  &:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
`
export const Container = styled.div`
  display: inline-block;
  vertical-align: middle;
`
export const LoginCard = styled(Card)`
  width: 350px;
  padding: 30px 20px;
  margin-bottom: 10rem;
`

export const LoginInput = styled(Input)`
  margin: 6px 0;
  border-radius: 0;
  > input {
    border-radius: 0;
  }
`

export const BtnLogin = styled(Button)`
  margin: 15px 0 10px 0;
  width: 100%;
  border-radius: 0;
`