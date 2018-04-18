'use strict';

import * as ActionTypes from '../constants/ActionTypes';
import { States } from '../../base/modules/ReduxState'
import results from './results'
import baseUtils from '../../base/utils/utils'
import * as constants from '../constants/Constants'
import * as common from '../modules/common'

const LOADING_ACTIONS = [
  ActionTypes.CUSTOMER_ADD,
  ActionTypes.CUSTOMER_DELETE,
  ActionTypes.CUSTOMER_UPDATE,
  ActionTypes.CUSTOMER_LIST_GET,

  ActionTypes.CUSTOMER_GUIDE_ADD,
  ActionTypes.CUSTOMER_GUIDE_DELETE,
  ActionTypes.CUSTOMER_GUIDE_UPDATE,
  ActionTypes.CUSTOMER_GUIDE_LIST_GET,
  ActionTypes.CUSTOMER_PROFILE_GET,
  
  ActionTypes.VIP_FOOT_LIST,
  ActionTypes.VIP_FOOT_PROFILE,
  ActionTypes.VIP_ORDER_LIST,
  ActionTypes.VIP_ORDER_UPDATE,
];

const initialState = {
  loading:false,
  result: {code:0, message:'', type:0},

  customerList: [],
  customerListPage: {page:0,pageSize:constants.DEFAULT_PAGE_SIZE,total:0},
  customerDeleteIDS: [],

  customerGuideList: [],
  customerGuideListPage: {page:0,pageSize:constants.DEFAULT_PAGE_SIZE,total:0},
  customerGuideDeleteIDS: [],

  customerVipFooterProfile: null,
  customerVipFooterList: [],
  customerVipFooterListPage: {page:1,pageSize:constants.DEFAULT_PAGE_SIZE,total:0},

  customerVipFooterOrderList: [],
  customerVipFooterOrderListPage: {page:1,pageSize:constants.DEFAULT_PAGE_SIZE,total:0},
  customerVipFooterOrderUpdateIDS: []  
};

function createState(state, resState, values) {
  return Object.assign({}, state, resState, values);
}

function doActions(state, action) {
  let result = {}
  let data = {}
  if (action && action.payload) {
    result = action.payload;
    if (result && result.data) {
        data = result.data;
    }
  }
  result = result || {code:0, message:''};
  let resState = {loading:false, result:{...result, type:action.type}}
  if (action.type && LOADING_ACTIONS.indexOf(action.type) !== -1) {
    if (action.state === States.Fulfilled) {
      resState.loading = false;
    } else if (action.state === States.Padding) {
      resState.loading = true;
    }
  }

  switch (action.type) {
    case ActionTypes.CUSTOMER_LIST_GET:
      if (action.state === States.Fulfilled && result.code === 0) {
        return createState(state, resState, {customerList:data.customerList.list, customerListPage:data.customerList.page});
      }
      break;
    case ActionTypes.CUSTOMER_DELETE:
      if (action.state === States.Fulfilled && result.code === 0) {
        return createState(state, resState, {customerDeleteIDS:data.deleteCustomer});
      }
      break;

    case ActionTypes.CUSTOMER_GUIDE_LIST_GET:
      if (action.state === States.Fulfilled && result.code === 0) {
        return createState(state, resState, {customerGuideList:data.customerGuideList.list, customerGuideListPage:data.customerGuideList.page});
      }
      break;
    case ActionTypes.CUSTOMER_GUIDE_DELETE:
      if (action.state === States.Fulfilled && result.code === 0) {
        return createState(state, resState, {customerGuideDeleteIDS:data.deleteCustomerGuide});
      }
      break;
    case ActionTypes.LAST_CUSTOMER_ORDER_INFO:
    case ActionTypes.CUSTOMER_PROFILE_GET:
      if (action.state === States.Fulfilled && result.code === 0) {
        return createState(state, resState, {...data});
      }
      break;
      
    case ActionTypes.VIP_FOOT_LIST:
    case ActionTypes.VIP_ORDER_LIST:
      if (action.state === States.Fulfilled && result.code === 0) {
        let list = common.getDefaultListResponse(data);
        return createState(state, resState, list);
      }
      break;
    case ActionTypes.VIP_ORDER_UPDATE:
      if (action.state === States.Fulfilled && result.code === 0) {
        return createState(state, resState, {customerVipFooterOrderUpdateIDS:data.customerVipFooterOrderUpdate});
      }
    break;
    case ActionTypes.VIP_FOOT_PROFILE:
      if (action.state === States.Fulfilled && result.code === 0) {
        return createState(state, resState, {customerVipFooterProfile:data.customerVipFooterProfile});
      }
    break;
    default:
      break;
  }
  return createState(state, resState);
}

const customer = (state = initialState, action) => {
    return doActions(state, action);
}
export default customer;