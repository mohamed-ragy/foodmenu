draw_editor_popup_border_radius = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'row alnC jstfyS'}).append(
                            $('<div/>',{class:'ico-arrowRight2 editor_details_toggle'}),
                            $('<div/>',{class:'fs09 ',text:texts.styling.border_radius}),
                        ),
                        draw_number_picker({
                            dummy:true,
                            dummy_class:'editor_details_head',
                            step:1,
                            units:['px','%'],
                        }),
                    ),
                    $('<div/>',{class:`editor_popup_col editor_detail_container editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'mis-10 fs09 ',text:texts.styling.top_left_corner}),
                        draw_number_picker({
                            editor_details:true,
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'border-top-left-radius',
                            step:1,
                            units:['px','%'],
                        }),
                    ),
                    $('<div/>',{class:`editor_popup_col editor_detail_container editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'mis-10 fs09',text:texts.styling.top_right_corner}),
                        draw_number_picker({
                            editor_details:true,
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'border-top-right-radius',
                            step:1,
                            units:['px','%'],
                        }),
                    ),
                    $('<div/>',{class:`editor_popup_col editor_detail_container editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'mis-10 fs09',text:texts.styling.bottom_right_corner}),
                        draw_number_picker({
                            editor_details:true,
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'border-bottom-right-radius',
                            step:1,
                            units:['px','%'],
                        }),
                    ),
                    $('<div/>',{class:`editor_popup_col editor_detail_container editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'mis-10 fs09',text:texts.styling.bottom_left_corner}),
                        draw_number_picker({
                            editor_details:true,
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'border-bottom-left-radius',
                            step:1,
                            units:['px','%'],
                        }),
                    ),
                ]
            })
        )
        $(`.editor_popup_body_shortcut.editor_border_radius`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_border_radius',function(e){
    draw_editor_popup_border_radius();
})