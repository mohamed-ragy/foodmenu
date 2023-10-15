// require("../bootstrap");
// window.Echo.connector.pusher.connection.bind('connected', () => {
//     window.websocketConnectCheck = true;
//     $.ajaxSetup({
//         headers: {
//             'X-Socket-Id': window.Echo.socketId(),
//             'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content'),
//         }
//     });
//         window.Echo.join('globalChannel');
// });
window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
// window.L = require("leaflet");
// Math.round(Math.random() * $('#bodyContent').innerHeight())
window.Cookies = require('js-cookie');
$(document).ready(function(){
    require("./functions")
    $('.bodyAnimatedIcon').each(function(){
        $(this).css({
            transform:'translateY('+Math.round(Math.random() * $('#bodyContent').innerHeight())+'px) translateX('+Math.round(Math.random() * $('#bodyContent').innerWidth())+'px)rotateZ('+Math.round(Math.random() * 120)+'deg)',
        })
    })
    $('.bodyAnimatedIcon').each(function(){
        $(this).css('transition-duration','240000ms');
    });
    $('.bodyAnimatedIcon').each(function(){
        $(this).css({
            transform:'translateY('+Math.round(Math.random() * $('#bodyContent').innerHeight())+'px) translateX('+Math.round(Math.random() * $('#bodyContent').innerWidth())+'px)rotateZ('+Math.round(Math.random() * 120)+'deg)',
        })
    })
    setInterval(function(){
        $('.bodyAnimatedIcon').each(function(){
            $(this).css({
                transform:'translateY('+Math.round(Math.random() * $('#bodyContent').innerHeight())+'px) translateX('+Math.round(Math.random() * $('#bodyContent').innerWidth())+'px)rotateZ('+Math.round(Math.random() * 120)+'deg)',
            })
        })
    },240000)

    $('body').animate({'opacity':1},500);
    let now = new Date();
    $('#footerYear').text(now.getFullYear());
    $('#navAccountDropDown').on('click',function(e){
        e.stopPropagation();
        $('#navDropDown').css({'display':'flex','top':$('#navAccountDropDown').position().top + $('#navAccountDropDown').height() +10,'right':$('#navAccountDropDown').position().right})
    })
    $(window).on('click',function(e){
        $('#navDropDown').hide();
    });

    $('#mobileNavShow').on('click',function(){
        $('#mobileNav').css('display','flex');
        $('#mobileNav').animate({'opacity':'1'},250)
    })
    $('#mobileNavHide').on('click',function(){
        $('#mobileNav').animate({'opacity':'0'},250);
        setTimeout(function(){
            $('#mobileNav').css('display','none');
        },250)
    });
    require('./help');
    let navHeight = $('#nav').height();
    // $('#nav').height(navHeight);
    // let bodyscrollPosition = 0;
    // $('#body').on('scroll',function(){
    //     if($('#body').scrollTop() > bodyscrollPosition){
    //         console.log('down')
    //         $('#nav').css({'height':'0em','padding':'0em 1em','overflow':'hidden'})
    //     }else if($('body').scrollTop() < bodyscrollPosition){
    //         console.log('up')
    //         $('#nav').css({'height':navHeight+'px','padding':'.5em 1em','overflow':'visible'})
    //     }
    //     bodyscrollPosition = $('#body').scrollTop();
    // })




});
