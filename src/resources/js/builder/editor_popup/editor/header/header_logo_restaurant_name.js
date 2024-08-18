draw_editor_popup_header_logo_restaurant_name = function(){
    if(!accessibility_check(window.selected,'header_logo_logo')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            $('<div/>',{class:'w100p editor_popup_container',key:'header_logo_restaurant_name'}).append(
                draw_editors_container({
                    is_responsive:true,
                    editors:[
                        $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.display}),
                            draw_select_box({
                                key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_restaurant_name',
                                variable_key:'css',
                                key:'display',
                                selections:[{text:texts.styling.show,key:'block'},{text:texts.styling.hide,key:'none'}],
                            })
                        ),
                        draw_editor_show_container({key:'header_logo_restaurant_name_font_style',name:texts.styling.font_style,row_class:true,container_class:''}),
                        $('<div/>',{class:'editor_popup_row'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.font_color}),
                            draw_color_picker({
                                key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_restaurant_name',
                                variable_key:'css',
                                key:'color',
                            })
                        ),  
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.font_size}),
                            draw_number_picker({
                                key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_restaurant_name',
                                variable_key:'css',
                                key:'font-size',
                                step:1,
                                units:['px','em']
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.font_weight}),
                            draw_select_box({
                                key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_restaurant_name',
                                variable_key:'css',
                                key:'font-weight',
                                selections:[{text:texts.styling.bold,key:'bold'},{text:texts.styling.normal,key:'normal'}],
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.italic}),
                            draw_select_box({
                                key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_restaurant_name',
                                variable_key:'css',
                                key:'font-style',
                                selections:[{text:texts.styling.italic,key:'italic'},{text:texts.styling.normal,key:'normal'}],
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.underline}),
                            draw_select_box({
                                key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_restaurant_name',
                                variable_key:'css',
                                key:'text-decoration',
                                selections:[{text:texts.styling.underline,key:'underline'},{text:texts.styling.normal,key:'none'}],
                            })
                        ),
                    ]
                })
            ),
            $('<div/>',{class:'w100p editor_popup_container none',key:'header_logo_restaurant_name_font_style',parent_key:'header_logo_restaurant_name'}).append(
                draw_editors_container({
                    is_responsive:false,
                    editors:[
                        draw_font_style_picker({
                            key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_restaurant_name',
                            variable_key:'font_style',
                        })
                    ]
                })
            )
        )
    })
    setTimeout(()=>{
        $(`.editor_popup_body_shortcut.editor_header_logo_restaurant_name`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_header_logo_restaurant_name',function(e){
    draw_editor_popup_header_logo_restaurant_name();
})