draw_editor_popup_padding = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    draw_four_number_pickers({
                        key_tree:window.selected == 'website_header.elems' ? 'website_header.elems.children.header_wrapper' : window.selected,
                        variable_key:'css',
                        key:'padding',
                        units:['px'],
                        step:1,
                        names:[texts.styling.padding,texts.styling.padding_top,texts.styling.padding_right,texts.styling.padding_bottom,texts.styling.padding_left]
                    })
                ]
            })
        )
        $(`.editor_popup_body_shortcut.editor_padding`).addClass('editor_popup_body_shortcut_selected')
        $(`.editor_popup_body_shortcut.editor_padding`).closest('.editor_popup_body_shortcut_group').find('.editor_popup_body_shortcut_open_group').addClass('editor_popup_body_shortcut_open_group_selected')
    });
}
$('body').on('click','.editor_padding',function(e){
    draw_editor_popup_padding();
})