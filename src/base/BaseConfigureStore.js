'use strict';

import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';//引入异步操作
import reduxPromiseMiddleware from 'redux-promise';
import {ReduxBegan, ReduxEnd, States} from './modules/ReduxState.js'

const defaultMiddlewares = [
  ReduxBegan,
  thunk,
  reduxPromiseMiddleware,
  ReduxEnd
];

const createSoreWithMiddleware=applyMiddleware(...defaultMiddlewares)(createStore);

//配置store信息
export default function BaseConfigureStore(initialState, reducers, middlewares){
  if (middlewares) {
    //创建store
    const store = applyMiddleware(...middlewares)(createStore)(reducers, initialState);
    return store;
  } else {
    //创建store
    const store = createSoreWithMiddleware(reducers, initialState);
    return store;
  }
}