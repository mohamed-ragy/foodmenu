draw_font_style_picker = function(data){
    let font_styles_list;
    let editor = $('<div/>',{
        class:`editor font_picker_editor`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
    }).append(
        font_styles_list = $('<div/>',{class:'font_styles_list'})
    );
    for(const key in window.fonts){
        let font = window.fonts[key];
        font_styles_list.append(
            $('<div/>',{
                text:texts.styling[`font_example_${font.language}`],
                // text:font.name,
                class:'font_styles_list_font',
                style:`font-family:${font.name}`,
                font_name:font.name,
            })
        )
    }
    return editor;
}
set_font_style_picker = function(editor){
    editor.attr('key',window.preview_language)
    let val = get_editor_val(editor);
    // let font = window.fonts.find(item=>item.name == val);
    // console.log(font)
    $('.font_styles_list_font').removeClass('font_styles_list_font_selected')
    if(typeof(val) !== 'undefined'){
        editor.find(`.font_styles_list_font[font_name="${val}"]`).addClass('font_styles_list_font_selected')
    }
}
//
$('body').on('click','.font_styles_list_font',function(){
    // let font = window.fonts.find(item=>item.name == $(this).attr('font_name'));
    set_val($(this).closest('.font_picker_editor'),$(this).attr('font_name'))
    new_action();
})