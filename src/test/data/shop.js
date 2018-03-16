import {
  salesData,
  shopData,
  userData
} from '../../data/index'
import constants, { ORDER_SOURCE } from '../../constants/constants'
import {
  shopModel,
  commonModel
} from '../../models/index'


const REGIONS = [
  {name:"合肥", color_css:0xf00000}, 
  {name:"成都", color_css:0xff0000},
  {name:"海口", color_css:0xfff000},
  {name:"宁波", color_css:0xffff00},
  {name:"常州", color_css:0xfffff0},
]

const GUIDE_NAME = [
  "关羽", '赵云', '屠夫','刺客','甄姬','貂蝉','司马懿','周瑜','荀彧','黄盖','陆逊','魏延','典韦','张飞','刘备','曹操','张辽','影魔'
]

var current_phone = 13000000000;

var addRegion = async function(ctx) {
  let temp = {
    "type" : "21",
    "name" : "北京",
    "editor_name" : "管理员",
    "editor_id" : "1",
    "NID" : "0",
  }

  for(let re of REGIONS) {
    let item = Object.assign({}, temp);
    item.color_css = re.color_css;
    item.name = re.name;
    let _regionModel = new commonModel(item);
    await _regionModel.save();
    console.log('添加店铺区域'+item.name);
  }
}

var addGuide = async function (ctx, index, shopId) {
  let temp = {
    "sex" : "男",
    "height" : 170,
    "weight" : 70,
    "editor_name" : "管理员",
    "editor_id" : "1",
    "user_type" : 1,
    "entry_time" : "2018-01-10",
    "birthday" : "2018-02-01",
    // "account" : ObjectId("5a9649c075b3b850cc91d5c8")
    // "shop" : ObjectId("5a24fd9a7d72b74d6019aea7"),
    // "name" : "周杰",
  }

  for(let i=0; i<GUIDE_NAME.length; i++) {
    current_phone++;
    let info = Object.assign(
      {}, 
      temp,
      {
        shop:shopId,
        name:GUIDE_NAME[i],
        phone:"" + current_phone,
        manager:i===0
      }
    )
    let account = {account:info.phone, password:info.phone};
    await userData.addUser(ctx, {user_type:1, user:info, account:account});
    console.log('添加导购' + info.name);
  }
  
}

var addShop = async function(ctx) {
  let regionList = await commonModel.find({type:constants.COMMON_DATA_TYPES.SHOP_REGION})

  let data = {
    "name" : "徐家汇",
    "rent" : "111",
    "area" : 9,
    "country" : "中国",
    "region" : "华东",
    "province" : "上海市",
    "marketLevel" : "3",
    "property" : "1",
    "phone" : "13698954711",
    "address" : "徐家汇",
    "zipcode" : "201318",
    "editor_name" : "管理员",
    "editor_id" : "1",
    "close_date" : "2017-12-27",
    "rents_expire_date" : "2017-12-28",
    "open_date" : "2017-12-05T00:00:00.000Z"
  }

  let list = [];
  let index = 0;
  for(let i=0; i<20; i++) {
    let rind = index%regionList.length;
    let region = regionList[rind];
    let item = Object.assign({}, data);
    item.region_id = region._id;
    item.name = region.name + '-' + (rind+1);
    // list.push(item);
    let _shopModel = new shopModel(item);
    let newShop = await _shopModel.save();
    console.log("添加店铺" + item.name);
    await addGuide(ctx, i, newShop._id);
  }

}

module.exports = async function(ctx) {
  // await addRegion(ctx);
  await addShop(ctx);
}