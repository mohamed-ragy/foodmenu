show_edit_home_image = function(key_tree){

    // hidePopupSelectors();
    select_section_elem(key_tree);
    let image = get_key_tree(key_tree).elem;
    if(typeof(image) === 'undefined'){return;}
    $('#editor').find('.editor_popup_title').text(texts.elems.image);
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_head_btn').addClass('none');
        $('#editor').addClass('mnw400').find('.editor_popup_body').text('').append(
            $('<div/>',{class:'editor_popup_container',key:'home_elem_iamge'}).append(
                draw_editor_show_container({key:'image_image',name:texts.styling.image,row_class:true}),
                draw_editor_show_container({key:'image_positioning',name:texts.styling.positioning,row_class:true}),
                draw_editor_show_container({key:'image_border',name:texts.styling.border,row_class:true}),
                draw_editor_show_container({key:'image_shadow',name:texts.styling.drop_shadow,row_class:true}),
                draw_editor_show_container({key:'image_animation',name:texts.styling.animation,row_class:true}),

            ),
            $('<div/>',{class:'editor_popup_container none',key:'image_image',parent_key:'home_elem_iamge'}).append(
                draw_image_selector([{key:'src',key_tree:`${key_tree}.children.0.attr`}]),
                draw_number_picker({
                    keys_arr:[{key:'width',key_tree:`${key_tree}.children.0.css`}],
                    name:texts.styling.image_width,
                    unit:'px',
                    step:'10',
                    is_responsive:true,
                }),
                draw_number_picker({
                    keys_arr:[{key:'height',key_tree:`${key_tree}.children.0.css`}],
                    name:texts.styling.image_height,
                    unit:'px',
                    step:'10',
                    is_responsive:true,
                }),
                draw_select_box({
                    keys_arr:[{key:'object-fit',key_tree:`${key_tree}.children.0.css`}],
                    name:texts.styling.imageSize,
                    selections:[
                        {text:texts.styling.cover,key:'cover'},
                        {text:texts.styling.contain,key:'contain'},
                    ],
                    is_responsive:true,
                }),
                draw_image_position_selector({keys_arr:[{key:'object-position',key_tree:`${key_tree}.children.0.css`}],is_responsive:true}),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'image_positioning',parent_key:'home_elem_iamge'}).append(
                draw_select_box({
                    keys_arr:[{key:'align-self',key_tree:`${key_tree}.css`}],
                    name:texts.styling.align_self,
                    selections:[
                        {text:texts.select_elems.start,key:'flex-start'},
                        {text:texts.select_elems.center,key:'center'},
                        {text:texts.select_elems.end,key:'flex-end'},
                    ],
                    is_responsive:true
                }),
                draw_select_padding({key_tree:`${key_tree}.css`,step:1,unit:'px',is_responsive:true}),
                draw_select_margin({key_tree:`${key_tree}.css`,step:1,unit:'px',is_responsive:true}),
                draw_transform_selector({keys_arr:[{key_tree:`${key_tree}.css`,key:'transform'}],is_responsive:true}),
                draw_zindex_selector({
                    keys_arr:[`${key_tree}.css`],
                    is_responsive:true,
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'image_border',parent_key:'home_elem_iamge'}).append(
                draw_color_picker({
                    keys_arr:[{key_tree:`${key_tree}.css`,key:'border-color'}],
                    name:texts.styling.border_color,
                }),
                draw_select_box_border({
                    keys_arr:[`${key_tree}.css`]
                }),
                draw_number_picker({
                    keys_arr:[{key:'border-width',key_tree:`${key_tree}.css`}],
                    name:texts.styling.border_width,
                    step:1,
                    unit:'px'
                }),
                draw_select_border_radius({keys_arr:[`${key_tree}.css`,`${key_tree}.children.0.css`],step:1,unit:'px',is_responsive:true}),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'image_shadow',parent_key:'home_elem_iamge'}).append(
                draw_drop_shadow_select({
                    keys_arr:[`${key_tree}.css`],
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'image_animation',parent_key:'home_elem_iamge'}).append(
                draw_input_list({
                    keys_arr:[{key:'transition-timing-function',key_tree:`${key_tree}.css`}],
                    name:texts.styling.animation_timing_function,
                    selections:window.inputList_arr.animation_timing_function,
                    is_responsive:true,
                    container_class:'animation_style_elem_animation',
                }),
                draw_select_range({
                    keys_arr:[{key:'transition-duration',key_tree:`${key_tree}.css`}],
                    name:texts.styling.animation_duration,
                    range:{min:0,max:4000,step:100},
                    unit:'ms',
                    is_responsive:true,
                }),
                draw_select_range({
                    keys_arr:[{key:'transition-delay',key_tree:`${key_tree}.css`}],
                    name:texts.styling.animation_delay,
                    range:{min:0,max:4000,step:100},
                    unit:'ms',
                    is_responsive:true,
                }),
                draw_select_box({
                    keys_arr:[{key:'animate_on',key_tree:`${key_tree}.animation`}],
                    name:texts.styling.start_animation_on,
                    selections:[
                        {text:texts.styling.enter_screen,class:'',key:'on_enter'},
                        {text:texts.styling.fully_enter_screen,class:'',key:'on_fully_enter'},

                    ],
                    is_responsive:true,
                }),
                $('<div/>',{class:'bold fs101 mB10 mT40',text:texts.styling.animationUp}),
                draw_switch_btn({
                    keys_arr:[{key_tree:`${key_tree}.animation`,key:'animationUp'}],
                    name:texts.styling.enabled,
                    is_responsive:true,
                }),
                draw_opacity_selector({keys_arr:[{key:'animationUp_opacity',key_tree:`${key_tree}.animation`}],is_responsive:true,container_class:'opacity_elem_animation'}),
                draw_transform_selector({keys_arr:[{key_tree:`${key_tree}.animation`,key:'animationUp_transform'}],is_responsive:true,container_class:'transform_elem_animation'}),
                $('<div/>',{class:'bold fs101 mB10 mT40',text:texts.styling.animationDown}),
                draw_switch_btn({
                    keys_arr:[{key_tree:`${key_tree}.animation`,key:'animationDown'}],
                    name:texts.styling.enabled,
                    is_responsive:true,
                }),
                draw_opacity_selector({keys_arr:[{key:'animationDown_opacity',key_tree:`${key_tree}.animation`}],is_responsive:true,container_class:'opacity_elem_animation'}),
                draw_transform_selector({keys_arr:[{key_tree:`${key_tree}.animation`,key:'animationDown_transform'}],is_responsive:true,container_class:'transform_elem_animation'}),
            )
        )
    });
}
