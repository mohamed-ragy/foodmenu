set_form_elements_settings = function(){
    set_form_elements_vars();
    $('.form_align_select').removeClass('select_box_selected')
    $(`.form_align_select[key="${window.template.form_elements.form_align}"]`).addClass('select_box_selected')
    //
    $('.form_spacing_select').removeClass('select_box_selected')
    $(`.form_spacing_select[key="${window.template.form_elements.spacing}"]`).addClass('select_box_selected')
    //
    $('.input_text_align_select').removeClass('select_box_selected');
    $(`.input_text_align_select[key="${window.template.form_elements.input.input_text_align}"]`).addClass('select_box_selected')
    //
    $('.input_paddingY_select').removeClass('select_box_selected')
    $(`.input_paddingY_select[key="${window.template.form_elements.input.input_padding_y}"]`).addClass('select_box_selected')
    //
    $('.input_paddingX_select').removeClass('select_box_selected')
    $(`.input_paddingX_select[key="${window.template.form_elements.input.input_padding_x}"]`).addClass('select_box_selected')
    //
    let border_style = window.template.form_elements.input.input_border_style.split(' ');
    border_style[0] == 'solid' ? $('.input_border_style_select.ico-border_top').addClass('select_box_selected') : border_style[0] == 'none' ?  $('.input_border_style_select.ico-border_top').removeClass('select_box_selected') : null;
    border_style[1] == 'solid' ? $('.input_border_style_select.ico-border_right').addClass('select_box_selected') : border_style[1] == 'none' ?  $('.input_border_style_select.ico-border_right').removeClass('select_box_selected') : null;
    border_style[2] == 'solid' ? $('.input_border_style_select.ico-border_bottom').addClass('select_box_selected') : border_style[2] == 'none' ?  $('.input_border_style_select.ico-border_bottom').removeClass('select_box_selected') : null;
    border_style[3] == 'solid' ? $('.input_border_style_select.ico-border_left').addClass('select_box_selected') : border_style[3] == 'none' ?  $('.input_border_style_select.ico-border_left').removeClass('select_box_selected') : null;
    //
    $('.input_border_width_select').removeClass('select_box_selected')
    $(`.input_border_width_select[key="${window.template.form_elements.input.input_border_width}"]`).addClass('select_box_selected')
    //
    let input_border_radius = window.template.form_elements.input.input_border_radius.split(' ');
    $('#input_border_radius').find('.border_radius_select[corner_name="top_left"]').removeClass().addClass(`border_radius_select border_radius_select_top_left_${input_border_radius[0]}`)
    $('#input_border_radius').find('.border_radius_select[corner_name="top_right"]').removeClass().addClass(`border_radius_select border_radius_select_top_right_${input_border_radius[1]}`)
    $('#input_border_radius').find('.border_radius_select[corner_name="bottom_right"]').removeClass().addClass(`border_radius_select border_radius_select_bottom_right_${input_border_radius[2]}`)
    $('#input_border_radius').find('.border_radius_select[corner_name="bottom_left"]').removeClass().addClass(`border_radius_select border_radius_select_bottom_left_${input_border_radius[3]}`)
    //
    $('.input_font_size_select').removeClass('select_box_selected')
    $(`.input_font_size_select[key="${window.template.form_elements.input.input_font_size}"]`).addClass('select_box_selected')
    //
    $('.input_label_font_size_select').removeClass('select_box_selected')
    $(`.input_label_font_size_select[key="${window.template.form_elements.input.input_label_font_size}"]`).addClass('select_box_selected')
    //
    $('.input_label_margin_select').removeClass('select_box_selected')
    $(`.input_label_margin_select[key="${window.template.form_elements.input.input_label_margin}"]`).addClass('select_box_selected')
    //
    $('.input_transitionDuration_select').removeClass('select_box_selected')
    $(`.input_transitionDuration_select[key="${window.template.form_elements.input.input_transition_duration}"]`).addClass('select_box_selected')
    //
    $('.input_focus_outline_width_select').removeClass('select_box_selected')
    $(`.input_focus_outline_width_select[key="${window.template.form_elements.input.input_focus_outline_width}"]`).addClass('select_box_selected')
    //
    $('.checkbox_shape_select').removeClass('select_box_selected')
    $('.checkbox_shape_select').children().removeClass('checkbox_checked ico-check')
    $(`.checkbox_shape_select[key="${window.template.form_elements.checkbox.checkbox_border_radius}"]`).addClass('select_box_selected')
    $(`.checkbox_shape_select[key="${window.template.form_elements.checkbox.checkbox_border_radius}"]`).children().addClass('checkbox_checked ico-check')
    //
    $('.checkbox_size_select').removeClass('select_box_selected')
    $(`.checkbox_size_select[key="${window.template.form_elements.checkbox.checkbox_size}"]`).addClass('select_box_selected')
    //
    $('.button1_paddingY_select').removeClass('select_box_selected')
    $(`.button1_paddingY_select[key="${window.template.form_elements.button1.button1_padding_y}"]`).addClass('select_box_selected')
    //
    $('.button1_paddingX_select').removeClass('select_box_selected')
    $(`.button1_paddingX_select[key="${window.template.form_elements.button1.button1_padding_x}"]`).addClass('select_box_selected')
    //
    let button1_border_radius = window.template.form_elements.button1.button1_border_radius.split(' ');
    $('#button1_border_radius').find('.border_radius_select[corner_name="top_left"]').removeClass().addClass(`border_radius_select border_radius_select_top_left_${button1_border_radius[0]}`)
    $('#button1_border_radius').find('.border_radius_select[corner_name="top_right"]').removeClass().addClass(`border_radius_select border_radius_select_top_right_${button1_border_radius[1]}`)
    $('#button1_border_radius').find('.border_radius_select[corner_name="bottom_right"]').removeClass().addClass(`border_radius_select border_radius_select_bottom_right_${button1_border_radius[2]}`)
    $('#button1_border_radius').find('.border_radius_select[corner_name="bottom_left"]').removeClass().addClass(`border_radius_select border_radius_select_bottom_left_${button1_border_radius[3]}`)
    //
    $('.button1_font_size_select').removeClass('select_box_selected')
    $(`.button1_font_size_select[key="${window.template.form_elements.button1.button1_font_size}"]`).addClass('select_box_selected')
    //
    $('.button1_outline_width_select').removeClass('select_box_selected')
    $(`.button1_outline_width_select[key="${window.template.form_elements.button1.button1_outline_width}"]`).addClass('select_box_selected')
    //
    $('.button1_transitionDuration_select').removeClass('select_box_selected')
    $(`.button1_transitionDuration_select[key="${window.template.form_elements.button1.button1_transition_duration}"]`).addClass('select_box_selected')
    //
    $('.button1_hover_outline_width_select').removeClass('select_box_selected')
    $(`.button1_hover_outline_width_select[key="${window.template.form_elements.button1.button1_hover_outline_width}"]`).addClass('select_box_selected')
    //
    $('.button1_click_outline_width_select').removeClass('select_box_selected')
    $(`.button1_click_outline_width_select[key="${window.template.form_elements.button1.button1_click_outline_width}"]`).addClass('select_box_selected')
    //
    //////

    $('.button1_disabled_outline_width_select').removeClass('select_box_selected')
    $(`.button1_disabled_outline_width_select[key="${window.template.form_elements.button1.button1_disabled_outline_width}"]`).addClass('select_box_selected')
    //
    $('.button2_paddingY_select').removeClass('select_box_selected')
    $(`.button2_paddingY_select[key="${window.template.form_elements.button2.button2_padding_y}"]`).addClass('select_box_selected')
    //
    $('.button2_paddingX_select').removeClass('select_box_selected')
    $(`.button2_paddingX_select[key="${window.template.form_elements.button2.button2_padding_x}"]`).addClass('select_box_selected')
    //
    let button2_border_radius = window.template.form_elements.button2.button2_border_radius.split(' ');
    $('#button2_border_radius').find('.border_radius_select[corner_name="top_left"]').removeClass().addClass(`border_radius_select border_radius_select_top_left_${button2_border_radius[0]}`)
    $('#button2_border_radius').find('.border_radius_select[corner_name="top_right"]').removeClass().addClass(`border_radius_select border_radius_select_top_right_${button2_border_radius[1]}`)
    $('#button2_border_radius').find('.border_radius_select[corner_name="bottom_right"]').removeClass().addClass(`border_radius_select border_radius_select_bottom_right_${button2_border_radius[2]}`)
    $('#button2_border_radius').find('.border_radius_select[corner_name="bottom_left"]').removeClass().addClass(`border_radius_select border_radius_select_bottom_left_${button2_border_radius[3]}`)
    //
    $('.button2_font_size_select').removeClass('select_box_selected')
    $(`.button2_font_size_select[key="${window.template.form_elements.button2.button2_font_size}"]`).addClass('select_box_selected')
    //
    $('.button2_outline_width_select').removeClass('select_box_selected')
    $(`.button2_outline_width_select[key="${window.template.form_elements.button2.button2_outline_width}"]`).addClass('select_box_selected')
    //
    $('.button2_transitionDuration_select').removeClass('select_box_selected')
    $(`.button2_transitionDuration_select[key="${window.template.form_elements.button2.button2_transition_duration}"]`).addClass('select_box_selected')
    //
    $('.button2_hover_outline_width_select').removeClass('select_box_selected')
    $(`.button2_hover_outline_width_select[key="${window.template.form_elements.button2.button2_hover_outline_width}"]`).addClass('select_box_selected')
    //
    $('.button2_click_outline_width_select').removeClass('select_box_selected')
    $(`.button2_click_outline_width_select[key="${window.template.form_elements.button2.button2_click_outline_width}"]`).addClass('select_box_selected')
    //
    //
    $('.button2_disabled_outline_width_select').removeClass('select_box_selected')
    $(`.button2_disabled_outline_width_select[key="${window.template.form_elements.button2.button2_disabled_outline_width}"]`).addClass('select_box_selected')
    //
    //////
}

