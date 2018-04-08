'use strict';

import * as ActionTypes from '../constants/ActionTypes';
import { States } from '../../base/modules/ReduxState'
import results from './results'
import baseUtils from '../../base/utils/utils'
import * as constants from '../constants/Constants'

const LOADING_ACTIONS = [
  ActionTypes.SHOP_ADD,
  ActionTypes.SHOP_DELETE,
  ActionTypes.SHOP_UPDATE,
  ActionTypes.SHOP_LIST_GET,

  ActionTypes.SHOP_GUIDE_ADD,
  ActionTypes.SHOP_GUIDE_DELETE,
  ActionTypes.SHOP_GUIDE_UPDATE,
  ActionTypes.SHOP_GUIDE_PROFILE,
  ActionTypes.SHOP_GUIDE_LIST_GET,
];

const initialState = {
  loading:false,
  result: {code:0, message:'', type:0},
  shopList: [],
  shopListPage: {page:0,pageSize:constants.DEFAULT_PAGE_SIZE,total:0},
  shopDeleteIDS: [],

  shopGuideList: [],
  shopGuideListPage: {page:0,pageSize:constants.DEFAULT_PAGE_SIZE,total:0},
  shopGuideDeleteIDS: [],
  shopGuideProfile: null
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
    case ActionTypes.SHOP_LIST_GET:
      if (action.state === States.Fulfilled && result.code === 0) {
        return createState(state, resState, {shopList:data.shopList.list, shopListPage:data.shopList.page});
      }
      break;
    case ActionTypes.SHOP_DELETE:
      if (action.state === States.Fulfilled && result.code === 0) {
        return createState(state, resState, {shopDeleteIDS:data.deleteShop});
      }
      break;

    case ActionTypes.SHOP_GUIDE_LIST_GET:
      if (action.state === States.Fulfilled && result.code === 0) {
        return createState(state, resState, {shopGuideList:data.shopGuideList.list, shopGuideListPage:data.shopGuideList.page});
      }
      break;
      case ActionTypes.SHOP_GUIDE_DELETE:
        if (action.state === States.Fulfilled && result.code === 0) {
          return createState(state, resState, {shopGuideDeleteIDS:data.deleteShopGuide});
        }
        break;
      case ActionTypes.SHOP_GUIDE_PROFILE:
        if (action.state === States.Fulfilled && result.code === 0) {
          return createState(state, resState, {shopGuideProfile:data.userProfile});
        }
          break;
    default:
      break;
  }
  return createState(state, resState);
}

const shop = (state = initialState, action) => {
    return doActions(state, action);
}
export default shop;