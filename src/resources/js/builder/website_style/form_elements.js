set_form_elements_vars = function(){
    $(':root').css('--form_elem_spacing',window.template.form_elements.spacing);
    $('.form_spacing_select').removeClass('select_box_selected')
    $(`.form_spacing_select[key="${window.template.form_elements.spacing}"]`).addClass('select_box_selected')
    //
    $(':root').css('--input_padding_y',window.template.form_elements.input.padding_y);
    $('.input_paddingY_select').removeClass('select_box_selected')
    $(`.input_paddingY_select[key="${window.template.form_elements.input.padding_y}"]`).addClass('select_box_selected')
    //
    $(':root').css('--input_padding_x',window.template.form_elements.input.padding_x);
    $('.input_paddingX_select').removeClass('select_box_selected')
    $(`.input_paddingX_select[key="${window.template.form_elements.input.padding_x}"]`).addClass('select_box_selected')
    //
    $(':root').css('--input_border_style',window.template.form_elements.input.border_style);
    let border_style = window.template.form_elements.input.border_style.split(' ');
    border_style[0] == 'solid' ? $('.input_border_style_select.ico-border_top').addClass('select_box_selected') : border_style[0] == 'none' ?  $('.input_border_style_select.ico-border_top').removeClass('select_box_selected') : null;
    border_style[1] == 'solid' ? $('.input_border_style_select.ico-border_right').addClass('select_box_selected') : border_style[1] == 'none' ?  $('.input_border_style_select.ico-border_right').removeClass('select_box_selected') : null;
    border_style[2] == 'solid' ? $('.input_border_style_select.ico-border_bottom').addClass('select_box_selected') : border_style[2] == 'none' ?  $('.input_border_style_select.ico-border_bottom').removeClass('select_box_selected') : null;
    border_style[3] == 'solid' ? $('.input_border_style_select.ico-border_left').addClass('select_box_selected') : border_style[3] == 'none' ?  $('.input_border_style_select.ico-border_left').removeClass('select_box_selected') : null;
    //
    $(':root').css('--input_border_width',window.template.form_elements.input.border_width);
    $('.input_border_width_select').removeClass('select_box_selected')
    $(`.input_border_width_select[key="${window.template.form_elements.input.border_width}"]`).addClass('select_box_selected')
    //
    $(':root').css('--input_border_radius',window.template.form_elements.input.border_radius);
    $(':root').css('--input_border_color', `rgb(${window.template.form_elements.input.border_color.r},${window.template.form_elements.input.border_color.g},${window.template.form_elements.input.border_color.b})`);
    $(':root').css('--input_focus_outline_width',`${window.template.form_elements.input.focus_outline_width}`);

    $(':root').css('--input_font_size',window.template.form_elements.input.font_size);
    $(':root').css('--input_font_color', `rgb(${window.template.form_elements.input.font_color.r},${window.template.form_elements.input.font_color.g},${window.template.form_elements.input.font_color.b})`);
    $(':root').css('--input_label_font_size',window.template.form_elements.input.label_font_size);

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
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.form_spacing}),
                $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements',key:'spacing'}).append(
                    $('<div/>',{class:`pY5 w25 form_spacing_select select_box ico-no`,key:'0px'}),
                    $('<div/>',{class:`pY5 w25 form_spacing_select select_box`,text:'S',key:'5px'}),
                    $('<div/>',{class:`pY5 w25 form_spacing_select select_box`,text:'M',key:'10px'}),
                    $('<div/>',{class:`pY5 w25 form_spacing_select select_box`,text:'L',key:'15px'}),
                    $('<div/>',{class:`pY5 w25 form_spacing_select select_box`,text:'XL',key:'20px'}),
                )
            ),
            $('<div/>',{class:'mT20 fs1 bold',text:texts.website_style.input_box}),
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.padding_y}),
                $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.input',key:'padding_y'}).append(
                    $('<div/>',{class:`pY5 w25 input_paddingY_select select_box ico-no`,key:'0px'}),
                    $('<div/>',{class:`pY5 w25 input_paddingY_select select_box`,text:'S',key:'3px'}),
                    $('<div/>',{class:`pY5 w25 input_paddingY_select select_box`,text:'M',key:'7px'}),
                    $('<div/>',{class:`pY5 w25 input_paddingY_select select_box`,text:'L',key:'10px'}),
                    $('<div/>',{class:`pY5 w25 input_paddingY_select select_box`,text:'XL',key:'15px'}),
                )
            ),
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.padding_x}),
                $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.input',key:'padding_x'}).append(
                    $('<div/>',{class:`pY5 w25 input_paddingX_select select_box ico-no`,key:'0px'}),
                    $('<div/>',{class:`pY5 w25 input_paddingX_select select_box`,text:'S',key:'3px'}),
                    $('<div/>',{class:`pY5 w25 input_paddingX_select select_box`,text:'M',key:'7px'}),
                    $('<div/>',{class:`pY5 w25 input_paddingX_select select_box`,text:'L',key:'10px'}),
                    $('<div/>',{class:`pY5 w25 input_paddingX_select select_box`,text:'XL',key:'15px'}),
                )
            ),
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.border_style}),
                $('<div/>',{class:'mis-10 select_box_container select_box_border_style',key_tree:'form_elements.input',key:'border_style'}).append(
                    $('<div/>',{class:`p7 fs101 input_border_style_select select_box ico-border_top`,key:'top'}),
                    $('<div/>',{class:`p7 fs101 input_border_style_select select_box ico-border_right`,key:'right'}),
                    $('<div/>',{class:`p7 fs101 input_border_style_select select_box ico-border_bottom`,key:'bottom'}),
                    $('<div/>',{class:`p7 fs101 input_border_style_select select_box ico-border_left`,key:'left'}),
                )
            ),
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.border_width}),
                $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.input',key:'border_width'}).append(
                    $('<div/>',{class:`pY5 pX5 input_border_width_select select_box ico-no`,key:'0px'}),
                    $('<div/>',{class:`pY5 pX5 input_border_width_select select_box`,text:texts.select_elems.thin,key:'1px'}),
                    $('<div/>',{class:`pY5 pX5 input_border_width_select select_box`,text:texts.select_elems.thick,key:'2px'}),
                    $('<div/>',{class:`pY5 pX5 input_border_width_select select_box`,text:texts.select_elems.thicker,key:'3px'}),
                )
            ),
            $('<div/>',{class:'page_setup_row'}).append(
                $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.border_radius}),
                $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.input',key:'border_width'}).append(
                    $('<div/>',{class:`pY5 pX5 input_border_width_select select_box ico-no`,key:'0px'}),
                    $('<div/>',{class:`pY5 pX5 input_border_width_select select_box`,text:texts.select_elems.thin,key:'1px'}),
                    $('<div/>',{class:`pY5 pX5 input_border_width_select select_box`,text:texts.select_elems.thick,key:'2px'}),
                    $('<div/>',{class:`pY5 pX5 input_border_width_select select_box`,text:texts.select_elems.thicker,key:'3px'}),
                )
            ),
        ),
    )


}
