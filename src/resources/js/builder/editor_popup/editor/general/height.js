draw_editor_popup_height = function(){
    if(!accessibility_check(window.selected,'height')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.height}),
                        draw_number_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'height',
                            units:['auto','px','%'],
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col '}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.max_height}),
                        draw_number_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'max-height',
                            units:['px','%'],
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col '}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.min_height}),
                        draw_number_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'min-height',
                            units:['auto','px','%'],
                        })
                    ),
                ]
            })
        )
    })
    setTimeout(()=>{
        $('.editor_popup_title2').text(texts.styling.height)
        $(`.editor_popup_body_shortcut.editor_height`).addClass('editor_popup_body_shortcut_selected')
        $(`.editor_popup_body_shortcut.editor_height`).closest('.editor_popup_body_shortcut_group').find('.editor_popup_body_shortcut_open_group').addClass('editor_popup_body_shortcut_open_group_selected')
    });
}
$('body').on('click','.editor_height',function(e){
    draw_editor_popup_height();
})