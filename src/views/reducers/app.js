'use strict';

import * as ActionTypes from '../constants/ActionTypes';
import { States } from '../../base/modules/ReduxState'

const initialState = {
    testString: '',
    loginInfo: {}
};

function doErrors(code, result) {

}

function doActions(state, action) {
    let result = {}
    let data = {}
    if (action && action.payload) {
        result = action.payload;
        if (result && result.data && result.data.data) {
            data = result.data.data;
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
                    return Object.assign({}, state, { loginInfo: info });
                } else {
                    let info = {code:result.code, message:result.message, user:null};
                    return Object.assign({}, state, { loginInfo: info });
                }
            } else {
                return Object.assign({}, state, { testString: 'loading' });
            }
            break;
        break;
        default:
            break;
    }
    return Object.assign({}, state);
}

const app = (state = initialState, action) => {
    return doActions(state, action);
}
export default app;