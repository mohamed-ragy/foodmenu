draw_editor_popup_border = function(){
    if(!accessibility_check(window.selected,'border')){return;}
    show_editor_popup('editor',function(){
        let key_tree = window.selected;
        let is_responsive = true;
        let elem = get_element_data(key_tree);
        if(elem.is_responsive == '0'){
            is_responsive = false;
        }
        if('styling_target' in elem){
            key_tree = elem.styling_target.border ?? key_tree
        }
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:is_responsive,
                interactions:['hover','click','focus','disabled','error','selected'],
                editors:[
                    draw_border_editor({
                        key_tree:key_tree,
                        variable_key:'css',
                        editor_class:'editor_popup_border_editor'
                    }),
                ]
            }),
        )
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.styling.border)
            $(`.editor_popup_body_shortcut.editor_border`).addClass('editor_popup_body_shortcut_selected')
            $(`.editor_popup_body_shortcut.editor_border`).closest('.editor_popup_body_shortcut_group').find('.editor_popup_body_shortcut_open_group').addClass('editor_popup_body_shortcut_open_group_selected')
        });
    });
}
$('body').on('click','.editor_border',function(e){
    draw_editor_popup_border();
})
$('body').on('change','.editor_popup_border_editor',function(){
    let key_tree = $(this).attr('key_tree')
    if(key_tree.includes('website_header')){
        try{
            generate_elem_style(get_element_data(`${window.template.settings.selected_page}.0`))
        }catch{}
    }
})