import * as graphqlTypes from './graphqlTypes'

// 鞋子
const shoesType = `s_gui_ge, s_xuan_hao{_id,NID,name}, s_gen_gao{_id,NID,name}, s_material{_id,NID,name,maintain_cycle}, s_customs{_id, name, price, n_material{_id,name,NID}, d_material{_id,name,NID}}
  s_color_palette s_out_color{_id,NID,name},s_in_color{_id,NID,name},s_bottom_color{_id,NID,name},s_bottom_side_color{_id,NID,name}, s_tie_di{_id,NID,name}
  s_foot_size, s_left_length, s_left_zhiWei, s_left_fuWei, s_right_length,
  s_right_zhiWei, s_right_fuWei, s_production_step`
// 皮带
const beltType = `b_material{_id,NID,name,maintain_cycle}, b_color{_id,NID,name}, b_A, b_B, b_C, b_D, b_size_remark`
// 表带
const watchStrapType = `ws_material{_id,NID,name,maintain_cycle}, ws_style{_id,NID,name}, ws_color{_id,NID,name}, ws_A, ws_B, ws_C, ws_D, ws_E, ws_F, ws_G, ws_watch_brand, ws_size_remark`
// 护理
const maintainType = `m_name, m_price, m_time, m_color, m_demo, m_wash`
// 充值
const rechargeType = `r_amount`
// 配饰
const ornamentType = `o_name`

export const subOrderType = `{_id, NID, name, sex, price, count, type, sub_order_id, state, file, transport_company, transport_id, transport_price, remark, pics{file, desc}, transport_name, transport_phone, transport_address, transport_zipcode,
  shop{_id,name}, guide{_id,name}, customer${graphqlTypes.customerType}, urgent{_id,day,price}, create_time, editor_time,
  ${shoesType}, ${beltType}, ${watchStrapType}, ${maintainType}, ${rechargeType}, ${ornamentType}}`
export const orderType = `{_id, source, pay, pay_type, signature_pic, store_card_selected, cash_ticket_NID, shop{_id,name}, guide{_id,name},customer{_id,name,vip_level}, system_price, real_pay_price, discount_price, create_time}`
export const orderDetailType = `{
  _id, source, pay, pay_type, sub_orders${subOrderType}
}`
export const suborderTryFeedback = `{_id, message, suborder_id, transport_id, status, editor_name, editor_time, create_time}`
export const sampleGoodsType=`{_id, type, NID, sex, pics shop{_id,name}, left_count, right_count, s_foot_size, s_length, s_fuWei, s_zhiWei, b_A, b_B, b_C, b_D, ws_A, ws_B, ws_C, ws_D, ws_E, ws_F, ws_G, o_name}`

const sampleAllotBaseType = `{_id, name, phone}`
export const sampleAllotType=`{
  _id, sample${sampleGoodsType}, left_count, right_count, status, 
  apply_shop${sampleAllotBaseType}, apply_shop_guide${sampleAllotBaseType}, goods_user${sampleAllotBaseType}, accept_shop${sampleAllotBaseType}, accept_shop_guide${sampleAllotBaseType},
  transport_company, transport_id, transport_phone
}`