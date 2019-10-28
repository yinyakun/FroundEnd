'use strict';
require('./index.css');
var _mm = require('util/mm.js');

var header = {
    init : function (){
        this.bindEvent();
    },
    onLoad : function(){
      var keyword = _mm.getUrlParam ('keyword');
      if (keyword){
          $('#search-input').val(keyword);
      }  
    },
    bindEvent : function(){
        var _this = this;
        // 点击搜索按钮后,提交
        $('#search-btn').click (function(){
            _this.searchSubmit(); 
        });
        // 输入回车后,做搜索提交
        $('#search-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    searchSubmit: function(){
        var keyword = $.trim($('#search-input').val());
        // 如果提交的时候有keyword 正常跳转到list 页
        if (keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }else{  // 如果keyword 为空, 直接返回首页
            _mm.goHome();
        }
    }
}
header.init();

