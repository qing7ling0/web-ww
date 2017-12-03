import styled from 'styled-components'

import {
  Card,
  Input,
  Button,
  Row,
  Col,
} from 'antd'

export const Root = styled.div`
`
export const Container = styled.div`
  display: inline-block;
  vertical-align: middle;
`
export const LoginCard = styled(Card)`
  width: 3.5rem;
  padding: 0.3rem 0.2rem;
  margin-bottom: 1rem;
`

export const LoginInput = styled(Input)`
  margin: 0.06rem 0;
  border-radius: 0;
  > input {
    border-radius: 0;
  }
`

export const BtnLogin = styled(Button)`
  margin: 0.15rem 0 0.1rem 0;
  width: 100%;
  border-radius: 0;
`