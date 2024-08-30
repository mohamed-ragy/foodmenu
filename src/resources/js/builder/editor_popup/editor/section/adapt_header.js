draw_editor_popup_section_adapt_header = function(){
    if(!accessibility_check(window.selected,'section_adapt_header')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    $('<div/>',{class:`editor_popup_row editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.adapt_header}),
                        draw_switch_btn({
                            key_tree:`${window.selected}`,
                            variable_key:'attr',
                            key:'adapt_header',
                        }),
                    ),
                    $('<div/>',{class:`editor_popup_row`}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.adapted_font_color}),
                        draw_color_picker({
                            key_tree:`${window.selected}`,
                            variable_key:'attr',
                            key:'adapt_header_color',
                        })
                    ),
                ]
            }),
        )
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.styling.adapt_header)
            $(`.editor_popup_body_shortcut.editor_section_adapt_header`).addClass('editor_popup_body_shortcut_selected')
        });
    });
}
$('body').on('click','.editor_section_adapt_header',function(e){
    draw_editor_popup_section_adapt_header();
})