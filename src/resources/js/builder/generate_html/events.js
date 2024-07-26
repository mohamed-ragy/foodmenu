$('body').on('mouseenter','[hover_style]',function(){
    let elem = get_elem_data($(this).attr('key_tree')).elem;
    let hover_styling;
    if(window.current_view == 'desktop'){hover_styling = elem.css_hover}
    else if(window.current_view == 'mobile'){hover_styling = elem.css_hover_mobile}
    for(const key in hover_styling){
        $(this).css(key,hover_styling[key])
    }
})
$('body').on('mouseleave','[hover_style]',function(){
    let elem = get_elem_data($(this).attr('key_tree')).elem;
    let styling;
    if(window.current_view == 'desktop'){styling = elem.css}
    else if(window.current_view == 'mobile'){styling = elem.css_mobile}
    let unchangeable_styles = ['transform','transform-origin','max-width','max-height','min-width','min-height','margin','align-self','height','width'];
    for(const key in styling){
        if(!unchangeable_styles.includes(key) ){
            $(this).css(key,styling[key])
        }
    }
})
$('body').on('mousedown','[click_style]',function(){
    let elem = get_elem_data($(this).attr('key_tree')).elem;
    let click_styling;
    if(window.current_view == 'desktop'){click_styling = elem.css_click}
    else if(window.current_view == 'mobile'){click_styling = elem.css_click_mobile}
    for(const key in click_styling){
        $(this).css(key,click_styling[key])
    }
})
$('body').on('mouseup','[click_style]',function(){
    let elem = get_elem_data($(this).attr('key_tree')).elem;
    let hover_styling;
    if(window.current_view == 'desktop'){hover_styling = elem.css_hover}
    else if(window.current_view == 'mobile'){hover_styling = elem.css_hover_mobile}
    for(const key in hover_styling){
        $(this).css(key,hover_styling[key])
    }
})