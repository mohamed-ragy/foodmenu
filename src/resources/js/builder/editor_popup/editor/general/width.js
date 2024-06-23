draw_editor_popup_width = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.width}),
                        draw_number_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'width',
                            units:['auto','px','%'],
                            step:1,
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col '}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.max_width}),
                        draw_number_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'max-width',
                            units:['auto','px','%'],
                            step:1,
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col '}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.min_width}),
                        draw_number_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'min-width',
                            units:['auto','px','%'],
                            step:1,
                        })
                    ),
                ]
            })
        )
    })
    $(`.editor_popup_body_shortcut.editor_width`).addClass('editor_popup_body_shortcut_selected')
}
$('body').on('click','.editor_width',function(e){
    draw_editor_popup_width();
})