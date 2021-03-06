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
  padding: 0.08rem 0.2rem;
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

  .ant-select:only-child{
    display:inline-block;
  }
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
export const OrderSuccessContainer = styled.div`
  height:2rem;
  width:100%;
  text-align:center;
`
export const OrderSuccessTitle = styled.span`
  font-size:0.4rem;
  line-height:1.5rem;
  width:60%;
  color:red;
  margin:0 auto;
`
export const PhotoUploadBtnCotnainer = styled.div`
  position: absolute;
  left:50%;
  top:50%;
  transform:translate(-50%, -50%);
`
export const PhotoDeleteBtn = styled(Button)`
  position: absolute;
  right:0;
  top:0;
`

export const GridBorder = styled.table`
  border:1px solid rgb(232, 232, 232);
`
export const GridRow = styled.tr`
  border-top:1px solid rgb(232, 232, 232);
  &:first-child {
    border-top: 0px;
  }
`
export const GridCol = styled.td`
  width:${props=>`${(props.width*100/24)}%`};
  border-left:1px solid rgb(232, 232, 232);
  &:first-child {
    border-left: 0px;
  }
  padding: 16px;
`

export const GoodsCard = styled(Card) `
  .ant-card-head {
    padding:0;
  }
`