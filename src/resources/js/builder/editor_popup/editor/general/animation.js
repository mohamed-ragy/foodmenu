draw_editor_popup_animation = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    draw_animation_editor({
                        key_tree:window.selected,
                        variable_key:'animation',
                        key:'name'
                    })
                ]
            })
        )
        $(`.editor_popup_body_shortcut.editor_animation`).addClass('editor_popup_body_shortcut_selected')
        
        play_preview_animations();
    });
}

$('body').on('click','.editor_animation',function(e){
    draw_editor_popup_animation();
})

elem_has_animation = function(key_tree,show_error=false){
    let elem_data = get_key_tree(key_tree);
    if('animation' in elem_data.elem){
        if(elem_data.elem.animation.name != 'no_animation' || elem_data.elem.animation_mobile.name != 'no_animation'){
            if(show_error){
                showAlert('error',texts.not_allowed_animation,5000,true)
            }
            return true;
        }
    }
    return false;
}