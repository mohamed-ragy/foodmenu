draw_editor_popup_filter = function(){
    show_editor_popup('editor',function(){
        let key_tree = window.selected;
        let is_responsive = true;
        let elem = get_element_data(key_tree);
        if(elem.is_responsive == '0'){
            is_responsive = false;
        }
        
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:is_responsive,
                interactions:['hover','click','focus','disabled'],
                editors:[
                    draw_filter_editor({
                        key_tree:key_tree,
                        variable_key:'css',
                        key:'filter',
                    })
                ]
            }),
        )
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.styling.filter)
            $(`.editor_popup_body_shortcut.editor_filter`).addClass('editor_popup_body_shortcut_selected')
            $(`.editor_popup_body_shortcut.editor_filter`).closest('.editor_popup_body_shortcut_group').find('.editor_popup_body_shortcut_open_group').addClass('editor_popup_body_shortcut_open_group_selected')
        });
        
        play_preview_animations();
    });
}

$('body').on('click','.editor_filter',function(e){
    if(elem_has_animation(window.selected,true)){
        if($(this).hasClass('editor_popup_body_shortcut_group_elem')){
            let prev_clicked_btn = $(this).closest('.editor_popup_body_shortcuts').find('.editor_popup_body_shortcut_selected')
            setTimeout(()=>{
                prev_clicked_btn.trigger('click')
            })
        }
        return;
    }
    draw_editor_popup_filter();
})