import styled from 'styled-components'

import {
  Card,
  Input,
  Button,
  Row,
  Col,
  Select,
  Spin,
  Steps
} from 'antd'

const Search = Input.Search;

export const Root = styled.div`
`
export const Container = styled.div`
  display: inline-block;
  vertical-align: middle;
`
export const ProfileCol = styled(Col)`
  padding: 0.08rem 0 0.08rem 0;
`
export const ProfileColLabel = styled.span`
  font-size:0.14rem;
  font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color:rgba(0, 0, 0, 1);
  width:30%;
`
export const ProfileColValue = styled.span`
  font-size:0.14rem;
  font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color:rgba(0, 0, 0, 0.65);
  width:70%;
`
export const ProfileRowTitle = styled.span`
  font-size:0.18rem;
  font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color:rgba(0, 0, 0, 1);
`
export const ProfileBtnBack = styled.span`
  float:right;
`
export const Loading = styled(Spin)`
  margin:0 auto;
`
export const ButtonOp = styled(Button)`
  margin-right: 0.08rem;
`
export const SearchContainer = styled.div`
  margin: 0.2rem 0 0 0;
`
export const SearchInput = styled(Search)`
  width: 1.6rem;
  margin-right: 0.15rem;
`
export const SelectInput = styled(Select)`
  width: 1.6rem;
  margin-right: 0.15rem;
`

export const NextContainer = styled.div`
  width:100%;
  padding:0.2rem 0;
  text-align:center;
`
export const BtnNext = styled(Button)`
  display:inline;
  margin: 0 0.15rem;
`
export const OrderSteps = styled(Steps)`
  margin: 0.2rem 0.2rem;
`
export const OrderStepContent = styled.div`
  padding: 0.2rem;
`