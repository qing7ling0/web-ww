import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import config from '../constants/Config.js';
import netHandler from '../modules/NetHandler'

export const getAdminList = createAction(types.ADMIN_LIST_GET, netHandler.getAdminList);
export const addAdmin = createAction(types.ADMIN_ACCOUNT_ADD, netHandler.addAdmin);
export const updateAdmin = createAction(types.ADMIN_ACCOUNT_UPDATE, netHandler.updateAdmin);
export const deleteAdmin = createAction(types.ADMIN_ACCOUNT_DELETE, netHandler.deleteAdmin);
