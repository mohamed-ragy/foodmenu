draw_editor_popup_width = function(){
    show_editor_popup('editor',function(){
        let key_tree = window.selected;
        let is_responsive = true;
        let elem = get_elem_data(key_tree).elem;
        if(elem.is_responsive == '0'){
            is_responsive = false;
        }

        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:is_responsive,
                editors:[
                    $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.width}),
                        draw_number_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'width',
                            units:['auto','px','%'],
                            step:1,
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col '}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.max_width}),
                        draw_number_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'max-width',
                            units:['px','%'],
                            step:1,
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col '}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.min_width}),
                        draw_number_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'min-width',
                            units:['auto','px','%'],
                            step:1,
                        })
                    ),
                ]
            })
        )
    })
    setTimeout(()=>{
        $(`.editor_popup_body_shortcut.editor_width`).addClass('editor_popup_body_shortcut_selected')
        $(`.editor_popup_body_shortcut.editor_width`).closest('.editor_popup_body_shortcut_group').find('.editor_popup_body_shortcut_open_group').addClass('editor_popup_body_shortcut_open_group_selected')
    });
}
$('body').on('click','.editor_width',function(e){
    draw_editor_popup_width();
})