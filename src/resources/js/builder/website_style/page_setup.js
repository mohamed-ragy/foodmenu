draw_page_setup = function(){
    $('#page_setup').find('.editor_popup_title').text(texts.website_style.page_setup)
    $('#page_setup').addClass('w500 h500').find('.editor_popup_body').text('').append(
        // $('<div/>',{class:'inter fs1 bold',text:texts.website_style.page_setup}),
        $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_style.page_setup_des}),
        $('<div/>',{class:'w100p mB40'}).append(
            draw_input_list({
                keys_arr:[{key:'max_width',key_tree:'page_setup'}],
                name:texts.styling.max_content_width,
                selections:[
                    {name:'800px',val:'800px',class:''},
                    {name:'1000px',val:'1000px',class:''},
                    {name:'1200px',val:'1200px',class:''},
                    {name:'1400px',val:'1400px',class:''},
                    {name:'1600px',val:'1600px',class:''},
                    {name:'1800px',val:'1800px',class:''},
                    {name:'2000px',val:'2000px',class:''},
                    {name:'2200px',val:'2200px',class:''},
                    {name:'2400px',val:'2400px',class:''},
                    {name:'2600px',val:'2600px',class:''},
                    {name:'2800px',val:'2800px',class:''},
                    {name:'3000px',val:'3000px',class:''},
                ]
            }),
            draw_number_picker({
                keys_arr:[{key:'mobile_max_width',key_tree:'page_setup'}],
                name:texts.styling.mobile_max_width,
                step:'10',
                unit:'px'
            }),
            draw_color_theme_Picker({
                keys_arr:[{key:'page_color_theme',key_tree:'page_setup'}],
                name:texts.styling.color_theme
            }),
            draw_input_list({
                keys_arr:[{key:'pageTransition',key_tree:'page_setup'}],
                name:texts.website_style.pageTransition,
                selections:window.inputList_arr.pageTransition,
                after:$('<div/>',{class:'pageTransition_preview mis-5 fs101 pointer ico-play'})
            }),
            draw_select_range({
                keys_arr:[{key:'transitionDuration',key_tree:'page_setup'}],
                name:texts.website_style.transitionDuration,
                range:{min:100,max:1500,step:100},
                unit:'ms'
            }),
            draw_switch_btn({
                keys_arr:[{key:'smooth_scroll',key_tree:'page_setup'}],
                name:texts.website_style.smoothScroll,
                show_hide:'smoothScrollDistance_inputList'
            }),
            $('<div/>',{class:`smoothScrollDistance_inputList ${window.template.page_setup.smooth_scroll == '0' ? 'none' : '' } w100p`}).append(
                draw_select_range({
                    keys_arr:[{key:'smooth_scroll_distance',key_tree:'page_setup'}],
                    name:texts.website_style.smoothScrollDistance,
                    range:{min:100,max:1000,step:100},
                    unit:'px'
                }),
                draw_select_range({
                    keys_arr:[{key:'smooth_scroll_duration',key_tree:'page_setup'}],
                    name:texts.website_style.smoothScrollDuration,
                    range:{min:100,max:1500,step:100},
                    unit:'ms'
                }),
            )

        )
    )
}

//events

$('body').on('click','.pageTransition_preview',function(e){
    //e.stopImmediatePropagation();
    play_page_transition($('#page'),window.template.page_setup.pageTransition,window.template.page_setup.transitionDuration)
})



