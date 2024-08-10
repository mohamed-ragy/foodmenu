require('./generate_html/generate_style.js')
require('./generate_html/generate_editing_elems.js')
require('./generate_html/events.js')


generate_html = function(elem,key_tree){
    let html = '';
    let style = generate_style(elem);

    let text ='';
    if('text' in elem){
        if('val' in elem.text){
            text = elem.text.val[window.preview_language]
        }else{
            let text_key = elem.text.key.split('.')
            text =  window.website_texts.text[text_key[0]][text_key[1]]
        }
    }
    let elem_html = '';
    if('html' in elem){
        elem_html = elem['html'];
    }
    let classes = '';
    if('class_selector' in elem){
        if(elem.class_selector == 'header_icon_cart_num'){
            text = `${text}0`
        }
        classes = `${classes} ${elem.class_selector}`
    }

    if('class' in elem && elem.class != null){
        classes = `${classes} ${elem.class}`
    }

    let attrs = ''
    if('attr' in elem){
        for(const key in elem['attr']){
            attrs = `${attrs} ${key}="${elem['attr'][key]}"`
        }
    }
    if('animation' in elem){
        if(elem.animation.name != 'no_animation'){
            attrs = `${attrs} animation="${elem.animation.name}" `
        }
    }
    if('animation_mobile' in elem){
        if(elem.animation_mobile.name != 'no_animation'){
            attrs = `${attrs} animation_mobile="${elem.animation_mobile.name}" `
        }
    }
    //
    if(elem.type == 'elem'){
        attrs = `${attrs} elem="${elem.elem_type}"`
    }
    html = '';
    let select_class = elem.type;


    if(elem.type == 'elem'){
        html = `${html}${generate_editing_elems_elem(elem,key_tree,style)}`;
    }
    else if(elem.type == 'section_block'){
        html = `${html}${generate_editing_elems_section_block(elem,key_tree,style)}`;
    }
    // html = `${html}<${elem.tag} class="${classes} ${select_class}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile : style.desktop }" key_tree="${key_tree}" style_desktop="${style.desktop}" style_mobile="${style.mobile}" ${attrs}`;
    html = `${html}<${elem.tag} class="edit ${classes} ${select_class}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile : style.desktop }" key_tree="${key_tree}" ${attrs}`;
    if('accessibility' in elem){
        if(elem.accessibility.includes('hover')){
            html = `${html} hover_style="null"`
        }
        if(elem.accessibility.includes('click') ){
            html = `${html} click_style="null"`
        }
    }
    let parent_hover = null;
    if('children' in elem){
        for(const key in elem.children){
            if('accessibility' in elem.children[key]){
                if(elem.children[key].accessibility.includes('parent_hover')){
                    parent_hover == null ? parent_hover = `${key_tree}.children.${key}` : parent_hover = `${parent_hover}#${key_tree}.children.${key}`;
                }
            }
        }
    }
    parent_hover !== null ? html = `${html} parent_hover="${parent_hover}"` : null;

    html = `${html}>${text ?? ''}${elem_html ?? ''}`

    if(elem.type == 'section_wrapper'){
        html = `${html}${generate_editing_elems_section_wrapper(elem,key_tree,style)}`;
    }
    else if(elem.type == 'section'){
        html = `${html}${generate_editing_elems_section(elem,key_tree,style)}`;
    }else if(elem.type == 'header_wrapper'){
        html = `${html}${generate_editing_elems_header_wrapper(elem,key_tree,style)}`;
    }else if(elem.type == 'header_component'){
        html = `${html}${generate_editing_elems_header_components(elem,key_tree,style)}`;
    }



    for(const key in elem.children){
        html = `${html}${generate_html(elem.children[key],`${key_tree}.children.${key}`)}`;
    }
    html = `${html}</${elem.tag}>`;

    if(elem.type == 'elem' || elem.type == 'section_block'){
        html = `${html}</div>`;
    }

    return html;
}


reset_class_selectors = function(elem){
    let _small_hash = small_hash();
    if('class_selector' in elem){
        elem.class_selector = elem.class_selector+_small_hash;
    }
    if('text' in elem){
        if('key' in elem.text){
            elem.text.key = elem.text.key+_small_hash;
        }
    }
    if('children' in elem){
        for(const key in elem.children){
            reset_class_selectors(elem.children[key])
        }
    }
}
