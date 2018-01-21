import styled from 'styled-components'

import {
  Card,
  Input,
  Button,
  Row,
  Col,
  Select,
  Spin
} from 'antd'

export const Root = styled.div`
`
export const Container = styled.div`
  display: inline-block;
  vertical-align: middle;
`
export const ProfileCol = styled(Col)`
  padding: 0 0 0.16rem 0;
`
export const ProfileColLabel = styled.span`
  font-size:0.14rem;
  font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color:rgba(0, 0, 0, 1);
`
export const ProfileColValue = styled.span`
  font-size:0.14rem;
  font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color:rgba(0, 0, 0, 0.65);
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