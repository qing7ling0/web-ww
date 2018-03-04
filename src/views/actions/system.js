import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import config from '../constants/Config.js';
import netHandler from '../modules/NetHandler'

export const getUserList = createAction(types.USER_LIST_GET, netHandler.getUserList);
export const addUser = createAction(types.USER_ACCOUNT_ADD, netHandler.addUser);
export const updateUser = createAction(types.USER_ACCOUNT_UPDATE, netHandler.updateUser);
export const deleteUser = createAction(types.USER_ACCOUNT_DELETE, netHandler.deleteUser);
