import {HashRouter,Route,Link} from 'react-router-dom'
import system from '../system/index'
import shop from '../shop/index'
import customer from '../customer/index'
import sales from '../sales/index'

let routers = [];

export default routers
  .concat(system)
  .concat(shop)
  .concat(customer)
  .concat(sales)