import React, { Component } from 'react';
import {HashRouter,Route, Redirect} from 'react-router-dom'

import SettingContainer from './SettingContainer'
import AdminsContainer from './admin/AdminsContainer'

import * as config from '../../constants/Config'
import * as constants from '../../constants/Constants'
import * as common from '../../modules/common'

export default [
  (<Route 
    key={constants.MENU_IDS.systemAdmin} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.systemAdmin).url} 
    exact={true} strict={true}
    component={AdminsContainer}
  />),
  (<Route 
    key={constants.MENU_IDS.systemSetting} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.systemSetting).url} 
    exact={true} strict={true}
    component={SettingContainer}
  />),
  (<Redirect 
    key={constants.MENU_IDS.system} 
    from={common.findRouterById(config.Routers, constants.MENU_IDS.system).url} 
    to={common.findRouterById(config.Routers, constants.MENU_IDS.systemAdmin).url}
  />)
]