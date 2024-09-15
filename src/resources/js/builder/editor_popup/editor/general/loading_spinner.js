draw_editor_popup_loading_spinner = function(){
    if(!accessibility_check(window.selected,'loading_spinner')){return;}
    show_editor_popup('editor',function(){
        let loading_spinners_preview;
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    $('<div/>',{class:'editor_popup_container w100p',key:'editor_loading_spinner'}).append(
                        draw_editor_show_container({
                            key:'editor_customize_loading_spinner',
                            name:texts.styling.customize_spinner,
                            row_class:true,
                            container_class:'editor_popup_brdrT_none editor_popup_brdrB'
                        }),
                        $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.select_spinner}),
                            loading_spinners_preview = $('<div/>',{class:'w100p row alnS jstfyC wrap loading_spinners_preview'})
                        ),
                    ),
                    $('<div/>',{class:'editor_popup_container w100p none',key:'editor_customize_loading_spinner',parent_key:'editor_loading_spinner'}).append(

                        draw_loading_spinner_editor({
                            key_tree:`${window.selected}.children.loading_spinner`,
                        }),
                    ),
                ]
            })
        )
        let loading_spinners = get_loading_spinners();
        for(const key in loading_spinners){
            let loading_spinner = loading_spinners[key];
            loading_spinners_preview.append(
                $('<div/>',{class:'loading_spinnser_preivew',style:`width:${loading_spinner.vars[':size:']};aspect-ratio:${loading_spinner.css['aspect-ratio']}`,spinner_key:key}).append(
                    generate_html(loading_spinner)
                )
            );
        }
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.styling.loading_spinner)
            $(`.editor_popup_body_shortcut.editor_loading_spinner`).addClass('editor_popup_body_shortcut_selected')
        });
    });
}
$('body').on('click','.editor_loading_spinner',function(){
    draw_editor_popup_loading_spinner()
})
$('body').on('click','.loading_spinnser_preivew',function(){
    let elem = get_element_data(window.selected);
    let old_vars = elem.children.loading_spinner.vars;
    let new_loading_spinner = get_loading_spinner($(this).attr('spinner_key'),elem.class_selector);
    elem.children.loading_spinner = new_loading_spinner
    new_action(window.selected);
    set_all_editors();
})