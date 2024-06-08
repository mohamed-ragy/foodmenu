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
    // console.log('undo_redo_actions triggered')
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
            // $('*').not('.format').addClass('stop_transitions');
            // scroll_elem_animation('top');
            // setTimeout(()=>{
            // $('*').removeClass('stop_transitions')
            // },10)
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
        // set_responsive_selector();
        set_hover_selector();
        $('.rename_editor').each(function(){
            set_rename_editor($(this));
        })
        $('.number_picker_editor').each(function(){
            set_number_picker($(this));
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
        // $('.input_editor_popup_section_name').each(function(){
        //     if(typeof($(this).attr('key_tree')) !== 'undefined'){
        //         try{
        //             let section_name = get_key_tree($(this).attr('key_tree')).elem.name;
        //             $(this).val(section_name);
        //         }catch{}
        //     }
        // })
        // $('.number_picker_container').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_number_picker($(this));
        //         } catch {}
        //     }
        // })
        // $('.select_box_container').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_select_box($(this))
        //         } catch {}

        //     }
        // })
        // $('.select_range_container').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_select_range_slider($(this));
        //         } catch {}

        //     }
        // })
        // $('.transform_selector_container').each(function() {
        //     // if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_transform_selector($(this))
        //         } catch {}
        //     // }
        // })
        // $('.image_position_btns_container').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_image_position_selector($(this))
        //         } catch {}
        //     }
        // })
        // $('.inputList_container').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_input_list($(this))
        //         } catch {}
        //     }
        // })
        // $('.font_style_selector_container').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_font_style_selector($(this))
        //         } catch {}
        //     }
        // })
        // $('.color_picker_container').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_color_picker($(this))
        //         } catch {}
        //     }
        // })
        // $('.switch_btn_action').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_switch_btn($(this))
        //         } catch {}
        //     }
        // })
        // $('.border_style_selector_container').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_border_style_selector($(this));
        //         } catch {}
        //     }
        // })
        // $('.drop_shadow_selector_container').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_drop_shadow_select($(this))
        //         } catch {}
        //     }
        // })
        // $('.editor_popup_img_select').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_image_selector($(this))
        //         } catch {}
        //     }
        // })
        // $('.backdrop_filter_selector_container').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_backdrop_filter_selector($(this))
        //         } catch {}
        //     }
        // })
        // $('.filter_selector_container').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_filter_selector($(this))
        //         } catch {}
        //     }
        // })
        // $('.timing_functions_preview_container').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_timing_function_selector($(this))
        //         } catch {}
        //     }
        // })
        // $('.rename_selector').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_rename_selector($(this))
        //         } catch {}
        //     }
        // })
        // $('.select_icon').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_icon_selctor($(this))
        //         } catch {}
        //     }
        // })
        // $('.text_shadow_settings_container').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_text_shadow_selector($(this))
        //         } catch {}
        //     }
        // })


        // $('.zindex_container').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_zindex_selector($(this))
        //         } catch {}
        //     }
        // })
        // $('.opacity_container').each(function() {
        //     if (typeof($(this).closest('.selector').attr('key_tree')) !== 'undefined') {
        //         try {
        //             set_opacity_selector($(this))
        //         } catch {}
        //     }
        // })
        // $('.elem_text_selector_editor').each(function() {
        //     if (typeof($(this).attr('key_tree')) !== 'undefined') {
        //         try {
        //             if ($(this).is(':hover') == false) {
        //                 $(this).html(get_key_tree($(this).attr('key_tree')).elem.text.val[$(this).attr('lang')])
        //             }
        //         } catch {}
        //     }
        // })
        // $('.animations_preview_container').each(function(){
        //     if(typeof($(this).attr('key_tree')) !== 'undefined'){
        //         try{
        //             set_animation_selector($(this))
        //         }catch{}
        //     }
        // })
    }

}

//events
$('body').on('click', '.undo', function(e) {
        // e.stopImmediatePropagation();
        if ($('.undo').hasClass('header_icon_disabled')) { return; }
        undo();
    })
    //events
$('body').on('click', '.redo', function(e) {
    // e.stopImmediatePropagation();
    if ($('.redo').hasClass('header_icon_disabled')) { return; }
    redo();
})