import moment from 'moment'

import { 
  userModel, 
  userShopGuideModel, 
  userOperateModel, 
  userProductionModel,
  userAdminModel,
  accountModel,
  shopModel,
  orderModel
} from '../models/index.js'

import { ApiError, ApiErrorNames } from '../error/api-errors'
import utils from '../utils/utils'
import baseUtils from '../base/utils/utils'
import constants from '../constants/constants'
import { subOrderModel } from '../models/sales.js';
// import 

const logUtil = require('../utils/log-utils');

class DBRepair {

  async do() {
    // await this.subOrderSystemPriceCalc();
  }

  /**
   * 计算自订单的系统价格
   */
  async subOrderSystemPriceCalc() {
    let notGoodsTypes = [constants.E_ORDER_TYPE.RECHARGE]
    let orders = await subOrderModel.find({type:{$nin:notGoodsTypes}});
    if (orders) {
      // console.log("subOrderSystemPriceCalc 222");
      for(let sub of orders) {
        // console.log("subOrderSystemPriceCalc=" + Object.prototype.toString.call(sub));
        // console.log("subOrderSystemPriceCalc 222" + JSON.stringify(sub));
        let system_price = sub.price;
        if (sub.s_customs) {
          for(let c of sub.s_customs) {
            system_price += c.price;
          }
        }
        if (sub.urgent) {
          system_price += sub.urgent.price;
        }
        await subOrderModel.updateOne({_id:sub._id}, {system_price});
      }
    }
  }

}
module.exports = new DBRepair()