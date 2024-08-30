draw_font_style_picker = function(data){
    let editor = $('<div/>',{
        class:`editor font_picker_editor`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        render:data.render ?? '',
        generate_style:data.generate_style ?? data.key_tree,
    }).append(
        $('<div/>',{class:'recent_font_styles_list mB20'}),
        data.page_default_btn != false ? $('<div/>',{class:'row alnC jstfyE w100p'}).append(
            $('<button/>',{class:'font_styles_list_font_page_default btn btn-cancel',text:texts.styling.use_page_default}),
        ) : null,
        $('<div/>',{class:'font_styles_list'})
    );

    return editor;
}
set_font_style_picker = function(editor){
    editor.attr('key',window.preview_language)
    let val = get_editor_val(editor);
    if(val == window.template.page_setup.font_style[window.preview_language] || typeof(val) === 'undefined' || val == ''){
        editor.find('.font_styles_list_font_page_default').addClass('none')
    }else{
        editor.find('.font_styles_list_font_page_default').removeClass('none')
    }
    set_used_font_styles(editor)
    editor.find('.font_styles_list_font').removeClass('font_styles_list_font_selected')
    if(typeof(val) !== 'undefined'){
        editor.find(`.font_styles_list_font[font_name="${val}"]`).addClass('font_styles_list_font_selected')
    }
    setTimeout(()=>{
        $('.editor_popup_body_wrapper').trigger('scroll')
    })
}
set_used_font_styles = function(editor){
    editor.find('.recent_font_styles_list').text('').append(
        $('<div/>',{class:'mX20 mB5 fs08 c_white-10',text:texts.styling.used_font_styles})
    )
    editor.find('.font_styles_list').text('').append(
        $('<div/>',{class:'mX20 mB5 fs08 c_white-10',text:texts.styling.other_fonts})
    )
    for(const key in window.fonts){
        let font = window.fonts[key];
        let is_loaded = false;
        if(window.loaded_fonts.includes(font.name)){
            is_loaded = true;
        }
       if(window.used_font_styles.includes(font.name)){
            editor.find('.recent_font_styles_list').append(
                $('<div/>',{
                    text:is_loaded ? texts.styling[`font_example_${font.language}`] : '',
                    class:'font_styles_list_font',
                    style:is_loaded ? `font-family:${font.name}` : '',
                    font_name:font.name,
                }).append(
                    !is_loaded ? $('<div/>',{class:'cardLoading w200 h15 br3'}) : ''
                )
            )
        }else{
            editor.find('.font_styles_list').append(
                $('<div/>',{
                    text:is_loaded ? texts.styling[`font_example_${font.language}`] : '',
                    class:'font_styles_list_font',
                    style:is_loaded ? `font-family:${font.name}` : '',
                    font_name:font.name,
                }).append(
                    !is_loaded ? $('<div/>',{class:'cardLoading w200 h15 br3'}) : ''
                )
            )
        }
    }

}
load_font_style = function(font_name){
    let font = window.fonts.find(item=>item.name==font_name);
    if(!font){
        return;
    }
    if(!window.window.loaded_fonts.includes(font_name)){
        window.loaded_fonts.push(font_name);
    }else{
        return;
    }
    const _font = new FontFace(font.name, `url(/storage/builder_fonts/${font.language}/${font.name}.ttf)`);
    _font.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
        $(`.font_styles_list_font[font_name="${font_name}"]`).text(texts.styling[`font_example_${font.language}`]).css('font-family',font.name).find('.cardLoading').remove();
    }).catch((error) => {

    });
}
//
$('body').on('mouseup','.font_styles_list_font',function(){
    let editor = $(this).closest('.font_picker_editor');
    editor.find('.font_styles_list_font').removeClass('font_styles_list_font_selected');
    $(this).addClass('font_styles_list_font_selected')
    selected_font_name = $(this).attr('font_name');
    editor.find('.font_styles_list_font_page_default').removeClass('none')
    set_val(editor,selected_font_name)
    new_action(editor.attr('generate_style'),editor.attr('render'));
    set_font_style_picker(editor);
})
$('body').on('mouseup','.font_styles_list_font_page_default',function(){
    let editor = $(this).closest('.font_picker_editor');
    editor.find('.font_styles_list_font').removeClass('font_styles_list_font_selected');
    $(this).addClass('none')
    set_val(editor,'')
    new_action(editor.attr('generate_style'),editor.attr('render'));
    set_font_style_picker(editor);
})
//
$('body').on('click','.select_font',function(e){
    draw_editor_popup_text();
    editor_popup_to_child($('.editor_popup_container[key="text_font_style"]'))
})
set_editor_popup_scroll_to_load_font_styles = function(){
    $('.editor_popup_body_wrapper').on('scroll', function() {
        const scrollableRect = $(this)[0].getBoundingClientRect();
        $('.font_styles_list_font').each(function() {
            const childRect = $(this)[0].getBoundingClientRect();
            if (
                childRect.top < scrollableRect.bottom &&
                childRect.bottom > scrollableRect.top &&
                childRect.left < scrollableRect.right &&
                childRect.right > scrollableRect.left
            ) {
                let font_name = $(this).attr('font_name')
                load_font_style(font_name)
            }
        });
    });
}
