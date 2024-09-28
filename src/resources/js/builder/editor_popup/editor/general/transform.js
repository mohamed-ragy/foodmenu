draw_editor_popup_transform = function(){
    if(!accessibility_check(window.selected,'transform')){return;}
    show_editor_popup('editor',function(){
        let key_tree = window.selected;
        let is_responsive = true;
        let elem = get_element_data(key_tree);
        if(elem.is_responsive == '0'){
            is_responsive = false;
        }
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:is_responsive,
                interactions:['hover','click','focus','disabled','selected'],
                editors:[
                    $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.transform_origin}),
                        draw_input_list({
                            key_tree:key_tree,
                            variable_key:'css',
                            key:'transform-origin',
                            selections:[
                                {name:texts.styling.center,val:'center'},
                                {name:texts.styling.top,val:'top'},
                                {name:texts.styling.right,val:'right'},
                                {name:texts.styling.bottom,val:'bottom'},
                                {name:texts.styling.left,val:'left'},
                                {name:texts.styling.top_left,val:'top left'},
                                {name:texts.styling.top_right,val:'top right'},
                                {name:texts.styling.bottom_left,val:'bottom left'},
                                {name:texts.styling.bottom_right,val:'bottom right'},

                            ]
                        }),
                    ),
                    draw_transform_editor({
                        key_tree:key_tree,
                        variable_key:'css',
                        key:'transform',
                    })
                ]
            })
        )
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.styling.transform)
            $(`.editor_popup_body_shortcut.editor_transform`).addClass('editor_popup_body_shortcut_selected')
            $(`.editor_popup_body_shortcut.editor_transform`).closest('.editor_popup_body_shortcut_group').find('.editor_popup_body_shortcut_open_group').addClass('editor_popup_body_shortcut_open_group_selected')
        });
    });
}
$('body').on('click','.editor_transform',function(e){
    if(elem_has_animation(window.selected,true)){
        if($(this).hasClass('editor_popup_body_shortcut_group_elem')){
            let prev_clicked_btn = $(this).closest('.editor_popup_body_shortcuts').find('.editor_popup_body_shortcut_selected')
            setTimeout(()=>{
                prev_clicked_btn.trigger('click')
            })
        }
        return;
    }
    draw_editor_popup_transform();
})