require('./animation_preview.js')

draw_animation_editor = function(data){
    let animations_preview_container;
    let editor = $('<div/>',{
        class:`editor animation_editor w100p`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
    }).append(
        $('<div/>',{class:'editor_popup_container w100p',key:'select_animation'}).append(
            draw_editor_show_container({
                name:texts.styling.customize_animation,
                key:'customize_animation',
                row_class:true,
                container_class:'editor_popup_brdrT_none editor_popup_brdrB',
            }),
            // $('<div/>',{class:'editor_popup_col'}).append(
                $('<div/>',{class:'m20 fs09',text:texts.styling.select_animation}),
                animations_preview_container = $('<div/>',{class:'selector animations_preview_container w100p row wrap alnC jstfyC',key_tree:data.key_tree,key:'name'})
            // )
        ),
        $('<div/>',{class:'editor_popup_container w100p none',key:'customize_animation',parent_key:'select_animation'}).append(
            $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                $('<div/>',{class:'fs09',text:texts.styling.repeat_animation}),
                draw_switch_btn({
                    key_tree:data.key_tree,
                    variable_key:data.variable_key,
                    key:'repeat',
                    show_hide:'editor_popup_show_container[key="animation_up"].editor_popup_show_container[key="animation_up_out"].editor_popup_show_container[key="animation_down"]',
                }),
            ),
            draw_editor_show_container({
                name:texts.styling.animation_up_out,
                key:'animation_up_out',
                row_class:true,
            }),
            draw_editor_show_container({
                name:texts.styling.animation_up,
                key:'animation_up',
                row_class:true,
            }),
            draw_editor_show_container({
                name:texts.styling.animation_in,
                key:'animation_in',
                row_class:true,
            }),
            draw_editor_show_container({
                name:texts.styling.animation_down,
                key:'animation_down',
                row_class:true,
            }),
            draw_editor_show_container({
                name:texts.styling.animation_down_out,
                key:'animation_down_out',
                row_class:true,
            }),
        ),
    );
    let keyframes = ['up_out','up','in','down','down_out'];
    for(const key in keyframes){
        let keyframe = keyframes[key];
        editor.append(
            $('<div/>',{class:'editor_popup_container w100p none',key:`animation_${keyframe}`,parent_key:'customize_animation'}).append(
                $('<div/>',{class:'mX15 fs1 mY20 bold',text:texts.styling[`animation_${keyframe}`]}),
                $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                    $('<div/>',{class:'fs09',text:texts.styling.duration}),
                    draw_number_picker({
                        key_tree:data.key_tree,
                        variable_key:data.variable_key,
                        key:`${keyframe}_duration`,
                        units:['ms'],
                        step:1,
                        container_class:'editor_preview_animation'
                    }),
                ),
                $('<div/>',{class:'editor_popup_row'}).append(
                    $('<div/>',{class:'fs09',text:texts.styling.delay}),
                    draw_number_picker({
                        key_tree:data.key_tree,
                        variable_key:data.variable_key,
                        key:`${keyframe}_delay`,
                        units:['ms'],
                        step:1,
                        container_class:'editor_preview_animation'
                    }),
                ),
                draw_editor_show_container({
                    name:texts.styling.animation_timing_function,
                    key:`animation_${keyframe}_timing_function`,
                    row_class:true,
                }),
                draw_editor_show_container({
                    name:texts.styling.transform,
                    key:`animation_${keyframe}_transform`,
                    row_class:true,
                }),
                draw_editor_show_container({
                    name:texts.styling.filter,
                    key:`animation_${keyframe}_filter`,
                    row_class:true,
                    container_class:'editor_popup_row_border_bottom'
                }),    
            ),
            $('<div/>',{class:'editor_popup_container w100p none',key:`animation_${keyframe}_timing_function`,parent_key:`animation_${keyframe}`}).append(
                draw_timing_function_editor({
                    key_tree:data.key_tree,
                    variable_key:data.variable_key,
                    key:`${keyframe}_timing_function`,
                    container_class:'editor_preview_animation2'
                })
            ),
            $('<div/>',{class:'editor_popup_container w100p none',key:`animation_${keyframe}_transform`,parent_key:`animation_${keyframe}`}).append(
                $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                    $('<div/>',{class:'fs09',text:texts.styling.transform_origin}),
                    draw_input_list({
                        key_tree:data.key_tree,
                        variable_key:data.variable_key,
                        key:`${keyframe}_transform_origin`,
                        selections:[
                            {name:texts.styling.center,val:'center'},
                            {name:texts.styling.top,val:'top'},
                            {name:texts.styling.right,val:'right'},
                            {name:texts.styling.bottom,val:'bottom'},
                            {name:texts.styling.left,val:'left'},
                            {name:texts.styling.top_left,val:'top left'},
                            {name:texts.styling.top_right,val:'top right'},
                            {name:texts.styling.bottom_left,val:'bottom left'},
                            {name:texts.styling.bottom_right,val:'bottom right'},
                        ],
                        container_class:'editor_preview_animation2'
                    }),
                ),
                draw_transform_editor({
                    key_tree:data.key_tree,
                    variable_key:data.variable_key,
                    key:`${keyframe}_transform`,
                    container_class:'editor_preview_animation2'
                }),
            ),
            $('<div/>',{class:'editor_popup_container w100p none',key:`animation_${keyframe}_filter`,parent_key:`animation_${keyframe}`}).append(
                draw_filter_editor({
                    key_tree:data.key_tree,
                    variable_key:data.variable_key,
                    key:`${keyframe}_filter`,
                    container_class:'editor_preview_animation2'
                })
            )
        )
    }
    for(const key in window.animations_previews){
        animations_preview_container.append(
            draw_animation_preview_model(window.animations_previews[key])
        )
    }
    return editor;
}
set_animation_editor = function(editor){
    let animation_name = get_editor_val(editor);
    $('.animation_preview_container').removeClass('animation_preview_container_selected')
    $(`.animation_preview_container[animation_name="${animation_name}"]`).addClass('animation_preview_container_selected')
}

