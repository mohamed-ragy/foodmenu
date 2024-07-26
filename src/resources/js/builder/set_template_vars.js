set_template_vars = function(){
    set_website_colors_vars();
    // set_font_style_vars();
    set_page_setup_vars();
    // set_form_elements_vars();
    // set_loading_spinner_vars();
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

set_font_style_vars = function(){
    return;
    $(':root').css('--font_1_name',`'${window.template.font_style.font_1.name}', '${window.template.font_style.google_font.name}', sans-serif`);
    $(':root').css('--font_1_line_height',window.template.font_style.font_1.line_height);
    $(':root').css('--font_1_letter_spacing',window.template.font_style.font_1.letter_spacing);

    $(':root').css('--font_2_name',`'${window.template.font_style.font_2.name}', '${window.template.font_style.google_font.name}', sans-serif`);
    $(':root').css('--font_2_line_height',window.template.font_style.font_2.line_height);
    $(':root').css('--font_2_letter_spacing',window.template.font_style.font_2.letter_spacing);

    $(':root').css('--font_3_name',`'${window.template.font_style.font_3.name}', '${window.template.font_style.google_font.name}', sans-serif`);
    $(':root').css('--font_3_line_height',window.template.font_style.font_3.line_height);
    $(':root').css('--font_3_letter_spacing',window.template.font_style.font_3.letter_spacing);


}
set_page_setup_vars = function(){
    $(':root').css('--screen_height',`calc(${$('#website').height()}px)`)
    $(':root').css('--screen_height_minus_header',`calc(${$('#website').height()}px - ${$('.website_header').outerHeight()}px)`)

    $(':root').css('--adapted_header_font_color',window.template.website_header.adapted_font_color);
    $(':root').css('--page_max_width',window.template.page_setup.max_width);
    //
    $(':root').css('--page_transition',window.template.page_setup.pageTransition);
    $(':root').css('--page_transitionDuration',window.template.page_setup.transitionDuration);
}
set_form_elements_vars = function(){
    return;
    $(':root').css('--form_elem_spacing',window.template.form_elements.spacing);
    //
    for(const key in window.template.form_elements.elems){
        let elem = window.template.form_elements.elems[key];
        if('font_style' in elem){
            $(':root').css(`--${elem.class_selector}-font_name`,`var(--${elem.font_style}_name)`)
            $(':root').css(`--${elem.class_selector}-font_line_height`,`var(--${elem.font_style}_line_height)`)
            $(':root').css(`--${elem.class_selector}-font_letter_spacing`,`var(--${elem.font_style}_letter_spacing)`)
        }
        for(const key2 in elem.css){
            $(':root').css(`--${elem.class_selector}-${key2}`,elem.css[key2])
        }
        for(const key2 in elem.css_hover){
            $(':root').css(`--${elem.class_selector}-hover-${key2}`,elem.css_hover[key2])
        }
        for(const key2 in elem.css_active){
            $(':root').css(`--${elem.class_selector}-active-${key2}`,elem.css_active[key2])
        }
        for(const key2 in elem.css_disabled){
            $(':root').css(`--${elem.class_selector}-disabled-${key2}`,elem.css_disabled[key2])
        }
        for(const key2 in elem.css_focus){
            $(':root').css(`--${elem.class_selector}-focus-${key2}`,elem.css_focus[key2])
        }
        for(const key2 in elem['css_read-only']){
            $(':root').css(`--${elem.class_selector}-read-only-${key2}`,elem['css_read-only'][key2])
        }
    }
}
set_loading_spinner_vars = function(){
    return;
    $(':root').css(`--loading_spinner_c1`,window.template.loading_spinner.colors.loading_spinner_c1 ?? 'rgba(200,200,200,1)');
    $(':root').css(`--loading_spinner_c2`,window.template.loading_spinner.colors.loading_spinner_c2 ?? 'rgba(170,170,170,1)');
    $(':root').css(`--loading_spinner_c3`,window.template.loading_spinner.colors.loading_spinner_c3 ?? 'rgba(140,140,140,1)');
    $(':root').css(`--loading_spinner_c4`,window.template.loading_spinner.colors.loading_spinner_c4 ?? 'rgba(110,110,110,1)');
    $(':root').css(`--loading_spinner_c5`,window.template.loading_spinner.colors.loading_spinner_c5 ?? 'rgba(80,80,80,1)');
}
