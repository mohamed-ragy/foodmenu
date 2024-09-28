draw_editor_popup_box_shadow = function(){
    if(!accessibility_check(window.selected,'box_shadow')){return;}
    show_editor_popup('editor',function(){
        let key_tree = window.selected;
        let is_responsive = true;
        let elem = get_element_data(key_tree);
        if(elem.is_responsive == '0'){
            is_responsive = false;
        }
        if('styling_target' in elem){
            key_tree = elem.styling_target.box_shadow ?? key_tree
        }
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:is_responsive,
                interactions:['hover','click','focus','disabled','error','selected'],
                editors:[
                    draw_box_shadow_editor({
                        key_tree:key_tree,
                        variable_key:'css',
                        key:'box-shadow',
                    })
                ]
            }),
        )
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.styling.box_shadow)
            $(`.editor_popup_body_shortcut.editor_box_shadow`).addClass('editor_popup_body_shortcut_selected')
            $(`.editor_popup_body_shortcut.editor_box_shadow`).closest('.editor_popup_body_shortcut_group').find('.editor_popup_body_shortcut_open_group').addClass('editor_popup_body_shortcut_open_group_selected')
        });
    });
}
$('body').on('click','.editor_box_shadow',function(e){
    draw_editor_popup_box_shadow();
})