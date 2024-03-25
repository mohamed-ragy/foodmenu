require("../bootstrap");
window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
window.Cookies = require('js-cookie');
window.L = require("leaflet");



$(':root').css('--screen_height',`${$('#page').height()}px`)
$(window).resize(function(){
    $(':root').css('--screen_height',`${$('#page').height()}px`)
})
window.text = window.texts[window.lang]
window.text.page_title = window.title;
window.text.page_description = window.description;


draw_page(function(){
    $('#page').append(draw_home_page())
})
