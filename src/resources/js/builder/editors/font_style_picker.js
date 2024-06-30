draw_font_style_picker = function(data){
    let font_styles_list;let recent_font_styles_list;
    let editor = $('<div/>',{
        class:`editor font_picker_editor`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
    }).append(
        recent_font_styles_list = $('<div/>',{class:'recent_font_styles_list mB20'}),
        font_styles_list = $('<div/>',{class:'font_styles_list'})
    );
    for(const key in window.fonts){
        let font = window.fonts[key];
        if(window.template.settings.font_styles.includes(font.name)){
            recent_font_styles_list.append(
                $('<div/>',{
                    text:texts.styling[`font_example_${font.language}`],
                    class:'font_styles_list_font',
                    style:`font-family:${font.name}`,
                    font_name:font.name,
                })
            )
        }else{
            font_styles_list.append(
                $('<div/>',{
                    text:texts.styling[`font_example_${font.language}`],
                    class:'font_styles_list_font',
                    style:`font-family:${font.name}`,
                    font_name:font.name,
                })
            )
        }
    }
    return editor;
}
set_font_style_picker = function(editor){
    editor.attr('key',window.preview_language)
    let val = get_editor_val(editor);
    $('.font_styles_list_font').removeClass('font_styles_list_font_selected')
    if(typeof(val) !== 'undefined'){
        editor.find(`.font_styles_list_font[font_name="${val}"]`).addClass('font_styles_list_font_selected')
    }
}
//
$('body').on('click','.font_styles_list_font',function(){
    let editor = $(this).closest('.font_picker_editor');
    let old_selected_font = editor.find('.font_styles_list_font_selected').attr('font_name');
    selected_font_name = $(this).attr('font_name');
    if(window.template.settings.font_styles.includes(old_selected_font)){
        window.template.settings.font_styles = window.template.settings.font_styles.filter(e=> e !== old_selected_font);
    }
    if(!window.template.settings.font_styles.includes(selected_font_name)){
        window.template.settings.font_styles.push(selected_font_name)
    }
    set_val(editor,selected_font_name)
    new_action();
})