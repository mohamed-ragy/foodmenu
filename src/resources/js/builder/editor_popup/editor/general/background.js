draw_editor_popup_background = function(){
    if(!accessibility_check(window.selected,'background')){return;}
    let selected_key_tree = window.selected;
    if(window.selected == 'website_header.elems.children.header_wrapper'){
        selected_key_tree = 'website_header.elems';
    }
    let elem_data = get_elem_data(selected_key_tree);
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                interactions:['hover'],
                editors:[
                    $('<div/>',{class:'editor_popup_container w100p',key:'editor_background'}).append(
                        $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none mB20`}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.background}),
                            draw_input_list({
                                container_class:'background_type_inputList',
                                key_tree:selected_key_tree,
                                variable_key:'background',
                                key:'type',
                                selections:[
                                    {name:texts.styling.none,val:'none',hide_elem:'editor_background_color.editor_background_gradient.editor_background_backdrop_filter.editor_background_image'},
                                    {name:texts.styling.color,val:'color',show_elem:'editor_background_color',hide_elem:'editor_background_gradient.editor_background_backdrop_filter.editor_background_image'},
                                    {name:texts.styling.gradient,val:'gradient',show_elem:'editor_background_gradient',hide_elem:'editor_background_color.editor_background_backdrop_filter.editor_background_image'},
                                    {name:texts.styling.backdrop_filter,class:`${elem_data.elem.type == 'section' ? 'none' : ''}`,val:'backdrop_filter',show_elem:'editor_background_backdrop_filter',hide_elem:'editor_background_color.editor_background_gradient.editor_background_image'},
                                    {name:texts.styling.image,val:'image',show_elem:'editor_background_image',hide_elem:'editor_background_color.editor_background_gradient.editor_background_backdrop_filter'},
                                ],
                            }),
                        ),
                        $('<div/>',{class:'editor_background_color w100p'}).append(
                            $('<div/>',{class:`editor_popup_row editor_popup_brdrT_none`}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.background_color}),
                                draw_color_picker({
                                    key_tree:selected_key_tree,
                                    variable_key:'background',
                                    key:'color',
                                })
                            ),
                        ),
                        $('<div/>',{class:'editor_background_gradient w100p'}).append(
                            draw_gradient_editor({
                                key_tree:selected_key_tree,
                                variable_key:'background',
                                key:'gradient',
                            })
                        ),
                        elem_data.elem.type != 'section' ? $('<div/>',{class:'editor_background_backdrop_filter w100p'}).append(
                            $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.filter_color}),
                                draw_color_picker({
                                    key_tree:selected_key_tree,
                                    variable_key:'background',
                                    key:'backdrop_filter_color',
                                })
                            ),
                            draw_backdrop_filter_editor({
                                key_tree:selected_key_tree,
                                variable_key:'background',
                                key:'backdrop_filter',
                            })
                        ) : '',
                        $('<div/>',{class:'editor_background_image w100p'}).append(
                            $('<div/>',{class:`editor_popup_row editor_popup_brdrT_none`}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.image}),
                                draw_select_image({
                                    key_tree:selected_key_tree,
                                    variable_key:'background',
                                    key:'background_image',
                                    editor_class:'background_image_editor'
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
                        )
                    ),
                    $('<div/>',{class:'editor_popup_container w100p none',key:'editor_background_image_filter',parent_key:'editor_background'}).append(
                        $('<div/>',{class:'editor_popup_row'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.filter_color}),
                            draw_color_picker({
                                key_tree:selected_key_tree,
                                variable_key:'background',
                                key:'background_blend_mode_color',
                                editor_class:'background_blend_color_editor',
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.filter_style}),
                            draw_select_background_filter({
                                key_tree:selected_key_tree,
                                variable_key:'background',
                                key:'background_blend_mode'
                            })
                        )
                    ),
                    $('<div/>',{class:'editor_popup_container w100p none',key:'editor_background_image_settings',parent_key:'editor_background'}).append(
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.imagePosition}),
                            draw_image_position_editor({
                                key_tree:selected_key_tree,
                                variable_key:'background',
                                key:'background_position'
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.imageStyle}),
                            draw_select_box({
                                key_tree:selected_key_tree,
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
                                key_tree:selected_key_tree,
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
                                key_tree:selected_key_tree,
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
            $(`.editor_popup_body_shortcut.editor_background`).addClass('editor_popup_body_shortcut_selected')
        });
    });

}
$('body').on('click','.editor_background',function(e){
    draw_editor_popup_background();
})
$('body').on('change','.background_type_inputList',function(){
    let val = get_editor_val($(this))
    let elem = get_elem_data($(this).attr('key_tree')).elem;
    let responsive_key = get_responseive_key($(this));
    let interaction = get_interaction_key($(this));
    let interaction_key;
    if(!elem.accessibility.includes('hover')){return;}
    if(interaction == '0'){return;}else{
        interaction == 'hover' ? interaction_key = '' : interaction == 'regular' ? interaction_key = '_hover' : null; 
    }
    if(responsive_key == '0' || responsive_key == 'desktop'){
        elem[`background${interaction_key}`]['type'] = val;
    }else if(responsive_key == 'general'){
        elem[`background${interaction_key}`]['type'] = val;
        elem[`background${interaction_key}_mobile`]['type'] = val;
    }else if(responsive_key == 'mobile'){
        elem[`background${interaction_key}_mobile`]['type'] = val;
    }

    undo_redo_actions();
})