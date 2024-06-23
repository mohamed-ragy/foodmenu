draw_editor_popup_transform = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_transform_selector({
                keys_arr:[{key_tree:`${window.selected}.css`,key:'transform'}],
                is_responsive:true,
            }),
        )
        $(`.editor_popup_body_shortcut.editor_transform`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_transform',function(e){
    if(elem_has_animation(window.selected,true)){return;}
    draw_editor_popup_transform();
})