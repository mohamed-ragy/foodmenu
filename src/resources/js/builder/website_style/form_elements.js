set_form_elements_vars = function(){
    $(':root').css('--form_elem_spacing',window.template.form_elements.spacing);
    //
    $(':root').css('--input_border_width',window.template.form_elements.input.border_width);
    $(':root').css('--input_border_style',window.template.form_elements.input.border_style);
    $(':root').css('--input_border_radius',window.template.form_elements.input.border_radius);
    $(':root').css('--input_padding',window.template.form_elements.input.padding);
    $(':root').css('--input_font_size',window.template.form_elements.input.font_size);
    $(':root').css('--input_label_font_size',window.template.form_elements.input.label_font_size);
    if(window.template.form_elements.input.focus_outline == true){
        $(':root').css('--input_focus_outline_width',`${window.template.form_elements.input.border_width}`);
    }else{
        $(':root').css('--input_focus_outline_width',`0px`);
    }
    if(window.template.form_elements.input.background_fill == true){
        $(':root').css('--input_bg_color', `rgb(${window.template.form_elements.input.input_bg_color.r},${window.template.form_elements.input.input_bg_color.g},${window.template.form_elements.input.input_bg_color.b})`);
    }else{
        $(':root').css('--input_bg_color', `transparent`);
    }


}

draw_form_elements = function(){
    $('#form_elements').addClass('w400 h800').find('.editor_popup_body').text('').append(
        $('<div/>',{class:'inter fs1 bold',text:texts.website_style.form_elements}),
        $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_style.form_elements_des}),
        $('<div/>',{class:'w100p mB40'}).append(
            $('<div/>',{class:'page_setup_row'}).append(

            )
        ),
    )
}
