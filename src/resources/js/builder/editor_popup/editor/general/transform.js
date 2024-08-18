draw_editor_popup_transform = function(){
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
                interactions:['hover','click','focus','disabled'],
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
            $(`.editor_popup_body_shortcut.editor_transform`).addClass('editor_popup_body_shortcut_selected')
            $(`.editor_popup_body_shortcut.editor_transform`).closest('.editor_popup_body_shortcut_group').find('.editor_popup_body_shortcut_open_group').addClass('editor_popup_body_shortcut_open_group_selected')
        });
    });
}
$('body').on('click','.editor_transform',function(e){
    // if(elem_has_animation(window.selected,true)){return;}
    console.log('gaga')
    draw_editor_popup_transform();
})