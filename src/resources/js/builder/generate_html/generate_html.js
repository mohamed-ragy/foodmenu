require('./generate_style.js')
require('./generate_editing_elems.js')
// require('./events.js')

get_elem_text = function(elem){
    let text = '';
    if('text' in elem){
        if('val' in elem.text){
            if(elem.text.val[window.preview_language] === undefined || elem.text.val[window.preview_language] == ''){
                text = `<span style="font-weight: normal; font-style: normal; text-decoration: none; font-size: 1em;" class="format_container" placeholder="${texts.elems.enter_your_text}"></span>`
            }else{
                text = elem.text.val[window.preview_language];
            }
        }else{
            text = get_basic_text(elem.text.key);
        }
    }
    elem.class_selector == 'header_icon_cart_num' ? text = `${text}0` : null;
    return text;
}
get_elem_class = function(elem){
    let classes = '';
    if('class_selector' in elem){classes = `${classes} ${elem.class_selector}`};
    if('class' in elem){classes = `${classes} ${elem.class}`};
    if(elem.type != 'elem' && elem.type != 'section_block' && elem.type != 'container'){
        classes = `${classes} ${elem.type}`
    }
    return classes;
}
get_elem_attrs = function(elem){
    let attrs = ''
    if('attr' in elem){
        for(const key in elem['attr']){
            attrs = `${attrs} ${key}="${elem['attr'][key]}"`
        }
    }
    if(elem.type == 'elem'){
        attrs = `${attrs} elem="${elem.elem_type}"`
    }

    if('placeholder' in elem){
        attrs = `${attrs} placeholder="${get_basic_text(elem.placeholder.key)}"`
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
    return attrs;
}
generate_html = function(elem,key_tree){

    let html = '';
    if(elem.tag !== undefined){
        if(elem.type == 'elem' || elem.type == 'section_block' || elem.type == 'container'){
            html = `${html}<div class="${elem.class_selector}_container ${elem.type}" key_tree="${key_tree}">`;
            html = `${html}${genrate_editing_elems(elem,key_tree)}`;
        }

        let contenteditable = '';
        if('accessibility' in elem){
            if(elem.accessibility.includes('edit_text')){
            contenteditable =`contenteditable="false"`
            }
        }

        html = `${html}<${elem.tag} class="edit ${get_elem_class(elem)}" ${get_elem_attrs(elem)} key_tree="${key_tree}" ${contenteditable}>${get_elem_text(elem)}`;

        if(elem.type != 'elem' && elem.type != 'section_block' && elem.type != 'container'){
            html = `${html}${genrate_editing_elems(elem,key_tree)}`;
        }

        for(const key in elem.children){
            html = `${html}${generate_html(elem.children[key],`${key_tree}.children.${key}`)}`;
        }

        html = `${html}</${elem.tag}>`;

        if(elem.type == 'elem' || elem.type == 'section_block' || elem.type == 'container'){
            html = `${html}</div>`;
        }
    }
    generate_elem_style(elem);
    
    if('font_style' in elem){
        for(const key in elem.font_style){
            let font_name = elem.font_style[key];
            if(font_name != '' && !window.used_font_styles.includes(font_name)){
                window.used_font_styles.push(font_name)
            }
            if(font_name != '' && !window.loaded_fonts.includes(font_name)){
                load_font_style(font_name)
            }
        }
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
get_basic_text = function(text_key){
    let text = window.website_texts.text;
    let text_key_tree = text_key.split('.')
    for(const key in text_key_tree){
        text = text[text_key_tree[key]]
    }
    return text;
}