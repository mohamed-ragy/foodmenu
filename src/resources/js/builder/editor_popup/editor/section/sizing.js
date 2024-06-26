draw_editor_popup_section_sizing = function(){
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.min_height}),
                        draw_input_list({
                            key_tree:`${window.selected}.children.section_wrapper`,
                            variable_key:'css',
                            key:'min-height',
                            selections:[
                                {name:texts.select_elems.auto,val:'auto',class:''},
                                {name:texts.select_elems.screen_height,val:'var(--screen_height)',class:''},
                                {name:texts.select_elems.screen_height_minus_header,val:'var(--screen_height_minus_header)',class:''},
                                {name:texts.select_elems._400px,val:'400px',class:''},
                                {name:texts.select_elems._500px,val:'500px',class:''},
                                {name:texts.select_elems._600px,val:'600px',class:''},
                                {name:texts.select_elems._700px,val:'700px',class:''},
                                {name:texts.select_elems._800px,val:'800px',class:''},
                                {name:texts.select_elems._900px,val:'900px',class:''},
                                {name:texts.select_elems._1000px,val:'1000px',class:''},
                            ],
                        }),
                    ),
                    $('<div/>',{class:`editor_popup_col`}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.max_width}),
                        draw_select_box({
                            key_tree:`${window.selected}.children.section_wrapper`,
                            variable_key:'css',
                            key:'max-width',
                            selections:[
                                {text:texts.styling.max_content,key:'var(--page_max_width)'},
                                {text:texts.styling.full_page,key:'100%'}
                            ],
                        }),
                    ),
                ],
            })
    )
    $(`.editor_popup_body_shortcut.editor_section_sizing`).addClass('editor_popup_body_shortcut_selected')
});
}
$('body').on('click','.editor_section_sizing',function(e){
    draw_editor_popup_section_sizing();
})