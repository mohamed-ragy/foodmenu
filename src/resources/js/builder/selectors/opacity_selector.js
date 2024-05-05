draw_opacity_selector = function(data){
    let elem_data = get_key_tree(data.keys_arr[0].key_tree);
    let elem_val = get_elem_val(elem_data,data.keys_arr[0].key,data.is_responsive ? '1' : '0');
    let selector;
    let selector_container = $('<div/>',{class:`editor_popup_row ${data.selector_container_class === false ? '' : 'selector_container'} ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0'}).append(
        $('<div/>',{class:'row alnC jstfyS'}).append(
            data.is_responsive ? responsive_icon(elem_val.responsive_class) : '',
            $('<div/>',{text:texts.styling.opacity}),
        ),
        selector = $('<div/>',{class:'selector opacity_container'}).append(
            $('<button/>',{class:'ico-arrowUp opacity_btn',key:'up',tooltip:elem_val.val}),
            $('<button/>',{class:'ico-arrowDown opacity_btn',key:'down',tooltip:elem_val.val}),
        )
    )
    for(const key in data.keys_arr){
        for(const key2 in data.keys_arr[key]){
            selector.attr(key2,data.keys_arr[key][key2]);
            selector.attr(key2,data.keys_arr[key][key2]);
        }
    }
    return selector_container;
}
set_opacity_selector = function(selector){
    let val = get_selector_val(selector);
    selector.find('.opacity_btn').attr('tooltip',val)
}
$('body').on('click','.opacity_btn',function(e){
    //e.stopImmediatePropagation();
    let selector = $(this).closest('.selector');
    let val = get_selector_val(selector);
    if($(this).attr('key') == 'up'){
        val = parseFloat(val) + .1;
    }else if($(this).attr('key') == 'down'){
        val = parseFloat(val) - .1;
    }
    if(val < 0){val = 0}
    if(val > 1){val = 1}
    val = Math.round(val * 10) / 10;
    set_elem_val($(this),val)
    $(this).closest('.opacity_container').find('.opacity_btn').attr('tooltip',val)
    updateToolTip();
    new_action();
    if($(this).closest('.selector_container').hasClass('opacity_elem_animation')){
        let elem = get_key_tree(selector.attr('key_tree').replace('.animation','').replace('.animation_mobile',''));
        let elem_animation = window.current_view == 'desktop' ? elem.elem.animation : window.current_view == 'mobile' ? elem.elem.animation_mobile : null;
        let animation_direction;
        if(selector.attr('key') == 'animationUp_opacity'){
            animation_direction = 'animationUp'
        }else if(selector.attr('key') == 'animationDown_opacity'){
            animation_direction = 'animationDown'
        }
        $('#website').find(`[key_tree="${elem.elem_key_tree}"]`).css({
            'transition-duration':'0ms',
            'transition-delay':'0ms',
            'transform':elem_animation[`${animation_direction}_transform`],
            'opacity':elem_animation[`${animation_direction}_opacity`],
            'backdrop-filter':elem_animation[`${animation_direction}_backdrop_filter`],
        })
    }
})
$('body').on('mouseenter','.opacity_btn',function(e){
    if(!$(this).closest('.selector_container').hasClass('opacity_elem_animation')){return;}
    let selector = $(this).closest('.selector');
    let elem = get_key_tree(selector.attr('key_tree').replace('.animation','').replace('.animation_mobile',''));
    let elem_animation = window.current_view == 'desktop' ? elem.elem.animation : window.current_view == 'mobile' ? elem.elem.animation_mobile : null;
    let animation_direction;
    if(selector.attr('key') == 'animationUp_opacity'){
        animation_direction = 'animationUp'
    }else if(selector.attr('key') == 'animationDown_opacity'){
        animation_direction = 'animationDown'
    }
    $('#website').find(`[key_tree="${elem.elem_key_tree}"]`).css({
        // 'transition-duration':'0ms',
        'transition-delay':'0ms',
        'transform':elem_animation[`${animation_direction}_transform`],
        'opacity':elem_animation[`${animation_direction}_opacity`],
        'backdrop-filter':elem_animation[`${animation_direction}_backdrop_filter`],
    })
})
$('body').on('mouseleave','.opacity_btn',function(e){
    if(!$(this).closest('.selector_container').hasClass('opacity_elem_animation')){return;}
    let selector = $(this).closest('.selector');
    let elem = get_key_tree(selector.attr('key_tree').replace('.animation','').replace('.animation_mobile',''));
    let elem_css = window.current_view == 'desktop' ? elem.elem.css : window.current_view == 'mobile' ? elem.elem.css_mobile : null;
    $('#website').find(`[key_tree="${elem.elem_key_tree}"]`).css({
        'transition-duration':elem_css['transition-duration'],
        'transition-delay':elem_css['transition-delay'],
        'transform':elem_css['transform'],
        'opacity':1,
        'backdrop-filter':elem_css['backdrop-filter'],
    })
})
