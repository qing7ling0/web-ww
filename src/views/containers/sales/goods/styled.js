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
export const UploadIconContainer = styled.div`
  position:relative; 
  width:100px;
  height:75px;
`
export const UploadIcon = styled.img`
  position:absolute; 
  max-width:98px;
  max-height:71px;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
`