draw_editor_popup_border = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_color_picker({
                keys_arr:[{key_tree:`${window.selected}.css`,key:'border-color'}],
                name:texts.styling.border_color,
                is_responsive:true,
                is_hover:true,
            }),
            draw_number_picker({
                keys_arr:[{key:'border-width',key_tree:`${window.selected}.css`}],
                name:texts.styling.border_width,
                step:1,
                units:['px'],
                is_responsive:true,
                is_hover:true,
            }),
            draw_border_style_selector({
                key_tree:`${window.selected}.css`,
                is_responsive:true,
                is_hover:true,
            })
        )
        $(`.editor_popup_body_shortcut.editor_border`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_border',function(e){
    draw_editor_popup_border();
})