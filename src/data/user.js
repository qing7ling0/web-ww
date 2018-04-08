
import moment from 'moment'
import { 
  userModel, 
  userShopGuideModel, 
  userOperateModel, 
  userProductionModel,
  userAdminModel,
  accountModel,
  orderModel,
  guideWorkMessageModel,
  guideWorkModel,
  guideWorkCalendarModel
} from '../models/index.js'

import fileData from './file'

import { ApiError, ApiErrorNames } from '../error/api-errors'
import utils from '../utils/utils'
import baseUtils from '../base/utils/utils'
import constants from '../constants/constants'
import config from '../constants/config'
// import 

const logUtil = require('../utils/log-utils');

class UserData {

  getUserModel(type) {
    switch(type) {
      case constants.USER_TYPES.shopGuide: 
        return userShopGuideModel;
      case constants.USER_TYPES.operate:
        return userOperateModel;
      case constants.USER_TYPES.production:
        return userProductionModel;
      case constants.USER_TYPES.admin:
        return userAdminModel;
      default:
      break;
    }
    return null;
  }

  async populateUserModel(type, query) {
    switch(type) {
      case constants.USER_TYPES.shopGuide: 
        return await query.populate('account').populate('shop').exec();
      case constants.USER_TYPES.operate:
        return await query.populate('account').exec();
      case constants.USER_TYPES.production:
        return await query.populate('account').exec();
      case constants.USER_TYPES.admin:
        return await query.populate('account').exec();
      default:
      break;
    }
    return null;
  }

  static checkPassword (value)  {
    if (!value) return false;

    if (!baseUtils.IsString(value)) return false;

    if (value.length < constants.ACCOUNT_MIN_LENGTH || value.length > constants.ACCOUNT_MAX_LENGTH) return false;

    return utils.isPasswordValid(value);
  }
    
  static checkAccount (value) {
    if (!value) return false;

    if (!baseUtils.IsString(value)) return false;

    if (value.length < constants.ACCOUNT_MIN_LENGTH || value.length > constants.ACCOUNT_MAX_LENGTH) return false;

    return utils.isAccountValid(value);
  }

  async getUserList(ctx, params) {
    let model = this.getUserModel(params.user_type);
    if (model) {
      let skip = 0;
      let limit = params.pageSize || 100;
      if (params.page) {
        skip = Math.max(params.page-1,0) * limit;
      }
      let conditions = params.conditions || {};
      let total = await model.find(conditions).count();
      let users = await this.populateUserModel(params.user_type, model.find(conditions).skip(skip).limit(limit));
      // console.log('users' + JSON.stringify(users) + "\ndfasdfasdfasdf");
      return {
        page:{page:params.page, pageSize:limit, total:total},
        list: users
      };
    } else {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
  }

  async getUserById(type, id) {
    return await this.getUserByConditions({_id:id});
  }
  async getUserByConditions(type, conditions) {
    let user = null;
    let model = this.getUserModel(type);
    if (model) {
      user = await this.populateUserModel(type, model.findOne(conditions));
    } else {
      throw new ApiError(ApiErrorNames.GET_FAIL);
    }
    return user;
  }

  async getUser(ctx, params) {
    if (params.user_type) {
      return null;
    } else {
      return await getUserById(params.type, params.id);
      if (!user) {
        throw new ApiError(ApiErrorNames.UPDATE_FAIL);
      }

      return user;
    }
  }

  /**
   * 添加用户信息
   * 
   * @param {any} ctx 
   * @param {user{usertype}, account{account, password}} params
   * @returns 
   * @memberof UserData
   */
  async addUser(ctx, params) {
    if (!params.user_type) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    } else {
      
      if (!params.user) { // 必须有用户信息
        throw new ApiError(ApiErrorNames.UPDATE_FAIL);
      }
      if (params.user && ctx && ctx.session && ctx.session.user) {
        params.user = utils.createEditorDoc(ctx.session.user, params.user);
      }

      let account = null;
      if (params.account && params.account.account && params.account.password) {
        // 验证格式是否合法
        if (!UserData.checkAccount(params.account.account) || !UserData.checkPassword(params.account.password)) {
          throw new ApiError(ApiErrorNames.ACCOUNT_PASSWORD_ERROR);
        }
        account = await accountModel.findOne({account:params.account.account});
        if (account && account.user) {
          let acUser = await this.getUserById(account.user_type, account.user);
          if (acUser)
            throw new ApiError(ApiErrorNames.ACCOUNT_EXIST); // 账号已存在
        }
        
        if (!account) {// 如果没有账号创建账号
          let info = {account:params.account.account, password:utils.sha1(params.account.password), user_type:params.user_type};
          account = await (new accountModel(info)).save();
        }
      }

      // 开始创建用户表
      let user = null;
      let model = this.getUserModel(params.user_type);
      if (model) {
        user = new model(params.user);
      }
      if (user) {
        let newUser = await user.save();
        if (newUser) {
          let info = {account:params.account.account, password:utils.sha1(params.account.password), user:newUser._id, user_type:params.user_type};
          if (account) { // 有账号但是没有使用，直接更新
            await accountModel.findByIdAndUpdate(account._id, info, {new:true});
          }

          if (account) { // 如果账号更新成功，则更新user中的account字段
            newUser = model.findByIdAndUpdate(newUser._id, {account:account._id}, {new:true}).populate('account');
          }
        }
        ctx.result = '添加成功！';
        return newUser;
      } else {
        throw new ApiError(ApiErrorNames.UPDATE_FAIL);
      }
    }
  }

