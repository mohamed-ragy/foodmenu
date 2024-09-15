require('./generate_style.js')
require('./generate_editing_elems.js')
// require('./events.js')
generate_html_sort_children = function(elem){
    if(elem.type == 'header_component'){
        if(elem.header_component == 'header_navList' || elem.header_component == 'header_iconsList'){
            elem.children.sort((a,b)=>{
                return a.attr.sort - b.attr.sort;
            })
        }
    }else{
        try{
            elem.children.sort((a,b)=>{
                return a.sort - b.sort;
            })
        }catch{}
    }
}
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
    let classes = [];
    if('class_selector' in elem){classes.push(elem.class_selector)};
    if('class' in elem){
        let elem_classes = elem.class.split(' ');
        for(const key in elem_classes){
            classes.push(elem_classes[key]);
        }
    }
    if('general_class_selector' in elem){
        classes.push(elem.general_class_selector)
    }
    if(elem.type != 'elem' && elem.type != 'section_block' && elem.type != 'container'){
        classes.push(elem.type ?? '');
    }

    classes = classes.filter((item, index) => classes.indexOf(item) === index);

    let classes_str = '';
    for(const key in classes){
        if(classes_str == ''){classes_str = classes[key]}
        else{
            classes_str = `${classes_str} ${classes[key]}`
        }
    }

    return classes_str;
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
    if('animation' in elem && window.current_view == 'desktop'){
        if(elem.animation.name != 'no_animation'){
            attrs = `${attrs} animation="true" `
        }
    }
    if('animation_mobile' in elem){
        if(elem.animation_mobile.name != 'no_animation' && window.current_view == 'mobile'){
            attrs = `${attrs} animation="true" `
        }
    }
    return attrs;
}
filter_key_tree = function(elem,key_tree){
    if(elem.general_class_selector == 'website_form'){
        return 'form_elements.website_form';
    }
    return key_tree;
}
generate_html = function(elem,key_tree){
    key_tree = filter_key_tree(elem,key_tree);
    if('children' in elem){
        generate_html_sort_children(elem);
    }
    if('accessibility' in elem){
        if(elem.accessibility.includes('parent_hover')){
            let parent_key_tree = get_parent_key_tree(key_tree)
            generate_elem_style(get_element_data(parent_key_tree));
        }
    }

    let html = '';
    if(elem.tag !== undefined){
        if(elem.type == 'elem' || elem.type == 'section_block' || elem.type == 'container'){
            html = `${html}<div class="${elem.class_selector ?? ''}_container ${elem.general_class_selector ? `${elem.general_class_selector}_container` : ''} ${elem.type}" key_tree="${key_tree}">`;
            html = `${html}${genrate_editing_elems(elem,key_tree)}`;
        }

        let contenteditable = '';
        if('accessibility' in elem){
            if(elem.accessibility.includes('edit_text')){
            contenteditable =`contenteditable="false"`
            }
        }
        let general_html = '';
        if('general_html' in elem){
            general_html = generate_html(get_element_data(elem.general_html),elem.general_html)
        }
        html = `${html}<${elem.tag} class="edit ${get_elem_class(elem)}" ${get_elem_attrs(elem)} key_tree="${key_tree}" ${contenteditable}>${get_elem_text(elem)}${elem.html ?? ''}${general_html}`;

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