process_data = function(r){
    window.website = r.website;
    window.texts = r.texts;
    window.templates = r.templates;
    window.colors = r.colors;
    window.fonts = r.fonts;
    if( typeof(window.templates.find(item=>item._id == window.template_id)) === 'undefined' ){
        draw_select_template();
    }else{
        draw_builder(window.template_id);
    }
    hide_page_loading();
    // show_editor_popup('form_elements')
}
//
