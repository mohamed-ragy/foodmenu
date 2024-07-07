draw_editor_popup_transform = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.transform_origin}),
                        draw_input_list({
                            key_tree:window.selected,
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
                        key_tree:window.selected,
                        variable_key:'css',
                        key:'transform',
                    })
                ]
            })
        )
        $(`.editor_popup_body_shortcut.editor_transform`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_transform',function(e){
    if(elem_has_animation(window.selected,true)){return;}
    draw_editor_popup_transform();
})