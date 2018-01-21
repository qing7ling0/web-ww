import React, { Component } from 'react';
import {HashRouter,Route, Redirect} from 'react-router-dom'

import MaterialContainer from './material/index'
import GoodsContainer from './goods/index'
import CommonContainer from './common/index'
import MaintainContainer from './maintain/index'
import OrderContainer from './order/index'
import SampleGoodsContainer from './sample/index'

import * as config from '../../constants/Config'
import * as constants from '../../constants/Constants'
import * as common from '../../modules/common'

export default [
  (<Route 
    key={constants.MENU_IDS.salesItems} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.salesItems).url} 
    strict={true}
    component={GoodsContainer}
  />),
  (<Route 
    key={constants.MENU_IDS.salesOrder} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.salesOrder).url} 
    strict={true}
    component={OrderContainer}
  />),
  (<Route 
    key={constants.MENU_IDS.salesMaterial} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.salesMaterial).url} 
    strict={true}
    component={MaterialContainer}
  />),
  (<Route 
    key={constants.MENU_IDS.salesItemsBase} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.salesItemsBase).url} 
    strict={true}
    component={CommonContainer}
  />),
  (<Route 
    key={constants.MENU_IDS.salesSampleGoods} 
    path={common.findRouterById(config.Routers, constants.MENU_IDS.salesSampleGoods).url} 
    strict={true}
    component={SampleGoodsContainer}
  />),
  (<Redirect 
    key={constants.MENU_IDS.sales} 
    from={common.findRouterById(config.Routers, constants.MENU_IDS.sales).url} 
    to={common.findRouterById(config.Routers, constants.MENU_IDS.salesItems).url}
  />)
]