draw_form_elements = function(){
    $('#form_elements').find('.editor_popup_title').text(texts.website_style.form_elements)
    $('#form_elements').find('.editor_popup_head_btn').text('').append(
        $('<div/>',{class:'backTo_form_elements_container backFrom_form_elements_input_container none ico-arrowLeft pointer fs101'}),
        $('<div/>',{class:'backTo_form_elements_container backFrom_form_elements_checkbox_container none ico-arrowLeft pointer fs101'}),
        $('<div/>',{class:'backTo_form_elements_container backFrom_form_elements_button1_container none ico-arrowLeft pointer fs101'}),
        $('<div/>',{class:'backTo_form_elements_container backFrom_form_elements_button2_container none ico-arrowLeft pointer fs101'}),
    )
    $('#form_elements').addClass('w500 h850').find('.editor_popup_body').text('').append(
        $('<div/>',{class:'w100p mB40'}).append(
            $('<div/>',{class:'form_elements_container'}).append(
                // $('<div/>',{class:'inter fs1 bold',text:texts.website_style.form_elements}),
                $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_style.form_elements_des}),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.form_align}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements',key:'form_align'}).append(
                        $('<div/>',{class:`pY5 w25 form_align_select select_box ico-align_start`,key:'flex-start'}),
                        $('<div/>',{class:`pY5 w25 form_align_select select_box ico-align_center`,key:'center'}),
                        $('<div/>',{class:`pY5 w25 form_align_select select_box ico-align_end`,key:'flex-end'}),
                    )
                ),
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
                $('<div/>',{class:'page_setup_row pointer pY10 show_form_elements_input_container'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.input_box}),
                    $('<div/>',{class:'ico-arrowRight'})
                ),
                $('<div/>',{class:'page_setup_row pointer pY10 show_form_elements_checkbox_container'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.checkbox}),
                    $('<div/>',{class:'ico-arrowRight'})
                ),
                $('<div/>',{class:'page_setup_row pointer pY10 show_form_elements_button1_container'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.button1}),
                    $('<div/>',{class:'ico-arrowRight'})
                ),
                $('<div/>',{class:'page_setup_row pointer pY10 show_form_elements_button2_container'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.button2}),
                    $('<div/>',{class:'ico-arrowRight'})
                ),
            ),
            $('<div/>',{class:'form_elements_input_container none'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.input_box}),
                $('<div/>',{class:'fs085 c_white-11',text:texts.website_style.input_box_des}),
                $('<div/>',{class:'w100p-20 form body_color_theme pY20 pX10 sticky t-10 brdrB1 zx10'}).append(
                    $('<label/>',{class:'input_lable',text:texts.website_style.input_box}),
                    $('<input/>',{class:'input'}),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.text_align}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.input',key:'input_text_align'}).append(
                        $('<div/>',{class:`pY5 w25 input_text_align_select select_box ico-align_start`,key:'start'}),
                        $('<div/>',{class:`pY5 w25 input_text_align_select select_box ico-align_center`,key:'center'}),
                        $('<div/>',{class:`pY5 w25 input_text_align_select select_box ico-align_end`,key:'end'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.padding_y}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.input',key:'input_padding_y'}).append(
                        $('<div/>',{class:`pY5 w25 input_paddingY_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 w25 input_paddingY_select select_box`,text:'S',key:'3px'}),
                        $('<div/>',{class:`pY5 w25 input_paddingY_select select_box`,text:'M',key:'7px'}),
                        $('<div/>',{class:`pY5 w25 input_paddingY_select select_box`,text:'L',key:'10px'}),
                        $('<div/>',{class:`pY5 w25 input_paddingY_select select_box`,text:'XL',key:'15px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.padding_x}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.input',key:'input_padding_x'}).append(
                        $('<div/>',{class:`pY5 w25 input_paddingX_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 w25 input_paddingX_select select_box`,text:'S',key:'3px'}),
                        $('<div/>',{class:`pY5 w25 input_paddingX_select select_box`,text:'M',key:'7px'}),
                        $('<div/>',{class:`pY5 w25 input_paddingX_select select_box`,text:'L',key:'10px'}),
                        $('<div/>',{class:`pY5 w25 input_paddingX_select select_box`,text:'XL',key:'15px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.border_style}),
                    $('<div/>',{class:'mis-10 select_box_container select_box_border_style',key_tree:'form_elements.input',key:'input_border_style'}).append(
                        $('<div/>',{class:`p7 fs101 input_border_style_select select_box ico-border_top`,key:'top'}),
                        $('<div/>',{class:`p7 fs101 input_border_style_select select_box ico-border_right`,key:'right'}),
                        $('<div/>',{class:`p7 fs101 input_border_style_select select_box ico-border_bottom`,key:'bottom'}),
                        $('<div/>',{class:`p7 fs101 input_border_style_select select_box ico-border_left`,key:'left'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.border_width}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.input',key:'input_border_width'}).append(
                        $('<div/>',{class:`pY5 pX5 input_border_width_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 pX5 input_border_width_select select_box`,text:texts.select_elems.thin,key:'1px'}),
                        $('<div/>',{class:`pY5 pX5 input_border_width_select select_box`,text:texts.select_elems.thick,key:'2px'}),
                        $('<div/>',{class:`pY5 pX5 input_border_width_select select_box`,text:texts.select_elems.thicker,key:'3px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.border_radius}),
                    $('<div/>',{id:'input_border_radius',class:'border_radius_selector_container',key_tree:'form_elements.input',key:'input_border_radius'}).append(
                        $('<div/>',{corner_name:'top_left',class:`border_radius_select`,key:'1px'}),
                        $('<div/>',{corner_name:'top_right',class:`border_radius_select`,key:'1px'}),
                        $('<div/>',{corner_name:'bottom_right',class:`border_radius_select`,key:'1px'}),
                        $('<div/>',{corner_name:'bottom_left',class:`border_radius_select`,key:'1px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.border_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--input_border_color)`,value:window.template.form_elements.input.input_border_color,key:'input_border_color',key_tree:'form_elements.input'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.font_size}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.input',key:'input_font_size'}).append(
                        $('<div/>',{class:`pY5 pX5 input_font_size_select select_box`,text:'XS',key:'.8em'}),
                        $('<div/>',{class:`pY5 pX5 input_font_size_select select_box`,text:'S',key:'.9em'}),
                        $('<div/>',{class:`pY5 pX5 input_font_size_select select_box`,text:'M',key:'1em'}),
                        $('<div/>',{class:`pY5 pX5 input_font_size_select select_box`,text:'L',key:'1.1em'}),
                        $('<div/>',{class:`pY5 pX5 input_font_size_select select_box`,text:'XL',key:'1.2em'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.font_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--input_font_color)`,value:window.template.form_elements.input.input_font_color,key:'input_font_color',key_tree:'form_elements.input'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.label_font_size}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.input',key:'input_label_font_size'}).append(
                        $('<div/>',{class:`pY5 pX5 input_label_font_size_select select_box`,text:'XS',key:'.8em'}),
                        $('<div/>',{class:`pY5 pX5 input_label_font_size_select select_box`,text:'S',key:'.9em'}),
                        $('<div/>',{class:`pY5 pX5 input_label_font_size_select select_box`,text:'M',key:'1em'}),
                        $('<div/>',{class:`pY5 pX5 input_label_font_size_select select_box`,text:'L',key:'1.1em'}),
                        $('<div/>',{class:`pY5 pX5 input_label_font_size_select select_box`,text:'XL',key:'1.2em'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.label_margin}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.input',key:'input_label_margin'}).append(
                        $('<div/>',{class:`pY5 w25 input_label_margin_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 w25 input_label_margin_select select_box`,text:'S',key:'3px'}),
                        $('<div/>',{class:`pY5 w25 input_label_margin_select select_box`,text:'M',key:'7px'}),
                        $('<div/>',{class:`pY5 w25 input_label_margin_select select_box`,text:'L',key:'10px'}),
                        $('<div/>',{class:`pY5 w25 input_label_margin_select select_box`,text:'XL',key:'15px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.bg_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--input_bg_color)`,value:window.template.form_elements.input.input_bg_color,key:'input_bg_color',key_tree:'form_elements.input'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.transitionDuration}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.input',key:'input_transition_duration'}).append(
                        $('<div/>',{class:`pY5 pX5 input_transitionDuration_select select_box ico-no`,key:'0ms'}),
                        $('<div/>',{class:`pY5 pX5 input_transitionDuration_select select_box`,text:texts.select_elems.slower,key:'500ms'}),
                        $('<div/>',{class:`pY5 pX5 input_transitionDuration_select select_box`,text:texts.select_elems.slow,key:'350ms'}),
                        $('<div/>',{class:`pY5 pX5 input_transitionDuration_select select_box`,text:texts.select_elems.fast,key:'200ms'}),
                        $('<div/>',{class:`pY5 pX5 input_transitionDuration_select select_box`,text:texts.select_elems.faster,key:'100ms'}),
                    )
                ),
                $('<div/>',{class:'fs1 bold mT20',text:texts.website_style.input_focus}),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_width}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.input',key:'input_focus_outline_width'}).append(
                        $('<div/>',{class:`pY5 pX5 input_focus_outline_width_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 pX5 input_focus_outline_width_select select_box`,text:texts.select_elems.thin,key:'1px'}),
                        $('<div/>',{class:`pY5 pX5 input_focus_outline_width_select select_box`,text:texts.select_elems.thick,key:'2px'}),
                        $('<div/>',{class:`pY5 pX5 input_focus_outline_width_select select_box`,text:texts.select_elems.thicker,key:'3px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--input_focus_outline_color)`,value:window.template.form_elements.input.input_focus_outline_color,key:'input_focus_outline_color',key_tree:'form_elements.input'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.bg_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--input_focus_bg_color)`,value:window.template.form_elements.input.input_focus_bg_color,key:'input_focus_bg_color',key_tree:'form_elements.input'}),
                    ),
                ),
            ),
            $('<div/>',{class:'form_elements_checkbox_container none'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.checkbox}),
                $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_style.checkbox_des}),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.shape}),
                    $('<div/>',{class:'select_box_container',key_tree:'form_elements.checkbox',key:'checkbox_border_radius'}).append(
                        $('<div/>',{class:`p5 fs1 select_box checkbox_shape_select`,key:'0px'}).append(
                            $('<div/>',{class:'checkbox_square'})
                        ),
                        $('<div/>',{class:`p5 fs1 select_box checkbox_shape_select`,key:'5px'}).append(
                            $('<div/>',{class:'checkbox_Rsquare'})
                        ),
                        $('<div/>',{class:`p5 fs1 select_box checkbox_shape_select`,key:'50%'}).append(
                            $('<div/>',{class:'checkbox_circle'})
                        ),

                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.size}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.checkbox',key:'checkbox_size'}).append(
                        $('<div/>',{class:`pY5 w25 checkbox_size_select select_box`,text:'S',key:'.9em'}),
                        $('<div/>',{class:`pY5 w25 checkbox_size_select select_box`,text:'M',key:'1em'}),
                        $('<div/>',{class:`pY5 w25 checkbox_size_select select_box`,text:'L',key:'1.1em'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--checkbox_color)`,value:window.template.form_elements.input.checkbox_color,key:'checkbox_color',key_tree:'form_elements.checkbox'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.check_mark_colot}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--checkbox_checkMark_color)`,value:window.template.form_elements.input.checkbox_checkMark_color,key:'checkbox_checkMark_color',key_tree:'form_elements.checkbox'}),
                    ),
                ),

            ),
            $('<div/>',{class:'form_elements_button1_container none'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.button1}),
                $('<div/>',{class:'fs085 c_white-11',text:texts.website_style.button1_des}),
                $('<div/>',{class:'w100p form body_color_theme pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button1 m5',text:texts.website_style.button1}),
                        $('<button/>',{class:'button1 m5',disabled:true,text:texts.website_style.button1_disabled}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.padding_y}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.button1',key:'button1_padding_y'}).append(
                        $('<div/>',{class:`pY5 w25 button1_paddingY_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 w25 button1_paddingY_select select_box`,text:'XS',key:'5px'}),
                        $('<div/>',{class:`pY5 w25 button1_paddingY_select select_box`,text:'S',key:'10px'}),
                        $('<div/>',{class:`pY5 w25 button1_paddingY_select select_box`,text:'M',key:'15px'}),
                        $('<div/>',{class:`pY5 w25 button1_paddingY_select select_box`,text:'L',key:'20px'}),
                        $('<div/>',{class:`pY5 w25 button1_paddingY_select select_box`,text:'XL',key:'25px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.padding_x}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.button1',key:'button1_padding_x'}).append(
                        $('<div/>',{class:`pY5 w25 button1_paddingX_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 w25 button1_paddingX_select select_box`,text:'XS',key:'5px'}),
                        $('<div/>',{class:`pY5 w25 button1_paddingX_select select_box`,text:'S',key:'15px'}),
                        $('<div/>',{class:`pY5 w25 button1_paddingX_select select_box`,text:'M',key:'25px'}),
                        $('<div/>',{class:`pY5 w25 button1_paddingX_select select_box`,text:'L',key:'35px'}),
                        $('<div/>',{class:`pY5 w25 button1_paddingX_select select_box`,text:'XL',key:'45px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.border_radius}),
                    $('<div/>',{id:'button1_border_radius',class:'border_radius_selector_container',key_tree:'form_elements.button1',key:'button1_border_radius'}).append(
                        $('<div/>',{corner_name:'top_left',class:`border_radius_select`,key:'1px'}),
                        $('<div/>',{corner_name:'top_right',class:`border_radius_select`,key:'1px'}),
                        $('<div/>',{corner_name:'bottom_right',class:`border_radius_select`,key:'1px'}),
                        $('<div/>',{corner_name:'bottom_left',class:`border_radius_select`,key:'1px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.font_size}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.button1',key:'button1_font_size'}).append(
                        $('<div/>',{class:`pY5 pX5 button1_font_size_select select_box`,text:'XS',key:'.8em'}),
                        $('<div/>',{class:`pY5 pX5 button1_font_size_select select_box`,text:'S',key:'.9em'}),
                        $('<div/>',{class:`pY5 pX5 button1_font_size_select select_box`,text:'M',key:'1em'}),
                        $('<div/>',{class:`pY5 pX5 button1_font_size_select select_box`,text:'L',key:'1.1em'}),
                        $('<div/>',{class:`pY5 pX5 button1_font_size_select select_box`,text:'XL',key:'1.2em'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.font_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button1_font_color)`,value:window.template.form_elements.input.button1_font_color,key:'button1_font_color',key_tree:'form_elements.button1'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.bg_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button1_bg_color)`,value:window.template.form_elements.input.button1_bg_color,key:'button1_bg_color',key_tree:'form_elements.button1'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_width}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.button1',key:'button1_outline_width'}).append(
                        $('<div/>',{class:`pY5 pX5 button1_outline_width_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 pX5 button1_outline_width_select select_box`,text:texts.select_elems.thin,key:'1px'}),
                        $('<div/>',{class:`pY5 pX5 button1_outline_width_select select_box`,text:texts.select_elems.thick,key:'2px'}),
                        $('<div/>',{class:`pY5 pX5 button1_outline_width_select select_box`,text:texts.select_elems.thicker,key:'3px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button1_outline_color)`,value:window.template.form_elements.input.button1_outline_color,key:'button1_outline_color',key_tree:'form_elements.button1'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.transitionDuration}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.button1',key:'button1_transition_duration'}).append(
                        $('<div/>',{class:`pY5 pX5 button1_transitionDuration_select select_box ico-no`,key:'0ms'}),
                        $('<div/>',{class:`pY5 pX5 button1_transitionDuration_select select_box`,text:texts.select_elems.slower,key:'500ms'}),
                        $('<div/>',{class:`pY5 pX5 button1_transitionDuration_select select_box`,text:texts.select_elems.slow,key:'350ms'}),
                        $('<div/>',{class:`pY5 pX5 button1_transitionDuration_select select_box`,text:texts.select_elems.fast,key:'200ms'}),
                        $('<div/>',{class:`pY5 pX5 button1_transitionDuration_select select_box`,text:texts.select_elems.faster,key:'100ms'}),
                    )
                ),
                $('<div/>',{class:'fs1 bold mT20',text:texts.website_style.button_hover}),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.font_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button1_hover_font_color)`,value:window.template.form_elements.input.button1_hover_font_color,key:'button1_hover_font_color',key_tree:'form_elements.button1'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.bg_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button1_hover_bg_color)`,value:window.template.form_elements.input.button1_hover_bg_color,key:'button1_hover_bg_color',key_tree:'form_elements.button1'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_width}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.button1',key:'button1_hover_outline_width'}).append(
                        $('<div/>',{class:`pY5 pX5 button1_hover_outline_width_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 pX5 button1_hover_outline_width_select select_box`,text:texts.select_elems.thin,key:'1px'}),
                        $('<div/>',{class:`pY5 pX5 button1_hover_outline_width_select select_box`,text:texts.select_elems.thick,key:'2px'}),
                        $('<div/>',{class:`pY5 pX5 button1_hover_outline_width_select select_box`,text:texts.select_elems.thicker,key:'3px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button1_hover_outline_color)`,value:window.template.form_elements.input.button1_hover_outline_color,key:'button1_hover_outline_color',key_tree:'form_elements.button1'}),
                    ),
                ),
                $('<div/>',{class:'fs1 bold mT20',text:texts.website_style.button_click}),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.font_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button1_click_font_color)`,value:window.template.form_elements.input.button1_click_font_color,key:'button1_click_font_color',key_tree:'form_elements.button1'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.bg_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button1_click_bg_color)`,value:window.template.form_elements.input.button1_click_bg_color,key:'button1_click_bg_color',key_tree:'form_elements.button1'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_width}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.button1',key:'button1_click_outline_width'}).append(
                        $('<div/>',{class:`pY5 pX5 button1_click_outline_width_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 pX5 button1_click_outline_width_select select_box`,text:texts.select_elems.thin,key:'1px'}),
                        $('<div/>',{class:`pY5 pX5 button1_click_outline_width_select select_box`,text:texts.select_elems.thick,key:'2px'}),
                        $('<div/>',{class:`pY5 pX5 button1_click_outline_width_select select_box`,text:texts.select_elems.thicker,key:'3px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button1_click_outline_color)`,value:window.template.form_elements.input.button1_click_outline_color,key:'button1_click_outline_color',key_tree:'form_elements.button1'}),
                    ),
                ),
                $('<div/>',{class:'fs1 bold mT20',text:texts.website_style.button_disabled}),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.font_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button1_disabled_font_color)`,value:window.template.form_elements.input.button1_disabled_font_color,key:'button1_disabled_font_color',key_tree:'form_elements.button1'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.bg_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button1_disabled_bg_color)`,value:window.template.form_elements.input.button1_disabled_bg_color,key:'button1_disabled_bg_color',key_tree:'form_elements.button1'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_width}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.button1',key:'button1_disabled_outline_width'}).append(
                        $('<div/>',{class:`pY5 pX5 button1_disabled_outline_width_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 pX5 button1_disabled_outline_width_select select_box`,text:texts.select_elems.thin,key:'1px'}),
                        $('<div/>',{class:`pY5 pX5 button1_disabled_outline_width_select select_box`,text:texts.select_elems.thick,key:'2px'}),
                        $('<div/>',{class:`pY5 pX5 button1_disabled_outline_width_select select_box`,text:texts.select_elems.thicker,key:'3px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button1_disabled_outline_color)`,value:window.template.form_elements.input.button1_disabled_outline_color,key:'button1_disabled_outline_color',key_tree:'form_elements.button1'}),
                    ),
                ),
            ),
            $('<div/>',{class:'form_elements_button2_container none'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.website_style.button2}),
                $('<div/>',{class:'fs085 mB20 c_white-11',text:texts.website_style.button2_des}),
                $('<div/>',{class:'w100p form body_color_theme pY20 sticky t-10 brdrB1 zx10'}).append(
                    $('<div/>',{class:'row alnC jstfyC wFC'}).append(
                        $('<button/>',{class:'button2 m5',text:texts.website_style.button2}),
                        $('<button/>',{class:'button2 m5',disabled:true,text:texts.website_style.button2_disabled}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.padding_y}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.button2',key:'button2_padding_y'}).append(
                        $('<div/>',{class:`pY5 w25 button2_paddingY_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 w25 button2_paddingY_select select_box`,text:'XS',key:'5px'}),
                        $('<div/>',{class:`pY5 w25 button2_paddingY_select select_box`,text:'S',key:'10px'}),
                        $('<div/>',{class:`pY5 w25 button2_paddingY_select select_box`,text:'M',key:'15px'}),
                        $('<div/>',{class:`pY5 w25 button2_paddingY_select select_box`,text:'L',key:'20px'}),
                        $('<div/>',{class:`pY5 w25 button2_paddingY_select select_box`,text:'XL',key:'25px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.padding_x}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.button2',key:'button2_padding_x'}).append(
                        $('<div/>',{class:`pY5 w25 button2_paddingX_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 w25 button2_paddingX_select select_box`,text:'XS',key:'5px'}),
                        $('<div/>',{class:`pY5 w25 button2_paddingX_select select_box`,text:'S',key:'15px'}),
                        $('<div/>',{class:`pY5 w25 button2_paddingX_select select_box`,text:'M',key:'25px'}),
                        $('<div/>',{class:`pY5 w25 button2_paddingX_select select_box`,text:'L',key:'35px'}),
                        $('<div/>',{class:`pY5 w25 button2_paddingX_select select_box`,text:'XL',key:'45px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.border_radius}),
                    $('<div/>',{id:'button2_border_radius',class:'border_radius_selector_container',key_tree:'form_elements.button2',key:'button2_border_radius'}).append(
                        $('<div/>',{corner_name:'top_left',class:`border_radius_select`,key:'1px'}),
                        $('<div/>',{corner_name:'top_right',class:`border_radius_select`,key:'1px'}),
                        $('<div/>',{corner_name:'bottom_right',class:`border_radius_select`,key:'1px'}),
                        $('<div/>',{corner_name:'bottom_left',class:`border_radius_select`,key:'1px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.font_size}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.button2',key:'button2_font_size'}).append(
                        $('<div/>',{class:`pY5 pX5 button2_font_size_select select_box`,text:'XS',key:'.8em'}),
                        $('<div/>',{class:`pY5 pX5 button2_font_size_select select_box`,text:'S',key:'.9em'}),
                        $('<div/>',{class:`pY5 pX5 button2_font_size_select select_box`,text:'M',key:'1em'}),
                        $('<div/>',{class:`pY5 pX5 button2_font_size_select select_box`,text:'L',key:'1.1em'}),
                        $('<div/>',{class:`pY5 pX5 button2_font_size_select select_box`,text:'XL',key:'1.2em'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.font_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button2_font_color)`,value:window.template.form_elements.input.button2_font_color,key:'button2_font_color',key_tree:'form_elements.button2'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.bg_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button2_bg_color)`,value:window.template.form_elements.input.button2_bg_color,key:'button2_bg_color',key_tree:'form_elements.button2'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_width}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.button2',key:'button2_outline_width'}).append(
                        $('<div/>',{class:`pY5 pX5 button2_outline_width_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 pX5 button2_outline_width_select select_box`,text:texts.select_elems.thin,key:'1px'}),
                        $('<div/>',{class:`pY5 pX5 button2_outline_width_select select_box`,text:texts.select_elems.thick,key:'2px'}),
                        $('<div/>',{class:`pY5 pX5 button2_outline_width_select select_box`,text:texts.select_elems.thicker,key:'3px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button2_outline_color)`,value:window.template.form_elements.input.button2_outline_color,key:'button2_outline_color',key_tree:'form_elements.button2'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.transitionDuration}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.button2',key:'button2_transition_duration'}).append(
                        $('<div/>',{class:`pY5 pX5 button2_transitionDuration_select select_box ico-no`,key:'0ms'}),
                        $('<div/>',{class:`pY5 pX5 button2_transitionDuration_select select_box`,text:texts.select_elems.slower,key:'500ms'}),
                        $('<div/>',{class:`pY5 pX5 button2_transitionDuration_select select_box`,text:texts.select_elems.slow,key:'350ms'}),
                        $('<div/>',{class:`pY5 pX5 button2_transitionDuration_select select_box`,text:texts.select_elems.fast,key:'200ms'}),
                        $('<div/>',{class:`pY5 pX5 button2_transitionDuration_select select_box`,text:texts.select_elems.faster,key:'100ms'}),
                    )
                ),
                $('<div/>',{class:'fs1 bold mT20',text:texts.website_style.button_hover}),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.font_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button2_hover_font_color)`,value:window.template.form_elements.input.button2_hover_font_color,key:'button2_hover_font_color',key_tree:'form_elements.button2'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.bg_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button2_hover_bg_color)`,value:window.template.form_elements.input.button2_hover_bg_color,key:'button2_hover_bg_color',key_tree:'form_elements.button2'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_width}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.button2',key:'button2_hover_outline_width'}).append(
                        $('<div/>',{class:`pY5 pX5 button2_hover_outline_width_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 pX5 button2_hover_outline_width_select select_box`,text:texts.select_elems.thin,key:'1px'}),
                        $('<div/>',{class:`pY5 pX5 button2_hover_outline_width_select select_box`,text:texts.select_elems.thick,key:'2px'}),
                        $('<div/>',{class:`pY5 pX5 button2_hover_outline_width_select select_box`,text:texts.select_elems.thicker,key:'3px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button2_hover_outline_color)`,value:window.template.form_elements.input.button2_hover_outline_color,key:'button2_hover_outline_color',key_tree:'form_elements.button2'}),
                    ),
                ),
                $('<div/>',{class:'fs1 bold mT20',text:texts.website_style.button_click}),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.font_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button2_click_font_color)`,value:window.template.form_elements.input.button2_click_font_color,key:'button2_click_font_color',key_tree:'form_elements.button2'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.bg_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button2_click_bg_color)`,value:window.template.form_elements.input.button2_click_bg_color,key:'button2_click_bg_color',key_tree:'form_elements.button2'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_width}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.button2',key:'button2_click_outline_width'}).append(
                        $('<div/>',{class:`pY5 pX5 button2_click_outline_width_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 pX5 button2_click_outline_width_select select_box`,text:texts.select_elems.thin,key:'1px'}),
                        $('<div/>',{class:`pY5 pX5 button2_click_outline_width_select select_box`,text:texts.select_elems.thick,key:'2px'}),
                        $('<div/>',{class:`pY5 pX5 button2_click_outline_width_select select_box`,text:texts.select_elems.thicker,key:'3px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button2_click_outline_color)`,value:window.template.form_elements.input.button2_click_outline_color,key:'button2_click_outline_color',key_tree:'form_elements.button2'}),
                    ),
                ),
                $('<div/>',{class:'fs1 bold mT20',text:texts.website_style.button_disabled}),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.font_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button2_disabled_font_color)`,value:window.template.form_elements.input.button2_disabled_font_color,key:'button2_disabled_font_color',key_tree:'form_elements.button2'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.bg_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button2_disabled_bg_color)`,value:window.template.form_elements.input.button2_disabled_bg_color,key:'button2_disabled_bg_color',key_tree:'form_elements.button2'}),
                    ),
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_width}),
                    $('<div/>',{class:'mis-10 select_box_container',key_tree:'form_elements.button2',key:'button2_disabled_outline_width'}).append(
                        $('<div/>',{class:`pY5 pX5 button2_disabled_outline_width_select select_box ico-no`,key:'0px'}),
                        $('<div/>',{class:`pY5 pX5 button2_disabled_outline_width_select select_box`,text:texts.select_elems.thin,key:'1px'}),
                        $('<div/>',{class:`pY5 pX5 button2_disabled_outline_width_select select_box`,text:texts.select_elems.thick,key:'2px'}),
                        $('<div/>',{class:`pY5 pX5 button2_disabled_outline_width_select select_box`,text:texts.select_elems.thicker,key:'3px'}),
                    )
                ),
                $('<div/>',{class:'page_setup_row'}).append(
                    $('<div/>',{class:'taS mie-10 fs09',text:texts.website_style.outline_color}),
                    $('<div/>',{class:'color_picker_container'}).append(
                        $('<input/>',{class:' color_picker',type:'text',style:`background-color:var(--button2_disabled_outline_color)`,value:window.template.form_elements.input.button2_disabled_outline_color,key:'button2_disabled_outline_color',key_tree:'form_elements.button2'}),
                    ),
                ),
            ),
        ),
    )
}

