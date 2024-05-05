draw_zindex_selector = function(data){
    let elem_data = get_key_tree(data.keys_arr[0]);
    let elem_val = get_elem_val(elem_data,'z-index',data.is_responsive ? '1' : '0');
    let selector;
    let selector_container = $('<div/>',{class:`editor_popup_row ${data.selector_container_class === false ? '' : 'selector_container'} ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0'}).append(
        $('<div/>',{class:'row alnC jstfyS'}).append(
            data.is_responsive ? responsive_icon(elem_val.responsive_class) : '',
            $('<div/>',{text:texts.styling.z_position}),
        ),
        selector = $('<div/>',{class:'selector zindex_container'}).append(
            $('<button/>',{class:'ico-arrowUp zindex_btn',index_direction:'up',tooltip:elem_val.val}),
            $('<button/>',{class:'ico-arrowDown zindex_btn',index_direction:'down',tooltip:elem_val.val}),
        )
    )
    for(const key in data.keys_arr){
        selector.attr(`key_tree${key == 0 ? '' : key}`,data.keys_arr[key]);
        selector.attr(`key${key == 0 ? '' : key}`,'z-index');
    }
    return selector_container;
}
set_zindex_selector = function(selector){
    let val = get_selector_val(selector);
    selector.find('.zindex_btn').attr('tooltip',val)
}
$('body').on('click','.zindex_btn',function(e){
    //e.stopImmediatePropagation();
    let selector = $(this).closest('.selector');
    let val = get_selector_val(selector);
    if($(this).attr('index_direction') == 'up'){
        val = parseInt(val) + 1;
    }else if($(this).attr('index_direction') == 'down'){
        val = parseInt(val) - 1;
    }
    if(val < 0){val = 0}
    set_elem_val($(this),val)
    $(this).closest('.zindex_container').find('.zindex_btn').attr('tooltip',val)
    updateToolTip();
    new_action();
})
