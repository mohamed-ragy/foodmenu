draw_backdrop_filter = function(data){
    return '';
    let elem_data = get_key_tree(data.keys_arr[0].key_tree);
    console.log(elem_data)
    let elem_val = get_elem_val(elem_data,data.keys_arr[0].key,data.is_responsive ? '1':'0')
    let val = elem_val.val.split(' ');
    let blur = val[0].replace('blur(','').replace(')','');
    let brightness = val[1].replace('brightness(','').replace(')','');
    let contrast = val[2].replace('contrast(','').replace(')','');
    let saturate = val[3].replace('saturate(','').replace(')','');
    let grayscale = val[4].replace('grayscale(','').replace(')','');
    let hue_rotate = val[5].replace('hue-rotate(','').replace(')','');
    let invert = val[6].replace('invert(','').replace(')','');
    let sepia = val[7].replace('sepia(','').replace(')','');

    let filter_color_keys_arr = [];
    for(const key in data.keys_arr){
        filter_color_keys_arr.push({
            key_tree:data.keys_arr[key].key_tree,
            key:'backdrop_filter_color'
        })
    }
    let selector;
    let selector_container = $('<div/>',{class:`selector_container ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0',is_hover:data.is_hover ? '1' : '0'}).append(
        draw_selector_name({data:data,name:texts.styling.filter_settings,name_class:'bold',responsive_class:elem_val.responsive_class,container_class:' w100p-30 mY10 mX15 pT10 mB20'}),
        selector = $('<div/>',{class:'selector backdrop_filter_selector_container w100p'}).append(
            draw_color_picker({
                keys_arr:filter_color_keys_arr,
                name:texts.styling.filter_color,
                is_hover:data.is_hover,
                is_responsive:data.is_responsive,
                hover_icon:false,
                responsive_icon:false,
                selector_container_class:false,
                style:'row',
                container_class:'editor_popup_row_border_top_none',
            }),
            draw_dummy_select_range({
                name:texts.styling.blur,
                val:blur,
                range:{min:0,max:20,step:1},
                unit:'px',
                container_class:'backdrop_filter_range_blur',
            }),
            draw_dummy_select_range({
                name:texts.styling.brightness,
                val:brightness,
                range:{min:0,max:200,step:1},
                unit:'%',
                container_class:'backdrop_filter_range_brightness',
            }),
            draw_dummy_select_range({
                name:texts.styling.contrast,
                val:contrast,
                range:{min:0,max:200,step:1},
                unit:'%',
                container_class:'backdrop_filter_range_contrast',
            }),
            draw_dummy_select_range({
                name:texts.styling.saturate,
                val:saturate,
                range:{min:0,max:200,step:1},
                unit:'%',
                container_class:'backdrop_filter_range_saturate',
            }),
            draw_dummy_select_range({
                name:texts.styling.grayscale,
                val:grayscale,
                range:{min:0,max:100,step:1},
                unit:'%',
                container_class:'backdrop_filter_range_grayscale',
            }),
            draw_dummy_select_range({
                name:texts.styling.hue_rotate,
                val:hue_rotate,
                range:{min:0,max:360,step:1},
                unit:'deg',
                container_class:'backdrop_filter_range_hue_rotate',
            }),
            draw_dummy_select_range({
                name:texts.styling.invert,
                val:invert,
                range:{min:0,max:100,step:1},
                unit:'%',
                container_class:'backdrop_filter_range_invert',
            }),
            draw_dummy_select_range({
                name:texts.styling.sepia,
                val:sepia,
                range:{min:0,max:100,step:1},
                unit:'%',
                container_class:'backdrop_filter_range_sepia',
            }),
            $('<div/>',{class:'row alnC jstfyE pT10 pB20'}).append(
                $('<button/>',{class:'btn btn-cancel reset_backdrop_filter fs09',text:texts.styling.reset_filters})
            )
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
set_backdrop_filter_selector = function(selector){
    let val = get_selector_val(selector);
    if(val === null){
        val = get_default_style('backdrop-filter').split(' ')
    }else{
        val = val.split(' ');
    }
    let blur = val[0].replace('blur(','').replace(')','');
    let brightness = val[1].replace('brightness(','').replace(')','');
    let contrast = val[2].replace('contrast(','').replace(')','');
    let saturate = val[3].replace('saturate(','').replace(')','');
    let grayscale = val[4].replace('grayscale(','').replace(')','');
    let hue_rotate = val[5].replace('hue-rotate(','').replace(')','');
    let invert = val[6].replace('invert(','').replace(')','');
    let sepia = val[7].replace('sepia(','').replace(')','');
    set_dummy_select_range_slider(selector.find('.backdrop_filter_range_blur'),blur)
    set_dummy_select_range_slider(selector.find('.backdrop_filter_range_brightness'),brightness)
    set_dummy_select_range_slider(selector.find('.backdrop_filter_range_contrast'),contrast)
    set_dummy_select_range_slider(selector.find('.backdrop_filter_range_saturate'),saturate)
    set_dummy_select_range_slider(selector.find('.backdrop_filter_range_grayscale'),grayscale)
    set_dummy_select_range_slider(selector.find('.backdrop_filter_range_hue_rotate'),hue_rotate)
    set_dummy_select_range_slider(selector.find('.backdrop_filter_range_invert'),invert)
    set_dummy_select_range_slider(selector.find('.backdrop_filter_range_sepia'),sepia)

}

//
$('body').on('click','.reset_backdrop_filter',function(e){
    let new_val = get_default_style('backdrop-filter');
    let selector = $(this).closest('.selector')
    set_elem_val(selector,new_val)
    new_action();
})
//
set_backdrop_filter_val = function(selector,filter,filter_val){
    let val = get_selector_val(selector);
    if(val === null){
        val = get_default_style('backdrop-filter').split(' ')
    }else{
        val = val.split(' ');
    }
    let new_val;
    let blur = val[0].replace('blur(','').replace(')','');
    let brightness = val[1].replace('brightness(','').replace(')','');
    let contrast = val[2].replace('contrast(','').replace(')','');
    let saturate = val[3].replace('saturate(','').replace(')','');
    let grayscale = val[4].replace('grayscale(','').replace(')','');
    let hue_rotate = val[5].replace('hue-rotate(','').replace(')','');
    let invert = val[6].replace('invert(','').replace(')','');
    let sepia = val[7].replace('sepia(','').replace(')','');
    switch(filter){
        case 'blur':blur = filter_val;break;
        case 'brightness':brightness = filter_val;break;
        case 'contrast':contrast = filter_val;break;
        case 'saturate':saturate = filter_val;break;
        case 'grayscale':grayscale = filter_val;break;
        case 'hue_rotate':hue_rotate = filter_val;break;
        case 'invert':invert = filter_val;break;
        case 'sepia':sepia = filter_val;break;
    }
    new_val = `blur(${blur}) brightness(${brightness}) contrast(${contrast}) saturate(${saturate}) grayscale(${grayscale}) hue-rotate(${hue_rotate}) invert(${invert}) sepia(${sepia})`
    set_elem_val(selector,new_val)
    new_action();
}
$('body').on('slide','.backdrop_filter_range_blur',function(e){
    set_backdrop_filter_val($(this).closest('.selector'),'blur',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.backdrop_filter_range_brightness',function(e){
    set_backdrop_filter_val($(this).closest('.selector'),'brightness',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.backdrop_filter_range_contrast',function(e){
    set_backdrop_filter_val($(this).closest('.selector'),'contrast',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.backdrop_filter_range_saturate',function(e){
    set_backdrop_filter_val($(this).closest('.selector'),'saturate',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.backdrop_filter_range_grayscale',function(e){
    set_backdrop_filter_val($(this).closest('.selector'),'grayscale',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.backdrop_filter_range_hue_rotate',function(e){
    set_backdrop_filter_val($(this).closest('.selector'),'hue_rotate',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.backdrop_filter_range_invert',function(e){
    set_backdrop_filter_val($(this).closest('.selector'),'invert',$(this).find('.select_range_slider').attr('slider_val'))
})
$('body').on('slide','.backdrop_filter_range_sepia',function(e){
    set_backdrop_filter_val($(this).closest('.selector'),'sepia',$(this).find('.select_range_slider').attr('slider_val'))
})
//
