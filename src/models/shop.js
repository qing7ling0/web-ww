var mongoose = require('mongoose');
var moment = require('moment')
var DB = require('../db/DB')

var constants = require('../constants/constants')
var baseFields = require('./base-fields')

var Schema = mongoose.Schema;


export const shopFields = {
  name: {type:String, description:'门店名称'},
  open_date: { type: Date, default:moment().format('YYYY-MM-DD'), description:'开业时间' },
  rents_expire_date: {type: Date, default:moment().format('YYYY-MM-DD'), description:'房租到期时间'},
  rent: { type:String, description:'租金'},
  area: {type: Number, description:'面积'},
  country: { type:String, description:'国家' },
  region:{ type:String, description:'华东、华北、省份区域'},
  region_id:{ type: Schema.Types.ObjectId, ref:'common', description:'区域'},
  province: { type:String, description:'省' },
  marketLevel: { type:String, description:'市场级别' },
  property: {type:String, description:'店铺性质，是否特卖等'},
  phone: { type: String, description:'电话' },
  address: { type:String, description:'地址' },
  zipcode: { type:String, description:'邮编'},
  close_date: { type: Date, default:'', description:'关店时间'},
  close_reason: { type:String, description:'关店原因'},
  ...baseFields
};

// 店铺
var shopSchema = new Schema(shopFields,{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
});
shopSchema.virtual('regionInfo').get(function(){
  return this.country + '/' + this.region + '/' + this.province;
});

shopSchema.statics.toClient = function(item) {
  item.regionInfo = item.country + '/' + item.region + '/' + item.province;
  item.open_date = 'aaa';
  return item;
}

module.exports.shopModel = mongoose.model('shop', shopSchema);
