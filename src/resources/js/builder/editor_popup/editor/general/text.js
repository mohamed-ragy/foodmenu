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
                        }),
                    ),
                    $('<div/>',{class:'editor_popup_container none w100p',key:'text_font_style',parent_key:'editor_text'}).append(
                        draw_font_style_picker({
                            key_tree:`${window.selected}.font_style`,
                            // variable_key:'css',
                            // key:window.,
                        })
                    )
                ]
            })
        )
    })
    $(`.editor_popup_body_shortcut.editor_text`).addClass('editor_popup_body_shortcut_selected')
}
$('body').on('click','.editor_text',function(e){
    draw_editor_popup_text();
})