  /**
   * 
   * @param {*} ctx 
   * @param {user{userType}, account{account, password}} params
   */
  async updateUser(ctx, userType, fields, options, modelOptions) {
    if (!userType) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
    if (!fields._id) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
    if (fields && ctx.session && ctx.session.user) {
      fields = utils.createEditorDoc(ctx.session.user, fields);
    }

    let account = null;
    // 更新账号信息
    if (fields.account) {
      let info = {};
      if ('account' in fields.account) {
        // 验证账号格式是否合法
        if (!UserData.checkAccount(fields.account.account)) {
          throw new ApiError(ApiErrorNames.ACCOUNT_PASSWORD_ERROR);
        }
        info.account = fields.account.account;
      }
      if ('password' in fields.account) {
        // 验证密码格式是否合法
        if (!UserData.checkPassword(fields.account.password)) {
          throw new ApiError(ApiErrorNames.ACCOUNT_PASSWORD_ERROR);
        }
        info.password = utils.sha1(fields.account.password);
        // console.log('nfo.password=' + info.password)
      }
      if (info) {
        if (info.account) {
          // 获取账号信息
          account = await accountModel.findOne({account:info.account})
          if (account && account.user) {
            // 根据账号获取用户信息
            let _model = this.getUserModel(account.user_type);
            if (_model) {
              let userInfo = await _model.findById(account.user);
              // 判断查找到的用户是否是要更新的用户
              if (userInfo && (userInfo._id !== fields._id || account.user_type !== userType)) {
                throw new ApiError(ApiErrorNames.ACCOUNT_EXIST);
              }
            }
          }
        }
        if (fields.account._id) { // 如果有账号则更新
          account = await accountModel.findByIdAndUpdate(fields.account._id, info, {new:true});
        } else { // 没有添加
          info.user_type = userType;
          info.user = fields._id;
          if (account) {
            account = accountModel.findByIdAndUpdate(account._id, info, {new:true});
          } else {
            account = await (new accountModel(info)).save();
          }
        }
      }
    }

    try {
      let user = null;
      let model = this.getUserModel(userType);
      if (model) {
        let info = {...fields};
        if (account) {
          info.account = account._id;
        } else {
          info.account = '';
        }
        // console.log('update user' + JSON.stringify(fields) + "; info=" + JSON.stringify(info));
        user = await model.findByIdAndUpdate(fields._id, info, modelOptions||{new:true});
        // console.log('update user' + JSON.stringify(user));
        return user;
      } else {
        throw new ApiError(ApiErrorNames.UPDATE_FAIL);
      }
    } catch(e) {
      // if (account && account._id) {
      //   info.account = account._id;
      // }
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
  }

  async deleteUserByIds(type, ids) {
    let users = null;
    let model = this.getUserModel(type);
    if (model) {
      await this.checkUserCanRemoveByIDS(ids, type)
      users = await model.deleteMany({_id:{$in:ids}});
      if (users && users.length > 0) {
        for(let i=0; i<users.length; i++) {
          await accountModel.findByIdAndRemove(users[i].account);
        }
      }
      return users;
    } else {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
  }

  async checkUserCanRemoveByIDS(ids, type) {
    if (type === constants.USER_TYPES.shopGuide) {
      let orders = await orderModel.find({guide:{$in:ids}});
      if (orders && orders.length > 0) {
        throw new ApiError(ApiErrorNames.DELETE_FAIL, '此导购有订单信息，无法删除！');
      }
    }

    return true;
  }

  async deleteUserById(type, id) {
    let user = null;
    let model = this.getUserModel(type);
    await this.checkUserCanRemoveByIDS([id], type);
    if (model) {
      user = await model.findByIdAndRemove(id);
      if (user) {
        await accountModel.findByIdAndRemove(user.account);
      }
      return user;
    } else {
      throw new ApiError(ApiErrorNames.DELETE_FAIL);
    }
  }

  async deleteUser(ctx, params) {
    let ret = null;
    let model = this.getUserModel(params.user_type);
    if (model || (params.ids && params.ids.length>0)) {
      await this.checkUserCanRemoveByIDS(params.ids, params.user_type);

      if (params.ids.length === 1) {
        ret = await model.deleteOne({_id:params.ids[0]});
      } else {
        ret = await model.deleteMany({_id:{$in:params.ids}});
      }
      if (ret) {
        ret = JSON.parse(ret);
      }
      if (ret && ret.ok == 1) {
        if (params.ids.length !== ret.n)
        {
          logUtil.debug('delete user count not equal ids=' + JSON.stringify(params.ids) + '; result=' + JSON.stringify(ret))
        }
        return params.ids;
      } else {
        throw new ApiError(ApiErrorNames.DELETE_FAIL);
      }
    } else {
      throw new ApiError(ApiErrorNames.DELETE_FAIL);
    }
  }

  /**
   * 登陆成功
   * 
   * @param {*} ctx 上下文
   * @param {*} user 登陆的账号
   * @param {*} isRelogin  是否重新登陆
   */
  async loginSuccess(ctx, user, isRelogin) {
    ctx.session.user = user;
    if (isRelogin) {
      await fileData.removeTempByUser(user);
    }

    return user;
  }

  // async 
  async login(ctx, params) {
    let superAdmin = require('./super-admin');
    if (superAdmin.account.account === params.account) {
      return this.loginSuccess(ctx, superAdmin, true);
    }

    if (ctx.session.user){
      logUtil.debug('login user session====' + JSON.stringify(ctx.session.user))
      return this.loginSuccess(ctx, ctx.session.user, false);
    }

    if (params.check) {
      throw new ApiError(ApiErrorNames.LOGIN_INVALID);
    }
    if (!UserData.checkAccount(params.account) || !UserData.checkPassword(params.password)) {
      throw new ApiError(ApiErrorNames.ACCOUNT_PASSWORD_ERROR);
    }

    let user = null;
    const account = await accountModel.findOne({account:params.account, password:utils.sha1(params.password)});
    if (account) {
      // console.log('params.password=' + utils.sha1(params.password) +"; params.account=" +params.account)
      user = await this.getUserById(account.user_type, account.user);
    } else {
      throw new ApiError(ApiErrorNames.ACCOUNT_PASSWORD_ERROR);
    }
    if (!user) {
      throw new ApiError(ApiErrorNames.ACCOUNT_PASSWORD_ERROR);
    }
    let ip = utils.getClientIp(ctx.req);
    console.log('ip ==============' + ip);
    await accountModel.findByIdAndUpdate(account._id, {
      last_login_ip:ip,
      last_login_time:moment().format('YYYY-MM-DD HH:mm:ss')
    }, {new:true})
    return this.loginSuccess(ctx, user, true);
  }
  
  async logout(ctx, params) {
    ctx.session.user = null;
    return {success:true};
  }

  types() {
    return constants.USER_TYPES;
  }

  // 获取导购最近3个月的排版情况
  async getLast3MonthWork(guideId) {
    if (!guideId) {
      throw new ApiError(ApiErrorNames.GET_FAIL);
    }
    let dateStr = moment().add(1, 'days').format('YYYY-MM-DD');
    let beganDate = moment(dateStr).subtract(3, 'months');
    let endDate = moment(dateStr);

    let conditions = {
      guide:guideId,
      day:{$gte:beganDate.toDate(), $lt:endDate.toDate()}
    }

    return await guideWorkCalendarModel.find(conditions);
  }

  /**
   * 获取当前日期的导购排班情况
   * 
   * @param {any} day 
   * @memberof UserData
   */
  async getDayWork(day) {
    return await guideWorkCalendarModel.find({day:day});
  }

  /**
   * 设置导购排班情况
   * 
   * @param {any} guideId 导购
   * @param {any} day 排版时间
   * @param {any} status 状态
   * @memberof UserData
   */
  async changeGuideWork(guideId, day, status) {
    if (!guideId) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
    if (!moment(day).isValid()) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL, '修改失败, 日期格式不对！');
    }
    if (moment().isBefore(moment(day))){
      throw new ApiError(ApiErrorNames.UPDATE_FAIL, '修改失败，已过期的时间！');
    }
    return await guideWorkCalendarModel.where({guide:guideId, day:moment(day).toDate()}).update({guide:guideId, day:moment(day).toDate(), status:status}, {upsert:true});
  }

