import React, { Component } from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom'

import * as config from '../../constants/Config'
import * as constants from '../../constants/Constants'
import * as common from '../../modules/common'

import system from '../system/index'
import shop from '../shop/index'
import customer from '../customer/index'
import sales from '../sales/index'
import activity from '../activity/index'
import report from '../report/index'
import guide from '../guide/index'

let routers = [];

export default routers
  .concat(system)
  .concat(shop)
  .concat(customer)
  .concat(sales)
  .concat(activity)
  .concat(report)
  .concat(guide)