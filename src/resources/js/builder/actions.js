new_action = function(generate_style = '', render = '') {
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
    
    if(generate_style != ''){console.log(`generate style form action: ${generate_style}`);generate_website_style(generate_style)}
    if(render != ''){console.log(`render from action: ${render}`);render_website(render)}
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
    render_all();
    fix_undo_redo_btns();
    hidePopupSelectors(true);
}
redo = function() {
    if (window.template_current_edit + 1 >= Object.keys(window.template_edit_history).length) { return; }
    window.template_current_edit++;
    window.template = JSON.parse(JSON.stringify(window.template_edit_history[`_${window.template_current_edit}`]))
    render_all()
    render_website('all')
    set_all_editors();
    fix_undo_redo_btns();
    hidePopupSelectors(true);
}
render_all = function(){
    set_all_editors();
    render_website('all')

}
// undo_redo_actions = function(gaga) {
//     //
//     // set_template_vars();
//     //
//     // generate_website_style('all')

//     // if(render == 'all'){
//     //     render_page(window.selected_page);
//     //     render_website_header();
//     //     // render_header();
//     //     // render_popup(window.selected_popup);
//     // }else if(render != ''){
//     //     try{
//     //         let render_arr = render.split('.');
//     //         for(const key in render_arr){
//     //             if(render_arr[key] == 'page'){
//     //                 render_page(window.selected_page);
//     //             }else if(render_arr[key] == 'header'){
//     //                 render_website_header();
//     //                 // render_header();
//     //             }else if(render_arr[key] == 'popup'){
//     //                 // render_popup(window.selected_popup);
//     //             }
//     //         }
//     //     }catch{}
//     // }
//     // if (draw_website) {
//         // window.used_font_styles = [];
//         // $('.website_logo').attr('src', window.website_data.logo)
//         // $('.restaurant_name').text(window.website_data.websiteNames[window.preview_language]);
//         //
//         // if (window.website_popup_opened) {
//         //     show_popup_window(function(){
//         //         if(window.selected_page != null){
//         //             draw_popup(window.selected_popup)
//         //         }
//         //     });
//         //     $('#website').find('.popup_card').addClass('stop_transitions');
//         //     setTimeout(()=>{
//         //         $('#website').find('.popup_card').removeClass('stop_transitions');
//         //     },window.template.popup_window.children.popup_card.css['animation-duration'].replace('ms',''))
//         // } else {
//             // hide_popup_window();
//         // }

//         // if (!$('.header_drop_down_list').hasClass('none') && $('.header_drop_down_list').length > 0) {
//         //     show_header_drop_down_list('foodmenu');
//         // }
//         //
//         // render_page(window.selected_page)
//         // render_website_header();
//         // set_adapted_header();
//     // }
//     // select(window.selected);
//     //

// }
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
        if (window.website_popup_opened) {
            generate_elems_style(window.template.popup_window)
            generate_elems_style(window.template[selected_popup])
        }
    }else{
        let elem = get_element_data(generate);
        generate_elem_style(elem)
        console.log(`element style generated`,elem)
    }
}
render_website = function(render){
    if(render == 'all'){
        render_page(window.selected_page)
        render_website_header()
        // if(window.website_popup_opened){
            // show_popup_window(function(){
                draw_popup(window.selected_popup)
            // })
        // }
    }else{
        render = render.split('.');
        for(const key in render){
            if(render[key] == 'page'){
                render_page(window.selected_page)
            }
            if(render[key] == 'popup'){
                // show_popup_window(function(){
                    draw_popup(window.selected_popup)
                // })
            }
            if(render[key] == 'popup_window'){

            }
            if(render[key] == 'header'){
                render_website_header()

            }
        }
    }
    try{
        select(window.selected)
    }catch{}
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