//
$('body').on('mouseup','.animation_preview_container',function(){
    if($(this).hasClass('animation_preview_container_selected')){return;}
    let animation = JSON.parse(JSON.stringify(window.animations.find(item=>item.name == $(this).attr('animation_name'))));
    let editor = $(this).closest('.animation_editor');
    let editors_container = editor.closest('.editors_container')
    let is_responsive = editors_container.attr('is_responsive');
    let key_tree = editor.attr('key_tree');
    let variable_key = editor.attr('variable_key');
    let elem_data = get_elem_data(key_tree,variable_key);
    if(is_responsive == '0'){
        elem_data.elem.animation = {};
    }else if(is_responsive == '1'){
        if(editors_container.find('.responsive_selector_selected').attr('key') == 'general'){
            elem_data.elem.animation = {};
            elem_data.elem.animation_mobile = {};
        }else if(editors_container.find('.responsive_selector_selected').attr('key') == 'desktop'){
            elem_data.elem.animation = {};
        }else if(editors_container.find('.responsive_selector_selected').attr('key') == 'mobile'){
            elem_data.elem.animation_mobile = {};
        }
    }
    for(const key in animation){
        if(is_responsive == '0'){
            elem_data.elem.animation[key] = animation[key];
        }else if(is_responsive == '1'){
            if(editors_container.find('.responsive_selector_selected').attr('key') == 'general'){
                elem_data.elem.animation[key] = animation[key];
                elem_data.elem.animation_mobile[key] = animation[key];
            }else if(editors_container.find('.responsive_selector_selected').attr('key') == 'desktop'){
                elem_data.elem.animation[key] = animation[key];
            }else if(editors_container.find('.responsive_selector_selected').attr('key') == 'mobile'){
                elem_data.elem.animation_mobile[key] = animation[key];
            }
        }
    }    
    new_action();
})
$('body').on('change','.editor_preview_animation',function(){
    preview_elem_animation_on_website($(this).closest('.editor_popup_container').attr('key'))
})
$('body').on('change','.editor_preview_animation2',function(){
    preview_elem_animation_on_website($(this).closest('.editor_popup_container').attr('parent_key'))
})
//
// draw_animation_selector = function(data){
//     return '';
//     let elem_data = get_key_tree(data.key_tree);
//     let elem_val = get_elem_val(elem_data,'name',data.is_responsive ? '1':'0');
//     let animations_preview_container;
//     let selector_container = $('<div/>',{class:` ${data.selector_container_class === false ? '' : 'selector_container'} ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0'}).append(
//         draw_selector_name({data:data,name:'',responsive_class:elem_val.responsive_class,container_class:'m10 pX5 bold w100p-20 fs101'}),
//         $('<div/>',{class:'selector w100p',key_tree:data.key_tree,key:'name'}).append(
//             $('<div/>',{class:'editor_popup_container w100p',key:'select_animation'}).append(
//                 draw_editor_show_container({
//                     name:texts.styling.customize_animation,
//                     key:'customize_animation',
//                     row_class:true,
//                 }),
//                 $('<div/>',{class:'editor_popup_col'}).append(
//                     $('<div/>',{class:' fs09',text:texts.styling.select_animation}),
//                     animations_preview_container = $('<div/>',{class:'selector animations_preview_container w100p row wrap alnC jstfyC',key_tree:data.key_tree,key:'name'})
//                 )
//             ),
//         ),

