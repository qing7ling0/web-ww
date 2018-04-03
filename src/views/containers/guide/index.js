import React, { Component } from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom'

import WorkContainer from './work/index'

import * as config from '../../constants/Config'
import * as constants from '../../constants/Constants'
import * as common from '../../modules/common'

export default [
  (<Route 
    key={constants.MENU_IDS.userWork} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.userWork).url} 
    strict={true}
    component={WorkContainer}
  />),
  (<Redirect 
    key={constants.MENU_IDS.user} 
    from={common.findRouterById(config.Routers, constants.MENU_IDS.user).url} 
    to={common.findRouterById(config.Routers, constants.MENU_IDS.userWork).url}
  />)
]