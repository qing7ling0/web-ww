import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import config from '../constants/Config.js';
import netHandler from '../modules/NetHandler'
import * as graphqlTypes from '../modules/graphqlTypes'
import * as orderTypes from '../modules/orderTypes'

export const getCustomerList = createAction(types.CUSTOMER_LIST_GET, netHandler.getCustomerList);
export const addCustomer = createAction(types.CUSTOMER_ADD, netHandler.addCustomer);
export const updateCustomer = createAction(types.CUSTOMER_UPDATE, netHandler.updateCustomer);
export const deleteCustomer = createAction(types.CUSTOMER_DELETE, netHandler.deleteCustomer);
export const lastCustomerOrderInfo = createAction(types.LAST_CUSTOMER_ORDER_INFO, (id, orderType, tag)=>{
  tag = tag || 'lastCunstomerOrderInfo';
  return netHandler.getLastCustomerOrderInfo(id, orderType, tag, orderTypes.subOrderType)
});

