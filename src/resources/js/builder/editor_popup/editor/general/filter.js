draw_editor_popup_filter = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    draw_filter_editor({
                        key_tree:window.selected,
                        variable_key:'css',
                        key:'filter'
                    })
                ]
            }),
        )
        $(`.editor_popup_body_shortcut.editor_filter`).addClass('editor_popup_body_shortcut_selected')
        
        play_preview_animations();
    });
}

$('body').on('click','.editor_filter',function(e){
    if(elem_has_animation(window.selected,true)){return;}
    draw_editor_popup_filter();
})