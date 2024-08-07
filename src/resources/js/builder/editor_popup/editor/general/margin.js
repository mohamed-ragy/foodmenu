draw_editor_popup_margin = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    draw_four_number_pickers({
                        key_tree:window.selected,
                        variable_key:'css',
                        key:'margin',
                        units:['px'],
                        step:1,
                        names:[texts.styling.margin,texts.styling.margin_top,texts.styling.margin_right,texts.styling.margin_bottom,texts.styling.margin_left]
                    })
                ]
            })
        )
        $(`.editor_popup_body_shortcut.editor_margin`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_margin',function(e){
    draw_editor_popup_margin();
})