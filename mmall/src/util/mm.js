'use strict';
var Hogan = require('hogan.js');
var conf = {
    serverHost : ''
};
var _mm = {
    // 网络请求
    request : function (param) {
        var _this = this;
        $.ajax({
            type        : param.method || 'get',
            url         : param.uri    || '',
            dataType    : param.type   || 'json',
            data        : param.data   || '',
            success     : function (res) {
                // 登录成功
                if (0 === res.status){
                    // 判断成功的方法是否存在, 如果存在, 返回过去
                    typeof  param.success === 'funcation' && param.success(res.data, res.msg);
                }
                // 没有登录状态,需要强制登录
                else if (10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if (1 === res.status){
                    // 判断成功的方法是否存在, 如果存在, 返回过去
                    typeof  param.error === 'funcation' && param.error(res.msg);
                }
            },
            // 请求出错,
            error       : function (error) {
                typeof  param.error === 'funcation' && param.error(res.statusText);

            }
        });
    },
    getServerUrl : function (path) {
        return conf.serverHost + path;
    },
    // 获取URL 参数
    getUrlParam : function (name) {
      // happmall.com/product/list?keywor=xxx&page=1
      var reg       = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var result    = window.location.search.substr(1).match(reg);
      return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html
    renderHtml : function (htmlTemplate,data) {
      var template = Hogan.compile(htmlTemplate);
      var result = template.render(data);
      return result;
    },
    // 成功提示
    successTips : function (message) {
      alert(msg || "操作成功");
    },
    errorTips : function (msg) {
        alert(msg || "操作失败");
    },
    // 字段的验证, 支持非空, 手机, 邮箱 判断
    validate : function (value, type) {
        var value = $.trim(value);
        // 非空验证
        if ('require' === type){
            return !!value;
        }
        // 手机号验证
        if ('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱
        if ('email' === type){
            var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            return pattern.test(value);
        }
    },
    doLogin : function () {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome: function () {
        window.location.href = '../view/index.html';
    }
};

module.exports = _mm;