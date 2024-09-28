draw_editor_popup_section_block_alignment = function(){
    if(!accessibility_check(window.selected,'alignment')){return;}
    show_editor_popup('editor',function(){
        let elem = get_element_data(window.selected);
        let editors_container;
        $('#editor').find('.editor_popup_body').text('').append(
            editors_container = draw_editors_container({
                is_responsive:true,
                editors:[
                    $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.elements_direction}),
                        draw_select_box({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'flex-direction',
                            editor_class:'editor_popup_alignment_flex_direction',
                            selections:[
                                {text:texts.select_elems.column,key:'column'},
                                {text:texts.select_elems.row,key:'row'},
                            ],
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
                        $('<div/>',{class:'fs09',text:texts.styling.gap_between_elems}),
                        draw_number_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'gap',
                            units:['px']
                        })

                    ),
                    $('<div/>',{class:'editor_popup_col editor_popup_alignment_align_items'}),
                    $('<div/>',{class:'editor_popup_col editor_popup_alignment_justify_content'}),
                    elem.type != 'container' ? $('<div/>',{class:'editor_popup_col'}).append(
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
                    ) : '',
                    // 'align-self' in elem.css ?  $('<div/>',{class:'editor_popup_col'}).append(
                    //     $('<div/>',{class:'fs09',text:texts.styling.align_self}),
                    //     draw_select_box({
                    //         key_tree:window.selected,
                    //         variable_key:'css',
                    //         key:'align-self',
                    //         selections:[
                    //             {text:texts.styling.auto,key:'auto'},
                    //             {text:texts.styling.start,key:'flex-start'},
                    //             {text:texts.styling.center,key:'center'},
                    //             {text:texts.styling.end,key:'flex-end'},
                    //         ]
                    //     })
                    // )
                    // : '',
                ]
            }),
        )
        setTimeout(()=>{
            draw_editor_popup_alignment_editors(editors_container)
            $('.editor_popup_title2').text(texts.styling.alignment)
            $(`.editor_popup_body_shortcut.editor_alignment`).addClass('editor_popup_body_shortcut_selected')
        });
    });
}
draw_editor_popup_alignment_editors = function(editors_container){
    let flex_direction = get_editor_val(editors_container.find('.editor_popup_alignment_flex_direction'));
    let editor_popup_alignment_align_items = editors_container.find('.editor_popup_alignment_align_items');
    let editor_popup_alignment_justify_content = editors_container.find('.editor_popup_alignment_justify_content');
    if(flex_direction == 'column'){
        editor_popup_alignment_align_items.text('').append(
            $('<div/>',{class:'fs09',text:texts.styling.halign}),
            draw_select_box({
                key_tree:window.selected,
                variable_key:'css',
                key:'align-items',
                editor_class:'editor_alignments_align_items',
                selections:[
                    {class:'ico-position_left',key:'flex-start'},
                    {class:'ico-position_hcenter',key:'center'},
                    {class:'ico-position_right',key:'flex-end'},
                    {class:'ico-position_hstretch',key:'stretch'},
                ],
            })
        );
        editor_popup_alignment_justify_content.text('').append(
            $('<div/>',{class:'fs09',text:texts.styling.valign}),
            draw_select_box({
                key_tree:window.selected,
                variable_key:'css',
                key:'justify-content',
                selections:[
                    {class:'ico-position_top',key:'flex-start'},
                    {class:'ico-position_vcenter',key:'center'},
                    {class:'ico-position_bottom',key:'flex-end'},
                ]
            })
        );
    }else if(flex_direction == 'row'){
        editor_popup_alignment_align_items.text('').append(
            $('<div/>',{class:'fs09',text:texts.styling.valign}),
            draw_select_box({
                key_tree:window.selected,
                variable_key:'css',
                key:'align-items',
                editor_class:'editor_alignments_align_items',
                selections:[
                    {class:'ico-position_top',key:'flex-start'},
                    {class:'ico-position_vcenter',key:'center'},
                    {class:'ico-position_bottom',key:'flex-end'},
                    {class:'ico-position_vstretch',key:'stretch'},
                ],
            })
        );
        editor_popup_alignment_justify_content.text('').append(
            $('<div/>',{class:'fs09',text:texts.styling.halign}),
            draw_select_box({
                key_tree:window.selected,
                variable_key:'css',
                key:'justify-content',
                selections:[
                    {class:'ico-position_left',key:'flex-start'},
                    {class:'ico-position_hcenter',key:'center'},
                    {class:'ico-position_right',key:'flex-end'},
                ]
            })
        );
    }
    set_all_editors()
}
$('body').on('click','.editor_alignment',function(e){
    draw_editor_popup_section_block_alignment();
})
$('body').on('change','.editor_popup_alignment_flex_direction',function(){
    let editors_container = $(this).closest('.editors_container');
    draw_editor_popup_alignment_editors(editors_container)
})

$('body').on('change','.editor_alignments_align_items',function(){
    let elem = get_element_data(window.selected);
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
    generate_elems_style(elem);
})