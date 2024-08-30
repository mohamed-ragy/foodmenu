let unchangeable_styles = ['transform','transform-origin','max-width','max-height','min-width','min-height','margin','align-self','height','width'];
$('body').on('mouseenter','[hover_style]',function(){
    let key_tree = $(this).attr('key_tree');
    if($(this).attr('hover_style') !== 'null'){
        key_tree = $(this).attr('hover_style')
    }
    let elem = get_element_data(key_tree);
    apply_hover_style(elem,$(this));
})
$('body').on('mouseenter','[parent_hover]',function(){
    let elems = $(this).attr('parent_hover').split('#');
    for(const key in elems){
        let elem = get_element_data(elems[key]);
        apply_hover_style(elem,$(`.${elem.class_selector}`));
    }
})
apply_hover_style = function(elem,_elem){
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
        if(elem.type == 'elem' || elem.type == 'section_block' || elem.type == 'container'){
            if(key == 'transform' || key == 'transform-origin'){
                _elem.parent().css(key,hover_styling[key])
            }
            if(!unchangeable_styles.includes(key) ){
                _elem.css(key,hover_styling[key])
            }
        }else{
            _elem.css(key,hover_styling[key])
        }
    }
}
$('body').on('mouseleave','[hover_style]',function(){
    let key_tree = $(this).attr('key_tree');
    if($(this).attr('hover_style') !== 'null'){
        key_tree = $(this).attr('hover_style')
    }
    let elem = get_element_data(key_tree);
    remove_hover_style(elem,$(this));
})
$('body').on('mouseleave','[parent_hover]',function(){
    let elems = $(this).attr('parent_hover').split('#');
    for(const key in elems){
        let elem = get_element_data(elems[key]);
        remove_hover_style(elem,$(`.${elem.class_selector}`));
    }
})
remove_hover_style = function(elem,_elem){
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
        if(elem.type == 'elem' || elem.type == 'section_block' || elem.type == 'container'){
            if(key == 'transform' || key == 'transform-origin'){
                _elem.parent().css(key,styling[key])
            }
            if(!unchangeable_styles.includes(key) ){
                _elem.css(key,styling[key])
            }
        }else{
            _elem.css(key,styling[key])
        }

    }
}
$('body').on('mousedown','[click_style]',function(){
    let key_tree = $(this).attr('key_tree');
    if($(this).attr('click_style') !== 'null'){
        key_tree = $(this).attr('click_style')
    }
    let elem = get_element_data(key_tree);
    let click_styling;
    if(window.current_view == 'desktop'){click_styling = elem.css_click}
    else if(window.current_view == 'mobile'){click_styling = elem.css_click_mobile}
    for(const key in click_styling){
        if(elem.type == 'elem' || elem.type == 'section_block' || elem.type == 'container'){
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
    let key_tree = $(this).attr('key_tree');
    if($(this).attr('click_style') !== 'null'){
        key_tree = $(this).attr('click_style')
    }
    let elem = get_element_data(key_tree);
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
        if(elem.type == 'elem' || elem.type == 'section_block' || elem.type == 'container'){
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
//
$('body').on('focus','[focus_style]',function(){
    let key_tree = $(this).attr('key_tree');
    if($(this).attr('focus_style') !== 'null'){
        key_tree = $(this).attr('focus_style')
    }
    let elem = get_element_data(key_tree);
    let focus_styling;
    if(window.current_view == 'desktop'){focus_styling = elem.css_focus}
    else if(window.current_view == 'mobile'){focus_styling = elem.css_focus_mobile}
    console.log(focus_styling)
    for(const key in focus_styling){
        if(elem.type == 'elem' || elem.type == 'section_block' || elem.type == 'container'){
            if(key == 'transform' || key == 'transform-origin'){
                $(this).parent().css(key,focus_styling[key])
            }
            if(!unchangeable_styles.includes(key) ){
                $(this).css(key,focus_styling[key])
            }
        }else{
            $(this).css(key,focus_styling[key])
        }

    }
})
$('body').on('focusout','[focus_style]',function(){
    let key_tree = $(this).attr('key_tree');
    if($(this).attr('focus_style') !== 'null'){
        key_tree = $(this).attr('focus_style')
    }
    let elem = get_element_data(key_tree);
    let styling;
    if(window.current_view == 'desktop'){
        styling = elem.css;
    }
    else if(window.current_view == 'mobile'){
        styling = elem.css_mobile;
    }
    for(const key in styling){
        if(elem.type == 'elem' || elem.type == 'section_block' || elem.type == 'container'){
            if(key == 'transform' || key == 'transform-origin'){
                $(this).parent().css(key,styling[key])
            }
            if(!unchangeable_styles.includes(key) ){
                $(this).css(key,styling[key])
            }
        }else{
            $(this).css(key,styling[key])
        }

    }
})