draw_popup_window = function(){
    return;
    $('#popup_window').find('.editor_popup_title').text(texts.website_tools.popup_window)
    $('#popup_window').addClass('w500').find('.editor_popup_body').text('').append(
        $('<div/>',{class:'w100p editor_popup_container',key:'popup_window'}).append(
            $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_tools.popup_window_des}),
            $('<div/>',{class:'w100p mB40'}).append(
                $('<div/>',{class:'fs1 bold mB5 mT20',text:texts.styling.modal_overlay}),
                draw_color_picker({keys_arr:[{key_tree:`popup_window.elems.css`,key:`background-color`}],name:texts.styling.bg_color}),
                draw_select_box({
                    keys_arr:[{key:'backdrop-filter',key_tree:'popup_window.elems.css'}],
                    name:texts.styling.blur_level,
                    selections:[
                        {text:'',class:'ico-no',key:'blur(0px)'},
                        {text:texts.styling.weak,key:'blur(2px)'},
                        {text:texts.styling.medium,key:'blur(5px)'},
                        {text:texts.styling.strong,key:'blur(10px)'},
                    ],
                    selection_class:'pX10'
                }),
                $('<div/>',{class:'fs1 bold mB5 mT20',text:texts.website_tools.popupWindow}),
                draw_input_list({
                    keys_arr:[{key:'transition',key_tree:'popup_window'}],
                    name:texts.styling.transition,
                    selections:get_inputList_obj('transtions'),
                    after:$('<div/>',{class:'popupTransition_preview mis-5 fs101 pointer ico-play',})
                }),
                draw_select_range({
                    keys_arr:[{key:'animation-duration',key_tree:'popup_window.elems.children.popup_card.css'}],
                    name:texts.website_style.transitionDuration,
                    range:{min:100,max:1000,step:1},
                    unit:'ms'
                }),
                draw_select_padding({key_tree:'popup_window.elems.children.popup_card.css',step:1,units:['px'],is_responsive:true}),
                draw_editor_show_container({key:'popup_window_border',name:texts.styling.border,row_class:true}),
                draw_editor_show_container({key:'popup_window_shadow',name:texts.styling.drop_shadow,row_class:true}),
                draw_select_box({
                    keys_arr:[{key:'background',key_tree:`popup_window.elems.children.popup_card`}],
                    name:texts.styling.background,
                    selections:[
                        {text:texts.styling.color_theme,key:'color_theme',show_elem:'popup_window_editor_color_theme',hide_elem:'popup_window_editor_background_image'},
                        {text:texts.styling.image,key:'image',show_elem:'popup_window_editor_background_image',hide_elem:'popup_window_editor_color_theme'},
                    ],
                    selection_class:'pX10'
                }),
                $('<div/>',{class:`popup_window_editor_color_theme 100p ${window.template.popup_window.elems.children.popup_card.background != 'color_theme' ? 'none' : ''}`}).append(

                ),
                draw_editor_show_container({key:'popup_window_background_image',name:texts.styling.background_image,container_class:`popup_window_editor_background_image ${window.template.popup_window.elems.children.popup_card.background != 'image' ? 'none' : ''}`,row_class:true}),
                $('<div/>',{class:'fs1 bold mB5 mT20',text:texts.styling.popupCloseBtn}),
                draw_icon_selector({
                    keys_arr:[{key:'popup_close',key_tree:'popup_window.elems.children.popup_card.children'}],
                    name:texts.styling.icon,
                    icon_type:'close'
                }),
                // draw_transform_selector({keys_arr:[{key_tree:'popup_window.elems.children.popup_card.children.popup_close.css',key:'transform'}]}),
                //
                draw_number_picker({
                    keys_arr:[{key:'width',key_tree:'popup_window.elems.children.popup_card.children.popup_close.css',key2:'height',key_tree2:'popup_window.elems.children.popup_card.children.popup_close.css'}],
                    name:texts.website_style.size,
                    step:5,
                    units:['px'],
                }),
                draw_number_picker({
                    keys_arr:[{key:'padding',key_tree:'popup_window.elems.children.popup_card.children.popup_close.css'}],
                    name:texts.styling.padding,
                    step:1,
                    units:['px'],
                }),
                draw_select_border_radius({keys_arr:[`popup_window.elems.children.popup_card.children.popup_close.css`],step:1,units:['px'],is_responsive:false}),
                draw_number_picker({
                    keys_arr:[{key:'border-width',key_tree:'popup_window.elems.children.popup_card.children.popup_close.css'}],
                    name:texts.styling.border_width,
                    step:1,
                    units:['px'],
                }),
                draw_color_picker({keys_arr:[{key_tree:`popup_window.elems.children.popup_card.children.popup_close.css`,key:`border-color`}],name:texts.styling.border_color}),
                draw_color_picker({keys_arr:[{key_tree:`popup_window.elems.children.popup_card.children.popup_close.css`,key:`background-color`}],name:texts.styling.background_color}),
                draw_color_picker({keys_arr:[{key_tree:`popup_window.elems.children.popup_card.children.popup_close.css`,key:`fill`},{key_tree2:`popup_window.elems.children.popup_card.children.popup_close.css`,key2:`stroke`}],name:texts.styling.icon_color}),

                $('<div/>',{class:'fs1 bold mB5 mT20',text:texts.styling.popupCloseBtn_hover}),
                draw_color_picker({keys_arr:[{key_tree:`popup_window.elems.children.popup_card.children.popup_close.css_hover`,key:`border-color`}],name:texts.styling.border_color}),
                draw_color_picker({keys_arr:[{key_tree:`popup_window.elems.children.popup_card.children.popup_close.css_hover`,key:`background-color`}],name:texts.styling.background_color}),
                draw_color_picker({keys_arr:[{key_tree:`popup_window.elems.children.popup_card.children.popup_close.css_hover`,key:`fill`},{key_tree2:`popup_window.elems.children.popup_card.children.popup_close.css_hover`,key2:`stroke`}],name:texts.styling.icon_color}),

            ),
        ),
        $('<div/>',{class:'editor_popup_container w100p none',key:'popup_window_shadow',parent_key:'popup_window'}).append(
            draw_drop_shadow_select({
                keys_arr:['popup_window.elems.children.popup_card.css'],
            }),

        ),
        $('<div/>',{class:'editor_popup_container w100p none',key:'popup_window_border',parent_key:'popup_window'}).append(
            draw_color_picker({keys_arr:[{key_tree:`popup_window.elems.children.popup_card.children.popup_body.css`,key:`border-color`}],name:texts.styling.border_color}),
            // draw_select_box_border({
            //     keys_arr:['popup_window.elems.children.popup_card.children.popup_body.css']
            // }),
            draw_number_picker({
                keys_arr:[{key:'border-width',key_tree:'popup_window.elems.children.popup_card.children.popup_body.css'}],
                name:texts.styling.border_width,
                step:1,
                units:['px'],
            }),
            draw_select_border_radius({keys_arr:[`popup_window.elems.children.popup_card.css`,`popup_window.elems.children.popup_card.children.popup_body.css`],step:1,units:['px'],is_responsive:false}),
        ),
        $('<div/>',{class:'editor_popup_container w100p none',key:'popup_window_background_image',parent_key:'popup_window'}).append(
            draw_image_selector([{key:'background-image',key_tree:`popup_window.elems.children.popup_card.background_image`}]),
            draw_select_box({
                keys_arr:[{key:'background-size',key_tree:`popup_window.elems.children.popup_card.background_image`}],
                name:texts.styling.imageSize,
                selections:[
                    {text:texts.styling.cover,key:'cover'},
                    {text:texts.styling.contain,key:'contain'},
                ],
                is_responsive:true,
            }),
            draw_select_box({
                keys_arr:[{key:'background-attachment',key_tree:`popup_window.elems.children.popup_card.background_image`}],
                name:texts.styling.imageStyle,
                selections:[
                    {text:texts.styling.fixed,key:'fixed'},
                    {text:texts.styling.local,key:'local'},
                ],
                is_responsive:true,
            }),
            draw_image_position_selector({keys_arr:[{key:'background-position',key_tree:`popup_window.elems.children.popup_card.background_image`}],is_responsive:true}),
            draw_select_box({
                keys_arr:[{key:'background-repeat',key_tree:`popup_window.elems.children.popup_card.background_image`}],
                name:texts.styling.imageRepeat,
                selections:[
                    {text:texts.styling.repeat,key:'repeat'},
                    {text:texts.styling.no_repeat,key:'no-repeat'},
                ],
                is_responsive:true,
            }),
            draw_input_list({
                keys_arr:[{key:'background-blend-mode',key_tree:`popup_window.elems.children.popup_card.background_image`}],
                name:texts.styling.imageBlendMode,
                selections:get_inputList_obj('background_blend_mode'),
            }),
            draw_color_picker({keys_arr:[{key_tree:`popup_window.elems.children.popup_card.background_image`,key:`background-color`}],name:texts.styling.background_color}),
        )
    )
}

show_popup_window = function(callback=()=>{}){
    window.website_popup_opened = true;
    $('#website').find('.popup_container').remove();
    $('#website').prepend(generate_html(window.template.popup_window.elems,'popup_window.elems'))
    $('#website').css('overflow-y','hidden')
    $('.popup_container').css({
        'top':$('#website').scrollTop()+'px',
        'height':$('#website').height()+'px',
        'display':window.template.popup_window.elems.css.display
    }).removeClass('none')
    callback();
}
hide_popup_window = function(){
    window.website_popup_opened = false;
    $('#website').find('.popup_container').remove();
    $('.popup_container').css('display','none').addClass('none')
    $('#website').css('overflow-y','auto')
}
//events
$('body').on('click','.popup_close',function(e){
    //e.stopImmediatePropagation();
    hide_editor_popup('popup_window')
    hide_popup_window();
})
// $('body').on('click','.popupTransition_preview',function(e){
//     //e.stopImmediatePropagation();
//     play_transition($('.popup_card'),window.template.popup_window.transition,window.template.popup_window.elems.children.popup_card.css['animation-duration'])
// })
