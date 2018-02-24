'use strict';

import * as ActionTypes from '../constants/ActionTypes';
import { States } from '../../base/modules/ReduxState'
import results from './results'
import baseUtils from '../../base/utils/utils'
import * as constants from '../constants/Constants'

const LOADING_ACTIONS = [
  ActionTypes.GOODS_ADD,
  ActionTypes.GOODS_DELETE,
  ActionTypes.GOODS_UPDATE,
  ActionTypes.GOODS_LIST_GET,
  ActionTypes.GOODS_PROFILE_GET,

  ActionTypes.SAMPLE_GOODS_ADD,
  ActionTypes.SAMPLE_GOODS_DELETE,
  ActionTypes.SAMPLE_GOODS_UPDATE,
  ActionTypes.SAMPLE_GOODS_LIST_GET,
  ActionTypes.SAMPLE_GOODS_PROFILE_GET,

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
  ActionTypes.ORDER_REVIEW,
  ActionTypes.ORDER_LIST_GET,
  ActionTypes.SUB_ORDER_LIST_GET,
  ActionTypes.ORDER_SUB_PROFILE,
  ActionTypes.ORDER_SUB_UPDATE,
  ActionTypes.ORDER_SUB_CANCEL,
  ActionTypes.ORDER_SUB_STATE_CHANGE,

  ActionTypes.SUB_ORDER_TRY_FEEDBACK_LIST,
  ActionTypes.SUB_ORDER_TRY_FEEDBACK_ADD,
  ActionTypes.SUB_ORDER_TRY_FEEDBACK_UPDATE,
];

const initialState = {
  loading:false,  
  result: {code:0, message:'', type:0},
  goodsShoesList: [],
  goodsShoesListPage: {page:1,pageSize:constants.DEFAULT_PAGE_SIZE,total:0},
  goodsListPage: {page:1,pageSize:constants.DEFAULT_PAGE_SIZE,total:0},
  subOrderListPage: {page:1,pageSize:constants.DEFAULT_PAGE_SIZE,total:0},
  goodsDeleteIDS: [],
  goodsShoesProfile:{},
  goodsTypeList: [],
  styleList: [],
  seasonList: [],
  guiGeList: [],
  genGaoList: [],
  shoesTieBianList: [],
  watchStrapStyleList: [],
  materialList: [],
  xuanHaoList: [],
  outColorList: [],
  inColorList: [],
  bottomColorList: [],
  bottomSideColorList: [],
  customList: [],
  urgentList: [],
  maintainList: [],
  materialList: [],
  materialColorList: [],
  materialDeleteIDS: [],
  maintainPriceList: [],
  maintainPriceDeleteIDS: [],
  orderList:[],
  subOrderList:[],
  tryFeedbackList:[],
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
    // case ActionTypes.GOODS_LIST_GET:
    //   if (action.state === States.Fulfilled && result.code === 0) {
    //     return createState(state, resState, {goodsShoesList:data.goodsShoesList.list, goodsShoesListPage:data.goodsShoesList.page});
    //   }
    //   break;
    // case ActionTypes.GOODS_SHOES_DELETE:
    //   if (action.state === States.Fulfilled && result.code === 0) {
    //     return createState(state, resState, {goodsShoesDeleteIDS:data.deleteCustomer});
    //   }
    //   break;
    case ActionTypes.GOODS_LIST_GET:
    case ActionTypes.SAMPLE_GOODS_LIST_GET:
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
    case ActionTypes.SAMPLE_GOODS_DELETE:
    case ActionTypes.GOODS_DELETE:
      if (action.state === States.Fulfilled && result.code === 0) {
        let deleteIDS = 0;
        for(let key in data) {
          if (key.indexOf('Remove') !== -1) {
            deleteIDS = data[key];
          }
        }
        return createState(state, resState, {goodsDeleteIDS:deleteIDS});
      }
      break;
      
    case ActionTypes.SAMPLE_GOODS_PROFILE_GET:
    case ActionTypes.GOODS_PROFILE_GET:
      if (action.state === States.Fulfilled && result.code === 0) {
        return createState(state, resState, {...data});
      }
    break;

    case ActionTypes.ORDER_LIST_GET:
    case ActionTypes.SUB_ORDER_LIST_GET:
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
      
    case ActionTypes.ORDER_SUB_PROFILE:
      if (action.state === States.Fulfilled && result.code === 0) {
        let profile = 0;
        for(let key in data) {
          if (key.indexOf('Profile') !== -1) {
            profile = data[key];
          }
        }
        return createState(state, resState, {suborderProfile:profile});
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
    {
      if (action.state === States.Fulfilled && result.code === 0) {
        let _list = {};
        for(let key in data) {
          if (key.indexOf('List') !== -1) {
            _list[key] = data[key].list;
            _list[key+'Page'] = data[key].page;
          }
        }
        return createState(state, resState, _list);
      }
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
        return createState(state, resState, {salesBaseDeleteIDS:deleteIDS});
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
    case ActionTypes.SUB_ORDER_TRY_FEEDBACK_LIST:
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
  if (action.type && LOADING_ACTIONS.indexOf(action.type) !== -1) {
    if (action.state === States.Fulfilled && result.code === 0) {
      return createState(state, resState, {...data});
    }
  }
  return createState(state, resState);
}

const goods = (state = initialState, action) => {
    return doActions(state, action);
}
export default goods;