draw_editor_popup_box_shadow = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_drop_shadow_select({
                keys_arr:[`${window.selected}.css`],
                is_responsive:true,
                is_hover:true,
            }),
        )
        $(`.editor_popup_body_shortcut.editor_box_shadow`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_box_shadow',function(e){
    draw_editor_popup_box_shadow();
})