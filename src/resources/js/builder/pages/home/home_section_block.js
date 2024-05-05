show_edit_home_section_block = function(key_tree){
    select_section_black(key_tree);
    // hidePopupSelectors();
    let section_block = get_key_tree(key_tree).elem;
    if(typeof(section_block) === 'undefined'){return;}
    $('#editor').find('.editor_popup_title').text(texts.section_block);
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_head_btn').addClass('none');
        $('#editor').addClass('mnw400').find('.editor_popup_body').text('').append(

            $('<div/>',{class:'editor_popup_container',key:'home_section_block_editor'}).append(
                draw_select_box({
                    keys_arr:[{key:'flex-direction',key_tree:`${key_tree}.css`}],
                    name:texts.styling.elements_direction,
                    selections:[
                        {text:texts.select_elems.column,key:'column'},
                        {text:texts.select_elems.row,key:'row'},
                    ],
                    is_responsive:true,
                }),
                draw_select_box({
                    keys_arr:[{key:'flex-wrap',key_tree:`${key_tree}.css`}],
                    name:texts.styling.wrap_elements,
                    selections:[
                        {text:texts.select_elems.wrap,key:'wrap'},
                        {text:texts.select_elems.no_wrap,key:'nowrap'},
                    ],
                    is_responsive:true,
                }),
                draw_select_box({
                    keys_arr:[{key:'justify-content',key_tree:`${key_tree}.css`}],
                    name:texts.styling.align_elems,
                    selections:[
                        {text:texts.select_elems.start,key:'flex-start'},
                        {text:texts.select_elems.center,key:'center'},
                        {text:texts.select_elems.end,key:'flex-end'},
                    ],
                    is_responsive:true,

                }),
                draw_select_padding({key_tree:`${key_tree}.css`,step:1,unit:'px',is_responsive:true}),
                draw_editor_show_container({
                    key:'home_section_block_border',
                    name:texts.styling.border,
                    row_class:true,
                }),
                //
                draw_select_box({
                    keys_arr:[{key:'background',key_tree:key_tree}],
                    name:texts.styling.background,
                    selections:[
                        {text:texts.styling.none,key:'none',hide_elem:'section_block_backdrop_filter.section_block_background_image'},
                        {text:texts.styling.image,key:'image',show_elem:'section_block_background_image',hide_elem:'section_block_backdrop_filter'},
                        {text:texts.styling.backdrop_filter,key:'backdrop_filter',show_elem:'section_block_backdrop_filter',hide_elem:'section_block_background_image'},
                    ],
                    selection_class:'pX10'
                }),
                draw_editor_show_container({
                    key:'home_section_block_background_image',
                    name:texts.styling.background_image,
                    container_class:`section_block_background_image ${section_block.background != 'image' ? 'none' : ''}`,
                    row_class:true,
                }),
                draw_editor_show_container({
                    key:'home_section_backdrop_filter',
                    name:texts.styling.backdrop_filter,
                    container_class:`section_block_backdrop_filter ${section_block.background != 'backdrop_filter' ? 'none' : ''}`,
                    row_class:true,
                }),
                draw_editor_show_container({
                    key:'home_section_animation',
                    name:texts.styling.animation,
                    row_class:true,
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'home_section_block_border',parent_key:'home_section_block_editor'}).append(
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
                draw_select_border_radius({keys_arr:[`${key_tree}.css`],step:1,unit:'px',is_responsive:false}),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'home_section_block_background_image',parent_key:'home_section_block_editor'}).append(
                draw_image_selector([{key:'background-image',key_tree:`${key_tree}.background_image`}]),
                draw_select_box({
                    keys_arr:[{key:'background-size',key_tree:`${key_tree}.background_image`}],
                    name:texts.styling.imageSize,
                    selections:[
                        {text:texts.styling.cover,key:'cover'},
                        {text:texts.styling.contain,key:'contain'},
                    ],
                    is_responsive:true,
                }),
                draw_select_box({
                    keys_arr:[{key:'background-attachment',key_tree:`${key_tree}.background_image`}],
                    name:texts.styling.imageStyle,
                    selections:[
                        {text:texts.styling.fixed,key:'fixed'},
                        {text:texts.styling.local,key:'local'},
                    ],
                    is_responsive:true,
                }),
                draw_image_position_selector({keys_arr:[{key:'background-position',key_tree:`${key_tree}.background_image`}],is_responsive:true}),
                draw_select_box({
                    keys_arr:[{key:'background-repeat',key_tree:`${key_tree}.background_image`}],
                    name:texts.styling.imageRepeat,
                    selections:[
                        {text:texts.styling.repeat,key:'repeat'},
                        {text:texts.styling.no_repeat,key:'no-repeat'},
                    ],
                    is_responsive:true,
                }),
                draw_input_list({
                    keys_arr:[{key:'background-blend-mode',key_tree:`${key_tree}.background_image`}],
                    name:texts.styling.imageBlendMode,
                    selections:window.inputList_arr.background_blend_mode
                }),
                $('<div/>',{class:`editor_popup_row `}).append(
                    $('<div/>',{text:texts.styling.background_color}),
                    draw_color_picker({
                        keys_arr:[{key_tree:`${key_tree}.background_image`,key:'background-color'}]
                    }),
                ),

            ),
            $('<div/>',{class:'editor_popup_container none',key:'home_section_backdrop_filter',parent_key:'home_section_block_editor'}).append(
                draw_backdrop_filter({
                    keys_arr:[{key_tree:`${key_tree}.css`,key:'backdrop-filter'}],
                })
            ),
            $('<div/>',{class:'editor_popup_container none',key:'home_section_animation',parent_key:'home_section_block_editor'}).append(
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
                draw_color_picker({
                    keys_arr:[{key_tree:`${key_tree}.animation`,key:'animationUp_font_color'}],
                    name:texts.styling.font_color,
                }),
                draw_color_picker({
                    keys_arr:[{key_tree:`${key_tree}.animation`,key:'animationUp_background_color'}],
                    name:texts.styling.bg_color,
                }),
                draw_editor_show_container({key:'home_section_animation_up_backdrop_filter',name:texts.styling.backdrop_filter,row_class:true}),
                draw_opacity_selector({keys_arr:[{key:'animationUp_opacity',key_tree:`${key_tree}.animation`}],is_responsive:true,container_class:'opacity_elem_animation'}),
                draw_transform_selector({keys_arr:[{key_tree:`${key_tree}.animation`,key:'animationUp_transform'}],is_responsive:true,container_class:'transform_elem_animation'}),
                $('<div/>',{class:'bold fs101 mB10 mT40',text:texts.styling.animationDown}),
                draw_switch_btn({
                    keys_arr:[{key_tree:`${key_tree}.animation`,key:'animationDown'}],
                    name:texts.styling.enabled,
                    is_responsive:true,
                }),
                draw_color_picker({
                    keys_arr:[{key_tree:`${key_tree}.animation`,key:'animationDown_font_color'}],
                    name:texts.styling.font_color,
                }),
                draw_color_picker({
                    keys_arr:[{key_tree:`${key_tree}.animation`,key:'animationDown_background_color'}],
                    name:texts.styling.bg_color,
                }),
                draw_editor_show_container({key:'home_section_animation_down_backdrop_filter',name:texts.styling.backdrop_filter,row_class:true}),
                draw_opacity_selector({keys_arr:[{key:'animationDown_opacity',key_tree:`${key_tree}.animation`}],is_responsive:true,container_class:'opacity_elem_animation'}),
                draw_transform_selector({keys_arr:[{key_tree:`${key_tree}.animation`,key:'animationDown_transform'}],is_responsive:true,container_class:'transform_elem_animation'}),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'home_section_animation_up_backdrop_filter',parent_key:'home_section_animation'}).append(
                draw_backdrop_filter({
                    keys_arr:[{key_tree:`${key_tree}.animation`,key:'animationUp_backdrop_filter'}],
                    container_class:'backdrop_filter_elem_animation',
                })
            ),
            $('<div/>',{class:'editor_popup_container none',key:'home_section_animation_down_backdrop_filter',parent_key:'home_section_animation'}).append(
                draw_backdrop_filter({
                    keys_arr:[{key_tree:`${key_tree}.animation`,key:'animationDown_backdrop_filter'}],
                    container_class:'backdrop_filter_elem_animation',
                })
            )
        )

    });
}
select_section_black =function(key_tree){
    deselect_all();
    hide_editor_popup('editor')
    window.selected_section_block = key_tree;
    $(`.section_block[key_tree="${key_tree}"]`).addClass('section_block_selected')
}
select_section_elem = function(key_tree){
    deselect_all();
    hide_editor_popup('editor')
    window.selected_elem = key_tree;
    $(`.edit_home_elem[key_tree="${window.selected_elem}"]`).addClass('edit_home_elem_selected');
}
//
$('body').on('click','.section_block',function(e){
    // e.stopImmediatePropagation();
    // if($(this).children().hasClass('editing_edit_home_elem_editing')){return;}
    if($('.section_block_edit_btns:hover').length > 0){return;}
    if($('.edit_home_elem:hover').length > 0){return;}
    select_section_black($(this).attr('key_tree'))
})
$('body').on('click','.section_block_edit_btn',function(e){
    // e.stopImmediatePropagation();
    show_edit_home_section_block($(this).attr('key_tree'))
})
///
show_edit_home_elem_editor_popup = function(elem_type,elem_key_tree){
    if(elem_type == 'title'){
        show_edit_home_title(elem_key_tree)
    }else if(elem_type == 'paragraph'){
        show_edit_home_paragraph(elem_key_tree)
    }else if(elem_type == 'image'){
        show_edit_home_image(elem_key_tree);
    }
}
$('body').on('click','.section_add_elem_btn',function(e){
    // e.stopImmediatePropagation();
    $('.add_elem_popup').attr('key_tree',$(this).attr('key_tree')).text('').css({
        'top':$(this).offset().top + $(this).outerHeight(),
        'left':$(this).offset().left,
    }).removeClass('none');
    for(const key in window.home_elems){
        $('.add_elem_popup').append(
            $('<div/>',{class:'add_elem_popup_elem',elem:window.home_elems[key]}).append(
                $('<div/>',{class:`ico-${window.home_elems[key]}`}),
                $('<div/>',{text:texts.elems[window.home_elems[key]]})
            )
        )
    }
})
$('body').on('click','.add_elem_popup_elem',function(e){
    // e.stopImmediatePropagation();
    let section_block = get_key_tree($('.add_elem_popup').attr('key_tree')).elem;
    let elem = get_home_elem($(this).attr('elem'));
    elem.sort = parseInt(section_block.children.length + 1);
    section_block.children.push(JSON.parse(JSON.stringify(elem)));
    new_action();
    show_edit_home_elem_editor_popup($(this).attr('elem'),`${$('.add_elem_popup').attr('key_tree')}.children.${(parseInt(section_block.children.length) - 1)}`)
})
//
$('body').on('click','.edit_home_elem',function(e){
    if($(this).hasClass('editing_edit_home_elem_editing')){return;}
    if($('.elem_edit_btns:hover').length > 0){return;}
    // e.stopPropagation();
    select_section_elem($(this).attr('key_tree'))

})
$('body').on('click','.edit_home_elem_btn',function(e){
    if($(this).closest('.edit_home_elem').hasClass('editing_edit_home_elem_editing')){return;}
    // e.stopPropagation();
    show_edit_home_elem_editor_popup($(this).closest('.edit_home_elem').attr('elem'),$(this).closest('.edit_home_elem').attr('key_tree'))

})
$('body').on('click','.delete_home_elem',function(e){
    e.stopPropagation();
    // e.stopImmediatePropagation();
    let key_tree = get_key_tree($(this).closest('.edit_home_elem').attr('key_tree'));
    key_tree.parent.children.splice(key_tree.elem_key,1);
    for(const key in key_tree.parent.children){
        key_tree.parent.children[key].sort =  parseInt(key) + 1;
    }
    hide_editor_popup('editor')
    deselect_all();
    new_action();
})
$('body').on('click','.swap_up_home_elem',function(e){
    e.stopPropagation();
    // e.stopImmediatePropagation();
    let key_tree = get_key_tree($(this).closest('.edit_home_elem').attr('key_tree'));
    let temp_from = key_tree.elem.sort;
    key_tree.parent.children.find(item=>item.sort == parseInt(temp_from) - 1).sort = temp_from;
    key_tree.elem.sort = parseInt(temp_from) - 1;
    hide_editor_popup('editor')
    new_action();
    deselect_all();
})
$('body').on('click','.swap_down_home_elem',function(e){
    e.stopPropagation();
    // e.stopImmediatePropagation();
    let key_tree = get_key_tree($(this).closest('.edit_home_elem').attr('key_tree'));
    let temp_from = key_tree.elem.sort;
    key_tree.parent.children.find(item=>item.sort == parseInt(temp_from) + 1).sort = temp_from;
    key_tree.elem.sort = parseInt(temp_from) + 1;
    hide_editor_popup('editor')
    new_action();
    deselect_all();
})
$('body').on('click','.edit_home_text_elem_text',function(e){
    // e.stopImmediatePropagation();
    draw_edit_home_text_elem_text($(this).closest('.edit_home_elem'))
    hide_editor_popup('editor')
})
$('body').on('dblclick','.add_elem_popup_elem_contenteditable',function(e){
    if($(this).hasClass('editing_edit_home_elem_editing')){return;}
    draw_edit_home_text_elem_text($(this).closest('.edit_home_elem'))
    hide_editor_popup('editor')
})
