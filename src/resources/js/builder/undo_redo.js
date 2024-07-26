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
        draw_website_header_html()
        $('.website_logo').attr('src', window.website_data.logo)
        $('.restaurant_name').text(window.website_data.websiteNames[window.preview_language]);
        //
        if (window.is_header_selected) {
            $('.website_header').addClass('selected_header')
        }
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
        draw_website_checkbox()
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
            set_dummy_select_range($('.website_color_picker_gradation'),window.template.website_colors.gradation[`${$('.website_color_picker[is_selected="1"]').attr('key')}_gradation`])
        }
        $('.rename_editor').each(function(){
            set_rename_editor($(this));
        })
        $('.number_picker_editor').each(function(){
            set_number_picker($(this));
        })
        $('.select_range').each(function(){
            set_select_range($(this))
        })
        $('.inputList_editor').each(function(){
            set_input_list($(this))
        })
        $('.select_box_editor').each(function(){
            set_select_box($(this))
        })
        $('.switch_btn').each(function(){
            set_switch_btn($(this))
        })
        $('.color_picker_editor').each(function(){
            set_color_picker($(this))
        })
        $('.gradient_editor').each(function(){
            set_gradient_editor($(this));
        })
        $('.select_image_editor').each(function(){
            set_select_image($(this));
        })
        $('.image_position_editor').each(function(){
            set_image_position_editor($(this))
        })
        $('.select_background_filter').each(function(){
            set_select_background_filter($(this));
        })
        $('.backdrop_filter_editor').each(function(){
            set_backdrop_filter_editor($(this));
        })
        $('.border_editors').each(function(){
            set_border_editors($(this));
        })
        $('.box_shadow_editor').each(function(){
            set_box_shadow_editor($(this));
        })
        $('.font_picker_editor').each(function(){
            set_font_style_picker($(this));
        })
        $('.text_editor').each(function(){
            set_text_editor($(this));
        })
        $('.filter_editor').each(function(){
            set_filter_editor($(this));
        })
        $('.transform_editor').each(function(){
            set_transform_editor($(this));
        })
        $('.animation_editor').each(function(){
            set_animation_editor($(this));
        })
        $('.timing_function_editor').each(function(){
            set_timing_function_editor($(this));
        })
        $('.aspect_ratio_editor').each(function(){
            set_aspect_ratio_editor($(this));
        })
        $('.button_function_editor').each(function(){
            set_button_function_editor($(this));
        })
        $('.four_number_pickers_editor').each(function(){
            set_four_number_pickers($(this));
        })
        $('.png_icon_selector_editor').each(function(){
            set_png_icon_selector($(this));
        })

        $('.editor_details_head').each(function(){
            set_editor_details($(this))
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