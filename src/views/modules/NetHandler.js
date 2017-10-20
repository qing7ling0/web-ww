'use strict'
import netUtils from '../../base/utils/NetUtils'
import * as config from '../constants/Config'
import * as constants from '../constants/Constants'

class NetHandler {
  constructor() {

  }

  static reqUserList() {

  }

  static getNetError(code, message) {
    return new Promise(function(resolve, reject) {
      resolve({code:code, message:message});
     });
  }

  static reqLogin(account, password) {
    
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', `mutation Mutation {login(account:"${account}",password:"${password}"){account, name, nickname}}`)
  }

  static query(params) {
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', `query Query {list{nickname}}`)
  }

  static mutation(params) {
    return netUtils.graphqlJson(config.GetServerAddress() + '/api', `mutation Mutation {
      add(info:{account:"111", password:"111", nickname:"小飞飞", name:"张飞"}) {
        nickname
      }
    }`)
    // return netUtils.graphqlJson(config.GetServerAddress() + '/api', `mutation Mutation {${JSON.stringify(params)}}`)
  }
}

export default NetHandler;