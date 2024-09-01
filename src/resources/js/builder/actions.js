new_action = function( render_key_tree = '') {
    if(JSON.stringify(window.template) == JSON.stringify(window.template_edit_history[`_${window.template_current_edit}`])){
        return;
    }
    unset_preview_mode();
    // deheighlight_all();
    for (const key in window.template_edit_history) {
        if (parseInt(key.replace('_', '')) > window.template_current_edit) {
            delete window.template_edit_history[key]
        }
    }

    window.template_current_edit++;
    window.template_edit_history[`_${window.template_current_edit}`] = JSON.parse(JSON.stringify(window.template))
    
    // if(generate_style != ''){console.log(`generate style form action: ${generate_style}`);generate_website_style(generate_style)}
    if(render_key_tree != ''){console.log(`render from action: ${render_key_tree}`);render(render_key_tree)}
    fix_undo_redo_btns();
}
fix_undo_redo_btns = function() {
    if (window.template_current_edit == 0) {
        $('.undo').addClass('header_icon_disabled')
    } else {
        $('.undo').removeClass('header_icon_disabled')
    }

    if (window.template_current_edit + 1 < Object.keys(window.template_edit_history).length) {
        $('.redo').removeClass('header_icon_disabled')
    } else {
        $('.redo').addClass('header_icon_disabled')
    }
    if (is_saved_checker()) {
        $('#save').prop('disabled', true)
    } else {
        $('#save').prop('disabled', false)
    }
}
undo = function() {
    if (window.template_current_edit == 0) { return; }
    window.template_current_edit--;
    window.template = JSON.parse(JSON.stringify(window.template_edit_history[`_${window.template_current_edit}`]))
    window.used_font_styles = [];
    render('all')
    set_all_editors();
    fix_undo_redo_btns();
    hidePopupSelectors(true);
    set_adapted_header()
}
redo = function() {
    if (window.template_current_edit + 1 >= Object.keys(window.template_edit_history).length) { return; }
    window.template_current_edit++;
    window.template = JSON.parse(JSON.stringify(window.template_edit_history[`_${window.template_current_edit}`]))
    window.used_font_styles = [];
    render('all')
    set_all_editors();
    fix_undo_redo_btns();
    hidePopupSelectors(true);
    set_adapted_header()
}

set_all_editors = function(){
    draw_color_palette(true);
    draw_custom_colors();
    draw_color_picker_popup();
    if($('.website_color_picker[is_selected="1"]').length > 0){
        try{
            set_dummy_select_range($('.website_color_picker_gradation'),window.template.website_colors.gradation[`${$('.website_color_picker[is_selected="1"]').attr('key')}_gradation`])
        }catch{}
    }
    $('.rename_editor').each(function(){
        try{
            set_rename_editor($(this));
        }catch{}
    })
    $('.number_picker_editor').each(function(){
        try{
            set_number_picker($(this));
        }catch{}
    })
    $('.select_range').each(function(){
        try{
            set_select_range($(this))
        }catch{}
    })
    $('.inputList_editor').each(function(){
        try{
            set_input_list($(this))
        }catch{}
    })
    $('.select_box_editor').each(function(){
        try{
            set_select_box($(this))
        }catch{}
    })
    $('.switch_btn').each(function(){
        try{
            set_switch_btn($(this))
        }catch{}
    })
    $('.color_picker_editor').each(function(){
        try{
            set_color_picker($(this))
        }catch{}
    })
    $('.gradient_editor').each(function(){
        try{
            set_gradient_editor($(this));
        }catch{}
    })
    $('.select_image_editor').each(function(){
        try{
            set_select_image($(this));
        }catch{}
    })
    $('.image_position_editor').each(function(){
        try{
            set_image_position_editor($(this))
        }catch{}
    })
    $('.select_background_filter').each(function(){
        try{
            set_select_background_filter($(this));
        }catch{}
    })
    $('.backdrop_filter_editor').each(function(){
        try{
            set_backdrop_filter_editor($(this));
        }catch{}
    })
    $('.border_editors').each(function(){
        try{
            set_border_editors($(this));
        }catch{}
    })
    $('.box_shadow_editor').each(function(){
        try{
            set_box_shadow_editor($(this));
        }catch{}
    })
    $('.font_picker_editor').each(function(){
        try{
            set_font_style_picker($(this));
        }catch{}
    })
    $('.text_editor').each(function(){
        try{
            set_text_editor($(this));
        }catch{}
    })
    $('.filter_editor').each(function(){
        try{
            set_filter_editor($(this));
        }catch{}
    })
    $('.transform_editor').each(function(){
        try{
            set_transform_editor($(this));
        }catch{}
    })
    $('.animation_editor').each(function(){
        try{
            set_animation_editor($(this));
        }catch{}
    })
    $('.timing_function_editor').each(function(){
        try{
            set_timing_function_editor($(this));
        }catch{}
    })
    $('.aspect_ratio_editor').each(function(){
        try{
            set_aspect_ratio_editor($(this));
        }catch{}
    })
    $('.button_function_editor').each(function(){
        try{
            set_button_function_editor($(this));
        }catch{}
    })
    $('.four_number_pickers_editor').each(function(){
        try{
            set_four_number_pickers($(this));
        }catch{}
    })
    $('.png_icon_selector_editor').each(function(){
        try{
            set_png_icon_selector($(this));
        }catch{}
    })
    $('.interactions_picker').each(function(){
        try{
            set_interactions_picker($(this));
        }catch{}
    })
    $('.svg_icon_picker').each(function(){
        // try{
            set_svg_icon_picker($(this))
        // }catch{}
    })

    $('.editor_details_head').each(function(){
        try{
            set_editor_details($(this))
        }catch{}
    })
}
generate_website_style = function(generate){
    if(generate == 'all'){
        for(const key in window.template[window.selected_page]){
            generate_elems_style(window.template[window.selected_page][key])
        }
        generate_elems_style(window.template.website_header)
        if (window.website_popup_opened == true) {
            generate_elems_style(window.template.popup_window)
            generate_elems_style(window.template[selected_popup])
        }
    }else{
        let elem = get_element_data(generate);
        generate_elem_style(elem)
        console.log(`element style generated`,elem)
    }
}
render = function(key_tree){
    if(key_tree == 'all'){
        render_page(window.selected_page)
        render_website_header();
        render_website_popup(window.selected_popup);
    }else{
        key_tree = key_tree.split('-');
        for(const key in key_tree){
            if(key_tree[key] == 'website_colors'){
                set_website_colors_vars();
            }else if(key_tree[key] == 'page_setup'){
                set_page_setup_vars();
            }else if(key_tree[key] == 'website_header'){
                render_website_header()
            }else if(key_tree[key] == 'page'){
                render_page(window.selected_page)
            }else{
                let elem = get_element_data(key_tree[key]);
                if($(`.${elem.class_selector}_container`).length > 0){
                    $(`.${elem.class_selector}_container`).replaceWith(generate_html(elem,key_tree[key]))
                }else{
                    $(`.${elem.class_selector}`).replaceWith(generate_html(elem,key_tree[key]))
                }
            }

            if(key_tree[key] == 'popup_window' && window.website_popup_opened == true){
                $('#website').find('.popup_container').removeClass('none')
            }
        }
    }
    try{
        select(window.selected)
    }catch{}
    set_website_default_classes();
}
//events
$('body').on('click', '.undo', function(e) {
    if ($('.undo').hasClass('header_icon_disabled')) { return; }
    undo();
})
$('body').on('click', '.redo', function(e) {
    if ($('.redo').hasClass('header_icon_disabled')) { return; }
    redo();
})