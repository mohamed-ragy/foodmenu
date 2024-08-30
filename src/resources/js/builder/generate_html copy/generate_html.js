require('./generate_style.js')
require('./generate_editing_elems.js')
require('./events.js')


generate_html = function(elem,key_tree){

    let html = '';
    let style = generate_style(elem);

    let text ='';
    if('text' in elem){
        if('val' in elem.text){
            if(typeof(elem.text.val[window.preview_language]) == 'undefined' || elem.text.val[window.preview_language] == ''){
                text = `<span style="font-weight: normal; font-style: normal; text-decoration: none; font-size: 1em;" class="format_container" placeholder="${texts.elems.enter_your_text}"></span>`
            }else{
                text = elem.text.val[window.preview_language]
            }
        }else{
            text = get_basic_text(elem.text.key)
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
    let attrs = ''
    if('attr' in elem){
        for(const key in elem['attr']){
            attrs = `${attrs} ${key}="${elem['attr'][key]}"`
        }
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
    //
    if(elem.type == 'elem'){
        attrs = `${attrs} elem="${elem.elem_type}"`
    }

    if(typeof(elem.tag) !== 'undefined'){
        html = '';
        let select_class = elem.type;
        if(elem.type == 'elem'){
            html = `${html}${generate_editing_elems_elem(elem,key_tree,style)}`;
            select_class = ''
        }
        else if(elem.type == 'section_block'){
            html = `${html}${generate_editing_elems_section_block(elem,key_tree,style)}`;
            select_class = ''
        }
        else if(elem.type == 'container'){
            html = `${html}${generate_editing_elems_container(elem,key_tree,style)}`;
            select_class = ''
        }
        // html = `${html}<${elem.tag} class="edit ${classes} ${select_class}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile : style.desktop }" key_tree="${key_tree}" ${attrs}`;
        html = `${html}<${elem.tag} class="edit ${classes} ${select_class}" key_tree="${key_tree}" ${attrs}`;
        if('accessibility' in elem){
            if(elem.accessibility.includes('hover') && !elem.accessibility.includes('parent_hover')){
                html = `${html} hover_style="null"`
            }
            if(elem.accessibility.includes('click') ){
                html = `${html} click_style="null"`
            }
            if(elem.accessibility.includes('focus') ){
                html = `${html} focus_style="null"`
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
    
        if('accessibility' in elem){
            if(elem.accessibility.includes('edit_text')){
                html = `${html} contenteditable="false" `
            }
        }
        html = `${html}>`
    
        if(elem.type == 'section_wrapper'){
            html = `${html}${generate_editing_elems_section_wrapper(elem,key_tree,style)}`;
        }
        else if(elem.type == 'section'){
            html = `${html}${generate_editing_elems_section(elem,key_tree,style)}`;
        }else if(elem.type == 'header_wrapper'){
            html = `${html}${generate_editing_elems_header_wrapper(elem,key_tree,style)}`;
        }else if(elem.type == 'header_component'){
            html = `${html}${generate_editing_elems_header_components(elem,key_tree,style)}`;
        }else if(elem.type == 'popup_card'){
            html = `${html}${generate_editing_elems_popup_window(elem,key_tree,style)}`
        }
    
    
        for(const key in elem.children){
            html = `${html}${generate_html(elem.children[key],`${key_tree}.children.${key}`)}`;
        }

        html = `${html}${text ?? ''}${elem_html ?? ''}</${elem.tag}>`;
    
        if(elem.type == 'elem' || elem.type == 'section_block' || elem.type == 'container'){
            html = `${html}</div>`;
        }
    
    }

    
    setTimeout(()=>{
        if(elem.general_class == '1'){
            let elem_atyle = generate_style(elem);
            $(`.${elem.class_selector}`).each(function(){
                $(this).attr('style',`${$(this).attr('style')}${elem_atyle.desktop}`)
            })
            
            if(elem.accessibility.includes('hover')){
                $(`.${elem.class_selector}`).attr('hover_style',key_tree)
            }
            if(elem.accessibility.includes('click')){
                $(`.${elem.class_selector}`).attr('click_style',key_tree)
            }
            if(elem.accessibility.includes('focus')){
                $(`.${elem.class_selector}`).attr('focus_style',key_tree)
            }
        }
    },100)

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
