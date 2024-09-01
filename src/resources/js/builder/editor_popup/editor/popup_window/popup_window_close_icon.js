draw_editor_popup_popup_window_close_icon = function(){
    if(!accessibility_check(window.selected,'popup_window_close_icon')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.icon}),
                        draw_editors_container({
                            is_responsive:false,
                            editors:[
                                draw_svg_icon_picker({
                                    key_tree:`${window.selected}.children`,
                                    variable_key:null,
                                    key:'popup_close',
                                    icon_type:'close',
                                }),
                            ]
                        }),

                    ),
                    $('<div/>',{class:'editor_popup_row'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.icon_color}),
                        draw_color_picker({
                            key_tree:`${window.selected}.children.popup_close`,
                            variable_key:'css',
                            key:'fill',
                            editor_class:'popup_close_icon_color',
                        })
                    ),
                    $('<div/>',{class:'editor_popup_row'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.bg_color}),
                        draw_color_picker({
                            key_tree:`${window.selected}.children.popup_close`,
                            variable_key:'css',
                            key:'background-color',
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.icon_size}),
                        draw_select_range({
                            key_tree:`${window.selected}.children.popup_close`,
                            variable_key:'css',
                            key:'width',
                            range:{min:10,max:50,step:1},
                            unit:'px',
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.icon_position}),
                        draw_input_list({
                            key_tree:`${window.selected}.children.popup_close`,
                            variable_key:'css',
                            key:'inset',
                            selections:[
                                {name:texts.select_elems.position_1,val:'0px 0px auto auto'},
                                {name:texts.select_elems.position_2,val:'10px 10px auto auto'},
                                {name:texts.select_elems.position_3,val:'auto 0px calc(100% + 3px) auto'},
                                {name:texts.select_elems.position_4,val:'auto auto calc(100% + 1px) calc(100% + 1px)'},
                                {name:texts.select_elems.position_5,val:'0px auto auto calc(100% + 3px)'},
                                {name:texts.select_elems.position_6,val:'10px auto auto calc(100% + 3px)'},
                            ]
                        }),
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.padding}),
                        draw_number_picker({
                            key_tree:`${window.selected}.children.popup_close`,
                            variable_key:'css',
                            key:'padding',
                            step:1,
                            units:['px']
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.border_radius}),
                        draw_number_picker({
                            key_tree:`${window.selected}.children.popup_close`,
                            variable_key:'css',
                            key:'border-radius',
                            step:1,
                            units:['px','%']
                        })
                    ),
                ]
            })
        )
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.styling.close_icon)
            $(`.editor_popup_body_shortcut.editor_popup_popup_window_close_icon`).addClass('editor_popup_body_shortcut_selected')
        });
    })

}
$('body').on('click','.editor_popup_popup_window_close_icon',function(){
    draw_editor_popup_popup_window_close_icon();
})
$('body').on('change','.popup_close_icon_color',function(){
    let val = get_editor_val($(this));
    $(this).attr('key','stroke');
    set_val($(this),val);
    $(this).attr('key','fill');
    new_action('popup_window.children.popup_card');
})