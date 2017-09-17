import {createAction} from 'redux-actions';
import * as types from '../constants/ActionTypes';
import config from '../constants/Config.js';

const init = () => {
  let myHeaders = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
  });
  return fetch('http://192.168.0.109:3001/json',
    {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors'
    }).then((response) => {
      return response.json();
    });
}

export const Load = createAction(types.LOAD, init);