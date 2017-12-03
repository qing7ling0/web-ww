'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetUtils = function () {
    function NetUtils() {
        _classCallCheck(this, NetUtils);
    }

    _createClass(NetUtils, null, [{
        key: 'request',
        value: function request(url, options) {
            return fetch(url, options).then(function (response) {
                return response.json();
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'postJson',


        /**
         *url :请求地址
         *data:参数(Json对象)
         */
        value: function postJson(url, data) {
            var fetchOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            return NetUtils.request(url, fetchOptions);
        }
    }, {
        key: 'graphqlJson',
        value: function graphqlJson(url, data) {
            console.log('graphqlJson url' + url + '; data=' + data);
            var fetchOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/graphql'
                },
                credentials: 'include',
                body: data
            };
            return NetUtils.request(url, fetchOptions);
        }

        //get请求
        /**
         *url :请求地址
         */

    }, {
        key: 'get',
        value: function get(url) {
            return NetUtils.request(url, null);
        }
    }]);

    return NetUtils;
}();

module.exports = NetUtils;
//# sourceMappingURL=NetUtils.js.map