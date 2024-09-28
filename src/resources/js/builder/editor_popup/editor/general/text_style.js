draw_editor_popup_text_style = function(){
    if(!accessibility_check(window.selected,'text_style')){return;}
    show_editor_popup('editor',function(){
        let key_tree = window.selected;
        let elem = get_element_data(key_tree);
        let is_responsive = true;
        let editor_text_placeholder;
        if('styling_target' in elem){
            key_tree = elem.styling_target.text_style ?? key_tree
        }
        if(elem.is_responsive == '0'){is_responsive = false;}
        $('#editor').find('.editor_popup_body').text('').append(
            $('<div/>',{class:'editor_popup_container w100p',key:'editor_text_style'}).append(
            draw_editors_container({
                is_responsive:is_responsive,
                editors:[
                        draw_editor_show_container({
                            key:'text_font_style',
                            name:texts.styling.font_style,
                            row_class:true,
                            container_class:'editor_popup_brdrT_none',
                        }),
                        elem.accessibility.includes('hyperlink') ? 
                            draw_editor_show_container({
                                key:'text_font_style_hyperlink',
                                name:texts.styling.hyperlink,
                                row_class:true,
                            })
                        :'',
                        elem.accessibility.includes('form_response_colors') ? 
                        draw_editor_show_container({
                            key:'form_response_colors',
                            name:texts.website_style.form_response_colors,
                            row_class:true,
                        })
                        :'',
                        elem.accessibility.includes('text_color') ? 
                        draw_editor_show_container({
                            key:'text_color',
                            name:texts.styling.text_color,
                            row_class:true,
                        })
                        :'',
                        elem.accessibility.includes('placeholder') ? 
                        draw_editor_show_container({
                            key:'text_placeholder',
                            name:texts.styling.placeholder,
                            row_class:true,
                        })
                        :'',
                        elem.accessibility.includes('validation_message') ? 
                        draw_editor_show_container({
                            key:'text_validation_message',
                            name:texts.styling.validation_message,
                            row_class:true,
                        })
                        :'',
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.text_align}),
                            draw_select_box({
                                editor_class:'editor_text_align',
                                key_tree:key_tree,
                                variable_key:'css',
                                key:'text-align',
                                selections:[
                                    {text:texts.styling.start,key:'start'},
                                    {text:texts.styling.center,key:'center'},
                                    {text:texts.styling.end,key:'end'},
                                ]
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.font_size}),
                            draw_number_picker({
                                key_tree:key_tree,
                                variable_key:'css',
                                key:'font-size',
                                units:['px','em','inherit'],
                            }),
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.line_height}),
                            draw_number_picker({
                                key_tree:key_tree,
                                variable_key:'css',
                                key:'line-height',
                                units:['px','em','inherit'],
                            }),
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.letter_spacing}),
                            draw_number_picker({
                                key_tree:key_tree,
                                variable_key:'css',
                                key:'letter-spacing',
                                units:['px','em','inherit'],
                            }),
                        ),
                        !elem.accessibility.includes('edit_text') ? $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.font_weight}),
                            draw_select_box({
                                key_tree:key_tree,
                                variable_key:'css',
                                key:'font-weight',
                                selections:[{text:texts.styling.bold,key:'bold'},{text:texts.styling.normal,key:'normal'}],
                            })
                        ):'',
                        !elem.accessibility.includes('edit_text') ?  $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.italic}),
                            draw_select_box({
                                key_tree:key_tree,
                                variable_key:'css',
                                key:'font-style',
                                selections:[{text:texts.styling.italic,key:'italic'},{text:texts.styling.normal,key:'normal'}],
                            })
                        ):'',
                        !elem.accessibility.includes('edit_text') ? $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.underline}),
                            draw_select_box({
                                key_tree:key_tree,
                                variable_key:'css',
                                key:'text-decoration',
                                selections:[{text:texts.styling.underline,key:'underline'},{text:texts.styling.normal,key:'none'}],
                            })
                        ):'',
                    ]
                }),
            ),
            elem.accessibility.includes('placeholder') ? $('<div/>',{class:'editor_popup_container none w100p',key:'text_placeholder',parent_key:'editor_text_style'}).append(
                draw_editors_container({
                    is_responsive:false,
                    editors:[
                        $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.placeholder}),
                            editor_text_placeholder = draw_select_box({
                                editor_class:'editor_text_placeholder',
                                key_tree:key_tree,
                                variable_key:'css_placeholder',
                                key:'visibility',
                                selections:[
                                    {key:'visible',text:texts.styling.placeholder,show_elem:'editor_popup_text_placeholder',hide_elem:'editor_popup_text_label'},
                                    {key:'hidden',text:texts.styling.label,hide_elem:'editor_popup_text_placeholder',show_elem:'editor_popup_text_label'},
                                ]
                            }),
                        ),
                        $('<div/>',{class:'editor_popup_row editor_popup_text_placeholder'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.color}),
                            draw_color_picker({
                                key_tree:key_tree,
                                variable_key:'css_placeholder',
                                key:'color',
                            })
                        ),
                        $('<div/>',{class:'editor_popup_text_label'}).append(
                            $('<div/>',{class:'editor_popup_col'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.text_align}),
                                draw_select_box({
                                    editor_class:'editor_text_align',
                                    key_tree:`${window.selected}.children.input_label`,
                                    variable_key:'css',
                                    key:'text-align',
                                    selections:[
                                        {text:texts.styling.start,key:'start'},
                                        {text:texts.styling.center,key:'center'},
                                        {text:texts.styling.end,key:'end'},
                                    ]
                                })
                            ),
                            $('<div/>',{class:'editor_popup_col'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.font_size}),
                                draw_number_picker({
                                    key_tree:`${window.selected}.children.input_label`,
                                    variable_key:'css',
                                    key:'font-size',
                                    units:['px','em','inherit'],
                                }),
                            ),
                            $('<div/>',{class:'editor_popup_col'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.line_height}),
                                draw_number_picker({
                                    key_tree:`${window.selected}.children.input_label`,
                                    variable_key:'css',
                                    key:'line-height',
                                    units:['px','em','inherit'],
                                }),
                            ),
                            $('<div/>',{class:'editor_popup_col'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.letter_spacing}),
                                draw_number_picker({
                                    key_tree:`${window.selected}.children.input_label`,
                                    variable_key:'css',
                                    key:'letter-spacing',
                                    units:['px','em','inherit'],
                                }),
                            ),
                            $('<div/>',{class:'editor_popup_col'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.font_weight}),
                                draw_select_box({
                                    key_tree:`${window.selected}.children.input_label`,
                                    variable_key:'css',
                                    key:'font-weight',
                                    selections:[{text:texts.styling.bold,key:'bold'},{text:texts.styling.normal,key:'normal'}],
                                })
                            ),
                            $('<div/>',{class:'editor_popup_col'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.italic}),
                                draw_select_box({
                                    key_tree:`${window.selected}.children.input_label`,
                                    variable_key:'css',
                                    key:'font-style',
                                    selections:[{text:texts.styling.italic,key:'italic'},{text:texts.styling.normal,key:'normal'}],
                                })
                            ),
                            $('<div/>',{class:'editor_popup_col'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.underline}),
                                draw_select_box({
                                    key_tree:`${window.selected}.children.input_label`,
                                    variable_key:'css',
                                    key:'text-decoration',
                                    selections:[{text:texts.styling.underline,key:'underline'},{text:texts.styling.normal,key:'none'}],
                                })
                            ),
                            $('<div/>',{class:'editor_popup_col'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.margin}),
                                draw_four_number_pickers({
                                    key_tree:`${window.selected}.children.input_label`,
                                    variable_key:'css',
                                    key:'margin',
                                    units:['px'],
                                    step:1,
                                    names:[texts.styling.margin,texts.styling.margin_top,texts.styling.margin_right,texts.styling.margin_bottom,texts.styling.margin_left],
                                })
                            )
                        )
                    ]
                }),
            ):'',
            elem.accessibility.includes('validation_message') ? $('<div/>',{class:'editor_popup_container none w100p',key:'text_validation_message',parent_key:'editor_text_style'}).append(
                draw_editors_container({
                    is_responsive:false,
                    editors:[
                        $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.preview_error_style}),
                            draw_switch_btn({
                                dummy:true,
                                dummy_class:'input_box_preview_error_switch_btn'
                            })
                        ),
                        $('<div/>',{class:'editor_popup_row'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.color}),
                            draw_color_picker({
                                key_tree:`${window.selected}.children.validation_message`,
                                variable_key:'css',
                                key:'color',
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.font_size}),
                            draw_number_picker({
                                key_tree:`${window.selected}.children.validation_message`,
                                variable_key:'css',
                                key:'font-size',
                                units:['px','em','inherit'],
                            }),
                        ),
                    ]
                }),
            ):'',

            $('<div/>',{class:'editor_popup_container none w100p',key:'text_font_style_hyperlink',parent_key:'editor_text_style'}).append(
                draw_editors_container({
                    is_responsive:false,
                    interactions:['hover'],
                    editors:[
                        $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.color}),
                            draw_color_picker({
                                key_tree:key_tree,
                                variable_key:'css_hyperlink',
                                key:'color',
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.underline}),
                            draw_select_box({
                                key_tree:key_tree,
                                variable_key:'css_hyperlink',
                                key:'text-decoration',
                                selections:[{text:texts.styling.underline,key:'underline'},{text:texts.styling.normal,key:'none'}],
                            })
                        )
                    ]
                })
            ),
            $('<div/>',{class:'editor_popup_container none w100p',key:'text_color',parent_key:'editor_text_style'}).append(
                draw_editors_container({
                    is_responsive:false,
                    interactions:['hover','click','focus','disabled','selected','error'],
                    editors:[
                        $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.text_color}),
                            draw_color_picker({
                                key_tree:key_tree,
                                variable_key:'css',
                                key:'color',
                            })
                        ),
                    ]
                }),
            ),

            $('<div/>',{class:'editor_popup_container none w100p',key:'form_response_colors',parent_key:'editor_text_style'}).append(
                draw_editors_container({
                    is_responsive:false,
                    editors:[
                        $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.success_color}),
                            $('<div/>',{class:'row alnC jstfyE'}).append(
                                draw_color_picker({
                                    key_tree:'form_elements.website_form_success',
                                    variable_key:'css',
                                    key:'color',
                                    editor_class:'preivew_form_message_picker',
                                }),
                                $('<div/>',{class:'ico-eye editor_btn preivew_form_message',color_class:'website_form_success'})
                            )
                        ),
                        $('<div/>',{class:'editor_popup_row'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.error_color}),
                            $('<div/>',{class:'row alnC jstfyE'}).append(
                                draw_color_picker({
                                    key_tree:'form_elements.website_form_error',
                                    variable_key:'css',
                                    key:'color',
                                    editor_class:'preivew_form_message_picker',
                                }),
                                $('<div/>',{class:'ico-eye editor_btn preivew_form_message',color_class:'website_form_error'})
                            )
                        ),
                        $('<div/>',{class:'editor_popup_row'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.warning_color}),
                            $('<div/>',{class:'row alnC jstfyE'}).append(
                                draw_color_picker({
                                    key_tree:'form_elements.website_form_warning',
                                    variable_key:'css',
                                    key:'color',
                                    editor_class:'preivew_form_message_picker',
                                }),
                                $('<div/>',{class:'ico-eye editor_btn preivew_form_message',color_class:'website_form_warning'})
                            )
                        ),
                    ]
                })
            ),
            $('<div/>',{class:'editor_popup_container none w100p',key:'text_font_style',parent_key:'editor_text_style'}).append(
                draw_editors_container({
                    is_responsive:false,
                    editors:[
                            draw_font_style_picker({
                                key_tree:`${key_tree}`,
                                variable_key:'font_style',
                            })
                        ]
                })
            ),
        )
    })

    setTimeout(()=>{
        $('.editor_popup_title2').text(texts.styling.text_style)
        $(`.editor_popup_body_shortcut.editor_text_style`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('change','.editor_text_placeholder',function(){
    let val = get_editor_val($(this));
    let elem = get_element_data(window.selected);
    if(val == 'visible'){
        elem.children.input_label.class = `${elem.children.input_label.class} none`;
    }else if(val == 'hidden'){
        elem.children.input_label.class = elem.children.input_label.class.replaceAll('none','');
    }
    new_action(window.selected);
})
$('body').on('click','.editor_text_style',function(e){
    draw_editor_popup_text_style();
})
$('body').on('click','.preivew_form_message',function(){
    if($(this).hasClass('ico-eye_off')){
        $('#website').find('.form_message').css('color','');
        $(this).removeClass('ico-eye_off').addClass('ico-eye')
    }else{
        let msg_color = get_editor_val($(this).parent().children().first())
        $('#website').find('.form_message').text(texts.website_style.form_message_ex).css('color',msg_color)
        $('.preivew_form_message').removeClass('ico-eye_off').addClass('ico-eye')
        $(this).removeClass('ico-eye').addClass('ico-eye_off')
    }
})
$('body').on('change','.preivew_form_message_picker',function(){
    let msg_color = get_editor_val($(this))
    if($(this).parent().find('.preivew_form_message').hasClass('ico-eye_off')){
        $('#website').find('.form_message').text(texts.website_style.form_message_ex).css('color',msg_color)
    }
})