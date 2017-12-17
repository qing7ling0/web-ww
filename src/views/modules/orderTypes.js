import * as graphqlTypes from './graphqlTypes'

// 鞋子
const shoesType = `s_xuan_hao{_id,NID,name}, s_gui_ge{_id,NID,name}, s_material{_id,NID,name}, s_customs{_id, name, price}
  s_out_color{_id,NID,name},s_in_color{_id,NID,name},s_bottom_color{_id,NID,name},s_bottom_side_color{_id,NID,name}, s_tie_di{_id,NID,name}
  s_foot_size, s_left_length, s_left_zhiWei, s_left_fuWei, s_right_length,
  s_right_zhiWei, s_right_fuWei`
// 皮带
const beltType = `b_material{_id,NID,name}, b_color{_id,NID,name}, b_A, b_B, b_C, b_D, b_size_remark`
// 表带
const watchStrapType = `ws_material{_id,NID,name}, ws_style{_id,NID,name}, ws_A, ws_B, ws_C, ws_D, ws_E, ws_F, ws_G, ws_watch_brand, ws_size_remark`
// 护理
const maintainType = `m_name, m_price, m_time, m_color, m_demo, m_wash`
// 充值
const rechargeType = `r_amount`
// 配饰
const ornamentType = `o_name`

export const subOrderType = `{
  _id, NID, name, price, count, type, sub_order_id, urgent_day, urgent_price, state, transport_company, transport_id, transport_price, remark, pics{file, desc}, transport_name, transport_phone, transport_address, transport_zipcode,
  shop{_id,name}, guide{_id,name}, customer{_id,name,phone},
  ${shoesType}, ${beltType}, ${watchStrapType}, ${maintainType}, ${rechargeType}, ${ornamentType}
}`
export const orderType = `{
  _id, order_id, source, pay, pay_type, sub_orders
}`
export const orderDetailType = `{
  _id, order_id, source, pay, pay_type, sub_orders${subOrderType}
}`