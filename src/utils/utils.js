import crypto from 'crypto'
import moment from 'moment'

/**
 * 是否是有效的帐号
 */
module.exports.isAccountValid = function(value) {
  var tel = /^[a-zA-Z0-9_-]*$/;
  return tel.test(value);
}

/**
 * 是否是有效的密码
 */
module.exports.isPasswordValid = function(value) {
  var tel = /^[0-9a-zA-Z~!@#$%\^&*\(\)_+-=\[\]\{\<\>\,\.\/?|\`\}]*$/;
  return tel.test(value);
}

module.exports.sha1 = function(value) {
  var sha1 = crypto.createHash('sha1');
	sha1.update(value, 'utf8');
	return sha1.digest('hex');
}

module.exports.diffent = function(newValue, oldValue) {
  if (Object.prototype.toString.call(newValue) !== "[object Object]" ||
    Object.prototype.toString.call(oldValue) !== "[object Object]") {
    return {};
  }

  let ret = {};
  for(let key in newValue) {
    if (key in oldValue) {
      if (oldValue[key] !== newValue[key]) {
        ret[key] = newValue[key];
      }
    } else {
      ret[key] = newValue[key];
    }
  }

  return ret;
}

module.exports.createEditorDoc = function(user, doc) {
  if (!user) return null;
  let ret = doc || {};
  ret.editor_id = user._id;
  ret.editor_name = user.name;
  return ret;
}

module.exports.getClientIp = function(req) {
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};