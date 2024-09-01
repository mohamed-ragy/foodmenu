draw_backdrop_filter_editor = function(data){
    let editor = $('<div/>',{
        class:`editor backdrop_filter_editor`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        render:data.render ?? data.key_tree,
    }).append(
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.blur}),
            draw_select_range({
                dummy:true,
                dummy_class:'backdrop_filter_range_blur',
                range:{min:0,max:20,step:1},
                unit:'px',
            }),
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.brightness}),
            draw_select_range({
                dummy:true,
                dummy_class:'backdrop_filter_range_brightness',
                range:{min:0,max:200,step:1},
                unit:'%',
            }),
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.contrast}),
            draw_select_range({
                dummy:true,
                dummy_class:'backdrop_filter_range_contrast',
                range:{min:0,max:200,step:1},
                unit:'%',
            }),
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.saturate}),
            draw_select_range({
                dummy:true,
                dummy_class:'backdrop_filter_range_saturate',
                range:{min:0,max:200,step:1},
                unit:'%',
            }),
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.grayscale}),
            draw_select_range({
                dummy:true,
                dummy_class:'backdrop_filter_range_grayscale',
                range:{min:0,max:100,step:1},
                unit:'%',
            }),
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.hue_rotate}),
            draw_select_range({
                dummy:true,
                dummy_class:'backdrop_filter_range_hue_rotate',
                range:{min:0,max:360,step:1},
                unit:'deg',
            }),
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.invert}),
            draw_select_range({
                dummy:true,
                dummy_class:'backdrop_filter_range_invert',
                range:{min:0,max:100,step:1},
                unit:'%',
            }),
        ),
        $('<div/>',{class:'editor_popup_col'}).append(
            $('<div/>',{class:'fs09',text:texts.styling.sepia}),
            draw_select_range({
                dummy:true,
                dummy_class:'backdrop_filter_range_sepia',
                range:{min:0,max:100,step:1},
                unit:'%',
            }),
        ),
        $('<div/>',{class:'row alnC jstfyE pT10 pB20'}).append(
            $('<button/>',{class:'btn btn-cancel reset_backdrop_filter fs09',text:texts.styling.reset_filters})
        )
    );

    return editor;
}
set_backdrop_filter_editor = function(editor){
    let val = get_editor_val(editor);
    if(val == '--'){
        val = get_default_style('backdrop_filter').split(' ')
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
    set_dummy_select_range(editor.find('.backdrop_filter_range_blur'),blur)
    set_dummy_select_range(editor.find('.backdrop_filter_range_brightness'),brightness)
    set_dummy_select_range(editor.find('.backdrop_filter_range_contrast'),contrast)
    set_dummy_select_range(editor.find('.backdrop_filter_range_saturate'),saturate)
    set_dummy_select_range(editor.find('.backdrop_filter_range_grayscale'),grayscale)
    set_dummy_select_range(editor.find('.backdrop_filter_range_hue_rotate'),hue_rotate)
    set_dummy_select_range(editor.find('.backdrop_filter_range_invert'),invert)
    set_dummy_select_range(editor.find('.backdrop_filter_range_sepia'),sepia)
}
//
$('body').on('click','.reset_backdrop_filter',function(e){
    let new_val = get_default_style('backdrop_filter');
    let editor = $(this).closest('.backdrop_filter_editor')
    set_val(editor,new_val)
    new_action(editor.attr('render'));
    set_backdrop_filter_editor(editor)
})
//
set_backdrop_filter_val = function(editor,filter,filter_val){
    let val = get_editor_val(editor);
    if(val == '--'){
        val = get_default_style('backdrop_filter').split(' ')
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
    set_val(editor,new_val)
    new_action(editor.attr('render'));
    set_backdrop_filter_editor(editor)
}
$('body').on('change','.backdrop_filter_range_blur',function(e){
    set_backdrop_filter_val($(this).closest('.backdrop_filter_editor'),'blur',get_dummy_val($(this)))
})
$('body').on('change','.backdrop_filter_range_brightness',function(e){
    set_backdrop_filter_val($(this).closest('.backdrop_filter_editor'),'brightness',get_dummy_val($(this)))
})
$('body').on('change','.backdrop_filter_range_contrast',function(e){
    set_backdrop_filter_val($(this).closest('.backdrop_filter_editor'),'contrast',get_dummy_val($(this)))
})
$('body').on('change','.backdrop_filter_range_saturate',function(e){
    set_backdrop_filter_val($(this).closest('.backdrop_filter_editor'),'saturate',get_dummy_val($(this)))
})
$('body').on('change','.backdrop_filter_range_grayscale',function(e){
    set_backdrop_filter_val($(this).closest('.backdrop_filter_editor'),'grayscale',get_dummy_val($(this)))
})
$('body').on('change','.backdrop_filter_range_hue_rotate',function(e){
    set_backdrop_filter_val($(this).closest('.backdrop_filter_editor'),'hue_rotate',get_dummy_val($(this)))
})
$('body').on('change','.backdrop_filter_range_invert',function(e){
    set_backdrop_filter_val($(this).closest('.backdrop_filter_editor'),'invert',get_dummy_val($(this)))
})
$('body').on('change','.backdrop_filter_range_sepia',function(e){
    set_backdrop_filter_val($(this).closest('.backdrop_filter_editor'),'sepia',get_dummy_val($(this)))
})
//
