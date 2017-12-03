import {combineReducers} from 'redux';
import app from './app.js'
import system from './system.js'
import shop from './shop.js'
import customer from './customer.js'
import sales from './sales.js'

const index = combineReducers({
    app, system, shop, customer, sales
})

export default index