$('#website').on('wheel', function(e){
    if($('#website').css('overflow') == 'hidden'){return;}
    // if(!$('.popup_container').hasClass('none')){return;}
    if(window.template.page_setup.smooth_scroll == '0'){return;}
    if(event.wheelDelta < 0){
        $('#website').stop(true,false).animate({scrollTop:$('#website').scrollTop() + parseFloat(window.template.page_setup.smooth_scroll_distance.replace('px',''))},{duration: parseInt(window.template.page_setup.smooth_scroll_duration.replace('ms','')),specialEasing: {width: "easeOutQuint",height: "easeOutQuint"}})
    }else{
        $('#website').stop(true,false).animate({scrollTop:$('#website').scrollTop() - parseFloat(window.template.page_setup.smooth_scroll_distance.replace('px',''))},{duration: parseInt(window.template.page_setup.smooth_scroll_duration.replace('ms','')),specialEasing: {width: "easeOutQuint",height: "easeOutQuint"}})
    }

});
scroll_elem_animation = function(scroll_direction){
    $('[elem_animation="true"]').each(function(){
        let elem = get_key_tree($(this).attr('key_tree')).elem
        let elem_animation = window.current_view == 'desktop' ? elem.animation : window.current_view == 'mobile' ? elem.animation_mobile : null;
        let elem_offset_top = $(this).offset().top;
        if($(this).css('box-sizing') == 'border-box'){
            elem_offset_top = $(this).offset().top - parseFloat($(this).css('padding-top'))
        }
        let elem_offset_bottom = elem_offset_top + $(this).outerHeight();
        let window_height = $('#website').height();
        let elem_animate_on = elem_animation.animate_on;
        if(scroll_direction == 'top'  && elem_offset_top > 0 && elem_offset_top < $('#website').height() && elem_animation.animationUp == '1'){
            $(this).css({
                'transition-duration':'0ms',
                'transition-delay':'0ms',
            });
            $(this).css({
                'transform':elem_animation.animationUp_transform,
                'opacity':elem_animation.animationUp_opacity,
                'color':elem_animation.animationUp_font_color,
                'background-color':elem_animation.animationUp_background_color,
            })
            setTimeout(()=>{
                $(this).attr('style',window.current_view == 'desktop' ? $(this).attr('style_desktop') : window.current_view == 'mobile' ? $(this).attr('style_mobile') : '');
            },10)
        }
        else if(scroll_direction == 'down' && elem_animation.animationDown == '1'){
            if(elem_animate_on == 'on_fully_enter'){
                if(elem_offset_bottom > window_height){
                    $(this).css({
                        'transform':elem_animation.animationDown_transform,
                        'opacity':elem_animation.animationDown_opacity,
                        'color':elem_animation.animationDown_font_color,
                        'background-color':elem_animation.animationDown_background_color,
                        'backdrop-filter':elem_animation.animationDown_backdrop_filter,
                    })
                }else if(elem_offset_top < 0){
                    $(this).css({
                        'transform':elem_animation.animationUp_transform,
                        'opacity':elem_animation.animationUp_opacity,
                        'color':elem_animation.animationUp_font_color,
                        'background-color':elem_animation.animationUp_background_color,
                        'backdrop-filter':elem_animation.animationUp_backdrop_filter,
                    })
                }else{
                    $(this).attr('style',window.current_view == 'desktop' ? $(this).attr('style_desktop') : window.current_view == 'mobile' ? $(this).attr('style_mobile') : '');
                }
            }
            else if(elem_animate_on == 'on_enter'){
                if(elem_offset_top > window_height){
                    $(this).css({
                        'transform':elem_animation.animationDown_transform,
                        'opacity':elem_animation.animationDown_opacity,
                        'color':elem_animation.animationDown_font_color,
                        'background-color':elem_animation.animationDown_background_color,
                        'backdrop-filter':elem_animation.animationDown_backdrop_filter,
                    })
                }else if(elem_offset_top < 0){
                    $(this).css({
                        'transform':elem_animation.animationUp_transform,
                        'opacity':elem_animation.animationUp_opacity,
                        'color':elem_animation.animationUp_font_color,
                        'background-color':elem_animation.animationUp_background_color,
                        'backdrop-filter':elem_animation.animationUp_backdrop_filter,
                    })
                }else{
                    $(this).attr('style',window.current_view == 'desktop' ? $(this).attr('style_desktop') : window.current_view == 'mobile' ? $(this).attr('style_mobile') : '');
                }
            }
        }

        else if(scroll_direction == 'up' && elem_animation.animationUp == '1'){
            if(elem_animate_on == 'on_fully_enter'){
                if(elem_offset_top < 0){
                    $(this).css({
                        'transform':elem_animation.animationUp_transform,
                        'opacity':elem_animation.animationUp_opacity,
                        'color':elem_animation.animationUp_font_color,
                        'background-color':elem_animation.animationUp_background_color,
                        'backdrop-filter':elem_animation.animationUp_backdrop_filter,
                    })
                }else if(elem_offset_bottom > window_height){
                    $(this).css({
                        'transform':elem_animation.animationDown_transform,
                        'opacity':elem_animation.animationDown_opacity,
                        'color':elem_animation.animationDown_font_color,
                        'background-color':elem_animation.animationDown_background_color,
                        'backdrop-filter':elem_animation.animationDown_backdrop_filter,
                    })
                }else{
                    $(this).attr('style',window.current_view == 'desktop' ? $(this).attr('style_desktop') : window.current_view == 'mobile' ? $(this).attr('style_mobile') : '');
                }
            }
            else if(elem_animate_on == 'on_enter'){
                if(elem_offset_bottom < 0){
                    $(this).css({
                        'transform':elem_animation.animationUp_transform,
                        'opacity':elem_animation.animationUp_opacity,
                        'color':elem_animation.animationUp_font_color,
                        'background-color':elem_animation.animationUp_background_color,
                        'backdrop-filter':elem_animation.animationUp_backdrop_filter,
                    })
                }else if(elem_offset_bottom > window_height){
                    $(this).css({
                        'transform':elem_animation.animationDown_transform,
                        'opacity':elem_animation.animationDown_opacity,
                        'color':elem_animation.animationDown_font_color,
                        'background-color':elem_animation.animationDown_background_color,
                        'backdrop-filter':elem_animation.animationDown_backdrop_filter,
                    })
                }else{
                    $(this).attr('style',window.current_view == 'desktop' ? $(this).attr('style_desktop') : window.current_view == 'mobile' ? $(this).attr('style_mobile') : '');
                }
            }
        }
        // else if(elem_offset_top < animation_area_start){
        //     if(elem_animation.animationUp == '1'){
        //         $(this).css({
        //             'transform':elem_animation.animationUp_transform,
        //             'opacity':elem_animation.animationUp_opacity,
        //             'color':elem_animation.animationUp_font_color,
        //             'background-color':elem_animation.animationUp_background_color,
        //         })
        //     }

        // }else if(elem_offset_top > animation_area_end){
        //     if(elem_animation.animationDown == '1'){
        //         $(this).css({
        //             'transform':elem_animation.animationDown_transform,
        //             'opacity':elem_animation.animationDown_opacity,
        //             'color':elem_animation.animationDown_font_color,
        //             'background-color':elem_animation.animationDown_background_color,
        //             'backdrop-filter':elem_animation.animationDown_backdrop_filter,
        //         })
        //     }
        // }else{
        //     $(this).attr('style',window.current_view == 'desktop' ? $(this).attr('style_desktop') : window.current_view == 'mobile' ? $(this).attr('style_mobile') : '');
        // }
    })
}
window.last_scroll_top = 0;
$('#website').on('scroll',function(e){
    let scroll_direction;
    if(window.last_scroll_top < $('#website').scrollTop()){
        scroll_direction = 'down';
    }else{
        scroll_direction = 'up';
    }
    window.last_scroll_top = $('#website').scrollTop();
    set_adapted_header();
    scroll_elem_animation(scroll_direction);
})
