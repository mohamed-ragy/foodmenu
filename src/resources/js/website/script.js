require("../bootstrap");
window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
window.Cookies = require('js-cookie');
window.L = require("leaflet");

require('./auth/auth.js')
require('./websocket/websocket.js')

$(document).ready(function(){
    $(':root').css('--screen_height',`${$('#page').height()}px`)

    $(window).resize(function(){
        $(':root').css('--screen_height',`${$('#page').height()}px`)
    })

    window.text = texts[window.lang]
    text.page_title = window.title;
    text.page_description = window.description;


    draw_page(function(){
        $('#page').append(draw_home_page())
    })

})

