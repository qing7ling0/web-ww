import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import config from '../constants/Config.js';
import netHandler from '../modules/NetHandler'
import * as graphqlTypes from '../modules/graphqlTypes'
import * as constants from '../constants/Constants.js';

export const getUserList = createAction(types.USER_LIST_GET, netHandler.getUserList);
export const addUser = createAction(types.USER_ACCOUNT_ADD, netHandler.addUser);
export const updateUser = createAction(types.USER_ACCOUNT_UPDATE, netHandler.updateUser);
export const deleteUser = createAction(types.USER_ACCOUNT_DELETE, netHandler.deleteUser);

export const getAppVersionList = createAction(types.APP_VERSION_LIST_GET, (conditions, pageIndex=1, pageSize=constants.DEFAULT_PAGE_SIZE) => {
  return netHandler.getDefaultList("appVersionList", graphqlTypes.appVersionType, conditions);
})
export const appVersionAdd = createAction(types.APP_VERSION_ADD, (data) => {
  return netHandler.addDefault("appVersion", graphqlTypes.appVersionType, data);
})
export const appVersionDelete = createAction(types.APP_VERSION_DELETE, (ids) => {
  return netHandler.deleteDefault("appVersion", ids);
})
export const appVersionUpdate = createAction(types.APP_VERSION_UPDATE, (id, data) => {
  return netHandler.updateDefault("appVersion", id, data);
})