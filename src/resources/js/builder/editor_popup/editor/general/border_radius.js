draw_editor_popup_border_radius = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_select_border_radius({keys_arr:[`${window.selected}.css`],step:1,units:['px','%'],is_responsive:true,is_hover:true,}),
        )
        $(`.editor_popup_body_shortcut.editor_border_radius`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_border_radius',function(e){
    draw_editor_popup_border_radius();
})