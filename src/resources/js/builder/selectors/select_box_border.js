draw_select_box_border = function(data){
    let elem_data = get_key_tree(data.keys_arr[0]);
    let elem_val = get_elem_val(elem_data,'border-style',data.is_responsive ? '1' : '0');

    // let val = get_key_tree(keys_arr[0].key_tree).elem[keys_arr[0].key];
    let border_style = elem_val.val.split(' ');
    let selector;
    let selector_container = $('<div/>',{class:`editor_popup_row ${data.selector_container_class === false ? '' : 'selector_container'} ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0'}).append(
        $('<div/>',{class:'row alnC jstfyS'}).append(
            data.is_responsive && data.responsive_icon !== false ? responsive_icon(elem_val.responsive_class) : '',
            $('<div/>',{text:texts.styling.border_style}),
        ),
        selector = $('<div/>',{class:'selector select_box_border_container'}).append(
            $('<div/>',{class:`p7 fs101 select_box_border ico-border_top ${border_style[0] == 'solid' ? 'select_box_border_selected' : ''}`,key:'top'}),
            $('<div/>',{class:`p7 fs101 select_box_border ico-border_right ${border_style[1] == 'solid' ? 'select_box_border_selected' : ''}`,key:'right'}),
            $('<div/>',{class:`p7 fs101 select_box_border ico-border_bottom ${border_style[2] == 'solid' ? 'select_box_border_selected' : ''}`,key:'bottom'}),
            $('<div/>',{class:`p7 fs101 select_box_border ico-border_left ${border_style[3] == 'solid' ? 'select_box_border_selected' : ''}`,key:'left'}),
        )
    )

    for(const key in data.keys_arr){
        selector.attr(`key_tree${key == 0 ? '' : key}`,data.keys_arr[key]);
        selector.attr(`key${key == 0 ? '' : key}`,'border-style');
    }
    return selector_container;
}
set_select_box_border = function(selector){
    let border_style = get_selector_val(selector).split(' ');
    border_style[0] == 'solid' ? selector.find('.select_box_border[key="top"]').addClass('select_box_border_selected') : selector.find('.select_box_border[key="top"]').removeClass('select_box_border_selected');
    border_style[1] == 'solid' ? selector.find('.select_box_border[key="right"]').addClass('select_box_border_selected') : selector.find('.select_box_border[key="right"]').removeClass('select_box_border_selected');
    border_style[2] == 'solid' ? selector.find('.select_box_border[key="bottom"]').addClass('select_box_border_selected') : selector.find('.select_box_border[key="bottom"]').removeClass('select_box_border_selected');
    border_style[3] == 'solid' ? selector.find('.select_box_border[key="left"]').addClass('select_box_border_selected') : selector.find('.select_box_border[key="left"]').removeClass('select_box_border_selected');
}
$('body').on('click','.select_box_border',function(e){
    //e.stopImmediatePropagation();
    let selector = $(this).closest('.selector');
    let val = get_selector_val(selector);
    val = val.split(' ');
    switch($(this).attr('key')){
        case 'top':
            val[0] == 'solid' ? val[0] = 'none' : val[0] = 'solid';
        break;
        case 'right':
            val[1] == 'solid' ? val[1] = 'none' : val[1] = 'solid';
        break;
        case 'bottom':
            val[2] == 'solid' ? val[2] = 'none' : val[2] = 'solid';
        break;
        case 'left':
            val[3] == 'solid' ? val[3] = 'none' : val[3] = 'solid';
        break;
    }
    let new_val = `${val[0]} ${val[1]} ${val[2]} ${val[3]}`;
    set_elem_val(selector,new_val);
    set_select_box_border(selector);

    new_action();
})
