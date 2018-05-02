import React, { Component } from 'react';
import {HashRouter,Route, Redirect} from 'react-router-dom'

import SettingContainer from './SettingContainer'
import AdminsContainer from './admin/AdminsContainer'
import AppContainer from './app/AppContainer'

import * as config from '../../constants/Config'
import * as constants from '../../constants/Constants'
import * as common from '../../modules/common'

export default [
  (<Route 
    key={constants.MENU_IDS.systemAdmin+"/:type"} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.systemAdmin).url+"/:type"} 
    exact={true} strict={true}
    component={AdminsContainer}
  />),
  (<Route 
    key={constants.MENU_IDS.systemSetting} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.systemSetting).url} 
    exact={true} strict={true}
    component={SettingContainer}
  />),
  (<Route 
    key={constants.MENU_IDS.appAdmin} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.appAdmin).url} 
    exact={true} strict={true}
    component={AppContainer}
  />),
  (<Redirect 
    key={constants.MENU_IDS.system} 
    from={common.findRouterById(config.Routers, constants.MENU_IDS.system).url} 
    to={common.findRouterById(config.Routers, constants.MENU_IDS.systemAdmin).url+"/admins"}
  />)
]