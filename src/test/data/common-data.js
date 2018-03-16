import salesData from '../../data/sales'
import constants, { ORDER_SOURCE } from '../../constants/constants'
import {
  shopModel,
  commonModel,
  materialModel
} from '../../models/index'

const COLOR_NAME = [
  '红', '橙', '黄', '绿', '蓝', '白', '黑'
]
const MATERIAL_NAMES = [
  '牛皮', '犀牛皮', '鳄鱼皮', '鹿皮', '羊皮', '小牛皮', '黄牛皮', '兔皮', '猪皮', '鸵鸟皮', '袋鼠皮'
]

const TEMPS = [
  {
    value:constants.COMMON_DATA_TYPES.SHOES_OUT_COLOR, 
    datas:"鞋面"
  },
  {
    value:constants.COMMON_DATA_TYPES.SHOES_IN_COLOR, 
    datas:"内里"
  },
  {
    value:constants.COMMON_DATA_TYPES.SHOES_BOTTOM_COLOR, 
    datas:"底"
  },
  {
    value:constants.COMMON_DATA_TYPES.SHOES_BOTTOM_SIDE_COLOR, 
    datas:"边"
  },
  {
    value:constants.COMMON_DATA_TYPES.MATERIAL_COLOR, 
    datas:"材"
  },
  {
    value:constants.COMMON_DATA_TYPES.XUAN_HAO, 
    datas:"楦号"
  },
  {
    value:constants.COMMON_DATA_TYPES.WATCH_STRAP_STYLE, 
    datas:"表带"
  },
  {
    value:constants.COMMON_DATA_TYPES.SHOES_GEN_GAO, 
    datas:"跟高"
  },
  {
    value:constants.COMMON_DATA_TYPES.SHOES_GUI_GE, 
    datas:"规格"
  },
  {
    value:constants.COMMON_DATA_TYPES.SHOES_TIE_BIAN, 
    datas:"贴边"
  },
]
var addDatas = async function(ctx) {

  let isColor = true;
  for(let temp of TEMPS) {
    if (isColor && temp.value === constants.COMMON_DATA_TYPES.XUAN_HAO) {
      isColor = false;
    }

    if (isColor) {
      for(let i=0; i<COLOR_NAME; i++) {
        let info = {
          type: temp.value,
          name: temp.datas+COLOR_NAME[i],
          NID: (i+1),
          editor_name:'管理员',
          editor_id:1
        }
        let _commonModel = new commonModel(info);
        await _commonModel.save();
        console.log('添加' + info.name);
      }
    } else {
      for(let i=1; i<6; i++) {
        let info = {
          type: temp.value,
          name: temp.datas+'-'+i,
          NID: (i+1),
          editor_name:'管理员',
          editor_id:1
        }
        let _commonModel = new commonModel(info);
        await _commonModel.save();
        console.log('添加' + info.name);
      }
    }
  }
}

var addMaterials = async function(ctx) {
  let temp = {
    "count" : 1,
    "color" : "5a2a5ce3700447398cbf3e5b",
    "editor_name" : "管理员",
    "editor_id" : 1,
    "NID" : "EY01"
  }
  for(let i=0; i<MATERIAL_NAMES.length; i++) {
    let info = Object.assign({}, temp);
    info.name = MATERIAL_NAMES[i];
    info.NID = "EY" + (i+1);
    let _model = new materialModel(info);
    await _model.save(info);
    console.log("添加材料" + info.name);
  }
}

module.exports = async function(ctx) {
  await addDatas(ctx);
  // await addMaterials(ctx);
}