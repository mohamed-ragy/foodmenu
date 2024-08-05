draw_page_setup = function(){
    $('#page_setup').find('.editor_popup_title').text(texts.website_style.page_setup)
    $('#page_setup').find('.editor_popup_body_shortcuts').append(
        $('<div/>',{class:`editor_popup_body_shortcut ico-styling editor_popup_show_shortcut editor_popup_body_shortcut_selected`,tooltip:texts._styling,key:'styling'}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-sizing editor_popup_show_shortcut`,tooltip:texts.sizing,key:'sizing'}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-pageTransition editor_popup_show_shortcut`,tooltip:texts.website_style.pageTransition,key:'pageTransition'}),
        $('<div/>',{class:`editor_popup_body_shortcut ico-smoothScroll editor_popup_show_shortcut`,tooltip:texts.website_style.smoothScroll,key:'smoothScroll'}),
    )
    $('#page_setup').addClass('w350 h600').find('.editor_popup_body').text('').append(
        draw_editors_container({
            is_responsive:false,
            editors:[
                $('<div/>',{class:'w100p editor_popup_shortcut_content',key:'styling'}).append(
                    $('<div/>',{class:'editor_popup_container w100p',key:'page_setup_styling'}).append(
                        $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.default_font_color}),
                            draw_color_picker({
                                key_tree:'page_setup',
                                variable_key:null,
                                key:'font_color',
                            })
                        ),
                        $('<div/>',{class:'editor_popup_row'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.default_bg_color}),
                            draw_color_picker({
                                key_tree:'page_setup',
                                variable_key:null,
                                key:'bg_color',
                            })
                        ),
                        draw_editor_show_container({
                            key:'page_setup_font_style',
                            name:texts.styling.default_font_style,
                            row_class:true,
                        }),
                    ),
                    $('<div/>',{class:'editor_popup_container none w100p',key:'page_setup_font_style',parent_key:'page_setup_styling'}).append(
                        draw_font_style_picker({
                            key_tree:'page_setup.font_style',
                            variable_key:null,
                        })
                    )

                ),
                $('<div/>',{class:'w100p editor_popup_shortcut_content none',key:'sizing'}).append(
                    $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.max_content_width}),
                        draw_input_list({
                            key_tree:'page_setup',
                            variable_key:null,
                            key:'max_width',
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
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.mobile_max_width}),
                        draw_number_picker({
                            key_tree:'page_setup',
                            variable_key:null,
                            key:'mobile_max_width',
                            step:'10',
                            units:['px'],
                        })
                    )
                ),
                $('<div/>',{class:'w100p editor_popup_shortcut_content none',key:'pageTransition'}).append(
                    $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.website_style.pageTransition}),
                        $('<div/>',{class:'row alnC jstfySB'}).append(
                            draw_input_list({
                                key_tree:'page_setup',
                                variable_key:null,
                                key:'pageTransition',
                                selections:get_inputList_obj('pageTransition'),
                            }),
                            $('<div/>',{class:'pageTransition_preview mis-5 fs105 pointer ico-play'})
                        )
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.website_style.transitionDuration}),
                        draw_select_range({
                            key_tree:'page_setup',
                            variable_key:null,
                            key:'transitionDuration',
                            keys_arr:[{key:'',key_tree:'page_setup'}],
                            range:{min:100,max:1500,step:1},
                            unit:'ms'
                        }),
                    ),
                ),
                $('<div/>',{class:'w100p editor_popup_shortcut_content none',key:'smoothScroll'}).append(
                    $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.website_style.smoothScroll}),
                        draw_switch_btn({
                            key_tree:'page_setup',
                            variable_key:null,
                            key:'smooth_scroll',
                            show_hide:'smoothScrollDistance_inputList'
                        }),
                    ),
                    $('<div/>',{class:'editor_popup_col smoothScrollDistance_inputList'}).append(
                        $('<div/>',{class:'fs09',text:texts.website_style.smoothScrollDistance}),
                        draw_select_range({
                            key_tree:'page_setup',
                            variable_key:null,
                            key:'smooth_scroll_distance',
                            range:{min:100,max:1000,step:1},
                            unit:'px'
                        }),
                    ),
                    $('<div/>',{class:'editor_popup_col smoothScrollDistance_inputList'}).append(
                        $('<div/>',{class:'fs09',text:texts.website_style.smoothScrollDuration}),
                        draw_select_range({
                            key_tree:'page_setup',
                            variable_key:null,
                            key:'smooth_scroll_duration',
                            range:{min:100,max:1500,step:1},
                            unit:'ms'
                        }),
                    )
                ),

            ]
        })
    )

}

//events
// $('body').on('click','.editor_page_setup',function(){
//     let shortcut = $(this).attr('key');
//     $('.editor_popup_page_setup_container').addClass('none');
//     $(`.editor_popup_page_setup_container[key="${shortcut}"]`).removeClass('none');
//     $(this).closest('.editor_popup').find('.editor_popup_container').removeClass('none')
//     $(this).closest('.editor_popup').find('.editor_popup_container[parent_key]').addClass('none')
// })
$('body').on('click','.pageTransition_preview',function(e){
    play_page_transition($('#page'),window.template.page_setup.pageTransition,window.template.page_setup.transitionDuration)
})
window.scrolling = false;
$('#website').on('wheel', function(e){
    if(window.window.scrolling == true){
        e.preventDefault()
        return;
    }
    if($('#website').css('overflow-y') == 'hidden'){return;}
    // if(!$('.popup_container').hasClass('none')){return;}
    if(window.template.page_setup.smooth_scroll == '0'){return;}
    if(event.wheelDelta < 0){
        window.scrolling = true;
        $('#website').stop(true,false).animate({scrollTop:$('#website').scrollTop() + parseFloat(window.template.page_setup.smooth_scroll_distance.replace('px',''))},{duration: parseInt(window.template.page_setup.smooth_scroll_duration.replace('ms','')),specialEasing: {width: "easeOutQuint",height: "easeOutQuint"}})
        setTimeout(()=>{
            window.scrolling = false;
        },window.template.page_setup.smooth_scroll_duration.replace('ms',''))
    }else{
        window.scrolling = true;
        $('#website').stop(true,false).animate({scrollTop:$('#website').scrollTop() - parseFloat(window.template.page_setup.smooth_scroll_distance.replace('px',''))},{duration: parseInt(window.template.page_setup.smooth_scroll_duration.replace('ms','')),specialEasing: {width: "easeOutQuint",height: "easeOutQuint"}})
        setTimeout(()=>{
            window.scrolling = false;
        },window.template.page_setup.smooth_scroll_duration.replace('ms',''))
    }
    
});

set_elem_animation_styles = function(elem,animation,keyframe,immediate){
    elem.css({
        'transition-duration':animation[`${keyframe}_duration`],
        'transition-delay':animation[`${keyframe}_delay`],
        'transition-timing-function':animation[`${keyframe}_timing_function`],
        'transform':animation[`${keyframe}_transform`],
        'transform-origin':animation[`${keyframe}_transform_origin`],
        'filter':animation[`${keyframe}_filter`],
    })
    if(immediate){
        elem.css({
            'transition-duration':'0ms',
            'transition-delay':'0ms',
        })
    }
}

// }
apply_scroll_animation = function(elem,scroll_direction){
    let elem_offset_top = elem.offset().top;
    let elem_offset_bottom = elem_offset_top + elem.height();
    let elem_data = get_elem_data(elem.attr('key_tree')).elem;
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
