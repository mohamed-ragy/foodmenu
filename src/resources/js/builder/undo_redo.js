new_action = function(){
    for(const key in window.template_edit_history){
        if(parseInt(key.replace('_','')) > window.template_current_edit ){
            delete window.template_edit_history[key]
        }
    }
    window.template_current_edit++;
    window.template_edit_history[`_${window.template_current_edit}`] = JSON.parse(JSON.stringify(window.template))
    undo_redo_actions();
    fix_undo_redo_btns();
}
fix_undo_redo_btns = function(){
    if(window.template_current_edit == 0){
        $('.undo').addClass('header_icon_disabled')
    }else{
        $('.undo').removeClass('header_icon_disabled')
    }

    if(window.template_current_edit + 1 < Object.keys(window.template_edit_history).length){
        $('.redo').removeClass('header_icon_disabled')
    }else{
        $('.redo').addClass('header_icon_disabled')
    }
    if(is_saved_checker()){
        $('#save').prop('disabled',true)
    }else{
        $('#save').prop('disabled',false)
    }
}
undo = function(){
    if(window.template_current_edit == 0){return;}
    window.template_current_edit--;
    window.template = JSON.parse(JSON.stringify(window.template_edit_history[`_${window.template_current_edit}`]))
    undo_redo_actions();
    fix_undo_redo_btns();
}
redo = function(){
    if(window.template_current_edit + 1 >= Object.keys(window.template_edit_history).length){return;}
    window.template_current_edit++;
    window.template = JSON.parse(JSON.stringify(window.template_edit_history[`_${window.template_current_edit}`]))
    undo_redo_actions()
    fix_undo_redo_btns();
}

undo_redo_actions = function(){
    set_website_colors_settings();
    //
    set_font_style_settings();
    //
    set_page_setup_settings();
    //
    set_form_elements_settings();
    //
    set_loading_spinner_settings();
    //
    if(window.selected_section_key_tree != null){
        draw_section(window.selected_section_key_tree)
    }
    //
    set_view_style();
}

//events
$('html,body').on('click','.undo',function(e){
    e.stopImmediatePropagation();
    if($('.undo').hasClass('header_icon_disabled')){return;}
    undo();
})
//events
$('html,body').on('click','.redo',function(e){
    e.stopImmediatePropagation();
    if($('.redo').hasClass('header_icon_disabled')){return;}
    redo();
})
