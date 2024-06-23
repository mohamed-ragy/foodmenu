draw_editor_popup_border = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'row alnC jstfyS'}).append(
                            $('<div/>',{class:'ico-arrowRight2 editor_details_toggle'}),
                            $('<div/>',{class:'fs09 bold',text:texts.styling.border}),
                        ),
                        draw_border_editor({
                            dummy:true,
                            dummy_class:'editor_details_head'
                        }),
                    ),
                    $('<div/>',{class:'editor_popup_col editor_detail_container editor_popup_brdrT_none editor_popup_brdrB'}).append(
                        $('<div/>',{class:'mis-10 fs09 bold',text:texts.styling.border_top}),
                        draw_border_editor({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'border-top',
                            editor_details:true,
                        }),
                    ),
                    $('<div/>',{class:'editor_popup_col editor_detail_container editor_popup_brdrT_none editor_popup_brdrB'}).append(
                        $('<div/>',{class:'mis-10 fs09 bold',text:texts.styling.border_right}),
                        draw_border_editor({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'border-right',
                            editor_details:true,
                        }),
                    ),
                    $('<div/>',{class:'editor_popup_col editor_detail_container editor_popup_brdrT_none editor_popup_brdrB'}).append(
                        $('<div/>',{class:'mis-10 fs09 bold',text:texts.styling.border_bottom}),
                        draw_border_editor({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'border-bottom',
                            editor_details:true,
                        }),
                    ),
                    $('<div/>',{class:'editor_popup_col editor_detail_container editor_popup_brdrT_none editor_popup_brdrB'}).append(
                        $('<div/>',{class:'mis-10 fs09 bold',text:texts.styling.border_left}),
                        draw_border_editor({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'border-left',
                            editor_details:true,
                        }),
                    )
                ]
            }),
        )
        $(`.editor_popup_body_shortcut.editor_border`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_border',function(e){
    draw_editor_popup_border();
})