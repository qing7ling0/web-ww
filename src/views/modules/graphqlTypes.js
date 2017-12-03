export const userType = `
{
  ... on userShopGuide {
    _id,
    name,
    manager,
    sex,
    shop {
      _id, name
    },
    birthday,
    height,
    weight,
    entry_time,
    leave_time,
    editor_name,
    editor_time,
    account {
      _id,
      account
    }
  }
  ... on userOperate {
    _id,
    name,
    sex,
    editor_name,
    editor_time,
    account {
      _id,
      account
    }
  }
  ... on userProduction {
    _id,
    name,
    sex,
    step,
    editor_name,
    editor_time,
    account {
      _id,
      account
    }
  }
  ... on userAdmin {
    _id,
    name,
    sex,
    editor_name,
    editor_time,
    account {
      _id,
      account
    }
  }
}`

export const shopType = `{
  _id,
  name,
  open_date,
  rents_expire_date,
  rent,
  area,
  country,
  region,
  province,
  marketLevel,
  property,
  phone,
  address,
  zipcode,
  close_date,
  close_reason,
  editor_name,
  editor_time,
}`

export const customerType = `{
  _id,
  name,
  phone,
  sex,
  birthday,
  vip_card_date,
  vip_card_shop,
  vip_card_guide,
  vip_level,
  join_type,
}`

export const materialType = `{
  _id, name, color{_id,name}, count
}`

export const salesBaseType = `{
  _id, name,
  editor_name,
  editor_time,
}`

export const colorType = `{
  _id, name, type,
  editor_name,
  editor_time
}`

export const maintainType = `{_id, name, type, price, NID, time, editor_name, editor_time}`

export const goodsShoesType = `{
  _id,
  name,
  property,
  put_date,
  sex,
  height,
  price,
  maintain_cycle,
  type {
    _id,
    name
  },
  style {
    _id,
    name
  },
  season {
    _id,
    name
  },
  xuan_hao,
  out_color {
    _id,
    name
  },
  in_color {
    _id,
    name
  },
  bottom_color {
    _id,
    name
  },
  bottom_side_color {
    _id,
    name
  },
  editor_name,
  editor_time,
}`

export const footType = `{
  _id,
  type,
  size,
  length,
  zhiWei,
  fuWei,
}`

export const orderBaseFields = `
  _id,
  type,
  source,
  count,
  pay,
  pay_type,
  xieXuan,
  xieGen,
  order_state,
  transport_company,
  transport_id,
  transport_price,
  remark
`
export const orderShoseType = `{
  ${orderBaseFields},
  shop{_id, name},
  guide{_id, name},
  customer{_id, name},
  goods{_id, name},
  left_foot ${footType},
  right_foot ${footType},
}
`

export const orderBeltType = `{
  ${orderBaseFields},
  shop {_id, name},
}
`
export const orderWatchStrapType = `{
  ${orderBaseFields},
  shop {_id, name},
}
`

export const orderTypes ={
  orderShoes:orderShoseType,
  orderBelt:orderBeltType,
  orderWatchStrap:orderWatchStrapType
}

export const pageListType = (itemType) =>{ 
  return`
    {page {page,pageSize,total}
    list ${itemType}}
  `
}

export const resultType = `
  {n,ok}
`