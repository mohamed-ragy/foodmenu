draw_editor_popup_header_logo_logo = function(){
    if(!accessibility_check(window.selected,'header_logo_logo')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.display}),
                        draw_select_box({
                            key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_logo',
                            variable_key:'css',
                            key:'display',
                            selections:[{text:texts.styling.show,key:'block'},{text:texts.styling.hide,key:'none'}],
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.size}),
                        draw_number_picker({
                            key_tree:'website_header.elems.children.header_wrapper.children.header_logo.children.header_logo_logo',
                            variable_key:'css',
                            key:'height',
                            step:1,
                            units:['px','em'],
                        })
                    ),
                ]
            })
        )
    })
    setTimeout(()=>{
        $(`.editor_popup_body_shortcut.editor_header_logo_logo`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_header_logo_logo',function(e){
    draw_editor_popup_header_logo_logo();
})