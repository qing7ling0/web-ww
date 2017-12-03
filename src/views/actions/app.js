import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import config from '../constants/Config.js';
import netHandler from '../modules/NetHandler'

const init = () => {
    let myHeaders = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
    });
    return fetch('http://192.168.0.109:3001/json', {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    }).then((response) => {
        return response.json();
    });
}

export const Load = createAction(types.LOAD,() => 'data');

export const login = createAction(types.LOGIN, netHandler.reqLogin)

export const logout = createAction(types.LOGOUT, netHandler.reqLogout);

export const selectNav = createAction(types.SELECT_NAV, (key)=>{return{code:0, message:'', data:{key:key}}})

export const addUser = createAction(types.USER_ADD, (params) => netHandler.mutation({add:{
    info:{account:'111', password: '222', nickname: 'test'}
}}));
let list = 'list';
export const getUserList = createAction(types.USER_LIST_GET, (params) => netHandler.query('{list}'));