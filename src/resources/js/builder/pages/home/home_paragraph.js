show_edit_home_paragraph = function(key_tree){
    // deselect_all();
    hidePopupSelectors();
    let paragraph = get_key_tree(key_tree).elem;
    if(typeof(paragraph) === 'undefined'){return;}
    window.selected_elem = key_tree;
    $(`.home_elem[key_tree="${window.selected_elem}"]`).addClass('edit_home_elem_selected');
    $('#editor').find('.editor_popup_title').text(texts.elems.paragraph);
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_head_btn').addClass('none');
        $('#editor').addClass('mnw400').find('.editor_popup_body').text('').append(
            $('<div/>',{class:'editor_popup_container',key:'home_elem_paragraph'}).append(
                draw_editor_show_container({key:'paragraph_text',name:texts.styling.text,row_class:true}),
                draw_editor_show_container({key:'paragraph_positioning',name:texts.styling.positioning,row_class:true}),
                draw_editor_show_container({key:'paragraph_backdrop_filter',name:texts.styling.backdrop_filter,row_class:true}),
                draw_editor_show_container({key:'paragraph_border',name:texts.styling.border,row_class:true}),
                draw_editor_show_container({key:'paragraph_shadow',name:texts.styling.drop_shadow,row_class:true}),
                draw_editor_show_container({key:'paragraph_animation',name:texts.styling.animation,row_class:true}),
                //
            ),
            $('<div/>',{class:'editor_popup_container none',key:'paragraph_text',parent_key:'home_elem_paragraph'}).append(
                draw_color_picker({keys_arr:[{key_tree:`${key_tree}.css`,key:`color`}],name:texts.styling.font_color}),
                draw_color_picker({keys_arr:[{key_tree:`${key_tree}.css`,key:`background-color`}],name:texts.styling.bg_color}),
                draw_input_list({
                    keys_arr:[{key:'font_style',key_tree:key_tree}],
                    name:texts.styling.font_style,
                    selections:[
                        {name:'font_1',val:'font_1',class:'font_1'},
                        {name:'font_2',val:'font_2',class:'font_2'},
                        {name:'font_3',val:'font_3',class:'font_3'},
                    ]
                }),
                draw_number_picker({
                    keys_arr:[{key:'font-size',key_tree:`${key_tree}.css`}],
                    name:texts.styling.font_size,
                    step:.1,
                    units:['em'],
                    is_responsive:true
                }),
                draw_select_box({
                    keys_arr:[{key:'text-align',key_tree:`${key_tree}.css`}],
                    name:texts.styling.text_align,
                    selections:[
                        {text:'',class:'ico-position_left',key:'left'},
                        {text:'',class:'ico-position_hcenter',key:'center'},
                        {text:'',class:'ico-position_right',key:'right'},
                    ],
                    is_responsive:true,
                }),
                draw_text_shadow_selector({
                    keys_arr:[`${key_tree}.css`],
                    is_responsive:true,
                }),
                draw_elem_text_selector(key_tree)
            ),
            $('<div/>',{class:'editor_popup_container none',key:'paragraph_positioning',parent_key:'home_elem_paragraph'}).append(
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
                draw_select_range({
                    keys_arr:[{key:'max-width',key_tree:`${key_tree}.css`}],
                    name:texts.styling.max_width,
                    range:{max:100,min:10,step:1},
                    unit:'%',
                    is_responsive:true,
                }),
                draw_select_padding({key_tree:`${key_tree}.css`,step:1,units:['px'],is_responsive:true}),
                draw_select_margin({key_tree:`${key_tree}.css`,step:1,units:['px'],is_responsive:true}),
                // draw_transform_selector({keys_arr:[{key_tree:`${key_tree}.css`,key:'transform'}],is_responsive:true}),
                draw_zindex_selector({
                    keys_arr:[`${key_tree}.css`],
                    is_responsive:true,
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'paragraph_backdrop_filter',parent_key:'home_elem_paragraph'}).append(
                draw_backdrop_filter({
                    keys_arr:[{key_tree:`${key_tree}.css`,key:'backdrop-filter'}],
                    is_responsive:true,
                })
            ),
            $('<div/>',{class:'editor_popup_container none',key:'paragraph_border',parent_key:'home_elem_paragraph'}).append(
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
                    units:['px'],
                }),
                draw_select_border_radius({keys_arr:[`${key_tree}.css`],step:1,units:['px'],is_responsive:false}),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'paragraph_shadow',parent_key:'home_elem_paragraph'}).append(
                draw_drop_shadow_select({
                    keys_arr:[`${key_tree}.css`],
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'paragraph_animation',parent_key:'home_elem_paragraph'}).append(
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
                    range:{min:0,max:4000,step:1},
                    unit:'ms',
                    is_responsive:true,
                }),
                draw_select_range({
                    keys_arr:[{key:'transition-delay',key_tree:`${key_tree}.css`}],
                    name:texts.styling.animation_delay,
                    range:{min:0,max:4000,step:1},
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
                // draw_transform_selector({keys_arr:[{key_tree:`${key_tree}.animation`,key:'animationUp_transform'}],is_responsive:true,container_class:'transform_elem_animation'}),
                $('<div/>',{class:'bold fs101 mB10 mT40',text:texts.styling.animationDown}),
                draw_switch_btn({
                    keys_arr:[{key_tree:`${key_tree}.animation`,key:'animationDown'}],
                    name:texts.styling.enabled,
                    is_responsive:true,
                }),
                draw_opacity_selector({keys_arr:[{key:'animationDown_opacity',key_tree:`${key_tree}.animation`}],is_responsive:true,container_class:'opacity_elem_animation'}),
                // draw_transform_selector({keys_arr:[{key_tree:`${key_tree}.animation`,key:'animationDown_transform'}],is_responsive:true,container_class:'transform_elem_animation'}),
            )
        )
    })


}
