require("../bootstrap");
window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);


$(document).ready(function(){
    $('.headIcon').on('click',function(){
        if($(this).hasClass('headIconScreen')){
            $('.headIconMobile').removeClass('headIcon_selected');
            $(this).addClass('headIcon_selected')
            $('#preview').removeClass('preview_mobile').addClass('preview_screen')
        }else if($(this).hasClass('headIconMobile')){
            $('.headIconScreen').removeClass('headIcon_selected');
            $(this).addClass('headIcon_selected')
            $('#preview').removeClass('preview_screen').addClass('preview_mobile')
        }
    })
})
