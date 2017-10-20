'use strict';

import * as ActionTypes from '../constants/ActionTypes';
import { States } from '../../base/modules/ReduxState'
import results from './results'
import baseUtils from '../../base/utils/Utils'

const initialState = {
    testString: '',
    loginInfo: {logined:false},
};

function doErrors(result) {
    if (baseUtils.IsNumber(result.code)) {
        if (result.code>0){
            results.push(result);
        } else if (result.code < 0) {
            result.message = '更新失败!';
            results.push(result);
        }
    }
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
    if (result) {
        doErrors(result);
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
                    return Object.assign({}, state, { loginInfo: info });
                } else {
                    let info = {code:result.code, message:result.message, user:null};
                    return Object.assign({}, state, { loginInfo: info });
                }
            } else {
                return Object.assign({}, state, { loginInfo: {loading:true} });
            }
            break;
        break;
        default:
            break;
    }
    return Object.assign({}, state, {results:results});
}

const app = (state = initialState, action) => {
    return doActions(state, action);
}
export default app;