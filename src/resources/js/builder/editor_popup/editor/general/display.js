draw_editor_popup_display = function(){
    show_editor_popup('editor',function(){
        let elem = get_element_data(window.selected);
        let show_key = 'block';
        if(elem.type == 'container'){show_key = 'flex'}
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.display}),
                        draw_select_box({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'display',
                            selections:[
                                {text:texts.styling.show,key:show_key},
                                {text:texts.styling.hide,key:'none'},
                            ]
                        })
                    ),
                    elem.type != 'container' ? $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.align_self}),
                        draw_select_box({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'align-self',
                            selections:[
                                {text:texts.styling.auto,key:'auto'},
                                {text:texts.styling.start,key:'flex-start'},
                                {text:texts.styling.center,key:'center'},
                                {text:texts.styling.end,key:'flex-end'},
                            ]
                        })
                    ) : '',
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
            })
        )
    })
    setTimeout(()=>{
        $('.editor_popup_title2').text(texts.styling.display)
        $(`.editor_popup_body_shortcut.editor_display`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_display',function(e){
    draw_editor_popup_display();
})