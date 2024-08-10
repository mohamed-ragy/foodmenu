new_action = function(set_selectors = true, draw_website = true) {
    if(JSON.stringify(window.template) == JSON.stringify(window.template_edit_history[`_${window.template_current_edit}`])){
        return;
    }
    unset_preview_mode();
    deheighlight_all();
    for (const key in window.template_edit_history) {
        if (parseInt(key.replace('_', '')) > window.template_current_edit) {
            delete window.template_edit_history[key]
        }
    }

    window.template_current_edit++;
    window.template_edit_history[`_${window.template_current_edit}`] = JSON.parse(JSON.stringify(window.template))
    undo_redo_actions(set_selectors, draw_website);
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
    undo_redo_actions();
    fix_undo_redo_btns();
    hidePopupSelectors(true);
}
redo = function() {
    if (window.template_current_edit + 1 >= Object.keys(window.template_edit_history).length) { return; }
    window.template_current_edit++;
    window.template = JSON.parse(JSON.stringify(window.template_edit_history[`_${window.template_current_edit}`]))
    undo_redo_actions()
    fix_undo_redo_btns();
    hidePopupSelectors(true);
}

undo_redo_actions = function(set_selectors = true, draw_website = true) {
    set_template_vars();
    //
    if (draw_website) {
        $('.website_logo').attr('src', window.website_data.logo)
        $('.restaurant_name').text(window.website_data.websiteNames[window.preview_language]);
        //
        if (window.website_popup_opened) {
            show_popup_window();
        } else {
            $('.popup_container').css('display', 'none')
        }
        if (window.show_header_drop_down_list == true) {
            show_header_drop_down('foodmenu');
        }
        //
        draw_page(window.selected_page)
        set_adapted_header();
    }
    //
    set_view_style();
    select(window.selected);

    set_website_colors_vars();
    //
    if (set_selectors) {
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

        $('.editor_details_head').each(function(){
            try{
                set_editor_details($(this))
            }catch{}
        })
    }

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