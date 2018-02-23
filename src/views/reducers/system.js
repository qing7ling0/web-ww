'use strict';

import * as ActionTypes from '../constants/ActionTypes';
import { States } from '../../base/modules/ReduxState'
import results from './results'
import baseUtils from '../../base/utils/utils'
import * as constants from '../constants/Constants'

const LOADING_ACTIONS = [
  ActionTypes.ADMIN_ACCOUNT_ADD,
  ActionTypes.ADMIN_ACCOUNT_DELETE,
  ActionTypes.ADMIN_ACCOUNT_UPDATE,
  ActionTypes.ADMIN_LIST_GET
];

const initialState = {
  loading:false,
  result: {code:0, message:'', type:0},
  adminList: [],
  adminListPage: {page:0,pageSize:constants.DEFAULT_PAGE_SIZE,total:0},
  adminDeleteIDS: [],
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
    case ActionTypes.ADMIN_LIST_GET:
        if (action.state === States.Fulfilled && result.code === 0) {
          return createState(state, resState, {adminList:data.adminList.list, adminListPage:data.adminList.page});
        }
      break;

    case ActionTypes.ADMIN_ACCOUNT_DELETE:
      if (action.state === States.Fulfilled && result.code === 0) {
        return createState(state, resState, {adminDeleteIDS:data.deleteAdmin});
      }
      break;

    default:
      break;
  }
  return createState(state, resState);
}

const system = (state = initialState, action) => {
    return doActions(state, action);
}
export default system;