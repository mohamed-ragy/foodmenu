draw_filter_editor = function(data){
    let editor = $('<div/>',{
        class:`editor filter_editor ${data.editor_class ?? ''}`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        render:data.render ?? data.key_tree,
    }).append(
        $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.opacity}),
            draw_select_range({
                dummy:true,
                dummy_class:'filter_range_opacity',
                range:{min:0,max:100,step:1},
                unit:'%',
            }),
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.blur}),
            draw_select_range({
                dummy:true,
                dummy_class:'filter_range_blur',
                range:{min:0,max:100,step:1},
                unit:'px',
            }),
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.brightness}),
            draw_select_range({
                dummy:true,
                dummy_class:'filter_range_brightness',
                range:{min:0,max:200,step:1},
                unit:'%',
            }),
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.contrast}),
            draw_select_range({
                dummy:true,
                dummy_class:'filter_range_contrast',
                range:{min:0,max:200,step:1},
                unit:'%',
            }),
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.saturate}),
            draw_select_range({
                dummy:true,
                dummy_class:'filter_range_saturate',
                range:{min:0,max:200,step:1},
                unit:'%',
            }),
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.grayscale}),
            draw_select_range({
                dummy:true,
                dummy_class:'filter_range_grayscale',
                range:{min:0,max:100,step:1},
                unit:'%',
            }),
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.hue_rotate}),
            draw_select_range({
                dummy:true,
                dummy_class:'filter_range_hue_rotate',
                range:{min:0,max:360,step:1},
                unit:'deg',
            }),
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.invert}),
            draw_select_range({
                dummy:true,
                dummy_class:'filter_range_invert',
                range:{min:0,max:100,step:1},
                unit:'%',
            }),
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.sepia}),
            draw_select_range({
                dummy:true,
                dummy_class:'filter_range_sepia',
                range:{min:0,max:100,step:1},
                unit:'%',
            }),
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09 bold',text:texts.styling.drop_shadow}),
            $('<div/>',{class:'w100p'}).append(
                $('<div/>',{class:'editor_popup_box_shadow_row editor_popup_brdrT_none'}).append(
                    $('<div/>',{class:'fs085',text:texts.styling.color}),
                     draw_color_picker({
                        dummy:true,
                        dummy_class:'filter_box_shadow_color',
                    })
                ),
                $('<div/>',{class:'editor_popup_box_shadow_row'}).append(
                    $('<div/>',{class:'fs085',text:texts.styling.offset_x}),
                    draw_number_picker({
                        dummy:true,
                        dummy_class:'filter_box_shadow_offset_x',
                        units:['px'],
                    })
                ),
                $('<div/>',{class:'editor_popup_box_shadow_row'}).append(
                    $('<div/>',{class:'fs085',text:texts.styling.offset_y}),
                    draw_number_picker({
                        dummy:true,
                        dummy_class:'filter_box_shadow_offset_y',
                        units:['px'],
                    })
                ),
                $('<div/>',{class:'editor_popup_box_shadow_row'}).append(
                    $('<div/>',{class:'fs085',text:texts.styling.blur}),
                    draw_number_picker({
                        dummy:true,
                        dummy_class:'filter_box_shadow_blur',
                        units:['px'],
                    })
                ),
            )           
        ),
        $('<div/>',{class:'row alnC jstfyE pT10 pB20'}).append(
            $('<button/>',{class:'btn btn-cancel reset_filter fs09',text:texts.styling.reset_filters})
        )
    )

    return editor;
}
set_filter_editor = function(editor){
    let val = get_editor_val(editor);
    if(val == '--' || val === undefined){
        val = get_default_style('filter_undefined').split(' ')
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
    let shadow_color = val[12].replace('))',')')
    set_dummy_select_range(editor.find('.filter_range_opacity'),opacity)
    set_dummy_select_range(editor.find('.filter_range_blur'),blur)
    set_dummy_select_range(editor.find('.filter_range_brightness'),brightness)
    set_dummy_select_range(editor.find('.filter_range_contrast'),contrast)
    set_dummy_select_range(editor.find('.filter_range_saturate'),saturate)
    set_dummy_select_range(editor.find('.filter_range_grayscale'),grayscale)
    set_dummy_select_range(editor.find('.filter_range_hue_rotate'),hue_rotate)
    set_dummy_select_range(editor.find('.filter_range_invert'),invert)
    set_dummy_select_range(editor.find('.filter_range_sepia'),sepia)
    set_dummy_number_picker(editor.find('.filter_box_shadow_offset_x'),shadow_x)
    set_dummy_number_picker(editor.find('.filter_box_shadow_offset_y'),shadow_y)
    set_dummy_number_picker(editor.find('.filter_box_shadow_blur'),shadow_blur)
    set_dummy_color_picker(editor.find('.filter_box_shadow_color'),shadow_color)
}

set_filter_val = function(editor,filter,filter_val){
    let val = get_editor_val(editor);
    if(val === null || val === undefined){
        val = get_default_style('filter').split(' ')
        filter = null;
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
    let shadow_color = val[12].replace('))',')')
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
        case 'shadow_x': shadow_x = filter_val;break;
        case 'shadow_y': shadow_y = filter_val;break;
        case 'shadow_blur':shadow_blur = filter_val;break;
        case 'shadow_color':shadow_color = filter_val;break;
    }
    new_val = `opacity(${opacity}) blur(${blur}) brightness(${brightness}) contrast(${contrast}) saturate(${saturate}) grayscale(${grayscale}) hue-rotate(${hue_rotate}) invert(${invert}) sepia(${sepia}) drop-shadow(${parseInt(shadow_x)}px ${parseInt(shadow_y)}px ${shadow_blur} ${shadow_color})`
    set_val(editor,new_val)
    new_action(editor.attr('render'));
    set_filter_editor(editor)
}
//
$('body').on('change','.filter_range_opacity',function(e){
    set_filter_val($(this).closest('.filter_editor'),'opacity',get_dummy_val($(this)))
})
$('body').on('change','.filter_range_blur',function(e){
    set_filter_val($(this).closest('.filter_editor'),'blur',get_dummy_val($(this)))
})
$('body').on('change','.filter_range_brightness',function(e){
    set_filter_val($(this).closest('.filter_editor'),'brightness',get_dummy_val($(this)))
})
$('body').on('change','.filter_range_contrast',function(e){
    set_filter_val($(this).closest('.filter_editor'),'contrast',get_dummy_val($(this)))
})
$('body').on('change','.filter_range_saturate',function(e){
    set_filter_val($(this).closest('.filter_editor'),'saturate',get_dummy_val($(this)))
})
$('body').on('change','.filter_range_grayscale',function(e){
    set_filter_val($(this).closest('.filter_editor'),'grayscale',get_dummy_val($(this)))
})
$('body').on('change','.filter_range_hue_rotate',function(e){
    set_filter_val($(this).closest('.filter_editor'),'hue_rotate',get_dummy_val($(this)))
})
$('body').on('change','.filter_range_invert',function(e){
    set_filter_val($(this).closest('.filter_editor'),'invert',get_dummy_val($(this)))
})
$('body').on('change','.filter_range_sepia',function(e){
    set_filter_val($(this).closest('.filter_editor'),'sepia',get_dummy_val($(this)))
})
$('body').on('change','.filter_box_shadow_offset_x',function(e){
    set_filter_val($(this).closest('.filter_editor'),'shadow_x',get_dummy_val($(this)))
})
$('body').on('change','.filter_box_shadow_offset_y',function(e){
    set_filter_val($(this).closest('.filter_editor'),'shadow_y',get_dummy_val($(this)))
})
$('body').on('change','.filter_box_shadow_blur',function(e){
    set_filter_val($(this).closest('.filter_editor'),'shadow_blur',get_dummy_val($(this)))
})
$('body').on('change','.filter_box_shadow_color',function(e){
    set_filter_val($(this).closest('.filter_editor'),'shadow_color',get_dummy_val($(this)))
})
$('body').on('click','.reset_filter',function(e){
    let new_val = get_default_style('filter');
    let editor = $(this).closest('.filter_editor')
    set_val(editor,new_val)
    new_action(editor.attr('render'));
    set_filter_editor(editor)
})