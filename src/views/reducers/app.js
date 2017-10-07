'use strict';

import * as ActionTypes from '../constants/ActionTypes';
import { States } from '../../base/modules/ReduxState'

const initialState = {
    testString: ''
};

const app = (state = initialState, action) => {
    let result = {}
    if (action && action.payload) {
        result = action.payload;
    }
    switch (action.type) {
        case ActionTypes.LOAD:
            if (action.state === States.Fulfilled) {
                return Object.assign({}, state, { testString: result.data.data.hello });
            } else {
                return Object.assign({}, state, { testString: 'loading' });
            }
        default:
            break;
    }
    return Object.assign({}, state);
}
export default app;