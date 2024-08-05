set_template_vars = function(){
    set_website_colors_vars();
    set_page_setup_vars();
    // set_loading_spinner_vars();

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
    $(':root').css('--screen_height',`calc(${$('#website').height()}px)`)
    $(':root').css('--screen_height_minus_header',`calc(${$('#website').height()}px - ${$('.website_header').outerHeight()}px)`)

    $(':root').css('--page_max_width',window.template.page_setup.max_width);
    //
    $(':root').css('--page_transition',window.template.page_setup.pageTransition);
    $(':root').css('--page_transitionDuration',window.template.page_setup.transitionDuration);

    $('#website').css({
        'font-family':window.template.page_setup.font_style[window.preview_language],
        'background-color':window.template.page_setup.bg_color,
        'color':window.template.page_setup.font_color,
    })
}

set_loading_spinner_vars = function(){
    return;
    $(':root').css(`--loading_spinner_c1`,window.template.loading_spinner.colors.loading_spinner_c1 ?? 'rgba(200,200,200,1)');
    $(':root').css(`--loading_spinner_c2`,window.template.loading_spinner.colors.loading_spinner_c2 ?? 'rgba(170,170,170,1)');
    $(':root').css(`--loading_spinner_c3`,window.template.loading_spinner.colors.loading_spinner_c3 ?? 'rgba(140,140,140,1)');
    $(':root').css(`--loading_spinner_c4`,window.template.loading_spinner.colors.loading_spinner_c4 ?? 'rgba(110,110,110,1)');
    $(':root').css(`--loading_spinner_c5`,window.template.loading_spinner.colors.loading_spinner_c5 ?? 'rgba(80,80,80,1)');
}
