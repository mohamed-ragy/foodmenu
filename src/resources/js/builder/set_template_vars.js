set_template_vars = function(){
    set_website_colors_vars();
    set_font_style_vars();
    set_page_setup_vars();
    set_form_elements_vars();
}
set_website_colors_vars  = function(){
    $(':root').css('--metrics_color',`rgb(${window.template.settings.metrics_color.r},${window.template.settings.metrics_color.g},${window.template.settings.metrics_color.b})`);
    $(':root').css('--color_1',`rgb(${window.template.website_colors.c1.r},${window.template.website_colors.c1.g},${window.template.website_colors.c1.b})`);
    $(':root').css('--color_2',`rgb(${window.template.website_colors.c2.r},${window.template.website_colors.c2.g},${window.template.website_colors.c2.b})`);
    $(':root').css('--color_3',`rgb(${window.template.website_colors.c3.r},${window.template.website_colors.c3.g},${window.template.website_colors.c3.b})`);
    $(':root').css('--color_4',`rgb(${window.template.website_colors.c4.r},${window.template.website_colors.c4.g},${window.template.website_colors.c4.b})`);

    $(':root').css('--color_star',`rgb(${window.template.website_colors.c_star.r},${window.template.website_colors.c_star.g},${window.template.website_colors.c_star.b})`);
    $(':root').css('--color_error',`rgb(${window.template.website_colors.c_error.r},${window.template.website_colors.c_error.g},${window.template.website_colors.c_error.b})`);
    $(':root').css('--color_success',`rgb(${window.template.website_colors.c_success.r},${window.template.website_colors.c_success.g},${window.template.website_colors.c_success.b})`);
    $(':root').css('--color_warning',`rgb(${window.template.website_colors.c_warning.r},${window.template.website_colors.c_warning.g},${window.template.website_colors.c_warning.b})`);
}
set_font_style_vars = function(){
    $(':root').css('--font_t',`'${window.template.font_style.title}', cairo, sans-serif`);
    $(':root').css('--font_t_fw',window.template.font_style.title_weight);
    $(':root').css('--font_t_lh',window.template.font_style.title_line_height);
    $(':root').css('--font_t_ls',window.template.font_style.title_letter_spacing);
    $(':root').css('--font_p',`'${window.template.font_style.paragraph}', Tajawal, sans-serif`);
    $(':root').css('--font_p_fw',window.template.font_style.paragraph_weight);
    $(':root').css('--font_p_lh',window.template.font_style.paragraph_line_height);
    $(':root').css('--font_p_ls',window.template.font_style.paragraph_letter_spacing);

}
set_page_setup_vars = function(){
    $(':root').css('--screen_height',`${$('#page').outerHeight()}px`)
    $(':root').css('--page_max_width',window.template.page_setup.max_width);
    $(':root').css('--page_margin',window.template.page_setup.page_margin);
    //
    let body_color_theme_bg = window.template.website_colors[`c${window.template.page_setup.page_color_theme.split('_')[1]}`]
    let body_color_theme_txt = window.template.website_colors[`c${window.template.page_setup.page_color_theme.split('_')[2]}`]
    $(':root').css('--body_color_theme_bg',`rgb(${body_color_theme_bg.r},${body_color_theme_bg.g},${body_color_theme_bg.b})`);
    $(':root').css('--body_color_theme_txt',`rgb(${body_color_theme_txt.r},${body_color_theme_txt.g},${body_color_theme_txt.b})`);
    //
    $(':root').css('--page_transition',window.template.page_setup.pageTransition);
    $(':root').css('--page_transitionDuration',window.template.page_setup.transitionDuration);
}
set_form_elements_vars = function(){
    $(':root').css('--form_align',window.template.form_elements.form_align);
    $(':root').css('--form_elem_spacing',window.template.form_elements.spacing);
    //
    $(':root').css('--input_text_align',window.template.form_elements.input.text_align);
    $(':root').css('--input_padding_y',window.template.form_elements.input.padding_y);
    $(':root').css('--input_padding_x',window.template.form_elements.input.padding_x);
    $(':root').css('--input_border_style',window.template.form_elements.input.border_style);
    $(':root').css('--input_border_width',window.template.form_elements.input.border_width);
    $(':root').css('--input_border_radius',window.template.form_elements.input.border_radius);
    $(':root').css('--input_border_color', `rgb(${window.template.form_elements.input.border_color.r},${window.template.form_elements.input.border_color.g},${window.template.form_elements.input.border_color.b})`);
    $(':root').css('--input_font_size',window.template.form_elements.input.font_size);
    $(':root').css('--input_font_color', `rgb(${window.template.form_elements.input.font_color.r},${window.template.form_elements.input.font_color.g},${window.template.form_elements.input.font_color.b})`);
    $(':root').css('--input_label_font_size',window.template.form_elements.input.label_font_size);
    $(':root').css('--input_label_margin',window.template.form_elements.input.label_margin);
    if(window.template.form_elements.input.background_fill == '1'){
        $(':root').css('--input_bg_color', `rgb(${window.template.form_elements.input.input_bg_color.r},${window.template.form_elements.input.input_bg_color.g},${window.template.form_elements.input.input_bg_color.b})`);
    }else{
        $(':root').css('--input_bg_color', `transparent`);
    }
    $(':root').css('--input_focus_outline_width',`${window.template.form_elements.input.focus_outline_width}`);
    $(':root').css('--input_focus_outline_color',`rgb(${window.template.form_elements.input.focus_outline_color.r},${window.template.form_elements.input.focus_outline_color.g},${window.template.form_elements.input.focus_outline_color.b})`);
    if(window.template.form_elements.input.focus_background_fill == '1'){
        $(':root').css('--input_focus_bg_color', `rgb(${window.template.form_elements.input.focus_bg_color.r},${window.template.form_elements.input.focus_bg_color.g},${window.template.form_elements.input.focus_bg_color.b})`);
    }else{
        $(':root').css('--input_focus_bg_color', `var(--input_bg_color)`);
    }
    //
    $(':root').css('--checkbox_border_radius',window.template.form_elements.checkbox.border_radius)
    $(':root').css('--checkbox_size',window.template.form_elements.checkbox.size)
    $(':root').css('--checkbox_color',`rgb(${window.template.form_elements.checkbox.color.r},${window.template.form_elements.checkbox.color.g},${window.template.form_elements.checkbox.color.b})`)
    $(':root').css('--checkbox_checkMark_color',`rgb(${window.template.form_elements.checkbox.check_mark_color.r},${window.template.form_elements.checkbox.check_mark_color.g},${window.template.form_elements.checkbox.check_mark_color.b})`)
    //
    $(':root').css('--button1_padding_y',window.template.form_elements.button1.padding_y)
    $(':root').css('--button1_padding_x',window.template.form_elements.button1.padding_x)
    $(':root').css('--button1_border_radius',window.template.form_elements.button1.border_radius)
    $(':root').css('--button1_font_size',window.template.form_elements.button1.font_size)
    $(':root').css('--button1_font_color',`rgb(${window.template.form_elements.button1.font_color.r},${window.template.form_elements.button1.font_color.g},${window.template.form_elements.button1.font_color.b})`)
    $(':root').css('--button1_bg_color',`rgb(${window.template.form_elements.button1.bg_color.r},${window.template.form_elements.button1.bg_color.g},${window.template.form_elements.button1.bg_color.b})`)
    $(':root').css('--button1_outline_color',`rgb(${window.template.form_elements.button1.outline_color.r},${window.template.form_elements.button1.outline_color.g},${window.template.form_elements.button1.outline_color.b})`)
    $(':root').css('--button1_outline_width',window.template.form_elements.button1.outline_width)

    $(':root').css('--button1_hover_font_color',`rgb(${window.template.form_elements.button1.hover_font_color.r},${window.template.form_elements.button1.hover_font_color.g},${window.template.form_elements.button1.hover_font_color.b})`)
    $(':root').css('--button1_hover_bg_color',`rgb(${window.template.form_elements.button1.hover_bg_color.r},${window.template.form_elements.button1.hover_bg_color.g},${window.template.form_elements.button1.hover_bg_color.b})`)
    $(':root').css('--button1_hover_outline_color',`rgb(${window.template.form_elements.button1.hover_outline_color.r},${window.template.form_elements.button1.hover_outline_color.g},${window.template.form_elements.button1.hover_outline_color.b})`)
    $(':root').css('--button1_hover_outline_width',window.template.form_elements.button1.hover_outline_width)

    $(':root').css('--button1_click_font_color',`rgb(${window.template.form_elements.button1.click_font_color.r},${window.template.form_elements.button1.click_font_color.g},${window.template.form_elements.button1.click_font_color.b})`)
    $(':root').css('--button1_click_bg_color',`rgb(${window.template.form_elements.button1.click_bg_color.r},${window.template.form_elements.button1.click_bg_color.g},${window.template.form_elements.button1.click_bg_color.b})`)
    $(':root').css('--button1_click_outline_color',`rgb(${window.template.form_elements.button1.click_outline_color.r},${window.template.form_elements.button1.click_outline_color.g},${window.template.form_elements.button1.click_outline_color.b})`)
    $(':root').css('--button1_click_outline_width',window.template.form_elements.button1.click_outline_width)

    $(':root').css('--button1_disabled_font_color',`rgb(${window.template.form_elements.button1.disabled_font_color.r},${window.template.form_elements.button1.disabled_font_color.g},${window.template.form_elements.button1.disabled_font_color.b})`)
    $(':root').css('--button1_disabled_bg_color',`rgb(${window.template.form_elements.button1.disabled_bg_color.r},${window.template.form_elements.button1.disabled_bg_color.g},${window.template.form_elements.button1.disabled_bg_color.b})`)
    $(':root').css('--button1_disabled_outline_color',`rgb(${window.template.form_elements.button1.disabled_outline_color.r},${window.template.form_elements.button1.disabled_outline_color.g},${window.template.form_elements.button1.disabled_outline_color.b})`)
    $(':root').css('--button1_disabled_outline_width',window.template.form_elements.button1.disabled_outline_width)
    //
    $(':root').css('--button2_padding_y',window.template.form_elements.button2.padding_y)
    $(':root').css('--button2_padding_x',window.template.form_elements.button2.padding_x)
    $(':root').css('--button2_border_radius',window.template.form_elements.button2.border_radius)
    $(':root').css('--button2_font_size',window.template.form_elements.button2.font_size)
    $(':root').css('--button2_font_color',`rgb(${window.template.form_elements.button2.font_color.r},${window.template.form_elements.button2.font_color.g},${window.template.form_elements.button2.font_color.b})`)
    $(':root').css('--button2_bg_color',`rgb(${window.template.form_elements.button2.bg_color.r},${window.template.form_elements.button2.bg_color.g},${window.template.form_elements.button2.bg_color.b})`)
    $(':root').css('--button2_outline_color',`rgb(${window.template.form_elements.button2.outline_color.r},${window.template.form_elements.button2.outline_color.g},${window.template.form_elements.button2.outline_color.b})`)
    $(':root').css('--button2_outline_width',window.template.form_elements.button2.outline_width)
    $(':root').css('--button2_hover_font_color',`rgb(${window.template.form_elements.button2.hover_font_color.r},${window.template.form_elements.button2.hover_font_color.g},${window.template.form_elements.button2.hover_font_color.b})`)
    $(':root').css('--button2_hover_bg_color',`rgb(${window.template.form_elements.button2.hover_bg_color.r},${window.template.form_elements.button2.hover_bg_color.g},${window.template.form_elements.button2.hover_bg_color.b})`)
    $(':root').css('--button2_hover_outline_color',`rgb(${window.template.form_elements.button2.hover_outline_color.r},${window.template.form_elements.button2.hover_outline_color.g},${window.template.form_elements.button2.hover_outline_color.b})`)
    $(':root').css('--button2_hover_outline_width',window.template.form_elements.button2.hover_outline_width)
    $(':root').css('--button2_click_font_color',`rgb(${window.template.form_elements.button2.click_font_color.r},${window.template.form_elements.button2.click_font_color.g},${window.template.form_elements.button2.click_font_color.b})`)
    $(':root').css('--button2_click_bg_color',`rgb(${window.template.form_elements.button2.click_bg_color.r},${window.template.form_elements.button2.click_bg_color.g},${window.template.form_elements.button2.click_bg_color.b})`)
    $(':root').css('--button2_click_outline_width',window.template.form_elements.button2.click_outline_width)
    $(':root').css('--button2_click_outline_color',`rgb(${window.template.form_elements.button2.click_outline_color.r},${window.template.form_elements.button2.click_outline_color.g},${window.template.form_elements.button2.click_outline_color.b})`)
    $(':root').css('--button2_disabled_font_color',`rgb(${window.template.form_elements.button2.disabled_font_color.r},${window.template.form_elements.button2.disabled_font_color.g},${window.template.form_elements.button2.disabled_font_color.b})`)
    $(':root').css('--button2_disabled_bg_color',`rgb(${window.template.form_elements.button2.disabled_bg_color.r},${window.template.form_elements.button2.disabled_bg_color.g},${window.template.form_elements.button2.disabled_bg_color.b})`)
    $(':root').css('--button2_disabled_outline_width',window.template.form_elements.button2.disabled_outline_width)
    $(':root').css('--button2_disabled_outline_color',`rgb(${window.template.form_elements.button2.disabled_outline_color.r},${window.template.form_elements.button2.disabled_outline_color.g},${window.template.form_elements.button2.disabled_outline_color.b})`)
    //
}
set_loading_spinner_vars = function(){
    $(':root').css('--loading_spinner_c1',`rgb(${window.template.loading_spinner.colors.loading_spinner_c1.r},${window.template.loading_spinner.colors.loading_spinner_c1.g},${window.template.loading_spinner.colors.loading_spinner_c1.b})`);
    $(':root').css('--loading_spinner_c2',`rgb(${window.template.loading_spinner.colors.loading_spinner_c2.r},${window.template.loading_spinner.colors.loading_spinner_c2.g},${window.template.loading_spinner.colors.loading_spinner_c2.b})`);
}
