draw_filter_selector = function(data){
    return '';
    let elem_data = get_key_tree(data.keys_arr[0].key_tree);
    let elem_val = get_elem_val(elem_data,data.keys_arr[0].key,data.is_responsive ? '1':'0')
    let val = elem_val.val.split(' ');
    let opacity = val[0].replace('opacity(','').replace(')','');
    let blur = val[1].replace('blur(','').replace(')','');
    let brightness = val[2].replace('brightness(','').replace(')','');
    let contrast = val[3].replace('contrast(','').replace(')','');
    let saturate = val[4].replace('saturate(','').replace(')','');
    let grayscale = val[5].replace('grayscale(','').replace(')','');
    let hue_rotate = val[6].replace('hue-rotate(','').replace(')','');
    let invert = val[7].replace('invert(','').replace(')','');
    let sepia = val[8].replace('sepia(','').replace(')','');
    let shadow_x = val[9].replace('drop-shadow(','');
    let shadow_y = val[10];
    let shadow_blur = val[11];
    let shadow_color = val[12].replace(')','')
    let selector;
    let selector_container = $('<div/>',{class:`${data.selector_container_class === false ? '' : 'selector_container'} ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0',is_hover:data.is_hover ? '1' : '0'}).append(
        draw_selector_name({data:data,name:texts.styling.filter,name_class:'bold',responsive_class:elem_val.responsive_class,container_class:' w100p-30 mY10 mX15 pT10 mB20'}),
        selector = $('<div/>',{class:'selector filter_selector_container w100p'}).append(
            draw_dummy_select_range({
                name:texts.styling.opacity,
                val:opacity,
                range:{min:0,max:100,step:1},
                unit:'%',
                container_class:'filter_range_opacity',
            }),
            draw_dummy_select_range({
                name:texts.styling.blur,
                val:blur,
                range:{min:0,max:20,step:1},
                unit:'px',
                container_class:'filter_range_blur',
            }),
            draw_dummy_select_range({
                name:texts.styling.brightness,
                val:brightness,
                range:{min:0,max:200,step:1},
                unit:'%',
                container_class:'filter_range_brightness',
            }),
            draw_dummy_select_range({
                name:texts.styling.contrast,
                val:contrast,
                range:{min:0,max:200,step:1},
                unit:'%',
                container_class:'filter_range_contrast',
            }),
            draw_dummy_select_range({
                name:texts.styling.saturate,
                val:saturate,
                range:{min:0,max:200,step:1},
                unit:'%',
                container_class:'filter_range_saturate',
            }),
            draw_dummy_select_range({
                name:texts.styling.grayscale,
                val:grayscale,
                range:{min:0,max:100,step:1},
                unit:'%',
                container_class:'filter_range_grayscale',
            }),
            draw_dummy_select_range({
                name:texts.styling.hue_rotate,
                val:hue_rotate,
                range:{min:0,max:360,step:1},
                unit:'deg',
                container_class:'filter_range_hue_rotate',
            }),
            draw_dummy_select_range({
                name:texts.styling.invert,
                val:invert,
                range:{min:0,max:100,step:1},
                unit:'%',
                container_class:'filter_range_invert',
            }),
            draw_dummy_select_range({
                name:texts.styling.sepia,
                val:sepia,
                range:{min:0,max:100,step:1},
                unit:'%',
                container_class:'filter_range_sepia',
            }),
            $('<div/>',{class:'editor_popup_col'}).append(
                $('<div/>',{class:'fs09',text:texts.styling.drop_shadow}),
                $('<div/>',{class:'w100p'}).append(

                    draw_dummy_color_picker({
                        name:texts.styling.shadow_color,
                        color_picker_class:'filter_shadow_color',
                        val:shadow_color,
                        container_class:'editor_popup_row_border_top_none',
                    }),
                    draw_dummy_select_range({
                        name:texts.styling.shadow_blur,
                        val:shadow_blur,
                        range:{min:0,max:100,step:1},
                        unit:'px',
                        container_class:'filter_shadow_blur'
                    }),
                    $('<div/>',{class:'editor_popup_row mY5'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.shadow_offset}),
                        $('<div/>',{class:'column alnC jstfyE'}).append(
                            $('<div/>',{class:'row alnC jstfyC'}).append(
                                $('<div/>'),
                                $('<button/>',{class:'filter_shadow_btn filter_shadow_y_minus turbo ico-arrowUp',tooltip:shadow_y}),
                                $('<div/>'),
                            ),
                            $('<div/>',{class:'row alnC jstfyC'}).append(
                                $('<button/>',{class:'filter_shadow_btn filter_shadow_x_minus turbo ico-arrowLeft',tooltip:shadow_x}),
                                $('<button/>',{class:'filter_shadow_btn filter_shadow_center ico-dot_circle fs09',tooltip:texts.styling.center}),
                                $('<button/>',{class:'filter_shadow_btn filter_shadow_x_plus turbo ico-arrowRight',tooltip:shadow_x}),
                            ),
                            $('<div/>',{class:'row alnC jstfyC'}).append(
                                $('<div/>'),
                                $('<button/>',{class:'filter_shadow_btn filter_shadow_y_plus turbo ico-arrowDown',tooltip:shadow_y}),
                                $('<div/>'),
                            ),
                        )
                    ),
                )           
            ),
            $('<div/>',{class:'row alnC jstfyE pT10 pB20'}).append(
                $('<button/>',{class:'btn btn-cancel reset_filter fs09',text:texts.styling.reset_filters})
            )
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
set_filter_selector = function(selector){
    let val = get_selector_val(selector);
    if(val === null){
        val = get_default_style('filter').split(' ')
    }else{
        val = val.split(' ');
    }
    let opacity = val[0].replace('opacity(','').replace(')','');
    let blur = val[1].replace('blur(','').replace(')','');
    let brightness = val[2].replace('brightness(','').replace(')','');
    let contrast = val[3].replace('contrast(','').replace(')','');
    let saturate = val[4].replace('saturate(','').replace(')','');
    let grayscale = val[5].replace('grayscale(','').replace(')','');
    let hue_rotate = val[6].replace('hue-rotate(','').replace(')','');
    let invert = val[7].replace('invert(','').replace(')','');
    let sepia = val[8].replace('sepia(','').replace(')','');
    let shadow_x = val[9].replace('drop-shadow(','');
    let shadow_y = val[10];
    let shadow_blur = val[11];
    let shadow_color = val[12].replace(')','')
    set_dummy_select_range_slider(selector.find('.filter_range_opacity'),opacity)
    set_dummy_select_range_slider(selector.find('.filter_range_blur'),blur)
    set_dummy_select_range_slider(selector.find('.filter_range_brightness'),brightness)
    set_dummy_select_range_slider(selector.find('.filter_range_contrast'),contrast)
    set_dummy_select_range_slider(selector.find('.filter_range_saturate'),saturate)
    set_dummy_select_range_slider(selector.find('.filter_range_grayscale'),grayscale)
    set_dummy_select_range_slider(selector.find('.filter_range_hue_rotate'),hue_rotate)
    set_dummy_select_range_slider(selector.find('.filter_range_invert'),invert)
    set_dummy_select_range_slider(selector.find('.filter_range_sepia'),sepia)

    set_dummy_select_range_slider(selector.find('.filter_shadow_blur'),shadow_blur)
    set_dummy_color_picker(selector.find('.filter_shadow_color'),shadow_color)
    $('.filter_shadow_y_minus, .filter_shadow_y_plus').attr('tooltip',shadow_y)
    $('.filter_shadow_x_minus, .filter_shadow_x_plus').attr('tooltip',shadow_x)

    //

}

set_filter_val = function(selector,filter,filter_val,is_new_action=true){
    let val = get_selector_val(selector);
    if(val === null){
        val = get_default_style('filter').split(' ')
    }else{
        val = val.split(' ');
    }
    let new_val;
    let opacity = val[0].replace('opacity(','').replace(')','');
    let blur = val[1].replace('blur(','').replace(')','');
    let brightness = val[2].replace('brightness(','').replace(')','');
    let contrast = val[3].replace('contrast(','').replace(')','');
    let saturate = val[4].replace('saturate(','').replace(')','');
    let grayscale = val[5].replace('grayscale(','').replace(')','');
    let hue_rotate = val[6].replace('hue-rotate(','').replace(')','');
    let invert = val[7].replace('invert(','').replace(')','');
    let sepia = val[8].replace('sepia(','').replace(')','');
    let shadow_x = val[9].replace('drop-shadow(','');
    let shadow_y = val[10];
    let shadow_blur = val[11];
    let shadow_color = val[12].replace(')','')
    switch(filter){
        case 'opacity':opacity = filter_val;break;
        case 'blur':blur = filter_val;break;
        case 'brightness':brightness = filter_val;break;
        case 'contrast':contrast = filter_val;break;
        case 'saturate':saturate = filter_val;break;
        case 'grayscale':grayscale = filter_val;break;
        case 'hue_rotate':hue_rotate = filter_val;break;
        case 'invert':invert = filter_val;break;
        case 'sepia':sepia = filter_val;break;
        case 'shadow_blur':shadow_blur = filter_val;break;
        case 'shadow_x_plus':shadow_x = parseInt(shadow_x) + 1;break;
        case 'shadow_x_minus':shadow_x = parseInt(shadow_x) - 1;break;
        case 'shadow_y_plus':shadow_y = parseInt(shadow_y) + 1;break;
        case 'shadow_y_minus':shadow_y = parseInt(shadow_y) - 1;break;
        case 'shadow_color':shadow_color = filter_val;break;
        case 'shadow_center':shadow_x = 0;shadow_y=0;break; 
    }
    new_val = `opacity(${opacity}) blur(${blur}) brightness(${brightness}) contrast(${contrast}) saturate(${saturate}) grayscale(${grayscale}) hue-rotate(${hue_rotate}) invert(${invert}) sepia(${sepia}) drop-shadow(${parseInt(shadow_x)}px ${parseInt(shadow_y)}px ${shadow_blur} ${shadow_color})`
    set_elem_val(selector,new_val)
    if(is_new_action){
        new_action();
    }else{
        undo_redo_actions();
    }
    preview_elem_animation_on_website(selector.closest('.editor_popup_container').attr('parent_key'))
}
//
$('body').on('slide','.filter_range_opacity',function(e){
    set_filter_val($(this).closest('.selector'),'opacity',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.filter_range_blur',function(e){
    set_filter_val($(this).closest('.selector'),'blur',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.filter_range_brightness',function(e){
    set_filter_val($(this).closest('.selector'),'brightness',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.filter_range_contrast',function(e){
    set_filter_val($(this).closest('.selector'),'contrast',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.filter_range_saturate',function(e){
    set_filter_val($(this).closest('.selector'),'saturate',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.filter_range_grayscale',function(e){
    set_filter_val($(this).closest('.selector'),'grayscale',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.filter_range_hue_rotate',function(e){
    set_filter_val($(this).closest('.selector'),'hue_rotate',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.filter_range_invert',function(e){
    set_filter_val($(this).closest('.selector'),'invert',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.filter_range_sepia',function(e){
    set_filter_val($(this).closest('.selector'),'sepia',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.filter_shadow_blur',function(e){
    set_filter_val($(this).closest('.selector'),'shadow_blur',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.filter_shadow_blur',function(e){
    set_filter_val($(this).closest('.selector'),'shadow_blur',$(this).find('.select_range_slider').attr('slider_val'))
})
$(document).on('input','.filter_shadow_color',function(e){
    set_filter_val($(this).closest('.selector'),'shadow_color',$(this).val(),false)
})
$(document).on('change','.shadow_color_picker',function(e){
    set_filter_val($(this).closest('.selector'),'shadow_color',$(this).val())
})
$('body').on('click','.filter_shadow_x_plus',function(e){
    set_filter_val($(this).closest('.selector'),'shadow_x_plus',null)
})
$('body').on('click','.filter_shadow_x_minus',function(e){
    set_filter_val($(this).closest('.selector'),'shadow_x_minus',null)
})
$('body').on('click','.filter_shadow_y_plus',function(e){
    set_filter_val($(this).closest('.selector'),'shadow_y_plus',null)
})
$('body').on('click','.filter_shadow_y_minus',function(e){
    set_filter_val($(this).closest('.selector'),'shadow_y_minus',null)
})
$('body').on('click','.filter_shadow_center',function(e){
    set_filter_val($(this).closest('.selector'),'shadow_center',null)
})
$('body').on('click','.reset_filter',function(e){
    let new_val = get_default_style('filter');
    let selector = $(this).closest('.selector')
    set_elem_val(selector,new_val)
    new_action();
})