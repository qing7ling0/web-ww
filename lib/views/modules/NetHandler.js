'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NetUtils = require('../../base/utils/NetUtils');

var _NetUtils2 = _interopRequireDefault(_NetUtils);

var _Config = require('../constants/Config');

var config = _interopRequireWildcard(_Config);

var _Constants = require('../constants/Constants');

var constants = _interopRequireWildcard(_Constants);

var _Utils = require('../../base/utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var object2String = function object2String(object) {
  var ret = '';
  if (_Utils2.default.IsObject(object)) {
    var str = '';
    for (var key in object) {
      str = str + (str.length > 0 ? ',' : '') + key + ':' + object2String(object[key]);
    }
    ret = ret + '{' + str + '}';
  } else if (_Utils2.default.IsArray(object)) {
    var _str = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = object[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;

        _str = _str + (_str.length > 0 ? ',' : '') + object2String(value);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    ret = ret + '[' + _str + ']';
  } else if (_Utils2.default.IsBoolean(object) || _Utils2.default.IsNumber(object)) {
    ret = ret + object;
  } else if (_Utils2.default.IsString(object)) {
    ret = ret + JSON.stringify(object);
  }

  return ret;
};

var NetHandler = function () {
  function NetHandler() {
    _classCallCheck(this, NetHandler);
  }

  _createClass(NetHandler, null, [{
    key: 'reqUserList',
    value: function reqUserList() {}
  }, {
    key: 'getNetError',
    value: function getNetError(code, message) {
      return new Promise(function (resolve, reject) {
        resolve({ code: code, message: message });
      });
    }
  }, {
    key: 'reqLogin',
    value: function reqLogin(account, password) {
      var graphqlValue = '\n      mutation Mutation {\n        login(account:"' + account + '",password:"' + password + '"){\n          account, name\n        }\n        menus {\n          id,name,subMenus{id,name}\n        }\n        routers {\n          id, name, url\n        }\n      }\n    ';
      return _NetUtils2.default.graphqlJson(config.GetServerAddress() + '/api', graphqlValue);
    }
  }, {
    key: 'reqLogout',
    value: function reqLogout() {
      var graphqlValue = '\n      mutation Mutation {\n        logout {\n          success\n        }\n      }\n    ';
      return _NetUtils2.default.graphqlJson(config.GetServerAddress() + '/api', graphqlValue);
    }
  }, {
    key: 'getAdminList',
    value: function getAdminList(pageIndex) {
      return _NetUtils2.default.graphqlJson(config.GetServerAddress() + '/api', '\n      query Query {\n        adminList(page:' + pageIndex + ') {\n          _id, account, name, editor_time\n        }\n      }\n    ');
    }
  }, {
    key: 'addAdmin',
    value: function addAdmin(user, accountInfo) {
      console.log('user' + user.toString());
      var mut = '\n      mutation Mutation {\n        addAdmin(user:' + object2String(user) + ', account:' + object2String(accountInfo) + ') {\n          _id, account, name, editor_time\n        }\n      }\n    ';
      return _NetUtils2.default.graphqlJson(config.GetServerAddress() + '/api', mut);
    }
  }, {
    key: 'deleteAdmin',
    value: function deleteAdmin(ids) {}
  }, {
    key: 'updateAdmin',
    value: function updateAdmin(info) {}
  }, {
    key: 'query',
    value: function query(params) {
      return _NetUtils2.default.graphqlJson(config.GetServerAddress() + '/api', 'query Query {list{nickname}}');
    }
  }, {
    key: 'mutation',
    value: function mutation(params) {
      return _NetUtils2.default.graphqlJson(config.GetServerAddress() + '/api', 'mutation Mutation {\n      add(info:{account:"111", password:"111", nickname:"\u5C0F\u98DE\u98DE", name:"\u5F20\u98DE"}) {\n        nickname\n      }\n    }');
      // return netUtils.graphqlJson(config.GetServerAddress() + '/api', `mutation Mutation {${JSON.stringify(params)}}`)
    }
  }]);

  return NetHandler;
}();

exports.default = NetHandler;