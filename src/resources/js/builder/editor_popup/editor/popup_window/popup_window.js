draw_editor_popup_popup_widnow = function(){
    if(!accessibility_check(window.selected,'popup_widnow')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.bg_color}),
                        draw_color_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'background-color'
                        })
                    ),
                    $('<div/>',{class:'editor_popup_row'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.modal_overlay_color}),
                        draw_color_picker({
                            key_tree:'popup_window',
                            variable_key:'css',
                            key:'background-color',
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.blur_level}),
                        draw_select_range({
                            dummy:true,
                            dummy_class:'popup_window_modal_overlay_blur',
                            unit:'px',
                            range:{min:0,max:10,step:1}
                        })
                    ),


                ]
            })
        )
        setTimeout(()=>{
            set_dummy_val($('.popup_window_modal_overlay_blur'),window.template.popup_window.css['backdrop-filter'].replace('blur(','').replace(')',''))
            $(`.editor_popup_body_shortcut.editor_popup_popup_widnow`).addClass('editor_popup_body_shortcut_selected')
        });
    })
}
$('body').on('click','.editor_popup_popup_widnow',function(){
    draw_editor_popup_popup_widnow();
});
$('body').on('change','.popup_window_modal_overlay_blur',function(){
    let val = get_dummy_val($(this));
    window.template.popup_window.css['backdrop-filter'] = `blur(${val})`;
    new_action('popup_window','');
})