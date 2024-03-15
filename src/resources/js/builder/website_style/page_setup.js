set_page_setup_vars = function(){
    $(':root').css('--page_max_width',window.template.page_setup.max_width);
    $(':root').css('--page_margin',window.template.page_setup.page_margin);

    $(':root').css('--page_transitionDuration',window.template.page_setup.transitionDuration);

    let body_color_theme_bg = window.template.website_colors[`c${window.template.page_setup.color_theme.split('_')[1]}`]
    let body_color_theme_txt = window.template.website_colors[`c${window.template.page_setup.color_theme.split('_')[2]}`]
    $(':root').css('--body_color_theme_bg',`rgb(${body_color_theme_bg.r},${body_color_theme_bg.g},${body_color_theme_bg.b})`);
    $(':root').css('--body_color_theme_txt',`rgb(${body_color_theme_txt.r},${body_color_theme_txt.g},${body_color_theme_txt.b})`);

    $('.page_max_width_select').removeClass('select_box_selected')
    $(`.page_max_width_select[key="${window.template.page_setup.max_width}"]`).addClass('select_box_selected')

    $('.page_margin_select').removeClass('select_box_selected')
    $(`.page_margin_select[key="${window.template.page_setup.page_margin}"]`).addClass('select_box_selected')

    $('.page_transitionDuration_select').removeClass('select_box_selected')
    $(`.page_transitionDuration_select[key="${window.template.page_setup.transitionDuration}"]`).addClass('select_box_selected')
}

draw_page_setup = function(){
    $('#page_setup').addClass('w500 h400').find('.editor_popup_body').text('').append(
        $('<div/>',{class:'inter fs1 bold',text:texts.website_style.page_setup}),
        $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_style.page_setup_des}),
        $('<div/>',{class:'w100p mB40'}).append(
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.max_width}),
                $('<div/>',{class:'mis-10 select_box_container',key_tree:'page_setup',key:'max_width'}).append(
                    $('<div/>',{class:`pY5 w30 page_max_width_select select_box`,text:'XXS',key:'800px'}),
                    $('<div/>',{class:`pY5 w25 page_max_width_select select_box`,text:'XS',key:'1000px'}),
                    $('<div/>',{class:`pY5 w25 page_max_width_select select_box`,text:'S',key:'1200px'}),
                    $('<div/>',{class:`pY5 w25 page_max_width_select select_box`,text:'M',key:'1400px'}),
                    $('<div/>',{class:`pY5 w25 page_max_width_select select_box`,text:'L',key:'1600px'}),
                    $('<div/>',{class:`pY5 w25 page_max_width_select select_box`,text:'XL',key:'1800px'}),
                    $('<div/>',{class:`pY5 w30 page_max_width_select select_box`,text:'XXL',key:'2000px'}),
                    $('<div/>',{class:`pY5 w35 page_max_width_select select_box`,text:'MAX',key:'5000px'}),
                )
            ),
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.page_margin}),
                $('<div/>',{class:'mis-10 select_box_container',key_tree:'page_setup',key:'page_margin'}).append(
                    $('<div/>',{class:`pY5 w25 page_margin_select select_box`,text:'0',key:'0vw'}),
                    $('<div/>',{class:`pY5 w25 page_margin_select select_box`,text:'S',key:'1vw'}),
                    $('<div/>',{class:`pY5 w25 page_margin_select select_box`,text:'M',key:'2vw'}),
                    $('<div/>',{class:`pY5 w25 page_margin_select select_box`,text:'L',key:'4vw'}),
                )
            ),
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.color_theme}),
                draw_color_theme_Picker('page_setup_theme_color_picker','page_setup','color_theme')
            ),
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.pageTransition}),

            ),
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.transitionDuration}),
                $('<div/>',{class:'mis-10 select_box_container',key_tree:'page_setup',key:'transitionDuration'}).append(
                    $('<div/>',{class:`pY5 pX5 page_transitionDuration_select select_box`,text:'Slower',key:'1000ms'}),
                    $('<div/>',{class:`pY5 pX5 page_transitionDuration_select select_box`,text:'Slow',key:'500ms'}),
                    $('<div/>',{class:`pY5 pX5 page_transitionDuration_select select_box`,text:'Fast',key:'300ms'}),
                    $('<div/>',{class:`pY5 pX5 page_transitionDuration_select select_box`,text:'Faster',key:'100ms'}),
                )
            )
        )
    )
}