  /**
   * 发送留言
   * @param {*} doc [
   *  guide 留言对象
   *  targetGuide 留言对象
   *  type 留言类型，个人或者店铺，默认个人
   *  date 留言查看时间，只能是3天内
   *  message 留言内容
   * ]
   */
  async sendGuideMessage(doc) {
    if (!doc || !doc.guide) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL, '留言失败');
    }
    if (!doc.targetGuide) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL, '留言失败，请选择一个留言对象');
    }
    if (!doc.message) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL, '留言失败，留言内容不能为空');
    }
    if (!moment(doc.date).isValid()) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL, '留言失败, 日期格式不对！');
    }

    if (!doc.type) {
      doc.type = constants.E_GUIDE_MESSAGE_TYPE.SELF;// 个人
    }

    let dayBegan = moment(0, 'HH').subtract(1, 'seconds');
    let dayEnd = moment(0,'HH').add(3, 'day');
    let dayCur = moment(doc.date);
    if (dayCur.isBetween(dayBegan, dayEnd)){ // 3天内
      throw new ApiError(ApiErrorNames.UPDATE_FAIL, '修改失败，只能留3天内的日期！');
    }

    return await guideWorkMessageModel.create(doc);
  }

  /**
   * 获取当前日期的留言
   * 
   * @param {any} guide 
   * @param {any} date 
   * @returns 
   * @memberof UserData
   */
  async getGuideMessage(guide, date) {
    if (!guide) {
      throw new ApiError(ApiErrorNames.GET_FAIL);
    }

    if (!moment(date).isValid()) {
      throw new ApiError(ApiErrorNames.GET_FAIL, '获取失败, 日期格式不对！');
    }

    return await guideWorkMessageModel.find({guide:guide, date:moment(date).toDate()});
  }

  /**
   * 假期申请
   * 
   * @param {any} guide 
   * @param {any} date 
   * @param {any} levelType 请假类型：事假，病假等
   * @memberof UserData
   */
  async guideLeaveApply(ctx, guide, date, levelType) {
    if (!guide || !levelType) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }

    if (!moment(date).isValid()) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL, '请假失败, 日期格式不对！');
    }
    
    return await guideWorkApplyModel.create({guide:guide, date:moment(date).toDate(), type:constants.E_WORK_TYPE.SELF, leave_type:E_LEAVE_TYPE.levelType});
  }

  /**
   * 同意或者拒绝请假申请
   * @param {*} ctx 
   * @param {*} id 申请ID
   * @param {*} agree 是否同意
   */
  async guideHandelLeaveApply(ctx, id, agree) {
    if (!id) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
    let data = await guideWorkModel.findById(id).populate("guide");
    if (!data || !data.guide) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL, '消息不存在');
    }

    // 检查是否是值班
    let workCan = await guideWorkCalendarModel.findOne({guide:data.guide._id, day:data.date, status:constants.E_WORK_STATUS.BAN});
    if (!workCan) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL,`${moment(data.date).format('YYYY-MM-DD')}不是${data.guide.name}值班，不需要请假！`);
    }

    let ret = await guideWorkModel.findByIdAndUpdate(id, {status:agree?1:2})
    if (ret) {
      if (agree) {
        if (ret.type === constants.E_WORK_TYPE.LEAVE) {
          try{
            let info = await this.changeGuideWork(ret.guide, ret.date, constants.E_WORK_STATUS.JIA);
            if (!info) {
              await guideWorkModel.findByIdAndUpdate(id, {status:0}) // 更新失败，还原
            }
          } catch(error) {
            await guideWorkModel.findByIdAndUpdate(id, {status:0}) // 更新失败，还原
            throw new ApiError(ApiErrorNames.UPDATE_FAIL, error.message);
          }
        }
      }
    }
  }

}

module.exports = new UserData();