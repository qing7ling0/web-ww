import * as graphqlTypes from './graphqlTypes'


const shoesType = `s_count, s_kuanhao, s_xieXuan, s_xieGen, s_guiGe,
  s_material, s_xiemian_color, s_neili_color,
  s_foot_size, s_left_length, s_left_zhiWei, s_left_fuWei, s_right_length,
  s_right_zhiWei, s_right_fuWei,s_urgent_day, s_urgent_price, s_shoes${graphqlTypes.goodsShoesType}`

// 皮带
const beltType = `b_NID, b_kuanhao, b_material, b_color, b_A, b_B, b_C, b_D, b_size_remark`

// 表带
const watchStrapType = `bs_NID, bs_kuanhao, bs_material, bs_color, bs_type, bs_A, bs_B, bs_C, bs_D, bs_E, bs_F, bs_G, bs_watch_brand, bs_size_remark`

// 护理
const maintainType = `m_NID, m_name, m_price, m_time, m_color, m_demo, m_wash`

// 辅料
const fuliaoType = `f_NID, f_name, f_kuanhao`

// 配饰
const ornamentType = `o_NID, o_name, o_kuanhao`

export const orderType = `{
  _id, type, source, pay, pay_type, order_state, transport_company, transport_id,
  transport_price, transport_name, transport_phone, transport_address, transport_zipcode, remark,
  shop${graphqlTypes.shopType}, guide{_id,name}, customer${graphqlTypes.customerType}, 
  ${shoesType}, ${beltType}, ${watchStrapType}, ${maintainType}, ${fuliaoType}, ${fuliaoType}, ${ornamentType}
}`