//         $('<div/>',{class:'editor_popup_container w100p none',key:'customize_animation',parent_key:'select_animation'}).append(
//             // draw_rename_selector({
//             //     keys_arr:[{key_tree:data.key_tree,key:'name'}],
//             //     name:texts.styling.animation_name,
//             // }),
//             draw_switch_btn({
//                 keys_arr:[{key_tree:data.key_tree,key:'repeat'}],
//                 name:texts.styling.repeat_animation,
//                 show_hide:'editor_popup_show_container[key="animation_up"].editor_popup_show_container[key="animation_up_out.editor_popup_show_container[key="animation_down"]',
//                 is_responsive:true,
//                 responsive_icon:false,
//                 hover_icon:false,
//                 selector_container_class:false,
//             }),
//             draw_editor_show_container({
//                 name:texts.styling.animation_up_out,
//                 key:'animation_up_out',
//                 row_class:true,
//             }),
//             draw_editor_show_container({
//                 name:texts.styling.animation_up,
//                 key:'animation_up',
//                 row_class:true,
//             }),
//             draw_editor_show_container({
//                 name:texts.styling.animation_in,
//                 key:'animation_in',
//                 row_class:true,
//             }),
//             draw_editor_show_container({
//                 name:texts.styling.animation_down,
//                 key:'animation_down',
//                 row_class:true,
//             }),
//             draw_editor_show_container({
//                 name:texts.styling.animation_down_out,
//                 key:'animation_down_out',
//                 row_class:true,
//                 container_class:'editor_popup_row_border_bottom'
//             }),
//         ),
//     )
//     let keyframes = ['up_out','up','in','down','down_out'];
//     for(const key in keyframes){
//         let keyframe = keyframes[key];
//         selector_container.append(
//             $('<div/>',{class:'editor_popup_container w100p none',key:`animation_${keyframe}`,parent_key:'customize_animation'}).append(
//                 $('<div/>',{class:'mX15 fs1 mB20 bold',text:texts.styling[`animation_${keyframe}`]}),
//                 draw_select_range({
//                     keys_arr:[{key_tree:data.key_tree,key:`${keyframe}_duration`}],
//                     unit:'ms',
//                     range:{min:0,max:3000,step:1},
//                     name:texts.styling.duration,
//                     is_responsive:data.is_responsive,
//                     selector_container_class:false,
//                     responsive_icon:false,
//                     hover_icon:false,
//                     container_class:'editor_popup_row_border_top_none animation_select_range'
//                 }),
//                 draw_select_range({
//                     keys_arr:[{key_tree:data.key_tree,key:`${keyframe}_delay`}],
//                     unit:'ms',
//                     range:{min:0,max:3000,step:1},
//                     name:texts.styling.delay,
//                     is_responsive:data.is_responsive,
//                     selector_container_class:false,
//                     responsive_icon:false,
//                     hover_icon:false,
//                     container_class:'animation_select_range'
//                 }),
//                 draw_editor_show_container({
//                     name:texts.styling.animation_timing_function,
//                     key:`animation_${keyframe}_timing_function`,
//                     row_class:true,
//                 }),
//                 draw_editor_show_container({
//                     name:texts.styling.transform,
//                     key:`animation_${keyframe}_transform`,
//                     row_class:true,
//                 }),
//                 draw_editor_show_container({
//                     name:texts.styling.filter,
//                     key:`animation_${keyframe}_filter`,
//                     row_class:true,
//                     container_class:'editor_popup_row_border_bottom'
//                 }),    
//             ),
//             $('<div/>',{class:'editor_popup_container w100p none',key:`animation_${keyframe}_timing_function`,parent_key:`animation_${keyframe}`}).append(
//                 draw_timing_function_selector({
//                     keys_arr:[{key_tree:data.key_tree,key:`${keyframe}_timing_function`}],
//                     name:texts.styling.select_animation_timing,
//                     is_responsive:data.is_responsive,
//                     selector_container_class:false,
//                     responsive_icon:false,
//                     hover_icon:false,
//                 })
//             ),
//             $('<div/>',{class:'editor_popup_container w100p none',key:`animation_${keyframe}_transform`,parent_key:`animation_${keyframe}`}).append(
//                 draw_transform_selector({
//                     keys_arr:[{key_tree:data.key_tree,key:`${keyframe}_transform`}],
//                     selector_container_class:false,
//                     is_responsive:data.is_responsive,
//                     selector_container_class:false,
//                     responsive_icon:false,
//                     hover_icon:false,
//                 }),
//             ),
//             $('<div/>',{class:'editor_popup_container w100p none',key:`animation_${keyframe}_filter`,parent_key:`animation_${keyframe}`}).append(
//                 draw_filter_selector({
//                     keys_arr:[{key_tree:data.key_tree,key:`${keyframe}_filter`}],
//                     selector_container_class:false,
//                     is_responsive:data.is_responsive,
//                     selector_container_class:false,
//                     responsive_icon:false,
//                     hover_icon:false,
//                 })
//             )
//         )
//     }
//     for(const key in window.animations_previews){
//         let is_selected;
//         if(window.animations_previews[key].name == elem_val.val){
//             is_selected = true;
//         }
//         animations_preview_container.append(
//             draw_animation_preview_model(window.animations_previews[key],is_selected)
//         )
//     }

//     return selector_container
// }
// set_animation_selector = function(selector){
//     let val = get_selector_val(selector);
//     selector.find('.animation_preview_container').removeClass('animation_preview_container_selected');
//     if(val != null){
//         selector.find(`.animation_preview_container[animation_name="${val}"]`).addClass('animation_preview_container_selected')
//     }
// }


//events
$('body').on('click','.editor_popup_show_container[key="customize_animation"]',function(e){
    // return;
    set_val($(this).closest('.animation_editor'),'customized_animation')
    new_action();
})

