import React, { Component } from 'react';
import {HashRouter,Route, Redirect} from 'react-router-dom'

import ShopListContainer from './shop/ShopListContainer'
import GuideListContainer from './guide/guideListContainer'

import * as config from '../../constants/Config'
import * as constants from '../../constants/Constants'
import * as common from '../../modules/common'

export default [
  (<Route 
    key={constants.MENU_IDS.shopInfo} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.shopInfo).url} 
    exact={true} strict={true}
    component={ShopListContainer}
  />),
  (<Route 
    key={constants.MENU_IDS.shopGuide} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.shopGuide).url} 
    exact={true} strict={true}
    component={GuideListContainer}
  />),
  (<Redirect 
    key={constants.MENU_IDS.shop} 
    from={common.findRouterById(config.Routers, constants.MENU_IDS.shop).url} 
    to={common.findRouterById(config.Routers, constants.MENU_IDS.shopInfo).url}
  />)
]