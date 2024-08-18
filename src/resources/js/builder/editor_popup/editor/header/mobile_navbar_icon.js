draw_editor_header_mobileNav_icon = function(){
    if(!accessibility_check(window.selected,'header_mobileNav_icon')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responseive:false,
                editors:[
                    $('<div/>',{class:'w100p editor_popup_container',key:'header_mobileNav_icon'}).append(
                        $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.icon}),
                            draw_svg_icon_picker({  
                                key_tree:`website_header.elems.children.header_wrapper.children.header_mobileNav_icon.children`,
                                variable_key:null,
                                key:'icon',
                                icon_type:'menu',
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.icon_size}),
                            draw_select_range({
                                key_tree:`website_header.elems.children.header_wrapper.children.header_mobileNav_icon.children.icon`,
                                variable_key:'css',
                                key:'width',
                                range:{min:10,max:50,step:1},
                                unit:'px',
                                editor_class:'edit_header_iconList_icon_size'
                            })
                        ),
                        $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.icon_color}),
                            draw_color_picker({
                                key_tree:'website_header.elems.children.header_wrapper.children.header_mobileNav_icon',
                                variable_key:'css',
                                key:'fill',
                                editor_class:'header_iconsList_icon_color'
                            })
                        )
                    ),

                ]
            })
        )
        setTimeout(()=>{
            $(`.editor_popup_body_shortcut.editor_header_mobileNav_icon`).addClass('editor_popup_body_shortcut_selected')
        });
    })
}
$('body').on('click','.editor_header_mobileNav_icon',function(e){
    if(window.current_view !== 'mobile'){
        mobile_view();
    }
    draw_editor_header_mobileNav_icon();
})