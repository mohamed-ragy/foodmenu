draw_editor_popup_box_shadow = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    draw_box_shadow_editor({
                        key_tree:window.selected == 'website_header.elems.children.header_wrapper' ? 'website_header.elems' : window.selected,
                        variable_key:'css',
                        key:'box-shadow',
                    })
                ]
            }),
        )
        $(`.editor_popup_body_shortcut.editor_box_shadow`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_box_shadow',function(e){
    draw_editor_popup_box_shadow();
})