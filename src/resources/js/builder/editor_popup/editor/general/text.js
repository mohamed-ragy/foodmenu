draw_editor_popup_text = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    $('<div/>',{class:'editor_popup_container w100p',key:'editor_text'}).append(
                        draw_editor_show_container({
                            key:'text_font_style',
                            name:texts.styling.font_style,
                            row_class:true,
                            container_class:'editor_popup_brdrT_none'
                        }),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.text_align}),
                            draw_select_box({
                                editor_class:'editor_text_align',
                                key_tree:window.selected,
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
                                key_tree:window.selected,
                                variable_key:'css',
                                key:'font-size',
                                units:['px','em'],
                                step:1,
                            }),
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.line_height}),
                            draw_number_picker({
                                key_tree:window.selected,
                                variable_key:'css',
                                key:'line-height',
                                units:['px','em'],
                                step:1,
                            }),
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.letter_spacing}),
                            draw_number_picker({
                                key_tree:window.selected,
                                variable_key:'css',
                                key:'letter-spacing',
                                units:['px','em'],
                                step:1,
                            }),
                        )

                        // draw_editor_show_container({
                        //     key:'text_font_settings',
                        //     name:texts.styling.font_settings,
                        //     row_class:true,
                        // }),
                        // draw_text_editors({
                        //     key_tree:`${window.selected}.text`,
                        //     variable_key:'val',
                        // })
                    ),
                    $('<div/>',{class:'editor_popup_container none w100p',key:'text_font_style',parent_key:'editor_text'}).append(
                        draw_font_style_picker({
                            key_tree:`${window.selected}`,
                            variable_key:'font_style',
                        })
                    ),
                    // $('<div/>',{class:'editor_popup_container none w100p',key:'text_font_settings',parent_key:'editor_text'}).append(
                    //     draw_editors_container({
                    //         is_responsive:true,
                    //         editors:[
  
                    //         ]
                    //     })
                    // )
                ]
            })
        )
    })
    setTimeout(()=>{
        $(`.editor_popup_body_shortcut.editor_text`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_text',function(e){
    draw_editor_popup_text();
})