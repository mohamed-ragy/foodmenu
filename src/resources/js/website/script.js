require("../bootstrap");
window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
window.Cookies = require('js-cookie');
window.L = require("leaflet");

require('./auth/auth.js')
require('./websocket/websocket.js')
require('./events/general_events.js')

require('./components/header.js')

$(document).ready(function(){
    // $(':root').css('--screen_height_minus_header',`calc(${$('body').outerHeight()}px - ${$('header').outerHeight()}px)`)
    // $(':root').css('--screen_height',`calc(${$('body').height()}px)`)
    // $(':root').css('--header_height',`${$('header').outerHeight()}px`)
    $(window).resize(function(){
        $(':root').css('--screen_height_minus_header',`calc(${$('body').outerHeight()}px - ${$('header').outerHeight()}px)`)
        $(':root').css('--screen_height',`calc(${$('body').height()}px)`)
        $(':root').css('--header_height',`${$('header').outerHeight()}px`)
        fix_header_nav_list();
    })

    // window.text = window.texts
    text.page_title = window.title;
    text.page_description = window.description;


    // open_page(function(){
    //     $('#page').append(draw_home_page())
    // })

    // call this function after getting the website data
    set_website_data = function(){
        $('.website_logo').attr('src',window.website.logo)
        $('.restaurant_name').text(window.website.websiteNames[window.lang])
    }
})
scroll_elem_animation = function(scroll_direction){
    $('[animation]').each(function(){


        let animationUp_class = `${$(this).attr('animation')}_animationUp`
        let animationDown_class = `${$(this).attr('animation')}_animationDown`

        let elem_offset_top = $(this).offset().top;
        if($(this).css('box-sizing') == 'border-box'){
            elem_offset_top = $(this).offset().top - parseFloat($(this).css('padding-top'))
        }
        let elem_offset_bottom = elem_offset_top + $(this).outerHeight();
        let window_height = $(window).height();
        let elem_animate_on;
        $(window).width() <= parseInt(window.mobile_max_width.replace('px','')) ? elem_animate_on = $(this).attr('animate_on_mobile') : elem_animate_on = $(this).attr('animate_on_desktop')
        if(scroll_direction == 'top'  && elem_offset_top > 0 && elem_offset_top  < window_height){
            $(this).css({
                'transition-duration':'0ms',
                'transition-delay':'0ms',
            });
            $(this).addClass(animationUp_class)
            setTimeout(()=>{
                $(this).css({
                    'transition-duration':'',
                    'transition-delay':'',
                });
                $(this).removeClass(animationUp_class)
            },10)
        }

        else if(scroll_direction == 'down'){
            if(elem_animate_on == 'on_fully_enter'){
                if(elem_offset_bottom > window_height){
                    $(this).addClass(animationDown_class)
                }else if(elem_offset_top < 0){
                    $(this).addClass(animationUp_class)

                }else{
                    $(this).removeClass(animationUp_class)
                    $(this).removeClass(animationDown_class)
                }
            }
            else if(elem_animate_on == 'on_enter'){
                if(elem_offset_top > window_height){
                    $(this).addClass(animationDown_class)
                }else if(elem_offset_top < 0){
                    $(this).addClass(animationUp_class)

                }else{
                    $(this).removeClass(animationUp_class)
                    $(this).removeClass(animationDown_class)
                }
            }
        }

        else if(scroll_direction == 'up'){
            if(elem_animate_on == 'on_fully_enter'){
                if(elem_offset_top < 0){
                    $(this).addClass(animationUp_class)
                }else if(elem_offset_bottom > window_height){
                    $(this).addClass(animationDown_class)
                }else{
                    $(this).removeClass(animationUp_class)
                    $(this).removeClass(animationDown_class)
                }
            }
            else if(elem_animate_on == 'on_enter'){
                if(elem_offset_bottom < 0){
                    $(this).addClass(animationUp_class)
                }else if(elem_offset_bottom > window_height){
                    $(this).addClass(animationDown_class)
                }else{
                    $(this).removeClass(animationUp_class)
                    $(this).removeClass(animationDown_class)
                }
            }
        }

    });

}

window.last_scroll_top = 0;
$('body').on('scroll',function(e){
    let scroll_direction;
    if(window.last_scroll_top < $('body').scrollTop()){
        scroll_direction = 'down';
    }else{
        scroll_direction = 'up';
    }
    window.last_scroll_top = $('body').scrollTop();
    scroll_elem_animation(scroll_direction);
})


get_website_data = function(){
    $.ajax({
        'url':'/api/website',
        data:{
            get_website_data:true,
        },success:function(r){
            window.website = r;
            set_website_data();
            $(':root').css('--screen_height_minus_header',`calc(${$('body').outerHeight()}px - ${$('header').outerHeight()}px)`)
            $(':root').css('--screen_height',`calc(${$('body').height()}px)`)
            $(':root').css('--header_height',`${$('header').outerHeight()}px`)
            hide_loading_screen();
            fix_header_nav_list();
        }
    })
}
