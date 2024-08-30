draw_editor_popup_icon = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    $('<div/>',{class:'editor_popup_container w100p',key:'editor_icon'}).append(
                        draw_editor_show_container({
                            key:'editor_icon_size',
                            name:texts.styling.icon_size,
                            row_class:true,
                            container_class:'editor_popup_brdrT_none'
                        }),
                        draw_png_icon_selector({
                            key_tree:`${window.selected}`,
                            variable_key:'attr',
                            key:'src',
                        })
                    ),
                    $('<div/>',{class:'editor_popup_container w100p none',key:'editor_icon_size',parent_key:'editor_icon'}).append(
                        draw_editors_container({
                            is_responsive:true,
                            editors:[
                                $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                                    $('<div/>',{class:'fs09',text:texts.styling.icon_size}),
                                        draw_number_picker({
                                            key_tree:window.selected,
                                            variable_key:'css',
                                            key:'width',
                                            step:'1',
                                            units:['px','em','%']
                                        })
                                ),
                            ]
                        }),
                    ),
                ]
            })
        )
        setTimeout(()=>{
            $('.editor_popup_title2').text('')
            $(`.editor_popup_body_shortcut.editor_icon`).addClass('editor_popup_body_shortcut_selected')
        });
    })
}
$('body').on('click','.editor_icon',function(e){
    draw_editor_popup_icon();
})
