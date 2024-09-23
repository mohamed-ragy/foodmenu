draw_editor_popup_border_radius = function(){
    if(!accessibility_check(window.selected,'border_radius')){return;}
    show_editor_popup('editor',function(){
        let key_tree = window.selected;
        let is_responsive = true;
        let elem = get_element_data(key_tree);
        if(elem.is_responsive == '0'){
            is_responsive = false;
        }
        if('styling_target' in elem){
            key_tree = elem.styling_target.border_radius ?? key_tree
        }
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:is_responsive,
                interactions:['hover','click','focus','disabled','error'],
                editors:[
                    draw_four_number_pickers({
                        key_tree:key_tree,
                        variable_key:'css',
                        key:'border-radius',
                        units:['px','em','%'],
                        step:1,
                        names:[texts.styling.border_radius,texts.styling.top_left_corner,texts.styling.top_right_corner,texts.styling.bottom_right_corner,texts.styling.bottom_left_corner]
                    })
                ]
            })
        )
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.styling.border_radius)
            $(`.editor_popup_body_shortcut.editor_border_radius`).addClass('editor_popup_body_shortcut_selected')
            $(`.editor_popup_body_shortcut.editor_border_radius`).closest('.editor_popup_body_shortcut_group').find('.editor_popup_body_shortcut_open_group').addClass('editor_popup_body_shortcut_open_group_selected')
        });
    });
}
$('body').on('click','.editor_border_radius',function(e){
    draw_editor_popup_border_radius();
})