draw_editor_popup_hover_settings = function(){
    show_editor_popup('editor',function(){
        let elem = get_key_tree(window.selected).elem;
        $('#editor').find('.editor_popup_body').text('').append(
            $('<div/>',{class:'editor_popup_container w100p',key:'hover_settings'}).append(
                draw_select_range({
                    keys_arr:[{key:'transition-duration',key_tree:`${window.selected}.css`}],
                    name:texts.styling.transition_duration,
                    range:{min:0,max:4000,step:1},
                    unit:'ms',
                    is_responsive:true,
                }),
                draw_select_range({
                    keys_arr:[{key:'transition-delay',key_tree:`${window.selected}.css`}],
                    name:texts.styling.transition_delay,
                    range:{min:0,max:4000,step:1},
                    unit:'ms',
                    is_responsive:true,
                }),
                draw_editor_show_container({
                    key:'elem_transition_timing_function',
                    name:texts.styling.transition_timing_function,
                    row_class:true,
                    container_class:'editor_popup_row_border_bottom'
                })
            ),
            $('<div/>',{class:'editor_popup_container none w100p',key:'elem_transition_timing_function',parent_key:'hover_settings'}).append(
                draw_timing_function_selector({
                    keys_arr:[{key_tree:`${window.selected}.css`,key:'transition-timing-function'}],
                    name:texts.styling.select_transition_timing,
                    is_responsive:true,
                })
            )
        )
        $(`.editor_popup_body_shortcut.editor_hover_settings`).addClass('editor_popup_body_shortcut_selected')
    });

}
$('body').on('click','.editor_hover_settings',function(e){
    if(elem_has_animation(window.selected,true)){return;}
    draw_editor_popup_hover_settings();
})