//events

$('html,body').on('click','.backFrom_form_elements_input_container',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_parent($('.form_elements_container'),$('.form_elements_input_container'))
    $('.backTo_form_elements_container').addClass('none')
})
$('html,body').on('click','.show_form_elements_input_container',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_child($('.form_elements_container'),$('.form_elements_input_container'));
    $('.backFrom_form_elements_input_container').removeClass('none')
})
//
$('html,body').on('click','.backFrom_form_elements_checkbox_container',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_parent($('.form_elements_container'),$('.form_elements_checkbox_container'))
    $('.backTo_form_elements_container').addClass('none')
})
$('html,body').on('click','.show_form_elements_checkbox_container',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_child($('.form_elements_container'),$('.form_elements_checkbox_container'));
    $('.backFrom_form_elements_checkbox_container').removeClass('none')
})
//
$('html,body').on('click','.backFrom_form_elements_button1_container',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_parent($('.form_elements_container'),$('.form_elements_button1_container'))
    $('.backTo_form_elements_container').addClass('none')
})
$('html,body').on('click','.show_form_elements_button1_container',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_child($('.form_elements_container'),$('.form_elements_button1_container'));
    $('.backFrom_form_elements_button1_container').removeClass('none')
})
//

$('html,body').on('click','.backFrom_form_elements_button2_container',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_parent($('.form_elements_container'),$('.form_elements_button2_container'))
    $('.backTo_form_elements_container').addClass('none')
})
$('html,body').on('click','.show_form_elements_button2_container',function(e){
    e.stopImmediatePropagation();
    editor_popup_to_child($('.form_elements_container'),$('.form_elements_button2_container'));
    $('.backFrom_form_elements_button2_container').removeClass('none')
})
//

