draw_transform_selector = function(data){
    return '';
    let elem_data = get_key_tree(data.keys_arr[0].key_tree);
    let transform = get_elem_val(elem_data,data.keys_arr[0].key,data.is_responsive ? '1':'0').val
    let selector;
    transform = transform.split(' ');
    let translate = transform[0];
    let rotate_x = transform[1];
    let rotate_y = transform[2];
    let rotate_z = transform[3];
    let scale_x = transform[4];
    let scale_y = transform[5];
    translate = translate.replace('translate(','').replace(')','').split(',');
    rotate_x = rotate_x.replace('rotateX(','').replace(')','');
    rotate_y = rotate_y.replace('rotateY(','').replace(')','');
    rotate_z = rotate_z.replace('rotateZ(','').replace(')','');
    scale_x = scale_x.replace('scaleX(','').replace(')','')
    scale_y = scale_y.replace('scaleY(','').replace(')','')

    let translate_tooltip = `<span class="fs09">x</span>:${parseInt(translate[0])}, <span class="fs09">y</span>:${parseInt(translate[1])}`;
    let scale_tooltip = `<span class="fs09">x</span>:${parseFloat(scale_x)}, <span class="fs09">y</span>:${parseFloat(scale_y)}`;
    let selector_container = $('<div/>',{class:`w100p ${data.selector_container_class === false ? '' : 'selector_container'} ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0',is_hover:data.is_hover ? '1':'0'}).append(
        draw_selector_name({data:data,name:texts.styling.transform,responsive_class:transform.responsive_class,container_class:'w100p-30 mY10 mX15 bold'}),
        $('<div/>',{class:'transform_selector_container'}).append(
            selector = $('<div/>',{class:'w100p selector transform_selector'}).append(
                $('<div/>',{class:'editor_popup_row editor_popup_row_border_top_none'}).append(
                    $('<div/>',{class:'fs09',text:texts.styling.translate}),
                    $('<div/>',{class:'transform_btns_container'}).append(
                        $('<div/>',{class:'row alnC jstfyC'}).append(
                            $('<button/>',{class:'transform_btn turbo ico-arrowUp',transform_direction:'up',tooltip:translate_tooltip}),
                        ),
                        $('<div/>',{class:'row alnC jstfyC'}).append(
                            $('<button/>',{class:'transform_btn turbo ico-arrowLeft',transform_direction:'left',tooltip:translate_tooltip}),
                            $('<button/>',{class:'transform_btn turbo ico-border',transform_direction:'translate_center',tooltip:texts.styling.center}),
                            $('<button/>',{class:'transform_btn turbo ico-arrowRight',transform_direction:'right',tooltip:translate_tooltip}),
                        ),
                        $('<div/>',{class:'row alnC jstfyC'}).append(
                            $('<button/>',{class:'transform_btn turbo ico-arrowDown',transform_direction:'down',tooltip:translate_tooltip}),
                        ),
                    ),
                ),
                $('<div/>',{class:'editor_popup_row'}).append(
                    $('<div/>',{class:'fs09',text:texts.styling.rotate}),
                    $('<div/>',{class:'row alnC jstfyC'}).append(
                        $('<div/>',{class:'column alnC jstfyC'}).append(
                            $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_z_plus fs102',transform_direction:'rotate_z_plus',tooltip:rotate_z}),
                            $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_center fs09',transform_direction:'rotate_z_center',tooltip:texts.styling.center}),
                            $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_z_minus fs102',transform_direction:'rotate_z_minus',tooltip:rotate_z}),
                        ),
                        $('<div/>',{class:'column alnC jstfyC mX5'}).append(
                            $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_x_plus fs103',transform_direction:'rotate_x_plus',tooltip:rotate_x}),
                            $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_center fs09',transform_direction:'rotate_x_center',tooltip:texts.styling.center}),
                            $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_x_minus fs103',transform_direction:'rotate_x_minus',tooltip:rotate_x}),
                        ),
                        $('<div/>',{class:'column alnC jstfyC'}).append(
                            $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_y_plus fs104',transform_direction:'rotate_y_plus',tooltip:rotate_y}),
                            $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_center fs09',transform_direction:'rotate_y_center',tooltip:texts.styling.center}),
                            $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-rotate_y_minus fs104',transform_direction:'rotate_y_minus',tooltip:rotate_y}),
                        ),

                    )
                ),
                $('<div/>',{class:'editor_popup_row'}).append(
                    $('<div/>',{class:'fs09',text:texts.styling.scale}),
                    $('<div/>',{class:'column alnC jstfyC'}).append(
                        $('<div/>',{class:'row alnC jstfyC'}).append(
                            $('<div/>',{class:'transform_scale_btn dummy_transform_btn'}),
                            $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-scale_up  fs102',transform_direction:'scale_v_up',tooltip:scale_y}),
                            $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-scale_up  fs102',transform_direction:'scale_up',tooltip:scale_tooltip}),
                        ),
                        $('<div/>',{class:'row alnC jstfyC'}).append(
                            $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-scale_down  fs102',transform_direction:'scale_h_down',tooltip:scale_x}),
                            $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-border',transform_direction:'scale_center',tooltip:texts.styling.center}),
                            $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-scale_up  fs102',transform_direction:'scale_h_up',tooltip:scale_x}),

                        ),
                        $('<div/>',{class:'row alnC jstfyC'}).append(
                            $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-scale_down  fs102',transform_direction:'scale_down',tooltip:scale_tooltip}),
                            $('<button/>',{class:'transform_scale_btn transform_btn turbo ico-scale_down  fs102',transform_direction:'scale_v_down',tooltip:scale_y}),
                            $('<div/>',{class:'transform_scale_btn dummy_transform_btn'}),
                        )
                    )
                ),
            ),
        ),
    )
    for(const key in data.keys_arr){
        for(const key2 in data.keys_arr[key]){
            selector.attr(key2,data.keys_arr[key][key2]);
            selector.attr(key2,data.keys_arr[key][key2]);
        }
    }
    return selector_container;
}
set_transform_selector = function(transform_selector_container){
    let transform = get_selector_val(transform_selector_container.find('.transform_selector'));
    transform = transform.split(' ');
    let translate = transform[0];
    let rotate_x = transform[1];
    let rotate_y = transform[2];
    let rotate_z = transform[3];
    let scale_x = transform[4];
    let scale_y = transform[5];
    translate = translate.replace('translate(','').replace(')','').replaceAll('px','').split(',');
    rotate_x = rotate_x.replace('rotateX(','').replace(')','');
    rotate_y = rotate_y.replace('rotateY(','').replace(')','');
    rotate_z = rotate_z.replace('rotateZ(','').replace(')','');
    scale_x = scale_x.replace('scaleX(','').replace(')','')
    scale_y = scale_y.replace('scaleY(','').replace(')','')

    let translate_tooltip = `<span class="fs09">x</span>:${parseInt(translate[0])}, <span class="fs09">y</span>:${parseInt(translate[1])}`;
    let scale_tooltip = `<span class="fs09">x</span>:${parseFloat(scale_x)}, <span class="fs09">y</span>:${parseFloat(scale_y)}`;

    transform_selector_container.find('.transform_btn[transform_direction="rotate_x_minus"]').attr('tooltip',rotate_x)
    transform_selector_container.find('.transform_btn[transform_direction="rotate_x_plus"]').attr('tooltip',rotate_x)

    transform_selector_container.find('.transform_btn[transform_direction="rotate_y_minus"]').attr('tooltip',rotate_y)
    transform_selector_container.find('.transform_btn[transform_direction="rotate_y_plus"]').attr('tooltip',rotate_y)
    
    transform_selector_container.find('.transform_btn[transform_direction="rotate_z_minus"]').attr('tooltip',rotate_z)
    transform_selector_container.find('.transform_btn[transform_direction="rotate_z_plus"]').attr('tooltip',rotate_z)

    transform_selector_container.find('.transform_btn[transform_direction="up"]').attr('tooltip',translate_tooltip)
    transform_selector_container.find('.transform_btn[transform_direction="down"]').attr('tooltip',translate_tooltip)
    transform_selector_container.find('.transform_btn[transform_direction="right"]').attr('tooltip',translate_tooltip)
    transform_selector_container.find('.transform_btn[transform_direction="left"]').attr('tooltip',translate_tooltip)

    transform_selector_container.find('.transform_btn[transform_direction="scale_up"]').attr('tooltip',scale_tooltip)
    transform_selector_container.find('.transform_btn[transform_direction="scale_down"]').attr('tooltip',scale_tooltip)

    transform_selector_container.find('.transform_btn[transform_direction="scale_h_down"]').attr('tooltip',scale_x)
    transform_selector_container.find('.transform_btn[transform_direction="scale_h_up"]').attr('tooltip',scale_x)

    transform_selector_container.find('.transform_btn[transform_direction="scale_v_down"]').attr('tooltip',scale_y)
    transform_selector_container.find('.transform_btn[transform_direction="scale_v_up"]').attr('tooltip',scale_y)

    updateToolTip();
}
$('body').on('click','.transform_btn',function(e){
    let transform_selector_container = $(this).closest('.transform_selector_container');
    let transform = get_selector_val(transform_selector_container.find('.transform_selector'));
    transform = transform.split(' ');
    let translate = transform[0];
    let rotate_x = transform[1];
    let rotate_y = transform[2];
    let rotate_z = transform[3];
    let scale_x = transform[4];
    let scale_y = transform[5];
    translate = translate.replace('translate(','').replace(')','').replaceAll('px','').split(',');
    rotate_x = rotate_x.replace('rotateX(','').replace('deg','').replace(')','');
    rotate_y = rotate_y.replace('rotateY(','').replace('deg','').replace(')','');
    rotate_z = rotate_z.replace('rotateZ(','').replace('deg','').replace(')','');
    scale_x = scale_x.replace('scaleX(','').replace(')','')
    scale_y = scale_y.replace('scaleY(','').replace(')','')
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
        case 'translate_center':
            translate[0] = '0';
            translate[1] = '0';
        break;


        case 'rotate_x_plus':
            rotate_x = parseInt(rotate_x) + 1;
        break;
        case 'rotate_x_minus':
            rotate_x = parseInt(rotate_x) - 1;
        break;
        case 'rotate_y_plus':
            rotate_y = parseInt(rotate_y) + 1;
        break;
        case 'rotate_y_minus':
            rotate_y = parseInt(rotate_y) - 1;
        break;
        case 'rotate_z_plus':
            rotate_z = parseInt(rotate_z) + 1;
        break;
        case 'rotate_z_minus':
            rotate_z = parseInt(rotate_z) - 1;
        break;
        case 'rotate_x_center':
            rotate_x = 0;
        break;
        case 'rotate_y_center':
            rotate_y = 0;
        break;
        case 'rotate_z_center':
            rotate_z = 0;
        break;
        case 'scale_up':
            scale_x = parseFloat(scale_x) + 0.01;
            scale_x = Math.round(scale_x * 100) / 100;
            scale_y = parseFloat(scale_y) + 0.01;
            scale_y = Math.round(scale_y * 100) / 100;
        break;
        case 'scale_h_up':
            scale_x = parseFloat(scale_x) + 0.01;
            scale_x = Math.round(scale_x * 100) / 100;
        break;
        case 'scale_v_up':
            scale_y = parseFloat(scale_y) + 0.01;
            scale_y = Math.round(scale_y * 100) / 100;
        break;
        case 'scale_down':
            scale_x = parseFloat(scale_x) - 0.01;
            scale_x = Math.round(scale_x * 100) / 100;
            scale_y = parseFloat(scale_y) - 0.01;
            scale_y = Math.round(scale_y * 100) / 100;
        break;
        case 'scale_h_down':
            scale_x = parseFloat(scale_x) - 0.01;
            scale_x = Math.round(scale_x * 100) / 100;
        break;
        case 'scale_v_down':
            scale_y = parseFloat(scale_y) - 0.01;
            scale_y = Math.round(scale_y * 100) / 100;
        break;
        case 'scale_center':
            scale_y = 1;
            scale_x = 1;
        break;
    }
    let new_transform = `translate(${translate[0]}px,${translate[1]}px) rotateX(${rotate_x}deg) rotateY(${rotate_y}deg) rotateZ(${rotate_z}deg) scaleX(${scale_x}) scaleY(${scale_y})`;
    set_elem_val($(this).closest('.transform_selector_container').find('.transform_selector'),new_transform);
    set_transform_selector(transform_selector_container)
    new_action();
    preview_elem_animation_on_website(transform_selector_container.find('.selector').closest('.editor_popup_container').attr('parent_key'))
})
