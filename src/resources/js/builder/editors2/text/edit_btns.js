draw_edit_btns = function(elem,key_tree){
    let html = '';
    html = `${html}<button class="ico-settings contextMenu" key_tree="${key_tree}"></button>`;
    //
    if(elem.type == 'website_header'){
        html = `${html}
        <button class="fs101 ico-logo_restaurant_name editor_header_logo_alignment select set_editor_popup_editor" tooltip="${texts.styling.restauran_logo}" key_tree="website_header.children.header_wrapper.children.header_logo"></button>
        <button class="fs101 ico-navigation_list editor_header_navList select set_editor_popup_editor" tooltip="${texts.styling.header_navList}" key_tree="website_header.children.header_wrapper.children.header_navList"></button>
        <button class="fs101 ico-icon editor_header_iconsList select set_editor_popup_editor" tooltip="${texts.styling.header_iconsList}" key_tree="website_header.children.header_wrapper.children.header_iconsList"></button>
        <button class="fs101 ico-drop_down_list editor_header_drop_down_list select set_editor_popup_editor" tooltip="${texts.styling.drop_down_list}" key_tree="website_header.children.header_drop_down_list"></button>
        <button class="fs101 ico-mobile_navbar_icon editor_header_mobileNav_icon select set_editor_popup_editor" tooltip="${texts.styling.header_mobileNav_icon}" key_tree="website_header.children.header_wrapper.children.header_mobileNav_icon"></button>
        `
    }
    if(elem.type == 'popup_card'){
        html = `${html}
            <button class="fs101 ico-popup_window editor_popup_popup_widnow" tooltip="${texts.website_tools.popup_window}"></button>
            <button class="fs101 ico-close_icon editor_popup_popup_window_close_icon" tooltip="${texts.styling.close_icon}"></button>
        `
    }
    //
    if('accessibility' in elem){
        elem.accessibility.includes('website_form') ? html = `${html}<button class="ico-form editor_website_form" tooltip="${texts.website_style.website_form}" key_tree="${key_tree}"></button>` :null;
        
        elem.accessibility.includes('loading_spinner') ? html = `${html}<button class="ico-loading_spinner editor_loading_spinner" tooltip="${texts.styling.loading_spinner}" key_tree="${key_tree}"></button>` :null;
        elem.accessibility.includes('check_box') ? html = `${html}<button class="ico-check_box editor_check_box" tooltip="${texts.styling.check_box}" key_tree="${key_tree}"></button>` :null;
        elem.accessibility.includes('check_box_validation') ? html = `${html}<button class="ico-error editor_check_box_validation" tooltip="${texts.styling.validation_message}" key_tree="${key_tree}"></button>` :null;
        elem.accessibility.includes('input_box') ? html = `${html}<button class="ico-rename editor_input_box" tooltip="${texts.styling.input_box}" key_tree="${key_tree}"></button>` :null;
        elem.accessibility.includes('button') ? html = `${html}<button class="ico-button editor_button" tooltip="${texts.styling.button}" key_tree="${key_tree}"></button>` :null;
        elem.accessibility.includes('edit_text') ? html = `${html}<button class="ico-text edit_text" tooltip="${texts.edit_text}" key_tree="${key_tree}"></button>` :null;
        elem.accessibility.includes('text_style') ? html = `${html}<button class="ico-text_style editor_text_style" tooltip="${texts.styling.text_style}" key_tree="${key_tree}"></button>` :null;
        elem.accessibility.includes('select_image') ? html = `${html}<button class="ico-select_image select_image" tooltip="${texts.styling.select_image}" key_tree="${key_tree}"></button>` :null;
        elem.accessibility.includes('select_icon') ? html = `${html}<button class="ico-select_image editor_icon" tooltip="${texts.styling.select_icon}" key_tree="${key_tree}"></button>` :null;
        elem.accessibility.includes('select_font') ? html = `${html}<button class="ico-font_style select_font" tooltip="${texts.styling.font_style}" key_tree="${key_tree}"></button>` :null;
        elem.accessibility.includes('background') ? html = `${html}<button class="ico-background editor_background" tooltip="${texts.styling.background}" key_tree="${key_tree}"></button>` :null;
        elem.accessibility.includes('alignment') ? html = `${html}<button class="ico-alignment editor_alignment" tooltip="${texts.styling.alignment}" key_tree="${key_tree}"></button>` :null;
    
        elem.accessibility.includes('section_sizing') ? html = `${html}<button class="ico-sizing editor_section_sizing" tooltip="${texts.sizing}" key_tree="${key_tree}"></button>` :null;
        elem.accessibility.includes('section_spacing') ? html = `${html}<button class="ico-spacing editor_section_spacing" tooltip="${texts.spacing}" key_tree="${key_tree}"></button>` :null;
        elem.accessibility.includes('section_adapt_header') && elem.sort == 0 ? html = `${html}<button class="ico-header editor_section_adapt_header" tooltip="${texts.styling.adapt_header}" key_tree="${key_tree}"></button>` :null;
        elem.accessibility.includes('section_layout') ? html = `${html}<button class="ico-layout editor_section_layout" tooltip="${texts.section_layout}" key_tree="${key_tree}"></button>` :null;
        elem.accessibility.includes('section_driver') ? html = `${html}<button class="ico-driver editor_section_driver" tooltip="${texts.styling.section_driver}" key_tree="${key_tree}"></button>` :null;
        
    }


    return html;
}
show_edit_btns = function(key_tree){
    let elem = get_element_data(key_tree);
    hide_edit_btns();
    $('.edit_btns').append(draw_edit_btns(elem,key_tree));
    setTimeout(()=>{
        let animation_class = fix_edit_btns_position(elem,key_tree);
        if(animation_class == null){
            hide_edit_btns();
        }else{
            $('.edit_btns').removeClass('none').addClass(animation_class)
        }
    })
}
hide_edit_btns = function(){
    $('.edit_btns').text('').removeClass().addClass('edit_btns none builder_font');
}
fix_edit_btns_position = function(elem,key_tree){
    // try{
        let parent = get_element_parent_data(key_tree);
        let direction = 'row';
        let top = 'unset';
        let bottom = 'unset';
        let left = 'unset';
        let right = 'unset';
        let animation_class = '';
        switch(elem.type){
            case 'elem':
                animation_class = 'edit_btns_animation_slide_left';
                direction = 'column';
                top = `${$(`.${elem.class_selector}_container`).offset().top - 20}px`;
                left = `${$(`.${elem.class_selector}_container`).offset().left - 50}px`;
            break;
            case 'container':
                animation_class = 'edit_btns_animation_slide_left';
                direction = 'column';
                top = `${$(`.${elem.class_selector}_container`).offset().top - 20}px`;
                left = `${$(`.${elem.class_selector}_container`).offset().left - 50}px`;
            break;
            case 'section_block':
                animation_class = 'edit_btns_animation_slide_right';
                direction = 'column';
                top = `${$(`.${elem.class_selector}_container`).offset().top - 20}px`;
                left = `${$(`.${elem.class_selector}_container`).offset().left  + $(`.${elem.class_selector}`).outerWidth() + 10}px`;
            break;
            case 'section':
                direction = 'column';
                top = `${$(`.${elem.class_selector}`).offset().top +60}px`;
                if(window.current_view == 'desktop'){
                    animation_class = 'edit_btns_animation_slide_right';
                    left = `${$(`.${elem.class_selector}`).offset().left +10}px`;
                }else if(window.current_view == 'mobile'){
                    animation_class = 'edit_btns_animation_slide_left';
                    left = `${$(`.${elem.class_selector}`).offset().left -50}px`;
                }
                if(elem.attr.adapt_header == '1'){
                    top = `${$(`.${elem.class_selector}`).offset().top + 60 + $('.website_header').height()}px`;
                }
    
            break;
            case 'website_header':
                if(window.current_view == 'desktop'){
                    animation_class = 'edit_btns_animation_slide_down';
                    direction = 'row';
                    top = `${$(`.${elem.class_selector}`).offset().top + $(`.${elem.class_selector}`).outerHeight()}px`;
                    left = `${$(`.header_wrapper `).offset().left}px`;
                }else if(window.current_view == 'mobile'){
                    animation_class = 'edit_btns_animation_slide_up';
                    direction = 'row';
                    top = `${$(`.${elem.class_selector}`).offset().top - 45 }px`;
                    left = `${$(`.header_wrapper `).offset().left}px`;
                }
            break;
            case 'popup_card':
                animation_class = 'edit_btns_animation_slide_left';
                direction = 'column';
                top = `${$(`.${elem.class_selector}`).offset().top}px`;
                left = `${$(`.${elem.class_selector}`).offset().left - 50}px`;
            break;
            case 'form_elements':
                animation_class = 'edit_btns_animation_slide_left';
                direction = 'column';
                top = `${$(`.form_elements_selected`).offset().top}px`;
                left = `${$(`.form_elements_selected`).offset().left - 50}px`;
            break;
            case 'form_element':
                animation_class = 'edit_btns_animation_slide_left';
                direction = 'column';
                top = `${$(`.form_element_selected`).offset().top}px`;
                left = `${$(`.form_element_selected`).offset().left - 50}px`;
            break;
            default:
                return null;
            break;
        }
        $('.edit_btns').css({
            top:top,
            left:left,
            right:right,
            bottom:bottom,
            'flex-direction':direction,
        })
        
        return animation_class; 
    // }catch{}

}
