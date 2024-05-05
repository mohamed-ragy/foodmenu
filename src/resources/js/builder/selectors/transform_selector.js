draw_transform_selector = function(data){
    let elem_data = get_key_tree(data.keys_arr[0].key_tree);
    let elem_val = get_elem_val(elem_data,data.keys_arr[0].key,data.is_responsive ? '1':'0')
    let selector;
    let val = elem_val.val.split(' ');
    let translate = val[0];
    let rotate = val[1];
    let scale = val[2];
    translate = translate.replace('translate(','').replace(')','').split(',');
    rotate = rotate.replace('rotateZ(','').replace(')','');
    scale = scale.replace('scale(','').replace(')','')

    let selector_container = $('<div/>',{class:`editor_popup_row ${data.selector_container_class === false ? '' : 'selector_container'} ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0'}).append(
        $('<div/>',{class:'row alnC jstfyS'}).append(
            data.is_responsive ? responsive_icon(elem_val.responsive_class) : '',
            $('<div/>',{text:texts.styling.transform}),
        ),
        selector = $('<div/>',{class:'selector transform_btns_container'}).append(
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>',{class:'transform_btn turbo ico-rotate_l',transform_direction:'rotate_l',tooltip:rotate}),
                $('<div/>',{class:'transform_btn turbo ico-arrowUp',transform_direction:'up',tooltip:translate[1]}),
                $('<div/>',{class:'transform_btn turbo ico-rotate_r',transform_direction:'rotate_r',tooltip:rotate}),
                $('<div/>'),
            ),
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>',{class:'transform_btn turbo ico-arrowLeft',transform_direction:'left',tooltip:translate[0]}),
                $('<div/>',{class:'transform_btn ico-dot_circle',transform_direction:'center'}),
                $('<div/>',{class:'transform_btn turbo ico-arrowRight',transform_direction:'right',tooltip:translate[0]}),
            ),
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>'),
                $('<div/>',{class:'transform_btn turbo ico-scale_up',transform_direction:'scale_up',tooltip:scale}),
                $('<div/>',{class:'transform_btn turbo ico-arrowDown',transform_direction:'down',tooltip:translate[1]}),
                $('<div/>',{class:'transform_btn turbo ico-scale_down',transform_direction:'scale_down',tooltip:scale}),
            ),
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
set_transform_selector = function(selector){
    let val = get_selector_val(selector);
    val = val.split(' ');
    let translate = val[0];
    let rotate = val[1];
    let scale = val[2];
    translate = translate.replace('translate(','').replace(')','').split(',');
    rotate = rotate.replace('rotateZ(','').replace(')','');
    scale = scale.replace('scale(','').replace(')','')
    selector.find('.transform_btn[transform_direction="rotate_l"]').attr('tooltip',rotate)
    selector.find('.transform_btn[transform_direction="rotate_r"]').attr('tooltip',rotate)
    selector.find('.transform_btn[transform_direction="up"]').attr('tooltip',translate[1])
    selector.find('.transform_btn[transform_direction="down"]').attr('tooltip',translate[1])
    selector.find('.transform_btn[transform_direction="right"]').attr('tooltip',translate[0])
    selector.find('.transform_btn[transform_direction="left"]').attr('tooltip',translate[0])
    selector.find('.transform_btn[transform_direction="scale_up"]').attr('tooltip',scale)
    selector.find('.transform_btn[transform_direction="scale_down"]').attr('tooltip',scale)
}
$('body').on('click','.transform_btn',function(e){
    //e.stopImmediatePropagation();
    let selector = $(this).closest('.selector');
    let val = get_selector_val(selector);
    val = val.split(' ');
    let translate = val[0];
    let rotate = val[1];
    let scale = val[2];
    translate = translate.replace('translate(','').replace(')','').replaceAll('px','').split(',');
    rotate = rotate.replace('rotateZ(','').replace(')','').replace('deg','');
    scale = scale.replace('scale(','').replace(')','')
    switch ($(this).attr('transform_direction')) {
        case 'right':
            translate[0] = parseInt(translate[0]) + 1
        break;
        case 'left':
            translate[0] = parseInt(translate[0]) - 1
        break;
        case 'up':
            translate[1] = parseInt(translate[1]) - 1
        break;
        case 'down':
            translate[1] = parseInt(translate[1]) + 1
        break;
        case 'center':
            translate[0] = '0';
            translate[1] = '0';
            rotate = '0';
            scale = '1';
        break;
        case 'rotate_r':
            rotate = parseInt(rotate) + 1;
        break;
        case 'rotate_l':
            rotate = parseInt(rotate) - 1;
        break;
        case 'scale_up':
            scale = parseFloat(scale) + 0.01;
            scale = Math.round(scale * 100) / 100;

        break;
        case 'scale_down':
            scale = parseFloat(scale) - 0.01;
            scale = Math.round(scale * 100) / 100;

        break;
    }
    let new_val = `translate(${translate[0]}px,${translate[1]}px) rotateZ(${rotate}deg) scale(${scale})`;
    set_elem_val($(this),new_val)
    set_transform_selector(selector)
    new_action();
    if($(this).closest('.selector_container').hasClass('transform_elem_animation')){
        let elem = get_key_tree(selector.attr('key_tree').replace('.animation','').replace('.animation_mobile',''));
        let elem_animation = window.current_view == 'desktop' ? elem.elem.animation : window.current_view == 'mobile' ? elem.elem.animation_mobile : null;
        let animation_direction;
        if(selector.attr('key') == 'animationUp_transform'){
            animation_direction = 'animationUp'
        }else if(selector.attr('key') == 'animationDown_transform'){
            animation_direction = 'animationDown'
        }
        $('#website').find(`[key_tree="${elem.elem_key_tree}"]`).css({
            'transition-duration':'0ms',
            'transition-delay':'0ms',
            'transform':elem_animation[`${animation_direction}_transform`],
            'opacity':elem_animation[`${animation_direction}_opacity`] == 0 ? 0.1 : elem_animation[`${animation_direction}_opacity`],
        })
    }
})
$('body').on('mouseenter','.transform_btn',function(e){
    if(!$(this).closest('.selector_container').hasClass('transform_elem_animation')){return;}
    let selector = $(this).closest('.selector');
    let elem = get_key_tree(selector.attr('key_tree').replace('.animation','').replace('.animation_mobile',''));
    let elem_animation = window.current_view == 'desktop' ? elem.elem.animation : window.current_view == 'mobile' ? elem.elem.animation_mobile : null;
    let animation_direction;
    if(selector.attr('key') == 'animationUp_transform'){
        animation_direction = 'animationUp'
    }else if(selector.attr('key') == 'animationDown_transform'){
        animation_direction = 'animationDown'
    }
    $('#website').find(`[key_tree="${elem.elem_key_tree}"]`).css({
        // 'transition-duration':'0ms',
        'transition-delay':'0ms',
        'transform':elem_animation[`${animation_direction}_transform`],
        'opacity':elem_animation[`${animation_direction}_opacity`] == 0 ? 0.1 : elem_animation[`${animation_direction}_opacity`],
    })
})

$('body').on('mouseleave','.transform_btn',function(e){
    if(!$(this).closest('.selector_container').hasClass('transform_elem_animation')){return;}
    let selector = $(this).closest('.selector');
    let elem = get_key_tree(selector.attr('key_tree').replace('.animation','').replace('.animation_mobile',''));
    let elem_css = window.current_view == 'desktop' ? elem.elem.css : window.current_view == 'mobile' ? elem.elem.css_mobile : null;
    $('#website').find(`[key_tree="${elem.elem_key_tree}"]`).css({
        'transition-duration':elem_css['transition-duration'],
        'transition-delay':elem_css['transition-delay'],
        'transform':elem_css['transform'],
        'opacity':1,
    })
})
