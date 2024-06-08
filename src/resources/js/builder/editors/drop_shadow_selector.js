draw_drop_shadow_select = function(data){
    return '';
    let elem_data = get_key_tree(data.keys_arr[0]);
    let elem_val = get_elem_val(elem_data,'box-shadow',data.is_responsive ? '1':'0')
    let shadow = elem_val.val.split(' ');
    let shadow_offset_x = shadow[0];
    let shadow_offset_y = shadow[1];

    let shadow_blur = shadow[2];
    let shadow_spread = shadow[3];

    let selector;
    let selector_container = $('<div/>',{class:`selector_container ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0',is_hover:data.is_hover?'1':'0'}).append(
        draw_selector_name({data:data,name:texts.styling.box_shadow,responsive_class:elem_val.responsive_class,container_class:'w100p-30 mY10 mX15 pT10 bold fs101'}),
        selector = $('<div/>',{class:'selector drop_shadow_selector_container w100p'}).append(
            draw_dummy_select_box({
                name:texts.styling.type,
                selections:[
                    {text:texts.styling.outset,key:'outset',class:'shadow_select_box'},
                    {text:texts.styling.inset,key:'inset',class:'shadow_select_box'},
                ],
                val:shadow.length == 5 ? 'outset' : shadow.length == 6 ? 'inset' : 'outset',
                selections_container_class:'shadow_select_box_type',
                container_class:'editor_popup_row_border_top_none',
            }),
            draw_dummy_color_picker({
                name:texts.styling.color,
                val:shadow[4],
                color_picker_class:'shadow_color_picker',
            }),
            $('<div/>',{class:'editor_popup_row'}).append(
                $('<div/>',{class:'fs09',text:texts.styling.offset}),
                $('<div/>',{class:'column alnC jstfyE'}).append(
                    $('<div/>',{class:'row alnC jstfyC'}).append(
                        $('<div/>'),
                        $('<button/>',{class:'shadow_plus_minus turbo ico-arrowUp',key:'y',action:'minus',tooltip:shadow_offset_y}),
                        $('<div/>'),
                    ),
                    $('<div/>',{class:'row alnC jstfyC'}).append(
                        $('<button/>',{class:'shadow_plus_minus turbo ico-arrowLeft',key:'x',action:'minus',tooltip:shadow_offset_x}),
                        $('<button/>',{class:'shadow_plus_minus ico-dot_circle fs09',key:'center'}),
                        $('<button/>',{class:'shadow_plus_minus turbo ico-arrowRight',key:'x',action:'plus',tooltip:shadow_offset_x}),
                    ),
                    $('<div/>',{class:'row alnC jstfyC'}).append(
                        $('<div/>'),
                        $('<button/>',{class:'shadow_plus_minus turbo ico-arrowDown',key:'y',action:'plus',tooltip:shadow_offset_y}),
                        $('<div/>'),
                    ),
                )

            ),
            draw_dummy_select_range({
                name:texts.styling.blur,
                val:shadow_blur,
                range:{min:0,max:100,step:1},
                unit:'px',
                container_class:'shadow_select_range_blur'
            }),
            draw_dummy_select_range({
                name:texts.styling.spread,
                val:shadow_spread,
                range:{min:0,max:100,step:1},
                unit:'px',
                container_class:'shadow_select_range_spread'
            }),
            $('<div/>',{class:'row alnC jstfyE mT20 pB10'}).append(
                $('<button/>',{class:'btn btn-cancel reset_box_shadow fs09',text:texts.styling.reset_box_shadow})
            )
        )

    );
    for(const key in data.keys_arr){
        selector.attr(`key_tree${key == 0 ? '' : key}`,data.keys_arr[key]);
        selector.attr(`key${key == 0 ? '' : key}`,'box-shadow');
    }
    return selector_container;
}
set_drop_shadow_select = function(selector){
    let val = get_selector_val(selector);
    let shadow;
    if(val === null){
        shadow = ['0px','0px','0px','0px','rgba(0,0,0,0)']
    }else{
        shadow = val.split(' ');
    }
    //
    set_dummy_select_box(selector.find('.shadow_select_box_type'),shadow.length == 5 ? 'outset' : shadow.length == 6 ? 'inset' : 'outset')

    selector.find('.shadow_plus_minus[key="x"]').attr('tooltip',shadow[0])
    selector.find('.shadow_plus_minus[key="y"]').attr('tooltip',shadow[1])

    set_dummy_select_range_slider(selector.find('.shadow_select_range_blur'),shadow[2])
    set_dummy_select_range_slider(selector.find('.shadow_select_range_spread'),shadow[3])

    set_dummy_color_picker(selector.find('.shadow_color_picker'),shadow[4])
    //
    updateToolTip();
}
//
$(document).on('input','.shadow_color_picker',function(e){
    let selector = $(this).closest('.selector')
    let val = get_selector_val(selector)
    let shadow;
    if(val === null){
        shadow = ['0px','0px','0px','0px','rgba(0,0,0,0)']
    }else{
        shadow = val.split(' ')
    }
    let new_val;
    if(shadow.length == 5){new_val = `${shadow[0]} ${shadow[1]} ${shadow[2]} ${shadow[3]} ${$(this).val()}`}
    else if(shadow.length == 6){new_val = `${shadow[0]} ${shadow[1]} ${shadow[2]} ${shadow[3]} ${$(this).val()} ${shadow[5]}`}
    set_elem_val($(this),new_val)
    undo_redo_actions();

})
$(document).on('change','.shadow_color_picker',function(e){
    let selector = $(this).closest('.selector')
    let val = get_selector_val(selector)
    let shadow;
    if(val === null){
        shadow = ['0px','0px','0px','0px','rgba(0,0,0,0)']
    }else{
        shadow = val.split(' ')
    }
    let new_val;
    if(shadow.length == 5){new_val = `${shadow[0]} ${shadow[1]} ${shadow[2]} ${shadow[3]} ${$(this).val()}`}
    else if(shadow.length == 6){new_val = `${shadow[0]} ${shadow[1]} ${shadow[2]} ${shadow[3]} ${$(this).val()} ${shadow[5]}`}
    set_elem_val($(this),new_val)
    new_action();
})
$('body').on('click','.shadow_select_box',function(e){
    let selector = $(this).closest('.selector')
    let val = get_selector_val(selector)
    let shadow;
    console.log(val)
    if(val === null){
        shadow = ['0px','0px','0px','0px','rgba(0,0,0,0)']
    }else{
        shadow = val.split(' ')
    }
    let new_val;
    if($(this).attr('key') == 'inset'){
        new_val = `${shadow[0]} ${shadow[1]} ${shadow[2]} ${shadow[3]} ${shadow[4]} inset`;
    }else if($(this).attr('key') == 'outset'){
        new_val = `${shadow[0]} ${shadow[1]} ${shadow[2]} ${shadow[3]} ${shadow[4]}`
    }

    set_elem_val($(this),new_val)
    new_action();
})
///
$('body').on('click','.reset_box_shadow',function(e){
    let new_val = '0px 0px 0px 0px rgba(0,0,0,0)';
    let selector = $(this).closest('.selector')
    set_elem_val(selector,new_val)
    new_action();
})
$('body').on('click','.shadow_plus_minus',function(e){
    let selector = $(this).closest('.selector')
    let val = get_selector_val(selector)
    let shadow;
    if(val === null){
        shadow = ['0px','0px','0px','0px','rgba(0,0,0,0)']
    }else{
        shadow = val.split(' ')
    }
    let shadow_key = $(this).attr('key');
    let action = $(this).attr('action');
    switch(shadow_key){
        case 'x':
            action == 'plus' ? shadow[0] = `${(parseInt(shadow[0]) + 1)}px` : action = 'minus' ? shadow[0] = `${(parseInt(shadow[0]) - 1)}px` : null;
        break;
        case 'y':
            action == 'plus' ? shadow[1] = `${(parseInt(shadow[1]) + 1)}px` : action = 'minus' ? shadow[1] = `${(parseInt(shadow[1]) - 1)}px` : null;
        break;
        case 'center':
            shadow[0] = '0px';
            shadow[1] = '0px';
        break;
    }
    selector.find('.shadow_plus_minus[key="x"]').attr('tooltip',shadow[0])
    selector.find('.shadow_plus_minus[key="y"]').attr('tooltip',shadow[1])
    let new_val;
    if(shadow.length == 6){
        new_val = `${shadow[0]} ${shadow[1]} ${shadow[2]} ${shadow[3]} ${shadow[4]} ${shadow[5]}`
    }else if(shadow.length == 5){
        new_val = `${shadow[0]} ${shadow[1]} ${shadow[2]} ${shadow[3]} ${shadow[4]}`
    }
    set_elem_val($(this),new_val)
    updateToolTip();
    new_action();
})

$('body').on('slide','.shadow_select_range_blur',function(e){
    let selector = $(this).closest('.selector')
    let val = get_selector_val(selector)
    let shadow;
    if(val === null){
        shadow = ['0px','0px','0px','0px','rgba(0,0,0,0)']
    }else{
        shadow = val.split(' ')
    }
    let new_val;
    let new_blur_val = $(this).find('.select_range_slider').attr('slider_val');
    if(shadow.length == 5){new_val = `${shadow[0]} ${shadow[1]} ${new_blur_val} ${shadow[3]} ${shadow[4]}`}
    else if(shadow.length == 6){new_val = `${shadow[0]} ${shadow[1]} ${new_blur_val} ${shadow[3]} ${shadow[4]} ${shadow[5]}`}
    set_elem_val($(this),new_val)
    new_action();
})
$('body').on('slide','.shadow_select_range_spread',function(e){
    let selector = $(this).closest('.selector')
    let val = get_selector_val(selector)
    let shadow;
    if(val === null){
        shadow = ['0px','0px','0px','0px','rgba(0,0,0,0)']
    }else{
        shadow = val.split(' ')
    }
    let new_val;
    let new_spread_val = $(this).find('.select_range_slider').attr('slider_val');
    if(shadow.length == 5){new_val = `${shadow[0]} ${shadow[1]} ${shadow[2]} ${new_spread_val} ${shadow[4]}`}
    else if(shadow.length == 6){new_val = `${shadow[0]} ${shadow[1]} ${shadow[2]} ${new_spread_val} ${shadow[4]} ${shadow[5]}`}
    set_elem_val($(this),new_val)
    new_action();
})
