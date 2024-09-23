draw_editor_popup_background = function(){
    if(!accessibility_check(window.selected,'background')){return;}
    let key_tree = window.selected;
    let elem = get_element_data(key_tree);
    let is_responsive = true;
    if(elem.is_responsive == '0'){is_responsive = false;}
    if('styling_target' in elem){
        key_tree = elem.styling_target.background ?? key_tree
    }
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:is_responsive,
                interactions:['hover','click','focus','disabled','error'],
                editors:[
                    $('<div/>',{class:'editor_popup_container w100p',key:'editor_background'}).append(
                        $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none mB20`}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.background}),
                            draw_input_list({
                                editor_class:'background_type_inputList',
                                key_tree:key_tree,
                                variable_key:'background',
                                key:'type',
                                selections:[
                                    {name:texts.styling.none,val:'none',hide_elem:'editor_background_color.editor_background_gradient.editor_background_backdrop_filter.editor_background_image'},
                                    {name:texts.styling.color,val:'color',show_elem:'editor_background_color',hide_elem:'editor_background_gradient.editor_background_backdrop_filter.editor_background_image'},
                                    elem.accessibility.includes('background_gradient') ? {name:texts.styling.gradient,val:'gradient',show_elem:'editor_background_gradient',hide_elem:'editor_background_color.editor_background_backdrop_filter.editor_background_image'}:null,
                                    elem.accessibility.includes('background_backdrop_filter') ? {name:texts.styling.backdrop_filter,val:'backdrop_filter',show_elem:'editor_background_backdrop_filter',hide_elem:'editor_background_color.editor_background_gradient.editor_background_image'}:null,
                                    elem.accessibility.includes('background_image') ? {name:texts.styling.image,val:'image',show_elem:'editor_background_image',hide_elem:'editor_background_color.editor_background_gradient.editor_background_backdrop_filter'}:null,
                                ],
                            }),
                        ),
                        $('<div/>',{class:'editor_background_color none w100p'}).append(
                            $('<div/>',{class:`editor_popup_row editor_popup_brdrT_none`}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.background_color}),
                                draw_color_picker({
                                    key_tree:key_tree,
                                    variable_key:'background',
                                    key:'color',
                                })
                            ),
                        ),
                        elem.accessibility.includes('background_gradient') ? $('<div/>',{class:'editor_background_gradient none w100p'}).append(
                            draw_gradient_editor({
                                key_tree:key_tree,
                                variable_key:'background',
                                key:'gradient',
                            })
                        ):'',
                        elem.accessibility.includes('background_backdrop_filter')  ? $('<div/>',{class:'editor_background_backdrop_filter none w100p'}).append(
                            $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.filter_color}),
                                draw_color_picker({
                                    key_tree:key_tree,
                                    variable_key:'background',
                                    key:'backdrop_filter_color',
                                })
                            ),
                            draw_backdrop_filter_editor({
                                key_tree:key_tree,
                                variable_key:'background',
                                key:'backdrop_filter',
                            })
                        ) : '',
                        elem.accessibility.includes('background_image') ? $('<div/>',{class:'editor_background_image none w100p'}).append(
                            $('<div/>',{class:`editor_popup_row editor_popup_brdrT_none`}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.image}),
                                draw_select_image({
                                    key_tree:key_tree,
                                    variable_key:'background',
                                    key:'background_image',
                                    editor_class:'background_image_editor',
                                }),
                            ),
                            draw_editor_show_container({
                                key:'editor_background_image_settings',
                                name:texts.styling.image_settings,
                                row_class:true,
                            }),
                            draw_editor_show_container({
                                key:'editor_background_image_filter',
                                name:texts.styling.image_filter,
                                row_class:true,
                            }),
                        ):'',
                    ),
                    $('<div/>',{class:'editor_popup_container w100p none',key:'editor_background_image_filter',parent_key:'editor_background'}).append(
                        $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.filter_color}),
                            draw_color_picker({
                                key_tree:key_tree,
                                variable_key:'background',
                                key:'background_blend_mode_color',
                                editor_class:'background_blend_color_editor',
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.filter_style}),
                            draw_select_background_filter({
                                key_tree:key_tree,
                                variable_key:'background',
                                key:'background_blend_mode'
                            })
                        )
                    ),
                    $('<div/>',{class:'editor_popup_container w100p none',key:'editor_background_image_settings',parent_key:'editor_background'}).append(
                        $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.imagePosition}),
                            draw_image_position_editor({
                                key_tree:key_tree,
                                variable_key:'background',
                                key:'background_position',
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.imageStyle}),
                            draw_select_box({
                                key_tree:key_tree,
                                variable_key:'background',
                                key:'background_attachment',
                                selections:[
                                    {text:texts.styling.fixed,key:'fixed'},
                                    {text:texts.styling.local,key:'local'},
                                ]
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.imageSize}),
                            draw_select_box({
                                key_tree:key_tree,
                                variable_key:'background',
                                key:'background_size',
                                selections:[
                                    {text:texts.styling.cover,key:'cover'},
                                    {text:texts.styling.contain,key:'contain'},
                                ]
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.imageRepeat}),
                            draw_select_box({
                                key_tree:key_tree,
                                variable_key:'background',
                                key:'background_repeat',
                                selections:[
                                    {text:texts.styling.repeat,key:'repeat'},
                                    {text:texts.styling.no_repeat,key:'no-repeat'},
                                ]
                            })
                        ),
                    )
                ]
            }),
        )
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.styling.background)
            $(`.editor_popup_body_shortcut.editor_background`).addClass('editor_popup_body_shortcut_selected')
        });
    });

}
$('body').on('click','.editor_background',function(e){
    draw_editor_popup_background();
})
$('body').on('change','.background_type_inputList',function(){
    // let editor = $(this);
    // let val = get_dummy_val(editor);
    // console.log(val)
    // let new_val;
    // if(val == 'none'){
    //     set_dummy_val(editor,'none')
    //     set_val(editor,null)
    // }else if(val == 'color'){
    //     set_dummy_val(editor,'color')
    //     set_val(editor,get_default_style('background_color'))
    // }
    // new_action(window.selected)
    set_all_editors();
})