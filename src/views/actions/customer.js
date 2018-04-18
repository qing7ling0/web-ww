import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import config from '../constants/Config.js';
import * as constants from '../constants/Constants.js';
import netHandler from '../modules/NetHandler'
import * as graphqlTypes from '../modules/graphqlTypes'
import * as orderTypes from '../modules/orderTypes'

export const getCustomerList = createAction(types.CUSTOMER_LIST_GET, netHandler.getCustomerList);
export const addCustomer = createAction(types.CUSTOMER_ADD, netHandler.addCustomer);
export const updateCustomer = createAction(types.CUSTOMER_UPDATE, netHandler.updateCustomer);
export const deleteCustomer = createAction(types.CUSTOMER_DELETE, netHandler.deleteCustomer);
export const getCustomer = createAction(types.CUSTOMER_PROFILE_GET, (id) => {
  return netHandler.getDefaultProfile('customerProfile', graphqlTypes.customerType, id);
});
export const lastCustomerOrderInfo = createAction(types.LAST_CUSTOMER_ORDER_INFO, (id, orderType, tag)=>{
  tag = tag || 'lastCunstomerOrderInfo';
  return netHandler.getLastCustomerOrderInfo(id, orderType, tag, orderTypes.subOrderType)
});

export const getVipFootList = createAction(types.VIP_FOOT_LIST, (conditions, page) => {
  return netHandler.getDefaultList("customerVipFooterList", graphqlTypes.customerReportVipType, conditions, page?page.page:1, page?page.pageSize:constants.DEFAULT_PAGE_SIZE);
})
export const getVipFootProfile = createAction(types.VIP_FOOT_PROFILE, (id) => {
  return netHandler.getDefaultProfile("customerVipFooterProfile", graphqlTypes.customerReportVipType, id);
})
export const getVipFootOrderList = createAction(types.VIP_ORDER_LIST, (conditions, page) => {
  return netHandler.getDefaultList("customerVipFooterOrderList", graphqlTypes.customerReportVipFootOrderType, conditions, page?page.page:1, page?page.pageSize:constants.DEFAULT_PAGE_SIZE);
})
export const vipFooterOrderUpdate = createAction(types.VIP_ORDER_UPDATE, (id, data) => {
  return netHandler.updateDefault("customerVipFooterOrder", id, data, '');
})

// export const 