let unchangeable_styles = ['transform','transform-origin','max-width','max-height','min-width','min-height','margin','align-self','height','width'];
$('body').on('mouseenter','[hover_style]',function(){
    let elem = get_elem_data($(this).attr('key_tree')).elem;
    apply_hover_style(elem);
})
$('body').on('mouseenter','[parent_hover]',function(){
    let elems = $(this).attr('parent_hover').split('#');
    for(const key in elems){
        let elem = get_elem_data(elems[key]).elem;
        apply_hover_style(elem);
    }
})
apply_hover_style = function(elem){
    let hover_styling = {};
    if(window.current_view == 'desktop'){
        for(const key in elem.css_hover){
            hover_styling[key] = elem.css_hover[key];
        }
        if('background_hover' in elem){
            set_background_style(elem.background_hover,hover_styling)
        }
    }
    else if(window.current_view == 'mobile'){
        for(const key in elem.css_hover_mobile){
            hover_styling[key] = elem.css_hover_mobile[key];
        }
        if('background_hover_mobile' in elem){
            set_background_style(elem.background_hover_mobile,hover_styling)
        }
    }
    
    for(const key in hover_styling){
        if(elem.type == 'elem' || elem.type == 'section_block'){
            if(key == 'transform' || key == 'transform-origin'){
                $(`.${elem.class_selector}`).parent().css(key,hover_styling[key])
            }
            if(!unchangeable_styles.includes(key) ){
                $(`.${elem.class_selector}`).css(key,hover_styling[key])
            }
        }else{
            $(`.${elem.class_selector}`).css(key,hover_styling[key])
        }
    }
}
$('body').on('mouseleave','[hover_style]',function(){
    let elem = get_elem_data($(this).attr('key_tree')).elem;
    remove_hover_style(elem);
})
$('body').on('mouseleave','[parent_hover]',function(){
    let elems = $(this).attr('parent_hover').split('#');
    for(const key in elems){
        let elem = get_elem_data(elems[key]).elem;
        remove_hover_style(elem);
    }
})
remove_hover_style = function(elem){
    let styling = {};
    if(window.current_view == 'desktop'){
        for(const key in elem.css){
            styling[key] = elem.css[key];
        }
        if('background' in elem){
            set_background_style(elem.background,styling)
        }
    }
    else if(window.current_view == 'mobile'){
        for(const key in elem.css_mobile){
            styling[key] = elem.css_mobile[key];
        }
        if('background_mobile' in elem){
            set_background_style(elem.background_mobile,styling)
        }
    }
    for(const key in styling){
        if(elem.type == 'elem' || elem.type == 'section_block'){
            if(key == 'transform' || key == 'transform-origin'){
                $(`.${elem.class_selector}`).parent().css(key,styling[key])
            }
            if(!unchangeable_styles.includes(key) ){
                $(`.${elem.class_selector}`).css(key,styling[key])
            }
        }else{
            $(`.${elem.class_selector}`).css(key,styling[key])
        }

    }
}
$('body').on('mousedown','[click_style]',function(){
    let elem = get_elem_data($(this).attr('key_tree')).elem;
    let click_styling;
    if(window.current_view == 'desktop'){click_styling = elem.css_click}
    else if(window.current_view == 'mobile'){click_styling = elem.css_click_mobile}
    for(const key in click_styling){
        if(elem.type == 'elem' || elem.type == 'section_block'){
            if(key == 'transform' || key == 'transform-origin'){
                $(this).parent().css(key,click_styling[key])
            }
            if(!unchangeable_styles.includes(key) ){
                $(this).css(key,click_styling[key])
            }
        }else{
            $(this).css(key,click_styling[key])
        }

    }
})
$('body').on('mouseup','[click_style]',function(){
    let elem = get_elem_data($(this).attr('key_tree')).elem;
    let hover_styling;
    if(window.current_view == 'desktop'){
        hover_styling = elem.css_hover;
        if('accessibility' in elem){
            if(!elem.accessibility.includes('hover')){
                hover_styling = elem.css;
            }
        }
    }
    else if(window.current_view == 'mobile'){
        hover_styling = elem.css_hover_mobile;
        if('accessibility' in elem){
            if(!elem.accessibility.includes('hover')){
                hover_styling = elem.css_mobile;
            }
        }
    }
    for(const key in hover_styling){
        if(elem.type == 'elem' || elem.type == 'section_block'){
            if(key == 'transform' || key == 'transform-origin'){
                $(this).parent().css(key,hover_styling[key])
            }
            if(!unchangeable_styles.includes(key) ){
                $(this).css(key,hover_styling[key])
            }
        }else{
            $(this).css(key,hover_styling[key])
        }

    }
})