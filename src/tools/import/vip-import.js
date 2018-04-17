import constants, { ORDER_SOURCE } from '../../constants/constants'
import {
  customerData,
} from '../../data/index'
import {
  shopModel,
  commonModel,
  materialModel,
  userShopGuideModel
} from '../../models/index'
import { customerModel } from '../../models/customer';

import moment from 'moment';
import fs from 'fs';
import path from 'path';

var add = false;

var vipImport = async function(ctx) {
  let guides = await userShopGuideModel.find({}, {_id:1,name:1});
  let shops = await shopModel.find({}, {_id:1, name:1});
  guides = guides || [];
  let guidesMap = new Map();
  guides.forEach(item => {
    guidesMap.set(item.name, item);
  });

  shops = shops || [];
  let shopsMap = new Map();
  shops.forEach(item => {
    shopsMap.set(item.name, item);
  });

  // let datas = require('./vip-datas.json');
  let datas = null;
  let filePath = path.join(__dirname, '../../../res/import-datas/vip-datas.json');
  try {
    console.log('vipImport 111' + filePath);
    if (fs.existsSync(filePath)) {
      datas = JSON.parse(fs.readFileSync(filePath));
      let vips = datas && datas.Sheet1 || [];
      console.log('vipImport 222 count=' + vips.length);
    }
  } catch (error) {
    datas = null;
    console.log('vipImport 333' + error);
  }
  let vipDatas = [];
  let time = new Date().getTime();
  console.log('vipImport began');
  let dataOk = true;
  if (datas && datas.Sheet1) {
    datas.docs = datas.Sheet1.map(item=> {
      if (!item.birthday) {
        item.birthday = null;
      } else {
        item.birthday += "";
        item.birthday.replace(/(^\s*)|(\s*$)/g, "");
        if (item.birthday) {
          item.birthday = moment(new Date(1900, 0, item.birthday)).format("YYYY-MM-DD");
        }
      }
      if (!item.vip_card_date) {
        item.vip_card_date = null;
      } else {
        item.vip_card_date += "";
        item.vip_card_date.replace(/(^\s*)|(\s*$)/g, "");
        if (item.vip_card_date) {
          item.vip_card_date = moment(new Date(1900, 0, item.vip_card_date)).format("YYYY-MM-DD");
        }
      }
      if (item.vip_card_shop) {
        if (shopsMap.has(item.vip_card_shop)) {
          let shop = shopsMap.get(item.vip_card_shop);
          item.vip_card_shop = shop && shop._id;
        } else {
          console.log("vipImport 店铺 " + item.vip_card_shop + " 不存在！")
          dataOk = false;
        }
      }
      if (item.vip_card_guide) {
        if (guidesMap.has(item.vip_card_guide)) {
          let guide = guidesMap.get(item.vip_card_guide);
          item.vip_card_guide = guide && guide._id;
        } else {
          console.log("vipImport 导购 " + item.vip_card_guide + " 不存在！")
          dataOk = false;
        }
      }
      if (item.point !== null && item.point !== undefined) {
        item.vip_exp = item.point;
      }
      
      if (!item.tags) {
        item.tags = [];
      }

      let joinData = constants.CUSTOMER_TYPE.find(ele=>ele.label === item.join_type)
      item.join_type = joinData&&joinData.value || constants.CUSTOMER_TYPE.ADMIN;

      return item;
    })
    

    if (dataOk && datas.docs && datas.docs.length > 0) {
      let retList = await customerModel.create(datas.docs);
      console.log('vipImport import length=' + datas.docs.length + "; ---- time=" +(new Date().getTime() - time));
    }
  }
  console.log('vipImport end');
}

var handler = async function(ctx) {
  // await this.vipImport(ctx);
} 

module.exports = handler;