import * as constants from '../../../constants/Constants'
import { commonUtils } from '../../../modules/common';

export const E_ORDER_TYPES = {shoes:'shoes', belt:'belt', watchStrap:'watchStrap'}
export const ORDER_TYPES = [
  {id:constants.BASE_CONSTANTS.E_ORDER_TYPE.belt, tag:E_ORDER_TYPES.shoes, query:'orderList', label:'鞋子订单'},
  {id:constants.BASE_CONSTANTS.E_ORDER_TYPE.belt, tag:E_ORDER_TYPES.belt, query:'orderList', label:'皮带订单'},
  {id:constants.BASE_CONSTANTS.E_ORDER_TYPE.watchStrap, tag:E_ORDER_TYPES.watchStrap, query:'orderList', label:'表带订单'},
]
