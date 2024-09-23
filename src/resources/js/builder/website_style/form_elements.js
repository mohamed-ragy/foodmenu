render_form_elements = function(){
    for(const key in window.template.form_elements){
        generate_elem_style(window.template.form_elements[key]);
    }
    console.log('form_elements rendered')
}

$('body').on('mousedown','.form_elements',function(e){
    if($(this).hasClass('form_elements_selected')){return;}
    if($('.form_element:hover').length > 0){return}
    select($(this).attr('key_tree'))
    $(this).find('.edit_btns').first().addClass('edit_btns_animation_slide_left')
})
$('body').on('contextmenu','.form_elements',function(e){
    if($('.form_element:hover').length > 0){return}
    show_contextMenu('form_elements',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})

$('body').on('dblclick','.form_elements',function(){
    if($('.form_element:hover').length > 0){return}
    draw_editor_popup_website_form()
})
//
$('body').on('mousedown','.form_element',function(e){
    if($(this).hasClass('form_element_selected')){return;}
    select($(this).attr('key_tree'))
    $(this).find('.edit_btns').first().addClass('edit_btns_animation_slide_left')
})
$('body').on('contextmenu','.form_element',function(e){
    show_contextMenu('form_element',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})
$('body').on('dblclick','.form_element',function(){
    let elem = get_element_data($(this).attr('key_tree'));
    if(elem.form_element == 'form_title' || elem.form_element == 'form_message'){
        draw_editor_popup_text_style();
    }else if(elem.form_element == 'form_input_box'){
        draw_editor_popup_input_box();
    }else if(elem.form_element == 'form_check_box'){
        draw_editor_popup_check_box();
    }else if(elem.form_element == 'form_button'){
        draw_editor_popup_button();
    }else if(elem.form_element == 'form_loading_spinner'){
        draw_editor_popup_loading_spinner();
    }
})