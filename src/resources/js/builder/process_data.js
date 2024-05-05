process_data = function(r){
    window.website_data = r.website;
    for(const key in window.website_data.categories){
         window.website_data.categories[key].products = [];

        for(const key2 in window.website_data.products){
            if(window.website_data.products[key2].category_id == window.website_data.categories[key].id){
                window.website_data.categories[key].products.push(window.website_data.products[key2])
            }
        }
    }
    window.texts = r.texts;
    window.templates = r.templates;
    window.website_texts_langs = r.website_texts;
    // if(typeof(window.preview_language) === 'undefined' || window.preview_language == null){
    //     for(const key in window.website_data.languages){
    //         if(window.website_data.languages.websiteDefault == true){
    //             window.preview_language =
    //         }
    //     }
        // window.preview_language = window.website_data.languages.find(item=>item.websiteDefault == true);
    // }
    // console.log(window.preview_language)
    // window.website_texts = window.website_texts_langs.find(item=>item.lang == window.preview_language);
    // set_website_variable_data();
    //
    window.loading_spinners = [];
    //
    window.imgs = [];
    window.imgs_noMore = false;
    window.imgs_getMore = true;
    window.pexels_search_results = [];
    //

    window.selected_section_block = null;
    window.selected_section = null;
    window.selected_elem = null;
    window.selected_page = null;
    window.website_popup_opened = false;
    window.is_header_selected = false;
    //
    window.selected_inputList = null;
    window.selected_color_theme_picker = null;
    window.selected_font_style_selector = null;

    if( typeof(window.templates.find(item=>item._id == window.template_id)) === 'undefined' ){
        draw_select_template();
    }else{
        set_website_variable_data()
        draw_builder(window.template_id);
    }
    hide_page_loading();

    // show_editor_popup('loading_spinner')
}
//
set_website_variable_data = function(){
    window.website_texts = window.website_texts_langs.find(item=>item.lang == window.preview_language);
    window.website_texts.text.page_title = window.website_data.websiteNames[window.preview_language];
    window.website_texts.text.page_description = window.website_data.websiteDescriptions[window.preview_language];
}
