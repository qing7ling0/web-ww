import React, { Component } from 'react';
import {HashRouter,Route, Redirect} from 'react-router-dom'

import CustomerContainer from './info/index'
import CustomerTagsContainer from './tags/index'

import * as config from '../../constants/Config'
import * as constants from '../../constants/Constants'
import * as common from '../../modules/common'

export default [
  (<Route 
    key={constants.MENU_IDS.customerInfo} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.customerInfo).url} 
    exact={true} strict={true}
    component={CustomerContainer}
  />),
  (<Route 
    key={constants.MENU_IDS.customerTags} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.customerTags).url} 
    exact={true} strict={true}
    component={CustomerTagsContainer}
  />),
  (<Redirect 
    key={constants.MENU_IDS.customer} 
    from={common.findRouterById(config.Routers, constants.MENU_IDS.customer).url} 
    to={common.findRouterById(config.Routers, constants.MENU_IDS.customerInfo).url}
  />)
]