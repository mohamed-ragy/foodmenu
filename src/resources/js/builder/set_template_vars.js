set_template_vars = function(){
    set_website_colors_vars();
    set_font_style_vars();
    set_page_setup_vars();
    set_form_elements_vars();
    set_loading_spinner_vars();
}
set_website_colors_vars  = function(){
    let swatches = [
        window.template.website_colors.color_theme.color_1,
        window.template.website_colors.color_theme.color_2,
        window.template.website_colors.color_theme.color_3,
        window.template.website_colors.color_theme.color_4,
    ];
    for(const key in window.template.website_colors.color_history){
        swatches.push(window.template.website_colors.color_history[key]);
    }
    Coloris.setInstance('.color_picker',{
        swatches: swatches,
    })
    $(':root').css('--metrics_color',window.template.settings.metrics_color);
    for(const key in window.template.website_colors){
        for(const key2 in window.template.website_colors[key]){
            $(':root').css(`--${key2}`,window.template.website_colors[key][key2])
        }
    }

    $(':root').css('--color_theme_1_bg',window.template.website_colors.color_theme.color_1);
    $(':root').css('--color_theme_1_txt',window.template.website_colors.color_theme.color_2);
    $(':root').css('--color_theme_2_bg',window.template.website_colors.color_theme.color_1);
    $(':root').css('--color_theme_2_txt',window.template.website_colors.color_theme.color_3);
    $(':root').css('--color_theme_3_bg',window.template.website_colors.color_theme.color_1);
    $(':root').css('--color_theme_3_txt',window.template.website_colors.color_theme.color_4);
    $(':root').css('--color_theme_4_bg',window.template.website_colors.color_theme.color_2);
    $(':root').css('--color_theme_4_txt',window.template.website_colors.color_theme.color_1);
    $(':root').css('--color_theme_5_bg',window.template.website_colors.color_theme.color_2);
    $(':root').css('--color_theme_5_txt',window.template.website_colors.color_theme.color_3);
    $(':root').css('--color_theme_6_bg',window.template.website_colors.color_theme.color_2);
    $(':root').css('--color_theme_6_txt',window.template.website_colors.color_theme.color_4);
    $(':root').css('--color_theme_7_bg',window.template.website_colors.color_theme.color_3);
    $(':root').css('--color_theme_7_txt',window.template.website_colors.color_theme.color_1);
    $(':root').css('--color_theme_8_bg',window.template.website_colors.color_theme.color_3);
    $(':root').css('--color_theme_8_txt',window.template.website_colors.color_theme.color_2);
    $(':root').css('--color_theme_9_bg',window.template.website_colors.color_theme.color_3);
    $(':root').css('--color_theme_9_txt',window.template.website_colors.color_theme.color_4);
    $(':root').css('--color_theme_10_bg',window.template.website_colors.color_theme.color_4);
    $(':root').css('--color_theme_10_txt',window.template.website_colors.color_theme.color_1);
    $(':root').css('--color_theme_11_bg',window.template.website_colors.color_theme.color_4);
    $(':root').css('--color_theme_11_txt',window.template.website_colors.color_theme.color_2);
    $(':root').css('--color_theme_12_bg',window.template.website_colors.color_theme.color_4);
    $(':root').css('--color_theme_12_txt',window.template.website_colors.color_theme.color_3);
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
    $(':root').css('--body_color_theme_bg',`var(--${window.template.page_setup.page_color_theme}_bg)`);
    $(':root').css('--body_color_theme_txt',`var(--${window.template.page_setup.page_color_theme}_txt)`);
    //
    $(':root').css('--page_transition',window.template.page_setup.pageTransition);
    $(':root').css('--page_transitionDuration',window.template.page_setup.transitionDuration);
}
set_form_elements_vars = function(){
    $(':root').css('--form_align',window.template.form_elements.form_align);
    $(':root').css('--form_elem_spacing',window.template.form_elements.spacing);
    //
    $(':root').css('--input_text_align',window.template.form_elements.input.input_text_align);
    $(':root').css('--input_padding_y',window.template.form_elements.input.input_padding_y);
    $(':root').css('--input_padding_x',window.template.form_elements.input.input_padding_x);
    $(':root').css('--input_border_style',window.template.form_elements.input.input_border_style);
    $(':root').css('--input_border_width',window.template.form_elements.input.input_border_width);
    $(':root').css('--input_border_radius',window.template.form_elements.input.input_border_radius);
    $(':root').css('--input_border_color', window.template.form_elements.input.input_border_color);
    $(':root').css('--input_font_size',window.template.form_elements.input.input_font_size);
    $(':root').css('--input_font_color', window.template.form_elements.input.input_font_color);
    $(':root').css('--input_label_font_size',window.template.form_elements.input.input_label_font_size);
    $(':root').css('--input_label_margin',window.template.form_elements.input.input_label_margin);
    $(':root').css('--input_bg_color',window.template.form_elements.input.input_bg_color);

    $(':root').css('--input_focus_outline_width',`${window.template.form_elements.input.input_focus_outline_width}`);
    $(':root').css('--input_focus_outline_color',`${window.template.form_elements.input.input_focus_outline_color}`);
    $(':root').css('--input_focus_bg_color',`${window.template.form_elements.input.input_focus_bg_color}`);

    //
    $(':root').css('--checkbox_border_radius',window.template.form_elements.checkbox.checkbox_border_radius)
    $(':root').css('--checkbox_size',window.template.form_elements.checkbox.checkbox_size)
    $(':root').css('--checkbox_color',window.template.form_elements.checkbox.checkbox_color)
    $(':root').css('--checkbox_checkMark_color',window.template.form_elements.checkbox.checkbox_checkMark_color)
    //
    $(':root').css('--button1_padding_y',window.template.form_elements.button1.button1_padding_y)
    $(':root').css('--button1_padding_x',window.template.form_elements.button1.button1_padding_x)
    $(':root').css('--button1_border_radius',window.template.form_elements.button1.button1_border_radius)
    $(':root').css('--button1_font_size',window.template.form_elements.button1.button1_font_size)
    $(':root').css('--button1_font_color',window.template.form_elements.button1.button1_font_color)
    $(':root').css('--button1_bg_color',window.template.form_elements.button1.button1_bg_color)
    $(':root').css('--button1_outline_color',window.template.form_elements.button1.button1_outline_color)
    $(':root').css('--button1_outline_width',window.template.form_elements.button1.button1_outline_width)
    $(':root').css('--button1_hover_font_color',window.template.form_elements.button1.button1_hover_font_color)
    $(':root').css('--button1_hover_bg_color',window.template.form_elements.button1.button1_hover_bg_color)
    $(':root').css('--button1_hover_outline_color',window.template.form_elements.button1.button1_hover_outline_color)
    $(':root').css('--button1_hover_outline_width',window.template.form_elements.button1.button1_hover_outline_width)
    $(':root').css('--button1_click_font_color',window.template.form_elements.button1.button1_click_font_color)
    $(':root').css('--button1_click_bg_color',window.template.form_elements.button1.button1_click_bg_color)
    $(':root').css('--button1_click_outline_color',window.template.form_elements.button1.button1_click_outline_color)
    $(':root').css('--button1_click_outline_width',window.template.form_elements.button1.button1_click_outline_width)
    $(':root').css('--button1_disabled_font_color',window.template.form_elements.button1.button1_disabled_font_color)
    $(':root').css('--button1_disabled_bg_color',window.template.form_elements.button1.button1_disabled_bg_color)
    $(':root').css('--button1_disabled_outline_color',window.template.form_elements.button1.button1_disabled_outline_color)
    $(':root').css('--button1_disabled_outline_width',window.template.form_elements.button1.button1_disabled_outline_width)
    //
    $(':root').css('--button2_padding_y',window.template.form_elements.button2.button2_padding_y)
    $(':root').css('--button2_padding_x',window.template.form_elements.button2.button2_padding_x)
    $(':root').css('--button2_border_radius',window.template.form_elements.button2.button2_border_radius)
    $(':root').css('--button2_font_size',window.template.form_elements.button2.button2_font_size)
    $(':root').css('--button2_font_color',window.template.form_elements.button2.button2_font_color)
    $(':root').css('--button2_bg_color',window.template.form_elements.button2.button2_bg_color)
    $(':root').css('--button2_outline_color',window.template.form_elements.button2.button2_outline_color)
    $(':root').css('--button2_outline_width',window.template.form_elements.button2.button2_outline_width)
    $(':root').css('--button2_hover_font_color',window.template.form_elements.button2.button2_hover_font_color)
    $(':root').css('--button2_hover_bg_color',window.template.form_elements.button2.button2_hover_bg_color)
    $(':root').css('--button2_hover_outline_color',window.template.form_elements.button2.button2_hover_outline_color)
    $(':root').css('--button2_hover_outline_width',window.template.form_elements.button2.button2_hover_outline_width)
    $(':root').css('--button2_click_font_color',window.template.form_elements.button2.button2_click_font_color)
    $(':root').css('--button2_click_bg_color',window.template.form_elements.button2.button2_click_bg_color)
    $(':root').css('--button2_click_outline_color',window.template.form_elements.button2.button2_click_outline_color)
    $(':root').css('--button2_click_outline_width',window.template.form_elements.button2.button2_click_outline_width)
    $(':root').css('--button2_disabled_font_color',window.template.form_elements.button2.button2_disabled_font_color)
    $(':root').css('--button2_disabled_bg_color',window.template.form_elements.button2.button2_disabled_bg_color)
    $(':root').css('--button2_disabled_outline_color',window.template.form_elements.button2.button2_disabled_outline_color)
    $(':root').css('--button2_disabled_outline_width',window.template.form_elements.button2.button2_disabled_outline_width)
    //
}
set_loading_spinner_vars = function(){
    $(':root').css('--loading_spinner_c1',window.template.loading_spinner.colors.loading_spinner_c1);
    $(':root').css('--loading_spinner_c2',window.template.loading_spinner.colors.loading_spinner_c2);
}
