import * as constants from '../../../constants/Constants'
import * as optionsType from '../types'
import * as graphqlTypes from '../../../modules/graphqlTypes'
import * as orderTypes from '../../../modules/orderTypes'

export const E_COMMON_TYPES = {
  commonTypeList:'commonTypeList',
  commonStyleList:'commonStyleList',
  commonSeasonList:'commonSeasonList',
  matriealColorList:'matriealColorList:colorList',
  outColorList:'outColorList:colorList',
  inColorList:'inColorList:colorList',
  bottomColorList:'bottomColorList:colorList',
  bottomSideColorList:'bottomSideColorList:colorList',
  customList:'customList',
  urgentList:'urgentList',
}

export const COMMON_TYPES = [
  {
    tag:'goodsTypeList', value:'goodsTypeList', label:'商品分类', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:optionsType.getSalesBaseListOptions,
    addOptions:optionsType.getSalesBaseAddOptions,
    editOptions:optionsType.getSalesBaseEditOptions,
  },
  {
    tag:'goodsStyleList', value:'goodsStyleList', label:'商品系列', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:optionsType.getSalesBaseListOptions,
    addOptions:optionsType.getSalesBaseAddOptions,
    editOptions:optionsType.getSalesBaseEditOptions,
  },
  {
    tag:'goodsSeasonList', value:'goodsSeasonList', label:'商品季节', 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:optionsType.getSalesBaseListOptions,
    addOptions:optionsType.getSalesBaseAddOptions,
    editOptions:optionsType.getSalesBaseEditOptions,
  },
  {
    tag:'matriealColorList:colorList', value:'matriealColorList', label:'原材料颜色', colorType:constants.BASE_CONSTANTS.COLOR_TYPE_MATERIAL, 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:optionsType.getSalesBaseListOptions,
    addOptions:optionsType.getSalesBaseAddOptions,
    editOptions:optionsType.getSalesBaseEditOptions,
  },
  {
    tag:'outColorList:colorList', value:'outColorList', label:'鞋面颜色', colorType:constants.BASE_CONSTANTS.COLOR_TYPE_OUT, 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:optionsType.getSalesBaseListOptions,
    addOptions:optionsType.getSalesBaseAddOptions,
    editOptions:optionsType.getSalesBaseEditOptions,
  },
  {
    tag:'inColorList:colorList', value:'inColorList', label:'里皮颜色', colorType:constants.BASE_CONSTANTS.COLOR_TYPE_IN, 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:optionsType.getSalesBaseListOptions,
    addOptions:optionsType.getSalesBaseAddOptions,
    editOptions:optionsType.getSalesBaseEditOptions,
  },
  {
    tag:'bottomColorList:colorList', value:'bottomColorList', label:'鞋底颜色', colorType:constants.BASE_CONSTANTS.COLOR_TYPE_BOTTOM, 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:optionsType.getSalesBaseListOptions,
    addOptions:optionsType.getSalesBaseAddOptions,
    editOptions:optionsType.getSalesBaseEditOptions,
  },
  {
    tag:'bottomSideColorList:colorList', value:'bottomSideColorList', label:'底边颜色', colorType:constants.BASE_CONSTANTS.COLOR_TYPE_BOTTOM_SIDE, 
    graphqlType:graphqlTypes.salesBaseType,
    listOptions:optionsType.getSalesBaseListOptions,
    addOptions:optionsType.getSalesBaseAddOptions,
    editOptions:optionsType.getSalesBaseEditOptions,
  },
  {
    tag:'customList', value:'customList', label:'特殊定制', 
    graphqlType:orderTypes.customType,
    listOptions:optionsType.getCustomListOptions,
    addOptions:optionsType.getCustomAddOptions,
    editOptions:optionsType.getCustomEditOptions,
  },
  {
    tag:'urgentList', value:'urgentList', label:'加急天数', 
    graphqlType:orderTypes.urgentType,
    listOptions:optionsType.getUrgentListOptions,
    addOptions:optionsType.getUrgentAddOptions,
    editOptions:optionsType.getUrgentEditOptions,
  },
]