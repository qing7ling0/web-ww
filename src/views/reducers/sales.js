'use strict';

import * as ActionTypes from '../constants/ActionTypes';
import { States } from '../../base/modules/ReduxState'
import results from './results'
import baseUtils from '../../base/utils/Utils'

const LOADING_ACTIONS = [
  ActionTypes.GOODS_SHOES_ADD,
  ActionTypes.GOODS_SHOES_DELETE,
  ActionTypes.GOODS_SHOES_UPDATE,
  ActionTypes.GOODS_SHOES_LIST_GET,
  ActionTypes.GOODS_SHOES_PROFILE_GET,
  ActionTypes.SALES_ADD,
  ActionTypes.SALES_DELETE,
  ActionTypes.SALES_UPDATE,
  ActionTypes.SALES_LIST_GET,

  ActionTypes.MATERIAL_ADD,
  ActionTypes.MATERIAL_DELETE,
  ActionTypes.MATERIAL_UPDATE,
  ActionTypes.MATERIAL_LIST_GET,

  ActionTypes.ORDER_ADD,
  ActionTypes.ORDER_DELETE,
  ActionTypes.ORDER_UPDATE,
  ActionTypes.ORDER_LIST_GET,
  ActionTypes.ORDER_PROFILE_GET,
];

const initialState = {
  loading:false,
  result: {code:0, message:'', type:0},
  goodsShoesList: [],
  goodsShoesListPage: {page:0,pageSize:0,total:0},
  goodsShoesDeleteIDS: [],
  goodsShoesProfile:{},
  goodsTypeList: [],
  goodsStyleList: [],
  goodsSeasonList: [],
  goodsXuanhaoList: [],
  outColorList: [],
  inColorList: [],
  bottomColorList: [],
  bottomSideColorList: [],
  materialList: [],
  materialColorList: [],
  materialDeleteIDS: [],
  maintainPriceList: [],
  maintainPriceDeleteIDS: [],
  orderList:[],
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
    case ActionTypes.GOODS_SHOES_LIST_GET:
      if (action.state === States.Fulfilled && result.code === 0) {
        return createState(state, resState, {goodsShoesList:data.goodsShoesList.list, goodsShoesListPage:data.goodsShoesList.page});
      }
      break;
    case ActionTypes.GOODS_SHOES_DELETE:
      if (action.state === States.Fulfilled && result.code === 0) {
        return createState(state, resState, {goodsShoesDeleteIDS:data.deleteCustomer});
      }
      break;
      
    case ActionTypes.GOODS_SHOES_PROFILE_GET:
      if (action.state === States.Fulfilled && result.code === 0) {
        return createState(state, resState, {goodsShoesProfile:data.goodsShoesProfile});
      }
    break;

    case ActionTypes.ORDER_LIST_GET:
      if (action.state === States.Fulfilled && result.code === 0) {
        let list = {};
        for(let key in data) {
          if (key.indexOf('List') !== -1) {
            list[key] = data[key].list;
            list[key+'Page'] = data[key].page;
          }
        }
        return createState(state, resState, list);
      }
      break;
    case ActionTypes.ORDER_DELETE:
      if (action.state === States.Fulfilled && result.code === 0) {
        let deleteIDS = 0;
        for(let key in data) {
          if (key.indexOf('Remove') !== -1) {
            deleteIDS = data[key];
          }
        }
        return createState(state, resState, {orderDeleteIDS:deleteIDS});
      }
      break;
      
    case ActionTypes.ORDER_PROFILE_GET:
      if (action.state === States.Fulfilled && result.code === 0) {
        let profile = 0;
        for(let key in data) {
          if (key.indexOf('Profile') !== -1) {
            profile = data[key];
          }
        }
        return createState(state, resState, {orderProfile:profile});
      }
    break;

    case ActionTypes.SALES_LIST_GET:
      if (action.state === States.Fulfilled && result.code === 0) {
        let list = {};
        for(let key in data) {
          if (key.indexOf('List') !== -1) {
            list[key] = data[key].list;
            list[key+'Page'] = data[key].page;
          }
        }
        return createState(state, resState, list);
      }
      break;
    case ActionTypes.SALES_DELETE:
      if (action.state === States.Fulfilled && result.code === 0) {
        let deleteIDS = 0;
        for(let key in data) {
          if (key.indexOf('Remove') !== -1) {
            deleteIDS = data[key];
          }
        }
        return createState(state, resState, {goodsBaseDeleteIDS:deleteIDS});
      }
      break;
    case ActionTypes.MATERIAL_LIST_GET:
      if (action.state === States.Fulfilled && result.code === 0) {
        let list = {};
        for(let key in data) {
          if (key.indexOf('List') !== -1) {
            list[key] = data[key].list;
            list[key+'Page'] = data[key].page;
          }
        }
        return createState(state, resState, list);
      }
      break;
    case ActionTypes.MATERIAL_DELETE:
      if (action.state === States.Fulfilled && result.code === 0) {
        let deleteIDS = 0;
        for(let key in data) {
          if (key.indexOf('Remove') !== -1) {
            deleteIDS = data[key];
          }
        }
        return createState(state, resState, {materialPriceDeleteIDS:deleteIDS});
      }
      break;

    case ActionTypes.MAINTAIN_LIST_GET:
      if (action.state === States.Fulfilled && result.code === 0) {
        let list = {};
        for(let key in data) {
          if (key.indexOf('List') !== -1) {
            list[key] = data[key].list;
            list[key+'Page'] = data[key].page;
          }
        }
        return createState(state, resState, list);
      }
      break;
    case ActionTypes.MAINTAIN_DELETE:
      if (action.state === States.Fulfilled && result.code === 0) {
        let deleteIDS = 0;
        for(let key in data) {
          if (key.indexOf('Remove') !== -1) {
            deleteIDS = data[key];
          }
        }
        return createState(state, resState, {maintainPriceDeleteIDS:deleteIDS});
      }
      break;
    case ActionTypes.GOODS_BASE_DATAS:
      if (action.state === States.Fulfilled && result.code === 0) {
        let list = {};
        for(let key in data) {
          if (key.indexOf('List') !== -1) {
            list[key] = data[key].list;
            list[key+'Page'] = data[key].page;
          }
        }
        return createState(state, resState, list);
      }
      break;
    default:
      break;
  }
  return createState(state, resState);
}

const goods = (state = initialState, action) => {
    return doActions(state, action);
}
export default goods;