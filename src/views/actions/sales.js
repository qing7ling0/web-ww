import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import config from '../constants/Config.js';
import netHandler from '../modules/NetHandler'
import * as graphqlTypes from '../modules/graphqlTypes'
import * as orderTypes from '../modules/orderTypes'

export const getGoodsShoesList = createAction(types.GOODS_SHOES_LIST_GET, netHandler.getGoodsShoesList);
export const addGoodsShoes = createAction(types.GOODS_SHOES_ADD, netHandler.addGoodsShoes);
export const updateGoodsShoes = createAction(types.GOODS_SHOES_UPDATE, netHandler.updateGoodsShoes);
export const deleteGoodsShoes = createAction(types.GOODS_SHOES_DELETE, netHandler.deleteGoodsShoes);
export const getGoodsShoesProfile = createAction(types.GOODS_SHOES_PROFILE_GET, (id) => {
  return netHandler.getDefaultProfile('goodsShoesProfile', graphqlTypes.goodsShoesType, id);
});
export const getGoodsBaseDatas = createAction(types.GOODS_BASE_DATAS, netHandler.getGoodsBaseDatas);

export const getSalesBaseList = createAction(types.SALES_LIST_GET, (tag, conditions) => {
  return netHandler.getDefaultList(tag, graphqlTypes.salesBaseType, conditions);
})
export const addSalesBase = createAction(types.SALES_ADD, (tag, data) => {
  return netHandler.addDefault(tag, graphqlTypes.salesBaseType, data);
})
export const deleteSalesBase = createAction(types.SALES_DELETE, (tag, ids) => {
  return netHandler.deleteDefault(tag, ids);
})
export const updateSalesBase = createAction(types.SALES_UPDATE, (tag, id, data) => {
  return netHandler.updateDefault(tag, id, data);
})

export const getMaterialList = createAction(types.MATERIAL_LIST_GET, (conditions) => {
  return netHandler.getDefaultList('materialList', graphqlTypes.materialType, conditions);
})
export const addMaterial = createAction(types.MATERIAL_ADD, (data) => {
  return netHandler.addDefault('material', graphqlTypes.materialType, data);
})
export const deleteMaterial = createAction(types.MATERIAL_DELETE, (ids) => {
  return netHandler.deleteDefault('material', ids);
})
export const updateMaterial = createAction(types.MATERIAL_UPDATE, (id, data) => {
  return netHandler.updateDefault('material', id, data);
})

// 保养价格
export const getMaintainList = createAction(types.MAINTAIN_LIST_GET, (conditions) => {
  return netHandler.getDefaultList('maintainPriceList', graphqlTypes.maintainType, conditions);
})
export const addMaintain = createAction(types.MAINTAIN_ADD, (data) => {
  return netHandler.addDefault('maintainPrice', graphqlTypes.maintainType, data);
})
export const deleteMaintain = createAction(types.MAINTAIN_DELETE, (ids) => {
  return netHandler.deleteDefault('maintainPrice', ids);
})
export const updateMaintain = createAction(types.MAINTAIN_UPDATE, (id, data) => {
  return netHandler.updateDefault('maintainPrice', id, data);
})

// 订单
export const getOrderList = createAction(types.ORDER_LIST_GET, (query, conditions, page) => {
  return netHandler.getDefaultList(query, orderTypes.orderType, conditions, page?page.page:-1, page?page.pageSize:0);
})
export const addOrder = createAction(types.ORDER_ADD, (query, data) => {
  return netHandler.addDefault(query, orderTypes.orderType, data);
})
export const deleteOrder = createAction(types.ORDER_DELETE, (query, ids) => {
  return netHandler.deleteDefault(query, ids);
})
export const updateOrder = createAction(types.ORDER_UPDATE, (query, id, data) => {
  return netHandler.updateDefault(query, id, data);
})
export const getLastCustomerOrderInfo = createAction(types.LAST_CUSTOMER_ORDER_INFO, (tag, query, id) => {
  return netHandler.getLastCustomerOrderInfo(query, orderTypes.orderType, id);
})