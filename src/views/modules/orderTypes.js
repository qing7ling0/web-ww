import * as graphqlTypes from './graphqlTypes'

// 鞋子
const shoesType = `s_count, s_NID, 
  s_xuanhao, s_gui_ge, s_material, s_customs{_id, name, price}
  s_out_color,s_in_color,s_bottom_color,s_bottom_side_color,
  s_foot_size, s_left_length, s_left_zhiWei, s_left_fuWei, s_right_length,
  s_right_zhiWei, s_right_fuWei`
// 皮带
const beltType = `b_NID, b_material, b_color, b_A, b_B, b_C, b_D, b_size_remark`
// 表带
const watchStrapType = `ws_NID, ws_material, ws_style, ws_A, ws_B, ws_C, ws_D, ws_E, ws_F, ws_G, ws_watch_brand, ws_size_remark`
// 护理
const maintainType = `m_NID, m_name, m_price, m_time, m_color, m_demo, m_wash`
// 充值
const rechargeType = `r_amount`
// 配饰
const ornamentType = `o_NID, o_name`

export const orderType = `{
  _id, type, source, pay, pay_type, urgent_day, urgent_price, order_state, transport_company, transport_id,
  transport_price, transport_name, transport_phone, transport_address, transport_zipcode, remark,
  shop{_id,name}, guide{_id,name}, customer{_id,name,phone}, 
  ${shoesType}, ${beltType}, ${watchStrapType}, ${maintainType}, ${rechargeType}, ${ornamentType}
}`