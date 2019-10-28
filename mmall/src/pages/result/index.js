'use strict';
require ('./index.css');
require('../common/footer/index');

var _mm = require('util/mm.js');

$(function(){
    var type =  _mm.getUrlParam('type') || 'default';
    var $element = $('.' + type + '-success');
    $element.show();
})
