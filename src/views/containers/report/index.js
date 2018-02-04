import React, { Component } from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom'

import ReportContainer from './report/index'

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
  (<Redirect 
    key={constants.MENU_IDS.report} 
    from={common.findRouterById(config.Routers, constants.MENU_IDS.report).url} 
    to={common.findRouterById(config.Routers, constants.MENU_IDS.reportTable).url}
  />)
]