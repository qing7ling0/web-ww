/**
 * 是否是有效的帐号
 */
module.exports.isAccountValid = function(value) {
  var tel = /^[a-zA-Z0-9_-]*$/;;
  return tel.test(value);
}

/**
 * 是否是有效的密码
 */
module.exports.isPasswordValid = function(value) {
  var tel = /^[0-9a-zA-Z~!@#$%^&*()_+-=[]{<>,.\/?|`}]*$/;
  return tel.test(value);
}

module.exports.sha1 = function(value) {
  var sha1 = crypto.createHash('sha1');
	sha1.update(str, 'utf8');
	return md5sum.digest('hex');
}