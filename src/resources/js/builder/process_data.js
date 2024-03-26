process_data = function(r){
    window.website = r.website;
    window.texts = r.texts;
    window.templates = r.templates;
    window.website_texts = r.website_texts;
    set_website_texts();
    window.colors = [];
    window.fonts = [];
    window.loading_spinners = [];
    window.imgs = [];
    window.imgs_noMore = false;
    window.imgs_getMore = true;
    //
    window.selected_section = null;
    window.selected_page = null;
    if( typeof(window.templates.find(item=>item._id == window.template_id)) === 'undefined' ){
        draw_select_template();
    }else{
        draw_builder(window.template_id);
    }
    hide_page_loading();
    // show_editor_popup('loading_spinner')
}
//
set_website_texts = function(){
    window.window.preview_language = window.website_texts.lang;
    window.website_texts.text.page_title = window.website.websiteNames[window.preview_language];
    window.website_texts.text.page_description = window.website.websiteDescriptions[window.preview_language];
}
