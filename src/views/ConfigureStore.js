'use strict'

import BaseConfigureStore from '../base/BaseConfigureStore'
import Reducers from './reducers/index'

export default function ConfigureStore(initialState, middlewares) {
    return BaseConfigureStore(initialState, Reducers, middlewares);
}