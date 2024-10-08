draw_editor_popup_rename = function(){
    if(!accessibility_check(window.selected,'rename')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'fs09',text:texts.section_name}),
                        draw_rename_editor({
                            key_tree:window.selected,
                            variable_key:null,
                            key:'name',
                        })
                    )
                ]
            })
        )
        setTimeout(()=>{
            $('.rename_editor').select();
            $('.editor_popup_title2').text(texts.styling.rename_section)
            $(`.editor_popup_body_shortcut.editor_rename`).addClass('editor_popup_body_shortcut_selected')
        });
    });
}
$('body').on('click','.editor_rename',function(e){
    draw_editor_popup_rename();
})
