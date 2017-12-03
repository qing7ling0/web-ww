import * as app from './app.js'
import * as system from './system'
import * as shop from './shop'
import * as customer from './customer'
import * as sales from './sales'

export default {
  ...app,
  ...system,
  ...shop,
  ...customer,
  ...sales,
}