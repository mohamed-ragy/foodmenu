set_template_vars = function(){
    set_website_colors_vars();
    set_page_setup_vars();
    set_website_default_classes();

}
set_website_default_classes = function(){
    $('.website_logo').attr('src',window.website_data.logo)
    $('.restaurant_name').text(window.website_data.websiteNames[window.preview_language])
}
set_website_colors_vars  = function(){
    for(const key in window.template.website_colors.colors){
        let color = window.template.website_colors.colors[key];
        $(':root').css(`--${key}`,`${color.r},${color.g},${color.b}`)
    }
    for(const key in window.template.website_colors.custom_colors){
        let color = window.template.website_colors.custom_colors[key];
        $(':root').css(`--${key}`,`${color.r},${color.g},${color.b}`)
    }
}

set_page_setup_vars = function(){

    $(':root').css('--screen_height_minus_header',`${$('#website').height() - $('.website_header').height()}px`)
    $(':root').css('--screen_height',`${$('#website').height()}px`)

    $(':root').css('--page_max_width',window.template.page_setup.max_width);
    //
    $(':root').css('--page_transition',window.template.page_setup.pageTransition);
    $(':root').css('--page_transitionDuration',window.template.page_setup.transitionDuration);
    $(':root').css('--page_font_style',window.template.page_setup.font_style[window.preview_language]);


    $('.website_body').css({
        'font-family':window.template.page_setup.font_style[window.preview_language],
        'background-color':window.template.page_setup.bg_color,
        'color':window.template.page_setup.font_color,
        'font-size':window.template.page_setup.font_size,
        'line-height':window.template.page_setup.line_height,
        'letter-spacing':window.template.page_setup.letter_spacing,
    })
    for(const key in window.template.page_setup.font_style){
        let font_name = window.template.page_setup.font_style[key];
        if(font_name != '' && !window.loaded_fonts.includes(font_name)){
            load_font_style(font_name)
        }
    }
}

