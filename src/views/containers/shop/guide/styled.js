import styled from 'styled-components'

import {
  Card,
  Input,
  Button,
  Row,
  Col,
  Select
} from 'antd'

export const Root = styled.div`
`
export const Container = styled.div`
  display: inline-block;
  vertical-align: middle;
`
export const SearchContainer = styled.div`

`
export const SearchInput = styled(Input.Search)`
  width: 2rem;
  margin-right: 10px;
`
export const SearchSelect = styled(Select)`
  min-width: 2rem;
`