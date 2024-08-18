draw_editor_popup_section_block_alignment = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.elements_direction}),
                        draw_select_box({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'flex-direction',
                            selections:[
                                {text:texts.select_elems.column,key:'column'},
                                {text:texts.select_elems.row,key:'row'},
                            ]
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.wrap_elements}),
                        draw_select_box({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'flex-wrap',
                            selections:[
                                {text:texts.select_elems.wrap,key:'wrap'},
                                {text:texts.select_elems.no_wrap,key:'nowrap'},
                            ]
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.align_elems}),
                        draw_select_box({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'align-items',
                            editor_class:'editor_alignments_align_items',
                            selections:[
                                {text:texts.select_elems.start,key:'flex-start'},
                                {text:texts.select_elems.center,key:'center'},
                                {text:texts.select_elems.end,key:'flex-end'},
                            ]
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.justify_elems}),
                        draw_select_box({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'justify-content',
                            selections:[
                                {text:texts.select_elems.start,key:'flex-start'},
                                {text:texts.select_elems.center,key:'center'},
                                {text:texts.select_elems.end,key:'flex-end'},
                            ]
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.overflow}),
                        draw_select_box({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'overflow',
                            selections:[
                                {text:texts.styling.visible,key:'visible'},
                                {text:texts.styling.hidden,key:'hidden'},
                            ]
                        })
                    )
                ]
            }),
        )
        setTimeout(()=>{
            $(`.editor_popup_body_shortcut.editor_alignment`).addClass('editor_popup_body_shortcut_selected')
        });
    });
}
$('body').on('click','.editor_alignment',function(e){
    draw_editor_popup_section_block_alignment();
})
$('body').on('change','.editor_alignments_align_items',function(){
    let elem = get_elem_data(window.selected).elem;
    let responsive_key = get_responseive_key($(this));
    for(const key in elem.children){
        let child = elem.children[key];
        if(responsive_key == '0' || responsive_key == 'desktop'){
            child.css['align-self'] = 'auto';
        }else if(responsive_key == 'general'){
            child.css['align-self'] = 'auto';
            child.css_mobile['align-self'] = 'auto';
        }else if(responsive_key == 'desktop'){
            child.css['align-self'] = 'auto';
        }else if(responsive_key == 'mobile'){
            child.css_mobile['align-self'] = 'auto';
        }
    }
    undo_redo_actions();
})