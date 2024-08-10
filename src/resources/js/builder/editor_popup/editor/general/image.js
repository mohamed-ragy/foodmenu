draw_editor_popup_image = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    //
                    $('<div/>',{class:'editor_popup_container w100p',key:'editor_image'}).append(
                        $('<div/>',{class:`editor_popup_row editor_popup_brdrT_none`}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.image}),
                            draw_select_image({
                                key_tree:`${window.selected}`,
                                variable_key:'attr',
                                key:'src',
                            }),
                        ),
                        draw_editor_show_container({
                            key:'editor_image_settings',
                            name:texts.styling.image_settings,
                            row_class:true,
                        }),
                    ),
                    $('<div/>',{class:'editor_popup_container w100p none',key:'editor_image_settings',parent_key:'editor_image'}).append(
                        draw_editors_container({
                            is_responsive:true,
                            editors:[
                                $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                                    $('<div/>',{class:'fs09',text:texts.styling.imagePosition}),
                                    draw_image_position_editor({
                                        key_tree:window.selected,
                                        variable_key:'css',
                                        key:'object-position'
                                    })
                                ),
                                $('<div/>',{class:'editor_popup_col'}).append(
                                    $('<div/>',{class:'fs09',text:texts.styling.imageSize}),
                                    draw_select_box({
                                        key_tree:window.selected,
                                        variable_key:'css',
                                        key:'object-fit',
                                        selections:[
                                            {text:texts.styling.cover,key:'cover'},
                                            {text:texts.styling.contain,key:'contain'},
                                        ]
                                    })
                                ),
                                $('<div/>',{class:'editor_popup_col'}).append(
                                    $('<div/>',{class:'fs09',text:texts.styling.aspect_ratio}),
                                    draw_aspect_ratio_editor({
                                        key_tree:window.selected,
                                        variable_key:'css',
                                        key:'aspect-ratio'
                                    })
                                )
                            ]
                        })
                    )
                ]
            })
        )
        $(`.editor_popup_body_shortcut.editor_image`).addClass('editor_popup_body_shortcut_selected')
    })
}
$('body').on('click','.editor_image',function(e){
    draw_editor_popup_image();
})