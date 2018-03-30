var mongoose = require('mongoose');
var moment = require('moment')
var DB = require('../db/DB')

var constants = require('../constants/constants')
var baseFields = require('./base-fields')

var Schema = mongoose.Schema;

const SHOP_GUIDE_FIELDS = {
  name: String,
  account: {type: Schema.Types.ObjectId, ref:'account'},
  manager: Boolean, // 是否店长
  sex: String, // 性别
  phone: String, // 电话
  shop: {type: Schema.Types.ObjectId, ref:'shop'}, // 店铺
  birthday: {type:Date, default:moment(1990-1-1, 'YYYY-MM-DD')}, // 生日
  height: Number, // 身高
  weight: Number, // 体重
  entry_time: {type:Date, default:moment().format('YYYY-MM-DD HH:mm:ss')}, // 入职日期
  leave_time: {type:Date, defautt:null}, // 离职日期
  user_type: {type:Number, default:constants.USER_TYPES.shopGuide},
  ...baseFields
}

// 店铺导购
var shopGuideSchema = new Schema(SHOP_GUIDE_FIELDS,{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
});
module.exports.userShopGuideModel = mongoose.model('user_shop_guide', shopGuideSchema);

// 运营人员
var operateSchema = new Schema({
  name: String,
  account: {type: Schema.Types.ObjectId, ref:'account'},
  sex: String,
  phone: String, // 电话
  user_type: {type:Number, default:constants.USER_TYPES.operate},
  power_type: {type:Number, default:constants.POWER_TYPES.MANAGER_NORMAL},
  department: {type:String, default:constants.E_DEPARTMENT_TYPES.normal},
  ...baseFields,
},{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
});
module.exports.userOperateModel = mongoose.model('user_operate', operateSchema);

// 生产人员
var productionSchema = new Schema({
  name: String,
  account: {type: Schema.Types.ObjectId, ref:'account'},
  sex: String,
  step: String,
  phone: String, // 电话
  user_type: {type:Number, default:constants.USER_TYPES.production},
  ...baseFields,
},{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
});
module.exports.userProductionModel = mongoose.model('user_production', productionSchema);

// 管理员
var adminSchema = new Schema({
  account: {type: Schema.Types.ObjectId, ref:'account'},
  name: String,
  sex: String,
  phone: String, // 电话
  user_type: {type:Number, default:constants.USER_TYPES.admin},
  ...baseFields,
},{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
});
module.exports.userAdminModel = mongoose.model('user_admin', adminSchema);


// 工作日历
var workCalendarSchema = new Schema({
  day: Date, // 日期
  guide: {type: Schema.Types.ObjectId, ref:'user_shop_guide', decription:'导购ID'},
  status: Number, // 状态，班，假，串，休
},{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
})
module.exports.guideWorkCalendarModel = mongoose.model('guide_work_calendar', workCalendarSchema);

// 排班记录
var workSchema = new Schema({
  day: Date, // 日期
  guide: {type: Schema.Types.ObjectId, ref:'user_shop_guide', decription:'导购ID'},
  type: Number, // 类型，请假，调班
  holiday_type: Number, // 假期类型，病假，事假，年假等
  change_guide: {type: Schema.Types.ObjectId, ref:'user_shop_guide', decription:'调班的导购ID'},
  change_day: Date, // 调班的日期
  status: Number, // 状态，是否同意
},{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
})
module.exports.guideWorkModel = mongoose.model('guide_work', workSchema);

// 工作留言
var workMessageSchema = new Schema({
  guide: {type: Schema.Types.ObjectId, ref:'user_shop_guide', decription:'导购ID'},
  type: Number, // 留言类型，个人，店铺
  date: Date, // 留言查看时间
  message: String, // 内容
  message_guide: {type: Schema.Types.ObjectId, ref:'user_shop_guide', decription:'留言的导购'},
  status: {type: Number, default:0}, // 状态，是否查看
},{
  timestamps: { createdAt: 'create_time', updatedAt: 'editor_time' }
})
module.exports.guideWorkMessageModel = mongoose.model('guide_work_message', workMessageSchema);