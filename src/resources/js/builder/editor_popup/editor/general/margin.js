draw_editor_popup_margin = function(){
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
                editors:[
                    draw_four_number_pickers({
                        key_tree:key_tree,
                        variable_key:'css',
                        key:'margin',
                        units:['px'],
                        step:1,
                        names:[texts.styling.margin,texts.styling.margin_top,texts.styling.margin_right,texts.styling.margin_bottom,texts.styling.margin_left]
                    })
                ]
            })
        )
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.styling.margin)
            $(`.editor_popup_body_shortcut.editor_margin`).addClass('editor_popup_body_shortcut_selected')
            $(`.editor_popup_body_shortcut.editor_margin`).closest('.editor_popup_body_shortcut_group').find('.editor_popup_body_shortcut_open_group').addClass('editor_popup_body_shortcut_open_group_selected')
        });
    });
}
$('body').on('click','.editor_margin',function(e){
    draw_editor_popup_margin();
})