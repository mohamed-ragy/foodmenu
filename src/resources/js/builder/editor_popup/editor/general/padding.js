draw_editor_popup_padding = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                is_hover:true,
                editors:[
                    $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'fs09 ',text:texts.styling.padding_top}),
                        draw_number_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'padding-top',
                            step:1,
                            units:['px','em','%'],
                            lock:true,
                            is_hover:true,
                        }),
                    ),
                    $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.padding_right}),
                        draw_number_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'padding-right',
                            step:1,
                            units:['px','em','%'],
                            lock:true,
                            is_hover:true,
                        }),
                    ),
                    $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.padding_bottom}),
                        draw_number_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'padding-bottom',
                            step:1,
                            units:['px','em','%'],
                            lock:true,
                            is_hover:true,
                        }),
                    ),
                    $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.padding_left}),
                        draw_number_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'padding-left',
                            step:1,
                            units:['px','em','%'],
                            lock:true,
                            is_hover:true,
                        }),
                    ),
                ]
            })
        )
        $(`.editor_popup_body_shortcut.editor_padding`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_padding',function(e){
    draw_editor_popup_padding();
})