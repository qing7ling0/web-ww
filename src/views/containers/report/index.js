import React, { Component } from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom'

import ReportContainer from './report/index'
import VipFootContainer from './vip-foot/index'

import * as config from '../../constants/Config'
import * as constants from '../../constants/Constants'
import * as common from '../../modules/common'

export default [
  (<Route 
    key={constants.MENU_IDS.reportTable} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.reportTable).url} 
    strict={true}
    component={ReportContainer}
  />),
  (<Route 
    key={constants.MENU_IDS.reportTableVip} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.reportTableVip).url} 
    strict={true}
    component={VipFootContainer}
  />),
  (<Redirect 
    key={constants.MENU_IDS.report} 
    from={common.findRouterById(config.Routers, constants.MENU_IDS.report).url} 
    to={common.findRouterById(config.Routers, constants.MENU_IDS.reportTable).url}
  />)
]