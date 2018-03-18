const {Menus, Routers} = require('../constants/config')
import { 
  commonModel,
  goodsModel,
  materialModel,
  shopModel
} from '../models/index.js'

import DB from '../db/DB'
import { ApiError, ApiErrorNames } from '../error/api-errors'
import Menu from 'antd/lib/menu';
import * as commonUtils from '../utils/common-utils'
const constants = require('../constants/constants')

class CommonData {

  async getMenus(user) {
    if (!user) return [];
    let menuList = [];
    Menus.forEach((item) => {
      if (item.subMenus) {
        let subList = [];
        item.subMenus.forEach(sub=>{
          let power = commonUtils.getPower(user, sub.id);
          if (power.view) {
            subList.push(sub);
          }
        })
        if (subList.length > 0) {
          let menu = {...item};
          menu.subMenus = subList;
          menuList.push(menu);
        }
      }
    })
    return menuList;
  }

  async getRouters() {
    return Routers;
  }

  // 检查NID是否唯一（NID === 0 不用检测）
  async checkNIDUnique(NID, type) {
    if (NID === null || NID === undefined || type === null || type === undefined) return false;

    // 为0不用检查
    if (NID == 0) return true;
  
    let data = await commonModel.findOne({ NID: NID, type:type } );
    if (data) {
      return false;
    }
  
    return true;
  }

  async getCommonList(type, options={}, page) {
    if (type){
      if (!options) {
        options = {conditions:{}};
      } else if(!options.conditions) {
        options.conditions = {};
      }
      options.conditions.type = type;
    }
    return await DB.getList(commonModel, options, page);
  }
  async addCommon(doc, options={}) {
    let NIDUnique = await this.checkNIDUnique(doc.NID, doc.type);
    if (!NIDUnique) {
      throw new ApiError(ApiErrorNames.ADD_FAIL, '编号已存在!');
    }

    return await DB.add(commonModel, doc, options);
  }
  async updateCommon(conditions, doc, options) {
    if (doc && doc.NID) {
      let data = await commonModel.findOne(conditions);
      if (!data) {
        throw new ApiError(ApiErrorNames.UPDATE_FAIL);
      }
      let NIDUnique = await this.checkNIDUnique(doc.NID, data.type);
      if (!NIDUnique) {
        throw new ApiError(ApiErrorNames.ADD_FAIL, '编号已使用!');
      }
    }
    // console.log(JSON.stringify(doc));
    return await DB.update(commonModel, conditions, doc, options);
  }
  
  async checkCanRemoveByIds(ids, type) {
    // console.log('checkCanRemoveByIds type=' + type + "; ids=" + ids);
    let goodsKeys = [];
    switch(type) {
      case constants.COMMON_DATA_TYPES.SHOES_OUT_COLOR:
      goodsKeys.push('s_out_color')
      break;
      case constants.COMMON_DATA_TYPES.SHOES_IN_COLOR:
      goodsKeys.push('s_in_color')
      break;
      case constants.COMMON_DATA_TYPES.SHOES_BOTTOM_COLOR:
      goodsKeys.push('s_bottom_color')
      break;
      case constants.COMMON_DATA_TYPES.SHOES_BOTTOM_SIDE_COLOR:
      goodsKeys.push('s_bottom_side_color')
      break;
      case constants.COMMON_DATA_TYPES.MATERIAL_COLOR:
      goodsKeys.push('b_color')
      goodsKeys.push('m_color')
      break;
      case constants.COMMON_DATA_TYPES.CUSTOM:
      break;
      case constants.COMMON_DATA_TYPES.URGENT:
      break;
      case constants.COMMON_DATA_TYPES.MAINTAIN:
      break;
      case constants.COMMON_DATA_TYPES.GOODS_TYPE:
      goodsKeys.push('type')
      break;
      case constants.COMMON_DATA_TYPES.GOODS_STYLE:
      goodsKeys.push('style')
      break;
      case constants.COMMON_DATA_TYPES.GOODS_SEASON:
      goodsKeys.push('season')
      break;
      case constants.COMMON_DATA_TYPES.XUAN_HAO:
      goodsKeys.push('s_xuan_hao')
      break;
      case constants.COMMON_DATA_TYPES.WATCH_STRAP_STYLE:
      goodsKeys.push('ws_style')
      break;
      case constants.COMMON_DATA_TYPES.SHOES_GEN_GAO:
      goodsKeys.push('s_gen_gao')
      break;
      case constants.COMMON_DATA_TYPES.SHOES_GUI_GE:
      goodsKeys.push('s_gui_ge')
      break;
    }

    if (goodsKeys && goodsKeys.length > 0) {
      let arr = [];
      for(let key of goodsKeys) {
        let r = {};
        r[key] = {$in:ids};
        arr.push(r);
      }
      let goods = await goodsModel.find({$or:arr})
      if (goods && goods.length > 0) {
        throw new ApiError(ApiErrorNames.DELETE_FAIL, '数据被使用，无法删除！');
      }
    }

    if (type === constants.COMMON_DATA_TYPES.MATERIAL_COLOR) {
      let mats = await materialModel.find({color:{$in:ids}});
      if (mats && mats.length > 0) {
        throw new ApiError(ApiErrorNames.DELETE_FAIL, '数据被使用，无法删除！');
      }
    }

    if (type === constants.COMMON_DATA_TYPES.SHOP_REGION) {
      let mats = await shopModel.find({region_id:{$in:ids}});
      if (mats && mats.length > 0) {
        throw new ApiError(ApiErrorNames.DELETE_FAIL, '数据被使用，无法删除！');
      }
    }
  }

  async removeByIdsCommon(ids) {
    if (!ids || ids.length === 0) {
      throw new ApiError(ApiErrorNames.DELETE_FAIL);
    }
    let datas = await commonModel.find({_id:{$in:ids}});
    if (datas && datas.length > 0) {
      // console.log('datas length=' + datas.length)
      let type = datas[0].type;
      await this.checkCanRemoveByIds(ids, type);
    }
    // return await DB.update(commonModel, {_id:{$in:ids}}, {hide:true});
    return await DB.removeByIds(commonModel, ids);
  }

  async findByIdCommon(id, onQuery) {
    return await DB.findById(commonModel, id, onQuery);
  }

  createCurrentOrderIndex() {
    let _time = Math.floor(new Date().getTime() / 1000);
    // console.log('createCurrentOrderIndex' + _time)
    if (!CommonData.currentOrderTime) {
      CommonData.currentOrderTime = _time;
      CommonData.currentOrderIndex = 101;
    } else {
      if (_time !== CommonData.currentOrderTime) {
        CommonData.currentOrderTime = _time;
        CommonData.currentOrderIndex = 101;
      } else {
        if (!CommonData.currentOrderIndex) CommonData.currentOrderIndex = 101;
      }
    }
    return CommonData.currentOrderIndex++;
  }
}
CommonData.currentOrderTime = 0;
CommonData.currentOrderIndex = 101;
module.exports = new CommonData();