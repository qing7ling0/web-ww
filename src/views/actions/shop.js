import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import config from '../constants/Config.js';
import netHandler from '../modules/NetHandler'

export const getShopList = createAction(types.SHOP_LIST_GET, netHandler.getShopList);
export const addShop = createAction(types.SHOP_ADD, netHandler.addShop);
export const updateShop = createAction(types.SHOP_UPDATE, netHandler.updateShop);
export const deleteShop = createAction(types.SHOP_DELETE, netHandler.deleteShop);

export const getShopGuideList = createAction(types.SHOP_GUIDE_LIST_GET, netHandler.getShopGuideList);
export const addShopGuide = createAction(types.SHOP_GUIDE_ADD, netHandler.addShopGuide);
export const updateShopGuide = createAction(types.SHOP_GUIDE_UPDATE, netHandler.updateShopGuide);
export const deleteShopGuide = createAction(types.SHOP_GUIDE_DELETE, netHandler.deleteShopGuide);
