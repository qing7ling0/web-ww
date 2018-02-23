'use strict';

import * as ActionTypes from '../constants/ActionTypes';
import { States } from '../../base/modules/ReduxState'
import results from './results'
import baseUtils from '../../base/utils/utils'

const initialState = {
    testString: '',
    loginInfo: {logined:false},
    menus:[],
    routers: {},
    routersIDMap:{},
    currentNavKey:'0',
    currentSelectMenu: {}
};

function doErrors(result) {
    if (baseUtils.IsNumber(result.code)) {
        if (result.code>0){
            results.push(result);
        } else if (result.code < 0) {
            result.message = '更新失败!';
            results.push(result);
        } else if (result.message) {
            results.push(result);
        }
    }
}

function doActions(state, action) {
    let result = {}
    let data = {}
    let notLogin = {};
    if (action && action.payload) {
        result = action.payload;
        if (result && result.data) {
            data = result.data;
        }
    }
    if (result) {
        if (result.code === 20) { // 未登录
            notLogin = {loginInfo:{code:result.code, message:result.message, user:null}};
        } else {
            doErrors(result);
        }
    }
    switch (action.type) {
        case ActionTypes.LOAD:
            if (action.state === States.Fulfilled) {
                return Object.assign({}, state, { testString: 'ok' });
            } else {
                return Object.assign({}, state, { testString: 'loading' });
            }
            break;
        case ActionTypes.LOGIN:
            if (action.state === States.Fulfilled) {
                if (result.code === 0) {
                    let info = {code:result.code, message:result.message, user:data.login};
                    let _routers = {};
                    let _routersIDMap = {};
                    for(let _r of data.routers) {
                        _routers[_r.url] = _r; 
                        _routersIDMap[_r.id] = _r;
                    }
                    return Object.assign({}, state, { loginInfo: info, menus:data.menus, routers:_routers, routersIDMap:_routersIDMap });
                } else {
                    let info = {code:result.code, message:result.message, user:null};
                    return Object.assign({}, state, { loginInfo: info });
                }
            } else {
                return Object.assign({}, state, { loginInfo: {loading:true} });
            }
            break;
        break;
        case ActionTypes.LOGOUT:
            if (action.state === States.Fulfilled) {
                if (result.code === 0) {
                    let info = {code:result.code, message:result.message, user:null};
                    return Object.assign({}, state, { loginInfo: info});
                } else {
                    return Object.assign({}, state);
                }
            } else {
                return Object.assign({}, state);
            }
            break;
        break;
        case ActionTypes.SELECT_NAV:
            if (action.state === States.Fulfilled) {
                if (result.code === 0) {
                    let key = data.key;

                    return Object.assign({}, state, { currentNavKey: data.key});
                } else {
                    return Object.assign({}, state);
                }
            } else {
                return Object.assign({}, state);
            }
            break;
        break;
        default:
            break;
    }
    return Object.assign({}, state, {results:results}, notLogin);
}

const app = (state = initialState, action) => {
    return doActions(state, action);
}
export default app;