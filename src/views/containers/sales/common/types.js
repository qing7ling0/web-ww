import * as constants from '../../../constants/Constants'

export const E_COMMON_TYPES = {
  commonTypeList:'commonTypeList',
  commonStyleList:'commonStyleList',
  commonSeasonList:'commonSeasonList',
  matriealColorList:'matriealColorList:colorList',
  outColorList:'outColorList:colorList',
  inColorList:'inColorList:colorList',
  bottomColorList:'bottomColorList:colorList',
  bottomSideColorList:'bottomSideColorList:colorList',
}

export const COMMON_TYPES = [
  {tag:'goodsTypeList', value:'goodsTypeList', label:'商品分类'},
  {tag:'goodsStyleList', value:'goodsStyleList', label:'商品系列'},
  {tag:'goodsSeasonList', value:'goodsSeasonList', label:'商品季节'},
  {tag:'matriealColorList:colorList', value:'matriealColorList', label:'原材料颜色', colorType:constants.BASE_CONSTANTS.COLOR_TYPE_MATERIAL},
  {tag:'outColorList:colorList', value:'outColorList', label:'鞋面颜色', colorType:constants.BASE_CONSTANTS.COLOR_TYPE_OUT},
  {tag:'inColorList:colorList', value:'inColorList', label:'里皮颜色', colorType:constants.BASE_CONSTANTS.COLOR_TYPE_IN},
  {tag:'bottomColorList:colorList', value:'bottomColorList', label:'鞋底颜色', colorType:constants.BASE_CONSTANTS.COLOR_TYPE_BOTTOM},
  {tag:'bottomSideColorList:colorList', value:'bottomSideColorList', label:'底边颜色', colorType:constants.BASE_CONSTANTS.COLOR_TYPE_BOTTOM_SIDE},
]