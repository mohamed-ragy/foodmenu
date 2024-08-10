draw_editor_popup_interactions = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    $('<div/>',{class:'editor_popup_container w100p',key:'interactions'}).append(
                        draw_editor_show_container({
                            key:'interactions_transition_timing',
                            name:texts.transition_timing,
                            row_class:true,
                            container_class:'editor_popup_brdrT_none editor_popup_brdrB'
                        }),
                        draw_interactions_picker({
                            key_tree:window.selected
                        })
                    ),
                    $('<div/>',{class:'editor_popup_container none w100p',key:'interactions_transition_timing',parent_key:'interactions'}).append(
                        draw_editors_container({
                            is_responsive:true,
                            editors:[
                                $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                                    $('<div/>',{class:'fs09',text:texts.styling.transition_duration}),
                                    draw_number_picker({
                                        key_tree:window.selected,
                                        variable_key:'css',
                                        key:'transition-duration',
                                        step:1,
                                        units:['ms']
                                    })
                                ),
                                $('<div/>',{class:'editor_popup_col'}).append(
                                    $('<div/>',{class:'fs09',text:texts.styling.transition_delay}),
                                    draw_number_picker({
                                        key_tree:window.selected,
                                        variable_key:'css',
                                        key:'transition-delay',
                                        step:1,
                                        units:['ms']
                                    })
                                ),
                                draw_editor_show_container({
                                    key:'transition_timing_function',
                                    name:texts.styling.transition_timing_function,
                                    row_class:true,
                                }),
                            ]
                        })
                    ),
                    $('<div/>',{class:'editor_popup_container none w100p',key:'transition_timing_function',parent_key:'interactions_transition_timing'}).append(
                        draw_editors_container({
                            is_responsive:true,
                            editors:[
                                draw_timing_function_editor({
                                    key_tree:window.selected,
                                    variable_key:'css',
                                    key:'transition-timing-function'
                                })
                            ]
                        })
                    ),
                ]
            })
        )
        $(`.editor_popup_body_shortcut.editor_interactions`).addClass('editor_popup_body_shortcut_selected')
    })
}
$('body').on('click','.editor_interactions',function(e){
    // if(elem_has_animation(window.selected,true)){return;}
    draw_editor_popup_interactions();
})