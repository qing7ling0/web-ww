import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import config from '../constants/Config.js';
import netHandler from '../modules/NetHandler'

export const getCustomerList = createAction(types.CUSTOMER_LIST_GET, netHandler.getCustomerList);
export const addCustomer = createAction(types.CUSTOMER_ADD, netHandler.addCustomer);
export const updateCustomer = createAction(types.CUSTOMER_UPDATE, netHandler.updateCustomer);
export const deleteCustomer = createAction(types.CUSTOMER_DELETE, netHandler.deleteCustomer);

