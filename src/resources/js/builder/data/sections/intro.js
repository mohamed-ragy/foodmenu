// window.section_templates_intro = {};
get_section_templates_intro = function(){
    let intros = {};
    //tempalte 1
    intros[0] = JSON.parse(JSON.stringify(get_blank_section()));
    intros[0].children.section_wrapper = get_sections_layouts()[0];
    intros[0].background.type = 'image';
    intros[0].background_mobile.type = 'image';
    intros[0].background.background_image = '/storage/imgs/builder/background_placeholder.jpg';
    intros[0].background_mobile.background_image = '/storage/imgs/builder/background_placeholder.jpg';
    intros[0].children.section_wrapper.css['min-height'] = 'var(--screen_height_minus_header)';
    intros[0].children.section_wrapper.children[0].children.push(elem_title())
    intros[0].children.section_wrapper.children[0].children[0].sort = 0
    intros[0].children.section_wrapper.children[0].children[0].text.val[window.preview_language] = texts.elems.title_placeholder
    intros[0].children.section_wrapper.children[0].children.push(elem_paragraph())
    intros[0].children.section_wrapper.children[0].children[1].sort = 1
    intros[0].children.section_wrapper.children[0].children[1].text.val[window.preview_language] = texts.elems.paragraph_placeholder_short
    intros[0].children.section_wrapper.children[0].children.push(elem_button())
    intros[0].children.section_wrapper.children[0].children[2].sort = 2
    intros[0].children.section_wrapper.children[0].children[2].text.val[window.preview_language] = texts.elems.button_placeholder







    return intros
}
