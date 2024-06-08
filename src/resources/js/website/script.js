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

set_elem_animation = function(class_selector,animation,immediate=false){
    if(immediate){
        $(`.${class_selector}`).css({
            'transition-duration':'0ms',
            'transition-delay':'0ms',
        })
    }else{
        $(`.${class_selector}`).css({
            'transition-duration':'',
            'transition-delay':'',
        })
    }
    $(`.${class_selector}`)
    .removeClass(`${class_selector}_animation_up_out ${class_selector}_animation_up ${class_selector}_animation_in ${class_selector}_animation_down ${class_selector}_animation_down_out`)
    .addClass(`${class_selector}_animation_${animation}`);
}
apply_scroll_animation = function(elem,scroll_direction){
    let elem_offset_top = elem.offset().top;
    let elem_offset_bottom = elem_offset_top + elem.height();
    let class_selector = elem.attr('class_selector');
    let website_height = $(window).height();
    let website_offset_top = 0;
    // if(window.template.website_header.elems.css.position == 'sticky'){
        // website_height = website_height - $('.website_header').height();
        // website_offset_top = website_offset_top - $('.website_header').height();
    // }

    let up_out_start = website_offset_top;
    let up_out_end = website_height / 6;
    
    let up_start = up_out_end;
    let up_end = (website_height / 6) * 2;

    let down_start = (website_height / 6) * 4;
    let down_end = (website_height / 6) * 5;

    let down_out_start = down_end;
    let down_out_end = website_height; 

    let in_start = up_end;
    let in_end = down_start;
    
    if($('body').scrollTop() == 0 && elem_offset_bottom < down_out_end && scroll_direction != 'top'){
        set_elem_animation(class_selector,'in',false)
        return; 
    }
    if(scroll_direction == 'top'){
        if(elem_offset_top > up_out_start && elem_offset_top < down_out_end){
            set_elem_animation(class_selector,'up_out',true)
            setTimeout(()=>{
                set_elem_animation(class_selector,'in',false)
            },100)
        }
        if(elem_offset_top > down_out_start){
            set_elem_animation(class_selector,'down_out',true)
        }
        else if(elem_offset_bottom < up_out_end){
            if(elem.attr('animation_repeat') == '1' && $(window).width() > parseInt(window.mobile_max_width) || elem.attr('animation_mobile_repeat') == '1' && $(window).width() <= parseInt(window.mobile_max_width)){
                set_elem_animation(class_selector,'up_out',true)
            }
        }
    }


    if(scroll_direction == 'down'){
        if(elem_offset_top < down_end && elem_offset_top > down_start){
            if(elem.attr('animation_repeat') == '1' && $(window).width() > parseInt(window.mobile_max_width) || elem.attr('animation_mobile_repeat') == '1' && $(window).width() <= parseInt(window.mobile_max_width)){
                set_elem_animation(class_selector,'down',false)
            }
        }else if(elem_offset_top < in_end && elem_offset_top > in_start){
            set_elem_animation(class_selector,'in',false)
        }else if(elem_offset_top < up_end && elem_offset_top > up_start){
            if(elem.attr('animation_repeat') == '1' && $(window).width() > parseInt(window.mobile_max_width) || elem.attr('animation_mobile_repeat') == '1' && $(window).width() <= parseInt(window.mobile_max_width)){
                set_elem_animation(class_selector,'up',false)
            }
        }else if(elem_offset_top < up_out_end){
            if(elem.attr('animation_repeat') == '1' && $(window).width() > parseInt(window.mobile_max_width) || elem.attr('animation_mobile_repeat') == '1' && $(window).width() <= parseInt(window.mobile_max_width)){
                set_elem_animation(class_selector,'up_out',false)
            }
        }
    }else if(scroll_direction == 'up'){
        if(elem_offset_bottom > up_start && elem_offset_bottom < up_end){
            if(elem.attr('animation_repeat') == '1' && $(window).width() > parseInt(window.mobile_max_width) || elem.attr('animation_mobile_repeat') == '1' && $(window).width() <= parseInt(window.mobile_max_width)){
                set_elem_animation(class_selector,'up',false)
            }
        }else if(elem_offset_bottom > in_start && elem_offset_bottom < in_end){
            if(elem.attr('animation_repeat') == '1' && $(window).width() > parseInt(window.mobile_max_width) || elem.attr('animation_mobile_repeat') == '1' && $(window).width() <= parseInt(window.mobile_max_width)){
                set_elem_animation(class_selector,'in',false)
            }
        }else if(elem_offset_bottom > down_start && elem_offset_bottom < down_end){
            if(elem.attr('animation_repeat') == '1' && $(window).width() > parseInt(window.mobile_max_width) || elem.attr('animation_mobile_repeat') == '1' && $(window).width() <= parseInt(window.mobile_max_width)){
                set_elem_animation(class_selector,'down',false)
            }
        }else if(elem_offset_bottom > down_out_start){
            if(elem.attr('animation_repeat') == '1' && $(window).width() > parseInt(window.mobile_max_width) || elem.attr('animation_mobile_repeat') == '1' && $(window).width() <= parseInt(window.mobile_max_width)){
                set_elem_animation(class_selector,'down_out',false)
            }
        }
    }

}
scroll_elem_animation = function(scroll_direction){
    $('[animation]').each(function(){
        apply_scroll_animation($(this),scroll_direction)
    })
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
