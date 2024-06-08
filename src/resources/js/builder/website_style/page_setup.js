draw_page_setup = function(){
    return;
    $('#page_setup').find('.editor_popup_title').text(texts.website_style.page_setup)
    $('#page_setup').addClass(' h500').find('.editor_popup_body').text('').append(
        // $('<div/>',{class:'inter fs1 bold',text:texts.website_style.page_setup}),
        // $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_style.page_setup_des}),
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
                units:['px'],
            }),
            draw_input_list({
                keys_arr:[{key:'pageTransition',key_tree:'page_setup'}],
                name:texts.website_style.pageTransition,
                selections:window.inputList_arr.pageTransition,
                after:$('<div/>',{class:'pageTransition_preview mis-5 fs101 cG pointer ico-play'})
            }),
            draw_select_range({
                keys_arr:[{key:'transitionDuration',key_tree:'page_setup'}],
                name:texts.website_style.transitionDuration,
                range:{min:100,max:1500,step:1},
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
                    range:{min:100,max:1000,step:1},
                    unit:'px'
                }),
                draw_select_range({
                    keys_arr:[{key:'smooth_scroll_duration',key_tree:'page_setup'}],
                    name:texts.website_style.smoothScrollDuration,
                    range:{min:100,max:1500,step:1},
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
    if($('#website').css('overflow-y') == 'hidden'){return;}
    // if(!$('.popup_container').hasClass('none')){return;}
    if(window.template.page_setup.smooth_scroll == '0'){return;}
    if(event.wheelDelta < 0){
        $('#website').stop(true,false).animate({scrollTop:$('#website').scrollTop() + parseFloat(window.template.page_setup.smooth_scroll_distance.replace('px',''))},{duration: parseInt(window.template.page_setup.smooth_scroll_duration.replace('ms','')),specialEasing: {width: "easeOutQuint",height: "easeOutQuint"}})
    }else{
        $('#website').stop(true,false).animate({scrollTop:$('#website').scrollTop() - parseFloat(window.template.page_setup.smooth_scroll_distance.replace('px',''))},{duration: parseInt(window.template.page_setup.smooth_scroll_duration.replace('ms','')),specialEasing: {width: "easeOutQuint",height: "easeOutQuint"}})
    }

});

set_elem_animation_styles = function(elem,animation,keyframe,immediate){
    // for(const key in styles){
    //     elem.css(key,styles[key])
    // }
    elem.css({
        'transition-duration':animation[`${keyframe}_duration`],
        'transition-delay':animation[`${keyframe}_delay`],
        'transition-timing-function':animation[`${keyframe}_timing_function`],
        'transform':animation[`${keyframe}_transform`],
        'filter':animation[`${keyframe}_filter`],
    })
    if(immediate){
        elem.css({
            'transition-duration':'0ms',
            'transition-delay':'0ms',
        })
    }
}
// remove_elem_animation_styles = function(elem,duration,delay){
//     setTimeout(()=>{
//         if(window.current_view == 'desktop'){
//             elem.attr('style',elem.attr('style_desktop'))
//         }else if(window.current_view == 'mobile'){
//             elem.attr('style',elem.attr('style_mobile'))
//         }
//     },(parseInt(duration)) + (parseInt(delay)) + 100)

// }
apply_scroll_animation = function(elem,scroll_direction){
    let elem_offset_top = elem.offset().top;
    let elem_offset_bottom = elem_offset_top + elem.height();
    let elem_data = get_key_tree(elem.attr('key_tree')).elem;
    let animation;
    window.current_view == 'desktop' ? animation = elem_data.animation : window.current_view == 'mobile' ? animation = elem_data.animation_mobile : null;


    let website_offset_top = $('#website').offset().top
    let website_height = $('#website').height() + website_offset_top;

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
    
    // if(typeof(animation) !== 'object'){return}
    if(animation.name == 'no_animation'){return}
    if($('#website').scrollTop() == 0 && elem_offset_bottom < down_out_end && scroll_direction != 'top'){
        set_elem_animation_styles(elem,animation,'in',false);
        return; 
    }
    if(scroll_direction == 'top'){
        if(elem_offset_top > up_out_start && elem_offset_bottom < down_out_end){
            set_elem_animation_styles(elem,animation,'up_out',true)
            setTimeout(()=>{
                set_elem_animation_styles(elem,animation,'in',false)
            },100)
        }
        if(elem_offset_top > down_out_start){
            set_elem_animation_styles(elem,animation,'down_out',true)
        }
        else if(elem_offset_bottom < up_out_end){
            if(animation.repeat == '1'){
                set_elem_animation_styles(elem,animation,'up_out',true)
            }
        }
    }


    if(scroll_direction == 'down'){
        if(elem_offset_top < down_end && elem_offset_top > down_start){
            if(animation.repeat == '1'){
                set_elem_animation_styles(elem,animation,'down',false)
            }
        }else if(elem_offset_top < in_end && elem_offset_top > in_start){
            set_elem_animation_styles(elem,animation,'in',false)
        }else if(elem_offset_top < up_end && elem_offset_top > up_start){
            if(animation.repeat == '1'){
                set_elem_animation_styles(elem,animation,'up',false)
            }
        }else if(elem_offset_top < up_out_end){
            if(animation.repeat == '1'){
                set_elem_animation_styles(elem,animation,'up_out',false)
            }
        }
    }else if(scroll_direction == 'up'){
        if(elem_offset_bottom > up_start && elem_offset_bottom < up_end){
            if(animation.repeat == '1'){
                set_elem_animation_styles(elem,animation,'up',false)
            }
        }else if(elem_offset_bottom > in_start && elem_offset_bottom < in_end){
            if(animation.repeat == '1'){
                set_elem_animation_styles(elem,animation,'in',false)
            }
        }else if(elem_offset_bottom > down_start && elem_offset_bottom < down_end){
            if(animation.repeat == '1'){
                set_elem_animation_styles(elem,animation,'down',false)
            }
        }else if(elem_offset_bottom > down_out_start){
            if(animation.repeat == '1'){
                set_elem_animation_styles(elem,animation,'down_out',false)
            }
        }
    }

}
scroll_elem_animation = function(scroll_direction){
    if(window.current_view == 'desktop'){
        $('[animation]').each(function(){
            apply_scroll_animation($(this),scroll_direction)
        })
    }else if(window.current_view == 'mobile'){
        $('[animation_mobile]').each(function(){
            apply_scroll_animation($(this),scroll_direction)
        })
    }
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
