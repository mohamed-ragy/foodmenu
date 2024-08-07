draw_editor_popup_header_logo_alignment = function(){
    if(!accessibility_check(window.selected,'header_logo_alignment')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.direction}),
                        draw_select_box({
                            key_tree:'website_header.elems.children.header_wrapper.children.header_logo',
                            variable_key:'css',
                            key:'flex-direction',
                            selections:[{text:texts.select_elems.row,key:'row'},{text:texts.select_elems.column,key:'column'}]
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.alignment}),
                        draw_select_box({
                            key_tree:'website_header.elems.children.header_wrapper.children.header_logo',
                            variable_key:'css',
                            key:'align-items',
                            selections:[{text:texts.select_elems.start,key:'flex-start'},{text:texts.select_elems.center,key:'center'},{text:texts.select_elems.end,key:'flex-end'}]
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.gap_between_items}),
                        draw_number_picker({
                            key_tree:'website_header.elems.children.header_wrapper.children.header_logo',
                            variable_key:'css',
                            key:'gap',
                            units:['px'],
                            step:1,
                        })
                    ),
                ]
            })
        )
        $(`.editor_popup_body_shortcut.editor_header_logo_alignment`).addClass('editor_popup_body_shortcut_selected')
    })
}
$('body').on('click','.editor_header_logo_alignment',function(e){
    
    draw_editor_popup_header_logo_alignment();
})