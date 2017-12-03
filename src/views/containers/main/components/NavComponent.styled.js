import styled from 'styled-components'
import { Layout, Row, Col, Menu, Icon } from 'antd';
const { Sider, Header } = Layout;
const { SubMenu } = Menu;

export const Root = styled.div`
  background-color: #181d20;
`
export const HeaderContainer = styled(Header)`
  text-align: center;
  font-size: 0.2rem;
  font-weight: 600;
  color: #ccc;
  padding: 0;
  background-color: #181d20;
`
export const HeaderTitle = styled.h1`

`


export const MenuContainer = styled(Menu)`
  background-color: #181d20;
`
export const MenuTitle = styled.span`
  font-size: 0.15rem;
  font-weight: 700;
`
export const MenuSubTitle = styled.span`
  font-size: 0.13rem;
`
export const SubMenuContainer = styled(SubMenu)`
  border: 0 solid #aaa;
  border-bottom: 2px;
`