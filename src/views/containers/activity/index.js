import React, { Component } from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom'

import RechargeContainer from './recharge/index'
import VIPContainer from './vip/index'
import DiscountContainer from './discount/index'

import * as config from '../../constants/Config'
import * as constants from '../../constants/Constants'
import * as common from '../../modules/common'

export default [
  (<Route 
    key={constants.MENU_IDS.activityRecharge} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.activityRecharge).url} 
    strict={true}
    component={RechargeContainer}
  />),
  (<Route 
    key={constants.MENU_IDS.activityVIP} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.activityVIP).url} 
    strict={true}
    component={VIPContainer}
  />),
  (<Route 
    key={constants.MENU_IDS.activityDiscount} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.activityDiscount).url} 
    strict={true}
    component={DiscountContainer}
  />),
  (<Redirect 
    key={constants.MENU_IDS.activity} 
    from={common.findRouterById(config.Routers, constants.MENU_IDS.activity).url} 
    to={common.findRouterById(config.Routers, constants.MENU_IDS.activityRecharge).url}
  />)
]