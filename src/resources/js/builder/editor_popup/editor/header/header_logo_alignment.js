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
                            key_tree:'website_header.children.header_wrapper.children.header_logo',
                            variable_key:'css',
                            key:'flex-direction',
                            selections:[{text:texts.select_elems.row,key:'row'},{text:texts.select_elems.column,key:'column'}],
                            editor_class:'header_alignment_flex_direction'
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col header_alignment_align_items'}),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.gap_between_items}),
                        draw_number_picker({
                            key_tree:'website_header.children.header_wrapper.children.header_logo',
                            variable_key:'css',
                            key:'gap',
                            units:['px'],
                        })
                    ),
                ]
            })
        )
        setTimeout(()=>{
            set_editor_popup_header_alignement_editors()
            $('.editor_popup_title2').text(texts.styling.alignment)
            $(`.editor_popup_body_shortcut.editor_header_logo_alignment`).addClass('editor_popup_body_shortcut_selected')
        })
    })
}
set_editor_popup_header_alignement_editors = function(){
    let flex_direction = get_editor_val($('.header_alignment_flex_direction'));
    if(flex_direction == 'column'){
        $('.header_alignment_align_items').text('').append(
            $('<div/>',{class:'fs09',text:texts.styling.halign}),
            draw_select_box({
                key_tree:'website_header.children.header_wrapper.children.header_logo',
                variable_key:'css',
                key:'align-items',
                selections:[
                    {class:'ico-position_left',key:'flex-start'},
                    {class:'ico-position_hcenter',key:'center'},
                    {class:'ico-position_right',key:'flex-end'}
                ],
                editor_class:'header_alignment_align_items'
            })
        )
    }else if(flex_direction == 'row'){
        $('.header_alignment_align_items').text('').append(
            $('<div/>',{class:'fs09',text:texts.styling.valign}),
            draw_select_box({
                key_tree:'website_header.children.header_wrapper.children.header_logo',
                variable_key:'css',
                key:'align-items',
                selections:[
                    {class:'ico-position_top',key:'flex-start'},
                    {class:'ico-position_vcenter',key:'center'},
                    {class:'ico-position_bottom',key:'flex-end'}
                ],
                editor_class:'header_alignment_align_items'
            })
        )
    }
    set_all_editors();
}
$('body').on('change','.header_alignment_flex_direction',function(){
    set_editor_popup_header_alignement_editors();
})
$('body').on('click','.editor_header_logo_alignment',function(e){
    draw_editor_popup_header_logo_alignment();
})