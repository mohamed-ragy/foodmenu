draw_text_shadow_selector = function(data){
    let elem_data = get_key_tree(data.keys_arr[0]);
    let elem_val = get_elem_val(elem_data,'text-shadow',data.is_responsive ? '1':'0');
    let text_shadow = elem_val.val.split(' ');
    let selector;
    let selector_container = $('<div/>',{class:`editor_popup_row ${data.selector_container_class === false ? '' : 'selector_container'} ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0'}).append(
        $('<div/>',{class:'row alnC jstfyS'}).append(
            data.is_responsive ? responsive_icon(elem_val.responsive_class) : '',
            $('<div/>',{text:texts.styling.text_shadow}),
        ),
        selector = $('<div/>',{class:'selector row alnC jstfyE text_shadow_settings_container'}).append(
            $('<div/>',{class:'text_shadow_btns_container'}).append(
                $('<div/>',{class:'row alnC jstfyC'}).append(
                    $('<div/>'),
                    $('<div/>',{class:'text_shadow_btn turbo ico-arrowUp',shadow_direction:'up',tooltip:text_shadow[1]}),
                    $('<div/>'),
                ),
                $('<div/>',{class:'row alnC jstfyC'}).append(
                    $('<div/>',{class:'text_shadow_btn turbo ico-arrowLeft',shadow_direction:'left',tooltip:text_shadow[0]}),
                    $('<div/>',{class:'text_shadow_btn ico-dot_circle',shadow_direction:'center'}),
                    $('<div/>',{class:'text_shadow_btn turbo ico-arrowRight',shadow_direction:'right',tooltip:text_shadow[0]}),
                ),
                $('<div/>',{class:'row alnC jstfyC'}).append(
                    $('<div/>'),
                    $('<div/>',{class:'text_shadow_btn turbo ico-arrowDown',shadow_direction:'down',tooltip:text_shadow[1]}),
                    $('<div/>'),
                ),
            ),
            $('<div/>',{class:'color_picker_container mis-10'}).append(
                $('<input/>',{class:'color_picker color_picker_no_action text_shadow_color_picker',type:'text',style:`background-color:${text_shadow[2]}`,value:text_shadow[2]}),
            ),
        )


    )
    for(const key in data.keys_arr){
        selector.attr(`key_tree${key == 0 ? '' : key}`,data.keys_arr[key]);
        selector.attr(`key${key == 0 ? '' : key}`,'text-shadow');
    }
    return selector_container;
}
set_text_shadow_selector = function(selector){
    let val = get_selector_val(selector);
    let text_shadow = val.split(' ');
    selector.find('.text_shadow_btn[shadow_direction="left"]').attr('tooltip',text_shadow[0])
    selector.find('.text_shadow_btn[shadow_direction="right"]').attr('tooltip',text_shadow[0])
    selector.find('.text_shadow_btn[shadow_direction="up"]').attr('tooltip',text_shadow[1])
    selector.find('.text_shadow_btn[shadow_direction="down"]').attr('tooltip',text_shadow[1])
    selector.find('.text_shadow_color_picker').val(text_shadow[2])
    selector.find('.text_shadow_color_picker').css('background-color',text_shadow[2])
}
//
$('body').on('click','.text_shadow_btn',function(e){
    //e.stopImmediatePropagation();
    let selector = $(this).closest('.selector');
    let val = get_selector_val(selector);
    let text_shadow = val.split(' ');
    switch($(this).attr('shadow_direction')){
        case 'up':
            text_shadow[1] = `${parseInt(text_shadow[1]) - 1}px`
        break;
        case 'down':
            text_shadow[1] = `${parseInt(text_shadow[1]) + 1}px`
        break;
        case 'left':
            text_shadow[0] = `${parseInt(text_shadow[0]) - 1}px`
        break;
        case 'right':
            text_shadow[0] = `${parseInt(text_shadow[0]) + 1}px`
        break;
        case 'center':
            text_shadow[0] = '0px';
            text_shadow[1] = '0px';
        break;
    }
    let new_val = `${text_shadow[0]} ${text_shadow[1]} ${text_shadow[2]}`
    set_elem_val($(this),new_val)
    set_text_shadow_selector(selector)
    new_action();

})
$(document).on('input','.text_shadow_color_picker',function(e){
    //e.stopImmediatePropagation();
    $(this).css('background-color',$(this).val())
    let selector = $(this).closest('.selector');
    let val = get_selector_val(selector);
    let text_shadow = val.split(' ');
    let new_val = `${text_shadow[0]} ${text_shadow[1]} ${$(this).val()}`
    set_elem_val($(this),new_val)
    undo_redo_actions();
})
$(document).on('change','.text_shadow_color_picker',function(e){
    //e.stopImmediatePropagation();
    $(this).css('background-color',$(this).val())
    let selector = $(this).closest('.selector');
    let val = get_selector_val(selector);
    let text_shadow = val.split(' ');
    let new_val = `${text_shadow[0]} ${text_shadow[1]} ${$(this).val()}`
    set_elem_val($(this),new_val)
    new_action();
})
