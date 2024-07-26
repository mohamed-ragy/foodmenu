process_data = function(r) {
        window.website_data = r.website;
        for (const key in window.website_data.categories) {
            window.website_data.categories[key].products = [];
            for (const key2 in window.website_data.products) {
                if (window.website_data.products[key2].category_id == window.website_data.categories[key].id) {
                    window.website_data.categories[key].products.push(window.website_data.products[key2])
                }
            }
        }
        window.texts = r.texts;
        window.templates = r.templates;
        window.website_texts_langs = r.website_texts;
        window.fonts = r.fonts;
        //
        // window.loading_spinners = [];
        //
        window.imgs = [];
        window.imgs_noMore = false;
        window.imgs_getMore = true;
        window.pexels_search_results = [];
        window.select_image_editor = null;
        //

        window.selected_page = null;
        window.website_popup_opened = false;//maybe will be deleted and use window.selected
        window.is_header_selected = false;//maybe will be deleted and use window.selected
        window.selected;
        window.builder_clipboard = null;
        //
        window.selected_inputList = null;
        window.selected_color_picker_editor = null;
        window.selected_number_picker = null;

        if (typeof(window.templates.find(item => item._id == window.template_id)) === 'undefined') {
            draw_select_template();
        } else {
            set_website_variable_data()
            draw_builder(window.template_id);
        }
        hide_page_loading();

    }
    //
set_website_variable_data = function() {
    window.website_texts = window.website_texts_langs.find(item => item.lang == window.preview_language);
    window.website_texts.text.page_title = window.website_data.websiteNames[window.preview_language];
    window.website_texts.text.page_description = window.website_data.websiteDescriptions[window.preview_language];
}
