'use strict';

require('./index.css');

var _mm = require('util/mm.js');
// 侧边导航
var navSide = {
    option :{
        name : '',
        navList :[
            {name : 'user-center',  desc : '个人中心',  href : './user-centet.html'},
            {name : 'order-list',   desc : '我的订单',  href : './order-lsit.html'},
            {name : 'pass-update',  desc : '修改密码',  href : './pass-update.html'},
            {name : 'about',        desc : '关于',     href: './about.html'}
        ]
    },
    init : function (option){
        //合并选项
        $.extend(this.option,open);
        this.renderNav();
    },
    renderNav: function(){
        // 计算active 数据
        for (var i = 0 , iLength = this.option.navList.length; i ++ ; i < iLength){
            if (this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        }
        // // 渲染list 数据
        // var navHtml = _mm
    }
}
header.init();

