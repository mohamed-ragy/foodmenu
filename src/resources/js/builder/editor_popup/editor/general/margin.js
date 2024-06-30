draw_editor_popup_margin = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'row alnC jstfyS'}).append(
                            $('<div/>',{class:'ico-arrowRight2 editor_details_toggle'}),
                            $('<div/>',{class:'fs09 ',text:texts.styling.margin}),
                        ),
                        draw_number_picker({
                            dummy:true,
                            dummy_class:'editor_details_head',
                            step:1,
                            units:['px','em','%'],
                        }),
                    ),
                    $('<div/>',{class:`editor_popup_col editor_detail_container editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'mis-10 fs09 ',text:texts.styling.margin_top}),
                        draw_number_picker({
                            editor_details:true,
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'margin-top',
                            step:1,
                            units:['px','em','%'],
                        }),
                    ),
                    $('<div/>',{class:`editor_popup_col editor_detail_container editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'mis-10 fs09',text:texts.styling.margin_right}),
                        draw_number_picker({
                            editor_details:true,
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'margin-right',
                            step:1,
                            units:['px','em','%'],
                        }),
                    ),
                    $('<div/>',{class:`editor_popup_col editor_detail_container editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'mis-10 fs09',text:texts.styling.margin_bottom}),
                        draw_number_picker({
                            editor_details:true,
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'margin-bottom',
                            step:1,
                            units:['px','em','%'],
                        }),
                    ),
                    $('<div/>',{class:`editor_popup_col editor_detail_container editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'mis-10 fs09',text:texts.styling.margin_left}),
                        draw_number_picker({
                            editor_details:true,
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'margin-left',
                            step:1,
                            units:['px','em','%'],
                        }),
                    ),
                ]
            })
        )
        $(`.editor_popup_body_shortcut.editor_margin`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_margin',function(e){
    draw_editor_popup_margin();
})