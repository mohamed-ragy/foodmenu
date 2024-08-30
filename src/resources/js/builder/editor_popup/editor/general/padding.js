draw_editor_popup_padding = function(){
    show_editor_popup('editor',function(){
        let key_tree = window.selected;
         if(key_tree == 'website_header'){
            key_tree = 'website_header.children.header_wrapper'
        }
        let is_responsive = true;
        let elem = get_element_data(key_tree);
        if(elem.is_responsive == '0'){
            is_responsive = false;
        }

        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:is_responsive,
                editors:[
                    draw_four_number_pickers({
                        key_tree:key_tree,
                        variable_key:'css',
                        key:'padding',
                        units:['px'],
                        step:1,
                        names:[texts.styling.padding,texts.styling.padding_top,texts.styling.padding_right,texts.styling.padding_bottom,texts.styling.padding_left],
                    })
                ]
            })
        )
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.styling.padding)
            $(`.editor_popup_body_shortcut.editor_padding`).addClass('editor_popup_body_shortcut_selected')
            $(`.editor_popup_body_shortcut.editor_padding`).closest('.editor_popup_body_shortcut_group').find('.editor_popup_body_shortcut_open_group').addClass('editor_popup_body_shortcut_open_group_selected')
        });
    });
}
$('body').on('click','.editor_padding',function(e){
    draw_editor_popup_padding();
})